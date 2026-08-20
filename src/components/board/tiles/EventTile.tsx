'use client';

import { BoardSpace } from '@/game/types';
import { BoardEdge } from './PropertyTile';

interface EventTileProps {
  space: BoardSpace;
  edge: BoardEdge;
}

export default function EventTile({ space, edge }: EventTileProps) {
  const isChance = space.type === 'chance';

  if (isChance) {
    return (
      <div className="w-full h-full bg-red-600 text-white flex flex-col items-center justify-center p-1 relative text-center select-none shadow-inner">
        <span className="text-xl md:text-2xl font-black leading-none drop-shadow">?</span>
        <span className="text-[7.5px] md:text-[8.5px] font-black uppercase tracking-wider mt-0.5">
          CƠ HỘI
        </span>
      </div>
    );
  }

  // Khí Vận
  return (
    <div className="w-full h-full bg-amber-400 text-slate-950 flex flex-col items-center justify-center p-1 relative text-center select-none shadow-inner">
      <span className="text-lg md:text-xl font-black leading-none">🐝</span>
      <span className="text-[7.5px] md:text-[8.5px] font-black uppercase tracking-wider mt-0.5">
        KHÍ VẬN
      </span>
    </div>
  );
}
