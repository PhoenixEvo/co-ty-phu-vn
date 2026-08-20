'use client';

import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

interface PlayerTokenProps {
  color: string;
  name: string;
  isCurrent?: boolean;
  isMe?: boolean;
  isStepping?: boolean;
}

export default function PlayerToken({ color, name, isCurrent, isMe, isStepping }: PlayerTokenProps) {
  return (
    <motion.div
      layout
      transition={{ 
        layout: { duration: 0.45, ease: 'easeInOut' },
        type: 'spring', 
        damping: 15, 
        stiffness: 160 
      }}
      animate={isStepping ? {
        scale: [1, 1.4, 1],
        y: [0, -18, 0],
      } : isCurrent ? {
        y: [0, -4, 0],
      } : {
        scale: 1,
        y: 0
      }}
      className="relative flex flex-col items-center justify-center pointer-events-auto cursor-pointer group select-none z-40"
    >
      {/* Active Player Floating Crown */}
      {isCurrent && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-3 md:-top-3.5 z-50 text-amber-400 filter drop-shadow-sm flex items-center justify-center"
        >
          <Crown size={11} className="fill-amber-400 text-amber-500 animate-pulse md:w-3.5 md:h-3.5" />
        </motion.div>
      )}

      {/* 3D Physical Pawn Game Piece */}
      <div className="relative flex flex-col items-center">
        {/* Pawn Head */}
        <div 
          className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center font-black text-[9px] md:text-[10px] lg:text-xs text-white border border-white/95 shadow-md relative overflow-hidden transition-all ${
            isCurrent ? 'ring-2 ring-amber-400 ring-offset-1 ring-offset-slate-900 shadow-amber-400/50' : ''
          }`}
          style={{ 
            backgroundColor: color,
            backgroundImage: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, ${color} 0%, rgba(0,0,0,0.4) 100%)`,
            boxShadow: '0 3px 6px -1px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.85)'
          }}
        >
          {/* Letter initial */}
          <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-black leading-none">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Pawn Collar / Ring */}
        <div 
          className="w-3.5 h-0.5 md:w-4 md:h-1 -mt-0.5 rounded-full bg-linear-to-r from-amber-200 via-amber-400 to-amber-600 border border-amber-300/80 shadow-2xs z-10"
        />

        {/* Pawn Base */}
        <div 
          className="w-5 h-1.5 md:w-6 md:h-2 -mt-0.5 rounded-full border border-white/60 shadow-sm relative"
          style={{
            backgroundColor: color,
            backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.45) 100%)`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        />

        {/* Ground Contact Shadow */}
        {isCurrent ? (
          <div className="absolute -bottom-1.5 w-6 md:w-7 h-1.5 bg-amber-400/60 rounded-full blur-2xs animate-ping pointer-events-none" />
        ) : (
          <div className="absolute -bottom-1 w-5 md:w-6 h-1 bg-black/40 rounded-full blur-[0.5px] pointer-events-none" />
        )}
      </div>

      {/* Tooltip on Hover */}
      <div className="absolute bottom-full mb-1.5 hidden group-hover:flex items-center gap-1 bg-slate-950/95 backdrop-blur-md text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xl border border-slate-700 whitespace-nowrap z-50 pointer-events-none">
        <span>{name}</span>
        {isMe && <span className="text-amber-300 font-normal">(Bạn)</span>}
        {isCurrent && <span className="text-emerald-400">● Lượt</span>}
      </div>
    </motion.div>
  );
}
