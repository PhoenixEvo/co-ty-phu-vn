'use client';

import { motion } from 'framer-motion';

interface Dice3DProps {
  dice: [number, number];
  isRolling?: boolean;
}

const DOT_POSITIONS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

function SingleDie({ value, isRolling, color }: { value: number; isRolling?: boolean; color: string }) {
  const dots = DOT_POSITIONS[value] || [4];

  return (
    <motion.div
      animate={isRolling ? {
        rotate: [0, 180, 360, 540, 720],
        scale: [1, 1.25, 0.85, 1.15, 1],
        y: [0, -28, 6, -16, 0]
      } : {
        rotate: 0,
        scale: 1,
        y: 0
      }}
      transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
      className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl p-2 bg-linear-to-b from-white to-slate-100 shadow-xl border-3 ${
        color === 'red' ? 'border-red-500 shadow-red-500/20' : 'border-sky-500 shadow-sky-500/20'
      } grid grid-cols-3 grid-rows-3 gap-0.5 items-center justify-items-center relative select-none shrink-0`}
      style={{
        boxShadow: '0 8px 0 rgba(0,0,0,0.35), 0 12px 20px rgba(0,0,0,0.4), inset 0 2px 3px rgba(255,255,255,0.9)'
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <div key={index} className="w-full h-full flex items-center justify-center">
          {dots.includes(index) && (
            <div
              className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full shadow-inner ${
                color === 'red' 
                  ? 'bg-red-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]' 
                  : 'bg-sky-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]'
              }`}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

export default function Dice3D({ dice, isRolling }: Dice3DProps) {
  const total = (dice[0] || 0) + (dice[1] || 0);
  const isDouble = dice[0] > 0 && dice[0] === dice[1];

  return (
    <div className="flex items-center justify-between gap-3 py-2 px-2 bg-slate-950/60 rounded-2xl border border-slate-800/80 shadow-inner">
      {/* 2 Dice Containers */}
      <div className="flex items-center gap-3">
        <SingleDie value={dice[0] || 1} isRolling={isRolling} color="red" />
        <SingleDie value={dice[1] || 1} isRolling={isRolling} color="blue" />
      </div>
      
      {/* Total Score & Double Badge with High Contrast */}
      <div className="flex flex-col items-center justify-center min-w-[90px] px-3 py-2 bg-slate-900/90 rounded-xl border border-amber-400/30 shadow-md">
        <span className="text-[10px] uppercase font-black text-slate-300 tracking-wider">TỔNG ĐIỂM</span>
        
        {isRolling ? (
          <span className="text-2xl font-black font-mono text-amber-400 animate-pulse mt-0.5">...</span>
        ) : (
          <span className="text-3xl font-black font-mono text-amber-400 leading-none mt-0.5 drop-shadow-[0_2px_8px_rgba(251,191,36,0.6)]">
            {total}
          </span>
        )}

        {!isRolling && isDouble && (
          <span className="text-[10px] font-black text-slate-950 bg-linear-to-r from-amber-400 to-yellow-400 px-2 py-0.5 rounded-full mt-1 border border-amber-300 shadow-sm animate-bounce">
            ĐÔI! 🎉
          </span>
        )}
      </div>
    </div>
  );
}
