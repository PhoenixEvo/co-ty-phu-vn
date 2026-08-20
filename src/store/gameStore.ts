import { create } from 'zustand';
import { GameState, ClientAction } from '../game/types';
import { v4 as uuidv4 } from 'uuid';
import { GameTransport } from '../lib/GameTransport';

interface GameStore {
  playerId: string;
  gameState: GameState | null;
  transport: GameTransport | null;
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
  transport: null,
  setPlayerId: (id) => set({ playerId: id }),
  connect: (roomId) => {
    const { transport: existingTransport, playerId } = get();
    if (existingTransport) existingTransport.close();

    const host = process.env.NEXT_PUBLIC_GAME_SERVER_URL || (typeof window !== 'undefined' ? window.location.host : 'localhost:10000');
    
    const transport = new GameTransport(host, roomId, playerId, (data) => {
      if (data.type === 'SYNC_STATE') {
        set({ gameState: data.payload });
      } else if (data.type === 'ERROR') {
        console.error('Server Error:', data.message);
      }
    });

    set({ transport });
  },
  disconnect: () => {
    const { transport } = get();
    if (transport) {
      transport.close();
      set({ transport: null, gameState: null });
    }
  },
  dispatch: (action: ClientAction) => {
    const { transport, gameState } = get();
    if (transport) {
      // Send the current revision with the action for optimistic concurrency check
      transport.sendAction(action, gameState?.revision);
    }
  }
}));
