'use client';

import { Card } from '@/game/cards';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CardDrawModalProps {
  card: Card | null;
  onDismiss: () => void;
  isMyTurn: boolean;
}

export default function CardDrawModal({ card, onDismiss, isMyTurn }: CardDrawModalProps) {
  if (!card) return null;

  const isChance = card.type === 'chance';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <motion.div 
        initial={{ scale: 0.8, rotateY: 90, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-full max-w-sm"
      >
        <div 
          className={`rounded-3xl shadow-2xl p-6 text-center border-4 flex flex-col items-center relative overflow-hidden ${
            isChance 
              ? 'bg-linear-to-b from-red-600 to-rose-700 border-amber-300 text-white' 
              : 'bg-linear-to-b from-amber-400 to-yellow-500 border-amber-200 text-slate-900'
          }`}
        >
          {/* Subtle decorative background ring */}
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

          {/* Badge */}
          <div className={`px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-sm ${
            isChance ? 'bg-amber-300 text-red-900' : 'bg-slate-900 text-amber-300'
          }`}>
            {isChance ? '🃏 THẺ CƠ HỘI' : '🐝 THẺ KHÍ VẬN'}
          </div>

          {/* Big Icon */}
          <div className="text-6xl my-2 filter drop-shadow-md">{card.icon}</div>

          {/* Title */}
          <h3 className="text-2xl font-black mt-2 tracking-tight">
            {card.title}
          </h3>

          {/* Description */}
          <p className={`text-base font-medium my-4 px-2 leading-relaxed ${isChance ? 'text-red-100' : 'text-slate-800'}`}>
            "{card.description}"
          </p>

          {/* Effect pill */}
          {card.effect.amount !== undefined && (
            <div className={`px-4 py-1.5 rounded-xl font-mono font-black text-xl mb-4 shadow-inner ${
              card.effect.amount > 0 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-900 text-red-100'
            }`}>
              {card.effect.amount > 0 ? `+ $${card.effect.amount}` : `- $${Math.abs(card.effect.amount)}`}
            </div>
          )}

          {/* Dismiss button */}
          {isMyTurn ? (
            <button
              onClick={onDismiss}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-lg transition-all shadow-lg transform active:scale-95 flex items-center justify-center gap-2 ${
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
    </div>
  );
}
