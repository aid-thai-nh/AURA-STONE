import React from 'react';
import { PageView } from '../types';
import { Search, Menu, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenSearch: () => void;
  onOpenDrawer: () => void;
  onOpenClientPortal: () => void;
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenDrawer,
  onOpenClientPortal,
  onOpenBooking
}) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-[#181614]/95 backdrop-blur-md border-b border-[#d4af37]/30 transition-colors shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
      {/* Top micro coordinates bar - Hidden on mobile to keep screen clean and spacious */}
      <div className="hidden md:block w-full border-b border-[#d4af37]/20 bg-[#211e19] px-4 md:px-8 py-1.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between font-label-caps text-[10px] text-[#d6c8b4] tracking-[0.2em]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#d4af37] shadow-[0_0_8px_#d4af37] inline-block animate-pulse"></span>
            XƯỞNG KIẾN TRÚC &amp; GIÁM TUYỂN NỘI THẤT ĐỘC BẢN — MILAN · PARIS · HÀ NỘI
          </span>
          <span className="font-mono text-[10px] tracking-wider text-[#b8ae9f]">
            45°28'B 9°11'Đ · 48°51'B 2°21'Đ · 21°01'B 105°51'Đ
          </span>
        </div>
      </div>

      {/* Main navigation bar: Logo Left | Menu Center | Actions Right (1440px container) */}
      <div className="w-full px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto h-16 md:h-20 flex items-center justify-between gap-4">
          {/* 1. LEFT: LOGO */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="group flex items-center gap-3 text-left focus:outline-none"
              aria-label="Về trang chủ AURA & STONE"
            >
              {/* Dedicated Mobile Logo - Ultra clean, minimal, bespoke monogram badge */}
              <div className="flex md:hidden items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-[#2b2721] via-[#211e19] to-[#171513] border border-[#d4af37]/80 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:border-[#ffd88a] transition-colors">
                  <span className="font-serif text-[#ffd88a] text-xs font-bold tracking-tight">
                    A<span className="text-[#d4af37] text-[10px] mx-0.5">&amp;</span>S
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-[15px] text-[#fff6e6] tracking-[0.14em] font-medium group-hover:text-[#ffd88a] transition-colors leading-tight">
                    AURA &amp; STONE
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.25em] text-[#e5b74b] uppercase leading-none mt-0.5 font-bold">
                    ATELIER
                  </span>
                </div>
              </div>

              {/* Desktop Logo - Full Luxury Architectural Brand */}
              <div className="hidden md:flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-[#2e2923] to-[#1c1916] border border-[#d4af37]/70 flex items-center justify-center shadow-[0_0_14px_rgba(212,175,55,0.25)] group-hover:border-[#ffd88a] transition-all">
                  <span className="text-[#d4af37] text-xs group-hover:scale-110 transition-transform">◆</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg tracking-[0.22em] text-[#fff6e6] group-hover:text-[#ffd88a] transition-colors font-medium leading-tight">
                    AURA &amp; STONE
                  </span>
                  <span className="font-label-caps text-[8.5px] tracking-[0.3em] text-[#e5b74b] uppercase mt-0.5 leading-none font-bold">
                    Kiến Trúc &amp; Nội Thất Kiệt Tác
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* 2. CENTER: MENU (Desktop) - Concise 2-word labels for pristine spacing */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-6 xl:gap-9 px-2">
            <button
              onClick={() => onNavigate('projects')}
              className={`font-label-caps uppercase transition-all py-1.5 tracking-[0.16em] text-[11.5px] relative whitespace-nowrap ${
                currentPage === 'projects'
                  ? 'text-[#ffd88a] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#d4af37] after:shadow-[0_0_8px_#d4af37]'
                  : 'text-[#e0d9cd] hover:text-[#ffd88a]'
              }`}
            >
              Dinh Thự
            </button>
            <button
              onClick={() => onNavigate('spaces')}
              className={`font-label-caps uppercase transition-all py-1.5 tracking-[0.16em] text-[11.5px] relative whitespace-nowrap ${
                currentPage === 'spaces'
                  ? 'text-[#ffd88a] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#d4af37] after:shadow-[0_0_8px_#d4af37]'
                  : 'text-[#e0d9cd] hover:text-[#ffd88a]'
              }`}
            >
              Không Gian
            </button>
            <button
              onClick={() => onNavigate('furniture-collection')}
              className={`font-label-caps uppercase transition-all py-1.5 tracking-[0.16em] text-[11.5px] relative whitespace-nowrap ${
                currentPage === 'furniture-collection'
                  ? 'text-[#ffd88a] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#d4af37] after:shadow-[0_0_8px_#d4af37]'
                  : 'text-[#e0d9cd] hover:text-[#ffd88a]'
              }`}
            >
              Nội Thất
            </button>
            <button
              onClick={() => onNavigate('philosophy')}
              className={`font-label-caps uppercase transition-all py-1.5 tracking-[0.16em] text-[11.5px] relative whitespace-nowrap ${
                currentPage === 'philosophy'
                  ? 'text-[#ffd88a] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#d4af37] after:shadow-[0_0_8px_#d4af37]'
                  : 'text-[#e0d9cd] hover:text-[#ffd88a]'
              }`}
            >
              Triết Lý
            </button>
            <button
              onClick={() => onNavigate('journal')}
              className={`font-label-caps uppercase transition-all py-1.5 tracking-[0.16em] text-[11.5px] relative whitespace-nowrap ${
                currentPage === 'journal'
                  ? 'text-[#ffd88a] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#d4af37] after:shadow-[0_0_8px_#d4af37]'
                  : 'text-[#e0d9cd] hover:text-[#ffd88a]'
              }`}
            >
              Chuyên Khảo
            </button>
          </nav>

          {/* 3. RIGHT: ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop-only Consultation CTA - Opens Quick Booking Drawer */}
            <button
              onClick={() => {
                if (onOpenBooking) {
                  onOpenBooking();
                } else {
                  onNavigate('private-consultation');
                }
              }}
              className="hidden xl:inline-flex items-center justify-center px-4 py-2 border border-[#d4af37] bg-gradient-to-r from-[#d4af37]/25 to-[#ffd88a]/15 text-[#ffd88a] hover:from-[#d4af37] hover:to-[#f5c065] hover:text-[#0b0a09] transition-all font-label-caps uppercase tracking-[0.16em] text-[11px] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              Đặt Lịch Khảo Sát
            </button>

            {/* Search Button (Both Desktop & Mobile) */}
            <button
              onClick={onOpenSearch}
              aria-label="Tìm kiếm tư liệu lưu trữ"
              className="p-2 sm:p-2.5 text-[#f0e9dc] hover:text-[#ffd88a] hover:bg-[#25211c] border border-transparent hover:border-[#d4af37]/40 transition-all"
              title="Tìm kiếm tư liệu lưu trữ (Ctrl + K)"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </button>

            {/* Desktop-only Client Portal Button */}
            <button
              onClick={onOpenClientPortal}
              aria-label="Cổng Khách Hàng Thượng Lưu"
              className="hidden md:flex w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-[#0b0a09] items-center justify-center hover:scale-105 transition-all shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              title="Cổng khách hàng ủy thác"
            >
              <User className="w-4 h-4 font-bold" />
            </button>

            {/* Architectural Index & Atelier Coordinates Drawer Button */}
            <button
              onClick={onOpenDrawer}
              aria-label="Mục lục lưu trữ & Tọa độ phân xưởng"
              className="flex items-center gap-1.5 p-2 sm:p-2.5 text-[#f0e9dc] hover:text-[#ffd88a] hover:bg-[#25211c] border border-[#d4af37]/40 hover:border-[#d4af37] transition-all"
              title="Mục lục lưu trữ & Bản đồ phân xưởng Atelier"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
              <span className="hidden 2xl:inline font-label-caps text-[9px] uppercase tracking-wider text-[#ded7cb]">
                Mục Lục
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
