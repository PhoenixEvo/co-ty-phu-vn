'use client';

import { X, CheckCircle2 } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

export default function RulesModal({ onClose }: RulesModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-full max-w-lg overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="font-black text-xl text-slate-900">Luật Chơi Cờ Tỷ Phú Việt Nam</h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Rules Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed">
          <div className="space-y-1.5">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">1</span>
              Mục tiêu trò chơi
            </h4>
            <p className="text-xs pl-7">
              Trở thành người chơi giàu nhất bằng cách mua đất, xây dựng bất động sản và thu tiền thuê từ đối thủ cho đến khi những người chơi khác phá sản.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">2</span>
              Lượt chơi & Xúc xắc
            </h4>
            <p className="text-xs pl-7">
              Người chơi lần lượt đổ 2 xúc xắc và di chuyển quân cờ theo chiều kim đồng hồ. Nếu đổ được **xúc xắc đôi**, bạn được đổ thêm một lượt nữa! Nhưng nếu đổ đôi 3 lần liên tiếp, bạn sẽ bị **vào tù ngay lập tức**.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">3</span>
              Mua Đất & Thu Tiền Thuê
            </h4>
            <p className="text-xs pl-7">
              Khi dừng chân tại một ô đất chưa có chủ, bạn có quyền **Mua** hoặc **Bỏ qua**. Nếu dừng chân tại ô đất của người khác, bạn phải **trả tiền thuê** theo bảng giá quy định.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">4</span>
              Ô Bắt Đầu & Thuế
            </h4>
            <p className="text-xs pl-7">
              Mỗi khi hoàn thành 1 vòng và đi qua hoặc dừng tại ô **Bắt Đầu**, bạn sẽ được nhận **$200 tiền lương**. Khi dừng ở ô **Thuế**, bạn phải nộp tiền phạt cho ngân hàng.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">5</span>
              Ở Tù & Ra Tù
            </h4>
            <p className="text-xs pl-7">
              Khi ở tù, bạn có thể ra tù bằng cách: đổ được **xúc xắc đôi** trong lượt của mình, hoặc sau 3 lượt ở tù tự động trả bảo lãnh $50 để được tự do.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition"
          >
            Đã Hiểu
          </button>
        </div>
      </div>
    </div>
  );
}
