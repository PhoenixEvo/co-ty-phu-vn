'use client';

import { useState } from 'react';
import { Share2, Settings, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';

interface GameHeaderProps {
  roomId: string;
  connectedCount: number;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
  onOpenInvite: () => void;
  onOpenSettings: () => void;
}

export default function GameHeader({ 
  roomId, 
  connectedCount, 
  isFocusMode = false,
  onToggleFocusMode,
  onOpenInvite, 
  onOpenSettings 
}: GameHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-12 md:h-13 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-3 md:px-4 flex items-center justify-between shadow-md shrink-0 select-none z-30">
      {/* Left: Brand */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="text-xl md:text-2xl filter drop-shadow">🎲</span>
          <span className="font-black text-base md:text-lg tracking-wider text-red-500 bg-clip-text">
            CỜ TỶ PHÚ
          </span>
        </div>
        <span className="hidden md:inline-block text-[10px] bg-red-950/80 text-red-300 font-bold px-2 py-0.5 rounded border border-red-800/50">
          VIỆT NAM
        </span>
      </div>

      {/* Center: Room Code Badge */}
      <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 rounded-xl px-2.5 py-1 shadow-inner">
        <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider hidden sm:inline">Phòng:</span>
        <span className="font-mono font-black text-xs md:text-sm tracking-widest text-amber-400">{roomId}</span>
        <button
          onClick={handleCopyCode}
          className="ml-0.5 p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition active:scale-90"
          title="Sao chép mã phòng"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Connected indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">{connectedCount} người chơi</span>
        </div>

        {/* Focus Mode Toggle */}
        {onToggleFocusMode && (
          <button
            onClick={onToggleFocusMode}
            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-xl border transition active:scale-95 ${
              isFocusMode 
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
            }`}
            title={isFocusMode ? "Thoát chế độ tập trung" : "Chế độ mở rộng bàn cờ"}
          >
            {isFocusMode ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span className="hidden md:inline">{isFocusMode ? "Thu nhỏ" : "Mở rộng"}</span>
          </button>
        )}

        {/* Invite Button */}
        <button
          onClick={onOpenInvite}
          className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-2.5 md:px-3 py-1.5 rounded-xl transition shadow-sm active:scale-95"
        >
          <Share2 size={14} />
          <span className="hidden sm:inline">Mời bạn</span>
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition active:scale-95"
          title="Cài đặt"
        >
          <Settings size={15} />
        </button>
      </div>
    </header>
  );
}
