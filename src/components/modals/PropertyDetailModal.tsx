'use client';

import { BoardSpace, PropertySpace, TransportSpace, UtilitySpace, GameState } from '@/game/types';
import { getLocationArtwork } from '@/game/locationArtworks';
import { formatMoney } from '@/utils/format';
import { X, Building2, User, DollarSign, MapPin, Sparkles } from 'lucide-react';

interface PropertyDetailModalProps {
  space: BoardSpace | null;
  state: GameState;
  onClose: () => void;
}

export default function PropertyDetailModal({ space, state, onClose }: PropertyDetailModalProps) {
  if (!space) return null;

  const ownership = state.properties[space.id];
  const owner = ownership ? state.players.find(p => p.id === ownership.ownerId) : null;
  const artwork = getLocationArtwork(space.id);

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
      default: return 'bg-slate-900 text-white';
    }
  };

  const pSpace = space as PropertySpace;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-300 w-full max-w-sm overflow-hidden flex flex-col text-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Top Hero Artwork Banner */}
        {artwork?.renderHero && (
          <div className="w-full relative border-b border-slate-200">
            {artwork.renderHero('w-full h-36')}
            <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1">
              <span>{artwork.regionLabel}</span>
            </div>
            <button 
              onClick={onClose}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition active:scale-95 cursor-pointer shadow-md"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Header Color Band */}
        <div className={`p-3.5 text-center relative ${space.type === 'property' ? getColorBg(pSpace.colorGroup) : 'bg-slate-900 text-white'}`}>
          {!artwork?.renderHero && (
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition active:scale-95 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
          
          <div className="text-[10px] font-black tracking-widest uppercase opacity-85">
            {space.type === 'property' ? 'BẰNG KHOÁN NHÀ ĐẤT' : space.type === 'transport' ? 'BẾN XE VẬN TẢI' : 'DỊCH VỤ CÔNG CỘNG'}
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-0.5">
            {artwork?.renderThumbnail ? (
              <div className="w-6 h-6 bg-white/20 p-0.5 rounded-full">
                {artwork.renderThumbnail('w-full h-full')}
              </div>
            ) : null}
            <h2 className="text-xl font-black uppercase tracking-wide">{space.name}</h2>
          </div>
          
          {(space as any).price && (
            <div className="text-xs font-bold mt-0.5 opacity-90 font-mono">
              Giá niêm yết: {formatMoney((space as any).price)}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3 text-sm overflow-y-auto max-h-[50vh]">
          
          {/* Subtitle & Cultural Quote */}
          {artwork?.subtitle && (
            <div className="bg-amber-50/80 border border-amber-200/80 p-2.5 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                <Sparkles size={13} className="text-amber-600 shrink-0" />
                <span>{artwork.subtitle}</span>
              </div>
              {artwork.culturalSnippet && (
                <p className="text-[11px] text-slate-600 leading-snug pl-4 italic">
                  "{artwork.culturalSnippet}"
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
                  <span className="font-mono text-sm font-black">{formatMoney(pSpace.baseRent)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 1 Nhà 🏠:</span>
                  <span className="font-mono font-medium">{formatMoney(pSpace.houseRents[0])}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 2 Nhà 🏠🏠:</span>
                  <span className="font-mono font-medium">{formatMoney(pSpace.houseRents[1])}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 3 Nhà 🏠🏠🏠:</span>
                  <span className="font-mono font-medium">{formatMoney(pSpace.houseRents[2])}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Với 4 Nhà 🏠🏠🏠🏠:</span>
                  <span className="font-mono font-medium">{formatMoney(pSpace.houseRents[3])}</span>
                </div>
                <div className="flex justify-between items-center text-red-600 font-bold">
                  <span>Với Khách Sạn 🏨:</span>
                  <span className="font-mono text-sm font-black">{formatMoney(pSpace.hotelRent)}</span>
                </div>
              </div>

              {/* Building costs */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px]">Chi phí xây nhà:</span>
                  <span className="font-bold text-slate-800 font-mono">{formatMoney(pSpace.houseCost)} / nhà</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Giá thế chấp:</span>
                  <span className="font-bold text-slate-800 font-mono">{formatMoney(pSpace.price / 2)}</span>
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
                <div className="flex justify-between"><span>1 Bến xe:</span><span className="font-bold font-mono">250.000 ₫</span></div>
                <div className="flex justify-between"><span>2 Bến xe:</span><span className="font-bold font-mono">500.000 ₫</span></div>
                <div className="flex justify-between"><span>3 Bến xe:</span><span className="font-bold font-mono">1.000.000 ₫</span></div>
                <div className="flex justify-between"><span>4 Bến xe:</span><span className="font-bold font-mono">2.000.000 ₫</span></div>
              </div>
            </div>
          )}

          {space.type === 'utility' && (
            <div className="space-y-2 py-1 border-b border-slate-200 pb-3 text-center text-xs">
              <div className="text-3xl">{space.position === 12 ? '💡' : '🚰'}</div>
              <div className="text-[11px] text-slate-600">
                1 cơ sở: Tiền thuê gấp <strong>40.000 ₫</strong> x điểm xúc xắc.<br/>
                2 cơ sở: Tiền thuê gấp <strong>100.000 ₫</strong> x điểm xúc xắc.
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
                  {ownership?.houseCount === 5 ? '🏨 Khách sạn' : ownership?.houseCount ? `🏠 ${ownership.houseCount} Nhà` : 'Đã sở hữu'}
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
