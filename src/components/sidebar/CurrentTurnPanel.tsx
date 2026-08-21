'use client';

import { useState, useEffect } from 'react';
import { GameState, Player } from '@/game/types';
import Dice3D from '../ui/Dice3D';
import { sounds } from '@/utils/sound';
import { formatMoney } from '@/utils/format';
import { Dices, Sparkles, Clock, Footprints, ShieldAlert, KeyRound, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

interface CurrentTurnPanelProps {
  state: GameState;
  playerId: string;
  dispatch: any;
  isMoving?: boolean;
}

const TURN_TIME_LIMIT = 45; // 45 seconds per turn

export default function CurrentTurnPanel({ state, playerId, dispatch, isMoving = false }: CurrentTurnPanelProps) {
  const [isRollingAnimation, setIsRollingAnimation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TURN_TIME_LIMIT);

  const currentPlayerId = state.playerOrder[state.currentPlayerIndex];
  const currentPlayer = state.players.find(p => p.id === currentPlayerId);
  const isMyTurn = currentPlayerId === playerId;

  // Turn Timer countdown
  useEffect(() => {
    setTimeLeft(TURN_TIME_LIMIT);

    if (state.status !== 'playing' || isMoving || state.turnState === 'GAME_OVER') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auto action on timeout if it's my turn
          if (isMyTurn) {
            if (state.turnState === 'AWAITING_ROLL') {
              dispatch({ type: 'ROLL_DICE' });
            } else if (state.turnState === 'AWAITING_ACTION') {
              if (state.awaitingAction?.type === 'buy_property') {
                dispatch({ type: 'SKIP_BUY' });
              } else if (state.awaitingAction?.type === 'upgrade_property') {
                dispatch({ type: 'SKIP_UPGRADE' });
              } else if (state.awaitingAction?.type === 'card_dismiss') {
                dispatch({ type: 'DISMISS_CARD' });
              }
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.currentPlayerIndex, state.turnState, isMyTurn, isMoving, state.status]);

  const handleRollDice = () => {
    if (!isMyTurn || state.turnState !== 'AWAITING_ROLL' || isMoving) return;

    sounds.playDiceRoll();
    setIsRollingAnimation(true);

    // Slower, more suspenseful 900ms roll animation before state dispatch
    setTimeout(() => {
      setIsRollingAnimation(false);
      dispatch({ type: 'ROLL_DICE' });
    }, 900);
  };

  const handlePayJailFine = () => {
    sounds.playMoneyPay();
    dispatch({ type: 'PAY_JAIL_FINE' });
  };

  if (!currentPlayer) return null;

  const timerPercent = (timeLeft / TURN_TIME_LIMIT) * 100;
  const isTimeCritical = timeLeft <= 10;

  return (
    <div className={`p-4 rounded-2xl shadow-2xl border-2 transition-all ${
      isMyTurn 
        ? 'bg-linear-to-b from-amber-500/15 via-slate-900/90 to-slate-950 border-amber-400/90 shadow-amber-500/15 ring-1 ring-amber-400/40' 
        : 'bg-slate-900/90 border-slate-800'
    }`}>
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          {isMoving ? (
            <span className="font-black text-amber-400 text-sm tracking-wider uppercase flex items-center gap-1.5 animate-pulse">
              <Footprints size={17} className="animate-bounce" /> Đang Di Chuyển...
            </span>
          ) : isMyTurn ? (
            <>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <span className="font-black text-amber-400 text-sm tracking-wider uppercase flex items-center gap-1.5 drop-shadow-[0_1px_4px_rgba(251,191,36,0.4)]">
                <Sparkles size={16} /> Đến Lượt Bạn!
              </span>
            </>
          ) : (
            <span className="font-bold text-slate-400 text-xs tracking-wider uppercase flex items-center gap-1.5">
              <Clock size={14} /> Lượt của {currentPlayer.nickname}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-700/60 shadow-xs">
          <div 
            className="w-3.5 h-3.5 rounded-full border border-white shadow-xs shrink-0" 
            style={{ backgroundColor: currentPlayer.tokenColor }} 
          />
          <span className="text-xs font-bold text-slate-200 truncate max-w-[85px]">
            {currentPlayer.nickname}
          </span>
        </div>
      </div>

      {/* Turn Timer Progress Bar (45s) */}
      {state.status === 'playing' && (
        <div className="my-2 space-y-1">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
            <span className="flex items-center gap-1">
              <Timer size={11} className={isTimeCritical ? 'text-red-400 animate-spin' : ''} />
              Thời gian lượt:
            </span>
            <span className={`font-mono font-black ${
              isTimeCritical ? 'text-red-400 animate-pulse text-xs' : timeLeft <= 20 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {timeLeft}s
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full transition-all duration-300 ${
                isTimeCritical ? 'bg-red-500' : timeLeft <= 20 ? 'bg-amber-400' : 'bg-emerald-500'
              }`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Jail Banner if in Jail */}
      {currentPlayer.inJail && (
        <div className="my-2 p-2.5 bg-red-950/50 border border-red-800/60 rounded-xl text-center">
          <span className="text-xs font-bold text-red-200 flex items-center justify-center gap-1.5">
            <ShieldAlert size={14} className="text-red-400" />
            {isMyTurn ? 'Bạn đang ở trong tù! (Lượt ' + (currentPlayer.jailTurns + 1) + '/3)' : currentPlayer.nickname + ' đang ở trong tù!'}
          </span>
        </div>
      )}

      {/* 3D Dice Display with Total Score */}
      <div className="py-2">
        <Dice3D 
          dice={state.lastDice || [1, 1]} 
          isRolling={isRollingAnimation} 
        />
      </div>

      {/* Main Buttons */}
      {isMyTurn && state.turnState === 'AWAITING_ROLL' && (
        <div className="space-y-2">
          {/* Roll Dice Button */}
          <motion.button
            whileHover={{ scale: isMoving ? 1 : 1.02 }}
            whileTap={{ scale: isMoving ? 1 : 0.98 }}
            onClick={handleRollDice}
            disabled={isRollingAnimation || isMoving}
            className={`w-full py-3.5 px-4 font-black text-base rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 ${
              isMoving 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/25 cursor-pointer border border-amber-300/40'
            }`}
          >
            <Dices size={20} className={isRollingAnimation ? 'animate-spin' : ''} />
            <span>
              {isRollingAnimation 
                ? 'ĐANG LẮC XÚC XẮC...' 
                : isMoving 
                  ? 'ĐANG BƯỚC ĐI...' 
                  : currentPlayer.inJail 
                    ? 'ĐỔ TÌM ĐÔI RA TÙ 🎲' 
                    : 'ĐỔ XÚC XẮC 🎲'}
            </span>
          </motion.button>

          {/* Pay Bail to Get Out of Jail Immediately */}
          {currentPlayer.inJail && !isMoving && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayJailFine}
              disabled={currentPlayer.money < 500_000 || isRollingAnimation}
              className="w-full py-2.5 px-3 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 border border-emerald-400/40 cursor-pointer"
            >
              <KeyRound size={15} />
              <span>NỘP PHÍ BẢO LÃNH RA TÙ (500.000 ₫)</span>
            </motion.button>
          )}
        </div>
      )}

      {!isMyTurn && (
        <div className="text-center py-1.5 text-xs text-slate-400 italic">
          {isMoving ? `${currentPlayer.nickname} đang bước đi trên bàn cờ...` : `Đang chờ ${currentPlayer.nickname} tung xúc xắc...`}
        </div>
      )}
    </div>
  );
}
