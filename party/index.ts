import type { Party, PartyServer, PartyConnection } from 'partykit/server';
import { GameState, ClientAction } from '../src/game/types';
import { createInitialState, gameReducer } from './gameLogic';

export default class GameServer implements PartyServer {
  private state: GameState;

  constructor(public party: Party) {
    // Initial state before load
    this.state = createInitialState(party.id);
  }

  async onStart() {
    // Try to load persisted state from storage
    const storedState = await this.party.storage.get<GameState>('gameState');
    if (storedState) {
      this.state = storedState;
    } else {
      this.state = createInitialState(this.party.id);
      await this.saveState();
    }
  }

  async saveState() {
    await this.party.storage.put('gameState', this.state);
  }

  onConnect(conn: PartyConnection, ctx: any) {
    // When a client connects, send them the current state immediately
    conn.send(JSON.stringify({ type: 'SYNC_STATE', payload: this.state }));
  }

  async onMessage(message: string, sender: PartyConnection) {
    try {
      const data = JSON.parse(message);
      
      // We expect the client to send actions in the format: { type: 'ACTION', action: ClientAction, playerId: string }
      if (data.type === 'ACTION') {
        const action = data.action as ClientAction;
        const playerId = data.playerId as string;

        // Run through the game reducer
        const newState = gameReducer(this.state, action, playerId);
        
        // If state changed, update and broadcast
        // A deep equality check could be done, but for simplicity we assume action always mutates or we just broadcast anyway
        this.state = newState;
        await this.saveState();
        
        // Broadcast new state to all connected clients
        this.party.broadcast(JSON.stringify({ type: 'SYNC_STATE', payload: this.state }));
      }
    } catch (e) {
      console.error('Failed to process message', e);
    }
  }
}
