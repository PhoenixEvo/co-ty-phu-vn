'use client';

import { useState } from 'react';
import { GameState, BoardSpace, PropertySpace, TransportSpace, UtilitySpace, TaxSpace } from '@/game/types';
import { BOARD_SPACES } from '@/game/boardConfig';
import VietnamCenterArtwork from './center/VietnamCenterArtwork';
import PropertyTile, { BoardEdge } from './tiles/PropertyTile';
import TransportTile from './tiles/TransportTile';
import UtilityTile from './tiles/UtilityTile';
import TaxTile from './tiles/TaxTile';
import EventTile from './tiles/EventTile';
import CornerTile from './tiles/CornerTile';
import PlayerToken from './PlayerToken';
import PropertyDetailModal from '../modals/PropertyDetailModal';

interface GameBoardProps {
  state: GameState;
  playerId: string;
  dispatch: any;
  visualPositions?: Record<string, number>;
  activeDestination?: number | null;
  steppingPlayerId?: string | null;
  isFocusMode?: boolean;
}

export default function GameBoard({ 
  state, 
  playerId, 
  dispatch,
  visualPositions = {},
  activeDestination = null,
  steppingPlayerId = null,
  isFocusMode = false
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
      {/* Responsive Landscape 4:3 Physical Board Container */}
      <div 
        className={`aspect-square md:aspect-[4/3] relative bg-[#f7f2e7] p-1.5 md:p-2.5 lg:p-3 rounded-2xl shadow-2xl border-4 border-amber-950/90 select-none flex items-center justify-center shrink-0 w-full max-h-[calc(100vh-4.25rem)] ${
          isFocusMode 
            ? 'max-w-[min(calc((100vh-4.25rem)*1.333),calc(100vw-2rem))] lg:max-w-[1200px]'
            : 'max-w-[min(calc((100vh-4.25rem)*1.333),calc(100vw-340px-1.5rem))] lg:max-w-[1080px]'
        }`}
        style={{
          boxShadow: '0 25px 60px -10px rgba(0,0,0,0.75), inset 0 2px 6px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.3)'
        }}
      >
        <div 
          className="w-full h-full border-2 border-slate-900 grid rounded-lg overflow-hidden bg-[#faf7f0]"
          style={{
            gridTemplateColumns: '11% repeat(9, 1fr) 11%',
            gridTemplateRows: '13.5% repeat(9, 1fr) 13.5%',
          }}
        >
          {/* ================= Center Area: Panoramic 4:3 Vietnamese Landscape Artwork ================= */}
          <div className="relative overflow-hidden" style={{ gridArea: '2 / 2 / 11 / 11' }}>
            <VietnamCenterArtwork lastCenterBanner={state.lastCenterBanner} />
          </div>

          {/* ================= 40 Board Spaces Around Landscape Perimeter ================= */}
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
