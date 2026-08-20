'use client';

import { TransportSpace, Player } from '@/game/types';
import { BoardEdge } from './PropertyTile';

interface TransportTileProps {
  space: TransportSpace;
  edge: BoardEdge;
  owner: Player | null | undefined;
}

export default function TransportTile({ space, edge, owner }: TransportTileProps) {
  // Extract station name cleanly (e.g. "CẦN GIUỘC", "MIỀN TÂY", "CHỢ LỚN", "MIỀN ĐÔNG")
  const stationName = space.name.replace(/^Bến Xe\s*/i, '').trim();

  if (edge === 'bottom') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center p-1 bg-white relative text-center select-none">
        <span className="text-base leading-none">🚌</span>
        <div className="flex flex-col items-center">
          <span className="text-[7px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
          <span className="text-[8.5px] md:text-[9.5px] font-extrabold text-slate-900 uppercase leading-tight">{stationName}</span>
        </div>
        <div className="font-mono font-black text-[8.5px] md:text-[9.5px] text-slate-800 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 shadow-2xs mt-auto">
          ${space.price}
        </div>
      </div>
    );
  }

  if (edge === 'top') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center p-1 bg-white relative text-center select-none">
        <div className="font-mono font-black text-[8.5px] md:text-[9.5px] text-slate-800 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 shadow-2xs mb-0.5">
          ${space.price}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[7px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
          <span className="text-[8.5px] md:text-[9.5px] font-extrabold text-slate-900 uppercase leading-tight">{stationName}</span>
        </div>
        <span className="text-base leading-none mt-auto">🚌</span>
      </div>
    );
  }

  if (edge === 'left') {
    return (
      <div className="w-full h-full flex flex-row justify-between items-center p-1 bg-white relative select-none">
        <div className="flex-1 flex flex-col justify-between items-center h-full text-center min-w-0">
          <div className="flex flex-col items-center mt-0.5">
            <span className="text-[7px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
            <span className="text-[8px] md:text-[9px] font-extrabold text-slate-900 uppercase leading-tight">{stationName}</span>
          </div>
          <div className="font-mono font-black text-[8px] md:text-[9px] text-slate-800 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 shadow-2xs mt-auto">
            ${space.price}
          </div>
        </div>
        <div className="w-[20%] flex items-center justify-center text-base">
          🚌
        </div>
      </div>
    );
  }

  // Right Edge
  return (
    <div className="w-full h-full flex flex-row justify-between items-center p-1 bg-white relative select-none">
      <div className="w-[20%] flex items-center justify-center text-base">
        🚌
      </div>
      <div className="flex-1 flex flex-col justify-between items-center h-full text-center min-w-0">
        <div className="flex flex-col items-center mt-0.5">
          <span className="text-[7px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
          <span className="text-[8px] md:text-[9px] font-extrabold text-slate-900 uppercase leading-tight">{stationName}</span>
        </div>
        <div className="font-mono font-black text-[8px] md:text-[9px] text-slate-800 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 shadow-2xs mt-auto">
          ${space.price}
        </div>
      </div>
    </div>
  );
}
