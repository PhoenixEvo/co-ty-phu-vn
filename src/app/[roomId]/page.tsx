'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import GameHeader from '@/components/header/GameHeader';
import GameBoard from '@/components/board/GameBoard';
import CurrentTurnPanel from '@/components/sidebar/CurrentTurnPanel';
import ContextActionPanel from '@/components/sidebar/ContextActionPanel';
import PlayerCards from '@/components/sidebar/PlayerCards';
import ActivityFeed from '@/components/sidebar/ActivityFeed';
import CardDrawModal from '@/components/modals/CardDrawModal';
import GameOverModal from '@/components/modals/GameOverModal';
import InviteModal from '@/components/modals/InviteModal';
import SettingsModal from '@/components/modals/SettingsModal';
import RulesModal from '@/components/modals/RulesModal';
import { usePlayerMovement } from '@/hooks/usePlayerMovement';
import { Users, Crown, Sparkles, Copy, Check, Play, ShieldAlert } from 'lucide-react';
import { sounds } from '@/utils/sound';

const TOKENS = [
  { id: '#ef4444', name: 'Đỏ', hex: '#ef4444', label: '🔴 Đỏ' },
  { id: '#3b82f6', name: 'Xanh dương', hex: '#3b82f6', label: '🔵 Xanh dương' },
  { id: '#10b981', name: 'Xanh lá', hex: '#10b981', label: '🟢 Xanh lá' },
  { id: '#f59e0b', name: 'Vàng cam', hex: '#f59e0b', label: '🟡 Vàng' },
];

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  
  const { gameState, playerId, connect, disconnect, dispatch } = useGameStore();
  const { visualPositions, isMoving, activeDestination, steppingPlayerId } = usePlayerMovement(gameState);
  
  const [nickname, setNickname] = useState('');
  const [tokenColor, setTokenColor] = useState('#ef4444');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [copiedLobby, setCopiedLobby] = useState(false);

  useEffect(() => {
    connect(roomId);
    return () => disconnect();
  }, [roomId, connect, disconnect]);

  if (!gameState) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
        <div className="text-4xl animate-bounce mb-3">🎲</div>
        <div className="animate-pulse text-lg text-slate-300 font-bold">
          Đang kết nối đến phòng <span className="font-mono text-amber-400">{roomId}</span>...
        </div>
      </div>
    );
  }

  const me = gameState.players.find(p => p.id === playerId);
  const isHost = gameState.players.length > 0 && gameState.players[0].id === playerId;
  const isMyTurn = gameState.playerOrder[gameState.currentPlayerIndex] === playerId;

  const handleCopyLobbyCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopiedLobby(true);
    setTimeout(() => setCopiedLobby(false), 2000);
  };

  const handleLeaveRoom = () => {
    dispatch({ type: 'LEAVE_GAME' });
    router.push('/');
  };

  // ================= 1. WAITING LOBBY =================
  if (gameState.status === 'waiting') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 selection:bg-amber-500 selection:text-black">
        <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Panel: Room Info */}
          <div className="bg-linear-to-b from-slate-800 to-slate-900 p-8 md:w-5/12 border-b md:border-b-0 md:border-r border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-red-500 font-black text-xl tracking-wider mb-6">
                <span className="text-2xl">🎲</span> CỜ TỶ PHÚ
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-700/60 mb-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Mã Phòng Của Bạn
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-mono font-black text-amber-400 tracking-widest">
                    {roomId}
                  </span>
                  <button
                    onClick={handleCopyLobbyCode}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition active:scale-95"
                    title="Sao chép mã"
                  >
                    {copiedLobby ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Connected Players List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Users size={14} /> Người chơi đã vào ({gameState.players.length}/4)
                </span>
                {gameState.players.length === 0 && (
                  <p className="text-xs text-slate-500 italic">Chưa có ai vào phòng</p>
                )}
                {gameState.players.map((p, index) => (
                  <div 
                    key={p.id} 
                    className="flex items-center justify-between bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-xs" 
                        style={{ backgroundColor: p.tokenColor }} 
                      />
                      <span className="font-bold text-sm text-slate-200">
                        {p.nickname} {p.id === playerId && <span className="text-xs text-blue-400 font-normal">(Bạn)</span>}
                      </span>
                    </div>
                    {index === 0 && (
                      <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1">
                        <Crown size={10} /> Chủ phòng
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 mt-6 pt-4 border-t border-slate-800">
              💡 Gửi mã hoặc liên kết phòng này cho bạn bè để cùng chơi.
            </div>
          </div>
          
          {/* Right Panel: Join / Ready Form */}
          <div className="p-8 md:w-7/12 flex flex-col justify-center">
            {!me ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (nickname.trim()) {
                    sounds.playMoneyGain();
                    dispatch({ type: 'JOIN_GAME', payload: { nickname: nickname.trim(), tokenColor } });
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-black text-white">Tham Gia Bàn Cờ</h2>
                  <p className="text-xs text-slate-400 mt-1">Chọn biệt danh và quân cờ đại diện của bạn</p>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Tên hiển thị
                  </label>
                  <input 
                    type="text" 
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Nhập tên của bạn (VD: Minh, Phát, An...)"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-white text-base placeholder:text-slate-500 font-medium"
                    maxLength={15}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Chọn màu quân cờ
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {TOKENS.map(t => {
                      const isTaken = gameState.players.some(p => p.tokenColor === t.hex);
                      const isSelected = tokenColor === t.hex;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          disabled={isTaken}
                          onClick={() => setTokenColor(t.hex)}
                          className={`h-12 rounded-xl border-2 transition-all flex items-center justify-center relative cursor-pointer ${
                            isTaken 
                              ? 'opacity-20 cursor-not-allowed border-transparent' 
                              : isSelected 
                                ? 'border-amber-400 shadow-md shadow-amber-500/20 scale-105' 
                                : 'border-slate-700 hover:border-slate-500'
                          }`}
                          style={{ backgroundColor: t.hex }}
                        >
                          {isSelected && <Check size={20} className="text-white drop-shadow-md" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!nickname.trim()}
                  className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-4 rounded-xl transition-all disabled:opacity-40 text-base shadow-lg shadow-amber-500/20 active:scale-98 cursor-pointer"
                >
                  VÀO BÀN CHƠI
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div 
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl text-white font-black shadow-xl border-4 border-white/80"
                  style={{ backgroundColor: me.tokenColor }}
                >
                  {me.nickname.charAt(0).toUpperCase()}
                </div>
                
                <div>
                  <h2 className="text-2xl font-black text-white">Bạn Đã Sẵn Sàng!</h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {isHost ? 'Bạn là chủ phòng. Nhấn bắt đầu khi mọi người đã vào đủ.' : 'Đang chờ chủ phòng bắt đầu trận đấu...'}
                  </p>
                </div>
                
                {isHost && (
                  <div className="space-y-2 pt-2">
                    <button 
                      onClick={() => {
                        sounds.playBuyProperty();
                        dispatch({ type: 'START_GAME' });
                      }}
                      disabled={gameState.players.length < 2}
                      className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black py-4 rounded-xl transition-all disabled:opacity-40 text-lg shadow-xl shadow-emerald-500/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play size={20} className="fill-current" />
                      <span>BẮT ĐẦU TRÒ CHƠI</span>
                    </button>
                    {gameState.players.length < 2 && (
                      <p className="text-xs text-amber-400/90 font-medium">
                        Cần ít nhất 2 người chơi để bắt đầu bàn cờ.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ================= 2. ACTIVE GAMEPLAY LAYOUT =================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col h-screen overflow-hidden select-none">
      
      {/* 1. Header */}
      <GameHeader 
        roomId={roomId} 
        connectedCount={gameState.players.filter(p => p.connected).length}
        onOpenInvite={() => setIsInviteOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* 2. Main Game Viewport */}
      <div className="flex-1 flex flex-col md:flex-row gap-3 p-2 md:p-3 overflow-hidden bg-[#0c2419]">
        
        {/* Left: Dominant Game Board Container (Felt Tabletop Look) */}
        <main className="flex-1 flex items-center justify-center overflow-auto p-1 relative rounded-2xl bg-[radial-gradient(#1a4d36_1px,transparent_1px)] [background-size:24px_24px] shadow-inner">
          <GameBoard 
            state={gameState} 
            playerId={playerId} 
            dispatch={dispatch} 
            visualPositions={visualPositions}
            activeDestination={activeDestination}
            steppingPlayerId={steppingPlayerId}
          />
        </main>
        
        {/* Right: Information-Dense Sidebar */}
        <aside className="w-full md:w-84 lg:w-96 flex flex-col gap-2.5 shrink-0 overflow-y-auto pr-0.5">
          {/* Current Turn Panel (Dice + Roll Button) */}
          <CurrentTurnPanel 
            state={gameState} 
            playerId={playerId} 
            dispatch={dispatch} 
            isMoving={isMoving}
          />

          {/* Context Action Panel (Buy Property / Pay Tax / Draw Card) */}
          <ContextActionPanel 
            state={gameState} 
            playerId={playerId} 
            dispatch={dispatch} 
            isMoving={isMoving}
          />

          {/* Players List */}
          <PlayerCards state={gameState} playerId={playerId} />

          {/* Activity Feed */}
          <ActivityFeed events={gameState.events} state={gameState} />
        </aside>
      </div>

      {/* Modals */}
      {/* 1. Chance & Fortune Card Draw Modal (Only display after movement finishes) */}
      {!isMoving && gameState.lastDrawnCard && (
        <CardDrawModal 
          card={gameState.lastDrawnCard} 
          isMyTurn={isMyTurn}
          onDismiss={() => dispatch({ type: 'DISMISS_CARD' })}
        />
      )}

      {/* 2. Game Over Modal */}
      <GameOverModal state={gameState} />

      {/* 3. Invite Friends Modal */}
      {isInviteOpen && (
        <InviteModal roomId={roomId} onClose={() => setIsInviteOpen(false)} />
      )}

      {/* 4. Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal 
          onClose={() => setIsSettingsOpen(false)}
          onLeave={handleLeaveRoom}
          onOpenRules={() => setIsRulesOpen(true)}
        />
      )}

      {/* 5. Rules Guide Modal */}
      {isRulesOpen && (
        <RulesModal onClose={() => setIsRulesOpen(false)} />
      )}
    </div>
  );
}
