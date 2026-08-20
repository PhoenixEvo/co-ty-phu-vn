'use client';

import { Player, GameState, PropertySpace, TransportSpace } from '@/game/types';
import { BOARD_SPACES } from '@/game/boardConfig';
import { formatMoney } from '@/utils/format';
import { X, Building, Bus, DollarSign, Wallet, ShieldAlert } from 'lucide-react';

interface PlayerDetailModalProps {
  player: Player | null;
  state: GameState;
  onClose: () => void;
}

export default function PlayerDetailModal({ player, state, onClose }: PlayerDetailModalProps) {
  if (!player) return null;

  // Calculate owned assets
  const ownedSpaces = BOARD_SPACES.filter(s => state.properties[s.id]?.ownerId === player.id);
  const properties = ownedSpaces.filter(s => s.type === 'property') as PropertySpace[];
  const transports = ownedSpaces.filter(s => s.type === 'transport') as TransportSpace[];
  const utilities = ownedSpaces.filter(s => s.type === 'utility');

  // Total net worth = cash + total property purchase price + total house investments
  const propertyWorth = properties.reduce((sum, p) => {
    const hCount = state.properties[p.id]?.houseCount || 0;
    const houseInvestment = hCount * p.houseCost;
    return sum + p.price + houseInvestment;
  }, 0);

  const transportWorth = transports.reduce((sum, t) => sum + t.price, 0);
  const utilityWorth = utilities.reduce((sum, u) => sum + (u as any).price, 0);
  const totalNetWorth = player.money + propertyWorth + transportWorth + utilityWorth;

  const getColorBg = (color?: string) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'pink': return 'bg-pink-400';
      case 'teal': return 'bg-teal-500';
      case 'light-green': return 'bg-emerald-500';
      case 'orange': return 'bg-amber-500';
      case 'yellow': return 'bg-yellow-400';
      case 'cyan': return 'bg-sky-500';
      case 'dark-blue': return 'bg-blue-700';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-md overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-white"
              style={{ backgroundColor: player.tokenColor }}
            >
              {player.nickname.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-xl text-slate-900">{player.nickname}</h3>
                {player.inJail && (
                  <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-200">
                    Đang ở tù ⛓️
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">Hồ sơ & Tài sản người chơi</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Financial Summary */}
        <div className="p-5 grid grid-cols-2 gap-3 bg-slate-100/70 border-b border-slate-200">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 mb-1">
              <Wallet size={14} className="text-emerald-600" /> Tiền mặt
            </div>
            <div className="text-xl font-black font-mono text-emerald-600">
              {formatMoney(player.money)}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 mb-1">
              <DollarSign size={14} className="text-blue-600" /> Tổng tài sản
            </div>
            <div className="text-xl font-black font-mono text-blue-700">
              {formatMoney(totalNetWorth)}
            </div>
          </div>
        </div>

        {/* Owned Assets List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div>
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2 flex items-center justify-between">
              <span>Bất động sản ({properties.length})</span>
            </div>
            {properties.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200 text-center">Chưa sở hữu bất động sản nào</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {properties.map(p => {
                  const hCount = state.properties[p.id]?.houseCount || 0;
                  return (
                    <div key={p.id} className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className={`w-3 h-3 rounded-full shrink-0 ${getColorBg(p.colorGroup)}`} />
                        <span className="truncate">{p.name}</span>
                      </div>
                      <span className="text-[10px] font-bold shrink-0 text-amber-700">
                        {hCount === 5 ? '🏨' : hCount > 0 ? `🏠x${hCount}` : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2 flex items-center justify-between">
              <span>Bến xe & Tiện ích ({transports.length + utilities.length})</span>
            </div>
            {transports.length + utilities.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200 text-center">Chưa sở hữu bến xe hay nhà máy nào</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {transports.map(t => (
                  <div key={t.id} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold">
                    <span>🚌</span>
                    <span className="truncate">{t.name}</span>
                  </div>
                ))}
                {utilities.map(u => (
                  <div key={u.id} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold">
                    <span>{u.position === 12 ? '💡' : '🚰'}</span>
                    <span className="truncate">{u.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
