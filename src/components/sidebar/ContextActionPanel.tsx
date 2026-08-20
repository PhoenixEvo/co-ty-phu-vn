'use client';

import { GameState, PropertySpace } from '@/game/types';
import { BOARD_SPACES } from '@/game/boardConfig';
import { sounds } from '@/utils/sound';
import { formatMoney } from '@/utils/format';
import { Home, Ban, Receipt, ArrowRight, Building2, Sparkles, AlertTriangle, Landmark, Skull } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContextActionPanelProps {
  state: GameState;
  playerId: string;
  dispatch: any;
  isMoving?: boolean;
}

export default function ContextActionPanel({ state, playerId, dispatch, isMoving = false }: ContextActionPanelProps) {
  const isMyTurn = state.playerOrder[state.currentPlayerIndex] === playerId;
  const player = state.players.find(p => p.id === playerId);

  // Do not show decisions until the player has finished physically moving to the space!
  if (!isMyTurn || state.turnState !== 'AWAITING_ACTION' || !state.awaitingAction || !player || isMoving) {
    return null;
  }

  const { type, spaceIndex } = state.awaitingAction;
  const currentSpace = spaceIndex !== undefined ? BOARD_SPACES[spaceIndex] : null;

  const handleBuy = () => {
    sounds.playBuyProperty();
    dispatch({ type: 'BUY_PROPERTY' });
  };

  const handleSkipBuy = () => {
    dispatch({ type: 'SKIP_BUY' });
  };

  const handleUpgrade = () => {
    sounds.playBuyProperty();
    dispatch({ type: 'UPGRADE_PROPERTY' });
  };

  const handleSkipUpgrade = () => {
    dispatch({ type: 'SKIP_UPGRADE' });
  };

  const handlePayTax = () => {
    sounds.playMoneyPay();
    dispatch({ type: 'PAY_TAX' });
  };

  const handleDismissCard = () => {
    dispatch({ type: 'DISMISS_CARD' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-xl space-y-3"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Sparkles size={14} /> Quyết Định Của Bạn
        </span>
      </div>

      {/* 1. Buying Unowned Property Action */}
      {type === 'buy_property' && currentSpace && (
        <div className="space-y-3">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-white uppercase truncate">{currentSpace.name}</span>
              <span className="text-xs font-mono font-black text-amber-400">
                {formatMoney((currentSpace as PropertySpace).price)}
              </span>
            </div>
            
            <div className="text-xs text-slate-400 flex justify-between">
              <span>Số dư hiện tại:</span>
              <span className="font-mono text-emerald-400 font-bold">{formatMoney(player.money)}</span>
            </div>
            
            <div className="text-xs text-slate-400 flex justify-between mt-0.5">
              <span>Sau khi mua:</span>
              <span className={`font-mono font-bold ${
                player.money >= (currentSpace as PropertySpace).price ? 'text-slate-200' : 'text-red-400'
              }`}>
                {formatMoney(player.money - (currentSpace as PropertySpace).price)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleBuy}
              disabled={player.money < (currentSpace as PropertySpace).price}
              className="py-2.5 px-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs rounded-xl transition flex items-center justify-center gap-1 shadow-md active:scale-95 cursor-pointer"
            >
              <Home size={15} />
              <span>MUA {formatMoney((currentSpace as PropertySpace).price)}</span>
            </button>

            <button
              onClick={handleSkipBuy}
              className="py-2.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 border border-slate-700 active:scale-95 cursor-pointer"
            >
              <Ban size={15} />
              <span>BỎ QUA</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Upgrading Own Property (House / Hotel) */}
      {type === 'upgrade_property' && currentSpace && (
        <div className="space-y-3">
          {(() => {
            const pSpace = currentSpace as PropertySpace;
            const ownership = state.properties[currentSpace.id];
            const currentHouses = ownership?.houseCount || 0;
            const isNextHotel = currentHouses === 4;
            const upgradeCost = pSpace.houseCost;
            const nextRent = isNextHotel ? pSpace.hotelRent : pSpace.houseRents[currentHouses];

            return (
              <>
                <div className="bg-amber-950/30 p-3 rounded-xl border border-amber-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white uppercase">{pSpace.name}</span>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                      {currentHouses === 0 ? 'Đất Trống' : `${currentHouses} Nhà 🏠`}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 flex justify-between">
                    <span>Nâng cấp lên:</span>
                    <span className="font-bold text-amber-400 font-mono">
                      {isNextHotel ? '🏨 KHÁCH SẠN' : `${currentHouses + 1} NHÀ 🏠`}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 flex justify-between">
                    <span>Tiền thuê mới:</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {formatMoney(nextRent)} / lượt
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 flex justify-between pt-1 border-t border-slate-700/60">
                    <span>Chi phí xây:</span>
                    <span className="font-mono text-amber-300 font-bold">{formatMoney(upgradeCost)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleUpgrade}
                    disabled={player.money < upgradeCost}
                    className="py-2.5 px-2 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center gap-1 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
                  >
                    <Building2 size={15} />
                    <span>{isNextHotel ? 'LÊN KHÁCH SẠN' : 'XÂY NHÀ 🏠'}</span>
                  </button>

                  <button
                    onClick={handleSkipUpgrade}
                    className="py-2.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 border border-slate-700 active:scale-95 cursor-pointer"
                  >
                    <Ban size={15} />
                    <span>BỎ QUA</span>
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* 3. Debt Settlement: Paying Rent when Cash is Low (Allows Mortgaging to Avoid Bankruptcy!) */}
      {type === 'pay_rent' && (
        <div className="space-y-3">
          {(() => {
            const rentAmount = state.awaitingAction?.amount || 0;
            const creditor = state.players.find(p => p.id === state.awaitingAction?.creditorId);
            const isShortOnCash = player.money < rentAmount;
            const shortfall = rentAmount - player.money;

            // Get unmortgaged properties owned by this player
            const ownedUnmortgaged = BOARD_SPACES.filter(s => {
              const o = state.properties[s.id];
              return o && o.ownerId === player.id && !o.isMortgaged && (s as any).price;
            });

            return (
              <div className="space-y-2.5">
                <div className={`p-3 rounded-xl border ${
                  isShortOnCash ? 'bg-red-950/60 border-red-500/80 text-red-200' : 'bg-slate-800/80 border-slate-700/80 text-slate-200'
                }`}>
                  <div className="flex items-center justify-between font-bold text-sm">
                    <span>Phải trả cho {creditor?.nickname || 'chủ đất'}:</span>
                    <span className="font-mono text-amber-400 text-base">{formatMoney(rentAmount)}</span>
                  </div>

                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Tiền mặt hiện tại:</span>
                    <span className={`font-mono font-bold ${isShortOnCash ? 'text-red-400' : 'text-emerald-400'}`}>
                      {formatMoney(player.money)}
                    </span>
                  </div>

                  {isShortOnCash && (
                    <div className="flex justify-between text-xs text-red-300 font-bold mt-0.5 pt-1 border-t border-red-800/50">
                      <span>Số tiền còn thiếu:</span>
                      <span className="font-mono">{formatMoney(shortfall)}</span>
                    </div>
                  )}
                </div>

                {/* If short on cash: List properties available to mortgage */}
                {isShortOnCash && (
                  <div className="bg-slate-950/90 p-2.5 rounded-xl border border-amber-500/50 space-y-2">
                    <div className="text-[11px] font-bold text-amber-300 flex items-center justify-between">
                      <span className="flex items-center gap-1"><Landmark size={13} /> Cần thế chấp đất để có tiền trả:</span>
                      <span className="text-[10px] text-slate-400 font-mono">({ownedUnmortgaged.length} ô đất)</span>
                    </div>

                    {ownedUnmortgaged.length === 0 ? (
                      <div className="text-xs text-red-400 italic text-center py-1 font-semibold">
                        Bạn không còn bất động sản nào để thế chấp!
                      </div>
                    ) : (
                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-0.5">
                        {ownedUnmortgaged.map(s => {
                          const val = Math.floor(((s as any).price || 0) * 0.5);
                          return (
                            <div key={s.id} className="flex items-center justify-between p-1.5 bg-slate-900 rounded-lg border border-slate-700 text-xs">
                              <span className="font-bold text-white truncate max-w-[110px]">{s.name}</span>
                              <button
                                onClick={() => {
                                  sounds.playMoneyPay();
                                  dispatch({ type: 'MORTGAGE_PROPERTY', payload: { spaceId: s.id } });
                                }}
                                className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded text-[10px] transition cursor-pointer shadow-xs"
                              >
                                + {formatMoney(val)}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      sounds.playMoneyPay();
                      dispatch({ type: 'PAY_RENT' });
                    }}
                    disabled={isShortOnCash}
                    className="w-full py-3 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white font-black text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>{isShortOnCash ? `THIẾU ${formatMoney(shortfall)} (HÃY THẾ CHẤP ĐẤT)` : `TRẢ TIỀN THUÊ ${formatMoney(rentAmount)} 💸`}</span>
                  </button>

                  {isShortOnCash && (
                    <button
                      onClick={() => dispatch({ type: 'DECLARE_BANKRUPTCY' })}
                      className="w-full py-2 bg-red-950/80 hover:bg-red-900 text-red-300 font-bold text-xs rounded-xl border border-red-800 transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Skull size={14} />
                      <span>CHẤP NHẬN PHÁ SẢN</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 4. Tax Payment Action (with mortgage option if short on cash) */}
      {type === 'pay_tax' && (
        <div className="space-y-3">
          {(() => {
            const taxAmount = state.awaitingAction?.amount || 1_000_000;
            const isShortOnCash = player.money < taxAmount;
            const shortfall = taxAmount - player.money;

            const ownedUnmortgaged = BOARD_SPACES.filter(s => {
              const o = state.properties[s.id];
              return o && o.ownerId === player.id && !o.isMortgaged && (s as any).price;
            });

            return (
              <div className="space-y-2.5">
                <div className="bg-red-950/40 border border-red-800/50 p-3 rounded-xl text-xs text-red-200">
                  Bạn vừa dừng chân tại ô <strong>{currentSpace?.name || 'Cơ Quan Thuế'}</strong>. Cần nộp phạt cho cơ quan thuế: <strong>{formatMoney(taxAmount)}</strong>.
                </div>

                {isShortOnCash && (
                  <div className="bg-slate-950/90 p-2.5 rounded-xl border border-amber-500/50 space-y-2">
                    <div className="text-[11px] font-bold text-amber-300 flex items-center justify-between">
                      <span className="flex items-center gap-1"><Landmark size={13} /> Thiếu tiền nộp thuế! Thế chấp tài sản:</span>
                    </div>

                    {ownedUnmortgaged.length === 0 ? (
                      <div className="text-xs text-red-400 italic text-center py-1">
                        Bạn không còn bất động sản nào để thế chấp!
                      </div>
                    ) : (
                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-0.5">
                        {ownedUnmortgaged.map(s => {
                          const val = Math.floor(((s as any).price || 0) * 0.5);
                          return (
                            <div key={s.id} className="flex items-center justify-between p-1.5 bg-slate-900 rounded-lg border border-slate-700 text-xs">
                              <span className="font-bold text-white truncate max-w-[110px]">{s.name}</span>
                              <button
                                onClick={() => {
                                  sounds.playMoneyPay();
                                  dispatch({ type: 'MORTGAGE_PROPERTY', payload: { spaceId: s.id } });
                                }}
                                className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded text-[10px] transition cursor-pointer shadow-xs"
                              >
                                + {formatMoney(val)}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handlePayTax}
                  disabled={isShortOnCash}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-black text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
                >
                  <Receipt size={18} />
                  <span>{isShortOnCash ? `THIẾU ${formatMoney(shortfall)} ĐÓNG THUẾ` : `NỘP THUẾ ${formatMoney(taxAmount)}`}</span>
                </button>

                {isShortOnCash && (
                  <button
                    onClick={() => dispatch({ type: 'DECLARE_BANKRUPTCY' })}
                    className="w-full py-2 bg-red-950/80 hover:bg-red-900 text-red-300 font-bold text-xs rounded-xl border border-red-800 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Skull size={14} />
                    <span>CHẤP NHẬN PHÁ SẢN</span>
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* 5. Dismiss Card Action */}
      {type === 'card_dismiss' && (
        <button
          onClick={handleDismissCard}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
        >
          <span>TIẾP TỤC TRÒ CHƠI</span>
          <ArrowRight size={18} />
        </button>
      )}
    </motion.div>
  );
}
