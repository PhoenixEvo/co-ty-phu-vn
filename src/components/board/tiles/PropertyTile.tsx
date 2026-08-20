'use client';

import { PropertySpace, Player, PropertyOwnership } from '@/game/types';
import { getLocationArtwork } from '@/game/locationArtworks';
import { formatMoneyCompact } from '@/utils/format';

export type BoardEdge = 'bottom' | 'top' | 'left' | 'right';

interface PropertyTileProps {
  space: PropertySpace;
  edge: BoardEdge;
  owner: Player | null | undefined;
  ownership?: PropertyOwnership | null;
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

// Render Houses or Hotel on the color strip
function BuildingIndicator({ houseCount, owner }: { houseCount: number; owner: Player | null | undefined }) {
  if (!owner) return null;

  if (houseCount === 5) {
    // Hotel (Red / Gold Hotel Badge)
    return (
      <div className="flex items-center justify-center gap-1 z-10 animate-in zoom-in-50 duration-200">
        <div className="bg-red-700 text-amber-300 font-black text-[8px] md:text-[9px] px-1.5 py-0.2 rounded-md shadow-xs border border-amber-300 flex items-center gap-0.5 leading-none">
          <span>🏨</span>
          <span className="font-mono text-[7px] md:text-[8px]">KS</span>
        </div>
      </div>
    );
  }

  if (houseCount >= 1 && houseCount <= 4) {
    // 1-4 Green Houses
    return (
      <div className="flex items-center justify-center gap-0.5 z-10 animate-in zoom-in-50 duration-200">
        {Array.from({ length: houseCount }).map((_, i) => (
          <div 
            key={i} 
            className="w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-600 border border-white rounded-xs shadow-xs flex items-center justify-center text-[7px] text-white leading-none font-bold"
            title={`${houseCount} Nhà`}
          >
            🏠
          </div>
        ))}
      </div>
    );
  }

  // 0 Houses: Show owner avatar indicator
  return (
    <div 
      className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-white shadow-xs"
      style={{ backgroundColor: owner.tokenColor }}
      title={`Chủ: ${owner.nickname}`}
    />
  );
}

export default function PropertyTile({ space, edge, owner, ownership }: PropertyTileProps) {
  const colorClass = COLOR_MAP[space.colorGroup] || 'bg-slate-400';
  const artwork = getLocationArtwork(space.id);
  const houseCount = ownership?.houseCount || 0;
  const priceDisplay = formatMoneyCompact(space.price);

  // 1. Bottom Edge (Spaces 31 - 39: Color strip at Top, Name, Photo, Price at Bottom)
  if (edge === 'bottom') {
    return (
      <div className="w-full h-full flex flex-col justify-between bg-white relative select-none group overflow-hidden">
        {/* Color Strip (Top / Inner Edge) */}
        <div className={`h-[18%] w-full ${colorClass} shrink-0 flex items-center justify-center relative shadow-2xs px-0.5`}>
          <BuildingIndicator houseCount={houseCount} owner={owner} />
        </div>

        {/* White Content Region */}
        <div className="flex-1 flex flex-col justify-between items-center px-0.5 py-0.5 text-center min-w-0 overflow-hidden">
          <span className="w-full text-slate-900 uppercase font-black text-[7px] md:text-[8px] lg:text-[9px] leading-tight truncate px-0.5">
            {space.name}
          </span>

          {/* Photo Thumbnail */}
          <div className="w-full flex-1 min-h-0 max-h-[32px] md:max-h-[40px] my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
            {artwork?.renderThumbnail ? (
              artwork.renderThumbnail('w-full h-full object-cover')
            ) : space.landmarkIcon ? (
              <span className="text-xs leading-none">{space.landmarkIcon}</span>
            ) : null}
          </div>

          {/* Price Badge */}
          <div className="font-mono font-black text-[7px] md:text-[8px] lg:text-[9px] text-slate-800 bg-slate-100 px-1 py-0.1 rounded border border-slate-200 shadow-2xs shrink-0 leading-tight">
            {priceDisplay}
          </div>
        </div>
      </div>
    );
  }

  // 2. Top Edge (Spaces 11 - 19: Price at Top, Photo, Name, Color strip at Bottom)
  if (edge === 'top') {
    return (
      <div className="w-full h-full flex flex-col justify-between bg-white relative select-none group overflow-hidden">
        {/* White Content Region */}
        <div className="flex-1 flex flex-col justify-between items-center px-0.5 py-0.5 text-center min-w-0 overflow-hidden">
          {/* Price Badge */}
          <div className="font-mono font-black text-[7px] md:text-[8px] lg:text-[9px] text-slate-800 bg-slate-100 px-1 py-0.1 rounded border border-slate-200 shadow-2xs shrink-0 leading-tight">
            {priceDisplay}
          </div>

          {/* Photo Thumbnail */}
          <div className="w-full flex-1 min-h-0 max-h-[32px] md:max-h-[40px] my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
            {artwork?.renderThumbnail ? (
              artwork.renderThumbnail('w-full h-full object-cover')
            ) : space.landmarkIcon ? (
              <span className="text-xs leading-none">{space.landmarkIcon}</span>
            ) : null}
          </div>

          <span className="w-full text-slate-900 uppercase font-black text-[7px] md:text-[8px] lg:text-[9px] leading-tight truncate px-0.5">
            {space.name}
          </span>
        </div>

        {/* Color Strip (Bottom / Inner Edge) */}
        <div className={`h-[18%] w-full ${colorClass} shrink-0 flex items-center justify-center relative shadow-2xs px-0.5`}>
          <BuildingIndicator houseCount={houseCount} owner={owner} />
        </div>
      </div>
    );
  }

  // 3. Left Edge (Spaces 1 - 9: Color strip at Right / Inner Edge)
  if (edge === 'left') {
    return (
      <div className="w-full h-full flex flex-row justify-between bg-white relative select-none group overflow-hidden">
        {/* White Content Region */}
        <div className="flex-1 h-full flex flex-col justify-between items-center px-0.5 py-0.5 text-center min-w-0 overflow-hidden">
          <span className="w-full text-slate-900 uppercase font-black text-[6.5px] md:text-[7.5px] lg:text-[8.5px] leading-tight truncate px-0.5">
            {space.name}
          </span>

          {/* Photo Thumbnail */}
          <div className="w-[85%] flex-1 min-h-0 max-h-[24px] md:max-h-[30px] my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
            {artwork?.renderThumbnail ? (
              artwork.renderThumbnail('w-full h-full object-cover')
            ) : space.landmarkIcon ? (
              <span className="text-xs leading-none">{space.landmarkIcon}</span>
            ) : null}
          </div>

          {/* Price Badge */}
          <div className="font-mono font-black text-[6.5px] md:text-[7.5px] lg:text-[8.5px] text-slate-800 bg-slate-100 px-1 py-0.1 rounded border border-slate-200 shadow-2xs shrink-0 leading-tight">
            {priceDisplay}
          </div>
        </div>

        {/* Color Strip (Right / Inner Edge towards center) */}
        <div className={`w-[18%] h-full ${colorClass} shrink-0 flex flex-col items-center justify-center relative shadow-2xs py-0.5`}>
          <BuildingIndicator houseCount={houseCount} owner={owner} />
        </div>
      </div>
    );
  }

  // 4. Right Edge (Spaces 21 - 29: Color strip at Left / Inner Edge)
  return (
    <div className="w-full h-full flex flex-row justify-between bg-white relative select-none group overflow-hidden">
      {/* Color Strip (Left / Inner Edge towards center) */}
      <div className={`w-[18%] h-full ${colorClass} shrink-0 flex flex-col items-center justify-center relative shadow-2xs py-0.5`}>
        <BuildingIndicator houseCount={houseCount} owner={owner} />
      </div>

      {/* White Content Region */}
      <div className="flex-1 h-full flex flex-col justify-between items-center px-0.5 py-0.5 text-center min-w-0 overflow-hidden">
        <span className="w-full text-slate-900 uppercase font-black text-[6.5px] md:text-[7.5px] lg:text-[8.5px] leading-tight truncate px-0.5">
          {space.name}
        </span>

        {/* Photo Thumbnail */}
        <div className="w-[85%] flex-1 min-h-0 max-h-[24px] md:max-h-[30px] my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
          {artwork?.renderThumbnail ? (
            artwork.renderThumbnail('w-full h-full object-cover')
          ) : space.landmarkIcon ? (
            <span className="text-xs leading-none">{space.landmarkIcon}</span>
          ) : null}
        </div>

        {/* Price Badge */}
        <div className="font-mono font-black text-[6.5px] md:text-[7.5px] lg:text-[8.5px] text-slate-800 bg-slate-100 px-1 py-0.1 rounded border border-slate-200 shadow-2xs shrink-0 leading-tight">
          {priceDisplay}
        </div>
      </div>
    </div>
  );
}
