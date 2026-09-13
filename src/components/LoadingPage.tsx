import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LoadingPageProps {
  onLoaded: () => void;
}

const LOADING_STAGES = [
  { progress: 20, label: 'Khởi tạo tỷ lệ vàng & Định hình trắc diện nguyên khối...' },
  { progress: 50, label: 'Truy xuất mẫu vỉa đá Tivoli Travertine & Nero Marquina...' },
  { progress: 80, label: 'Hiệu chỉnh trường sáng sinh học 2400K & Thẩm âm tu viện...' },
  { progress: 100, label: 'Hoàn tất kiến tạo không gian tĩnh mịch.' }
];

export const LoadingPage: React.FC<LoadingPageProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onLoaded, 500);
          }, 350);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 5;
        const next = Math.min(100, prev + increment);

        // Update stage text based on next progress
        if (next >= 85) setStageIndex(3);
        else if (next >= 50) setStageIndex(2);
        else if (next >= 25) setStageIndex(1);
        else setStageIndex(0);

        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onLoaded]);

  const handleSkip = () => {
    setProgress(100);
    setIsFinished(true);
    setTimeout(onLoaded, 250);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="architectural-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#12100e] text-[#fbf9f5] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
        >
          {/* Subtle Background Architectural Blueprint Grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(to right, #d4af37 1px, transparent 1px),
                                linear-gradient(to bottom, #d4af37 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />

          {/* Ambient Warm Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 blur-[140px] pointer-events-none" />

          {/* Top Bar / Telemetry */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#c5baa9] border-b border-[#d4af37]/20 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#d4af37] inline-block animate-pulse shadow-[0_0_8px_#d4af37]" />
              <span className="tracking-[0.2em] text-[#ffd88a] uppercase font-bold">
                AURA &amp; STONE · ATELIER V4.0
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[#ded7cb]">
              <span>MILANO [45°28&apos;B]</span>
              <span>PARIS [48°51&apos;B]</span>
              <span>HÀ NỘI [21°01&apos;B]</span>
            </div>
            <button
              onClick={handleSkip}
              className="text-[#ffd88a] hover:text-white transition-colors flex items-center gap-1.5 uppercase font-mono tracking-wider font-semibold"
            >
              Vào Ngay <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Brand Identity */}
          <div className="relative z-10 max-w-2xl mx-auto text-center my-auto py-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#201d19] border border-[#d4af37]/35 mb-6 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#ffd88a] font-bold">
                ẤN BẢN KIẾN TRÚC &amp; ĐIÊU KHẮC NGUYÊN KHỐI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl text-white tracking-widest font-normal uppercase leading-tight"
            >
              AURA &amp; STONE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif italic text-[#ded7cb] text-base sm:text-xl mt-3 tracking-wide"
            >
              &ldquo;Sự tĩnh lặng tột cùng của đá travertine La Mã và tỷ lệ nguyên khối.&rdquo;
            </motion.p>
          </div>

          {/* Bottom Progress Telemetry */}
          <div className="relative z-10 max-w-xl w-full mx-auto space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#ded7cb] text-[11px] truncate pr-4">
                {LOADING_STAGES[stageIndex].label}
              </span>
              <span className="text-[#ffd88a] font-bold tracking-widest text-sm">
                {progress}%
              </span>
            </div>

            {/* Precision Hairline Gold Progress Bar */}
            <div className="w-full h-[2px] bg-[#2a2620] overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#d4af37] via-[#ffd88a] to-[#d4af37] shadow-[0_0_12px_#d4af37]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-[#8e8477] pt-1">
              <span>HỆ THỐNG: TIẾP NHẬN TỐI ĐA 12 CÔNG TRÌNH / NĂM</span>
              <span>BẢO MẬT NDA ĐA QUỐC GIA</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
