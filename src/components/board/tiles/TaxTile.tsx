'use client';

import { TaxSpace } from '@/game/types';
import { BoardEdge } from './PropertyTile';
import { formatMoneyCompact } from '@/utils/format';

interface TaxTileProps {
  space: TaxSpace;
  edge: BoardEdge;
}

export default function TaxTile({ space, edge }: TaxTileProps) {
  const isIncomeTax = space.position === 4;
  const isSpecialTax = space.position === 38;
  const taxAmount = space.taxAmount || (isSpecialTax ? 1_000_000 : 2_000_000);
  const taxDisplay = `- ${formatMoneyCompact(taxAmount)}`;

  if (edge === 'bottom') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center px-0.5 py-0.5 bg-white relative text-center select-none overflow-hidden">
        <span className="text-xs md:text-sm mt-0.5">🧾</span>
        <div className="flex flex-col items-center leading-tight px-0.5 w-full">
          <span className="text-[6.5px] md:text-[7.5px] lg:text-[8px] font-black text-slate-900 uppercase leading-tight truncate w-full">
            {isSpecialTax ? 'THUẾ ĐẶC BIỆT' : 'THUẾ THU NHẬP'}
          </span>
        </div>
        <div className="font-mono font-black text-[7px] md:text-[8px] lg:text-[8.5px] text-red-600 bg-red-50 px-1 py-0.1 rounded border border-red-200 shrink-0 leading-tight">
          {taxDisplay}
        </div>
      </div>
    );
  }

  if (edge === 'left') {
    return (
      <div className="w-full h-full flex flex-row justify-between items-center px-0.5 py-0.5 bg-white relative select-none overflow-hidden">
        <div className="flex-1 flex flex-col justify-between items-center h-full text-center min-w-0 overflow-hidden">
          <span className="text-[6px] md:text-[7px] font-black text-slate-900 uppercase leading-tight truncate w-full px-0.5">
            {isIncomeTax ? 'THUẾ THU NHẬP' : 'THUẾ ĐẶC BIỆT'}
          </span>
          <span className="text-xs">🧾</span>
          <div className="font-mono font-black text-[6.5px] md:text-[7.5px] text-red-600 bg-red-50 px-1 py-0.1 rounded border border-red-200 shrink-0 leading-tight">
            {taxDisplay}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between items-center px-0.5 py-0.5 bg-white relative text-center select-none overflow-hidden">
      <span className="text-xs md:text-sm mt-0.5">🧾</span>
      <span className="text-[6.5px] md:text-[7.5px] font-black text-slate-900 uppercase leading-tight truncate w-full px-0.5">
        {space.name}
      </span>
      <div className="font-mono font-black text-[7px] md:text-[8px] text-red-600 bg-red-50 px-1 py-0.1 rounded border border-red-200 shrink-0 leading-tight">
        {taxDisplay}
      </div>
    </div>
  );
}
