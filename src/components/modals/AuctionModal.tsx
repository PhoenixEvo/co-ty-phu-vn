'use client';

import React, { useState, useEffect } from 'react';
import { GameState, BoardSpace } from '@/game/types';
import { BOARD_SPACES } from '@/game/boardConfig';
import { formatMoney } from '@/utils/format';
import { sounds } from '@/utils/sound';
import { Gavel, Timer, Sparkles, TrendingUp, Check, X, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuctionModalProps {
  state: GameState;
  playerId: string;
  dispatch: any;
}

export default function AuctionModal({ state, playerId, dispatch }: AuctionModalProps) {
  const auction = state.activeAuction;
  const me = state.players.find(p => p.id === playerId);
  const isHost = state.players.length > 0 && state.players[0].id === playerId;

  const [timeLeft, setTimeLeft] = useState(10);
  const [isLocallyDismissed, setIsLocallyDismissed] = useState(false);

  // Reset local dismiss when a new auction starts or new bid is placed
  useEffect(() => {
    setIsLocallyDismissed(false);
  }, [auction?.spaceId, auction?.currentBid]);

  useEffect(() => {
    if (!auction) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((auction.endTime - Date.now()) / 1000));
      setTimeLeft(remaining);

      // Only the host or highest bidder/current player triggers the auction resolution when timer hits 0
      if (remaining <= 0) {
        dispatch({ type: 'PASS_AUCTION' });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [auction?.endTime, dispatch]);

  if (!auction || !me || me.isBankrupt) return null;

  const space = BOARD_SPACES.find(s => s.id === auction.spaceId);
  if (!space) return null;

  const highestBidder = auction.highestBidderId ? state.players.find(p => p.id === auction.highestBidderId) : null;
  const isHighestBidderMe = auction.highestBidderId === playerId;

  const handleBid = (increment: number) => {
    const nextBid = auction.currentBid + increment;
    if (me.money < nextBid) return;

    sounds.playBuyProperty();
    dispatch({
      type: 'BID_AUCTION',
      payload: { amount: nextBid }
    });
  };

  const isTimeCritical = timeLeft <= 3;

  // If user chose to minimize the auction modal for themselves
  if (isLocallyDismissed) {
    return (
      <div className="fixed bottom-4 left-4 z-50 animate-in fade-in select-none">
        <button
          onClick={() => setIsLocallyDismissed(false)}
          className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-2xl border border-amber-300 flex items-center gap-2 cursor-pointer animate-pulse"
        >
          <Gavel size={16} />
          <span>Đang Đấu Giá: {space.name} ({timeLeft}s)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-5 md:p-6 max-w-lg w-full shadow-2xl text-white space-y-4 relative overflow-hidden"
      >
        {/* Glowing Auction Banner Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-black text-lg">
            <Gavel size={24} className="animate-bounce text-amber-300" />
            <span className="tracking-wide uppercase">SÀN ĐẤU GIÁ CÔNG KHAI</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-full border border-slate-700">
            <Timer size={14} className={isTimeCritical ? 'text-red-400 animate-spin' : 'text-amber-400'} />
            <span className={`font-mono font-black text-sm ${isTimeCritical ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Property Being Auctioned Card */}
        <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bất động sản đấu giá</span>
            <h3 className="text-lg md:text-xl font-black text-white">{space.name}</h3>
            <span className="text-xs text-slate-400 font-medium">Giá gốc thị trường: {formatMoney((space as any).price || 0)}</span>
          </div>
          <div className="text-3xl md:text-4xl">🏞️</div>
        </div>

        {/* Current Highest Bid Box */}
        <div className="bg-linear-to-r from-amber-500/20 via-slate-950 to-amber-500/20 p-4 rounded-2xl border border-amber-400/50 text-center space-y-1">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Mức giá cao nhất hiện tại</span>
          <div className="text-3xl md:text-4xl font-mono font-black text-amber-400 drop-shadow-md">
            {formatMoney(auction.currentBid)}
          </div>
          {highestBidder ? (
            <div className="flex items-center justify-center gap-2 text-xs pt-1">
              <span className="text-slate-400">Đang dẫn đầu:</span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: highestBidder.tokenColor }} />
                <span className="font-bold text-white">{highestBidder.nickname}</span>
                {isHighestBidderMe && <span className="text-[9px] text-emerald-400 font-bold">(Bạn)</span>}
              </div>
            </div>
          ) : (
            <span className="text-xs text-slate-500 italic block">Chưa có ai đặt giá</span>
          )}
        </div>

        {/* Quick Bidding Action Buttons */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-center">
            Bấm để trả giá (Số dư của bạn: {formatMoney(me.money)})
          </span>

          <div className="grid grid-cols-3 gap-2">
            {[100_000, 500_000, 1_000_000].map(inc => {
              const targetAmount = auction.currentBid + inc;
              const canAfford = me.money >= targetAmount;
              return (
                <button
                  key={inc}
                  onClick={() => handleBid(inc)}
                  disabled={!canAfford}
                  className="py-3 px-2 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-30 text-slate-950 font-black text-xs md:text-sm rounded-xl shadow-lg transition active:scale-95 cursor-pointer flex flex-col items-center justify-center border border-amber-300/40"
                >
                  <span className="flex items-center gap-0.5"><TrendingUp size={13} /> + {formatMoney(inc)}</span>
                  <span className="text-[10px] font-mono text-slate-900 font-bold">({formatMoney(targetAmount)})</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsLocallyDismissed(true)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <EyeOff size={14} />
              <span>TÔI BỎ QUA (KHÔNG ĐẶT GIÁ)</span>
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
