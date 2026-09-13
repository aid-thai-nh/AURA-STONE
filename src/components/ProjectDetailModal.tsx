import React, { useState } from 'react';
import { Project } from '../types';
import { X, MapPin, Compass, Sliders, ArrowRight, Download, Check, Volume2, Sun, Eye, Sparkles } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestDossier: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestDossier
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'blueprint' | 'specs' | 'acoustics'>('overview');
  const [dossierDownloaded, setDossierDownloaded] = useState(false);

  if (!project) return null;

  const handleDownloadFolio = () => {
    setDossierDownloaded(true);
    setTimeout(() => setDossierDownloaded(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-5xl bg-[#221f1a] text-[#fbf9f5] border border-[#d4af37]/45 shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in duration-200">
        {/* Header Bar */}
        <div className="p-4 md:p-6 bg-[#1c1916] text-[#fbf9f5] flex items-center justify-between border-b border-[#d4af37]/35">
          <div>
            <span className="font-label-caps text-[#f5c065] text-[10px] tracking-[0.25em] uppercase block font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
              HỒ SƠ THÔNG SỐ KIẾN TRÚC · {project.categoryLabel}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-white mt-1">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[#d4af37]/40 text-[#ffd88a] hover:bg-[#d4af37] hover:text-[#0b0a09] transition-colors"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Visual Feature */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#2b2721] overflow-hidden">
            <img
              src={project.galleryImages[activeImageIndex] || project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500 brightness-95"
            />
            {/* Gallery Selector overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex gap-2">
                {project.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-8 border overflow-hidden transition-all ${
                      activeImageIndex === idx ? 'border-[#ffd88a] scale-105 shadow-[0_0_10px_#d4af37]' : 'border-white/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Ảnh nhỏ" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="bg-[#191715]/90 text-[#ffd88a] px-3 py-1 font-mono text-[10px] border border-[#d4af37]/45 font-bold">
                GÓC NHÌN {activeImageIndex + 1} / {project.galleryImages.length}
              </div>
            </div>
          </div>

          {/* Quick Spec Ribbon */}
          <div className="bg-[#27231d] border-b border-[#d4af37]/25 px-6 py-3.5 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[#c5baa9] font-mono text-[10px] block uppercase font-medium">Tọa Độ Địa Lý</span>
              <span className="font-mono font-bold text-[#ffd88a]">{project.coordinates}</span>
            </div>
            <div>
              <span className="text-[#c5baa9] font-mono text-[10px] block uppercase font-medium">Diện Tích Thông Thủy</span>
              <span className="font-serif text-sm font-semibold text-white">{project.area}</span>
            </div>
            <div>
              <span className="text-[#c5baa9] font-mono text-[10px] block uppercase font-medium">Năm Hiện Thực Hóa</span>
              <span className="font-serif text-sm font-semibold text-white">{project.year}</span>
            </div>
            <div>
              <span className="text-[#c5baa9] font-mono text-[10px] block uppercase font-medium">Địa Điểm</span>
              <span className="font-serif text-sm font-semibold text-white">{project.location}, {project.country}</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-[#d4af37]/25 px-6 flex gap-6 bg-[#201d18] text-xs font-label-caps uppercase overflow-x-auto">
            {[
              { id: 'overview', label: 'Tổng Quan &amp; Kết Cấu' },
              { id: 'specs', label: 'Bảng Thông Số Kỹ Thuật' },
              { id: 'blueprint', label: 'Mặt Bằng &amp; Trục Không Gian' },
              { id: 'acoustics', label: 'Âm Học &amp; Vi Khí Hậu' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 border-b-2 transition-colors whitespace-nowrap font-bold ${
                  activeTab === tab.id
                    ? 'border-[#d4af37] text-[#ffd88a]'
                    : 'border-transparent text-[#c5baa9] hover:text-white'
                }`}
                dangerouslySetInnerHTML={{ __html: tab.label }}
              />
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-10">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-label-caps text-[#f5c065] text-xs uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                    TẦM NHÌN KIẾN TRÚC &amp; ĐỊA THẾ CÔNG TRÌNH
                  </h3>
                  <p className="font-serif text-xl md:text-2xl text-white leading-snug">
                    &ldquo;{project.architecturalIntent}&rdquo;
                  </p>
                </div>

                <div className="border-t border-[#d4af37]/20 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-label-caps uppercase text-[11px] tracking-wider text-[#ffd88a] mb-3 font-semibold">
                      Bảng Vật Liệu Chủ Đạo
                    </h4>
                    <p className="font-body-muted text-[#d6cebf] leading-relaxed">
                      {project.materiality}
                    </p>
                    <div className="mt-4 p-4 bg-[#181614] border-l-2 border-[#d4af37] text-xs font-body-muted text-[#cbbba0]">
                      Mọi phiến đá tự nhiên đều được cắt tia nước theo niêm độ và mài thủ công bằng sáp ong hữu cơ, không sử dụng hóa chất phủ bóng nhân tạo.
                    </div>
                  </div>
                  <div>
                    <h4 className="font-label-caps uppercase text-[11px] tracking-wider text-[#ffd88a] mb-3 font-semibold">
                      Ánh Sáng &amp; Cảm Giác Không Gian
                    </h4>
                    <p className="font-body-muted text-[#d6cebf] leading-relaxed">
                      {project.lightSystem}
                    </p>
                    <p className="font-body-muted text-[#a89e90] text-xs mt-3">
                      Cân chỉnh âm học: {project.acousticCuration}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-6">
                <h3 className="font-label-caps text-[#f5c065] text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                  HỒ SƠ KỸ THUẬT &amp; NGUỒN GỐC MỎ ĐÁ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-[#d4af37]/25 bg-[#181614]">
                    <span className="font-mono text-[10px] text-[#a89e90] uppercase block">Khối Tích Không Gian Nội Thất</span>
                    <span className="font-serif text-lg font-medium text-white">{project.specs.grossVolume}</span>
                  </div>
                  <div className="p-4 border border-[#d4af37]/25 bg-[#181614]">
                    <span className="font-mono text-[10px] text-[#a89e90] uppercase block">Cao Độ Trần Kiến Trúc</span>
                    <span className="font-serif text-lg font-medium text-white">{project.specs.ceilingDatum}</span>
                  </div>
                  <div className="p-4 border border-[#d4af37]/25 bg-[#181614]">
                    <span className="font-mono text-[10px] text-[#a89e90] uppercase block">Nguồn Gốc Mỏ Khai Thác Đá</span>
                    <span className="font-serif text-base font-medium text-[#ffd88a]">{project.specs.stoneQuarry}</span>
                  </div>
                  <div className="p-4 border border-[#d4af37]/25 bg-[#181614]">
                    <span className="font-mono text-[10px] text-[#a89e90] uppercase block">Hệ Gỗ Mộc Ghép Nối</span>
                    <span className="font-serif text-base font-medium text-[#ffd88a]">{project.specs.joineryTimber}</span>
                  </div>
                  <div className="p-4 border border-[#d4af37]/25 bg-[#181614]">
                    <span className="font-mono text-[10px] text-[#a89e90] uppercase block">Thời Gian Triệt Tiêu Âm Vang</span>
                    <span className="font-serif text-base font-medium text-[#ffd88a]">{project.specs.reverbDecay}</span>
                  </div>
                  <div className="p-4 border border-[#d4af37]/25 bg-[#181614]">
                    <span className="font-mono text-[10px] text-[#a89e90] uppercase block">Hệ Thống Dẫn Khí Vi Mô</span>
                    <span className="font-serif text-base font-medium text-[#ffd88a]">{project.specs.airDisplacement}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blueprint' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-label-caps text-[#f5c065] text-xs uppercase tracking-widest font-bold">
                    SƠ ĐỒ TRỤC ĐO HÌNH HỌC TECTONIC
                  </h3>
                  <span className="font-mono text-[10px] text-[#ffd88a]">LƯỚI KẾT CẤU: 1200MM × 1200MM</span>
                </div>

                {/* Blueprint container */}
                <div className="w-full bg-[#0a0908] p-8 border border-[#d4af37]/40 text-[#f5f2eb] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  <div className="relative z-10 border border-[#d4af37]/50 p-8 space-y-6">
                    <div className="flex justify-between items-start border-b border-[#d4af37]/30 pb-4">
                      <div>
                        <span className="font-mono text-xs text-[#f5c065] block">TẦNG 01 / CỐT NỀN ĐỊA HÌNH CHUẨN</span>
                        <span className="font-serif text-xl text-white">{project.title} — Gian Phòng Trọng Tâm</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#a89e90]">TỶ LỆ 1:100 @ KHỔ A1</span>
                    </div>

                    {/* Vector Floorplan diagram */}
                    <div className="grid grid-cols-3 gap-3 font-mono text-[10px] text-[#e4ded5]">
                      <div className="border border-[#d4af37]/40 p-6 flex flex-col justify-between h-32 bg-[#161412]/80">
                        <span className="text-[#ffd88a] font-bold">KHU A: KHỐI SINH HOẠT CHÍNH</span>
                        <span>CỐT ĐÁ: +0.00M</span>
                      </div>
                      <div className="border border-[#d4af37]/40 p-6 flex flex-col justify-between h-32 bg-[#161412]/80">
                        <span className="text-[#ffd88a] font-bold">KHU B: HỒ NƯỚC TĨNH LẶNG</span>
                        <span>ĐỘ SÂU NƯỚC: -0.45M</span>
                      </div>
                      <div className="border border-[#d4af37]/40 p-6 flex flex-col justify-between h-32 bg-[#161412]/80">
                        <span className="text-[#ffd88a] font-bold">KHU C: THƯ VIỆN GỖ SỒI</span>
                        <span>CÁCH ÂM: STC 58</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#a89e90] font-body-muted pt-2 border-t border-[#d4af37]/20">
                      Mọi kích thước đã được kiểm định thực địa. Tường ngăn kết cấu thi công bằng đá travertine nguyên khối và vữa vôi thủy lực.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'acoustics' && (
              <div className="space-y-6">
                <h3 className="font-label-caps text-[#f5c065] text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                  CÂN CHỈNH ÂM HỌC &amp; VỎ BỌC VI KHÍ HẬU
                </h3>
                <div className="p-6 bg-[#181614] border-l-2 border-[#d4af37] space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <Volume2 className="w-5 h-5 text-[#d4af37]" />
                    <span className="font-serif text-lg font-medium">Chỉ Số Giảm Âm Vang: Triệt tiêu 42 dB tiếng ồn môi trường</span>
                  </div>
                  <p className="font-body-muted text-sm text-[#d6cebf] leading-relaxed">
                    Bằng việc tách chấn các vách tường bên trong với gioăng cao su đàn hồi giảm chấn và nhồi lớp sợi nỉ len cừu tự nhiên vào khoang rỗng sâu, môi trường bên trong đạt mức tĩnh mịch ngang tầm bảo tàng nghệ thuật quốc gia (26-28 dBA).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 md:p-6 bg-[#161412] border-t border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#a89e90]">
            MÃ LƯU TRỮ: AS-PROJ-{project.id.toUpperCase()}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownloadFolio}
              className="w-full sm:w-auto px-5 py-3 border border-[#d4af37]/40 bg-[#12110f] hover:border-[#d4af37] text-[#ffd88a] hover:text-white transition-all font-label-caps uppercase text-[11px] font-bold flex items-center justify-center gap-2"
            >
              {dossierDownloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> Bản Tóm Tắt Đã Xuất Bản
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> Tải Hồ Sơ Lưu Trữ PDF
                </>
              )}
            </button>
            <button
              onClick={() => {
                onRequestDossier(project.title);
                onClose();
              }}
              className="btn-monolith w-full sm:w-auto shadow-[0_0_15px_rgba(212,175,55,0.25)]"
            >
              Ủy Thác Không Gian Tương Tự <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
