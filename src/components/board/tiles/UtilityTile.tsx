'use client';

import { UtilitySpace, Player } from '@/game/types';
import { BoardEdge } from './PropertyTile';
import { formatMoneyCompact } from '@/utils/format';

interface UtilityTileProps {
  space: UtilitySpace;
  edge: BoardEdge;
  owner: Player | null | undefined;
}

export default function UtilityTile({ space, edge, owner }: UtilityTileProps) {
  const isElectricity = space.position === 12;
  const icon = isElectricity ? '💡' : '🚰';
  const utilityName = isElectricity ? 'ĐIỆN LỰC' : 'CẤP NƯỚC';
  const priceDisplay = formatMoneyCompact(space.price);

  if (edge === 'top') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center px-0.5 py-0.5 bg-white relative text-center select-none overflow-hidden">
        <div className="font-mono font-black text-[7px] md:text-[8px] lg:text-[9px] text-slate-800 bg-slate-100 px-1 py-0.1 rounded border border-slate-200 shadow-2xs shrink-0 leading-tight">
          {priceDisplay}
        </div>
        <div className="flex flex-col items-center leading-none px-0.5 w-full">
          <span className="text-[6px] font-bold text-slate-500 uppercase tracking-tighter">CÔNG TY</span>
          <span className="text-[7px] md:text-[8px] lg:text-[8.5px] font-extrabold text-slate-900 uppercase leading-tight truncate w-full">{utilityName}</span>
        </div>
        <span className="text-sm md:text-base leading-none my-auto">{icon}</span>
      </div>
    );
  }

  // Right Edge
  return (
    <div className="w-full h-full flex flex-row justify-between items-center px-0.5 py-0.5 bg-white relative select-none overflow-hidden">
      <div className="flex-1 flex flex-col justify-between items-center h-full text-center min-w-0 overflow-hidden">
        <div className="flex flex-col items-center leading-none px-0.5 w-full">
          <span className="text-[5.5px] font-bold text-slate-500 uppercase tracking-tighter">CÔNG TY</span>
          <span className="text-[6.5px] md:text-[7.5px] lg:text-[8.5px] font-extrabold text-slate-900 uppercase leading-tight truncate w-full">{utilityName}</span>
        </div>
        <span className="text-sm leading-none my-auto">{icon}</span>
        <div className="font-mono font-black text-[6.5px] md:text-[7.5px] lg:text-[8.5px] text-slate-800 bg-slate-100 px-1 py-0.1 rounded border border-slate-200 shadow-2xs shrink-0 leading-tight">
          {priceDisplay}
        </div>
      </div>
    </div>
  );
}
