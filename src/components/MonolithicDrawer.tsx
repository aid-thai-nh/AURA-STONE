import React from 'react';
import { PageView } from '../types';
import { X, ArrowUpRight, MapPin, Compass, Sparkles, Lock, User } from 'lucide-react';
import { ATELIER_LOCATIONS } from '../data/journal';

interface MonolithicDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageView) => void;
  currentPage: PageView;
  onOpenClientPortal?: () => void;
}

export const MonolithicDrawer: React.FC<MonolithicDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentPage,
  onOpenClientPortal
}) => {
  if (!isOpen) return null;

  const handleLinkClick = (page: PageView) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
      {/* Drawer Container in Obsidian & Gold Accent */}
      <div className="w-full max-w-xl h-full bg-[#201d18] text-[#fbf9f5] border-l border-[#d4af37]/45 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-y-auto p-6 md:p-12 animate-in slide-in-from-right duration-300">
        <div>
          {/* Top Row: Brand & Close */}
          <div className="flex items-center justify-between border-b border-[#d4af37]/25 pb-6 mb-8">
            <div>
              <span className="font-label-caps text-[#f5c065] uppercase tracking-[0.25em] text-[10px] block font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                DANH MỤC ATELIER &amp; MỤC LỤC LƯU TRỮ
              </span>
              <span className="font-serif text-2xl tracking-wider text-white font-medium">
                AURA &amp; STONE
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 border border-[#d4af37]/40 text-[#ffd88a] hover:text-white hover:border-[#ffd88a] transition-colors"
              aria-label="Đóng bảng điều hướng"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Primary Navigation Monolith */}
          <div className="space-y-4 mb-10">
            <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-widest block mb-2 font-bold">
              CÁC PHÂN MỤC KIẾN TRÚC TRỌNG TÂM
            </span>
            <nav className="flex flex-col space-y-1">
              {[
                { id: 'home', label: '01 · Tổng Quan & Tuyên Ngôn Khối Khí' },
                { id: 'projects', label: '02 · Bộ Sưu Tập Dinh Thự Tư Nhân' },
                { id: 'spaces', label: '03 · Các Loại Hình Không Gian & Thánh Đường' },
                { id: 'furniture-collection', label: '04 · Tác Phẩm Nội Thất Nguyên Khối' },
                { id: 'philosophy', label: '05 · Triết Lý Địa Chất & Nguồn Gốc Mỏ Đá' },
                { id: 'journal', label: '06 · Chuyên Khảo & Ấn Phẩm Nghiên Cứu' },
                { id: 'private-consultation', label: '07 · Khởi Tạo Ủy Thác Tư Nhân' },
              ].map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id as PageView)}
                    className={`group flex items-center justify-between w-full text-left py-3 px-4 border transition-all ${
                      isActive
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#ffd88a] shadow-[0_0_15px_rgba(212,175,55,0.2)] font-semibold'
                        : 'border-transparent hover:border-[#d4af37]/30 hover:bg-white/5 text-[#ded7cb] hover:text-white'
                    }`}
                  >
                    <span className="font-serif text-lg md:text-xl tracking-wide">
                      {item.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#ffd88a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Atelier Hubs */}
          <div className="border-t border-[#d4af37]/25 pt-6 space-y-4">
            <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-widest block font-bold">
              TỌA ĐỘ VĂN PHÒNG &amp; PHÂN XƯỞNG THỰC ĐỊA
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-body-muted">
              {ATELIER_LOCATIONS.map((loc) => (
                <div key={loc.city} className="border border-[#d4af37]/30 p-3 bg-[#27231d]">
                  <span className="font-label-caps text-[#ffd88a] block text-[10px] uppercase font-bold">
                    {loc.city}
                  </span>
                  <p className="text-[#ded7cb] text-[11px] mt-1">{loc.address}</p>
                  <p className="font-mono text-[10px] text-[#c5baa9] mt-2">{loc.coordinates}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="border-t border-[#d4af37]/25 pt-6 mt-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#c5baa9]">
              <span>Mã Lưu Trữ: </span>
              <span className="font-mono text-[#ffd88a] font-semibold">AS-2025-ARCHIVE</span>
            </div>
            <button
              onClick={() => handleLinkClick('private-consultation')}
              className="btn-monolith w-full sm:w-auto text-[11px]"
            >
              Yêu Cầu Hồ Sơ Ủy Thác
            </button>
          </div>

          {onOpenClientPortal && (
            <button
              onClick={() => {
                onClose();
                onOpenClientPortal();
              }}
              className="w-full py-2.5 px-4 bg-[#27231d] border border-[#d4af37]/35 hover:border-[#d4af37] text-xs font-mono text-[#ffd88a] flex items-center justify-center gap-2 transition-colors uppercase tracking-wider font-bold"
            >
              <Lock className="w-3.5 h-3.5 text-[#d4af37]" /> Cổng Khách Hàng Bảo Mật (AS-2025-MIL)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
