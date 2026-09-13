import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

interface FloatingConciergeButtonProps {
  onOpenBooking: () => void;
}

export const FloatingConciergeButton: React.FC<FloatingConciergeButtonProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onOpenBooking}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#1e1b17]/95 backdrop-blur-md border border-[#d4af37]/60 hover:border-[#ffd88a] text-[#fbf9f5] shadow-[0_4px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-300 hover:-translate-y-0.5"
        aria-label="Đặt lịch cố vấn kiến trúc độc bản"
      >
        {/* Glowing gold dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd88a] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
        </span>

        <Calendar className="w-4 h-4 text-[#ffd88a] group-hover:rotate-12 transition-transform duration-300" />

        <div className="flex flex-col text-left">
          <span className="font-label-caps text-[10.5px] uppercase tracking-[0.16em] text-[#ffd88a] font-bold leading-none">
            Đặt Lịch Khảo Sát
          </span>
          <span className="font-mono text-[9px] tracking-wider text-[#ded7cb] group-hover:text-white leading-none mt-1 hidden sm:inline">
            Cố Vấn 1:1 Với KTS Trưởng
          </span>
        </div>

        {/* Decorative architectural corner ticks */}
        <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#d4af37] opacity-60 group-hover:opacity-100 transition-opacity"></span>
        <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#d4af37] opacity-60 group-hover:opacity-100 transition-opacity"></span>
      </button>
    </div>
  );
};
