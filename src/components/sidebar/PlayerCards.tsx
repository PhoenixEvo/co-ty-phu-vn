'use client';

import { useState } from 'react';
import { Player, GameState, PropertySpace } from '@/game/types';
import { BOARD_SPACES } from '@/game/boardConfig';
import PlayerDetailModal from '../modals/PlayerDetailModal';
import { formatMoney, formatMoneyCompact } from '@/utils/format';
import { User, Home, Bus, ShieldAlert, Crown, ChevronRight, Handshake, Sparkles, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlayerCardsProps {
  state: GameState;
  playerId: string;
  onOpenTrade?: () => void;
}

const COLOR_GROUPS: PropertySpace['colorGroup'][] = [
  'red', 'pink', 'teal', 'light-green', 'orange', 'yellow', 'cyan', 'dark-blue'
];

const GROUP_COLORS: Record<PropertySpace['colorGroup'], string> = {
  'red': '#ef4444',
  'pink': '#f472b6',
  'teal': '#14b8a6',
  'light-green': '#10b981',
  'orange': '#f59e0b',
  'yellow': '#eab308',
  'cyan': '#06b6d4',
  'dark-blue': '#1e40af',
};

export default function PlayerCards({ state, playerId, onOpenTrade }: PlayerCardsProps) {
  const [inspectingPlayer, setInspectingPlayer] = useState<Player | null>(null);

  const getPlayerMonopolies = (pId: string) => {
    const monopolies: PropertySpace['colorGroup'][] = [];
    COLOR_GROUPS.forEach(group => {
      const groupSpaces = BOARD_SPACES.filter(s => s.type === 'property' && (s as PropertySpace).colorGroup === group);
      const owned = groupSpaces.filter(s => state.properties[s.id]?.ownerId === pId);
      if (owned.length === groupSpaces.length && groupSpaces.length > 0) {
        monopolies.push(group);
      }
    });
    return monopolies;
  };

  const getPlayerAssetsCount = (pId: string) => {
    const owned = BOARD_SPACES.filter(s => state.properties[s.id]?.ownerId === pId);
    const properties = owned.filter(s => s.type === 'property').length;
    const transports = owned.filter(s => s.type === 'transport').length;
    
    let houses = 0;
    let hotels = 0;
    owned.forEach(s => {
      const hCount = state.properties[s.id]?.houseCount || 0;
      if (hCount === 5) hotels += 1;
      else if (hCount >= 1 && hCount <= 4) houses += hCount;
    });

    const monopolies = getPlayerMonopolies(pId);

    return { properties, transports, houses, hotels, monopolies };
  };

  return (
    <>
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-xl space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            Người Chơi ({state.players.length}/5)
          </span>
          {onOpenTrade && state.status === 'playing' && (
            <button
              onClick={onOpenTrade}
              className="text-[11px] font-bold bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-400/40 flex items-center gap-1 transition cursor-pointer shadow-xs active:scale-95"
            >
              <Handshake size={13} />
              <span>Đổi Đất 🤝</span>
            </button>
          )}
        </div>

        <div className="space-y-2">
          {state.players.map((p, index) => {
            const isCurrentTurn = p.id === state.playerOrder[state.currentPlayerIndex];
            const isMe = p.id === playerId;
            const isHost = index === 0;
            const { properties, transports, houses, hotels, monopolies } = getPlayerAssetsCount(p.id);

            return (
              <motion.div
                key={p.id}
                onClick={() => setInspectingPlayer(p)}
                whileHover={{ scale: 1.01 }}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden select-none ${
                  isCurrentTurn 
                    ? 'bg-slate-800 border-amber-400 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/50' 
                    : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600'
                } ${p.isBankrupt ? 'opacity-40 grayscale' : ''}`}
              >
                {/* Active turn indicator banner */}
                {isCurrentTurn && (
                  <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                    ĐANG LƯỢT
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {/* Left: Avatar + Name info */}
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-xs shadow-md border-2 border-white/80 shrink-0"
                      style={{ backgroundColor: p.tokenColor }}
                    >
                      {p.nickname.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 leading-tight">
                        <span className="font-bold text-sm text-white truncate max-w-[100px]">
                          {p.nickname}
                        </span>
                        {isMe && (
                          <span className="text-[9px] bg-blue-500/30 text-blue-300 font-bold px-1.5 py-0.2 rounded border border-blue-400/30 shrink-0">
                            BẠN
                          </span>
                        )}
                        {isHost && (
                          <span title="Chủ phòng">
                            <Crown size={12} className="text-amber-400 shrink-0" />
                          </span>
                        )}
                      </div>

                      {/* Assets count row */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 flex-wrap">
                        <span className="flex items-center gap-0.5" title="Số ô đất sở hữu">
                          🏞️ {properties}
                        </span>
                        {houses > 0 && (
                          <span className="flex items-center gap-0.5 text-emerald-400 font-bold" title="Số lượng nhà">
                            🏠 {houses}
                          </span>
                        )}
                        {hotels > 0 && (
                          <span className="flex items-center gap-0.5 text-amber-400 font-bold" title="Số lượng khách sạn">
                            🏨 {hotels}
                          </span>
                        )}
                        <span className="flex items-center gap-0.5" title="Số bến xe sở hữu">
                          🚌 {transports}
                        </span>
                      </div>

                      {/* Monopoly Badges */}
                      {monopolies.length > 0 && (
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          <span className="text-[9px] font-black text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-500/50 flex items-center gap-0.5">
                            <Award size={10} className="text-amber-400" />
                            <span>Độc Quyền x{monopolies.length} (x2 Thuê)</span>
                          </span>
                          {monopolies.map(m => (
                            <span 
                              key={m} 
                              className="w-2.5 h-2.5 rounded-full border border-white/60 shadow-xs inline-block" 
                              style={{ backgroundColor: GROUP_COLORS[m] }}
                              title={`Độc quyền nhóm màu ${m}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Cash balance + badges */}
                  <div className="text-right flex flex-col items-end shrink-0 pl-1">
                    <span className="font-mono font-black text-sm md:text-base text-emerald-400">
                      {formatMoney(p.money)}
                    </span>

                    {p.inJail && (
                      <span className="text-[9px] font-bold bg-red-950 text-red-300 px-1.5 py-0.2 rounded border border-red-800 mt-0.5">
                        Ở tù ⛓️
                      </span>
                    )}

                    {p.isBankrupt && (
                      <span className="text-[9px] font-bold bg-slate-700 text-slate-300 px-1.5 py-0.2 rounded mt-0.5">
                        Phá sản 💀
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Inspecting Player Detail Modal */}
      <PlayerDetailModal
        player={inspectingPlayer}
        state={state}
        onClose={() => setInspectingPlayer(null)}
      />
    </>
  );
}
