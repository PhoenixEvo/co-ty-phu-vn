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

// High-contrast, vibrant Building Indicator for Houses and Hotels
function BuildingIndicator({ houseCount, owner, isMortgaged }: { houseCount: number; owner: Player | null | undefined; isMortgaged?: boolean }) {
  if (!owner) return null;

  if (isMortgaged) {
    // Mortgaged Badge
    return (
      <div className="flex items-center justify-center z-10">
        <div className="bg-amber-950 text-amber-300 font-black text-[7px] md:text-[8px] px-1 py-0.2 rounded border border-amber-400/80 shadow-xs flex items-center gap-0.5 leading-none">
          <span>⚠️</span>
          <span>CẦM</span>
        </div>
      </div>
    );
  }

  if (houseCount === 5) {
    // Hotel: Luxury Red-Gold Badge with Hotel Icon
    return (
      <div className="flex items-center justify-center z-10 animate-in zoom-in-50 duration-200">
        <div className="bg-linear-to-r from-red-600 to-rose-700 text-amber-300 font-black text-[8px] md:text-[9.5px] px-1 py-0.5 rounded-md shadow-md border border-amber-300 flex items-center gap-0.5 leading-none">
          <span className="text-[10px] md:text-xs leading-none">🏨</span>
          <span className="font-mono text-[7px] md:text-[8px] font-black text-amber-200">KS</span>
        </div>
      </div>
    );
  }

  if (houseCount >= 1 && houseCount <= 4) {
    // High-clarity Green House Badge: Never gets clipped on narrow vertical strips!
    return (
      <div className="flex items-center justify-center z-10 animate-in zoom-in-50 duration-200">
        <div className="bg-slate-950/90 text-emerald-300 font-black text-[8px] md:text-[9.5px] px-1 py-0.5 rounded-md shadow-md border border-emerald-400/90 flex items-center gap-0.5 leading-none">
          <span className="text-[9px] md:text-[10.5px] leading-none">🏠</span>
          {houseCount > 1 && (
            <span className="font-mono text-[7.5px] md:text-[8.5px] font-black text-emerald-200">
              x{houseCount}
            </span>
          )}
        </div>
      </div>
    );
  }

  // 0 Houses: Owner Avatar Dot with Initial
  return (
    <div 
      className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-white shadow-md flex items-center justify-center text-[7px] md:text-[8px] text-white font-black"
      style={{ backgroundColor: owner.tokenColor }}
      title={`Chủ: ${owner.nickname}`}
    >
      {owner.nickname.charAt(0).toUpperCase()}
    </div>
  );
}

