'use client';

import { useState } from 'react';
import { GameState, BoardSpace, PropertySpace, TransportSpace, UtilitySpace, TaxSpace } from '@/game/types';
import { BOARD_SPACES } from '@/game/boardConfig';
import PropertyTile, { BoardEdge } from './tiles/PropertyTile';
import TransportTile from './tiles/TransportTile';
import UtilityTile from './tiles/UtilityTile';
import TaxTile from './tiles/TaxTile';
import EventTile from './tiles/EventTile';
import CornerTile from './tiles/CornerTile';
import PlayerToken from './PlayerToken';
import PropertyDetailModal from '../modals/PropertyDetailModal';
import { motion, AnimatePresence } from 'framer-motion';

interface GameBoardProps {
  state: GameState;
  playerId: string;
  dispatch: any;
  visualPositions?: Record<string, number>;
  activeDestination?: number | null;
  steppingPlayerId?: string | null;
}

export default function GameBoard({ 
  state, 
  playerId, 
  dispatch,
  visualPositions = {},
  activeDestination = null,
  steppingPlayerId = null
}: GameBoardProps) {
  const [selectedSpace, setSelectedSpace] = useState<BoardSpace | null>(null);

  const getGridArea = (pos: number) => {
    if (pos === 0) return '11 / 1 / 12 / 2';
    if (pos >= 1 && pos <= 9) return `${11 - pos} / 1 / ${12 - pos} / 2`;
    if (pos === 10) return '1 / 1 / 2 / 2';
    if (pos >= 11 && pos <= 19) return `1 / ${pos - 10 + 1} / 2 / ${pos - 10 + 2}`;
    if (pos === 20) return '1 / 11 / 2 / 12';
    if (pos >= 21 && pos <= 29) return `${pos - 20 + 1} / 11 / ${pos - 20 + 2} / 12`;
    if (pos === 30) return '11 / 11 / 12 / 12';
    if (pos >= 31 && pos <= 39) return `11 / ${11 - (pos - 30)} / 12 / ${12 - (pos - 30)}`;
    return '1 / 1 / 2 / 2';
  };

  const getBoardEdge = (pos: number): BoardEdge | 'corner' => {
    if ([0, 10, 20, 30].includes(pos)) return 'corner';
    if (pos > 0 && pos < 10) return 'left';
    if (pos > 10 && pos < 20) return 'top';
    if (pos > 20 && pos < 30) return 'right';
    return 'bottom';
  };

  return (
    <>
      {/* Physical Board Container with Subtle 2.5D Frame */}
      <div 
        className="w-full max-w-4xl aspect-square relative bg-[#f7f2e7] p-2 md:p-3 rounded-2xl shadow-2xl border-4 border-amber-950/90 select-none flex items-center justify-center"
        style={{
          boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.3)'
        }}
      >
        <div 
          className="w-full h-full border-2 border-slate-900 grid rounded-lg overflow-hidden bg-[#faf7f0]"
          style={{
            gridTemplateColumns: '13.5% repeat(9, 1fr) 13.5%',
            gridTemplateRows: '13.5% repeat(9, 1fr) 13.5%',
          }}
        >
          {/* ================= Center Area ================= */}
          <div 
            className="bg-[#edf6ee] flex flex-col items-center justify-center relative overflow-hidden p-4 border border-slate-300 shadow-inner" 
            style={{ gridArea: '2 / 2 / 11 / 11' }}
          >
            {/* Subtle vintage watermark pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Center Decorative Emblem */}
            <div className="text-center rotate-[-45deg] z-10 select-none">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="h-0.5 w-12 bg-red-600/40 rounded" />
                <span className="text-xs font-black tracking-widest text-red-700/80 uppercase">TRÒ CHƠI DÂN GIAN</span>
                <span className="h-0.5 w-12 bg-red-600/40 rounded" />
              </div>

              <h1 
                className="text-5xl md:text-7xl lg:text-8xl font-black text-red-600 tracking-tight whitespace-nowrap drop-shadow-md"
                style={{
                  textShadow: '0 4px 12px rgba(220, 38, 38, 0.25), 0 2px 0 #991b1b'
                }}
              >
                CỜ TỶ PHÚ
              </h1>
              
              <div className="inline-block bg-amber-400 text-slate-900 font-extrabold text-xs md:text-sm px-3 py-1 rounded-full uppercase tracking-wider shadow-sm mt-1 border border-amber-500">
                Phiên Bản Việt Nam 🇻🇳
              </div>
            </div>

            {/* Central Live Notification Banner */}
            <AnimatePresence>
              {state.lastCenterBanner && (
                <motion.div 
                  key={state.lastCenterBanner.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute bottom-6 md:bottom-10 z-20 max-w-[85%] bg-slate-900/90 backdrop-blur-md text-white text-xs md:text-sm font-bold px-4 py-2 rounded-xl shadow-xl border border-slate-700/80 flex items-center gap-2 text-center"
                >
                  <span>{state.lastCenterBanner.text}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ================= 40 Board Spaces ================= */}
          {BOARD_SPACES.map(space => {
            const playersOnSpace = state.players.filter(p => {
              if (p.isBankrupt) return false;
              const pos = visualPositions[p.id] !== undefined ? visualPositions[p.id] : p.position;
              return pos === space.position;
            });

            const ownership = state.properties[space.id];
            const owner = ownership ? state.players.find(p => p.id === ownership.ownerId) : null;
            
            const edge = getBoardEdge(space.position);
            const isCorner = edge === 'corner';
            const isDestination = activeDestination === space.position;

            return (
              <div 
                key={space.id}
                onClick={() => {
                  if (space.type === 'property' || space.type === 'transport' || space.type === 'utility') {
                    setSelectedSpace(space);
                  }
                }}
                className={`border border-slate-300/80 relative overflow-hidden transition-all cursor-pointer group flex ${
                  isDestination ? 'ring-3 ring-amber-400 ring-inset bg-amber-100/80 z-20 shadow-md' :
                  isCorner ? 'bg-[#f0ebe1]' : 'bg-white hover:bg-amber-50/70'
                }`}
                style={{ gridArea: getGridArea(space.position) }}
                title={`Xem chi tiết: ${space.name}`}
              >
                {/* Specific Semantic Tile Components */}
                {isCorner ? (
                  <CornerTile space={space} />
                ) : space.type === 'property' ? (
                  <PropertyTile 
                    space={space as PropertySpace} 
                    edge={edge as BoardEdge} 
                    owner={owner} 
                  />
                ) : space.type === 'transport' ? (
                  <TransportTile 
                    space={space as TransportSpace} 
                    edge={edge as BoardEdge} 
                    owner={owner} 
                  />
                ) : space.type === 'utility' ? (
                  <UtilityTile 
                    space={space as UtilitySpace} 
                    edge={edge as BoardEdge} 
                    owner={owner} 
                  />
                ) : space.type === 'tax' ? (
                  <TaxTile 
                    space={space as TaxSpace} 
                    edge={edge as BoardEdge} 
                  />
                ) : (
                  <EventTile 
                    space={space} 
                    edge={edge as BoardEdge} 
                  />
                )}

                {/* Multi-Player 3D Pawn Tokens Overlay (High z-index, no text collision) */}
                <div className="absolute inset-0 p-1 z-40 pointer-events-none flex items-center justify-center">
                  <div className={`w-full h-full flex items-center justify-center ${
                    playersOnSpace.length === 1 ? '' :
                    playersOnSpace.length === 2 ? 'gap-1' :
                    'grid grid-cols-2 gap-0.5 items-center justify-items-center'
                  }`}>
                    {playersOnSpace.map(p => (
                      <PlayerToken 
                        key={p.id} 
                        color={p.tokenColor} 
                        name={p.nickname}
                        isCurrent={p.id === state.playerOrder[state.currentPlayerIndex]}
                        isMe={p.id === playerId}
                        isStepping={p.id === steppingPlayerId}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Property Inspection Modal */}
      <PropertyDetailModal 
        space={selectedSpace} 
        state={state} 
        onClose={() => setSelectedSpace(null)} 
      />
    </>
  );
}
