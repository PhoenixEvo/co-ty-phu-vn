'use client';

import { useState } from 'react';
import { Share2, Settings, Copy, Check, Users, Wifi } from 'lucide-react';

interface GameHeaderProps {
  roomId: string;
  connectedCount: number;
  onOpenInvite: () => void;
  onOpenSettings: () => void;
}

export default function GameHeader({ roomId, connectedCount, onOpenInvite, onOpenSettings }: GameHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 text-white px-4 flex items-center justify-between shadow-md shrink-0 select-none">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl filter drop-shadow">🎲</span>
          <span className="font-black text-lg md:text-xl tracking-wider text-red-500 bg-clip-text">
            CỜ TỶ PHÚ
          </span>
        </div>
        <span className="hidden md:inline-block text-[11px] bg-red-950/80 text-red-300 font-bold px-2 py-0.5 rounded border border-red-800/50">
          VIỆT NAM
        </span>
      </div>

      {/* Center: Room Code Badge */}
      <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-inner">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider hidden sm:inline">Phòng:</span>
        <span className="font-mono font-black text-sm tracking-widest text-amber-400">{roomId}</span>
        <button
          onClick={handleCopyCode}
          className="ml-1 p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition active:scale-90"
          title="Sao chép mã phòng"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Connected indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">{connectedCount} người chơi</span>
        </div>

        {/* Invite Button */}
        <button
          onClick={onOpenInvite}
          className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl transition shadow-sm active:scale-95"
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
          <Settings size={16} />
        </button>
      </div>
    </header>
  );
}
