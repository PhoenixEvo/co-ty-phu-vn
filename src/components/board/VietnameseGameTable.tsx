'use client';

import React from 'react';

interface VietnameseGameTableProps {
  children: React.ReactNode;
  isFocusMode?: boolean;
}

export default function VietnameseGameTable({ children, isFocusMode = false }: VietnameseGameTableProps) {
  return (
    <main className="flex-1 flex items-center justify-center overflow-hidden p-1.5 md:p-2.5 lg:p-3 relative rounded-2xl bg-linear-to-b from-[#143d30] via-[#0c271e] to-[#05140f] shadow-inner select-none h-full min-h-0">
      
      {/* 1. Soft Radial Spotlight directly behind the central board */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.16) 0%, rgba(245, 158, 11, 0.05) 45%, transparent 75%)'
        }}
      />

      {/* 2. Very subtle Vietnamese Dong Son & Organic Lotus Watermark */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-4 pointer-events-none" 
        viewBox="0 0 800 800" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Large Outer Dong Son Geometric Orbit */}
        <circle cx="400" cy="400" r="360" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="8 8" />
        <circle cx="400" cy="400" r="320" stroke="#a7f3d0" strokeWidth="1.5" />
        <circle cx="400" cy="400" r="280" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="400" cy="400" r="240" stroke="#a7f3d0" strokeWidth="1" />

        {/* 16 Radial Solar Rays */}
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, idx) => (
          <line
            key={idx}
            x1="400"
            y1="400"
            x2={400 + 350 * Math.cos((deg * Math.PI) / 180)}
            y2={400 + 350 * Math.sin((deg * Math.PI) / 180)}
            stroke="#a7f3d0"
            strokeWidth="1.5"
          />
        ))}

        {/* Corner Lotus Petal Geometry */}
        <path d="M 60 60 C 120 20, 200 80, 220 160 C 140 180, 80 120, 60 60 Z" fill="#6ee7b7" />
        <path d="M 740 60 C 680 20, 600 80, 580 160 C 660 180, 720 120, 740 60 Z" fill="#6ee7b7" />
        <path d="M 60 740 C 120 780, 200 720, 220 640 C 140 620, 80 680, 60 740 Z" fill="#6ee7b7" />
        <path d="M 740 740 C 680 780, 600 720, 580 640 C 660 620, 720 680, 740 740 Z" fill="#6ee7b7" />
      </svg>

      {/* 3. Deep Atmospheric Table Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.85), inset 0 0 30px rgba(4, 20, 14, 0.95)'
        }}
      />

      {/* 4. Physical Board Wrapper with Enhanced 3D Shadow */}
      <div className="relative z-10 filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] max-w-full max-h-full flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
