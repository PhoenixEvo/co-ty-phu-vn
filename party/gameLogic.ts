import { GameState, ClientAction, Player, TurnState, BoardSpace, PropertySpace, TransportSpace, UtilitySpace, GameEvent } from '../src/game/types';
import { BOARD_SPACES } from '../src/game/boardConfig';
import { CHANCE_CARDS, FORTUNE_CARDS, Card } from '../src/game/cards';

export function createInitialState(roomId: string): GameState {
  return {
    roomId,
    status: 'waiting',
    players: [],
    playerOrder: [],
    currentPlayerIndex: 0,
    turnState: 'WAITING_FOR_PLAYERS',
    properties: {},
    events: [],
    config: {
      startingMoney: 1500,
      goSalary: 200,
    },
    awaitingAction: null,
    lastDrawnCard: null,
    lastCenterBanner: null
  };
}

function logEvent(
  state: GameState, 
  message: string, 
  type: GameEvent['type'] = undefined, 
  playerId: string | undefined = undefined, 
  amount: number | undefined = undefined
) {
  state.events.push({
    id: Math.random().toString(36).substring(2, 9),
    timestamp: Date.now(),
    message,
    type,
    playerId,
    amount
  });
}

function setCenterBanner(state: GameState, text: string, type: NonNullable<GameState['lastCenterBanner']>['type']) {
  state.lastCenterBanner = {
    id: Math.random().toString(36).substring(2, 9),
    text,
    type
  };
}

function nextPlayer(state: GameState) {
  const activePlayers = state.players.filter(p => !p.isBankrupt);
  
  if (activePlayers.length === 1 && state.status === 'playing') {
    state.status = 'finished';
    state.turnState = 'GAME_OVER';
    state.winnerId = activePlayers[0].id;
    logEvent(state, `🎉 ${activePlayers[0].nickname} đã chiến thắng! Trò chơi kết thúc.`, 'bankrupt');
    setCenterBanner(state, `🎉 ${activePlayers[0].nickname} ĐÃ CHIẾN THẮNG!`, 'buy');
    return;
  }

  const player = state.players.find(p => p.id === state.playerOrder[state.currentPlayerIndex]);
  
  if (player && player.doublesCount > 0 && !player.inJail) {
    // Player gets another turn
    state.turnState = 'AWAITING_ROLL';
    return;
  }

  // Next active player
  let nextIndex = state.currentPlayerIndex;
  do {
    nextIndex = (nextIndex + 1) % state.playerOrder.length;
  } while (state.players.find(p => p.id === state.playerOrder[nextIndex])?.isBankrupt && nextIndex !== state.currentPlayerIndex);

  state.currentPlayerIndex = nextIndex;
  state.turnState = 'AWAITING_ROLL';
  state.lastDrawnCard = null;
  const nextP = state.players.find(p => p.id === state.playerOrder[nextIndex]);
  if (nextP) {
    logEvent(state, `Đến lượt của ${nextP.nickname}.`);
  }
}

