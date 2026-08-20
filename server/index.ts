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
const PORT = Number(process.env.PORT || 10000);

const app = express();
app.use(cors({ origin: '*' }));

const server = http.createServer(app);

// Initialize WebSocket server in noServer mode
const wss = new WebSocketServer({ noServer: true });

// CRITICAL: Register our WebSocket upgrade handler BEFORE Next.js gets a chance to.
// Next.js 16.x auto-registers its own 'upgrade' handler via setupWebSocketHandler()
// which would conflict with our /ws path. By using prependListener, we intercept first.
server.prependListener('upgrade', (request, socket, head) => {
  const { pathname } = new URL(request.url || '/', `http://${request.headers.host}`);
  if (pathname === '/ws') {
    // Mark this request as handled so Next.js's upgrade handler won't touch it
    (request as any).__nextjsHandled = true;
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
  // For non-/ws paths, let Next.js handle it (e.g. HMR in dev mode)
});

// Pass httpServer to next() so it knows about our server
const nextApp = next({ dev, httpServer: server });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  // Serve Next.js frontend for all other routes
  app.use((req, res) => {
    return handle(req, res);
  });

  const ClientMessageSchema = z.object({
    type: z.literal('ACTION'),
    action: z.any(),
    playerId: z.string(),
    roomId: z.string(),
    revision: z.number().optional(),
  });

  const activeRooms = new Map<string, GameState>();

  async function getOrCreateRoomState(roomId: string): Promise<GameState> {
    if (activeRooms.has(roomId)) {
      return activeRooms.get(roomId)!;
    }

    let state = await loadGameState(roomId);
    if (!state) {
      state = createInitialState(roomId);
      state.revision = 0;
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
    console.log('[WS] Client connected from', req.headers.origin || 'unknown origin');

    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });

    ws.on('error', (err: Error) => {
      console.error('[WS] Socket error:', err.message);
    });

    ws.on('message', async (raw: Buffer | string) => {
      const message = typeof raw === 'string' ? raw : raw.toString('utf-8');
      try {
        const data = JSON.parse(message);

        // SYNC Request
        if (data.type === 'SYNC') {
          const { roomId } = data;
          if (typeof roomId !== 'string') return;
          ws.roomId = roomId;
          console.log(`[WS] SYNC request for room: ${roomId}`);
          try {
            const state = await getOrCreateRoomState(roomId);
            ws.send(JSON.stringify({ type: 'SYNC_STATE', payload: state }));
            console.log(`[WS] SYNC_STATE sent for room: ${roomId}`);
          } catch (dbErr) {
            console.error(`[WS] DB error during SYNC for room ${roomId}:`, dbErr);
            // Fallback: send a fresh in-memory state so the client is not stuck
            const fallbackState = createInitialState(roomId);
            fallbackState.revision = 0;
            activeRooms.set(roomId, fallbackState);
            ws.send(JSON.stringify({ type: 'SYNC_STATE', payload: fallbackState }));
            console.log(`[WS] Sent fallback state for room: ${roomId}`);
          }
          return;
        }

        // ACTION Request
        const parsed = ClientMessageSchema.safeParse(data);
        if (!parsed.success) {
          ws.send(JSON.stringify({ type: 'ERROR', code: 'INVALID_PAYLOAD', message: 'Invalid payload' }));
          return;
        }

        const { action, playerId, roomId, revision: clientRevision } = parsed.data;
        ws.roomId = roomId;

        const state = await getOrCreateRoomState(roomId);

        // Concurrency / Stale check
        if (clientRevision !== undefined && state.revision !== undefined && clientRevision < state.revision) {
          ws.send(JSON.stringify({ type: 'ERROR', code: 'STALE_REVISION', message: 'State is stale, syncing...' }));
          ws.send(JSON.stringify({ type: 'SYNC_STATE', payload: state }));
          return;
        }

        // Process Action
        const newState = gameReducer(state, action as ClientAction, playerId);

        const saved = await saveGameState(newState, state.revision || 0, action.type, action);
        if (saved) {
          activeRooms.set(roomId, newState);
          broadcastToRoom(roomId, { type: 'SYNC_STATE', payload: newState });
        } else {
          const dbState = await loadGameState(roomId);
          if (dbState) {
            activeRooms.set(roomId, dbState);
            ws.send(JSON.stringify({ type: 'SYNC_STATE', payload: dbState }));
          }
        }

      } catch (e) {
        console.error('[WS] Error handling message:', e);
      }
    });

    ws.on('close', (code: number, reason: Buffer) => {
      console.log(`[WS] Client disconnected (code=${code}, reason=${reason?.toString() || 'none'})`);
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

  initDb().then(() => {
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`[SERVER] Game Server & Next.js Frontend listening on port ${PORT} (0.0.0.0)`);
      console.log(`[SERVER] WebSocket path: /ws`);
      console.log(`[SERVER] Health check: /health`);
      console.log(`[SERVER] NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
    });
  }).catch(err => {
    console.error('[SERVER] Failed to initialize database', err);
    process.exit(1);
  });

});
