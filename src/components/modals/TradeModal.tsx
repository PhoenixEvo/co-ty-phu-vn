'use client';

import React, { useState } from 'react';
import { GameState, Player, BoardSpace } from '@/game/types';
import { BOARD_SPACES } from '@/game/boardConfig';
import { formatMoney } from '@/utils/format';
import { sounds } from '@/utils/sound';
import { Handshake, X, Check, ArrowRightLeft, DollarSign, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TradeModalProps {
  state: GameState;
  playerId: string;
  isOpen: boolean;
  onClose: () => void;
  dispatch: any;
}

export default function TradeModal({ state, playerId, isOpen, onClose, dispatch }: TradeModalProps) {
  const me = state.players.find(p => p.id === playerId);
  const otherPlayers = state.players.filter(p => p.id !== playerId && !p.isBankrupt);

  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(otherPlayers[0]?.id || '');
  const [offeredSpaces, setOfferedSpaces] = useState<string[]>([]);
  const [requestedSpaces, setRequestedSpaces] = useState<string[]>([]);
  const [offeredMoney, setOfferedMoney] = useState<number>(0);
  const [requestedMoney, setRequestedMoney] = useState<number>(0);

  const partner = state.players.find(p => p.id === selectedPartnerId);

  // Incoming offer targeted at me
  const incomingOffer = state.activeTradeOffer?.toPlayerId === playerId ? state.activeTradeOffer : null;
  const incomingProposer = incomingOffer ? state.players.find(p => p.id === incomingOffer.fromPlayerId) : null;

  // Outgoing offer sent by me
  const outgoingOffer = state.activeTradeOffer?.fromPlayerId === playerId ? state.activeTradeOffer : null;

  if (!me) return null;

  const myOwnedSpaces = BOARD_SPACES.filter(s => state.properties[s.id]?.ownerId === playerId && (s as any).price);
  const partnerOwnedSpaces = partner ? BOARD_SPACES.filter(s => state.properties[s.id]?.ownerId === partner.id && (s as any).price) : [];

  const handleToggleOfferSpace = (spaceId: string) => {
    setOfferedSpaces(prev => 
      prev.includes(spaceId) ? prev.filter(id => id !== spaceId) : [...prev, spaceId]
    );
  };

  const handleToggleRequestSpace = (spaceId: string) => {
    setRequestedSpaces(prev => 
      prev.includes(spaceId) ? prev.filter(id => id !== spaceId) : [...prev, spaceId]
    );
  };

  const handleSendOffer = () => {
    if (!selectedPartnerId) return;
    sounds.playBuyProperty();
    dispatch({
      type: 'PROPOSE_TRADE',
      payload: {
        fromPlayerId: playerId,
        toPlayerId: selectedPartnerId,
        offeredSpaceIds: offeredSpaces,
        requestedSpaceIds: requestedSpaces,
        offeredMoney: Math.min(offeredMoney, me.money),
        requestedMoney
      }
    });
    onClose();
  };

  const handleAcceptTrade = () => {
    sounds.playMoneyGain();
    dispatch({ type: 'ACCEPT_TRADE' });
  };

  const handleRejectTrade = () => {
    dispatch({ type: 'REJECT_TRADE' });
  };

  const handleCancelTrade = () => {
    dispatch({ type: 'CANCEL_TRADE' });
  };

  return (
    <>
      {/* 1. INCOMING TRADE OFFER ALERT MODAL */}
      <AnimatePresence>
        {incomingOffer && incomingProposer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 max-w-md w-full shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-400 font-black text-lg">
                <ArrowRightLeft size={22} />
                <span>ĐỀ NGHỊ ĐỔI ĐẤT TỪ {incomingProposer.nickname.toUpperCase()}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* What they offer */}
                <div className="bg-slate-800/90 p-3 rounded-2xl border border-emerald-500/40 space-y-1.5">
                  <span className="font-bold text-emerald-400 block uppercase">Bạn sẽ nhận:</span>
                  {incomingOffer.offeredMoney > 0 && (
                    <div className="font-mono text-emerald-300 font-black">+ {formatMoney(incomingOffer.offeredMoney)}</div>
                  )}
                  {incomingOffer.offeredSpaceIds.map(sId => {
                    const sp = BOARD_SPACES.find(s => s.id === sId);
                    return <div key={sId} className="font-bold text-slate-200 truncate">🏞️ {sp?.name}</div>;
                  })}
                  {incomingOffer.offeredSpaceIds.length === 0 && incomingOffer.offeredMoney === 0 && (
                    <span className="text-slate-500 italic">Không có</span>
                  )}
                </div>

                {/* What they request */}
                <div className="bg-slate-800/90 p-3 rounded-2xl border border-red-500/40 space-y-1.5">
                  <span className="font-bold text-red-400 block uppercase">Bạn cần đưa:</span>
                  {incomingOffer.requestedMoney > 0 && (
                    <div className="font-mono text-red-300 font-black">- {formatMoney(incomingOffer.requestedMoney)}</div>
                  )}
                  {incomingOffer.requestedSpaceIds.map(sId => {
                    const sp = BOARD_SPACES.find(s => s.id === sId);
                    return <div key={sId} className="font-bold text-slate-200 truncate">🏞️ {sp?.name}</div>;
                  })}
                  {incomingOffer.requestedSpaceIds.length === 0 && incomingOffer.requestedMoney === 0 && (
                    <span className="text-slate-500 italic">Không có</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAcceptTrade}
                  className="py-3 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check size={18} />
                  <span>ĐỒNG Ý ĐỔI</span>
                </button>
                <button
                  onClick={handleRejectTrade}
                  className="py-3 bg-slate-800 hover:bg-slate-700 text-red-300 font-bold rounded-xl border border-red-500/40 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <X size={18} />
                  <span>TỪ CHỐI</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. PROPOSE TRADE MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200 select-none">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 max-w-xl w-full shadow-2xl text-white max-h-[90vh] flex flex-col space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-black text-lg">
                <Handshake size={22} />
                <span>THƯƠNG LƯỢNG & ĐỔI BẤT ĐỘNG SẢN</span>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Partner Selection Tabs */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase">Chọn đối tác muốn giao dịch:</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {otherPlayers.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPartnerId(p.id);
                      setRequestedSpaces([]);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 cursor-pointer shrink-0 ${
                      selectedPartnerId === p.id 
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400' 
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.tokenColor }} />
                    <span>{p.nickname}</span>
                    <span className="font-mono text-[10px] text-emerald-400 font-black">({formatMoney(p.money)})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Column: My Assets vs Partner Assets */}
            <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto min-h-[220px]">
              
              {/* Left: What I Offer */}
              <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/80 space-y-2 flex flex-col">
                <span className="text-xs font-bold text-emerald-400 uppercase flex items-center justify-between">
                  <span>Tài sản của bạn đưa:</span>
                  <span className="text-[10px] text-slate-400 font-mono">({offeredSpaces.length} ô)</span>
                </span>

                <div className="flex-1 overflow-y-auto space-y-1 max-h-36 pr-1">
                  {myOwnedSpaces.length === 0 ? (
                    <div className="text-xs text-slate-500 italic py-2">Bạn chưa có ô đất nào để đổi</div>
                  ) : (
                    myOwnedSpaces.map(s => {
                      const isSelected = offeredSpaces.includes(s.id);
                      return (
                        <div
                          key={s.id}
                          onClick={() => handleToggleOfferSpace(s.id)}
                          className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200' 
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="truncate max-w-[120px]">{s.name}</span>
                          {isSelected && <Check size={14} className="text-emerald-400" />}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Money offer input */}
                <div className="pt-2 border-t border-slate-700/60">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Tiền mặt bạn bù thêm:</label>
                  <input
                    type="number"
                    step={100000}
                    min={0}
                    max={me.money}
                    value={offeredMoney}
                    onChange={(e) => setOfferedMoney(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-emerald-400 focus:ring-1 focus:ring-amber-400"
                    placeholder="0 ₫"
                  />
                </div>
              </div>

              {/* Right: What I Request */}
              <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/80 space-y-2 flex flex-col">
                <span className="text-xs font-bold text-amber-400 uppercase flex items-center justify-between">
                  <span>Tài sản của {partner?.nickname || 'đối thủ'}:</span>
                  <span className="text-[10px] text-slate-400 font-mono">({requestedSpaces.length} ô)</span>
                </span>

                <div className="flex-1 overflow-y-auto space-y-1 max-h-36 pr-1">
                  {partnerOwnedSpaces.length === 0 ? (
                    <div className="text-xs text-slate-500 italic py-2">Người này chưa có ô đất nào</div>
                  ) : (
                    partnerOwnedSpaces.map(s => {
                      const isSelected = requestedSpaces.includes(s.id);
                      return (
                        <div
                          key={s.id}
                          onClick={() => handleToggleRequestSpace(s.id)}
                          className={`p-2 rounded-lg text-xs font-bold border transition cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? 'bg-amber-600/30 border-amber-400 text-amber-200' 
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="truncate max-w-[120px]">{s.name}</span>
                          {isSelected && <Check size={14} className="text-amber-400" />}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Money request input */}
                <div className="pt-2 border-t border-slate-700/60">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Tiền mặt đối thủ bù:</label>
                  <input
                    type="number"
                    step={100000}
                    min={0}
                    max={partner?.money || 0}
                    value={requestedMoney}
                    onChange={(e) => setRequestedMoney(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-amber-300 focus:ring-1 focus:ring-amber-400"
                    placeholder="0 ₫"
                  />
                </div>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
              >
                HỦY BỎ
              </button>
              <button
                onClick={handleSendOffer}
                disabled={!selectedPartnerId || (offeredSpaces.length === 0 && requestedSpaces.length === 0 && offeredMoney === 0 && requestedMoney === 0)}
                className="px-6 py-2.5 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-black text-xs transition shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Handshake size={16} />
                <span>GỬI ĐỀ NGHỊ ĐỔI ĐẤT</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