export function gameReducer(state: GameState, action: ClientAction, playerId: string): GameState {
  const draft = JSON.parse(JSON.stringify(state)) as GameState;

  const player = draft.players.find(p => p.id === playerId);
  const isHost = draft.players.length > 0 && draft.players[0].id === playerId;
  const isCurrentTurn = draft.playerOrder[draft.currentPlayerIndex] === playerId;

  switch (action.type) {
    case 'JOIN_GAME': {
      if (draft.status !== 'waiting') return draft;
      if (!draft.players.find(p => p.id === playerId)) {
        draft.players.push({
          id: playerId,
          nickname: action.payload.nickname,
          tokenColor: action.payload.tokenColor,
          position: 0,
          money: draft.config.startingMoney,
          isBankrupt: false,
          inJail: false,
          jailTurns: 0,
          doublesCount: 0,
          connected: true,
        });
        draft.playerOrder.push(playerId);
        logEvent(draft, `${action.payload.nickname} đã tham gia phòng.`, undefined, playerId);
      }
      return draft;
    }

    case 'START_GAME': {
      if (!isHost || draft.status !== 'waiting' || draft.players.length < 2) return draft;
      draft.status = 'playing';
      draft.turnState = 'AWAITING_ROLL';
      logEvent(draft, 'Trò chơi bắt đầu!');
      logEvent(draft, `Đến lượt của ${draft.players[0].nickname}.`);
      setCenterBanner(draft, 'TRÒ CHƠI BẮT ĐẦU!', 'pass_go');
      return draft;
    }

    case 'ROLL_DICE': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ROLL') return draft;
      if (!player) return draft;

      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      draft.lastDice = [d1, d2];
      const isDouble = d1 === d2;
      
      logEvent(draft, `${player.nickname} đổ xúc xắc: ${d1} + ${d2} = ${d1 + d2}`, 'roll', playerId);

      if (player.inJail) {
        if (isDouble) {
          player.inJail = false;
          player.jailTurns = 0;
          logEvent(draft, `${player.nickname} đổ được đôi và ra tù!`, 'jail', playerId);
        } else {
          player.jailTurns += 1;
          if (player.jailTurns >= 3) {
            player.money -= 50;
            player.inJail = false;
            player.jailTurns = 0;
            logEvent(draft, `${player.nickname} phải trả $50 để ra tù.`, 'jail', playerId, -50);
          } else {
            logEvent(draft, `${player.nickname} không đổ được đôi và vẫn ở tù.`, 'jail', playerId);
            nextPlayer(draft);
            return draft;
          }
        }
      }

      if (isDouble) {
        player.doublesCount += 1;
        if (player.doublesCount === 3) {
          logEvent(draft, `${player.nickname} đổ 3 lần đôi liên tiếp. Bị vào tù!`, 'jail', playerId);
          player.position = 10;
          player.inJail = true;
          player.doublesCount = 0;
          setCenterBanner(draft, `🚓 ${player.nickname} BỊ VÀO TÙ!`, 'jail');
          nextPlayer(draft);
          return draft;
        }
      } else {
        player.doublesCount = 0;
      }

      draft.turnState = 'MOVING';
      
      // Move player
      const nextPos = player.position + d1 + d2;
      if (nextPos >= 40) {
        player.money += draft.config.goSalary;
        logEvent(draft, `${player.nickname} đi qua Bắt Đầu và nhận $${draft.config.goSalary}.`, 'pass_go', playerId, draft.config.goSalary);
        setCenterBanner(draft, `💰 ${player.nickname} NHẬN LƯƠNG $${draft.config.goSalary}`, 'pass_go');
      }
      player.position = nextPos % 40;

      // Resolve space
      draft.turnState = 'RESOLVING_SPACE';
      const space = BOARD_SPACES[player.position];
      logEvent(draft, `${player.nickname} đi đến ô ${space.name}.`);

      if (space.type === 'property' || space.type === 'transport' || space.type === 'utility') {
        const ownership = draft.properties[space.id];
        if (ownership) {
          if (ownership.ownerId !== player.id) {
            const owner = draft.players.find(p => p.id === ownership.ownerId);
            if (owner && !owner.inJail) {
              let rent = 0;
              if (space.type === 'property') {
                const pSpace = space as PropertySpace;
                rent = pSpace.baseRent;
              } else if (space.type === 'transport') {
                const tSpace = space as TransportSpace;
                rent = tSpace.baseRent;
              } else if (space.type === 'utility') {
                rent = (d1 + d2) * 4;
              }
              
              player.money -= rent;
              owner.money += rent;
              logEvent(draft, `${player.nickname} trả $${rent} tiền thuê cho ${owner.nickname}.`, 'rent', playerId, -rent);
              setCenterBanner(draft, `💸 ${player.nickname} TRẢ $${rent} TIỀN THUÊ`, 'rent');
              
              if (player.money < 0) {
                player.isBankrupt = true;
                logEvent(draft, `${player.nickname} đã phá sản!`, 'bankrupt', playerId);
                setCenterBanner(draft, `💀 ${player.nickname} ĐÃ PHÁ SẢN!`, 'tax');
              }
            }
            nextPlayer(draft);
          } else {
            nextPlayer(draft);
          }
        } else {
          draft.turnState = 'AWAITING_ACTION';
          draft.awaitingAction = { type: 'buy_property', spaceIndex: player.position };
        }
      } else if (space.type === 'tax') {
        draft.turnState = 'AWAITING_ACTION';
        draft.awaitingAction = { type: 'pay_tax', spaceIndex: player.position };
      } else if (space.type === 'go_to_jail') {
        player.position = 10;
        player.inJail = true;
        logEvent(draft, `${player.nickname} bị vào tù!`, 'jail', playerId);
        setCenterBanner(draft, `🚓 ${player.nickname} BỊ VÀO TÙ!`, 'jail');
        nextPlayer(draft);
      } else if (space.type === 'chance' || space.type === 'fortune') {
        const deck = space.type === 'chance' ? CHANCE_CARDS : FORTUNE_CARDS;
        const card = deck[Math.floor(Math.random() * deck.length)];
        draft.lastDrawnCard = card;
        
        // Execute card effect
        if (card.effect.type === 'money' && card.effect.amount) {
          player.money += card.effect.amount;
        } else if (card.effect.type === 'collect_from_all' && card.effect.amount) {
          const amt = card.effect.amount;
          draft.players.forEach(otherP => {
            if (otherP.id !== player.id && !otherP.isBankrupt) {
              otherP.money -= amt;
              player.money += amt;
            }
          });
        } else if (card.effect.type === 'move_to' && card.effect.targetPosition !== undefined) {
          if (card.effect.targetPosition < player.position && card.effect.targetPosition !== 0) {
            player.money += draft.config.goSalary;
          }
          player.position = card.effect.targetPosition;
        } else if (card.effect.type === 'jail') {
          player.position = 10;
          player.inJail = true;
        }
        
        logEvent(draft, `${player.nickname} rút thẻ ${card.title}: ${card.description}`, 'card', playerId);
        setCenterBanner(draft, `🃏 ${card.title}`, 'card');

        draft.turnState = 'AWAITING_ACTION';
        draft.awaitingAction = { type: 'card_dismiss', card };
      } else {
        nextPlayer(draft);
      }

      return draft;
    }

    case 'BUY_PROPERTY': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      if (!draft.awaitingAction || draft.awaitingAction.type !== 'buy_property') return draft;
      if (!player) return draft;

      const space = BOARD_SPACES[draft.awaitingAction.spaceIndex!];
      const price = (space as PropertySpace).price;
      
      if (player.money >= price) {
        player.money -= price;
        draft.properties[space.id] = { ownerId: player.id, houseCount: 0, isMortgaged: false };
        logEvent(draft, `${player.nickname} đã mua ${space.name} ($${price}).`, 'buy', playerId, -price);
        setCenterBanner(draft, `🏠 ${player.nickname} ĐÃ MUA ${space.name.toUpperCase()}`, 'buy');
      } else {
        logEvent(draft, `${player.nickname} không đủ tiền mua ${space.name}.`);
      }
      
      draft.awaitingAction = null;
      nextPlayer(draft);
      return draft;
    }

    case 'SKIP_BUY': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      if (!draft.awaitingAction || draft.awaitingAction.type !== 'buy_property') return draft;
      
      draft.awaitingAction = null;
      nextPlayer(draft);
      return draft;
    }

    case 'PAY_TAX': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      if (!draft.awaitingAction || draft.awaitingAction.type !== 'pay_tax') return draft;
      if (!player) return draft;

      const space = BOARD_SPACES[draft.awaitingAction.spaceIndex!] as any;
      let amount = space.taxAmount || 100;
      
      if (space.isPercentageOption && action.payload?.percentage) {
        amount = Math.floor(player.money * 0.10);
      }
      
      player.money -= amount;
      logEvent(draft, `${player.nickname} đã nộp thuế $${amount}.`, 'tax', playerId, -amount);
      setCenterBanner(draft, `🧾 ${player.nickname} NỘP THUẾ $${amount}`, 'tax');
      
      if (player.money < 0) {
        player.isBankrupt = true;
        logEvent(draft, `${player.nickname} đã phá sản do nộp thuế!`, 'bankrupt', playerId);
      }
      
      draft.awaitingAction = null;
      nextPlayer(draft);
      return draft;
    }

    case 'DISMISS_CARD': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      draft.awaitingAction = null;
      draft.lastDrawnCard = null;
      nextPlayer(draft);
      return draft;
    }

    case 'END_TURN':
      if (draft.turnState === 'AWAITING_ACTION') return draft;
      nextPlayer(draft);
      return draft;
      
    case 'LEAVE_GAME':
      if (player) player.connected = false;
      return draft;
      
    default:
      return draft;
  }
}

