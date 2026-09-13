import React from 'react';
import { FurniturePiece } from '../types';
import { X, Scale, Box, Hammer, Layers, Clock, ShieldCheck, Download, Check, Sparkles, ArrowRight } from 'lucide-react';

interface BespokeComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  pieces: FurniturePiece[];
  onRemovePiece: (id: string) => void;
  onSelectPiece: (piece: FurniturePiece) => void;
  onOpenConsultation: () => void;
}

export const BespokeComparatorModal: React.FC<BespokeComparatorModalProps> = ({
  isOpen,
  onClose,
  pieces = [],
  onRemovePiece,
  onSelectPiece,
  onOpenConsultation
}) => {
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="w-full max-w-6xl bg-[#201d19] text-[#fbf9f5] border border-[#d4af37]/45 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col max-h-[94vh] overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="p-4 md:p-6 bg-[#1a1714] text-[#fbf9f5] flex items-center justify-between border-b border-[#d4af37]/35 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37] inline-block"></span>
              <span className="font-label-caps text-[#f5c065] text-[10px] tracking-[0.25em] uppercase font-bold">
                BẢNG ĐỐI CHIẾU THÔNG SỐ TÁC PHẨM ĐIÊU KHẮC ({pieces.length}/3)
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-white mt-1">
              So Sánh Ma Trận Khối Tích &amp; Vật Liệu Nguyên Khối
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
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {pieces.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <Scale className="w-12 h-12 text-[#ffd88a] mx-auto stroke-[1.2]" />
              <h3 className="font-serif text-2xl text-white">Chưa có tác phẩm nào trong bảng so sánh</h3>
              <p className="font-body-muted text-xs text-[#ded7cb] max-w-md mx-auto leading-relaxed">
                Quý khách vui lòng chọn tối đa 3 tác phẩm từ Bộ Sưu Tập Nội Thất bằng nút "So Sánh" để phân tích chi tiết thông số đá nguyên khối, mộng ghép và xuất xứ mỏ.
              </p>
              <button
                onClick={onClose}
                className="btn-monolith mt-4 shadow-md"
              >
                Quay Lại Danh Mục Tác Phẩm
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#d4af37]/25">
                    <th className="p-4 w-1/4 font-mono text-[11px] uppercase tracking-wider text-[#ffd88a]">
                      TIÊU CHÍ KỸ THUẬT
                    </th>
                    {pieces.map((p) => (
                      <th key={p.id} className="p-4 w-1/4 align-top">
                        <div className="relative group bg-[#28241f] border border-[#d4af37]/30 p-3">
                          <button
                            onClick={() => onRemovePiece(p.id)}
                            className="absolute top-2 right-2 p-1 bg-[#191715] text-[#ffd88a] hover:text-white border border-[#d4af37]/40 text-[10px]"
                            title="Xóa khỏi bảng so sánh"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className="aspect-[4/3] bg-[#1a1714] overflow-hidden mb-3">
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover brightness-95" />
                          </div>
                          <span className="font-mono text-[10px] text-[#f5c065] block uppercase font-bold">
                            {p.edition}
                          </span>
                          <h4 className="font-serif text-lg text-white mt-1 leading-snug line-clamp-1">
                            {p.title}
                          </h4>
                          <button
                            onClick={() => {
                              onClose();
                              onSelectPiece(p);
                            }}
                            className="mt-2 text-[11px] font-mono text-[#ffd88a] hover:underline flex items-center gap-1"
                          >
                            Xem Chi Tiết Tác Phẩm <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d4af37]/15 font-mono text-xs">
                  {/* Category & Exclusivity */}
                  <tr className="hover:bg-[#25211c]">
                    <td className="p-4 text-[#ded7cb] font-semibold flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      PHÂN LOẠI &amp; ĐỘ ĐỘC BẢN
                    </td>
                    {pieces.map((p) => (
                      <td key={p.id} className="p-4 text-white">
                        <div className="font-bold text-[#ffd88a]">{p.categoryLabel}</div>
                        <div className="text-[11px] text-[#c5baa9] mt-0.5">Giới hạn {p.totalEditions} bản toàn cầu</div>
                      </td>
                    ))}
                  </tr>

                  {/* Dimensions */}
                  <tr className="hover:bg-[#25211c]">
                    <td className="p-4 text-[#ded7cb] font-semibold flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-[#d4af37]" />
                      KÍCH THƯỚC PHỦ BÌ (D × R × C)
                    </td>
                    {pieces.map((p) => (
                      <td key={p.id} className="p-4 text-[#ffd88a] font-bold">
                        {p.dimensions}
                      </td>
                    ))}
                  </tr>

                  {/* Weight */}
                  <tr className="hover:bg-[#25211c]">
                    <td className="p-4 text-[#ded7cb] font-semibold flex items-center gap-2">
                      <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
                      TRỌNG LƯỢNG TẢI TRỌNG
                    </td>
                    {pieces.map((p) => (
                      <td key={p.id} className="p-4 text-white font-bold">
                        {p.weight}
                      </td>
                    ))}
                  </tr>

                  {/* Materiality */}
                  <tr className="hover:bg-[#25211c]">
                    <td className="p-4 text-[#ded7cb] font-semibold flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
                      VẬT LIỆU CHẾ TÁC CHỦ ĐẠO
                    </td>
                    {pieces.map((p) => (
                      <td key={p.id} className="p-4 text-[#ded7cb] font-sans text-xs">
                        {p.materiality}
                      </td>
                    ))}
                  </tr>

                  {/* Surface Finish */}
                  <tr className="hover:bg-[#25211c]">
                    <td className="p-4 text-[#ded7cb] font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                      BỀ MẶT HOÀN THIỆN
                    </td>
                    {pieces.map((p) => (
                      <td key={p.id} className="p-4 text-[#c5baa9] font-sans text-xs">
                        {p.finish}
                      </td>
                    ))}
                  </tr>

                  {/* Joinery */}
                  <tr className="hover:bg-[#25211c]">
                    <td className="p-4 text-[#ded7cb] font-semibold flex items-center gap-2">
                      <Hammer className="w-3.5 h-3.5 text-[#d4af37]" />
                      KỸ THUẬT MỘNG GHÉP
                    </td>
                    {pieces.map((p) => (
                      <td key={p.id} className="p-4 text-white font-sans text-xs">
                        {p.joinery}
                      </td>
                    ))}
                  </tr>

                  {/* Lead time */}
                  <tr className="hover:bg-[#25211c]">
                    <td className="p-4 text-[#ded7cb] font-semibold flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                      TIẾN ĐỘ THI CÔNG
                    </td>
                    {pieces.map((p) => (
                      <td key={p.id} className="p-4 text-[#ffd88a] font-bold">
                        {p.leadTime}
                      </td>
                    ))}
                  </tr>

                  {/* Provenance */}
                  <tr className="hover:bg-[#25211c]">
                    <td className="p-4 text-[#ded7cb] font-semibold">
                      XUẤT XỨ MỎ ĐÁ &amp; PHÂN XƯỞNG
                    </td>
                    {pieces.map((p) => (
                      <td key={p.id} className="p-4 text-[#c5baa9] font-sans text-[11px] leading-relaxed">
                        {p.provenance}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {pieces.length > 0 && (
          <div className="p-4 md:p-6 bg-[#1a1714] border-t border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="text-xs font-mono text-[#c5baa9]">
              {downloadSuccess ? (
                <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4" /> Đã kết xuất bảng thông số đối chiếu CAD &amp; PDF thành công.
                </span>
              ) : (
                <span>Đang chọn {pieces.length}/3 tác phẩm để lập hồ sơ đấu thầu &amp; ủy thác.</span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-4 py-2.5 border border-[#d4af37]/40 bg-[#25211c] text-[#ffd88a] hover:text-white hover:border-[#d4af37] text-xs font-label-caps uppercase font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Xuất Bảng So Sánh PDF
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="w-full sm:w-auto btn-monolith text-xs uppercase font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                Ủy Thác Bộ Sản Phẩm Này
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
