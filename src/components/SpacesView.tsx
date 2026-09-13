import React, { useState } from 'react';
import { SpaceTypology } from '../types';
import { SPACES_DATA } from '../data/spaces';
import { Sun, Volume2, Thermometer, ArrowRight, Check, Sparkles } from 'lucide-react';

interface SpacesViewProps {
  onOpenConsultation: () => void;
}

export const SpacesView: React.FC<SpacesViewProps> = ({ onOpenConsultation }) => {
  const [activeSpaceId, setActiveSpaceId] = useState<string>(SPACES_DATA[0].id);

  const activeSpace = SPACES_DATA.find(s => s.id === activeSpaceId) || SPACES_DATA[0];

  return (
    <div className="w-full pt-28 pb-20 px-4 md:px-8 lg:px-12 bg-[#191715] text-[#fbf9f5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="border-b border-[#d4af37]/25 pb-10 mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37] inline-block"></span>
            <span className="font-label-caps text-[#f5c065] uppercase tracking-[0.25em] text-xs font-bold">
              DANH MỤC 4 KHÔNG GIAN SỐNG TĨNH MỊCH
            </span>
          </div>
          <h1 className="font-display-hero text-white tracking-tight">
            Không Gian Tĩnh Lặng &amp; Cảm Giác Thức Tỉnh
          </h1>
          <p className="font-body-lead text-[#ded7cb] max-w-3xl mt-4 leading-relaxed">
            Các gian phòng không đơn thuần là nơi chứa các món đồ trang trí, mà là những môi trường cảm giác tinh tế được quy định bởi hình học ánh sáng, hệ thống tiêu âm triệt để và khả năng tích nhiệt tự nhiên của các phiến đá nguyên khối.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {SPACES_DATA.map((space) => {
            const isSelected = space.id === activeSpace.id;
            return (
              <button
                key={space.id}
                onClick={() => setActiveSpaceId(space.id)}
                className={`p-5 text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#d4af37] bg-gradient-to-b from-[#2b2721] to-[#201d19] text-white shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'border-[#443d33] bg-[#24211c] text-[#ded7cb] hover:border-[#d4af37]/60 hover:text-white'
                }`}
              >
                <div>
                  <span className={`font-mono text-[10px] block uppercase tracking-widest font-bold ${
                    isSelected ? 'text-[#ffd88a]' : 'text-[#f5c065]'
                  }`}>
                    LOẠI HÌNH {space.id.toUpperCase()}
                  </span>
                  <h3 className="font-serif text-lg font-medium mt-1 text-white">
                    {space.title}
                  </h3>
                </div>
                <span className={`text-xs font-mono mt-4 block ${
                  isSelected ? 'text-[#ffd88a]' : 'text-[#c5baa9]'
                }`}>
                  {space.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Space Spotlight */}
        <div className="bg-[#221f1a] border border-[#d4af37]/40 shadow-[0_0_35px_rgba(212,175,55,0.2)] overflow-hidden mb-16">
          {/* Main Visual */}
          <div className="relative aspect-[21/9] bg-[#2b2721] overflow-hidden">
            <img
              src={activeSpace.image}
              alt={activeSpace.title}
              className="w-full h-full object-cover brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#221f1a] via-[#221f1a]/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:left-12 right-6 md:right-12 text-white">
              <span className="font-label-caps text-[#ffd88a] text-xs uppercase tracking-[0.2em] block mb-1 font-bold">
                {activeSpace.subtitle}
              </span>
              <h2 className="font-headline-xl text-white font-serif">
                {activeSpace.title}
              </h2>
              <p className="font-serif italic text-lg text-[#ffd88a] max-w-2xl mt-1">
                &ldquo;{activeSpace.tagline}&rdquo;
              </p>
            </div>
          </div>

          {/* Sensory Metrics Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d4af37]/25 bg-[#26221c] border-b border-[#d4af37]/25">
            <div className="p-6 flex items-start gap-3">
              <Sun className="w-5 h-5 text-[#f5c065] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-[#c5baa9] uppercase block font-semibold">Độ Chiếu Sáng &amp; Ánh Nắng</span>
                <p className="font-serif text-base font-medium text-white mt-0.5">{activeSpace.luxLevel}</p>
              </div>
            </div>
            <div className="p-6 flex items-start gap-3">
              <Volume2 className="w-5 h-5 text-[#f5c065] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-[#c5baa9] uppercase block font-semibold">Tiêu Âm &amp; Giảm Âm Vang</span>
                <p className="font-serif text-base font-medium text-white mt-0.5">{activeSpace.reverbRating}</p>
              </div>
            </div>
            <div className="p-6 flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-[#f5c065] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-[#c5baa9] uppercase block font-semibold">Quán Tính Tích Nhiệt Địa Chất</span>
                <p className="font-serif text-base font-medium text-white mt-0.5">{activeSpace.thermalMass}</p>
              </div>
            </div>
          </div>

          {/* Narrative & Curation Notes */}
          <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-label-caps text-[#f5c065] text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                TẦM NHÌN THIẾT KẾ &amp; SỰ TĨNH LẶNG KHÔNG GIAN
              </h3>
              <p className="font-body-lead text-[#ded7cb] leading-relaxed">
                {activeSpace.description}
              </p>

              <div>
                <h4 className="font-label-caps uppercase text-[11px] tracking-wider text-[#ffd88a] mb-3 font-bold">
                  Tổ Hợp Vật Liệu Địa Chất &amp; Gỗ Tự Nhiên
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeSpace.keyMaterials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#2b2721] border border-[#d4af37]/35 text-xs font-mono text-[#ffd88a] font-medium"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#27231d] p-6 md:p-8 border border-[#d4af37]/35 space-y-4">
              <h3 className="font-label-caps text-[#f5c065] text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                QUY CHUẨN THI CÔNG NGUYÊN BẢN
              </h3>
              <ul className="space-y-3 font-body-muted text-xs text-[#ded7cb]">
                {activeSpace.curationNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#d4af37] mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#d4af37]/25">
                <button
                  onClick={onOpenConsultation}
                  className="btn-monolith w-full shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  Ủy Thác Thiết Kế Không Gian Này <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
