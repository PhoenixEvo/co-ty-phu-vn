import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createInitialState, gameReducer } from './gameLogic';
import { GameState } from '../src/game/types';

describe('Game Logic', () => {
  let state: GameState;

  beforeEach(() => {
    state = createInitialState('test-room');
  });

  it('allows players to join and starts the game correctly', () => {
    state = gameReducer(state, { type: 'JOIN_GAME', payload: { nickname: 'Phat', tokenColor: 'red' } }, 'p1');
    state = gameReducer(state, { type: 'JOIN_GAME', payload: { nickname: 'Minh', tokenColor: 'blue' } }, 'p2');
    
    expect(state.players.length).toBe(2);
    expect(state.players[0].money).toBe(1500);

    state = gameReducer(state, { type: 'START_GAME' }, 'p1');
    expect(state.status).toBe('playing');
    expect(state.turnState).toBe('AWAITING_ROLL');
  });

  it('validates rolls and moves player', () => {
    state = gameReducer(state, { type: 'JOIN_GAME', payload: { nickname: 'Phat', tokenColor: 'red' } }, 'p1');
    state = gameReducer(state, { type: 'JOIN_GAME', payload: { nickname: 'Minh', tokenColor: 'blue' } }, 'p2');
    state = gameReducer(state, { type: 'START_GAME' }, 'p1');

    const initialState = { ...state };
    const p1 = state.players.find(p => p.id === 'p1');
    expect(p1?.position).toBe(0);

    state = gameReducer(state, { type: 'ROLL_DICE' }, 'p1');
    
    const p1After = state.players.find(p => p.id === 'p1');
    expect(p1After?.position).toBeGreaterThan(0);
    // Because dice roll is random, we just check they moved.
    // In a real test we'd mock Math.random, which we will do next.
  });

  it('handles buying property', () => {
    // Mock Math.random so dice roll is deterministic (e.g., 3 + 3 = 6)
    vi.spyOn(Math, 'random').mockReturnValue(0.4); // 0.4 * 6 = 2.4 => floor is 2 + 1 = 3

    state = gameReducer(state, { type: 'JOIN_GAME', payload: { nickname: 'Phat', tokenColor: 'red' } }, 'p1');
    state = gameReducer(state, { type: 'JOIN_GAME', payload: { nickname: 'Minh', tokenColor: 'blue' } }, 'p2');
    state = gameReducer(state, { type: 'START_GAME' }, 'p1');

    state = gameReducer(state, { type: 'ROLL_DICE' }, 'p1');
    // 3 + 3 = 6 -> Lương Định Của (price: 100)
    
    expect(state.turnState).toBe('AWAITING_ACTION');
    expect(state.awaitingAction?.type).toBe('buy_property');
    expect(state.awaitingAction?.spaceIndex).toBe(6);

    state = gameReducer(state, { type: 'BUY_PROPERTY' }, 'p1');
    
    const p1After = state.players.find(p => p.id === 'p1');
    expect(p1After?.money).toBe(1400); // 1500 - 100
    expect(state.properties['06_luong_dinh_cua'].ownerId).toBe('p1');
    
    // Because it was doubles, Phat should get another turn!
    expect(state.currentPlayerIndex).toBe(0); 
    expect(state.turnState).toBe('AWAITING_ROLL');

    vi.restoreAllMocks();
  });

  it('handles paying rent', () => {
    state = gameReducer(state, { type: 'JOIN_GAME', payload: { nickname: 'Phat', tokenColor: 'red' } }, 'p1');
    state = gameReducer(state, { type: 'JOIN_GAME', payload: { nickname: 'Minh', tokenColor: 'blue' } }, 'p2');
    state = gameReducer(state, { type: 'START_GAME' }, 'p1');
    
    // Give p1 a property
    state.properties['01_nguyen_hue'] = { ownerId: 'p1', houseCount: 0, isMortgaged: false };
    
    // Mock dice for p2 so they land on space 1 (Nguyễn Huệ)
    vi.spyOn(Math, 'random').mockReturnValue(0.0); // 1 + 1 = 2 (Wait, we want space 1... but minimum dice is 1+1=2)
    // Ah, minimum roll is 2. So we can't easily land on space 1 from start in one roll.
    // Let's manually move p2 to space 39, then roll 2 to land on 1.
    const p2 = state.players.find(p => p.id === 'p2');
    if (p2) p2.position = 39;

    // Wait, it's p1's turn first. Let's just mock p1 rolling non-doubles to end their turn.
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.5); // d1=4
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.1); // d2=1
    state = gameReducer(state, { type: 'ROLL_DICE' }, 'p1'); // p1 lands on 5 (Bến Xe Cần Giuộc)
    state = gameReducer(state, { type: 'SKIP_BUY' }, 'p1'); // p1 skips buying

    expect(state.currentPlayerIndex).toBe(1); // p2's turn

    vi.spyOn(Math, 'random').mockReturnValue(0.0); // 1 + 1 = 2
    state = gameReducer(state, { type: 'ROLL_DICE' }, 'p2'); 
    // p2 moves from 39 + 2 = 41 % 40 = 1 (Nguyễn Huệ)
    // Rent for Nguyễn Huệ is 2. p2 receives 200 for passing GO. (39 -> 1 passes 0).
    
    const p1After = state.players.find(p => p.id === 'p1');
    const p2After = state.players.find(p => p.id === 'p2');

    expect(p2After?.money).toBe(1500 + 200 - 2); 
    expect(p1After?.money).toBe(1500 + 2); // 1500 + 2 rent

    vi.restoreAllMocks();
  });
});
