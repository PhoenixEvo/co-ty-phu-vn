'use client';

import { useState } from 'react';
import { X, Volume2, VolumeX, BookOpen, LogOut, Info } from 'lucide-react';
import { sounds } from '@/utils/sound';

interface SettingsModalProps {
  onClose: () => void;
  onLeave: () => void;
  onOpenRules: () => void;
}

export default function SettingsModal({ onClose, onLeave, onOpenRules }: SettingsModalProps) {
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);

  const toggleSound = () => {
    sounds.enabled = !sounds.enabled;
    setSoundEnabled(sounds.enabled);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-sm overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="font-black text-xl text-slate-900">Cài Đặt & Trợ Giúp</h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              {soundEnabled ? <Volume2 size={20} className="text-emerald-600" /> : <VolumeX size={20} className="text-slate-400" />}
              <div>
                <div className="font-bold text-sm text-slate-800">Âm thanh trò chơi</div>
                <div className="text-xs text-slate-500">Hiệu ứng đổ xúc xắc, tiền tệ</div>
              </div>
            </div>
            <button
              onClick={toggleSound}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                soundEnabled ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md" />
            </button>
          </div>

          {/* Rules Guide Button */}
          <button
            onClick={() => {
              onClose();
              onOpenRules();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition"
          >
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-blue-600" />
              <div>
                <div className="font-bold text-sm text-slate-800">Xem luật chơi Cờ Tỷ Phú</div>
                <div className="text-xs text-slate-500">Hướng dẫn mua bán, trả tiền thuê, ra tù</div>
              </div>
            </div>
          </button>

          {/* Leave Room Button */}
          <button
            onClick={onLeave}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 transition font-bold text-sm text-left"
          >
            <LogOut size={20} />
            <span>Rời khỏi phòng chơi</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
