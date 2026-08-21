'use client';

import React, { useState, useEffect } from 'react';
import { GameState } from '@/game/types';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Sparkles } from 'lucide-react';
import { sounds } from '@/utils/sound';

interface QuickChatPhrasesProps {
  state: GameState;
  playerId: string;
  dispatch: any;
}

const PHRASES = [
  'Đất này của anh em ơi! 🏰',
  'Tha cho em lần này đi đại gia! 😭',
  'Cấm giẫm vô khách sạn nha! 🏨🔥',
  'Có ai muốn đổi đất với mình không? 🤝',
  'Cho vay nóng lãi suất 0% đây! 💸',
  'Hên xui thôi bạn ơi! 🎲',
  'Vào tù dưỡng lão tí rồi ra! ⛓️',
  'Sắp lội ngược dòng rồi! 🚀',
  'Cứu tôi với sắp phá sản rồi! 🆘'
];

export default function QuickChatPhrases({ state, playerId, dispatch }: QuickChatPhrasesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeBubble, setActiveBubble] = useState<{
    id: string;
    senderName: string;
    tokenColor: string;
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!state.lastChatPhrase) return;

    const sender = state.players.find(p => p.id === state.lastChatPhrase?.playerId);
    if (!sender) return;

    setActiveBubble({
      id: state.lastChatPhrase.id,
      senderName: sender.nickname,
      tokenColor: sender.tokenColor,
      text: state.lastChatPhrase.text
    });

    sounds.playCardDraw();

    const timer = setTimeout(() => {
      setActiveBubble(null);
    }, 3200);

    return () => clearTimeout(timer);
  }, [state.lastChatPhrase?.id]);

  const handleSendPhrase = (text: string) => {
    dispatch({
      type: 'SEND_CHAT_PHRASE',
      payload: { text }
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. FLOATING CHAT SPEECH BUBBLE POPUP */}
      <AnimatePresence>
        {activeBubble && (
          <motion.div
            key={activeBubble.id}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', damping: 14, stiffness: 220 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none max-w-sm w-[90%] select-none flex flex-col items-center"
          >
            <div 
              className="bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-2xl border-2 flex items-center gap-2.5 backdrop-blur-md"
              style={{ borderColor: activeBubble.tokenColor }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 border border-white/60"
                style={{ backgroundColor: activeBubble.tokenColor }}
              >
                {activeBubble.senderName.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block leading-none">{activeBubble.senderName}</span>
                <span className="text-xs md:text-sm font-bold text-amber-300">{activeBubble.text}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CHAT BUTTON & POPOVER */}
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 cursor-pointer shadow-md ${
            isOpen 
              ? 'bg-blue-600 text-white border-blue-400 font-bold' 
              : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 border-slate-700 hover:text-white'
          }`}
          title="Khẩu lệnh chat nhanh"
        >
          <MessageSquare size={18} />
          <span className="text-xs font-bold hidden md:inline">Chat nhanh</span>
        </button>

        {/* Phrases List Popover */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute right-0 bottom-full mb-2 bg-slate-900/95 border border-slate-700 p-2 rounded-2xl shadow-2xl backdrop-blur-md z-50 w-64 max-h-72 overflow-y-auto space-y-1 select-none"
            >
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                Chọn câu thoại nhanh:
              </div>
              {PHRASES.map((text, i) => (
                <button
                  key={i}
                  onClick={() => handleSendPhrase(text)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 hover:text-white transition cursor-pointer flex items-center justify-between group"
                >
                  <span className="truncate">{text}</span>
                  <Send size={12} className="opacity-0 group-hover:opacity-100 text-amber-400 transition" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
