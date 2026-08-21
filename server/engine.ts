import { GameState, ClientAction, Player, TurnState, BoardSpace, PropertySpace, TransportSpace, UtilitySpace, GameEvent, PlayerStats } from '../src/game/types';
import { BOARD_SPACES } from '../src/game/boardConfig';
import { CHANCE_CARDS, FORTUNE_CARDS, Card } from '../src/game/cards';
import { formatMoney } from '../src/utils/format';

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
      startingMoney: 15_000_000, // 15 Triệu VNĐ (Tương đương $1,500 chuẩn Monopoly)
      goSalary: 2_000_000,       // 2 Triệu VNĐ (Tương đương $200 chuẩn Monopoly)
    },
    jackpotPool: 1_000_000,      // Hũ tiền Bãi Đỗ Xe khởi điểm 1 Triệu VNĐ
    awaitingAction: null,
    lastDrawnCard: null,
    lastCenterBanner: null,
    activeTradeOffer: null,
    activeAuction: null,
    playerStats: {},
    lastReaction: null,
    lastChatPhrase: null
  };
}

function ensurePlayerStats(state: GameState, playerId: string): PlayerStats {
  if (!state.playerStats[playerId]) {
    state.playerStats[playerId] = {
      totalRentPaid: 0,
      totalRentEarned: 0,
      doublesCount: 0,
      jailCount: 0,
      housesBuilt: 0
    };
  }
  return state.playerStats[playerId];
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

// Check if owner owns all properties in a color group
function hasFullColorSet(state: GameState, ownerId: string, colorGroup: PropertySpace['colorGroup']): boolean {
  const groupProperties = BOARD_SPACES.filter(
    s => s.type === 'property' && (s as PropertySpace).colorGroup === colorGroup
  );
  return groupProperties.every(s => state.properties[s.id]?.ownerId === ownerId);
}

// Calculate dynamic rent based on property upgrades, mortgages and monopolies
function calculateRent(state: GameState, space: BoardSpace, diceTotal: number): number {
  const ownership = state.properties[space.id];
  if (!ownership || ownership.isMortgaged) return 0; // Mortgaged properties collect NO rent

  if (space.type === 'property') {
    const pSpace = space as PropertySpace;
    const { houseCount } = ownership;

    if (houseCount === 0) {
      const isMonopoly = hasFullColorSet(state, ownership.ownerId, pSpace.colorGroup);
      return isMonopoly ? pSpace.baseRent * 2 : pSpace.baseRent;
    }
    if (houseCount >= 1 && houseCount <= 4) {
      return pSpace.houseRents[houseCount - 1];
    }
    if (houseCount === 5) {
      return pSpace.hotelRent;
    }
    return pSpace.baseRent;
  }

  if (space.type === 'transport') {
    const allTransports = BOARD_SPACES.filter(s => s.type === 'transport');
    const ownedCount = allTransports.filter(s => {
      const o = state.properties[s.id];
      return o && o.ownerId === ownership.ownerId && !o.isMortgaged;
    }).length;

    switch (ownedCount) {
      case 1: return 250_000;
      case 2: return 500_000;
      case 3: return 1_000_000;
      case 4: return 2_000_000;
      default: return 250_000;
    }
  }

  if (space.type === 'utility') {
    const allUtilities = BOARD_SPACES.filter(s => s.type === 'utility');
    const ownedCount = allUtilities.filter(s => {
      const o = state.properties[s.id];
      return o && o.ownerId === ownership.ownerId && !o.isMortgaged;
    }).length;

    const multiplier = ownedCount >= 2 ? 100_000 : 40_000;
    return diceTotal * multiplier;
  }

  return 0;
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

  if (player) {
    ensurePlayerStats(draft, player.id);
  }

  switch (action.type) {
    case 'JOIN_GAME': {
      if (draft.status !== 'waiting') return draft;
      if (draft.players.length >= 5) return draft;
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
        ensurePlayerStats(draft, playerId);
        logEvent(draft, `${action.payload.nickname} đã tham gia phòng.`, undefined, playerId);
      }
      return draft;
    }

    case 'START_GAME': {
      if (!isHost || draft.status !== 'waiting' || draft.players.length < 2 || draft.players.length > 5) return draft;
      draft.status = 'playing';
      draft.turnState = 'AWAITING_ROLL';
      draft.players.forEach(p => ensurePlayerStats(draft, p.id));
      logEvent(draft, 'Trò chơi bắt đầu!');
      logEvent(draft, `Đến lượt của ${draft.players[0].nickname}.`);
      setCenterBanner(draft, 'TRÒ CHƠI BẮT ĐẦU!', 'pass_go');
      return draft;
    }

    case 'RESTART_GAME': {
      if (draft.status !== 'finished') return draft;
      
      draft.players.forEach(p => {
        p.money = draft.config.startingMoney;
        p.position = 0;
        p.isBankrupt = false;
        p.inJail = false;
        p.jailTurns = 0;
        p.doublesCount = 0;
      });

      draft.status = 'waiting';
      draft.turnState = 'WAITING_FOR_PLAYERS';
      draft.currentPlayerIndex = 0;
      draft.properties = {};
      draft.events = [];
      draft.winnerId = undefined;
      draft.awaitingAction = null;
      draft.lastDrawnCard = null;
      draft.lastCenterBanner = null;
      draft.activeTradeOffer = null;
      draft.activeAuction = null;
      draft.jackpotPool = 1_000_000;
      draft.playerStats = {};
      draft.lastReaction = null;
      draft.lastChatPhrase = null;

      draft.players.forEach(p => ensurePlayerStats(draft, p.id));

      logEvent(draft, '🔄 Phòng chơi đã được làm mới toàn bộ! Sẵn sàng cho trận đấu mới.');
      setCenterBanner(draft, 'PHÒNG CHƠI ĐÃ ĐƯỢC TẠO LẠI!', 'pass_go');
      return draft;
    }

    case 'PAY_JAIL_FINE': {
      if (draft.status !== 'playing' || !isCurrentTurn || !player || !player.inJail) return draft;
      const fine = 500_000;

      if (player.money >= fine) {
        player.money -= fine;
        player.inJail = false;
        player.jailTurns = 0;
        draft.turnState = 'AWAITING_ROLL';
        logEvent(draft, `${player.nickname} đã nộp phạt ${formatMoney(fine)} để ra tù và được tung xúc xắc.`, 'jail', playerId, -fine);
        setCenterBanner(draft, `🔓 ${player.nickname} NỘP 500K ₫ RA TÙ`, 'jail');
      } else {
        logEvent(draft, `${player.nickname} không đủ tiền nộp phạt ra tù.`);
      }
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

      if (isDouble) {
        draft.playerStats[player.id].doublesCount += 1;
      }

      if (player.inJail) {
        if (isDouble) {
          player.inJail = false;
          player.jailTurns = 0;
          logEvent(draft, `${player.nickname} đổ được đôi và ra tù thành công!`, 'jail', playerId);
        } else {
          player.jailTurns += 1;
          if (player.jailTurns >= 3) {
            player.money -= 500_000;
            player.inJail = false;
            player.jailTurns = 0;
            logEvent(draft, `${player.nickname} ở tù đủ 3 lượt, nộp phạt 500.000 ₫ để ra tù.`, 'jail', playerId, -500_000);
          } else {
            logEvent(draft, `${player.nickname} không đổ được đôi (lượt ${player.jailTurns}/3) và vẫn ở trong tù.`, 'jail', playerId);
            nextPlayer(draft);
            return draft;
          }
        }
      }

      if (isDouble) {
        player.doublesCount += 1;
        if (player.doublesCount === 3) {
          logEvent(draft, `${player.nickname} đổ 3 lần đôi liên tiếp. Bị bắt vào tù!`, 'jail', playerId);
          player.position = 10;
          player.inJail = true;
          player.doublesCount = 0;
          draft.playerStats[player.id].jailCount += 1;
          setCenterBanner(draft, `🚓 ${player.nickname} BỊ VÀO TÙ!`, 'jail');
          nextPlayer(draft);
          return draft;
        }
      } else {
        player.doublesCount = 0;
      }

      draft.turnState = 'MOVING';
      
      // Move player to stepped space
      const nextPos = player.position + d1 + d2;
      if (nextPos >= 40) {
        player.money += draft.config.goSalary;
        logEvent(draft, `${player.nickname} đi qua Bắt Đầu và nhận ${formatMoney(draft.config.goSalary)}.`, 'pass_go', playerId, draft.config.goSalary);
        setCenterBanner(draft, `💰 ${player.nickname} NHẬN LƯƠNG ${formatMoney(draft.config.goSalary)}`, 'pass_go');
      }
      player.position = nextPos % 40;

      // Resolve stepped space
      draft.turnState = 'RESOLVING_SPACE';
      const space = BOARD_SPACES[player.position];
      logEvent(draft, `${player.nickname} đi đến ô ${space.name}.`);

      // 1. FREE PARKING JACKPOT POOL (Space 20)
      if (space.type === 'parking') {
        if (draft.jackpotPool > 0) {
          const wonJackpot = draft.jackpotPool;
          player.money += wonJackpot;
          draft.jackpotPool = 1_000_000; // Reset starting pool
          logEvent(draft, `🎰 ${player.nickname} giẫm vào Bãi Đỗ Xe và ôm trọn HŨ TIỀN JACKPOT ${formatMoney(wonJackpot)}!`, 'jackpot', playerId, wonJackpot);
          setCenterBanner(draft, `🎰 ${player.nickname} NỔ HŨ ${formatMoney(wonJackpot)}!`, 'jackpot');
        }
        nextPlayer(draft);
        return draft;
      }

      if (space.type === 'property' || space.type === 'transport' || space.type === 'utility') {
        const ownership = draft.properties[space.id];
        if (ownership) {
          if (ownership.ownerId !== player.id) {
            const owner = draft.players.find(p => p.id === ownership.ownerId);
            if (owner && !owner.inJail) {
              const rent = calculateRent(draft, space, d1 + d2);
              
              if (rent > 0) {
                if (player.money >= rent) {
                  player.money -= rent;
                  owner.money += rent;
                  draft.playerStats[player.id].totalRentPaid += rent;
                  draft.playerStats[owner.id].totalRentEarned += rent;
                  logEvent(draft, `${player.nickname} trả ${formatMoney(rent)} tiền thuê cho ${owner.nickname}.`, 'rent', playerId, -rent);
                  setCenterBanner(draft, `💸 ${player.nickname} TRẢ ${formatMoney(rent)} TIỀN THUÊ`, 'rent');
                  nextPlayer(draft);
                } else {
                  draft.turnState = 'AWAITING_ACTION';
                  draft.awaitingAction = {
                    type: 'pay_rent',
                    spaceIndex: player.position,
                    amount: rent,
                    creditorId: owner.id
                  };
                  logEvent(draft, `⚠️ ${player.nickname} không đủ tiền mặt trả ${formatMoney(rent)} tiền thuê cho ${owner.nickname}. Cần thế chấp tài sản!`);
                  setCenterBanner(draft, `⚠️ ${player.nickname} CẦN THẾ CHẤP TRẢ NỢ!`, 'rent');
                }
              } else {
                logEvent(draft, `${space.name} đang bị thế chấp nên không thu tiền thuê.`);
                nextPlayer(draft);
              }
            } else {
              nextPlayer(draft);
            }
          } else {
            if (space.type === 'property' && !ownership.isMortgaged && ownership.houseCount < 5) {
              draft.turnState = 'AWAITING_ACTION';
              draft.awaitingAction = { type: 'upgrade_property', spaceIndex: player.position };
            } else {
              nextPlayer(draft);
            }
          }
        } else {
          draft.turnState = 'AWAITING_ACTION';
          draft.awaitingAction = { type: 'buy_property', spaceIndex: player.position };
        }
      } else if (space.type === 'tax') {
        const spaceTax = (space as any).taxAmount || 1_000_000;
        draft.turnState = 'AWAITING_ACTION';
        draft.awaitingAction = { 
          type: 'pay_tax', 
          spaceIndex: player.position, 
          amount: spaceTax, 
          creditorId: 'bank' 
        };
      } else if (space.type === 'go_to_jail') {
        player.position = 10;
        player.inJail = true;
        draft.playerStats[player.id].jailCount += 1;
        logEvent(draft, `${player.nickname} bị vào tù!`, 'jail', playerId);
        setCenterBanner(draft, `🚓 ${player.nickname} BỊ VÀO TÙ!`, 'jail');
        nextPlayer(draft);
      } else if (space.type === 'chance' || space.type === 'fortune') {
        const deck = space.type === 'chance' ? CHANCE_CARDS : FORTUNE_CARDS;
        const card = deck[Math.floor(Math.random() * deck.length)];
        
        draft.lastDrawnCard = card;
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
        logEvent(draft, `${player.nickname} đã mua ${space.name} (${formatMoney(price)}).`, 'buy', playerId, -price);
        setCenterBanner(draft, `🏠 ${player.nickname} ĐÃ MUA ${space.name.toUpperCase()}`, 'buy');
      } else {
        logEvent(draft, `${player.nickname} không đủ tiền mua ${space.name}.`);
      }
      
      draft.awaitingAction = null;
      nextPlayer(draft);
      return draft;
    }

    // ================= AUCTION TRIGGER WHEN SKIPPING BUY =================
    case 'SKIP_BUY': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      if (!draft.awaitingAction || draft.awaitingAction.type !== 'buy_property') return draft;
      
      const space = BOARD_SPACES[draft.awaitingAction.spaceIndex!];
      const startingBid = Math.floor(((space as any).price || 1_000_000) * 0.3); // 30% base price start

      draft.activeAuction = {
        spaceId: space.id,
        currentBid: startingBid,
        highestBidderId: null,
        endTime: Date.now() + 12000
      };

      draft.awaitingAction = null;
      logEvent(draft, `🔨 ${player?.nickname || 'Người chơi'} không mua ${space.name}. Bắt đầu phiên ĐẤU GIÁ CÔNG KHAI! Khởi điểm: ${formatMoney(startingBid)}.`, 'auction');
      setCenterBanner(draft, `🔨 ĐẤU GIÁ ${space.name.toUpperCase()}!`, 'auction');
      return draft;
    }

    case 'BID_AUCTION': {
      if (draft.status !== 'playing' || !draft.activeAuction || !player || player.isBankrupt) return draft;
      const { amount } = action.payload;
      const space = BOARD_SPACES.find(s => s.id === draft.activeAuction?.spaceId);

      if (amount > draft.activeAuction.currentBid && player.money >= amount) {
        draft.activeAuction.currentBid = amount;
        draft.activeAuction.highestBidderId = playerId;
        draft.activeAuction.endTime = Date.now() + 8000; // Reset 8s for exciting bidding war
        logEvent(draft, `🔨 ${player.nickname} trả giá ${formatMoney(amount)} cho ${space?.name || 'ô đất'}.`, 'auction', playerId);
      }
      return draft;
    }

    case 'PASS_AUCTION': {
      if (draft.status !== 'playing' || !draft.activeAuction) return draft;
      const auction = draft.activeAuction;
      const space = BOARD_SPACES.find(s => s.id === auction.spaceId);

      if (auction.highestBidderId) {
        const winner = draft.players.find(p => p.id === auction.highestBidderId);
        if (winner && winner.money >= auction.currentBid && space) {
          winner.money -= auction.currentBid;
          draft.properties[space.id] = { ownerId: winner.id, houseCount: 0, isMortgaged: false };
          logEvent(draft, `🎉 ${winner.nickname} đã thắng phiên đấu giá ${space.name} với mức giá ${formatMoney(auction.currentBid)}!`, 'auction', winner.id, -auction.currentBid);
          setCenterBanner(draft, `🎉 ${winner.nickname} THẮNG ĐẤU GIÁ!`, 'buy');
        }
      } else {
        logEvent(draft, `Phiên đấu giá ${space?.name || 'ô đất'} kết thúc mà không có ai đặt giá.`, 'auction');
      }

      draft.activeAuction = null;
      nextPlayer(draft);
      return draft;
    }

    case 'UPGRADE_PROPERTY': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      if (!draft.awaitingAction || draft.awaitingAction.type !== 'upgrade_property') return draft;
      if (!player) return draft;

      const space = BOARD_SPACES[draft.awaitingAction.spaceIndex!] as PropertySpace;
      const ownership = draft.properties[space.id];

      if (ownership && ownership.ownerId === player.id && !ownership.isMortgaged && ownership.houseCount < 5) {
        const cost = space.houseCost;
        if (player.money >= cost) {
          player.money -= cost;
          ownership.houseCount += 1;
          draft.playerStats[player.id].housesBuilt += 1;
          const upgradeLabel = ownership.houseCount === 5 ? 'KHÁCH SẠN 🏨' : `${ownership.houseCount} NHÀ 🏠`;
          logEvent(draft, `${player.nickname} đã nâng cấp ${space.name} lên ${upgradeLabel} (${formatMoney(cost)}).`, 'upgrade', playerId, -cost);
          setCenterBanner(draft, `🏗️ ${player.nickname} XÂY ${upgradeLabel} TẠI ${space.name.toUpperCase()}`, 'upgrade');
        } else {
          logEvent(draft, `${player.nickname} không đủ tiền nâng cấp ${space.name}.`);
        }
      }

      draft.awaitingAction = null;
      nextPlayer(draft);
      return draft;
    }

    case 'SKIP_UPGRADE': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      if (!draft.awaitingAction || draft.awaitingAction.type !== 'upgrade_property') return draft;
      
      draft.awaitingAction = null;
      nextPlayer(draft);
      return draft;
    }

    case 'MORTGAGE_PROPERTY': {
      if (draft.status !== 'playing' || !player) return draft;
      const { spaceId } = action.payload;
      const ownership = draft.properties[spaceId];
      const space = BOARD_SPACES.find(s => s.id === spaceId);

      if (ownership && ownership.ownerId === player.id && !ownership.isMortgaged && space && (space as any).price) {
        let refund = 0;
        if (ownership.houseCount > 0) {
          const houseCost = (space as PropertySpace).houseCost || 500_000;
          refund = Math.floor(ownership.houseCount * houseCost * 0.5);
          ownership.houseCount = 0;
        }

        const mortgageValue = Math.floor((space as any).price * 0.5);
        player.money += mortgageValue + refund;
        ownership.isMortgaged = true;

        logEvent(draft, `${player.nickname} đã thế chấp ${space.name}, nhận ${formatMoney(mortgageValue + refund)}.`, 'mortgage', playerId, mortgageValue + refund);
        setCenterBanner(draft, `🏦 ${player.nickname} THẾ CHẤP ${space.name.toUpperCase()}`, 'tax');
      }
      return draft;
    }

    case 'UNMORTGAGE_PROPERTY': {
      if (draft.status !== 'playing' || !player) return draft;
      const { spaceId } = action.payload;
      const ownership = draft.properties[spaceId];
      const space = BOARD_SPACES.find(s => s.id === spaceId);

      if (ownership && ownership.ownerId === player.id && ownership.isMortgaged && space && (space as any).price) {
        const unmortgageCost = Math.floor((space as any).price * 0.55);

        if (player.money >= unmortgageCost) {
          player.money -= unmortgageCost;
          ownership.isMortgaged = false;

          logEvent(draft, `${player.nickname} đã giải chấp / chuộc lại ${space.name} (${formatMoney(unmortgageCost)}).`, 'unmortgage', playerId, -unmortgageCost);
          setCenterBanner(draft, `🎉 ${player.nickname} GIẢI CHẤP ${space.name.toUpperCase()}`, 'buy');
        } else {
          logEvent(draft, `${player.nickname} không đủ tiền giải chấp ${space.name}.`);
        }
      }
      return draft;
    }

    case 'PAY_RENT': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      if (!draft.awaitingAction || draft.awaitingAction.type !== 'pay_rent') return draft;
      if (!player) return draft;

      const { amount, creditorId } = draft.awaitingAction;
      const rentAmount = amount || 0;
      const creditor = draft.players.find(p => p.id === creditorId);

      if (player.money >= rentAmount) {
        player.money -= rentAmount;
        if (creditor) {
          creditor.money += rentAmount;
          draft.playerStats[player.id].totalRentPaid += rentAmount;
          draft.playerStats[creditor.id].totalRentEarned += rentAmount;
        }
        logEvent(draft, `${player.nickname} đã trả ${formatMoney(rentAmount)} tiền thuê cho ${creditor?.nickname || 'đối thủ'}.`, 'rent', playerId, -rentAmount);
        setCenterBanner(draft, `💸 ${player.nickname} ĐÃ THANH TOÁN TIỀN THUÊ`, 'rent');
        draft.awaitingAction = null;
        nextPlayer(draft);
      } else {
        logEvent(draft, `${player.nickname} vẫn còn thiếu tiền! Hãy thế chấp thêm tài sản.`);
      }
      return draft;
    }

    case 'DECLARE_BANKRUPTCY': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      if (!player) return draft;

      player.isBankrupt = true;
      const creditorId = draft.awaitingAction?.creditorId;

      if (creditorId && creditorId !== 'bank') {
        const creditor = draft.players.find(p => p.id === creditorId);
        if (creditor) {
          if (player.money > 0) creditor.money += player.money;
          player.money = 0;

          Object.entries(draft.properties).forEach(([sId, o]) => {
            if (o.ownerId === player.id) {
              o.ownerId = creditor.id;
            }
          });
          logEvent(draft, `💀 ${player.nickname} đã tuyên bố phá sản! Toàn bộ tài sản được chuyển cho ${creditor.nickname}.`, 'bankrupt', playerId);
        }
      } else {
        Object.entries(draft.properties).forEach(([sId, o]) => {
          if (o.ownerId === player.id) {
            delete draft.properties[sId];
          }
        });
        logEvent(draft, `💀 ${player.nickname} đã tuyên bố phá sản trước ngân hàng!`, 'bankrupt', playerId);
      }

      setCenterBanner(draft, `💀 ${player.nickname} ĐÃ PHÁ SẢN!`, 'tax');
      draft.awaitingAction = null;
      nextPlayer(draft);
      return draft;
    }

    case 'PAY_TAX': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      if (!draft.awaitingAction || draft.awaitingAction.type !== 'pay_tax') return draft;
      if (!player) return draft;

      const space = BOARD_SPACES[draft.awaitingAction.spaceIndex!] as any;
      let amount = space.taxAmount || 1_000_000;
      
      if (space.isPercentageOption && action.payload?.percentage) {
        amount = Math.floor(player.money * 0.10);
      }
      
      if (player.money >= amount) {
        player.money -= amount;
        draft.jackpotPool += amount; // Tax money flows directly into the Free Parking Jackpot Pool!
        logEvent(draft, `${player.nickname} đã nộp thuế ${formatMoney(amount)} (tiền được nạp vào Hũ Jackpot).`, 'tax', playerId, -amount);
        setCenterBanner(draft, `🧾 ${player.nickname} NỘP THUẾ (HŨ +${formatMoney(amount)})`, 'tax');
        draft.awaitingAction = null;
        nextPlayer(draft);
      } else {
        logEvent(draft, `${player.nickname} không đủ tiền mặt nộp thuế! Cần thế chấp tài sản.`);
      }
      
      return draft;
    }

    // ================= TRADE MECHANICS =================
    case 'PROPOSE_TRADE': {
      if (draft.status !== 'playing' || !player || player.isBankrupt) return draft;
      const { toPlayerId, offeredSpaceIds, requestedSpaceIds, offeredMoney, requestedMoney } = action.payload;
      const targetPlayer = draft.players.find(p => p.id === toPlayerId);
      if (!targetPlayer || targetPlayer.isBankrupt) return draft;

      draft.activeTradeOffer = {
        id: Math.random().toString(36).substring(2, 9),
        fromPlayerId: playerId,
        toPlayerId,
        offeredSpaceIds: offeredSpaceIds || [],
        requestedSpaceIds: requestedSpaceIds || [],
        offeredMoney: offeredMoney || 0,
        requestedMoney: requestedMoney || 0
      };

      logEvent(draft, `🤝 ${player.nickname} đã gửi lời đề nghị đổi đất đến ${targetPlayer.nickname}.`, 'trade');
      setCenterBanner(draft, `🤝 LỜI ĐỀ NGHỊ ĐỔI ĐẤT: ${player.nickname} ➔ ${targetPlayer.nickname}`, 'card');
      return draft;
    }

    case 'ACCEPT_TRADE': {
      if (draft.status !== 'playing' || !draft.activeTradeOffer) return draft;
      const offer = draft.activeTradeOffer;
      if (offer.toPlayerId !== playerId) return draft;

      const fromP = draft.players.find(p => p.id === offer.fromPlayerId);
      const toP = draft.players.find(p => p.id === offer.toPlayerId);
      if (!fromP || !toP || fromP.isBankrupt || toP.isBankrupt) return draft;

      // Validate funds
      if (fromP.money < offer.offeredMoney || toP.money < offer.requestedMoney) {
        logEvent(draft, `Giao dịch thất bại do không đủ tiền mặt.`);
        draft.activeTradeOffer = null;
        return draft;
      }

      // Transfer funds
      fromP.money -= offer.offeredMoney;
      toP.money += offer.offeredMoney;
      toP.money -= offer.requestedMoney;
      fromP.money += offer.requestedMoney;

      // Transfer offered properties
      offer.offeredSpaceIds.forEach(sId => {
        if (draft.properties[sId] && draft.properties[sId].ownerId === fromP.id) {
          draft.properties[sId].ownerId = toP.id;
        }
      });

      // Transfer requested properties
      offer.requestedSpaceIds.forEach(sId => {
        if (draft.properties[sId] && draft.properties[sId].ownerId === toP.id) {
          draft.properties[sId].ownerId = fromP.id;
        }
      });

      logEvent(draft, `🎉 Giao dịch thành công! ${fromP.nickname} và ${toP.nickname} đã hoán đổi bất động sản.`, 'trade');
      setCenterBanner(draft, `🎉 GIAO DỊCH THÀNH CÔNG!`, 'buy');
      draft.activeTradeOffer = null;
      return draft;
    }

    case 'REJECT_TRADE':
    case 'CANCEL_TRADE': {
      if (!draft.activeTradeOffer) return draft;
      logEvent(draft, `Lời đề nghị đổi đất đã bị từ chối hoặc hủy bỏ.`, 'trade');
      draft.activeTradeOffer = null;
      return draft;
    }

    // ================= EMOJI & CHAT REACTION MECHANICS =================
    case 'SEND_REACTION': {
      if (!player) return draft;
      draft.lastReaction = {
        id: Math.random().toString(36).substring(2, 9),
        playerId,
        emoji: action.payload.emoji,
        timestamp: Date.now()
      };
      return draft;
    }

    case 'SEND_CHAT_PHRASE': {
      if (!player) return draft;
      draft.lastChatPhrase = {
        id: Math.random().toString(36).substring(2, 9),
        playerId,
        text: action.payload.text,
        timestamp: Date.now()
      };
      logEvent(draft, `💬 ${player.nickname}: "${action.payload.text}"`);
      return draft;
    }

    case 'DISMISS_CARD': {
      if (draft.status !== 'playing' || !isCurrentTurn || draft.turnState !== 'AWAITING_ACTION') return draft;
      if (!player) return draft;

      const card = draft.lastDrawnCard || draft.awaitingAction?.card;
      draft.lastDrawnCard = null;
      draft.awaitingAction = null;

      if (!card) {
        nextPlayer(draft);
        return draft;
      }

      // 1. Money change effect
      if (card.effect.type === 'money' && card.effect.amount) {
        player.money += card.effect.amount;
        if (card.effect.amount < 0) {
          draft.jackpotPool += Math.abs(card.effect.amount); // Fees feed into Jackpot
        }
        if (player.money < 0) {
          player.isBankrupt = true;
          logEvent(draft, `${player.nickname} đã phá sản do không đủ tiền trả phí thẻ!`, 'bankrupt', playerId);
        }
        nextPlayer(draft);
        return draft;
      }

      // 2. Collect from all players effect
      if (card.effect.type === 'collect_from_all' && card.effect.amount) {
        const amt = card.effect.amount;
        draft.players.forEach(otherP => {
          if (otherP.id !== player.id && !otherP.isBankrupt) {
            otherP.money -= amt;
            player.money += amt;
            if (otherP.money < 0) {
              otherP.isBankrupt = true;
            }
          }
        });
        nextPlayer(draft);
        return draft;
      }

      // 3. Pay to all players effect
      if (card.effect.type === 'pay_to_all' && card.effect.amount) {
        const amt = card.effect.amount;
        draft.players.forEach(otherP => {
          if (otherP.id !== player.id && !otherP.isBankrupt) {
            player.money -= amt;
            otherP.money += amt;
          }
        });
        if (player.money < 0) {
          player.isBankrupt = true;
          logEvent(draft, `${player.nickname} đã phá sản do không đủ tiền khao bạn bè!`, 'bankrupt', playerId);
        }
        nextPlayer(draft);
        return draft;
      }

      // 4. Property repairs maintenance fee effect
      if (card.effect.type === 'repairs') {
        const houseFee = card.effect.houseFee || 150_000;
        const hotelFee = card.effect.hotelFee || 600_000;
        let houses = 0;
        let hotels = 0;

        Object.entries(draft.properties).forEach(([spaceId, ownership]) => {
          if (ownership.ownerId === player.id) {
            if (ownership.houseCount === 5) hotels += 1;
            else if (ownership.houseCount >= 1 && ownership.houseCount <= 4) houses += ownership.houseCount;
          }
        });

        const totalRepairCost = houses * houseFee + hotels * hotelFee;
        player.money -= totalRepairCost;
        draft.jackpotPool += totalRepairCost; // Maintenance fees flow into the Free Parking Jackpot Pool!
        logEvent(draft, `${player.nickname} nộp ${formatMoney(totalRepairCost)} chi phí bảo trì (${houses} nhà, ${hotels} khách sạn).`, 'tax', playerId, -totalRepairCost);
        
        if (player.money < 0) {
          player.isBankrupt = true;
          logEvent(draft, `${player.nickname} đã phá sản do không đủ tiền bảo trì bất động sản!`, 'bankrupt', playerId);
        }
        nextPlayer(draft);
        return draft;
      }

      // 5. Send to jail effect
      if (card.effect.type === 'jail') {
        player.position = 10;
        player.inJail = true;
        draft.playerStats[player.id].jailCount += 1;
        logEvent(draft, `${player.nickname} bị đưa vào tù!`, 'jail', playerId);
        setCenterBanner(draft, `🚓 ${player.nickname} BỊ VÀO TÙ!`, 'jail');
        nextPlayer(draft);
        return draft;
      }

      // 6. Move relative steps
      if (card.effect.type === 'move_steps' && card.effect.steps !== undefined) {
        const targetPos = (player.position + card.effect.steps + 40) % 40;
        player.position = targetPos;
        const destSpace = BOARD_SPACES[targetPos];
        logEvent(draft, `${player.nickname} di chuyển ${card.effect.steps > 0 ? 'tiến' : 'lùi'} ${Math.abs(card.effect.steps)} ô đến ${destSpace.name}.`);

        if (destSpace.type === 'parking') {
          if (draft.jackpotPool > 0) {
            const wonJackpot = draft.jackpotPool;
            player.money += wonJackpot;
            draft.jackpotPool = 1_000_000;
            logEvent(draft, `🎰 ${player.nickname} giẫm vào Bãi Đỗ Xe và ôm trọn HŨ TIỀN JACKPOT ${formatMoney(wonJackpot)}!`, 'jackpot', playerId, wonJackpot);
            setCenterBanner(draft, `🎰 ${player.nickname} NỔ HŨ ${formatMoney(wonJackpot)}!`, 'jackpot');
          }
          nextPlayer(draft);
          return draft;
        }

        if (destSpace.type === 'property' || destSpace.type === 'transport' || destSpace.type === 'utility') {
          const ownership = draft.properties[destSpace.id];
          if (ownership) {
            if (ownership.ownerId !== player.id) {
              const owner = draft.players.find(p => p.id === ownership.ownerId);
              if (owner && !owner.inJail && !ownership.isMortgaged) {
                const rent = calculateRent(draft, destSpace, 7);
                if (player.money >= rent) {
                  player.money -= rent;
                  owner.money += rent;
                  draft.playerStats[player.id].totalRentPaid += rent;
                  draft.playerStats[owner.id].totalRentEarned += rent;
                  logEvent(draft, `${player.nickname} trả ${formatMoney(rent)} tiền thuê cho ${owner.nickname}.`, 'rent', playerId, -rent);
                  setCenterBanner(draft, `💸 ${player.nickname} TRẢ ${formatMoney(rent)} TIỀN THUÊ`, 'rent');
                  nextPlayer(draft);
                  return draft;
                } else {
                  draft.turnState = 'AWAITING_ACTION';
                  draft.awaitingAction = {
                    type: 'pay_rent',
                    spaceIndex: targetPos,
                    amount: rent,
                    creditorId: owner.id
                  };
                  return draft;
                }
              }
              nextPlayer(draft);
              return draft;
            } else {
              if (destSpace.type === 'property' && !ownership.isMortgaged && ownership.houseCount < 5) {
                draft.turnState = 'AWAITING_ACTION';
                draft.awaitingAction = { type: 'upgrade_property', spaceIndex: targetPos };
                return draft;
              } else {
                nextPlayer(draft);
                return draft;
              }
            }
          } else {
            draft.turnState = 'AWAITING_ACTION';
            draft.awaitingAction = { type: 'buy_property', spaceIndex: targetPos };
            return draft;
          }
        } else if (destSpace.type === 'tax') {
          draft.turnState = 'AWAITING_ACTION';
          draft.awaitingAction = { type: 'pay_tax', spaceIndex: targetPos };
          return draft;
        } else {
          nextPlayer(draft);
          return draft;
        }
      }

      // 7. Move to specific destination space
      if (card.effect.type === 'move_to' && card.effect.targetPosition !== undefined) {
        const targetPos = card.effect.targetPosition;
        
        if (targetPos === 0 || targetPos < player.position) {
          player.money += draft.config.goSalary;
          logEvent(draft, `${player.nickname} đi qua Bắt Đầu và nhận ${formatMoney(draft.config.goSalary)}.`, 'pass_go', playerId, draft.config.goSalary);
          setCenterBanner(draft, `💰 ${player.nickname} NHẬN LƯƠNG ${formatMoney(draft.config.goSalary)}`, 'pass_go');
        }

        player.position = targetPos;
        const destSpace = BOARD_SPACES[targetPos];
        logEvent(draft, `${player.nickname} dịch chuyển đến ${destSpace.name}.`);

        if (destSpace.type === 'parking') {
          if (draft.jackpotPool > 0) {
            const wonJackpot = draft.jackpotPool;
            player.money += wonJackpot;
            draft.jackpotPool = 1_000_000;
            logEvent(draft, `🎰 ${player.nickname} giẫm vào Bãi Đỗ Xe và ôm trọn HŨ TIỀN JACKPOT ${formatMoney(wonJackpot)}!`, 'jackpot', playerId, wonJackpot);
            setCenterBanner(draft, `🎰 ${player.nickname} NỔ HŨ ${formatMoney(wonJackpot)}!`, 'jackpot');
          }
          nextPlayer(draft);
          return draft;
        }

        if (destSpace.type === 'property' || destSpace.type === 'transport' || destSpace.type === 'utility') {
          const ownership = draft.properties[destSpace.id];
          if (ownership) {
            if (ownership.ownerId !== player.id) {
              const owner = draft.players.find(p => p.id === ownership.ownerId);
              if (owner && !owner.inJail && !ownership.isMortgaged) {
                const rent = calculateRent(draft, destSpace, 7);
                if (player.money >= rent) {
                  player.money -= rent;
                  owner.money += rent;
                  draft.playerStats[player.id].totalRentPaid += rent;
                  draft.playerStats[owner.id].totalRentEarned += rent;
                  logEvent(draft, `${player.nickname} trả ${formatMoney(rent)} tiền thuê cho ${owner.nickname}.`, 'rent', playerId, -rent);
                  setCenterBanner(draft, `💸 ${player.nickname} TRẢ ${formatMoney(rent)} TIỀN THUÊ`, 'rent');
                  nextPlayer(draft);
                  return draft;
                } else {
                  draft.turnState = 'AWAITING_ACTION';
                  draft.awaitingAction = {
                    type: 'pay_rent',
                    spaceIndex: targetPos,
                    amount: rent,
                    creditorId: owner.id
                  };
                  return draft;
                }
              }
              nextPlayer(draft);
              return draft;
            } else {
              if (destSpace.type === 'property' && !ownership.isMortgaged && ownership.houseCount < 5) {
                draft.turnState = 'AWAITING_ACTION';
                draft.awaitingAction = { type: 'upgrade_property', spaceIndex: targetPos };
                return draft;
              } else {
                nextPlayer(draft);
                return draft;
              }
            }
          } else {
            draft.turnState = 'AWAITING_ACTION';
            draft.awaitingAction = { type: 'buy_property', spaceIndex: targetPos };
            return draft;
          }
        } else if (destSpace.type === 'tax') {
          draft.turnState = 'AWAITING_ACTION';
          draft.awaitingAction = { type: 'pay_tax', spaceIndex: targetPos };
          return draft;
        } else if (destSpace.type === 'go_to_jail') {
          player.position = 10;
          player.inJail = true;
          draft.playerStats[player.id].jailCount += 1;
          nextPlayer(draft);
          return draft;
        } else {
          nextPlayer(draft);
          return draft;
        }
      }

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
