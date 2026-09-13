import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { ArrowRight, MapPin, Sliders, Maximize2, Compass, Layers, Sparkles } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenConsultation: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects = [],
  onSelectProject,
  onOpenConsultation
}) => {
  const [filter, setFilter] = useState<'all' | 'villa' | 'penthouse' | 'courtyard' | 'pavilion'>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCat = filter === 'all' || p.category === filter;
      const matchCountry =
        selectedCountry === 'all' ||
        p.country === selectedCountry ||
        (selectedCountry === 'Ý' && (p.country === 'Ý' || p.country === 'Italy')) ||
        (selectedCountry === 'Pháp' && (p.country === 'Pháp' || p.country === 'France')) ||
        (selectedCountry === 'Việt Nam' && (p.country === 'Việt Nam' || p.country === 'Vietnam'));
      return matchCat && matchCountry;
    });
  }, [projects, filter, selectedCountry]);

  return (
    <div className="w-full pt-28 pb-20 px-4 md:px-8 lg:px-12 bg-[#191715] text-[#fbf9f5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Page Header */}
        <div className="border-b border-[#d4af37]/25 pb-10 mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37] inline-block"></span>
            <span className="font-label-caps text-[#f5c065] uppercase tracking-[0.25em] text-xs font-bold">
              KHO LƯU TRỮ CÔNG TRÌNH KIỆT TÁC · 2023 — 2025
            </span>
          </div>
          <h1 className="font-display-hero text-white tracking-tight">
            Dinh Thự Tư Nhân Độc Bản
          </h1>
          <p className="font-body-lead text-[#ded7cb] max-w-3xl mt-4 leading-relaxed">
            Biên niên sử toàn diện về các dinh thự ẩn mình, penthouse đô thị và không gian triển lãm nghệ thuật được kiến tạo theo tỷ lệ nguyên khối, sức nặng địa chất vĩnh cửu và sự tĩnh lặng âm học tuyệt đối.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#d4af37]/20">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-label-caps uppercase">
            {[
              { id: 'all', label: 'Tất Cả Loại Hình' },
              { id: 'villa', label: 'Biệt Thự & Dinh Thự' },
              { id: 'penthouse', label: 'Penthouse Đô Thị' },
              { id: 'courtyard', label: 'Điền Trang Sân Trong' },
              { id: 'pavilion', label: 'Pavilion & Không Gian Nghệ Thuật' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2.5 border transition-all whitespace-nowrap font-bold ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                    : 'bg-[#24211c] text-[#ded7cb] border-[#443d33] hover:border-[#d4af37]/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Geographic Filter */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#c5baa9] font-medium">KHU VỰC:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-[#24211c] border border-[#d4af37]/35 px-3 py-1.5 focus:outline-none text-[#ffd88a] font-semibold"
            >
              <option value="all">Toàn Bộ Lãnh Thổ (Ý · Pháp · Việt Nam)</option>
              <option value="Ý">Ý (Hồ Como, Venice)</option>
              <option value="Pháp">Pháp (Paris, Aix-en-Provence)</option>
              <option value="Việt Nam">Việt Nam (Hà Nội, Tây Nguyên)</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-[#221f1a] border border-[#d4af37]/35 flex flex-col justify-between transition-all duration-300 hover:border-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
            >
              <div>
                {/* Visual */}
                <div
                  className="relative aspect-[16/10] bg-[#2b2721] overflow-hidden cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] px-3 py-1 font-mono text-[10px] uppercase tracking-wider font-bold shadow-md">
                    {project.categoryLabel}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-[#191715]/90 backdrop-blur-sm text-[#ffd88a] px-3 py-1 font-mono text-[10px] border border-[#d4af37]/45">
                    {project.coordinates}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#191715]/90 p-2 text-[#ffd88a] opacity-0 group-hover:opacity-100 transition-opacity border border-[#d4af37]/50">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Meta details */}
                <div className="p-8">
                  <div className="flex items-center justify-between text-xs font-mono text-[#c5baa9] mb-3">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                      {project.location}, {project.country}
                    </span>
                    <span className="text-[#ffd88a] font-semibold">HOÀN THÀNH {project.year}</span>
                  </div>

                  <h2
                    onClick={() => onSelectProject(project)}
                    className="font-serif text-3xl text-white cursor-pointer group-hover:text-[#ffd88a] transition-colors"
                  >
                    {project.title}
                  </h2>

                  <p className="font-serif text-base text-[#f5c065] italic mt-1">
                    {project.subtitle}
                  </p>

                  <p className="font-body-muted text-sm text-[#ded7cb] mt-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Materiality highlight */}
                  <div className="mt-6 p-4 bg-[#2a2620] border-l-2 border-[#d4af37] space-y-1 text-xs">
                    <span className="font-mono text-[10px] text-[#f5c065] uppercase block font-bold">
                      Bảng Vật Liệu Chủ Đạo
                    </span>
                    <p className="text-[#fbf9f5] font-medium">{project.materiality}</p>
                  </div>
                </div>
              </div>

              {/* Bottom spec bar */}
              <div className="p-8 pt-0">
                <div className="border-t border-[#d4af37]/20 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#ffd88a]">
                    <span>DIỆN TÍCH: {project.area}</span>
                    <span>·</span>
                    <span>THỂ TÍCH: {project.specs.grossVolume}</span>
                  </div>
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-2 font-label-caps uppercase text-xs tracking-wider text-[#ffd88a] hover:text-white transition-colors font-bold"
                  >
                    Chi Tiết Bản Vẽ &amp; Thông Số <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 p-10 bg-gradient-to-r from-[#211e19] via-[#2a2520] to-[#211e19] text-[#fbf9f5] flex flex-col md:flex-row items-center justify-between gap-6 border border-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <div>
            <span className="font-mono text-xs text-[#f5c065] uppercase tracking-widest block mb-1 font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              ỦY THÁC CÔNG TRÌNH TƯ NHÂN RIÊNG BIỆT
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white">
              Quý Khách Đang Lên Kế Hoạch Cho Một Dinh Thự Nguyên Khối?
            </h3>
            <p className="font-body-muted text-sm text-[#ded7cb] mt-2 max-w-xl leading-relaxed">
              Các đối tác kiến trúc sư trưởng của chúng tôi sẽ đồng hành cùng gia chủ từ khâu chọn vỉa đá tại mỏ khai thác đến cân chỉnh âm học thực địa sau cùng.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="btn-monolith shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Yêu Cầu Cuộc Hẹn Cố Vấn Bí Mật
          </button>
        </div>
      </div>
    </div>
  );
};
