'use client';

import React from 'react';
import { BoardSpace, PropertySpace } from '@/game/types';
import { getLocationArtwork } from '@/game/locationArtworks';
import { formatMoney } from '@/utils/format';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';

interface LocationLandingRevealProps {
  space: BoardSpace | null;
  isVisible: boolean;
}

export default function LocationLandingReveal({ space, isVisible }: LocationLandingRevealProps) {
  if (!space || !isVisible) return null;

  const artwork = getLocationArtwork(space.id);
  const pSpace = space.type === 'property' ? (space as PropertySpace) : null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none max-w-sm w-[90%] select-none"
      >
        <div className="bg-slate-950/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-amber-400/80 overflow-hidden text-white flex flex-col">
          {/* Hero Artwork Snippet */}
          {artwork?.renderHero && (
            <div className="w-full h-24 relative overflow-hidden border-b border-amber-400/30">
              {artwork.renderHero('w-full h-full')}
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-400/40 flex items-center gap-1">
                <Sparkles size={10} />
                <span>ĐÃ ĐẶT CHÂN ĐẾN</span>
              </div>
            </div>
          )}

          <div className="p-3.5 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                <MapPin size={12} className="shrink-0" />
                <span className="truncate">{artwork?.regionLabel || 'Việt Nam'}</span>
              </div>
              <h3 className="text-lg font-black uppercase text-white truncate tracking-wide mt-0.5">
                {space.name}
              </h3>
              {artwork?.subtitle && (
                <p className="text-[11px] text-slate-300 truncate italic">
                  "{artwork.subtitle}"
                </p>
              )}
            </div>

            {pSpace && (
              <div className="text-right shrink-0 bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-400/40">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Giá đất</span>
                <span className="text-sm md:text-base font-black font-mono text-amber-400">{formatMoney(pSpace.price)}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
