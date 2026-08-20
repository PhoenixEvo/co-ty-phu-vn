'use client';

import { useState } from 'react';
import { GameState, Player } from '@/game/types';
import Dice3D from '../ui/Dice3D';
import { sounds } from '@/utils/sound';
import { Dices, Sparkles, Clock, Footprints } from 'lucide-react';
import { motion } from 'framer-motion';

interface CurrentTurnPanelProps {
  state: GameState;
  playerId: string;
  dispatch: any;
  isMoving?: boolean;
}

export default function CurrentTurnPanel({ state, playerId, dispatch, isMoving = false }: CurrentTurnPanelProps) {
  const [isRollingAnimation, setIsRollingAnimation] = useState(false);
  const currentPlayerId = state.playerOrder[state.currentPlayerIndex];
  const currentPlayer = state.players.find(p => p.id === currentPlayerId);
  const isMyTurn = currentPlayerId === playerId;

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

  if (!currentPlayer) return null;

  return (
    <div className={`p-4 rounded-2xl shadow-2xl border-2 transition-all ${
      isMyTurn 
        ? 'bg-linear-to-b from-amber-500/15 via-slate-900/90 to-slate-950 border-amber-400/90 shadow-amber-500/15 ring-1 ring-amber-400/40' 
        : 'bg-slate-900/90 border-slate-800'
    }`}>
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
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

      {/* 3D Dice Display with Total Score */}
      <div className="py-3">
        <Dice3D 
          dice={state.lastDice || [1, 1]} 
          isRolling={isRollingAnimation} 
        />
      </div>

      {/* Main Roll Dice Button */}
      {isMyTurn && state.turnState === 'AWAITING_ROLL' && (
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
          <span>{isRollingAnimation ? 'ĐANG LẮC XÚC XẮC...' : isMoving ? 'ĐANG BƯỚC ĐI...' : 'ĐỔ XÚC XẮC 🎲'}</span>
        </motion.button>
      )}

      {!isMyTurn && (
        <div className="text-center py-1.5 text-xs text-slate-400 italic">
          {isMoving ? `${currentPlayer.nickname} đang bước đi trên bàn cờ...` : `Đang chờ ${currentPlayer.nickname} tung xúc xắc...`}
        </div>
      )}
    </div>
  );
}
