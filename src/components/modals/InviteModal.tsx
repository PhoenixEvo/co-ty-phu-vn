'use client';

import { useState } from 'react';
import { X, Copy, Check, Share2, Users } from 'lucide-react';

interface InviteModalProps {
  roomId: string;
  onClose: () => void;
}

export default function InviteModal({ roomId, onClose }: InviteModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const roomUrl = typeof window !== 'undefined' ? window.location.href : `http://localhost:3000/${roomId}`;

  const copyCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(roomUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-sm overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Users size={20} />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">Mời Bạn Cùng Chơi</h3>
              <p className="text-xs text-slate-500 font-medium">Chia sẻ mã hoặc link phòng</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">Mã phòng chơi</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-4 py-3 font-mono font-black text-2xl text-center tracking-widest text-slate-800">
                {roomId}
              </div>
              <button
                onClick={copyCode}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                title="Sao chép mã phòng"
              >
                {copiedCode ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">Đường dẫn trực tiếp</label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly 
                value={roomUrl} 
                className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-600 truncate focus:outline-hidden"
              />
              <button
                onClick={copyLink}
                className="p-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95 text-xs"
              >
                {copiedLink ? <Check size={16} /> : <Share2 size={16} />}
                <span>{copiedLink ? 'Đã chép' : 'Chép link'}</span>
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed font-medium">
            💡 Bạn bè của bạn chỉ cần truy cập đường dẫn này trên điện thoại hoặc máy tính là có thể vào chơi ngay cùng bạn!
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition"
          >
            Xong
          </button>
        </div>
      </div>
    </div>
  );
}
