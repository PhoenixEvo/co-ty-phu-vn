import { Pool } from 'pg';
import dotenv from 'dotenv';
import { GameState } from '../src/game/types';

dotenv.config();

const IS_PG_ENABLED = !!process.env.DATABASE_URL;

const pool = IS_PG_ENABLED ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
}) : null;

// In-Memory Fallback for Local Dev
const inMemoryGames = new Map<string, any>();
const inMemoryEvents: any[] = [];

export async function initDb() {
  if (!IS_PG_ENABLED) {
    console.warn('⚠️ No DATABASE_URL found. Using In-Memory mock database for development.');
    return;
  }
  const client = await pool!.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS games (
        id VARCHAR(255) PRIMARY KEY,
        status VARCHAR(50) NOT NULL,
        state_jsonb JSONB NOT NULL,
        revision INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS game_events (
        id SERIAL PRIMARY KEY,
        game_id VARCHAR(255) REFERENCES games(id),
        revision INTEGER NOT NULL,
        player_id VARCHAR(255),
        event_type VARCHAR(50),
        payload JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database schema initialized.');
  } finally {
    client.release();
  }
}

export async function loadGameState(gameId: string): Promise<GameState | null> {
  if (!IS_PG_ENABLED) {
    if (!inMemoryGames.has(gameId)) return null;
    const state = JSON.parse(JSON.stringify(inMemoryGames.get(gameId))); // Deep copy
    return state;
  }

  const result = await pool!.query('SELECT state_jsonb, revision FROM games WHERE id = $1', [gameId]);
  if (result.rows.length === 0) return null;
  const state = result.rows[0].state_jsonb as GameState;
  state.revision = result.rows[0].revision;
  return state;
}

export async function saveGameState(state: GameState, expectedRevision: number, eventType?: string, eventPayload?: any): Promise<boolean> {
  if (!IS_PG_ENABLED) {
    const currentState = inMemoryGames.get(state.roomId);
    if (currentState) {
      if (currentState.revision !== expectedRevision) return false;
    } else if (expectedRevision !== -1) {
      return false;
    }
    
    const nextRevision = expectedRevision === -1 ? 0 : expectedRevision + 1;
    state.revision = nextRevision;
    inMemoryGames.set(state.roomId, JSON.parse(JSON.stringify(state)));
    if (eventType) {
      inMemoryEvents.push({ gameId: state.roomId, revision: nextRevision, type: eventType, payload: eventPayload });
    }
    return true;
  }

  const client = await pool!.connect();
  try {
    await client.query('BEGIN');
    
    // Check revision for optimistic locking
    const checkResult = await client.query('SELECT revision FROM games WHERE id = $1 FOR UPDATE', [state.roomId]);
    if (checkResult.rows.length > 0) {
      const currentRevision = checkResult.rows[0].revision;
      if (currentRevision !== expectedRevision) {
        await client.query('ROLLBACK');
        return false; // Revision mismatch
      }
    } else if (expectedRevision !== -1) {
      // Trying to update a non-existent game without expectedRevision = -1
      await client.query('ROLLBACK');
      return false;
    }

    const nextRevision = expectedRevision === -1 ? 0 : expectedRevision + 1;
    state.revision = nextRevision;

    if (expectedRevision === -1) {
      await client.query(
        'INSERT INTO games (id, status, state_jsonb, revision) VALUES ($1, $2, $3, $4)',
        [state.roomId, state.status, state, nextRevision]
      );
    } else {
      await client.query(
        'UPDATE games SET status = $1, state_jsonb = $2, revision = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4',
        [state.status, state, nextRevision, state.roomId]
      );
    }

    if (eventType) {
      await client.query(
        'INSERT INTO game_events (game_id, revision, event_type, payload) VALUES ($1, $2, $3, $4)',
        [state.roomId, nextRevision, eventType, eventPayload]
      );
    }

    await client.query('COMMIT');
    return true;
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to save game state', err);
    throw err;
  } finally {
    client.release();
  }
}

export async function closeDb() {
  if (pool) await pool.end();
}
