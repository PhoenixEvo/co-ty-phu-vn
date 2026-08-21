'use client';

import React, { useState, useEffect } from 'react';
import { GameState } from '@/game/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Sparkles } from 'lucide-react';
import { sounds } from '@/utils/sound';

interface QuickReactionsProps {
  state: GameState;
  playerId: string;
  dispatch: any;
}

const EMOJIS = ['😂', '😭', '😡', '💸', '🎲', '🎉', '🔥', '👏'];

export default function QuickReactions({ state, playerId, dispatch }: QuickReactionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [floatingReaction, setFloatingReaction] = useState<{
    id: string;
    senderName: string;
    tokenColor: string;
    emoji: string;
  } | null>(null);

  useEffect(() => {
    if (!state.lastReaction) return;

    const sender = state.players.find(p => p.id === state.lastReaction?.playerId);
    if (!sender) return;

    setFloatingReaction({
      id: state.lastReaction.id,
      senderName: sender.nickname,
      tokenColor: sender.tokenColor,
      emoji: state.lastReaction.emoji
    });

    sounds.playDiceRoll();

    const timer = setTimeout(() => {
      setFloatingReaction(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [state.lastReaction?.id]);

  const handleSendEmoji = (emoji: string) => {
    dispatch({
      type: 'SEND_REACTION',
      payload: { emoji }
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. FLOATING REACTION POPUP OVER BOARD */}
      <AnimatePresence>
        {floatingReaction && (
          <motion.div
            key={floatingReaction.id}
            initial={{ opacity: 0, scale: 0.3, y: 40 }}
            animate={{ opacity: 1, scale: [0.3, 1.4, 1], y: -20 }}
            exit={{ opacity: 0, scale: 0.8, y: -60 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center select-none"
          >
            <div className="text-6xl filter drop-shadow-xl animate-bounce mb-1">
              {floatingReaction.emoji}
            </div>
            <div 
              className="px-3 py-1 rounded-full text-white text-xs font-black shadow-2xl border border-white/40 flex items-center gap-1.5 backdrop-blur-md"
              style={{ backgroundColor: floatingReaction.tokenColor }}
            >
              <span>{floatingReaction.senderName}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. QUICK REACTION TOGGLE BUTTON & DOCK */}
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 cursor-pointer shadow-md ${
            isOpen 
              ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold' 
              : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 border-slate-700 hover:text-white'
          }`}
          title="Thả biểu cảm"
        >
          <Smile size={18} />
          <span className="text-xs font-bold hidden md:inline">Biểu cảm</span>
        </button>

        {/* Floating Emoji Selector Dock */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute right-0 bottom-full mb-2 bg-slate-900/95 border border-slate-700 p-2 rounded-2xl shadow-2xl backdrop-blur-md z-50 flex items-center gap-1.5 select-none"
            >
              {EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleSendEmoji(emoji)}
                  className="w-9 h-9 rounded-xl hover:bg-slate-800 flex items-center justify-center text-xl transition transform active:scale-125 hover:scale-110 cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
