import React, { useState } from 'react';
import { Project, FurniturePiece, PageView } from '../types';
import { ArrowRight, Compass, Maximize2, Shield, Eye, MapPin, Sparkles, SunMedium, Moon, Flame, Gem } from 'lucide-react';
import { ConsultationSection } from './ConsultationSection';

interface HomeViewProps {
  projects: Project[];
  furniture: FurniturePiece[];
  onSelectProject: (project: Project) => void;
  onSelectFurniture: (piece: FurniturePiece) => void;
  onNavigate: (page: PageView) => void;
  onOpenBooking?: () => void;
}

export type LightMood = 'amber-gold' | 'emerald-bronze' | 'obsidian-gold' | 'travertine-wine';

export const HomeView: React.FC<HomeViewProps> = ({
  projects = [],
  furniture = [],
  onSelectProject,
  onSelectFurniture,
  onNavigate,
  onOpenBooking
}) => {
  const [activeMood, setActiveMood] = useState<LightMood>('amber-gold');

  const moodConfig = {
    'amber-gold': {
      name: 'Hoàng Hôn Hổ Phách & Vàng Champagne',
      glowColor: 'rgba(212, 175, 55, 0.18)',
      accentBg: 'from-[#d4af37]/20 via-[#ffd88a]/10 to-transparent',
      borderColor: 'border-[#d4af37]/50',
      badgeBg: 'bg-[#d4af37]/20 text-[#ffd88a]',
      icon: SunMedium,
      lightDescription: 'Ánh hoàng hôn vàng óng ả hắt qua các vách kính kịch trần, làm rực sáng các vân đá travertine La Mã.'
    },
    'emerald-bronze': {
      name: 'Ngọc Lục Bảo & Đồng Cổ Hoàng Gia',
      glowColor: 'rgba(16, 185, 129, 0.16)',
      accentBg: 'from-[#065f46]/30 via-[#047857]/10 to-transparent',
      borderColor: 'border-[#10b981]/50',
      badgeBg: 'bg-[#065f46]/40 text-[#6ee7b7]',
      icon: Gem,
      lightDescription: 'Sắc xanh ngọc lục bảo huyền bí hòa quyện cùng bóng đồng thau cổ kính và mặt nước tĩnh lặng.'
    },
    'obsidian-gold': {
      name: 'Đêm Huyền Bí Obsidian & Vàng Ròng',
      glowColor: 'rgba(245, 192, 101, 0.15)',
      accentBg: 'from-[#1c1a17]/90 via-[#141210]/95 to-black',
      borderColor: 'border-[#f5c065]/50',
      badgeBg: 'bg-[#f5c065]/20 text-[#f5c065]',
      icon: Moon,
      lightDescription: 'Tương phản sáng tối chiaroscuro ấn tượng, các khối đá đen tuyền nổi bật dưới những vệt sáng vàng kim sắc sảo.'
    },
    'travertine-wine': {
      name: 'Đá Travertine Nắng Ấm & Rượu Vang Đỏ',
      glowColor: 'rgba(225, 29, 72, 0.14)',
      accentBg: 'from-[#881337]/25 via-[#9f1239]/10 to-transparent',
      borderColor: 'border-[#f43f5e]/50',
      badgeBg: 'bg-[#881337]/40 text-[#fda4af]',
      icon: Flame,
      lightDescription: 'Sắc ấm nồng của đá cẩm thạch đỏ Rosso Levanto và ánh lửa lò sưởi ấm cúng giữa tiết trời thu.'
    }
  };

  const currentMood = moodConfig[activeMood];

  return (
    <div className="w-full bg-[#0d0c0b] text-[#f5f2eb] transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center pt-24 pb-16 px-4 md:px-10 lg:px-20 overflow-hidden">
        {/* Background Image with dramatic atmospheric lighting */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAknkBovMC4Rj6ICkserpXmcbGY-QaSXZ3Oa4arkUakGx33UXS_ytrjuJzddGzqQAbue6MiSg2ti8JtJPKTti33jJ3XNIpcGWCNEV4yAs466-p2JRnCrHJapshVKo7cx68elcRrPHJp6Ir0BHMFRzSxpOrujqEmKh8Dqr7VcjZJjYPdkWVe5EJJ0t47Y1bn1N25JIBNbWIyuOxzPEDz6NF-UhuDxbyL5JfjnP9Xur063f7h8uvdyyN2"
            alt="Kiến Trúc Của Sự Tĩnh Lặng"
            className="w-full h-full object-cover brightness-[0.7] contrast-[1.12] scale-105 transition-transform duration-1000"
          />
          {/* Dynamic Mood Gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 40%, transparent 20%, #191715 90%), radial-gradient(circle at 80% 20%, ${currentMood.glowColor} 0%, transparent 60%)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191715] via-[#191715]/65 to-black/25" />
        </div>

        {/* Hero Content Monolith */}
        <div className="relative z-10 max-w-5xl mx-auto text-center text-[#fbf9f5] pt-8 md:pt-16">
          {/* Folio Volume Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#d4af37]/70 bg-[#25221d]/90 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <span className="w-2 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37] animate-ping inline-block"></span>
            <span className="font-label-caps text-[11px] text-[#ffd88a] tracking-[0.25em] font-bold">
              CHUYÊN KHẢO KIẾN TRÚC 2025 · TẬP IV ĐỘC BẢN
            </span>
          </div>

          <h1 className="font-display-hero text-white tracking-tight max-w-4xl mx-auto text-balance drop-shadow-2xl">
            Kiến Trúc Của Sự Tĩnh Lặng &amp; Ánh Sáng
          </h1>

          <p className="font-body-lead text-[#e4ded5] max-w-3xl mx-auto mt-6 text-balance font-light text-base md:text-xl leading-relaxed">
            Tuyển tập dinh thự tư nhân và không gian sống thượng lưu tại Milan, Paris và Hà Nội. Định hình bởi tỷ lệ nguyên khối uy nghi, đá travertine tự nhiên mộc mạc và chuẩn mực tiêu âm tĩnh lặng tuyệt đối.
          </p>

          {/* Atmospheric Light Mode Switcher (Interactive Luxury Feature) */}
          <div className="mt-8 max-w-2xl mx-auto p-3.5 bg-[#25221d]/95 border border-[#d4af37]/40 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-2.5 px-2">
              <span className="font-label-caps text-[10px] text-[#ffd88a] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                BỘ LỌC KHÍ SẮC ÁNH SÁNG &amp; VẬT LIỆU
              </span>
              <span className="text-[11px] font-mono text-[#d6c8b4] hidden sm:inline font-medium">
                {currentMood.name}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(moodConfig) as LightMood[]).map((key) => {
                const item = moodConfig[key];
                const Icon = item.icon;
                const isSelected = activeMood === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveMood(key)}
                    className={`px-2.5 py-2 text-left text-xs transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'border-[#d4af37] bg-gradient-to-r from-[#d4af37]/35 to-[#ffd88a]/20 text-white shadow-[0_0_14px_rgba(212,175,55,0.35)] font-bold'
                        : 'border-[#4a4235] bg-[#1d1a17] text-[#d6c8b4] hover:border-[#d4af37]/50 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#ffd88a]' : 'text-[#a89985]'}`} />
                    <span className="truncate text-[11px]">{item.name.split('&')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#ded7cb] font-light italic mt-2.5 text-left px-2">
              &ldquo;{currentMood.lightDescription}&rdquo;
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('projects')}
              className="btn-monolith w-full sm:w-auto"
            >
              Khám Phá Dinh Thự Kiệt Tác <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('philosophy')}
              className="btn-ghost-brass w-full sm:w-auto"
            >
              Tuyên Ngôn Kiến Trúc &amp; 5 Tôn Chỉ
            </button>
          </div>

          {/* Live Event Status Alert Ticker */}
          <div 
            onClick={() => onNavigate('journal')}
            className="mt-8 mx-auto max-w-2xl bg-gradient-to-r from-emerald-950/80 via-[#23201b] to-emerald-950/80 border border-emerald-500/40 p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)] group"
          >
            <div className="flex items-center gap-2.5 text-left">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                    SỰ KIỆN ĐANG DIỄN RA
                  </span>
                  <span className="text-[10px] font-mono text-[#ded7cb]">·</span>
                  <span className="text-[10.5px] font-mono text-emerald-200">
                    CÒN 6 VÉ MỜI VIP
                  </span>
                </div>
                <div className="font-serif text-sm text-white group-hover:text-[#ffd88a] transition-colors line-clamp-1">
                  Triển Lãm Điêu Khắc Đá &amp; Khí Sắc Ánh Sáng Milan 2026 — Atelier Via Santo Spirito
                </div>
              </div>
            </div>
            <div className="shrink-0 font-label-caps uppercase text-[10px] text-[#ffd88a] group-hover:text-white flex items-center gap-1 font-bold">
              Xem Lịch &amp; RSVP <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Coordinates Footer Ticker */}
          <div className="mt-14 pt-6 border-t border-[#d4af37]/25 flex flex-col md:flex-row items-center justify-between text-xs text-[#d6c8b4] font-mono gap-4">
            <div className="flex items-center gap-4 text-[11px]">
              <span className="hover:text-[#ffd88a] transition-colors">MILANO: 45°28&apos;B 9°11&apos;Đ</span>
              <span className="text-[#d4af37]">·</span>
              <span className="hover:text-[#ffd88a] transition-colors">PARIS: 48°51&apos;B 2°21&apos;Đ</span>
              <span className="text-[#d4af37]">·</span>
              <span className="hover:text-[#ffd88a] transition-colors">HÀ NỘI: 21°01&apos;B 105°51&apos;Đ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#d4af37] shadow-[0_0_6px_#d4af37]"></span>
              <span className="font-label-caps tracking-widest text-[10px] text-[#ffd88a] font-bold">
                QUY CHUẨN HÌNH HỌC TECTONIC 90°
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Materiality & Proportion Manifesto */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-12 bg-[#1e1c19] border-b border-[#d4af37]/25 relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-label-caps text-[#f5c065] uppercase tracking-[0.25em] text-xs block font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                TRIẾT LÝ PHÂN XƯỞNG ATELIER
              </span>
              <h2 className="font-headline-xl text-white tracking-tight">
                Vật Liệu Thật &amp; Tỷ Lệ Nguyên Khối
              </h2>
              <p className="font-serif text-xl text-[#ffd88a] italic leading-relaxed border-l-2 border-[#d4af37] pl-4">
                &ldquo;Chúng tôi loại bỏ mọi tạp âm trang trí thừa thãi để linh hồn nội tại của đá khối, gỗ tự nhiên và ánh nắng mặt trời được lên tiếng rực rỡ nhất.&rdquo;
              </p>
              <p className="font-body-muted text-[#ded7cb] leading-relaxed">
                Phương pháp thực hành của chúng tôi cự tuyệt sự hào nhoáng bề mặt của các trào lưu ngắn hạn. Mỗi mặt phẳng bằng đá travertine mài satin, gỗ sồi Pháp hun khói amoniac sâu và đồng thau phủ sáp ong tự nhiên đều được định vị trên một hệ lưới kết cấu nghiêm ngặt, tạo nên những không gian sống càng thêm cổ kính và uy nghiêm theo thời gian.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('philosophy')}
                  className="inline-flex items-center gap-2 font-label-caps uppercase tracking-wider text-[#ffd88a] hover:text-white transition-colors text-xs border-b border-[#d4af37] pb-1 font-bold"
                >
                  Khám Phá 5 Tôn Chỉ Của Kiến Trúc Phi Trang Trí <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Architectural Image */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] bg-[#28241f] overflow-hidden border border-[#d4af37]/45 shadow-[0_0_30px_rgba(212,175,55,0.18)] group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS0O-8tQyVo0cSCZOG51CTwawGsmcm2YFFz8ko_iv3Lp2JkqnPopxXNgQcXnWVlXRs0lNK_Qfyn-RkuMZhWdvoCwI9b7KNOJboyN3-Ar53DsmYn7Lb-50CQJjmQotq7VDdHcLIH3aNZQ-tu5UDMl7nJtFLa9S74QEi82e0fCTbFflH2LnG8PCQUlVa0UGLwbRk8hkqtrhZP0yze1ZB0tXRlpdHxgb5-o07yoqSDooVSd98XHJhqswt"
                  alt="Nghiên Cứu Tỷ Lệ Vật Liệu"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-[#181614]/90 backdrop-blur-md text-white flex justify-between items-center text-xs font-mono border-t border-[#d4af37]/30">
                  <span className="text-[#fbf9f5]">BẢN VẼ 01. NGHIÊN CỨU ĐÁ TIVOLI VÀ BÓNG NƯỚC HỒ TỰ NHIÊN</span>
                  <span className="text-[#ffd88a] font-bold">LƯU TRỮ DINH THỰ VEN HỒ</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Core Tectonic Tenets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-[#d4af37]/25">
            <div className="space-y-3 bg-[#26221c]/70 p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors">
              <span className="font-serif text-3xl text-[#ffd88a] block font-bold">I.</span>
              <h3 className="font-serif text-xl text-white">Tỷ Lệ Nguyên Khối</h3>
              <p className="font-body-muted text-sm text-[#ded7cb] leading-relaxed">
                Tầm nhìn ngang được cân chỉnh chuẩn xác theo độ cao tầm mắt con người, mang lại cảm giác chở che vững chãi và vĩnh cửu ngay từ khoảnh khắc bước vào.
              </p>
            </div>
            <div className="space-y-3 bg-[#26221c]/70 p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors">
              <span className="font-serif text-3xl text-[#ffd88a] block font-bold">II.</span>
              <h3 className="font-serif text-xl text-white">Xúc Giác Tự Nhiên</h3>
              <p className="font-body-muted text-sm text-[#ded7cb] leading-relaxed">
                Đá travertine không phủ keo công nghiệp, đồng thau mài tay sống động và gỗ sồi hun khói sâu tương tác hữu cơ với độ ẩm môi trường và từng cái chạm tay.
              </p>
            </div>
            <div className="space-y-3 bg-[#26221c]/70 p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors">
              <span className="font-serif text-3xl text-[#ffd88a] block font-bold">III.</span>
              <h3 className="font-serif text-xl text-white">Âm Học Thiền Định</h3>
              <p className="font-body-muted text-sm text-[#ded7cb] leading-relaxed">
                Hệ dẫn khí thông gió ngầm, tường rỗng hai lớp tách chấn và tấm tiêu âm len cừu tự nhiên triệt tiêu tạp âm đô thị xuống mức tĩnh mịch của một tu viện cổ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Private Residences Section */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-12 bg-[#191715] border-b border-[#d4af37]/25">
        <div className="max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-label-caps text-[#f5c065] uppercase tracking-[0.25em] text-xs block mb-1 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                DANH MỤC CÔNG TRÌNH TIÊU BIỂU
              </span>
              <h2 className="font-headline-xl text-white tracking-tight">
                Dinh Thự Tư Nhân Độc Bản
              </h2>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 font-label-caps uppercase tracking-wider text-[#ffd88a] hover:text-white transition-colors text-xs border-b border-[#d4af37] pb-1 font-bold"
            >
              Xem Toàn Bộ {projects.length} Công Trình Lưu Trữ <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Projects Grid (3 Core Residences) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="group bg-[#221f1a] border border-[#d4af37]/35 flex flex-col justify-between transition-all duration-300 hover:border-[#d4af37] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
              >
                <div>
                  {/* Image container */}
                  <div
                    className="relative aspect-[4/3] bg-[#2b2721] overflow-hidden cursor-pointer"
                    onClick={() => onSelectProject(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider shadow-md">
                      {project.categoryLabel}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#1c1916]/90 text-[#ffd88a] p-2 opacity-0 group-hover:opacity-100 transition-opacity border border-[#d4af37]/50">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Text meta */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs font-mono text-[#c5baa9] mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#d4af37]" />
                        {project.location}, {project.country}
                      </span>
                      <span className="text-[#ffd88a] font-semibold">{project.year}</span>
                    </div>
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="font-serif text-2xl text-white cursor-pointer group-hover:text-[#ffd88a] transition-colors"
                    >
                      {project.title}
                    </h3>
                    <p className="font-body-muted text-xs text-[#ded7cb] mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Bottom spec ribbon */}
                <div className="p-6 pt-0">
                  <div className="border-t border-[#d4af37]/20 pt-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#ffd88a] bg-[#292520] px-2.5 py-1 border border-[#d4af37]/30">
                      DIỆN TÍCH: {project.area}
                    </span>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1 font-label-caps uppercase text-[10px] tracking-wider text-[#ffd88a] hover:text-white transition-colors font-bold"
                    >
                      Chi Tiết Bản Vẽ <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monolithic Furniture Objects Preview */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-12 bg-[#1e1c19] border-b border-[#d4af37]/25">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-label-caps text-[#f5c065] uppercase tracking-[0.25em] text-xs block mb-1 font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                PHIÊN BẢN ĐÁNH SỐ GIỚI HẠN
              </span>
              <h2 className="font-headline-xl text-white tracking-tight">
                Đồ Nội Thất &amp; Điêu Khắc Đá
              </h2>
            </div>
            <button
              onClick={() => onNavigate('furniture-collection')}
              className="inline-flex items-center gap-2 font-label-caps uppercase tracking-wider text-[#ffd88a] hover:text-white transition-colors text-xs border-b border-[#d4af37] pb-1 font-bold"
            >
              Khám Phá Toàn Bộ Bộ Sưu Tập ({furniture.length} Tác Phẩm) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {furniture.slice(0, 3).map((piece) => (
              <div
                key={piece.id}
                className="group bg-[#25221d] border border-[#d4af37]/35 flex flex-col justify-between transition-all duration-300 hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              >
                <div>
                  <div
                    className="relative aspect-[4/3] bg-[#2b2721] overflow-hidden cursor-pointer"
                    onClick={() => onSelectFurniture(piece)}
                  >
                    <img
                      src={piece.image}
                      alt={piece.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                    />
                    <div className="absolute top-3 left-3 bg-[#1c1916] text-[#ffd88a] border border-[#d4af37]/50 px-3 py-1 font-mono text-[10px] font-bold">
                      {piece.edition}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-wider block mb-1 font-bold">
                      {piece.categoryLabel}
                    </span>
                    <h3
                      onClick={() => onSelectFurniture(piece)}
                      className="font-serif text-xl text-white cursor-pointer group-hover:text-[#ffd88a] transition-colors"
                    >
                      {piece.title}
                    </h3>
                    <p className="font-body-muted text-xs text-[#ded7cb] mt-2 line-clamp-2 leading-relaxed">
                      {piece.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="border-t border-[#d4af37]/20 pt-4 flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-[#c5baa9]">
                      {piece.dimensions}
                    </span>
                    <button
                      onClick={() => onSelectFurniture(piece)}
                      className="font-label-caps uppercase text-[10px] tracking-wider text-[#ffd88a] hover:text-white transition-colors font-bold"
                    >
                      Ủy Thác Chế Tác
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spatial Sanctuaries Spotlight Banner */}
      <section className="w-full py-16 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-[#211e19] via-[#2a2520] to-[#211e19] border-b border-[#d4af37]/30 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <span className="font-label-caps text-[#f5c065] text-xs uppercase tracking-[0.2em] block font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
              CÁC KHÔNG GIAN TĨNH LẶNG
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Cân Chỉnh Cảm Giác &amp; Tỷ Lệ Không Gian Sống
            </h2>
            <p className="font-body-muted text-sm text-[#ded7cb] leading-relaxed">
              Tìm hiểu cách các gian phòng của chúng tôi cân bằng thời gian tiêu âm, nhịp độ ánh sáng sinh học và khả năng giữ nhiệt tự nhiên xuyên suốt Gian Tắm Trầm Tư, Sân Mưa Vi Khí Hậu và Thư Viện Gỗ Sồi Cổ Thụ.
            </p>
          </div>
          <button
            onClick={() => onNavigate('spaces')}
            className="btn-monolith shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Khám Phá Chi Tiết 4 Không Gian
          </button>
        </div>
      </section>

      {/* Refined Bespoke Commission Invitation Sanctuary Section */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-12 bg-[#171513] border-t border-b border-[#d4af37]/35 relative overflow-hidden">
        {/* Subtle radial amber glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#d4af37]/10 blur-[130px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#25211c] border border-[#d4af37]/40 mb-4 shadow-md">
            <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block shadow-[0_0_6px_#d4af37]"></span>
            <span className="font-label-caps text-[#ffd88a] text-[10.5px] tracking-[0.22em] uppercase font-bold">
              ỦY THÁC KIẾN TRÚC &amp; ĐIÊU KHẮC ĐỘC BẢN
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white max-w-3xl mx-auto leading-tight tracking-tight">
            Khởi Đầu Cuộc Đối Thoại Giữa Chủ Nhân &amp; Kiến Trúc Sư
          </h2>

          <p className="font-body-lead text-[#ded7cb] max-w-2xl mx-auto mt-4 leading-relaxed">
            Mỗi năm, các phân xưởng tại Milan, Paris và Hà Nội chỉ tiếp nhận tối đa 12 công trình dinh thự tư nhân để bảo chứng sự tập trung tối thượng vào từng phiến đá, thớ gỗ và nhịp điệu ánh sáng sinh học.
          </p>

          {/* 3 Atelier Hub Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto my-10 text-left">
            <div className="p-4 bg-[#211e19]/90 border border-[#d4af37]/25">
              <span className="font-mono text-[9.5px] uppercase text-[#ffd88a] tracking-widest block mb-1">ATELIER I · Ý</span>
              <h4 className="font-serif text-lg text-white">Milano Quadrilatero</h4>
              <p className="font-mono text-[11px] text-[#c5baa9] mt-1">Via Santo Spirito, 14</p>
            </div>
            <div className="p-4 bg-[#211e19]/90 border border-[#d4af37]/25">
              <span className="font-mono text-[9.5px] uppercase text-[#ffd88a] tracking-widest block mb-1">ATELIER II · PHÁP</span>
              <h4 className="font-serif text-lg text-white">Paris Saint-Germain</h4>
              <p className="font-mono text-[11px] text-[#c5baa9] mt-1">Rue Bonaparte, 28</p>
            </div>
            <div className="p-4 bg-[#211e19]/90 border border-[#d4af37]/25">
              <span className="font-mono text-[9.5px] uppercase text-[#ffd88a] tracking-widest block mb-1">ATELIER III · VIỆT NAM</span>
              <h4 className="font-serif text-lg text-white">Hà Nội Hoàn Kiếm</h4>
              <p className="font-mono text-[11px] text-[#c5baa9] mt-1">18 Tràng Tiền, Hoàn Kiếm</p>
            </div>
          </div>

          {/* Action Choice: Quick Concierge Drawer vs Dedicated Dossier Page */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                if (onOpenBooking) {
                  onOpenBooking();
                } else {
                  onNavigate('private-consultation');
                }
              }}
              className="btn-monolith w-full sm:w-auto shadow-[0_0_25px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Đặt Lịch Khảo Sát Thực Địa (1:1 KTS Trưởng)
            </button>
            <button
              onClick={() => onNavigate('private-consultation')}
              className="btn-ghost-brass w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Khởi Tạo Hồ Sơ Mật (NDA) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-8 font-mono text-[11px] text-[#c5baa9] flex items-center justify-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Mọi cuộc tiếp đón và tài liệu dự án đều tuân thủ nguyên tắc bảo mật danh tính tối mật.</span>
          </div>
        </div>
      </section>
    </div>
  );
};
