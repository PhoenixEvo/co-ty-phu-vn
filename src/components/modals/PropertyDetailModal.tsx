'use client';

import { BoardSpace, PropertySpace, TransportSpace, UtilitySpace, GameState } from '@/game/types';
import { X, Building2, User, DollarSign, Home } from 'lucide-react';

interface PropertyDetailModalProps {
  space: BoardSpace | null;
  state: GameState;
  onClose: () => void;
}

export default function PropertyDetailModal({ space, state, onClose }: PropertyDetailModalProps) {
  if (!space) return null;

  const ownership = state.properties[space.id];
  const owner = ownership ? state.players.find(p => p.id === ownership.ownerId) : null;

  const getColorBg = (color?: string) => {
    switch (color) {
      case 'red': return 'bg-red-600 text-white';
      case 'pink': return 'bg-pink-500 text-white';
      case 'teal': return 'bg-teal-600 text-white';
      case 'light-green': return 'bg-emerald-500 text-white';
      case 'orange': return 'bg-amber-500 text-white';
      case 'yellow': return 'bg-yellow-400 text-slate-900';
      case 'cyan': return 'bg-sky-500 text-white';
      case 'dark-blue': return 'bg-blue-800 text-white';
      default: return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-300 w-full max-w-sm overflow-hidden flex flex-col text-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Header Color Band */}
        <div className={`p-4 text-center relative ${space.type === 'property' ? getColorBg((space as PropertySpace).colorGroup) : 'bg-slate-800 text-white'}`}>
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
          >
            <X size={18} />
          </button>
          
          <div className="text-xs font-bold tracking-wider uppercase opacity-80">
            {space.type === 'property' ? 'BẰNG KHOÁN NHÀ ĐẤT' : space.type === 'transport' ? 'BẾN XE VẬN TẢI' : 'DỊCH VỤ CÔNG CỘNG'}
          </div>
          <h2 className="text-2xl font-black uppercase mt-1 tracking-wide">{space.name}</h2>
          
          {(space as any).price && (
            <div className="text-sm font-semibold mt-1 opacity-90">
              Giá mua: ${(space as any).price}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4 text-sm">
          {space.type === 'property' && (
            <>
              {/* Rent breakdown */}
              <div className="space-y-2 border-b border-slate-200 pb-4">
                <div className="flex justify-between items-center font-bold text-slate-900">
                  <span>Tiền thuê đất:</span>
                  <span className="font-mono text-base">${(space as PropertySpace).baseRent}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 1 Nhà 🏠:</span>
                  <span className="font-mono font-medium">${(space as PropertySpace).houseRents[0]}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 2 Nhà 🏠🏠:</span>
                  <span className="font-mono font-medium">${(space as PropertySpace).houseRents[1]}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 3 Nhà 🏠🏠🏠:</span>
                  <span className="font-mono font-medium">${(space as PropertySpace).houseRents[2]}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 4 Nhà 🏠🏠🏠🏠:</span>
                  <span className="font-mono font-medium">${(space as PropertySpace).houseRents[3]}</span>
                </div>
                <div className="flex justify-between items-center text-red-600 font-bold">
                  <span>Với Khách Sạn 🏨:</span>
                  <span className="font-mono text-base">${(space as PropertySpace).hotelRent}</span>
                </div>
              </div>

              {/* Building costs */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Chi phí xây nhà:</span>
                  <span className="font-bold text-slate-800 font-mono">${(space as PropertySpace).houseCost} / nhà</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Giá trị thế chấp:</span>
                  <span className="font-bold text-slate-800 font-mono">${(space as PropertySpace).price / 2}</span>
                </div>
              </div>
            </>
          )}

          {space.type === 'transport' && (
            <div className="space-y-3 py-2 border-b border-slate-200 pb-4">
              <div className="text-center text-3xl">🚌</div>
              <div className="text-xs text-slate-600 text-center">
                Tiền thuê tăng gấp đôi theo số lượng bến xe mà chủ sở hữu nắm giữ:
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span>1 Bến xe:</span><span className="font-bold font-mono">$25</span></div>
                <div className="flex justify-between"><span>2 Bến xe:</span><span className="font-bold font-mono">$50</span></div>
                <div className="flex justify-between"><span>3 Bến xe:</span><span className="font-bold font-mono">$100</span></div>
                <div className="flex justify-between"><span>4 Bến xe:</span><span className="font-bold font-mono">$200</span></div>
              </div>
            </div>
          )}

          {space.type === 'utility' && (
            <div className="space-y-3 py-2 border-b border-slate-200 pb-4 text-center">
              <div className="text-3xl">{space.position === 12 ? '💡' : '🚰'}</div>
              <div className="text-xs text-slate-600">
                Nếu sở hữu 1 cơ sở: Tiền thuê gấp <strong>4 lần</strong> điểm đổ xúc xắc.<br/>
                Nếu sở hữu cả 2 cơ sở: Tiền thuê gấp <strong>10 lần</strong> điểm đổ xúc xắc.
              </div>
            </div>
          )}

          {/* Owner info */}
          <div className="pt-1">
            <div className="text-xs font-semibold uppercase text-slate-500 mb-1.5 flex items-center gap-1.5">
              <User size={14} /> Tình trạng sở hữu
            </div>
            {owner ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: owner.tokenColor }}></div>
                  <span className="font-bold text-slate-900">{owner.nickname}</span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Đã sở hữu
                </span>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center font-medium text-slate-500">
                Chưa có ai sở hữu ô đất này
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
