'use client';

import { useState } from 'react';
import { Player, GameState } from '@/game/types';
import { BOARD_SPACES } from '@/game/boardConfig';
import PlayerDetailModal from '../modals/PlayerDetailModal';
import { User, Home, Bus, ShieldAlert, Crown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlayerCardsProps {
  state: GameState;
  playerId: string;
}

export default function PlayerCards({ state, playerId }: PlayerCardsProps) {
  const [inspectingPlayer, setInspectingPlayer] = useState<Player | null>(null);

  const getPlayerAssetsCount = (pId: string) => {
    const owned = BOARD_SPACES.filter(s => state.properties[s.id]?.ownerId === pId);
    const properties = owned.filter(s => s.type === 'property').length;
    const transports = owned.filter(s => s.type === 'transport').length;
    return { properties, transports };
  };

  return (
    <>
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-xl space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            Danh Sách Người Chơi ({state.players.length})
          </span>
        </div>

        <div className="space-y-2">
          {state.players.map((p, index) => {
            const isCurrentTurn = p.id === state.playerOrder[state.currentPlayerIndex];
            const isMe = p.id === playerId;
            const isHost = index === 0;
            const { properties, transports } = getPlayerAssetsCount(p.id);

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
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-xs shadow-md border-2 border-white/80"
                      style={{ backgroundColor: p.tokenColor }}
                    >
                      {p.nickname.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 leading-tight">
                        <span className="font-bold text-sm text-white truncate max-w-[110px]">
                          {p.nickname}
                        </span>
                        {isMe && (
                          <span className="text-[10px] bg-blue-500/30 text-blue-300 font-bold px-1.5 py-0.2 rounded border border-blue-400/30">
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
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="flex items-center gap-0.5" title="Số lượng đất sở hữu">
                          🏠 {properties}
                        </span>
                        <span className="flex items-center gap-0.5" title="Số lượng bến xe sở hữu">
                          🚌 {transports}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Cash balance + badges */}
                  <div className="text-right flex flex-col items-end">
                    <span className="font-mono font-black text-base text-emerald-400">
                      ${p.money}
                    </span>

                    {p.inJail && (
                      <span className="text-[9px] font-bold bg-red-950 text-red-300 px-1.5 py-0.2 rounded border border-red-800">
                        Ở tù ⛓️
                      </span>
                    )}

                    {p.isBankrupt && (
                      <span className="text-[9px] font-bold bg-slate-700 text-slate-300 px-1.5 py-0.2 rounded">
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