export default function PropertyTile({ space, edge, owner, ownership }: PropertyTileProps) {
  const isMortgaged = ownership?.isMortgaged || false;
  const colorClass = isMortgaged ? 'bg-slate-700 opacity-80' : COLOR_MAP[space.colorGroup] || 'bg-slate-400';
  const artwork = getLocationArtwork(space.id);
  const houseCount = ownership?.houseCount || 0;
  const priceDisplay = isMortgaged ? 'ĐANG CẦM' : formatMoneyCompact(space.price);

  // 1. Bottom Edge (Spaces 31 - 39: Color strip at Top, Name, Photo, Price at Bottom)
  if (edge === 'bottom') {
    return (
      <div className={`w-full h-full flex flex-col justify-between bg-white relative select-none group overflow-hidden ${isMortgaged ? 'bg-amber-50/50' : ''}`}>
        {/* Color Strip (Top / Inner Edge) */}
        <div className={`h-[20%] w-full ${colorClass} shrink-0 flex items-center justify-center relative shadow-2xs px-0.5`}>
          <BuildingIndicator houseCount={houseCount} owner={owner} isMortgaged={isMortgaged} />
        </div>

        {/* White Content Region */}
        <div className="flex-1 flex flex-col justify-between items-center px-0.5 py-0.5 text-center min-w-0 overflow-hidden">
          <span className="w-full text-slate-900 uppercase font-black text-[7px] md:text-[8px] lg:text-[9px] leading-tight truncate px-0.5">
            {space.name}
          </span>

          {/* Photo Thumbnail */}
          <div className="w-full flex-1 min-h-0 max-h-[30px] md:max-h-[38px] my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
            {artwork?.renderThumbnail ? (
              artwork.renderThumbnail('w-full h-full object-cover')
            ) : space.landmarkIcon ? (
              <span className="text-xs leading-none">{space.landmarkIcon}</span>
            ) : null}
          </div>

          {/* Price Badge */}
          <div className={`font-mono font-black text-[7px] md:text-[8px] lg:text-[9px] px-1 py-0.1 rounded border shadow-2xs shrink-0 leading-tight ${
            isMortgaged ? 'text-amber-800 bg-amber-100 border-amber-300' : 'text-slate-800 bg-slate-100 border-slate-200'
          }`}>
            {priceDisplay}
          </div>
        </div>
      </div>
    );
  }

  // 2. Top Edge (Spaces 11 - 19: Price at Top, Photo, Name, Color strip at Bottom)
  if (edge === 'top') {
    return (
      <div className={`w-full h-full flex flex-col justify-between bg-white relative select-none group overflow-hidden ${isMortgaged ? 'bg-amber-50/50' : ''}`}>
        {/* White Content Region */}
        <div className="flex-1 flex flex-col justify-between items-center px-0.5 py-0.5 text-center min-w-0 overflow-hidden">
          {/* Price Badge */}
          <div className={`font-mono font-black text-[7px] md:text-[8px] lg:text-[9px] px-1 py-0.1 rounded border shadow-2xs shrink-0 leading-tight ${
            isMortgaged ? 'text-amber-800 bg-amber-100 border-amber-300' : 'text-slate-800 bg-slate-100 border-slate-200'
          }`}>
            {priceDisplay}
          </div>

          {/* Photo Thumbnail */}
          <div className="w-full flex-1 min-h-0 max-h-[30px] md:max-h-[38px] my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
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
        <div className={`h-[20%] w-full ${colorClass} shrink-0 flex items-center justify-center relative shadow-2xs px-0.5`}>
          <BuildingIndicator houseCount={houseCount} owner={owner} isMortgaged={isMortgaged} />
        </div>
      </div>
    );
  }

  // 3. Left Edge (Spaces 1 - 9: Color strip at Right / Inner Edge)
  if (edge === 'left') {
    return (
      <div className={`w-full h-full flex flex-row justify-between bg-white relative select-none group overflow-hidden ${isMortgaged ? 'bg-amber-50/50' : ''}`}>
        {/* White Content Region */}
        <div className="flex-1 h-full flex flex-col justify-between items-center px-0.5 py-0.5 text-center min-w-0 overflow-hidden">
          <span className="w-full text-slate-900 uppercase font-black text-[6.5px] md:text-[7.5px] lg:text-[8.5px] leading-tight truncate px-0.5">
            {space.name}
          </span>

          {/* Photo Thumbnail */}
          <div className="w-[85%] flex-1 min-h-0 max-h-[22px] md:max-h-[28px] my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
            {artwork?.renderThumbnail ? (
              artwork.renderThumbnail('w-full h-full object-cover')
            ) : space.landmarkIcon ? (
              <span className="text-xs leading-none">{space.landmarkIcon}</span>
            ) : null}
          </div>

          {/* Price Badge */}
          <div className={`font-mono font-black text-[6.5px] md:text-[7.5px] lg:text-[8.5px] px-1 py-0.1 rounded border shadow-2xs shrink-0 leading-tight ${
            isMortgaged ? 'text-amber-800 bg-amber-100 border-amber-300' : 'text-slate-800 bg-slate-100 border-slate-200'
          }`}>
            {priceDisplay}
          </div>
        </div>

        {/* Color Strip (Right / Inner Edge towards center) */}
        <div className={`w-[20%] h-full ${colorClass} shrink-0 flex flex-col items-center justify-center relative shadow-2xs py-0.5`}>
          <BuildingIndicator houseCount={houseCount} owner={owner} isMortgaged={isMortgaged} />
        </div>
      </div>
    );
  }

  // 4. Right Edge (Spaces 21 - 29: Color strip at Left / Inner Edge)
  return (
    <div className={`w-full h-full flex flex-row justify-between bg-white relative select-none group overflow-hidden ${isMortgaged ? 'bg-amber-50/50' : ''}`}>
      {/* Color Strip (Left / Inner Edge towards center) */}
      <div className={`w-[20%] h-full ${colorClass} shrink-0 flex flex-col items-center justify-center relative shadow-2xs py-0.5`}>
        <BuildingIndicator houseCount={houseCount} owner={owner} isMortgaged={isMortgaged} />
      </div>

      {/* White Content Region */}
      <div className="flex-1 h-full flex flex-col justify-between items-center px-0.5 py-0.5 text-center min-w-0 overflow-hidden">
        <span className="w-full text-slate-900 uppercase font-black text-[6.5px] md:text-[7.5px] lg:text-[8.5px] leading-tight truncate px-0.5">
          {space.name}
        </span>

        {/* Photo Thumbnail */}
        <div className="w-[85%] flex-1 min-h-0 max-h-[22px] md:max-h-[28px] my-auto rounded-xs overflow-hidden shrink-0 shadow-2xs">
          {artwork?.renderThumbnail ? (
            artwork.renderThumbnail('w-full h-full object-cover')
          ) : space.landmarkIcon ? (
            <span className="text-xs leading-none">{space.landmarkIcon}</span>
          ) : null}
        </div>

        {/* Price Badge */}
        <div className={`font-mono font-black text-[6.5px] md:text-[7.5px] lg:text-[8.5px] px-1 py-0.1 rounded border shadow-2xs shrink-0 leading-tight ${
          isMortgaged ? 'text-amber-800 bg-amber-100 border-amber-300' : 'text-slate-800 bg-slate-100 border-slate-200'
        }`}>
          {priceDisplay}
        </div>
      </div>
    </div>
  );
}
