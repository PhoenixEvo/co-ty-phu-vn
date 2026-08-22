'use client';

import React, { useEffect, useState } from 'react';
import { GameState, GameEvent } from '@/game/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Flame, ShieldAlert, Coins, Skull, Unlock, Lock, Trophy, Siren } from 'lucide-react';
import { formatMoney } from '@/utils/format';
import { triggerHaptic } from '@/utils/haptics';
import { sounds } from '@/utils/sound';

interface ActionCelebrationOverlayProps {
  state: GameState;
}

export default function ActionCelebrationOverlay({ state }: ActionCelebrationOverlayProps) {
  const [activeAnimation, setActiveAnimation] = useState<{
    id: string;
    type: 'pass_go' | 'double' | 'jail' | 'unjail' | 'rent' | 'upgrade' | 'bankrupt' | 'jackpot';
    text: string;
    subText?: string;
  } | null>(null);

  const lastEvent = state.events[state.events.length - 1];

  useEffect(() => {
    if (!lastEvent) return;

    // 0. Free Parking Jackpot Won
    if (lastEvent.type === 'jackpot') {
      triggerHaptic('jackpot');
      setActiveAnimation({
        id: lastEvent.id,
        type: 'jackpot',
        text: '🎰 NỔ HŨ JACKPOT BÃI ĐỖ XE!',
        subText: `+ ${formatMoney(lastEvent.amount || 1_000_000)}`
      });
    }
    // 1. Pass GO Payday
    else if (lastEvent.type === 'pass_go') {
      triggerHaptic('medium');
      setActiveAnimation({
        id: lastEvent.id,
        type: 'pass_go',
        text: '💰 LĨNH LƯƠNG BẮT ĐẦU!',
        subText: `+ ${formatMoney(lastEvent.amount || 2_000_000)}`
      });
    }
    // 2. Rolling Doubles
    else if (lastEvent.type === 'roll' && state.lastDice && state.lastDice[0] === state.lastDice[1] && !lastEvent.message.includes('vào tù')) {
      triggerHaptic('heavy');
      setActiveAnimation({
        id: lastEvent.id,
        type: 'double',
        text: '🔥 XÚC XẮC ĐÔI TUYỆT ĐẸP!',
        subText: 'Bạn được tung tiếp một lượt nữa!'
      });
    }
    // 3. Sent to Jail (Epic Prison Slam with Siren)
    else if (lastEvent.type === 'jail' && lastEvent.message.includes('vào tù')) {
      triggerHaptic('heavy');
      sounds.playPoliceSiren();
      setTimeout(() => {
        sounds.playJailSlam();
      }, 350);

      setActiveAnimation({
        id: lastEvent.id,
        type: 'jail',
        text: '🚓 BỊ BẮT VÀO TRẠI GIAM!',
        subText: 'Đổ xúc xắc Đôi hoặc nộp phạt 500.000 ₫ để được bảo lãnh'
      });
    }
    // 4. Bail out of Jail
    else if (lastEvent.type === 'jail' && (lastEvent.message.includes('nộp phạt') || lastEvent.message.includes('ra tù'))) {
      triggerHaptic('medium');
      setActiveAnimation({
        id: lastEvent.id,
        type: 'unjail',
        text: '🔓 BẢO LÃNH RA TÙ THÀNH CÔNG!',
        subText: 'Tự do di chuyển trên bàn cờ'
      });
    }
    // 5. Upgraded Property
    else if (lastEvent.type === 'upgrade') {
      triggerHaptic('light');
      setActiveAnimation({
        id: lastEvent.id,
        type: 'upgrade',
        text: '🏗️ NÂNG CẤP BẤT ĐỘNG SẢN!',
        subText: lastEvent.message
      });
    }
    // 6. Bankrupt
    else if (lastEvent.type === 'bankrupt') {
      triggerHaptic('heavy');
      setActiveAnimation({
        id: lastEvent.id,
        type: 'bankrupt',
        text: '💀 TUYÊN BỐ PHÁ SẢN!',
        subText: lastEvent.message
      });
    }

    const duration = lastEvent.type === 'jail' ? 3200 : 2500;
    const timer = setTimeout(() => {
      setActiveAnimation(null);
    }, duration);

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
            className="flex flex-col items-center justify-center p-4 max-w-md w-full text-center"
          >
            {/* 0. JACKPOT WON: Grand Fireworks & Golden Rain */}
            {activeAnimation.type === 'jackpot' && (
              <div className="relative flex flex-col items-center">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -80, opacity: 0, x: (i - 6) * 26 }}
                    animate={{ y: 100, opacity: [0, 1, 0], rotate: 720 }}
                    transition={{ duration: 2, delay: i * 0.1, ease: 'easeOut' }}
                    className="absolute text-3xl filter drop-shadow"
                  >
                    🎰
                  </motion.div>
                ))}

                <div className="bg-linear-to-r from-red-600 via-amber-400 to-yellow-500 text-slate-950 p-5 rounded-3xl shadow-2xl border-4 border-yellow-200 flex flex-col items-center animate-bounce">
                  <div className="text-5xl mb-1">🎰💎</div>
                  <h3 className="font-black text-xl tracking-tight uppercase">{activeAnimation.text}</h3>
                  <p className="font-mono font-black text-2xl md:text-3xl text-emerald-950 mt-1">{activeAnimation.subText}</p>
                </div>
              </div>
            )}

            {/* 1. PASS GO: Golden Coin Shower */}
            {activeAnimation.type === 'pass_go' && (
              <div className="relative flex flex-col items-center">
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

            {/* 3. JAIL: EPIC PRISON BARS SLAM & POLICE SIREN */}
            {activeAnimation.type === 'jail' && (
              <div className="relative flex flex-col items-center w-full">
                {/* Flashing Police Red & Blue Strobe Light Backdrop */}
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 0.35, repeat: Infinity }}
                  className="absolute -inset-10 bg-linear-to-r from-red-600/50 via-transparent to-blue-600/50 rounded-full blur-2xl pointer-events-none"
                />

                <motion.div
                  initial={{ y: -80, scaleY: 0.2 }}
                  animate={{ y: 0, scaleY: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 220 }}
                  className="bg-slate-950/95 text-red-400 p-5 rounded-3xl shadow-2xl border-3 border-red-600 flex flex-col items-center relative overflow-hidden backdrop-blur-md w-full"
                  style={{
                    boxShadow: '0 0 50px rgba(220, 38, 38, 0.6), inset 0 0 20px rgba(0,0,0,0.9)'
                  }}
                >
                  {/* Heavy Iron Prison Bars Graphic Over Box */}
                  <div className="flex justify-between w-full px-4 mb-2 gap-3 opacity-80">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: -60 }}
                        animate={{ y: 0 }}
                        transition={{ delay: i * 0.03, type: 'spring', damping: 8 }}
                        className="w-2.5 h-14 bg-linear-to-b from-slate-400 via-slate-600 to-slate-800 rounded-full border-r border-slate-300 shadow-md"
                      />
                    ))}
                  </div>

                  {/* Siren & Padlock Badge */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl animate-bounce">🚨</span>
                    <span className="text-4xl animate-pulse">⛓️🔒</span>
                    <span className="text-3xl animate-bounce">🚓</span>
                  </div>

                  <h3 className="font-black text-xl md:text-2xl tracking-tight text-white uppercase drop-shadow-md">
                    {activeAnimation.text}
                  </h3>
                  <p className="text-xs md:text-sm text-red-300 mt-1 font-semibold max-w-xs leading-snug">
                    {activeAnimation.subText}
                  </p>
                </motion.div>
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
