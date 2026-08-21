import { Card } from './cards';

export type SpaceType = 
  | 'start' 
  | 'property' 
  | 'chance' 
  | 'fortune' 
  | 'tax' 
  | 'transport' 
  | 'jail' 
  | 'parking' 
  | 'go_to_jail' 
  | 'utility';

export interface BaseSpace {
  id: string;
  position: number;
  name: string;
  type: SpaceType;
}

export interface PropertySpace extends BaseSpace {
  type: 'property';
  colorGroup: 'red' | 'pink' | 'teal' | 'light-green' | 'orange' | 'yellow' | 'cyan' | 'dark-blue';
  price: number;
  baseRent: number;
  houseRents: number[];
  hotelRent: number;
  houseCost: number;
  landmark?: string;
  subtitle?: string;
  locationKey?: string;
  region?: 'north' | 'central' | 'south';
  landmarkIcon?: string;
  description?: string;
}

export interface TransportSpace extends BaseSpace {
  type: 'transport';
  price: number;
  baseRent: number;
  landmark?: string;
  subtitle?: string;
  locationKey?: string;
  region?: 'north' | 'central' | 'south';
  landmarkIcon?: string;
  description?: string;
}

export interface UtilitySpace extends BaseSpace {
  type: 'utility';
  price: number;
}

export interface TaxSpace extends BaseSpace {
  type: 'tax';
  taxAmount?: number;
  isPercentageOption?: boolean;
}

export type BoardSpace = BaseSpace | PropertySpace | TransportSpace | UtilitySpace | TaxSpace;

export interface Player {
  id: string;
  nickname: string;
  tokenColor: string;
  position: number;
  money: number;
  isBankrupt: boolean;
  inJail: boolean;
  jailTurns: number;
  doublesCount: number;
  connected: boolean;
}

export interface PropertyOwnership {
  ownerId: string;
  houseCount: number; // 0 = Land, 1-4 = 1-4 Houses, 5 = Hotel
  isMortgaged: boolean;
}

export interface GameEvent {
  id: string;
  timestamp: number;
  message: string;
  type?: 'roll' | 'buy' | 'upgrade' | 'mortgage' | 'unmortgage' | 'rent' | 'tax' | 'card' | 'jail' | 'pass_go' | 'bankrupt' | 'trade';
  playerId?: string;
  amount?: number;
}

export type TurnState = 
  | 'WAITING_FOR_PLAYERS'
  | 'AWAITING_ROLL'
  | 'ROLLING'
  | 'MOVING'
  | 'RESOLVING_SPACE'
  | 'AWAITING_ACTION'
  | 'TURN_COMPLETE'
  | 'GAME_OVER';

export interface TradeOffer {
  id: string;
  fromPlayerId: string;
  toPlayerId: string;
  offeredSpaceIds: string[];
  requestedSpaceIds: string[];
  offeredMoney: number;
  requestedMoney: number;
}

export interface GameState {
  roomId: string;
  revision?: number;
  status: 'waiting' | 'playing' | 'finished';
  players: Player[];
  playerOrder: string[];
  currentPlayerIndex: number;
  turnState: TurnState;
  properties: Record<string, PropertyOwnership>;
  events: GameEvent[];
  config: {
    startingMoney: number;
    goSalary: number;
  };
  winnerId?: string;
  lastDice?: [number, number];
  lastDrawnCard?: Card | null;
  lastCenterBanner?: {
    id: string;
    text: string;
    type: 'buy' | 'upgrade' | 'rent' | 'card' | 'tax' | 'jail' | 'pass_go';
  } | null;
  awaitingAction?: {
    type: 'buy_property' | 'upgrade_property' | 'pay_tax' | 'pay_rent' | 'card_dismiss';
    spaceIndex?: number;
    card?: Card;
    amount?: number;
    creditorId?: string; // Player ID or 'bank'
  } | null;
  activeTradeOffer?: TradeOffer | null;
  lastReaction?: {
    id: string;
    playerId: string;
    emoji: string;
    timestamp: number;
  } | null;
}

export type ClientAction =
  | { type: 'JOIN_GAME'; payload: { nickname: string; tokenColor: string } }
  | { type: 'START_GAME' }
  | { type: 'RESTART_GAME' }
  | { type: 'ROLL_DICE' }
  | { type: 'PAY_JAIL_FINE' }
  | { type: 'BUY_PROPERTY' }
  | { type: 'SKIP_BUY' }
  | { type: 'UPGRADE_PROPERTY' }
  | { type: 'SKIP_UPGRADE' }
  | { type: 'MORTGAGE_PROPERTY'; payload: { spaceId: string } }
  | { type: 'UNMORTGAGE_PROPERTY'; payload: { spaceId: string } }
  | { type: 'PAY_TAX'; payload?: { percentage: boolean } }
  | { type: 'PAY_RENT' }
  | { type: 'DECLARE_BANKRUPTCY' }
  | { type: 'PROPOSE_TRADE'; payload: Omit<TradeOffer, 'id'> }
  | { type: 'ACCEPT_TRADE' }
  | { type: 'REJECT_TRADE' }
  | { type: 'CANCEL_TRADE' }
  | { type: 'SEND_REACTION'; payload: { emoji: string } }
  | { type: 'DISMISS_CARD' }
  | { type: 'END_TURN' }
  | { type: 'LEAVE_GAME' };
