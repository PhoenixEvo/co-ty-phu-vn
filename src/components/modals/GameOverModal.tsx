'use client';

import { GameState } from '@/game/types';
import { Trophy, Crown, RotateCcw, Home, Bus, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { BOARD_SPACES } from '@/game/boardConfig';
import { formatMoney } from '@/utils/format';

interface GameOverModalProps {
  state: GameState;
  onRestart?: () => void;
  onLeave?: () => void;
}

export default function GameOverModal({ state, onRestart, onLeave }: GameOverModalProps) {
  if (state.turnState !== 'GAME_OVER' || !state.winnerId) return null;

  const winner = state.players.find(p => p.id === state.winnerId);
  if (!winner) return null;

  const ownedSpaces = BOARD_SPACES.filter(s => state.properties[s.id]?.ownerId === winner.id);
  const propertiesCount = ownedSpaces.filter(s => s.type === 'property').length;
  const transportsCount = ownedSpaces.filter(s => s.type === 'transport').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <motion.div
        initial={{ scale: 0.8, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-slate-900 border-2 border-amber-400 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden text-center text-white relative p-6"
        style={{
          boxShadow: '0 0 50px rgba(251, 191, 36, 0.3)'
        }}
      >
        {/* Floating Confetti Emoji */}
        <div className="absolute top-3 left-4 text-3xl animate-bounce">🎉</div>
        <div className="absolute top-3 right-4 text-3xl animate-bounce">✨</div>

        <div className="w-20 h-20 mx-auto rounded-full bg-linear-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg border-4 border-amber-200 mb-4">
          <Trophy size={42} className="text-slate-950" />
        </div>

        <div className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2">
          KẾT QUẢ CHUNG CUỘC
        </div>

        <h2 className="text-3xl font-black text-white tracking-wide">
          {winner.nickname} CHIẾN THẮNG!
        </h2>

        <p className="text-sm text-slate-400 mt-1 mb-6">
          Đã trở thành Tỷ Phú Bất Động Sản thống trị toàn bộ bàn cờ!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 mb-6">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold mb-1">💰 Tiền mặt</div>
            <div className="font-mono font-black text-base md:text-lg text-emerald-400">{formatMoney(winner.money)}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-semibold mb-1">🏠 Đất sở hữu</div>
            <div className="font-mono font-black text-lg text-amber-400">{propertiesCount}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-semibold mb-1">🚌 Bến xe</div>
            <div className="font-mono font-black text-lg text-blue-400">{transportsCount}</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined') window.location.href = '/';
          }}
          className="w-full py-3.5 bg-linear-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-base rounded-xl transition shadow-lg active:scale-95 cursor-pointer"
        >
          VỀ TRANG CHỦ & TẠO PHÒNG MỚI
        </button>
      </motion.div>
    </div>
  );
}
