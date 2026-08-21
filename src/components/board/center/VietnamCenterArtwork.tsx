'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface VietnamCenterArtworkProps {
  lastCenterBanner?: {
    id: string;
    text: string;
    type: string;
  } | null;
}

export default function VietnamCenterArtwork({ lastCenterBanner }: VietnamCenterArtworkProps) {
  return (
    <div className="w-full h-full bg-linear-to-b from-[#0e2a22] via-[#12382e] to-[#0a1f19] flex flex-col items-center justify-center relative overflow-hidden p-2 md:p-4 border border-amber-900/40 shadow-inner select-none">
      
      {/* 1. Real Authentic High-Res Panoramic Scenery Layer (Ha Long Karsts, Terraces, River Sunset) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none opacity-45 mix-blend-screen transition-opacity duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1600&auto=format&fit=crop')`, // Iconic panoramic Ha Long Bay karst islands & emerald waters
          filter: 'contrast(1.15) saturate(1.2) brightness(0.9)'
        }}
      />

      {/* 2. Traditional Lacquer Red-Gold Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-emerald-950/60 to-slate-950/90 pointer-events-none" />

      {/* 3. Rotating Dong Son Sunburst Hào Quang Watermark */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] pointer-events-none opacity-20 flex items-center justify-center"
      >
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full stroke-amber-400">
          <circle cx="250" cy="250" r="230" strokeWidth="2" strokeDasharray="10 8" />
          <circle cx="250" cy="250" r="190" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="140" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="250" cy="250" r="80" strokeWidth="1.5" />
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => (
            <line
              key={i}
              x1="250"
              y1="250"
              x2={250 + 230 * Math.cos((deg * Math.PI) / 180)}
              y2={250 + 230 * Math.sin((deg * Math.PI) / 180)}
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </motion.div>

      {/* 4. Animated Gliding Chim Lạc (Traditional Vietnamese Flying Cranes) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bird 1 */}
        <motion.div
          animate={{
            x: ['-20%', '120%'],
            y: ['25%', '15%'],
            scale: [0.7, 0.9, 0.7]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
            delay: 0
          }}
          className="absolute text-amber-300/40 text-xl font-bold select-none drop-shadow"
        >
          🦅
        </motion.div>

        {/* Bird 2 */}
        <motion.div
          animate={{
            x: ['-10%', '115%'],
            y: ['40%', '30%'],
            scale: [0.5, 0.65, 0.5]
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'linear',
            delay: 8
          }}
          className="absolute text-amber-300/30 text-lg font-bold select-none drop-shadow"
        >
          🦅
        </motion.div>

        {/* Bird 3 */}
        <motion.div
          animate={{
            x: ['-15%', '110%'],
            y: ['65%', '55%'],
            scale: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
            delay: 15
          }}
          className="absolute text-amber-300/35 text-lg font-bold select-none drop-shadow"
        >
          🦅
        </motion.div>
      </div>

      {/* 5. Shimmering Golden Firefly Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: '20%', y: '30%', delay: 0 },
          { x: '75%', y: '25%', delay: 1.2 },
          { x: '35%', y: '70%', delay: 2.1 },
          { x: '80%', y: '65%', delay: 0.8 },
          { x: '50%', y: '85%', delay: 1.7 },
        ].map((p, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.85, 0.2],
              scale: [0.8, 1.4, 0.8],
              y: ['0px', '-14px', '0px']
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut'
            }}
            className="absolute w-2 h-2 rounded-full bg-amber-300 blur-[0.8px]"
            style={{ left: p.x, top: p.y }}
          />
        ))}
      </div>

      {/* 6. Grand Center Emblem & Title Composition */}
      <div className="text-center z-10 select-none flex flex-col items-center relative">
        
        {/* Ornamental Header */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-1">
          <span className="h-0.5 w-6 md:w-12 bg-amber-400/80 rounded-full shadow-xs" />
          <span className="text-[9px] md:text-xs font-black tracking-widest text-amber-300 uppercase drop-shadow">
            TRÒ CHƠI DÂN GIAN VIỆT NAM
          </span>
          <span className="h-0.5 w-6 md:w-12 bg-amber-400/80 rounded-full shadow-xs" />
        </div>

        {/* Royal Gold 3D Title */}
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight whitespace-nowrap"
          style={{
            background: 'linear-gradient(180deg, #fffbeb 0%, #fef08a 35%, #f59e0b 70%, #d97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.85)) drop-shadow(0 2px 4px rgba(245,158,11,0.5))'
          }}
        >
          CỜ TỶ PHÚ
        </h1>
        
        {/* Lacquer Badge */}
        <div className="inline-flex items-center gap-1.5 bg-linear-to-r from-red-700 via-rose-600 to-red-800 text-amber-200 font-black text-[9px] md:text-xs lg:text-sm px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xl mt-1.5 border border-amber-400/70">
          <span>Phiên Bản Đô Thị & Danh Lam</span>
          <span className="text-xs md:text-sm leading-none">🇻🇳</span>
        </div>
      </div>

      {/* 7. Central Live Event Banner Overlay */}
      <AnimatePresence>
        {lastCenterBanner && (
          <motion.div 
            key={lastCenterBanner.id}
            initial={{ opacity: 0, y: 25, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute bottom-3 md:bottom-5 z-30 max-w-[90%] bg-slate-950/95 backdrop-blur-md text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-amber-400/60 flex items-center gap-2 text-center"
            style={{
              boxShadow: '0 0 35px rgba(245, 158, 11, 0.4)'
            }}
          >
            <span>{lastCenterBanner.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
