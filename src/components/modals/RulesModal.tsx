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
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition cursor-pointer"
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
              Trở thành người chơi giàu nhất bằng cách mua đất, xây dựng bất động sản và thu tiền thuê từ đối thủ cho đến khi những người chơi khác phá sản. Tiền khởi đầu: <strong>10.000.000 ₫</strong>.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">2</span>
              Lượt chơi & Xúc xắc
            </h4>
            <p className="text-xs pl-7">
              Người chơi lần lượt đổ 2 xúc xắc và di chuyển quân cờ theo chiều kim đồng hồ. Nếu đổ được <strong>xúc xắc đôi</strong>, bạn được đổ thêm một lượt nữa! Nhưng nếu đổ đôi 3 lần liên tiếp, bạn sẽ bị <strong>vào tù ngay lập tức</strong>.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">3</span>
              Mua Đất & Xây Nhà / Khách Sạn
            </h4>
            <p className="text-xs pl-7">
              - Dừng chân tại ô đất chưa có chủ: Có quyền <strong>Mua</strong> hoặc <strong>Bỏ qua</strong>.<br/>
              - Dừng chân tại ô đất của chính mình: Có thể trả tiền để <strong>Xây thêm Nhà 🏠 (tối đa 4 nhà)</strong> hoặc <strong>Lên Khách Sạn 🏨</strong> nhằm tăng tiền thuê khi đối thủ giẫm vào.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">4</span>
              Thế Chấp & Giải Chấp (Cầm Cố Đất)
            </h4>
            <p className="text-xs pl-7">
              - Khi thiếu tiền mặt, bạn có thể <strong>Thế Chấp</strong> bất động sản để nhận lại <strong>50% giá mua</strong> từ ngân hàng.<br/>
              - Đất đang thế chấp sẽ <strong>không thu tiền thuê</strong> của đối thủ.<br/>
              - Bạn có thể <strong>Giải chấp (Chuộc lại)</strong> bất cứ lúc nào với chi phí bằng 55% giá trị đất (tiền gốc + 10% phí ngân hàng).
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">5</span>
              Ô Bắt Đầu & Thuế
            </h4>
            <p className="text-xs pl-7">
              Mỗi khi hoàn thành 1 vòng và đi qua hoặc dừng tại ô <strong>Bắt Đầu</strong>, bạn sẽ được nhận <strong>2.000.000 ₫ tiền lương</strong>. Khi dừng ở ô <strong>Thuế</strong>, bạn phải nộp tiền phạt cho cơ quan thuế.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-black text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">6</span>
              Ở Tù & Ra Tù
            </h4>
            <p className="text-xs pl-7">
              Khi ở tù, bạn có thể: (1) Đổ xúc xắc tìm đôi miễn phí; hoặc (2) Nộp phí bảo lãnh <strong>500.000 ₫</strong> để ra tù ngay lập tức và đổ xúc xắc đi tiếp trong lượt đó! Nếu dừng chân tại ô số 10 khi di chuyển bình thường, bạn chỉ là <strong>Khách Thăm Tù</strong> và hoàn toàn tự do.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition cursor-pointer"
          >
            Đã Hiểu
          </button>
        </div>
      </div>
    </div>
  );
}
