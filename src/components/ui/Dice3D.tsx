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
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.15, 0.9, 1.1, 1],
        y: [0, -12, -4, -8, 0]
      } : {
        rotate: 0,
        scale: 1,
        y: 0
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl p-2 bg-white shadow-md border-2 ${
        color === 'red' ? 'border-red-500' : 'border-blue-500'
      } grid grid-cols-3 grid-rows-3 gap-0.5 items-center justify-items-center relative select-none`}
      style={{
        boxShadow: '0 6px 0 rgba(0,0,0,0.15), 0 8px 12px rgba(0,0,0,0.2)'
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <div key={index} className="w-full h-full flex items-center justify-center">
          {dots.includes(index) && (
            <div
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full shadow-inner ${
                color === 'red' ? 'bg-red-600' : 'bg-blue-600'
              }`}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

export default function Dice3D({ dice, isRolling }: Dice3DProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <SingleDie value={dice[0] || 1} isRolling={isRolling} color="red" />
      <SingleDie value={dice[1] || 1} isRolling={isRolling} color="blue" />
      
      {!isRolling && dice[0] > 0 && (
        <div className="flex flex-col items-center justify-center pl-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Tổng điểm</span>
          <span className="text-2xl font-black font-mono text-slate-800 leading-none">
            {dice[0] + dice[1]}
          </span>
          {dice[0] === dice[1] && (
            <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded mt-0.5 border border-amber-200">
              ĐÔI! 🎉
            </span>
          )}
        </div>
      )}
    </div>
  );
}
