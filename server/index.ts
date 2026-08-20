import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import { z } from 'zod';
import next from 'next';
import { initDb, loadGameState, saveGameState } from './db';
import { createInitialState, gameReducer } from './engine';
import { GameState, ClientAction } from '../src/game/types';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  app.use(cors({ origin: '*' })); // Should restrict in prod, but keeping simple for dev/migration

  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws' });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  // Serve Next.js frontend for all other routes
  app.use((req, res) => {
    return handle(req, res);
  });

const ClientMessageSchema = z.object({
  type: z.literal('ACTION'),
  action: z.any(), // Further validation can be done in engine
  playerId: z.string(),
  roomId: z.string(),
  revision: z.number().optional(), // Client's known revision
});

const activeRooms = new Map<string, GameState>();

async function getOrCreateRoomState(roomId: string): Promise<GameState> {
  if (activeRooms.has(roomId)) {
    return activeRooms.get(roomId)!;
  }
  
  // Try loading from DB
  let state = await loadGameState(roomId);
  if (!state) {
    state = createInitialState(roomId);
    state.revision = 0;
    // We use revision -1 to indicate a new game in saveGameState
    await saveGameState(state, -1, 'CREATE_GAME');
  }
  
  activeRooms.set(roomId, state);
  return state;
}

function broadcastToRoom(roomId: string, message: any) {
  const msgStr = JSON.stringify(message);
  wss.clients.forEach((client: any) => {
    if (client.readyState === WebSocket.OPEN && client.roomId === roomId) {
      client.send(msgStr);
    }
  });
}

wss.on('connection', (ws: any, req) => {
  console.log('Client connected');
  
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });

  ws.on('message', async (message: string) => {
    try {
      const data = JSON.parse(message);
      
      // SYNC Request
      if (data.type === 'SYNC') {
        const { roomId } = data;
        if (typeof roomId !== 'string') return;
        ws.roomId = roomId;
        const state = await getOrCreateRoomState(roomId);
        ws.send(JSON.stringify({ type: 'SYNC_STATE', payload: state }));
        return;
      }
      
      // ACTION Request
      const parsed = ClientMessageSchema.safeParse(data);
      if (!parsed.success) {
        ws.send(JSON.stringify({ type: 'ERROR', code: 'INVALID_PAYLOAD', message: 'Invalid payload' }));
        return;
      }
      
      const { action, playerId, roomId, revision: clientRevision } = parsed.data;
      ws.roomId = roomId; // Associate socket with room
      
      const state = await getOrCreateRoomState(roomId);
      
      // Concurrency / Stale check
      if (clientRevision !== undefined && state.revision !== undefined && clientRevision < state.revision) {
        ws.send(JSON.stringify({ type: 'ERROR', code: 'STALE_REVISION', message: 'State is stale, syncing...' }));
        ws.send(JSON.stringify({ type: 'SYNC_STATE', payload: state }));
        return;
      }

      // Process Action
      const newState = gameReducer(state, action as ClientAction, playerId);
      
      // If state reference is different, it means the reducer modified it
      // Save to database with optimistic concurrency
      const saved = await saveGameState(newState, state.revision || 0, action.type, action);
      if (saved) {
        activeRooms.set(roomId, newState);
        broadcastToRoom(roomId, { type: 'SYNC_STATE', payload: newState });
      } else {
        // Revision conflict in DB, reload state
        const dbState = await loadGameState(roomId);
        if (dbState) {
          activeRooms.set(roomId, dbState);
          ws.send(JSON.stringify({ type: 'SYNC_STATE', payload: dbState }));
        }
      }
      
    } catch (e) {
      console.error('Error handling message', e);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Heartbeat
const interval = setInterval(() => {
  wss.clients.forEach((ws: any) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => {
  clearInterval(interval);
});

const PORT = process.env.PORT || 10000;
initDb().then(() => {
  server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Node.js WebSocket Game Server & Next.js Frontend listening on port ${PORT} (0.0.0.0)`);
  });
}).catch(err => {
  console.error('Failed to initialize database', err);
  process.exit(1);
});

});
