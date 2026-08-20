'use client';

import { GameState, PropertySpace } from '@/game/types';
import { BOARD_SPACES } from '@/game/boardConfig';
import { sounds } from '@/utils/sound';
import { Home, Ban, Receipt, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContextActionPanelProps {
  state: GameState;
  playerId: string;
  dispatch: any;
  isMoving?: boolean;
}

export default function ContextActionPanel({ state, playerId, dispatch, isMoving = false }: ContextActionPanelProps) {
  const isMyTurn = state.playerOrder[state.currentPlayerIndex] === playerId;
  const player = state.players.find(p => p.id === playerId);

  // Do not show decisions until the player has finished physically moving to the space!
  if (!isMyTurn || state.turnState !== 'AWAITING_ACTION' || !state.awaitingAction || !player || isMoving) {
    return null;
  }

  const { type, spaceIndex, card } = state.awaitingAction;
  const currentSpace = spaceIndex !== undefined ? BOARD_SPACES[spaceIndex] : null;

  const handleBuy = () => {
    sounds.playBuyProperty();
    dispatch({ type: 'BUY_PROPERTY' });
  };

  const handleSkip = () => {
    dispatch({ type: 'SKIP_BUY' });
  };

  const handlePayTax = () => {
    sounds.playMoneyPay();
    dispatch({ type: 'PAY_TAX' });
  };

  const handleDismissCard = () => {
    dispatch({ type: 'DISMISS_CARD' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-xl space-y-3"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-black uppercase tracking-wider text-amber-400">
          Quyết Định Của Bạn
        </span>
      </div>

      {/* Buying Property Action */}
      {type === 'buy_property' && currentSpace && (
        <div className="space-y-3">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-white uppercase">{currentSpace.name}</span>
              <span className="text-xs font-mono font-black text-amber-400">
                ${(currentSpace as PropertySpace).price}
              </span>
            </div>
            
            <div className="text-xs text-slate-400 flex justify-between">
              <span>Số dư hiện tại:</span>
              <span className="font-mono text-emerald-400 font-bold">${player.money}</span>
            </div>
            
            <div className="text-xs text-slate-400 flex justify-between mt-0.5">
              <span>Sau khi mua:</span>
              <span className={`font-mono font-bold ${
                player.money >= (currentSpace as PropertySpace).price ? 'text-slate-200' : 'text-red-400'
              }`}>
                ${player.money - (currentSpace as PropertySpace).price}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleBuy}
              disabled={player.money < (currentSpace as PropertySpace).price}
              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            >
              <Home size={16} />
              <span>MUA ${(currentSpace as PropertySpace).price}</span>
            </button>

            <button
              onClick={handleSkip}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95 cursor-pointer"
            >
              <Ban size={16} />
              <span>BỎ QUA</span>
            </button>
          </div>
        </div>
      )}

      {/* Tax Payment Action */}
      {type === 'pay_tax' && currentSpace && (
        <div className="space-y-3">
          <div className="bg-red-950/40 border border-red-800/50 p-3 rounded-xl text-xs text-red-200">
            Bạn vừa dừng chân tại ô <strong>{currentSpace.name}</strong>. Cần nộp phạt cho ngân hàng.
          </div>

          <button
            onClick={handlePayTax}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
          >
            <Receipt size={18} />
            <span>NỘP THUẾ ${(currentSpace as any).taxAmount || 100}</span>
          </button>
        </div>
      )}

      {/* Dismiss Card Action */}
      {type === 'card_dismiss' && (
        <button
          onClick={handleDismissCard}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
        >
          <span>TIẾP TỤC TRÒ CHƠI</span>
          <ArrowRight size={18} />
        </button>
      )}
    </motion.div>
  );
}
