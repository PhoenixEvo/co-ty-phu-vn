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
    <div className="w-full h-full bg-linear-to-b from-[#edf6ef] via-[#f5fbf7] to-[#e6f4eb] flex flex-col items-center justify-center relative overflow-hidden p-3 md:p-6 border border-slate-300/80 shadow-inner select-none">
      
      {/* 1. Subtle Dong Son & Geometric Background Watermark (Panoramic 4:3) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-6 pointer-events-none" 
        viewBox="0 0 640 460" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Central Dong Son Sun Rays */}
        <circle cx="320" cy="230" r="210" stroke="#1e3a2b" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="320" cy="230" r="160" stroke="#1e3a2b" strokeWidth="1" />
        <circle cx="320" cy="230" r="110" stroke="#1e3a2b" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="320" cy="230" r="60" stroke="#1e3a2b" strokeWidth="1" />
        
        {/* 16 Sun Star Points */}
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => (
          <line
            key={i}
            x1="320"
            y1="230"
            x2={320 + 200 * Math.cos((deg * Math.PI) / 180)}
            y2={230 + 200 * Math.sin((deg * Math.PI) / 180)}
            stroke="#1e3a2b"
            strokeWidth="1.2"
          />
        ))}

        {/* 4 Corner Traditional Lotus Ornaments */}
        <path d="M 40 40 C 70 15, 110 50, 120 90 C 80 100, 40 70, 40 40 Z" fill="#1e3a2b" />
        <path d="M 600 40 C 570 15, 530 50, 520 90 C 560 100, 600 70, 600 40 Z" fill="#1e3a2b" />
        <path d="M 40 420 C 70 445, 110 410, 120 370 C 80 360, 40 390, 40 420 Z" fill="#1e3a2b" />
        <path d="M 600 420 C 570 445, 530 410, 520 370 C 560 360, 600 390, 600 420 Z" fill="#1e3a2b" />
      </svg>

      {/* 2. Panoramic Vietnamese Landscape Silhouette (Limestone Karsts, River & Sampan Boat) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-8 pointer-events-none" 
        viewBox="0 0 640 460" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Distant Limestone Karsts (Ha Long / Ninh Binh style) */}
        <path 
          d="M 0 300 Q 70 200 150 250 T 300 270 Q 370 170 460 230 T 580 250 Q 610 210 640 230 L 640 460 L 0 460 Z" 
          fill="#1b4d3e" 
        />
        
        {/* Midground Layer with Gentle Green Hills */}
        <path 
          d="M 0 350 Q 110 280 220 330 T 450 340 Q 550 290 640 340 L 640 460 L 0 460 Z" 
          fill="#13382c" 
        />

        {/* Flowing Water Wave Layer */}
        <path 
          d="M 0 390 C 160 370, 320 420, 640 380 L 640 460 L 0 460 Z" 
          fill="#2b6b55" 
        />

        {/* Traditional Wooden Sampan Boat (Thuyen Nan) */}
        <g transform="translate(310, 385) scale(0.8)">
          <path d="M 0 10 Q 30 20 60 10 Q 48 24 12 24 Z" fill="#0d2b1f" />
          <line x1="30" y1="12" x2="30" y2="-4" stroke="#0d2b1f" strokeWidth="2" />
          <path d="M 30 -4 L 46 6 L 30 10 Z" fill="#0d2b1f" />
        </g>
      </svg>

      {/* 3. Center Branding Composition (Landscape Optimized Emblem) */}
      <div className="text-center z-10 select-none flex flex-col items-center">
        
        {/* Ornamental Top Header */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-1">
          <span className="h-0.5 w-8 md:w-16 bg-red-600/50 rounded-full" />
          <span className="text-[9px] md:text-xs font-black tracking-widest text-red-900/90 uppercase">
            TRÒ CHƠI DÂN GIAN VIỆT NAM
          </span>
          <span className="h-0.5 w-8 md:w-16 bg-red-600/50 rounded-full" />
        </div>

        {/* Grand Title */}
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-black text-red-600 tracking-tight whitespace-nowrap drop-shadow-md"
          style={{
            textShadow: '0 4px 14px rgba(220, 38, 38, 0.25), 0 2px 0 #991b1b'
          }}
        >
          CỜ TỶ PHÚ
        </h1>
        
        {/* Lacquer Gold Regional Badge */}
        <div className="inline-flex items-center gap-1.5 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-[10px] md:text-xs lg:text-sm px-3.5 py-0.8 md:py-1 rounded-full uppercase tracking-wider shadow-xs mt-1 border border-amber-600/60">
          <span>Phiên Bản Đô Thị & Danh Lam</span>
          <span className="text-xs md:text-sm leading-none">🇻🇳</span>
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
            className="absolute bottom-4 md:bottom-6 z-30 max-w-[88%] bg-slate-950/95 backdrop-blur-md text-white text-xs md:text-sm font-bold px-4 py-2 rounded-2xl shadow-2xl border border-amber-400/50 flex items-center gap-2 text-center"
          >
            <span>{lastCenterBanner.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
