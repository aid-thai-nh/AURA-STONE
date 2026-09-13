import React, { useState } from 'react';
import { FurniturePiece } from '../types';
import { Drawer } from 'antd';
import { 
  X, 
  Trash2, 
  Scale, 
  Box, 
  Truck, 
  FileText, 
  Check, 
  Download, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';

interface CuratedDossierDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  curatedPieces: FurniturePiece[];
  onRemovePiece: (id: string) => void;
  onSelectPiece: (piece: FurniturePiece) => void;
  onProceedToConsultation: (summaryText: string) => void;
}

export const CuratedDossierDrawer: React.FC<CuratedDossierDrawerProps> = ({
  isOpen,
  onClose,
  curatedPieces,
  onRemovePiece,
  onSelectPiece,
  onProceedToConsultation
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Calculate total estimated weight
  const totalWeightKg = curatedPieces.reduce((acc, piece) => {
    const match = piece.weight.match(/(\d+)/);
    return acc + (match ? parseInt(match[0], 10) : 0);
  }, 0);

  // Estimated containers needed (each reinforced luxury stone crate container holds ~2-3 tons safely)
  const estimatedCrates = Math.max(1, Math.ceil(curatedPieces.length / 2));

  const handleDownloadDossier = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handleTransferToConsultation = () => {
    const titles = curatedPieces.map(p => `• ${p.title} (${p.edition}, ${p.dimensions}, ${p.weight})`).join('\n');
    const summary = `Ủy thác chế tác danh mục ${curatedPieces.length} tác phẩm điêu khắc độc bản:\n${titles}\nTổng tải trọng ước tính: ~${totalWeightKg} KG (${(totalWeightKg / 1000).toFixed(2)} Tấn đá & gỗ). Yêu cầu tư vấn kết cấu sàn và giải pháp cẩu nâng chuyên dụng.`;
    onClose();
    onProceedToConsultation(summary);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      placement="right"
      width={typeof window !== 'undefined' && window.innerWidth < 640 ? '100%' : 540}
      className="luxury-drawer"
      closable={false}
      styles={{
        body: {
          backgroundColor: '#1c1916',
          color: '#fbf9f5',
          padding: 0,
          borderLeft: '1px solid rgba(212, 175, 55, 0.35)',
        }
      }}
    >
      <div className="flex flex-col h-full bg-[#1c1916]">
        {/* Header */}
        <div className="p-6 bg-[#161412] border-b border-[#d4af37]/25 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffd88a]" />
              <span className="font-label-caps text-[#f5c065] text-[10px] tracking-[0.25em] uppercase font-bold">
                BỘ SƯU TẬP TUYỂN CHỌN CỦA GIA CHỦ
              </span>
            </div>
            <h3 className="font-serif text-2xl text-white mt-1">
              Hồ Sơ Tuyển Chọn Độc Bản ({curatedPieces.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[#d4af37]/40 text-[#ffd88a] hover:bg-[#d4af37] hover:text-[#0b0a09] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {curatedPieces.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Box className="w-10 h-10 text-[#ffd88a] mx-auto stroke-[1.2]" />
              <h4 className="font-serif text-lg text-white">Chưa có tác phẩm nào được lưu trữ</h4>
              <p className="text-xs font-body-muted text-[#ded7cb] max-w-xs mx-auto leading-relaxed">
                Nhấn biểu tượng dấu sao / tuyển chọn trên các tác phẩm đá và gỗ để tạo lập hồ sơ ủy thác tổng thể cho dinh thự của quý khách.
              </p>
            </div>
          ) : (
            <>
              {/* Aggregate Specs Dashboard Box */}
              <div className="bg-[#24201c] border border-[#d4af37]/35 p-4 space-y-3">
                <div className="font-mono text-[10.5px] uppercase tracking-wider text-[#ffd88a] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  TỔNG HỢP KHỐI LƯỢNG &amp; VẬN HÀNH LOGISTICS
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 bg-[#191715] border border-[#d4af37]/20">
                    <span className="text-[#a89e90] block text-[10px]">TỔNG TẢI TRỌNG ƯỚC TÍNH</span>
                    <strong className="text-white text-sm">~{totalWeightKg} KG</strong>
                    <span className="text-[10px] text-[#ffd88a] block">({(totalWeightKg / 1000).toFixed(2)} Tấn vật liệu)</span>
                  </div>
                  <div className="p-2.5 bg-[#191715] border border-[#d4af37]/20">
                    <span className="text-[#a89e90] block text-[10px]">THÙNG ĐÓNG GÓI CHỐNG SỐC</span>
                    <strong className="text-white text-sm">{estimatedCrates} Khung Kiện</strong>
                    <span className="text-[10px] text-[#ffd88a] block">Thùng gỗ thông Bắc Âu</span>
                  </div>
                </div>
                <p className="text-[11px] font-mono text-[#c5baa9] leading-relaxed">
                  * Trọng lượng trên yêu cầu kiểm tra khả năng chịu tải sàn bê tông và lối tiếp cận cẩu tháp đưa vào công trình.
                </p>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {curatedPieces.map((piece) => (
                  <div
                    key={piece.id}
                    className="p-4 bg-[#221f1a] border border-[#d4af37]/25 flex items-start justify-between gap-4 hover:border-[#d4af37]/60 transition-all"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className="w-16 h-16 bg-[#1a1714] shrink-0 border border-[#d4af37]/30 overflow-hidden cursor-pointer"
                        onClick={() => {
                          onClose();
                          onSelectPiece(piece);
                        }}
                      >
                        <img src={piece.image} alt={piece.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[9.5px] text-[#f5c065] uppercase font-bold block">
                          {piece.edition}
                        </span>
                        <h4
                          onClick={() => {
                            onClose();
                            onSelectPiece(piece);
                          }}
                          className="font-serif text-sm text-white hover:text-[#ffd88a] cursor-pointer truncate"
                        >
                          {piece.title}
                        </h4>
                        <div className="text-[11px] font-mono text-[#c5baa9] mt-1 space-y-0.5">
                          <div>Kích thước: <span className="text-[#ffd88a]">{piece.dimensions}</span></div>
                          <div>Trọng lượng: <span className="text-[#ffd88a]">{piece.weight}</span></div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemovePiece(piece.id)}
                      className="p-1.5 text-[#a89e90] hover:text-red-400 border border-transparent hover:border-red-400/40 transition-colors shrink-0"
                      title="Gỡ khỏi danh mục"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {curatedPieces.length > 0 && (
          <div className="p-6 bg-[#161412] border-t border-[#d4af37]/25 space-y-3 shrink-0">
            {downloadSuccess && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4" /> Bản tóm lược kỹ thuật danh mục đã được tạo lập thành công.
              </div>
            )}
            <button
              onClick={handleTransferToConsultation}
              className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f5c065] to-[#b8860b] text-[#0b0a09] font-label-caps uppercase text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all"
            >
              Chuyển Vào Hồ Sơ Ủy Thác Dinh Thự <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadDossier}
              className="w-full py-2.5 border border-[#d4af37]/45 text-[#ffd88a] hover:text-white hover:border-[#d4af37] bg-[#221f1a] font-label-caps uppercase text-[11px] font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Xuất Danh Mục Tác Phẩm (PDF &amp; CAD)
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
};
