'use client';

import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';

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
      transition={{ type: 'spring', damping: 18, stiffness: 260 }}
      animate={isStepping ? {
        scale: [1, 1.3, 1],
        y: [0, -10, 0],
      } : isCurrent ? {
        y: [0, -5, 0],
      } : {
        scale: 1,
        y: 0
      }}
      className="relative flex flex-col items-center justify-center pointer-events-auto cursor-pointer group select-none z-40"
    >
      {/* Active Player Floating Crown / Star Badge */}
      {isCurrent && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-4 md:-top-5 z-50 text-amber-400 filter drop-shadow-sm flex items-center justify-center"
        >
          <Crown size={14} className="fill-amber-400 text-amber-500 animate-pulse md:w-4 md:h-4" />
        </motion.div>
      )}

      {/* 3D Physical Pawn Game Piece */}
      <div className="relative flex flex-col items-center">
        
        {/* Pawn Head (Sphere with 3D lighting & initial) */}
        <div 
          className={`w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center font-black text-[10px] md:text-xs lg:text-sm text-white border-2 border-white/95 shadow-md relative overflow-hidden transition-all ${
            isCurrent ? 'ring-2 md:ring-3 ring-amber-400 ring-offset-1 ring-offset-slate-900 shadow-amber-400/50' : ''
          }`}
          style={{ 
            backgroundColor: color,
            backgroundImage: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, ${color} 0%, rgba(0,0,0,0.4) 100%)`,
            boxShadow: '0 5px 8px -1px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.85)'
          }}
        >
          {/* Letter initial */}
          <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-black">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Pawn Collar / Ring (Metallic Gold Ring) */}
        <div 
          className="w-4 h-1 md:w-5 md:h-1.5 lg:w-6 lg:h-1.5 -mt-0.5 rounded-full bg-linear-to-r from-amber-200 via-amber-400 to-amber-600 border border-amber-300 shadow-xs z-10"
        />

        {/* Pawn Pedestal Base */}
        <div 
          className="w-6 h-2 md:w-8 md:h-2.5 lg:w-9 lg:h-3 -mt-0.5 rounded-full border border-white/60 shadow-md relative"
          style={{
            backgroundColor: color,
            backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.45) 100%)`,
            boxShadow: '0 4px 6px rgba(0,0,0,0.6)'
          }}
        />

        {/* Ground Contact Shadow / Glowing Halo for active turn */}
        {isCurrent ? (
          <div className="absolute -bottom-2 w-8 md:w-10 h-2 md:h-2.5 bg-amber-400/60 rounded-full blur-xs animate-ping pointer-events-none" />
        ) : (
          <div className="absolute -bottom-1.5 w-6 md:w-8 h-1.5 md:h-2 bg-black/50 rounded-full blur-[1px] pointer-events-none" />
        )}
      </div>

      {/* Tooltip on Hover */}
      <div className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-1.5 bg-slate-950/95 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-xl shadow-xl border border-slate-700 whitespace-nowrap z-50 pointer-events-none">
        <span>{name}</span>
        {isMe && <span className="text-amber-300 font-normal">(Bạn)</span>}
        {isCurrent && <span className="text-emerald-400">● Đang lượt</span>}
      </div>
    </motion.div>
  );
}
