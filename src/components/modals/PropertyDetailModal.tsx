'use client';

import { BoardSpace, PropertySpace, TransportSpace, UtilitySpace, GameState } from '@/game/types';
import { X, Building2, User, DollarSign, MapPin, Compass } from 'lucide-react';

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
      default: return 'bg-slate-800 text-white';
    }
  };

  const pSpace = space as PropertySpace;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-300 w-full max-w-sm overflow-hidden flex flex-col text-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Header Color Band */}
        <div className={`p-4 text-center relative ${space.type === 'property' ? getColorBg(pSpace.colorGroup) : 'bg-slate-900 text-white'}`}>
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition active:scale-95 cursor-pointer"
          >
            <X size={18} />
          </button>
          
          <div className="text-[11px] font-black tracking-widest uppercase opacity-85">
            {space.type === 'property' ? 'BẰNG KHOÁN NHÀ ĐẤT' : space.type === 'transport' ? 'BẾN XE VẬN TẢI' : 'DỊCH VỤ CÔNG CỘNG'}
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-1">
            {pSpace.landmarkIcon && <span className="text-2xl drop-shadow">{pSpace.landmarkIcon}</span>}
            <h2 className="text-2xl font-black uppercase tracking-wide">{space.name}</h2>
          </div>
          
          {(space as any).price && (
            <div className="text-xs font-bold mt-1 opacity-90 font-mono">
              Giá niêm yết: ${(space as any).price}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3.5 text-sm overflow-y-auto max-h-[60vh]">
          
          {/* Landmark & Cultural Info snippet */}
          {pSpace.landmark && (
            <div className="bg-amber-50/80 border border-amber-200/80 p-2.5 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                <MapPin size={13} className="text-amber-600 shrink-0" />
                <span>{pSpace.landmark}</span>
              </div>
              {pSpace.description && (
                <p className="text-[11px] text-slate-600 leading-snug pl-4 italic">
                  "{pSpace.description}"
                </p>
              )}
            </div>
          )}

          {space.type === 'property' && (
            <>
              {/* Rent breakdown */}
              <div className="space-y-1.5 border-b border-slate-200 pb-3 text-xs">
                <div className="flex justify-between items-center font-bold text-slate-900 text-sm">
                  <span>Tiền thuê đất:</span>
                  <span className="font-mono text-base font-black">${pSpace.baseRent}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 1 Nhà 🏠:</span>
                  <span className="font-mono font-medium">${pSpace.houseRents[0]}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 2 Nhà 🏠🏠:</span>
                  <span className="font-mono font-medium">${pSpace.houseRents[1]}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 3 Nhà 🏠🏠🏠:</span>
                  <span className="font-mono font-medium">${pSpace.houseRents[2]}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 4 Nhà 🏠🏠🏠🏠:</span>
                  <span className="font-mono font-medium">${pSpace.houseRents[3]}</span>
                </div>
                <div className="flex justify-between items-center text-red-600 font-bold">
                  <span>Với Khách Sạn 🏨:</span>
                  <span className="font-mono text-sm font-black">${pSpace.hotelRent}</span>
                </div>
              </div>

              {/* Building costs */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px]">Chi phí xây nhà:</span>
                  <span className="font-bold text-slate-800 font-mono">${pSpace.houseCost} / nhà</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Giá thế chấp:</span>
                  <span className="font-bold text-slate-800 font-mono">${pSpace.price / 2}</span>
                </div>
              </div>
            </>
          )}

          {space.type === 'transport' && (
            <div className="space-y-2 py-1 border-b border-slate-200 pb-3 text-xs">
              <div className="text-center text-3xl">🚌</div>
              <div className="text-[11px] text-slate-600 text-center">
                Tiền thuê nhân đôi theo số bến xe sở hữu:
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between"><span>1 Bến xe:</span><span className="font-bold font-mono">$25</span></div>
                <div className="flex justify-between"><span>2 Bến xe:</span><span className="font-bold font-mono">$50</span></div>
                <div className="flex justify-between"><span>3 Bến xe:</span><span className="font-bold font-mono">$100</span></div>
                <div className="flex justify-between"><span>4 Bến xe:</span><span className="font-bold font-mono">$200</span></div>
              </div>
            </div>
          )}

          {space.type === 'utility' && (
            <div className="space-y-2 py-1 border-b border-slate-200 pb-3 text-center text-xs">
              <div className="text-3xl">{space.position === 12 ? '💡' : '🚰'}</div>
              <div className="text-[11px] text-slate-600">
                1 cơ sở: Tiền thuê gấp <strong>4 lần</strong> điểm xúc xắc.<br/>
                2 cơ sở: Tiền thuê gấp <strong>10 lần</strong> điểm xúc xắc.
              </div>
            </div>
          )}

          {/* Ownership info */}
          <div className="pt-0.5">
            <div className="text-[11px] font-bold uppercase text-slate-400 mb-1 flex items-center gap-1.5">
              <User size={12} /> Tình trạng sở hữu
            </div>
            {owner ? (
              <div className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: owner.tokenColor }}></div>
                  <span className="font-bold text-slate-900 text-xs">{owner.nickname}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Đã sở hữu
                </span>
              </div>
            ) : (
              <div className="p-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center font-medium text-slate-500 text-xs">
                Chưa có ai sở hữu ô đất này
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition text-sm cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
