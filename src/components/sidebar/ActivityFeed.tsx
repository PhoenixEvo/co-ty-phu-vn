'use client';

import { useEffect, useRef } from 'react';
import { GameEvent, GameState } from '@/game/types';
import { History } from 'lucide-react';

interface ActivityFeedProps {
  events: GameEvent[];
  state: GameState;
}

export default function ActivityFeed({ events, state }: ActivityFeedProps) {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [events]);

  const getEventIcon = (ev: GameEvent) => {
    if (ev.type === 'roll') return '🎲';
    if (ev.type === 'buy') return '🏠';
    if (ev.type === 'rent') return '💸';
    if (ev.type === 'tax') return '🧾';
    if (ev.type === 'card') return '🃏';
    if (ev.type === 'jail') return '🚓';
    if (ev.type === 'pass_go') return '💰';
    if (ev.type === 'bankrupt') return '💀';
    return '📢';
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-xl flex flex-col h-44 md:h-52">
      <div className="flex items-center gap-1.5 px-1 pb-2 border-b border-slate-800 shrink-0">
        <History size={14} className="text-amber-400" />
        <span className="text-xs font-black uppercase tracking-wider text-slate-400">
          Hoạt Động Trò Chơi
        </span>
      </div>

      <div 
        ref={feedRef} 
        className="flex-1 overflow-y-auto space-y-1.5 pt-2 pr-1 text-xs scrollbar-thin scrollbar-thumb-slate-700 font-sans"
      >
        {events.length === 0 ? (
          <div className="text-slate-500 italic text-center py-4 text-xs">
            Chưa có hoạt động nào
          </div>
        ) : (
          events.map((ev) => {
            const player = ev.playerId ? state.players.find(p => p.id === ev.playerId) : null;
            return (
              <div 
                key={ev.id} 
                className="flex items-start gap-2 py-1 px-2 rounded-lg bg-slate-800/40 border border-slate-800/60 text-slate-300 leading-snug"
              >
                <span className="shrink-0 text-sm leading-none mt-0.5">
                  {getEventIcon(ev)}
                </span>
                
                <div className="flex-1">
                  <span className="text-[10px] text-slate-400 font-mono mr-1.5">
                    [{new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
                  </span>
                  
                  {player && (
                    <span 
                      className="font-bold mr-1"
                      style={{ color: player.tokenColor }}
                    >
                      {player.nickname}:
                    </span>
                  )}
                  
                  <span>{ev.message}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
