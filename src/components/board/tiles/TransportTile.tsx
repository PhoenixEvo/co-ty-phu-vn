'use client';

import { TransportSpace, Player } from '@/game/types';
import { getLocationArtwork } from '@/game/locationArtworks';
import { BoardEdge } from './PropertyTile';

interface TransportTileProps {
  space: TransportSpace;
  edge: BoardEdge;
  owner: Player | null | undefined;
}

export default function TransportTile({ space, edge, owner }: TransportTileProps) {
  const stationName = space.name.replace(/^Bến Xe\s*/i, '').trim();
  const artwork = getLocationArtwork(space.id);

  if (edge === 'bottom') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center px-0.5 py-0.5 bg-white relative text-center select-none group overflow-hidden">
        <div className="w-full flex-1 min-h-0 max-h-[34px] md:max-h-[44px] rounded-xs overflow-hidden my-auto shadow-2xs">
          {artwork?.renderThumbnail ? (
            artwork.renderThumbnail('w-full h-full object-cover')
          ) : (
            <span className="text-xs leading-none">🚌</span>
          )}
        </div>
        <div className="flex flex-col items-center leading-none px-0.5 w-full">
          <span className="text-[6.5px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
          <span className="text-[7.5px] md:text-[8.5px] lg:text-[9.5px] font-black text-slate-900 uppercase leading-tight truncate w-full">{stationName}</span>
        </div>
        <div className="font-mono font-black text-[7.5px] md:text-[8.5px] lg:text-[9.5px] text-slate-800 bg-slate-100 px-1 py-0.1 rounded border border-slate-200 shadow-2xs shrink-0 leading-tight">
          ${space.price}
        </div>
      </div>
    );
  }

  if (edge === 'top') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center px-0.5 py-0.5 bg-white relative text-center select-none group overflow-hidden">
        <div className="font-mono font-black text-[7.5px] md:text-[8.5px] lg:text-[9.5px] text-slate-800 bg-slate-100 px-1 py-0.1 rounded border border-slate-200 shadow-2xs shrink-0 leading-tight">
          ${space.price}
        </div>
        <div className="flex flex-col items-center leading-none px-0.5 w-full">
          <span className="text-[6.5px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
          <span className="text-[7.5px] md:text-[8.5px] lg:text-[9.5px] font-black text-slate-900 uppercase leading-tight truncate w-full">{stationName}</span>
        </div>
        <div className="w-full flex-1 min-h-0 max-h-[34px] md:max-h-[44px] rounded-xs overflow-hidden my-auto shadow-2xs">
          {artwork?.renderThumbnail ? (
            artwork.renderThumbnail('w-full h-full object-cover')
          ) : (
            <span className="text-xs leading-none">🚌</span>
          )}
        </div>
      </div>
    );
  }

  // Left or Right Edge
  return (
    <div className="w-full h-full flex flex-row justify-between items-center px-0.5 py-0.5 bg-white relative select-none group overflow-hidden">
      <div className="flex-1 flex flex-col justify-between items-center h-full text-center min-w-0 overflow-hidden">
        <div className="flex flex-col items-center leading-none px-0.5 w-full">
          <span className="text-[6px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
          <span className="text-[7px] md:text-[8px] lg:text-[9px] font-black text-slate-900 uppercase leading-tight truncate w-full">{stationName}</span>
        </div>
        <div className="w-[85%] flex-1 min-h-0 max-h-[26px] md:max-h-[32px] my-auto rounded-xs overflow-hidden shadow-2xs">
          {artwork?.renderThumbnail ? (
            artwork.renderThumbnail('w-full h-full object-cover')
          ) : (
            <span className="text-xs">🚌</span>
          )}
        </div>
        <div className="font-mono font-black text-[7px] md:text-[8px] lg:text-[9px] text-slate-800 bg-slate-100 px-1 py-0.1 rounded border border-slate-200 shadow-2xs shrink-0 leading-tight">
          ${space.price}
        </div>
      </div>
    </div>
  );
}
