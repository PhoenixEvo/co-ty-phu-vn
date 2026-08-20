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
        scale: [1, 1.25, 1],
        y: [0, -8, 0],
      } : isCurrent ? {
        y: [0, -4, 0],
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
          className="absolute -top-3.5 z-50 text-amber-400 filter drop-shadow-sm flex items-center justify-center"
        >
          <Crown size={12} className="fill-amber-400 text-amber-500 animate-pulse" />
        </motion.div>
      )}

      {/* 3D Physical Pawn Game Piece */}
      <div className="relative flex flex-col items-center">
        
        {/* Pawn Head (Sphere with 3D lighting & initial) */}
        <div 
          className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center font-black text-[10px] md:text-xs text-white border-2 border-white/90 shadow-md relative overflow-hidden transition-all ${
            isCurrent ? 'ring-2 ring-amber-400 ring-offset-1 ring-offset-slate-900 shadow-amber-400/40' : ''
          }`}
          style={{ 
            backgroundColor: color,
            backgroundImage: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, ${color} 0%, rgba(0,0,0,0.35) 100%)`,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.8)'
          }}
        >
          {/* Letter initial */}
          <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] font-black">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Pawn Collar / Ring (Metallic Ring) */}
        <div 
          className="w-4 h-1 md:w-4.5 md:h-1.5 -mt-0.5 rounded-full bg-linear-to-r from-amber-200 via-amber-400 to-amber-600 border border-amber-300 shadow-xs z-10"
        />

        {/* Pawn Pedestal Base */}
        <div 
          className="w-6 h-2 md:w-7 md:h-2.5 -mt-0.5 rounded-full border border-white/60 shadow-md relative"
          style={{
            backgroundColor: color,
            backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.4) 100%)`,
            boxShadow: '0 3px 5px rgba(0,0,0,0.5)'
          }}
        />

        {/* Ground Contact Shadow / Glowing Halo for active turn */}
        {isCurrent ? (
          <div className="absolute -bottom-1.5 w-7 h-2 bg-amber-400/50 rounded-full blur-xs animate-ping pointer-events-none" />
        ) : (
          <div className="absolute -bottom-1 w-6 h-1.5 bg-black/40 rounded-full blur-[1px] pointer-events-none" />
        )}
      </div>

      {/* Tooltip on Hover */}
      <div className="absolute bottom-full mb-2 hidden group-hover:flex items-center gap-1 bg-slate-950/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.8 rounded-lg shadow-xl border border-slate-700 whitespace-nowrap z-50 pointer-events-none">
        <span>{name}</span>
        {isMe && <span className="text-amber-300 text-[9px] font-normal">(Bạn)</span>}
        {isCurrent && <span className="text-emerald-400 text-[9px]">● Đang lượt</span>}
      </div>
    </motion.div>
  );
}
