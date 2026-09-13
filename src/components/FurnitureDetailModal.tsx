import React, { useState } from 'react';
import { FurniturePiece } from '../types';
import { X, Check, ArrowRight, ShieldCheck, Hammer, Layers, Download, Sparkles, Scale, Bookmark, SlidersHorizontal } from 'lucide-react';

interface FurnitureDetailModalProps {
  piece: FurniturePiece | null;
  onClose: () => void;
  onInquire: (pieceTitle: string) => void;
  onToggleCurate?: (piece: FurniturePiece) => void;
  isCurated?: boolean;
  onToggleCompare?: (piece: FurniturePiece) => void;
  isCompared?: boolean;
}

export const FurnitureDetailModal: React.FC<FurnitureDetailModalProps> = ({
  piece,
  onClose,
  onInquire,
  onToggleCurate,
  isCurated = false,
  onToggleCompare,
  isCompared = false,
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [clientEmail, setClientEmail] = useState('');
  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);

  if (!piece) return null;

  const FINISH_OPTIONS = [
    {
      name: 'Mài Satin & Sáp Ong Khoáng (Tiêu Chuẩn)',
      tag: 'BẢN GỐC ATELIER',
      desc: piece.finish,
      textureEffect: 'Độ bóng mờ 15%, phản xạ ánh sáng ấm dịu 2400K, giữ trọn các lỗ rỗng tự nhiên của vỉa đá.',
    },
    {
      name: 'Chải Mờ Phun Cát Cổ Điển (Haptic Antique)',
      tag: 'XÚC GIÁC MẠNH',
      desc: 'Xử lý cơ học bề mặt tạo vân nổi xúc giác, tăng ma sát tự nhiên và khả năng chống trầy xước.',
      textureEffect: 'Độ nhám xúc giác tự nhiên như phiến đá vách núi La Mã, cảm giác thô mộc vượt thời gian.',
    },
    {
      name: 'Patina Hóa Học Tự Nhiên & Chống Thấm Sâu',
      tag: 'BẢO VỆ CHUYÊN SÂU',
      desc: 'Công nghệ thẩm thấu fluoropolymer gốc nước không tạo màng, bảo vệ đá vôi khỏi mọi vết ố hữu cơ.',
      textureEffect: 'Bảo toàn 100% màu sắc nguyên bản, hoàn toàn kháng dầu mỡ và rượu vang đỏ.',
    }
  ];

  const handleDownloadSpecs = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3500);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      onClose();
      onInquire(piece.title);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#221f1a] text-[#fbf9f5] border border-[#d4af37]/45 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="p-4 md:p-6 bg-[#1a1815] text-[#fbf9f5] flex items-center justify-between border-b border-[#d4af37]/35 shrink-0">
          <div>
            <span className="font-label-caps text-[#f5c065] text-[10px] tracking-[0.25em] uppercase block font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block shadow-[0_0_6px_#d4af37]"></span>
              PHIÊN BẢN ĐÁNH SỐ GIỚI HẠN · {piece.edition}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-white mt-1">
              {piece.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[#d4af37]/40 text-[#ffd88a] hover:bg-[#d4af37] hover:text-[#0b0a09] transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Object Image & Floating Quick Actions */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-[#2b2721] overflow-hidden border border-[#d4af37]/40 shadow-xl group">
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#191715]/95 text-[#ffd88a] px-3 py-1 font-mono text-[10px] font-bold border border-[#d4af37]/45 shadow-md">
                  {piece.edition}
                </div>
              </div>

              {/* Fast Action Buttons: Curate + Compare */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {onToggleCurate && (
                  <button
                    onClick={() => onToggleCurate(piece)}
                    className={`p-2.5 border flex items-center justify-center gap-2 transition-all ${
                      isCurated
                        ? 'bg-[#d4af37] text-[#0b0a09] border-[#d4af37] font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                        : 'bg-[#28241f] text-[#ffd88a] border-[#d4af37]/35 hover:border-[#d4af37]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isCurated ? 'Đã Lưu Tuyển Chọn' : 'Lưu Tuyển Chọn'}</span>
                  </button>
                )}

                {onToggleCompare && (
                  <button
                    onClick={() => onToggleCompare(piece)}
                    className={`p-2.5 border flex items-center justify-center gap-2 transition-all ${
                      isCompared
                        ? 'bg-[#d4af37] text-[#0b0a09] border-[#d4af37] font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                        : 'bg-[#28241f] text-[#ffd88a] border-[#d4af37]/35 hover:border-[#d4af37]'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'Đang So Sánh' : 'So Sánh Thông Số'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Core Specifications */}
            <div className="space-y-6">
              <div>
                <span className="font-label-caps text-[#f5c065] text-[11px] uppercase tracking-wider block mb-1 font-semibold">
                  Phân Loại: {piece.categoryLabel}
                </span>
                <p className="font-serif text-xl text-white leading-relaxed">
                  {piece.description}
                </p>
              </div>

              <div className="border-t border-[#d4af37]/25 pt-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-[#d4af37]/15">
                  <span className="text-[#c5baa9]">KÍCH THƯỚC</span>
                  <span className="text-[#ffd88a] font-bold">{piece.dimensions}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#d4af37]/15">
                  <span className="text-[#c5baa9]">TRỌNG LƯỢNG TẢI TRỌNG</span>
                  <span className="text-[#ffd88a] font-bold">{piece.weight}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#d4af37]/15">
                  <span className="text-[#c5baa9]">VẬT LIỆU CHẾ TÁC</span>
                  <span className="text-white font-medium">{piece.materiality}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#d4af37]/15">
                  <span className="text-[#c5baa9]">KẾT CẤU MỘNG GHÉP</span>
                  <span className="text-white font-medium">{piece.joinery}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#d4af37]/15">
                  <span className="text-[#c5baa9]">TIẾN ĐỘ THỰC HIỆN</span>
                  <span className="text-[#ffd88a] font-bold">{piece.leadTime}</span>
                </div>
              </div>

              <div className="p-4 bg-[#27231d] border-l-2 border-[#d4af37] text-xs font-body-muted text-[#ded7cb]">
                <strong className="text-[#ffd88a]">Xuất Xứ &amp; Tính Xác Thực:</strong> {piece.provenance} Mỗi tác phẩm đi kèm chứng thư lưu trữ độc bản có chữ ký của giám tuyển trong hộp đồng thau phay CNC.
              </div>
            </div>
          </div>

          {/* Interactive Material Finish Swatches Selector */}
          <div className="border-t border-[#d4af37]/25 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label-caps uppercase text-[#f5c065] text-xs tracking-widest font-bold flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
                TÙY CHỌN BỀ MẶT HOÀN THIỆN ĐỘC BẢN (FINISH VARIANT)
              </span>
              <span className="font-mono text-[11px] text-[#c5baa9]">
                Chọn mẫu xử lý bề mặt trước khi ủy thác
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FINISH_OPTIONS.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedFinishIndex(idx)}
                  className={`text-left p-3.5 border transition-all flex flex-col justify-between ${
                    selectedFinishIndex === idx
                      ? 'bg-[#2e2922] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'bg-[#1e1b17] border-[#d4af37]/25 hover:border-[#d4af37]/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] px-2 py-0.5 bg-[#171513] text-[#ffd88a] border border-[#d4af37]/35 uppercase font-bold">
                        {opt.tag}
                      </span>
                      {selectedFinishIndex === idx && (
                        <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                      )}
                    </div>
                    <h5 className="font-serif text-sm text-white mt-2 font-medium">
                      {opt.name}
                    </h5>
                  </div>
                  <p className="text-[11px] font-sans text-[#ded7cb] mt-2 leading-relaxed">
                    {opt.textureEffect}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Inquiry form */}
          <div className="border-t border-[#d4af37]/25 pt-8">
            <h3 className="font-label-caps uppercase text-[#f5c065] text-xs tracking-widest mb-4 font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              ĐẶT TRƯỚC PHIÊN BẢN HOẶC YÊU CẦU BÁO GIÁ HỒ SƠ
            </h3>
            {inquirySent ? (
              <div className="p-6 bg-[#27231d] border border-emerald-500/50 flex items-center gap-3 text-emerald-200">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-serif text-lg font-medium text-white">Yêu Cầu Đã Được Chuyển Tới Bàn Đăng Ký Atelier</p>
                  <p className="text-xs font-body-muted text-[#ded7cb]">Chuyên viên phụ trách danh mục đồ gỗ và đá sẽ liên hệ với quý khách trong vòng 24 giờ cùng các thông số vận chuyển quốc tế.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="Nhập email bảo mật của quý khách để nhận báo giá & chi phí vận chuyển..."
                  className="flex-1 px-4 py-3 bg-[#191715] border border-[#d4af37]/35 text-sm text-[#fbf9f5] focus:outline-none focus:border-[#d4af37] placeholder:text-[#8f8578]"
                />
                <button
                  type="submit"
                  className="btn-monolith whitespace-nowrap shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                >
                  Yêu Cầu Báo Giá
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 md:p-6 bg-[#1a1815] border-t border-[#d4af37]/25 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs font-mono text-[#c5baa9]">
            MÃ TÁC PHẨM: {piece.id.toUpperCase()} · BẢN GIỚI HẠN
          </div>
          <button
            onClick={handleDownloadSpecs}
            className="w-full sm:w-auto px-6 py-2.5 border border-[#d4af37]/45 bg-[#24211c] hover:border-[#d4af37] text-[#ffd88a] hover:text-white transition-all font-label-caps uppercase text-[11px] font-bold flex items-center justify-center gap-2"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Bản Vẽ Kỹ Thuật Đã Tải Về
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Tải Hồ Sơ Bản Vẽ 3D &amp; CAD Mộng Ghép
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
