'use client';

import { TaxSpace } from '@/game/types';
import { BoardEdge } from './PropertyTile';

interface TaxTileProps {
  space: TaxSpace;
  edge: BoardEdge;
}

export default function TaxTile({ space, edge }: TaxTileProps) {
  const isIncomeTax = space.position === 4;
  const isSpecialTax = space.position === 38;

  if (edge === 'bottom') {
    return (
      <div className="w-full h-full flex flex-col justify-between items-center p-1 bg-white relative text-center select-none">
        <span className="text-sm mt-0.5">🧾</span>
        <div className="flex flex-col items-center">
          <span className="text-[7.5px] md:text-[8.5px] font-black text-slate-900 uppercase leading-tight">
            {isSpecialTax ? 'THUẾ ĐẶC BIỆT' : 'THUẾ THU NHẬP'}
          </span>
        </div>
        <div className="font-mono font-black text-[8px] md:text-[9px] text-red-600 bg-red-50 px-1 py-0.2 rounded border border-red-200 mt-auto">
          - ${space.taxAmount || 100}
        </div>
      </div>
    );
  }

  if (edge === 'left') {
    return (
      <div className="w-full h-full flex flex-row justify-between items-center p-1 bg-white relative select-none">
        <div className="flex-1 flex flex-col justify-between items-center h-full text-center min-w-0">
          <span className="text-[7.5px] md:text-[8.5px] font-black text-slate-900 uppercase leading-tight mt-0.5">
            {isIncomeTax ? 'THUẾ THU NHẬP' : 'THUẾ ĐẶC BIỆT'}
          </span>
          <div className="font-mono font-black text-[8px] md:text-[8.5px] text-red-600 bg-red-50 px-1 py-0.2 rounded border border-red-200 mt-auto">
            - ${space.taxAmount || 200}
          </div>
        </div>
        <div className="w-[20%] flex items-center justify-center text-sm">
          🧾
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-1 bg-white relative text-center select-none">
      <span className="text-sm mt-0.5">🧾</span>
      <span className="text-[7.5px] md:text-[8.5px] font-black text-slate-900 uppercase leading-tight">
        {space.name}
      </span>
      <div className="font-mono font-black text-[8px] md:text-[9px] text-red-600 bg-red-50 px-1 py-0.2 rounded border border-red-200 mt-auto">
        - ${space.taxAmount || 100}
      </div>
    </div>
  );
}
