'use client';

import { PropertySpace, Player } from '@/game/types';
import { getLocationArtwork } from '@/game/locationArtworks';

export type BoardEdge = 'bottom' | 'top' | 'left' | 'right';

interface PropertyTileProps {
  space: PropertySpace;
  edge: BoardEdge;
  owner: Player | null | undefined;
}

const COLOR_MAP: Record<PropertySpace['colorGroup'], string> = {
  'red': 'bg-red-500',
  'pink': 'bg-pink-400',
  'teal': 'bg-teal-500',
  'light-green': 'bg-emerald-500',
  'orange': 'bg-amber-500',
  'yellow': 'bg-yellow-400',
  'cyan': 'bg-sky-500',
  'dark-blue': 'bg-blue-800',
};

export default function PropertyTile({ space, edge, owner }: PropertyTileProps) {
  const colorClass = COLOR_MAP[space.colorGroup] || 'bg-slate-400';
  const artwork = getLocationArtwork(space.id);

  // Dynamic font sizing to ensure maximum readability on the enlarged board
  const getNameFontSize = (name: string) => {
    const len = name.length;
    if (len <= 7) return 'text-[9.5px] md:text-[11px] lg:text-[12.5px] font-black tracking-tight';
    if (len <= 13) return 'text-[8px] md:text-[9.5px] lg:text-[10.5px] font-extrabold leading-[1.12]';
    return 'text-[7.5px] md:text-[8.5px] lg:text-[9.5px] font-bold leading-[1.08]';
  };

  // 1. Bottom Edge (Spaces 31 - 39: Color strip at Top, Photo in middle, Name, Price at Bottom)
  if (edge === 'bottom') {
    return (
      <div className="w-full h-full flex flex-col justify-between bg-white relative select-none group">
        {/* Color Strip (Top / Inner Edge) */}
        <div className={`h-[18%] w-full ${colorClass} shrink-0 flex items-center justify-center relative shadow-2xs`}>
          {owner && (
            <div 
              className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-white shadow-xs"
              style={{ backgroundColor: owner.tokenColor }}
              title={`Chủ: ${owner.nickname}`}
            />
          )}
        </div>

        {/* White Content Region */}
        <div className="flex-1 flex flex-col justify-between items-center px-1 py-0.5 text-center min-w-0">
          <span className={`w-full text-slate-900 uppercase break-words hyphens-auto mt-0.5 ${getNameFontSize(space.name)}`}>
            {space.name}
          </span>

          {/* Dedicated Real Location Photograph Thumbnail */}
          <div className="w-full h-8 md:h-10 lg:h-12 my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
            {artwork?.renderThumbnail ? (
              artwork.renderThumbnail('w-full h-full')
            ) : space.landmarkIcon ? (
              <span className="text-sm leading-none">{space.landmarkIcon}</span>
            ) : null}
          </div>

          {/* Price Badge */}
          <div className="font-mono font-black text-[8.5px] md:text-[10px] lg:text-[11px] text-slate-800 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 shadow-2xs mt-auto">
            ${space.price}
          </div>
        </div>
      </div>
    );
  }

  // 2. Top Edge (Spaces 11 - 19: Price at Top / Outer Edge, Name, Photo in middle, Color strip at Bottom / Inner Edge)
  if (edge === 'top') {
    return (
      <div className="w-full h-full flex flex-col justify-between bg-white relative select-none group">
        {/* White Content Region (Top half) */}
        <div className="flex-1 flex flex-col justify-between items-center px-1 py-0.5 text-center min-w-0">
          {/* Price Badge at outer top */}
          <div className="font-mono font-black text-[8.5px] md:text-[10px] lg:text-[11px] text-slate-800 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 shadow-2xs mb-0.5">
            ${space.price}
          </div>

          {/* Dedicated Real Location Photograph Thumbnail */}
          <div className="w-full h-8 md:h-10 lg:h-12 my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
            {artwork?.renderThumbnail ? (
              artwork.renderThumbnail('w-full h-full')
            ) : space.landmarkIcon ? (
              <span className="text-sm leading-none">{space.landmarkIcon}</span>
            ) : null}
          </div>

          <span className={`w-full text-slate-900 uppercase break-words hyphens-auto mb-0.5 ${getNameFontSize(space.name)}`}>
            {space.name}
          </span>
        </div>

        {/* Color Strip (Bottom / Inner Edge) */}
        <div className={`h-[18%] w-full ${colorClass} shrink-0 flex items-center justify-center relative shadow-2xs`}>
          {owner && (
            <div 
              className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-white shadow-xs"
              style={{ backgroundColor: owner.tokenColor }}
              title={`Chủ: ${owner.nickname}`}
            />
          )}
        </div>
      </div>
    );
  }

  // 3. Left Edge (Spaces 1 - 9: Width > Height. Color strip at Right / Inner Edge, Content on Left)
  if (edge === 'left') {
    return (
      <div className="w-full h-full flex flex-row justify-between bg-white relative select-none group">
        {/* White Content Region (Left / Outer side) */}
        <div className="flex-1 h-full flex flex-col justify-between items-center px-1 py-0.5 text-center min-w-0">
          <span className={`w-full text-slate-900 uppercase break-words hyphens-auto ${getNameFontSize(space.name)}`}>
            {space.name}
          </span>

          {/* Dedicated Real Location Photograph Thumbnail */}
          <div className="w-14 md:w-18 lg:w-22 h-6 md:h-7 lg:h-8 my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
            {artwork?.renderThumbnail ? (
              artwork.renderThumbnail('w-full h-full')
            ) : space.landmarkIcon ? (
              <span className="text-sm leading-none">{space.landmarkIcon}</span>
            ) : null}
          </div>

          {/* Price Badge */}
          <div className="font-mono font-black text-[8px] md:text-[9.5px] lg:text-[10.5px] text-slate-800 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 shadow-2xs mt-auto">
            ${space.price}
          </div>
        </div>

        {/* Color Strip (Right / Inner Edge towards center) */}
        <div className={`w-[18%] h-full ${colorClass} shrink-0 flex items-center justify-center relative shadow-2xs`}>
          {owner && (
            <div 
              className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-white shadow-xs"
              style={{ backgroundColor: owner.tokenColor }}
              title={`Chủ: ${owner.nickname}`}
            />
          )}
        </div>
      </div>
    );
  }

  // 4. Right Edge (Spaces 21 - 29: Width > Height. Color strip at Left / Inner Edge, Content on Right)
  return (
    <div className="w-full h-full flex flex-row justify-between bg-white relative select-none group">
      {/* Color Strip (Left / Inner Edge towards center) */}
      <div className={`w-[18%] h-full ${colorClass} shrink-0 flex items-center justify-center relative shadow-2xs`}>
        {owner && (
          <div 
            className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-white shadow-xs"
            style={{ backgroundColor: owner.tokenColor }}
            title={`Chủ: ${owner.nickname}`}
          />
        )}
      </div>

      {/* White Content Region (Right / Outer side) */}
      <div className="flex-1 h-full flex flex-col justify-between items-center px-1 py-0.5 text-center min-w-0">
        <span className={`w-full text-slate-900 uppercase break-words hyphens-auto ${getNameFontSize(space.name)}`}>
          {space.name}
        </span>

        {/* Dedicated Real Location Photograph Thumbnail */}
        <div className="w-14 md:w-18 lg:w-22 h-6 md:h-7 lg:h-8 my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
          {artwork?.renderThumbnail ? (
            artwork.renderThumbnail('w-full h-full')
          ) : space.landmarkIcon ? (
            <span className="text-sm leading-none">{space.landmarkIcon}</span>
          ) : null}
        </div>

        {/* Price Badge */}
        <div className="font-mono font-black text-[8px] md:text-[9.5px] lg:text-[10.5px] text-slate-800 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 shadow-2xs mt-auto">
          ${space.price}
        </div>
      </div>
    </div>
  );
}
