'use client';

import { GameState } from '@/game/types';
import { Trophy, Crown, RotateCcw, Home, Award, Sparkles, Flame, ShieldAlert, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { BOARD_SPACES } from '@/game/boardConfig';
import { formatMoney } from '@/utils/format';
import { sounds } from '@/utils/sound';

interface GameOverModalProps {
  state: GameState;
  dispatch?: any;
  playerId?: string;
  onRestart?: () => void;
  onLeave?: () => void;
}

export default function GameOverModal({ state, dispatch, playerId }: GameOverModalProps) {
  if (state.turnState !== 'GAME_OVER' || !state.winnerId) return null;

  const winner = state.players.find(p => p.id === state.winnerId);
  if (!winner) return null;

  const ownedSpaces = BOARD_SPACES.filter(s => state.properties[s.id]?.ownerId === winner.id);
  const propertiesCount = ownedSpaces.filter(s => s.type === 'property').length;
  const transportsCount = ownedSpaces.filter(s => s.type === 'transport').length;

  // Compute MVP Awards from playerStats
  let maxHousesPlayer = winner;
  let maxRentPaidPlayer = winner;
  let maxDoublesPlayer = winner;
  let maxJailPlayer = winner;

  let maxHouses = -1;
  let maxRentPaid = -1;
  let maxDoubles = -1;
  let maxJail = -1;

  state.players.forEach(p => {
    const stats = state.playerStats[p.id] || { housesBuilt: 0, totalRentPaid: 0, doublesCount: 0, jailCount: 0 };
    if (stats.housesBuilt > maxHouses) {
      maxHouses = stats.housesBuilt;
      maxHousesPlayer = p;
    }
    if (stats.totalRentPaid > maxRentPaid) {
      maxRentPaid = stats.totalRentPaid;
      maxRentPaidPlayer = p;
    }
    if (stats.doublesCount > maxDoubles) {
      maxDoubles = stats.doublesCount;
      maxDoublesPlayer = p;
    }
    if (stats.jailCount > maxJail) {
      maxJail = stats.jailCount;
      maxJailPlayer = p;
    }
  });

  const handleRestart = () => {
    if (dispatch) {
      sounds.playBuyProperty();
      dispatch({ type: 'RESTART_GAME' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 select-none overflow-y-auto">
      <motion.div
        initial={{ scale: 0.8, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-slate-900 border-2 border-amber-400 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden text-center text-white relative p-5 md:p-6 my-auto"
        style={{
          boxShadow: '0 0 50px rgba(251, 191, 36, 0.35)'
        }}
      >
        {/* Floating Confetti Emoji */}
        <div className="absolute top-3 left-4 text-3xl animate-bounce">🎉</div>
        <div className="absolute top-3 right-4 text-3xl animate-bounce">✨</div>

        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-linear-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg border-4 border-amber-200 mb-3">
          <Trophy size={38} className="text-slate-950" />
        </div>

        <div className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] md:text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-widest mb-1.5">
          KẾT QUẢ CHUNG CUỘC
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide">
          {winner.nickname} CHIẾN THẮNG!
        </h2>

        <p className="text-xs text-slate-400 mt-0.5 mb-4">
          Đã trở thành Tỷ Phú Bất Động Sản thống trị toàn bộ ván đấu!
        </p>

        {/* Winner Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 mb-4">
          <div>
            <div className="text-[10px] text-slate-400 font-semibold mb-0.5">💰 Tiền mặt</div>
            <div className="font-mono font-black text-sm md:text-base text-emerald-400">{formatMoney(winner.money)}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold mb-0.5">🏠 Đất sở hữu</div>
            <div className="font-mono font-black text-base text-amber-400">{propertiesCount}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold mb-0.5">🚌 Bến xe</div>
            <div className="font-mono font-black text-base text-blue-400">{transportsCount}</div>
          </div>
        </div>

        {/* MVP Records & Fun Badges */}
        <div className="space-y-1.5 mb-5 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
            🏆 Bảng Kỷ Lục & Danh Hiệu MVP Ván Đấu:
          </span>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* 1. Vua Xây Nhà */}
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
              <div className="text-xl">🏗️</div>
              <div className="min-w-0">
                <span className="text-[10px] text-amber-400 font-bold block truncate">Vua Bất Động Sản</span>
                <span className="font-bold text-white truncate block">{maxHousesPlayer.nickname}</span>
              </div>
            </div>

            {/* 2. Cây ATM */}
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
              <div className="text-xl">💸</div>
              <div className="min-w-0">
                <span className="text-[10px] text-red-400 font-bold block truncate">Cây ATM Di Động</span>
                <span className="font-bold text-white truncate block">{maxRentPaidPlayer.nickname}</span>
              </div>
            </div>

            {/* 3. Thánh Đổ Đôi */}
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
              <div className="text-xl">🎲</div>
              <div className="min-w-0">
                <span className="text-[10px] text-amber-300 font-bold block truncate">Thánh Đổ Đôi</span>
                <span className="font-bold text-white truncate block">{maxDoublesPlayer.nickname}</span>
              </div>
            </div>

            {/* 4. Cư Dân Trại Giam */}
            <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
              <div className="text-xl">⛓️</div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold block truncate">Cư Dân Trại Giam</span>
                <span className="font-bold text-white truncate block">{maxJailPlayer.nickname}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleRestart}
            className="w-full py-3 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm md:text-base rounded-xl transition shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw size={17} />
            <span>TẠO LẠI VÁN MỚI TRONG PHÒNG 🔄</span>
          </button>

          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.location.href = '/';
            }}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition border border-slate-700 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Home size={15} />
            <span>VỀ TRANG CHỦ TẠO PHÒNG MÃ MỚI</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
