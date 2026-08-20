'use client';

import { BoardSpace } from '@/game/types';

interface CornerTileProps {
  space: BoardSpace;
}

export default function CornerTile({ space }: CornerTileProps) {
  // 0: Bắt Đầu (Bottom-Left)
  if (space.position === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-[#f0ebe1] text-red-600 text-center select-none">
        <span className="text-2xl md:text-3xl leading-none">⬆️</span>
        <span className="font-black text-[9.5px] md:text-[11px] uppercase tracking-tight text-slate-900 mt-0.5">BẮT ĐẦU</span>
        <span className="text-[7.5px] md:text-[8.5px] font-bold text-red-600 leading-tight">LÃNH $200 KHI QUA</span>
      </div>
    );
  }

  // 10: Ở Tù / Thăm Tù (Top-Left)
  if (space.position === 10) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-[#f0ebe1] text-slate-800 text-center select-none relative">
        <span className="text-2xl md:text-3xl leading-none">👮</span>
        <span className="font-black text-[9px] md:text-[10px] uppercase tracking-tight text-slate-900 mt-0.5">Ở TÙ</span>
        <span className="text-[7.5px] md:text-[8px] font-bold text-slate-500">THĂM TÙ</span>
      </div>
    );
  }

  // 20: Bãi Đậu Xe Miễn Phí (Top-Right)
  if (space.position === 20) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-[#f0ebe1] text-slate-800 text-center select-none">
        <span className="text-2xl md:text-3xl leading-none">🚗</span>
        <span className="font-black text-[9px] md:text-[10px] uppercase tracking-tight text-slate-900 mt-0.5">BÃI ĐẬU XE</span>
        <span className="text-[7.5px] md:text-[8px] font-bold text-emerald-600">MIỄN PHÍ</span>
      </div>
    );
  }

  // 30: Vào Tù (Bottom-Right)
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-[#f0ebe1] text-red-700 text-center select-none">
      <span className="text-2xl md:text-3xl leading-none">🚓</span>
      <span className="font-black text-[9px] md:text-[10px] uppercase tracking-tight text-slate-900 mt-0.5">VÀO TÙ</span>
      <span className="text-[7.5px] md:text-[8px] font-bold text-red-600">ĐI NGAY</span>
    </div>
  );
}
