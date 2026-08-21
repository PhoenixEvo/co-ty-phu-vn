'use client';

import React, { useEffect, useState } from 'react';
import { GameState, GameEvent } from '@/game/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Flame, ShieldAlert, Coins, Skull, Unlock, Lock } from 'lucide-react';
import { formatMoney } from '@/utils/format';

interface ActionCelebrationOverlayProps {
  state: GameState;
}

export default function ActionCelebrationOverlay({ state }: ActionCelebrationOverlayProps) {
  const [activeAnimation, setActiveAnimation] = useState<{
    id: string;
    type: 'pass_go' | 'double' | 'jail' | 'unjail' | 'rent' | 'upgrade' | 'bankrupt';
    text: string;
    subText?: string;
  } | null>(null);

  const lastEvent = state.events[state.events.length - 1];

  useEffect(() => {
    if (!lastEvent) return;

    // 1. Pass GO Payday
    if (lastEvent.type === 'pass_go') {
      setActiveAnimation({
        id: lastEvent.id,
        type: 'pass_go',
        text: '💰 LĨNH LƯƠNG BẮT ĐẦU!',
        subText: `+ ${formatMoney(lastEvent.amount || 2_000_000)}`
      });
    }
    // 2. Rolling Doubles
    else if (lastEvent.type === 'roll' && state.lastDice && state.lastDice[0] === state.lastDice[1] && !lastEvent.message.includes('vào tù')) {
      setActiveAnimation({
        id: lastEvent.id,
        type: 'double',
        text: '🔥 XÚC XẮC ĐÔI TUYỆT ĐẸP!',
        subText: 'Bạn được tung tiếp một lượt nữa!'
      });
    }
    // 3. Sent to Jail
    else if (lastEvent.type === 'jail' && lastEvent.message.includes('vào tù')) {
      setActiveAnimation({
        id: lastEvent.id,
        type: 'jail',
        text: '🚓 BỊ BẮT VÀO TÙ!',
        subText: 'Hãy đổ xúc xắc đôi hoặc nộp 500K để ra tù'
      });
    }
    // 4. Bail out of Jail
    else if (lastEvent.type === 'jail' && (lastEvent.message.includes('nộp phạt') || lastEvent.message.includes('ra tù'))) {
      setActiveAnimation({
        id: lastEvent.id,
        type: 'unjail',
        text: '🔓 BẢO LÃNH RA TÙ THÀNH CÔNG!',
        subText: 'Tự do di chuyển trên bàn cờ'
      });
    }
    // 5. Upgraded Property
    else if (lastEvent.type === 'upgrade') {
      setActiveAnimation({
        id: lastEvent.id,
        type: 'upgrade',
        text: '🏗️ NÂNG CẤP BẤT ĐỘNG SẢN!',
        subText: lastEvent.message
      });
    }
    // 6. Bankrupt
    else if (lastEvent.type === 'bankrupt') {
      setActiveAnimation({
        id: lastEvent.id,
        type: 'bankrupt',
        text: '💀 TUYÊN BỐ PHÁ SẢN!',
        subText: lastEvent.message
      });
    }

    const timer = setTimeout(() => {
      setActiveAnimation(null);
    }, 2400);

    return () => clearTimeout(timer);
  }, [lastEvent?.id]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {activeAnimation && (
          <motion.div
            key={activeAnimation.id}
            initial={{ scale: 0.5, opacity: 0, y: -30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 14, stiffness: 180 }}
            className="flex flex-col items-center justify-center p-4 max-w-sm text-center"
          >
            {/* 1. PASS GO: Golden Coin Shower */}
            {activeAnimation.type === 'pass_go' && (
              <div className="relative flex flex-col items-center">
                {/* Floating Coins Rain */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -60, opacity: 0, x: (i - 4) * 28 }}
                    animate={{ y: 80, opacity: [0, 1, 0], rotate: 360 }}
                    transition={{ duration: 1.6, delay: i * 0.12, ease: 'easeOut' }}
                    className="absolute text-2xl filter drop-shadow"
                  >
                    🪙
                  </motion.div>
                ))}

                <div className="bg-linear-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 p-4 rounded-3xl shadow-2xl border-2 border-amber-200 flex flex-col items-center">
                  <div className="text-4xl mb-1 animate-bounce">💰</div>
                  <h3 className="font-black text-xl tracking-tight">{activeAnimation.text}</h3>
                  <p className="font-mono font-black text-2xl text-emerald-950 mt-1">{activeAnimation.subText}</p>
                </div>
              </div>
            )}

            {/* 2. DOUBLE ROLL: Fire Flame Burst */}
            {activeAnimation.type === 'double' && (
              <div className="bg-linear-to-r from-red-600 via-orange-500 to-amber-500 text-white p-4 rounded-3xl shadow-2xl border-2 border-yellow-300 flex flex-col items-center">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                  className="text-4xl mb-1"
                >
                  🎲🔥
                </motion.div>
                <h3 className="font-black text-xl tracking-tight">{activeAnimation.text}</h3>
                <p className="text-xs font-bold text-yellow-100 mt-1">{activeAnimation.subText}</p>
              </div>
            )}

            {/* 3. JAIL: Iron Bars Slam */}
            {activeAnimation.type === 'jail' && (
              <div className="bg-slate-950 text-red-400 p-4 rounded-3xl shadow-2xl border-2 border-red-600 flex flex-col items-center">
                <div className="text-4xl mb-1 animate-pulse">⛓️🚓</div>
                <h3 className="font-black text-xl tracking-tight text-white">{activeAnimation.text}</h3>
                <p className="text-xs text-red-300 mt-1">{activeAnimation.subText}</p>
              </div>
            )}

            {/* 4. UNJAIL: Freedom Breakout */}
            {activeAnimation.type === 'unjail' && (
              <div className="bg-linear-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-3xl shadow-2xl border-2 border-emerald-300 flex flex-col items-center">
                <div className="text-4xl mb-1 animate-bounce">🔓✨</div>
                <h3 className="font-black text-xl tracking-tight">{activeAnimation.text}</h3>
                <p className="text-xs text-emerald-100 mt-1">{activeAnimation.subText}</p>
              </div>
            )}

            {/* 5. UPGRADE: Hammer & Star Sparks */}
            {activeAnimation.type === 'upgrade' && (
              <div className="bg-linear-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 p-4 rounded-3xl shadow-2xl border-2 border-amber-200 flex flex-col items-center">
                <motion.div
                  animate={{ rotate: [-20, 20, -20, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="text-4xl mb-1"
                >
                  🔨🏠
                </motion.div>
                <h3 className="font-black text-xl tracking-tight">{activeAnimation.text}</h3>
                <p className="text-xs font-bold text-slate-900 mt-1">{activeAnimation.subText}</p>
              </div>
            )}

            {/* 6. BANKRUPT: Shatter Elimination */}
            {activeAnimation.type === 'bankrupt' && (
              <div className="bg-red-950/95 text-red-200 p-4 rounded-3xl shadow-2xl border-2 border-red-500 flex flex-col items-center">
                <div className="text-4xl mb-1 animate-bounce">💀💥</div>
                <h3 className="font-black text-xl tracking-tight text-white">{activeAnimation.text}</h3>
                <p className="text-xs text-red-300 mt-1">{activeAnimation.subText}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
