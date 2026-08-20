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
  // Extract station name cleanly (e.g. "CẦN GIUỘC", "MIỀN TÂY", "CHỢ LỚN", "MIỀN ĐÔNG")
  const stationName = space.name.replace(/^Bến Xe\s*/i, '').trim();
  const artwork = getLocationArtwork(space.id);

  if (edge === 'bottom') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center p-0.5 bg-white relative text-center select-none group">
        <div className="w-full h-7 md:h-9 rounded-xs overflow-hidden mt-0.5">
          {artwork?.renderThumbnail ? (
            artwork.renderThumbnail('w-full h-full')
          ) : (
            <span className="text-base leading-none">🚌</span>
          )}
        </div>
        <div className="flex flex-col items-center my-auto">
          <span className="text-[6.5px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
          <span className="text-[8px] md:text-[9px] font-black text-slate-900 uppercase leading-tight">{stationName}</span>
        </div>
        <div className="font-mono font-black text-[8px] md:text-[9px] text-slate-800 bg-slate-100 px-1 py-0.2 rounded border border-slate-200 shadow-2xs mt-auto">
          ${space.price}
        </div>
      </div>
    );
  }

  if (edge === 'top') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center p-0.5 bg-white relative text-center select-none group">
        <div className="font-mono font-black text-[8px] md:text-[9px] text-slate-800 bg-slate-100 px-1 py-0.2 rounded border border-slate-200 shadow-2xs mb-0.5">
          ${space.price}
        </div>
        <div className="flex flex-col items-center my-auto">
          <span className="text-[6.5px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
          <span className="text-[8px] md:text-[9px] font-black text-slate-900 uppercase leading-tight">{stationName}</span>
        </div>
        <div className="w-full h-7 md:h-9 rounded-xs overflow-hidden mb-0.5">
          {artwork?.renderThumbnail ? (
            artwork.renderThumbnail('w-full h-full')
          ) : (
            <span className="text-base leading-none">🚌</span>
          )}
        </div>
      </div>
    );
  }

  if (edge === 'left') {
    return (
      <div className="w-full h-full flex flex-row justify-between items-center p-0.5 bg-white relative select-none group">
        <div className="flex-1 flex flex-col justify-between items-center h-full text-center min-w-0">
          <div className="flex flex-col items-center mt-0.5">
            <span className="text-[6.5px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
            <span className="text-[7.5px] md:text-[8.5px] font-black text-slate-900 uppercase leading-tight">{stationName}</span>
          </div>
          <div className="w-12 md:w-16 h-5 md:h-6 my-auto rounded-xs overflow-hidden">
            {artwork?.renderThumbnail ? (
              artwork.renderThumbnail('w-full h-full')
            ) : (
              <span className="text-sm">🚌</span>
            )}
          </div>
          <div className="font-mono font-black text-[7.5px] md:text-[8.5px] text-slate-800 bg-slate-100 px-1 py-0.2 rounded border border-slate-200 shadow-2xs mt-auto">
            ${space.price}
          </div>
        </div>
      </div>
    );
  }

  // Right Edge
  return (
    <div className="w-full h-full flex flex-row justify-between items-center p-0.5 bg-white relative select-none group">
      <div className="flex-1 flex flex-col justify-between items-center h-full text-center min-w-0">
        <div className="flex flex-col items-center mt-0.5">
          <span className="text-[6.5px] font-bold text-slate-500 uppercase tracking-tighter">BẾN XE</span>
          <span className="text-[7.5px] md:text-[8.5px] font-black text-slate-900 uppercase leading-tight">{stationName}</span>
        </div>
        <div className="w-12 md:w-16 h-5 md:h-6 my-auto rounded-xs overflow-hidden">
          {artwork?.renderThumbnail ? (
            artwork.renderThumbnail('w-full h-full')
          ) : (
            <span className="text-sm">🚌</span>
          )}
        </div>
        <div className="font-mono font-black text-[7.5px] md:text-[8.5px] text-slate-800 bg-slate-100 px-1 py-0.2 rounded border border-slate-200 shadow-2xs mt-auto">
          ${space.price}
        </div>
      </div>
    </div>
  );
}
