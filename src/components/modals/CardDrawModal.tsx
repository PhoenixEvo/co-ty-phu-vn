'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/game/cards';
import { motion, AnimatePresence } from 'framer-motion';
import { formatMoney } from '@/utils/format';
import { sounds } from '@/utils/sound';
import { Sparkles, ArrowRight, Dices, Shuffle, Eye } from 'lucide-react';

interface CardDrawModalProps {
  card: Card | null;
  onDismiss: () => void;
  isMyTurn: boolean;
}

export default function CardDrawModal({ card, onDismiss, isMyTurn }: CardDrawModalProps) {
  const [phase, setPhase] = useState<'shuffling' | 'flipping' | 'revealed'>('shuffling');

  useEffect(() => {
    if (!card) return;

    setPhase('shuffling');
    sounds.playDiceRoll();

    // 1. Shuffling Phase (0 - 1100ms)
    const flipTimer = setTimeout(() => {
      setPhase('flipping');
      sounds.playBuyProperty();
    }, 1100);

    // 2. Revealed Phase (1700ms+)
    const revealTimer = setTimeout(() => {
      setPhase('revealed');
    }, 1700);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(revealTimer);
    };
  }, [card?.id]);

  if (!card) return null;

  const isChance = card.type === 'chance';

  const handleSkipAnimation = () => {
    if (phase !== 'revealed') {
      setPhase('revealed');
    }
  };

  return (
    <div 
      onClick={handleSkipAnimation}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 select-none cursor-pointer"
    >
      <AnimatePresence mode="wait">
        {/* PHASE 1: GACHA CARD SHUFFLE DECK ANIMATION */}
        {phase === 'shuffling' && (
          <motion.div
            key="shuffling"
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ type: 'spring', damping: 14 }}
            className="flex flex-col items-center justify-center text-center space-y-6"
          >
            {/* Ambient Glowing Halo */}
            <div className="relative w-64 h-88 flex items-center justify-center">
              <motion.div 
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.25, 1]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className={`absolute w-72 h-72 rounded-full blur-2xl opacity-60 pointer-events-none ${
                  isChance ? 'bg-red-500/50' : 'bg-amber-400/50'
                }`}
              />

              {/* Shuffling Deck Stack (Fanning Cards) */}
              {[3, 2, 1, 0].map((idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    x: [0, (idx % 2 === 0 ? 1 : -1) * (idx * 24 + 15), 0],
                    rotate: [0, (idx % 2 === 0 ? 1 : -1) * (idx * 9 + 6), 0],
                    scale: [1, 1.04, 1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.55,
                    delay: idx * 0.08,
                    ease: 'easeInOut'
                  }}
                  className={`absolute w-48 h-68 rounded-2xl shadow-2xl border-2 flex flex-col items-center justify-center p-4 ${
                    isChance
                      ? 'bg-linear-to-tr from-red-800 via-red-600 to-rose-900 border-amber-300/80 text-amber-200'
                      : 'bg-linear-to-tr from-amber-600 via-yellow-500 to-amber-700 border-amber-200 text-slate-950'
                  }`}
                  style={{
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Traditional Vietnamese Dong Son / Lacquer Back Pattern */}
                  <div className="w-full h-full border border-dashed border-amber-300/40 rounded-xl flex flex-col items-center justify-center p-2 relative overflow-hidden">
                    <div className="text-4xl opacity-80 mb-1">{isChance ? '🃏' : '🐝'}</div>
                    <span className="text-xs font-black tracking-widest uppercase opacity-90">
                      {isChance ? 'CƠ HỘI' : 'KHÍ VẬN'}
                    </span>
                    <span className="text-[9px] font-bold opacity-60 mt-1">CỜ TỶ PHÚ VN</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Shuffling Banner */}
            <motion.div 
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="bg-slate-900/90 text-amber-300 border border-amber-400/50 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2"
            >
              <Shuffle size={14} className="animate-spin" />
              <span>ĐANG XÀO THẺ {isChance ? 'CƠ HỘI' : 'KHÍ VẬN'}...</span>
            </motion.div>
            <span className="text-[11px] text-slate-400 italic">(Nhấn để mở nhanh)</span>
          </motion.div>
        )}

        {/* PHASE 2 & 3: CARD FLIP & REVEALED DETAILS */}
        {(phase === 'flipping' || phase === 'revealed') && (
          <motion.div 
            key="revealed"
            initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 13, stiffness: 150 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm"
          >
            <div 
              className={`rounded-3xl shadow-2xl p-6 text-center border-4 flex flex-col items-center relative overflow-hidden ${
                isChance 
                  ? 'bg-linear-to-b from-red-600 to-rose-700 border-amber-300 text-white' 
                  : 'bg-linear-to-b from-amber-400 to-yellow-500 border-amber-200 text-slate-900'
              }`}
              style={{
                boxShadow: isChance ? '0 0 50px rgba(239,68,68,0.5)' : '0 0 50px rgba(245,158,11,0.5)'
              }}
            >
              {/* Subtle decorative background rings */}
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

              {/* Top Badge */}
              <motion.div 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-3 shadow-sm ${
                  isChance ? 'bg-amber-300 text-red-900' : 'bg-slate-900 text-amber-300'
                }`}
              >
                {isChance ? '🃏 THẺ CƠ HỘI' : '🐝 THẺ KHÍ VẬN'}
              </motion.div>

              {/* Big Animated Icon with Spring Bounce */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.35, 1] }}
                transition={{ delay: 0.15, type: 'spring', damping: 10 }}
                className="text-6xl my-2 filter drop-shadow-md"
              >
                {card.icon}
              </motion.div>

              {/* Card Title */}
              <h3 className="text-2xl font-black mt-2 tracking-tight">
                {card.title}
              </h3>

              {/* Description */}
              <p className={`text-base font-medium my-4 px-2 leading-relaxed ${isChance ? 'text-red-100' : 'text-slate-800'}`}>
                "{card.description}"
              </p>

              {/* Dynamic Effect Pill */}
              {card.effect.amount !== undefined && (
                <div className={`px-4 py-1.5 rounded-xl font-mono font-black text-xl mb-4 shadow-inner ${
                  card.effect.type === 'pay_to_all' 
                    ? 'bg-red-900 text-red-100'
                    : card.effect.amount > 0 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-red-900 text-red-100'
                }`}>
                  {card.effect.type === 'pay_to_all' 
                    ? `- ${formatMoney(card.effect.amount)} / người`
                    : card.effect.type === 'collect_from_all'
                      ? `+ ${formatMoney(card.effect.amount)} / người`
                      : card.effect.amount > 0 
                        ? `+ ${formatMoney(card.effect.amount)}` 
                        : `- ${formatMoney(Math.abs(card.effect.amount))}`}
                </div>
              )}

              {card.effect.type === 'repairs' && (
                <div className="px-3 py-1.5 rounded-xl font-mono font-bold text-xs mb-4 shadow-inner bg-red-900/90 text-red-100 border border-red-400/40">
                  Chi phí: {formatMoney(card.effect.houseFee || 200_000)}/Nhà • {formatMoney(card.effect.hotelFee || 800_000)}/Khách Sạn
                </div>
              )}

              {card.effect.type === 'move_steps' && (
                <div className="px-4 py-1.5 rounded-xl font-mono font-black text-lg mb-4 shadow-inner bg-amber-900/90 text-amber-200 border border-amber-400/40">
                  {card.effect.steps && card.effect.steps < 0 ? `Lùi Lại ${Math.abs(card.effect.steps)} Ô ⏪` : `Tiến Thêm ${card.effect.steps} Ô ⏩`}
                </div>
              )}

              {/* Dismiss Button */}
              {isMyTurn ? (
                <button
                  onClick={onDismiss}
                  className={`w-full py-3.5 px-6 rounded-2xl font-black text-lg transition-all shadow-lg transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                    isChance 
                      ? 'bg-amber-300 hover:bg-amber-400 text-red-900' 
                      : 'bg-slate-900 hover:bg-black text-white'
                  }`}
                >
                  <span>TIẾP TỤC</span>
                  <ArrowRight size={20} />
                </button>
              ) : (
                <div className="text-xs opacity-75 font-semibold mt-2">
                  Đang đợi người chơi xác nhận...
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
