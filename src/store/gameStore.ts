import { create } from 'zustand';
import { GameState, ClientAction } from '../game/types';
import PartySocket from 'partysocket';
import { v4 as uuidv4 } from 'uuid';

interface GameStore {
  playerId: string;
  gameState: GameState | null;
  socket: PartySocket | null;
  setPlayerId: (id: string) => void;
  connect: (roomId: string) => void;
  disconnect: () => void;
  dispatch: (action: ClientAction) => void;
}

// Generate or load player ID
const getInitialPlayerId = () => {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('cotyphu_player_id');
  if (!id) {
    id = uuidv4();
    localStorage.setItem('cotyphu_player_id', id);
  }
  return id;
};

export const useGameStore = create<GameStore>((set, get) => ({
  playerId: getInitialPlayerId(),
  gameState: null,
  socket: null,
  setPlayerId: (id) => set({ playerId: id }),
  connect: (roomId) => {
    const { socket: existingSocket, playerId } = get();
    if (existingSocket) existingSocket.close();

    const socket = new PartySocket({
      host: process.env.NEXT_PUBLIC_PARTYKIT_HOST || 'localhost:1999',
      room: roomId,
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'SYNC_STATE') {
          set({ gameState: data.payload });
        }
      } catch (e) {
        console.error('Failed to parse message from server', e);
      }
    });

    set({ socket });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null, gameState: null });
    }
  },
  dispatch: (action: ClientAction) => {
    const { socket, playerId } = get();
    if (socket) {
      socket.send(JSON.stringify({
        type: 'ACTION',
        action,
        playerId
      }));
    }
  }
}));
