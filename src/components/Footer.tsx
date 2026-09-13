import React from 'react';
import { PageView } from '../types';
import { ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenConsultation: () => void;
  onDownloadMonograph: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultation,
  onDownloadMonograph
}) => {
  return (
    <footer className="w-full bg-[#181614] text-[#fbf9f4] border-t border-[#d4af37]/35 relative overflow-hidden">
      {/* Subtle glowing ambient background effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b8860b]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Atelier Locations */}
          <div className="border-l-2 border-[#d4af37]/50 pl-5">
            <h3 className="font-label-caps uppercase tracking-[0.2em] text-[#f5c065] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
              Văn Phòng &amp; Xưởng Atelier
            </h3>
            <div className="space-y-4 font-body-muted text-[#e4ded5]">
              <div className="leading-relaxed">
                <strong className="text-[#ffd88a] font-medium block">Milano Quadrilatero</strong>
                Via Santo Spirito, 14<br />
                20121 Milano, Ý
              </div>
              <div className="leading-relaxed">
                <strong className="text-[#ffd88a] font-medium block">Paris Saint-Germain</strong>
                Rue Bonaparte, 28<br />
                75006 Paris, Pháp
              </div>
              <div className="leading-relaxed">
                <strong className="text-[#ffd88a] font-medium block">Hà Nội Phố Cổ &amp; Hoàn Kiếm</strong>
                18 Tràng Tiền, Hoàn Kiếm<br />
                Hà Nội, Việt Nam
              </div>
            </div>
          </div>

          {/* Curated Collections */}
          <div className="border-l-2 border-[#d4af37]/50 pl-5">
            <h3 className="font-label-caps uppercase tracking-[0.2em] text-[#f5c065] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
              Bộ Sưu Tập Giám Tuyển
            </h3>
            <nav className="flex flex-col space-y-2.5">
              <button
                onClick={() => onNavigate('projects')}
                className="text-left font-body-muted text-[#d6cebf] hover:text-[#ffd88a] transition-colors flex items-center justify-between group"
              >
                <span>Dinh Thự Đá Nguyên Khối</span>
                <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
              <button
                onClick={() => onNavigate('spaces')}
                className="text-left font-body-muted text-[#d6cebf] hover:text-[#ffd88a] transition-colors flex items-center justify-between group"
              >
                <span>Không Gian Khoáng Đạt Tĩnh Lặng</span>
                <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
              <button
                onClick={() => onNavigate('philosophy')}
                className="text-left font-body-muted text-[#d6cebf] hover:text-[#ffd88a] transition-colors flex items-center justify-between group"
              >
                <span>Nghệ Thuật Đồng Thau Patina</span>
                <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
              <button
                onClick={() => onNavigate('furniture-collection')}
                className="text-left font-body-muted text-[#d6cebf] hover:text-[#ffd88a] transition-colors flex items-center justify-between group"
              >
                <span>Đồ Gỗ &amp; Bàn Đá Travertine</span>
                <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
              <button
                onClick={() => onNavigate('furniture-collection')}
                className="text-left font-body-muted text-[#d6cebf] hover:text-[#ffd88a] transition-colors flex items-center justify-between group"
              >
                <span>Thiết Bị Chiếu Sáng Điêu Khắc</span>
                <span className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            </nav>
          </div>

          {/* Private Commissions */}
          <div className="border-l-2 border-[#d4af37]/50 pl-5">
            <h3 className="font-label-caps uppercase tracking-[0.2em] text-[#f5c065] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
              Ủy Thác Độc Bản
            </h3>
            <p className="font-body-muted text-[#d6cebf] mb-4 leading-relaxed">
              Hợp tác trực tiếp cùng các kiến trúc sư trưởng để kiến tạo những dinh thự nghỉ dưỡng và biệt phủ độc bản trên toàn cầu.
            </p>
            <div className="space-y-1">
              <span className="block font-label-caps text-[#c59238] uppercase tracking-wider text-[10px]">
                Email Liên Hệ Trực Tiếp
              </span>
              <a
                className="font-body-muted text-[#ffd88a] hover:text-white transition-colors border-b border-[#d4af37]/40 pb-0.5 inline-block font-mono text-sm"
                href="mailto:atelier@auraandstone.com"
              >
                atelier@auraandstone.com
              </a>
            </div>
            <div className="mt-5">
              <button
                onClick={onOpenConsultation}
                className="inline-block font-label-caps uppercase tracking-[0.16em] text-[#0b0a09] bg-gradient-to-r from-[#d4af37] to-[#f5c065] font-bold px-4 py-2 hover:scale-[1.02] transition-all text-[11px] shadow-[0_0_15px_rgba(212,175,55,0.25)]"
              >
                Yêu Cầu Hồ Sơ Cố Vấn
              </button>
            </div>
          </div>

          {/* Press & Monographs */}
          <div className="border-l-2 border-[#d4af37]/50 pl-5">
            <h3 className="font-label-caps uppercase tracking-[0.2em] text-[#f5c065] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
              Báo Chí &amp; Chuyên Khảo
            </h3>
            <div className="space-y-2">
              <p className="font-body-muted text-[#d6cebf] leading-relaxed">
                Chuyên khảo Tập IV: &ldquo;Sự Tĩnh Lặng và Đá Mài Mịn&rdquo; phát hành giới hạn kèm bìa vải bọc thủ công.
              </p>
              <button
                onClick={onDownloadMonograph}
                className="inline-flex items-center gap-2 font-label-caps uppercase tracking-wider text-[#ffd88a] hover:text-white transition-colors text-[11px] pt-1 font-semibold"
              >
                Tải Trích Đoạn Chuyên Khảo <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="pt-4 border-t border-[#d4af37]/20 mt-4">
                <span className="font-label-caps text-[#c59238] block uppercase text-[10px] mb-1">
                  Vinh Danh &amp; Báo Chí Quốc Tế
                </span>
                <span className="font-body-muted text-[#e4ded5] text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#d4af37]" />
                  AD100 · Elle Decor Italia · Cereal Magazine
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Row */}
        <div className="mt-16 pt-6 border-t border-[#d4af37]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <span className="font-label-caps tracking-[0.18em] text-[#cbbba0] uppercase text-[10px]">
            &copy; 2025 AURA &amp; STONE — KIẾN TRÚC &amp; NỘI THẤT NGUYÊN KHỐI. TRƯỜNG TỒN VỚI THỜI GIAN.
          </span>
          <div className="flex items-center gap-6 font-label-caps text-[#cbbba0] uppercase tracking-widest text-[10px]">
            <span className="flex items-center gap-1 text-[#d4af37]">
              <ShieldCheck className="w-3.5 h-3.5" /> Bảo Mật Thượng Lưu
            </span>
            <span>Quy Chuẩn Hình Học 90° Tectonic</span>
            <span>Milan · Paris · Hà Nội</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
