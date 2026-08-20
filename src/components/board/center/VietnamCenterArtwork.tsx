'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VietnamCenterArtworkProps {
  lastCenterBanner?: {
    id: string;
    text: string;
    type: string;
  } | null;
}

export default function VietnamCenterArtwork({ lastCenterBanner }: VietnamCenterArtworkProps) {
  return (
    <div className="w-full h-full bg-linear-to-b from-[#edf6ef] via-[#f5fbf7] to-[#e6f4eb] flex flex-col items-center justify-center relative overflow-hidden p-4 border border-slate-300/80 shadow-inner select-none">
      
      {/* 1. Subtle Dong Son & Geometric Background Watermark */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-6 pointer-events-none" 
        viewBox="0 0 500 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central Dong Son Sun Rays */}
        <circle cx="250" cy="250" r="180" stroke="#1e3a2b" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="250" cy="250" r="130" stroke="#1e3a2b" strokeWidth="1" />
        <circle cx="250" cy="250" r="80" stroke="#1e3a2b" strokeWidth="1.5" />
        
        {/* 12 Sun Star Points */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
          <line
            key={i}
            x1="250"
            y1="250"
            x2={250 + 75 * Math.cos((deg * Math.PI) / 180)}
            y2={250 + 75 * Math.sin((deg * Math.PI) / 180)}
            stroke="#1e3a2b"
            strokeWidth="1.5"
          />
        ))}

        {/* 4 Corner Traditional Lotus Ornaments */}
        <path d="M 30 30 C 50 10, 80 40, 90 70 C 60 80, 30 50, 30 30 Z" fill="#1e3a2b" />
        <path d="M 470 30 C 450 10, 420 40, 410 70 C 440 80, 470 50, 470 30 Z" fill="#1e3a2b" />
        <path d="M 30 470 C 50 490, 80 460, 90 430 C 60 420, 30 450, 30 470 Z" fill="#1e3a2b" />
        <path d="M 470 470 C 450 490, 420 460, 410 430 C 440 420, 470 450, 470 470 Z" fill="#1e3a2b" />
      </svg>

      {/* 2. Vietnamese Landscape Silhouette (Mountains, River & Boat) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-8 pointer-events-none" 
        viewBox="0 0 400 400" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Distant Limestone Karsts (Ha Long / Ninh Binh style) */}
        <path 
          d="M 0 260 Q 40 180 90 220 T 180 240 Q 220 160 270 210 T 360 230 Q 390 190 400 210 L 400 400 L 0 400 Z" 
          fill="#1b4d3e" 
        />
        
        {/* Midground Layer with Gentle Hills */}
        <path 
          d="M 0 300 Q 70 240 140 280 T 290 290 Q 350 250 400 290 L 400 400 L 0 400 Z" 
          fill="#13382c" 
        />

        {/* Winding River & Waves */}
        <path 
          d="M 0 340 C 100 320, 200 370, 400 330 L 400 400 L 0 400 Z" 
          fill="#2b6b55" 
        />

        {/* Traditional Wooden Sampan Boat (Thuyền Nan) */}
        <g transform="translate(195, 332) scale(0.6)">
          <path d="M 0 10 Q 25 18 50 10 Q 40 20 10 20 Z" fill="#0d2b1f" />
          <line x1="25" y1="12" x2="25" y2="-2" stroke="#0d2b1f" strokeWidth="1.5" />
          <path d="M 25 -2 L 38 6 L 25 10 Z" fill="#0d2b1f" />
        </g>
      </svg>

      {/* 3. Center Branding Composition (Diagonal Vietnamese Cờ Tỷ Phú Emblem) */}
      <div className="text-center rotate-[-45deg] z-10 select-none">
        
        {/* Ornamental Top Header */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="h-0.5 w-10 md:w-14 bg-red-600/40 rounded-full" />
          <span className="text-[10px] md:text-xs font-black tracking-widest text-red-800/80 uppercase">
            TRÒ CHƠI DÂN GIAN
          </span>
          <span className="h-0.5 w-10 md:w-14 bg-red-600/40 rounded-full" />
        </div>

        {/* Grand Title */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black text-red-600 tracking-tight whitespace-nowrap drop-shadow-md"
          style={{
            textShadow: '0 4px 12px rgba(220, 38, 38, 0.25), 0 2px 0 #991b1b'
          }}
        >
          CỜ TỶ PHÚ
        </h1>
        
        {/* Lacquer Gold Regional Badge */}
        <div className="inline-flex items-center gap-1.5 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs md:text-sm px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm mt-1 border border-amber-600/60">
          <span>Phiên Bản Việt Nam</span>
          <span className="text-sm leading-none">🇻🇳</span>
        </div>
      </div>

      {/* 4. Central Live Event Banner Overlay */}
      <AnimatePresence>
        {lastCenterBanner && (
          <motion.div 
            key={lastCenterBanner.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-6 md:bottom-10 z-30 max-w-[88%] bg-slate-950/95 backdrop-blur-md text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-amber-400/50 flex items-center gap-2 text-center"
          >
            <span>{lastCenterBanner.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
