'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, LogIn, Sparkles, Users, Trophy, Shield } from 'lucide-react';
import { sounds } from '@/utils/sound';

export default function Home() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');

  const createRoom = () => {
    sounds.playBuyProperty();
    const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/${newRoomCode}`);
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.trim()) {
      sounds.playMoneyGain();
      router.push(`/${roomCode.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 selection:bg-amber-500 selection:text-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a2b_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <main className="max-w-md w-full relative z-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-linear-to-b from-red-600 to-red-700 p-8 text-center relative">
            <div className="w-16 h-16 mx-auto mb-3 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-white/20">
              🎲
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
              CỜ TỶ PHÚ
            </h1>
            
            <div className="inline-block bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm mt-2">
              Phiên Bản Việt Nam 🇻🇳
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Create Room CTA */}
            <button 
              onClick={createRoom}
              className="w-full bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black py-4 px-6 rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-98 flex items-center justify-center gap-2.5 text-base cursor-pointer"
            >
              <PlusCircle size={20} />
              <span>TẠO PHÒNG CHƠI MỚI</span>
            </button>
            
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink-0 mx-4 text-slate-500 font-bold text-xs uppercase tracking-wider">
                HOẶC VÀO PHÒNG BẠN BÈ
              </span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Join Room Form */}
            <form onSubmit={joinRoom} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Mã phòng
                </label>
                <input 
                  type="text" 
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="Nhập mã (Ví dụ: ABC123)"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-white text-lg uppercase font-mono tracking-widest placeholder:text-slate-600 placeholder:normal-case placeholder:tracking-normal"
                  maxLength={8}
                />
              </div>

              <button 
                type="submit"
                disabled={!roomCode.trim()}
                className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold py-3.5 px-6 rounded-xl transition-all border border-slate-700 active:scale-98 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <LogIn size={18} />
                <span>VÀO PHÒNG NGAY</span>
              </button>
            </form>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center text-[11px] text-slate-400">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <Users size={16} className="mx-auto mb-1 text-amber-400" />
                <span>2-4 Người chơi</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <Sparkles size={16} className="mx-auto mb-1 text-emerald-400" />
                <span>Thời gian thực</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <Trophy size={16} className="mx-auto mb-1 text-blue-400" />
                <span>Luật chuẩn VN</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
