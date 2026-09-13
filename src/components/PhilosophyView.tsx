import React from 'react';
import { MATERIALS_DATA, ATELIER_LOCATIONS } from '../data/journal';
import { ArrowRight, Compass, ShieldCheck, MapPin, Layers, Sun, Sparkles } from 'lucide-react';

interface PhilosophyViewProps {
  onOpenConsultation: () => void;
}

export const PhilosophyView: React.FC<PhilosophyViewProps> = ({ onOpenConsultation }) => {
  return (
    <div className="w-full pt-28 pb-20 px-4 md:px-8 lg:px-12 bg-[#191715] text-[#fbf9f5]">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="border-b border-[#d4af37]/25 pb-10 mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37] inline-block"></span>
            <span className="font-label-caps text-[#f5c065] uppercase tracking-[0.25em] text-xs font-bold">
              TUYÊN NGÔN KIẾN TRÚC &amp; NGUỒN GỐC ĐỊA CHẤT
            </span>
          </div>
          <h1 className="font-display-hero text-white tracking-tight">
            Triết Lý Của Sự Tiết Chế Tuyệt Đối
          </h1>
          <p className="font-body-lead text-[#ded7cb] max-w-3xl mt-4 leading-relaxed">
            Trong một thời đại ngập tràn những chi tiết trang trí hời hợt và trào lưu chóng tàn, AURA &amp; STONE xây dựng những không gian neo chặt vào sự vĩnh cửu của địa chất, tính chân thực của kết cấu trần trụi và năng lượng chữa lành của sự tĩnh mịch vô biên.
          </p>
        </div>

        {/* The 5 Principles of Non-Decoration */}
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="font-mono text-xs text-[#f5c065] uppercase tracking-widest font-bold">
              5 TÔN CHỈ KIẾN TRÚC CỐT LÕI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-[#221f1a] border border-[#d4af37]/35 space-y-4 hover:border-[#d4af37] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <span className="font-serif text-4xl text-[#ffd88a] block font-bold">01</span>
              <h3 className="font-serif text-xl text-white">Lập Trường Phi Trang Trí</h3>
              <p className="font-body-muted text-xs text-[#ded7cb] leading-relaxed">
                Chúng tôi không bao giờ thêm hoa văn để che đậy khiếm khuyết của khối tích. Vẻ đẹp kiến trúc bắt nguồn từ tỷ lệ khắt khe, trọng lực uy nghi của vật liệu chân thật và bước đi thong dong của ánh nắng trên bề mặt mộc.
              </p>
            </div>

            <div className="p-8 bg-[#221f1a] border border-[#d4af37]/35 space-y-4 hover:border-[#d4af37] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <span className="font-serif text-4xl text-[#ffd88a] block font-bold">02</span>
              <h3 className="font-serif text-xl text-white">Sức Nặng Vĩnh Cửu Của Địa Chất</h3>
              <p className="font-body-muted text-xs text-[#ded7cb] leading-relaxed">
                Chúng tôi tuyển chọn những khối đá hình thành hàng trăm ngàn năm trước tại Lazio và Hauteville. Một nội thất cấu thành từ các phiến travertine hay đá bazan dày 8cm sẽ trường tồn qua nhiều thập kỷ, càng nhuốm màu thời gian càng sâu lắng.
              </p>
            </div>

            <div className="p-8 bg-[#221f1a] border border-[#d4af37]/35 space-y-4 hover:border-[#d4af37] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <span className="font-serif text-4xl text-[#ffd88a] block font-bold">03</span>
              <h3 className="font-serif text-xl text-white">Phẩm Giá Của Lớp Nhuốm Thời Gian</h3>
              <p className="font-body-muted text-xs text-[#ded7cb] leading-relaxed">
                Nghiêm cấm các lớp sơn phủ bóng nhân tạo PU hay vec-ni hóa học. Đồng thau sống tự oxy hóa dưới bàn tay con người; gỗ sồi hun khói hấp thụ tinh dầu tự nhiên; mặt đá nhẵn dần theo từng bước chân thế hệ.
              </p>
            </div>

            <div className="p-8 bg-[#221f1a] border border-[#d4af37]/35 space-y-4 hover:border-[#d4af37] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <span className="font-serif text-4xl text-[#ffd88a] block font-bold">04</span>
              <h3 className="font-serif text-xl text-white">Tĩnh Mịch Chuẩn Tu Viện Cổ</h3>
              <p className="font-body-muted text-xs text-[#ded7cb] leading-relaxed">
                Sự tĩnh lặng không phải suy nghĩ nảy sinh sau cùng—nó được tính toán kỹ thuật ngay trong khoang tường rỗng, ống dẫn khí ngầm và khớp nối gỗ thịt nặng. Khi decibel hạ dưới 28 dBA, tâm trí con người bước vào trạng thái phục hồi sâu sắc.
              </p>
            </div>

            <div className="p-8 bg-[#221f1a] border border-[#d4af37]/35 space-y-4 hover:border-[#d4af37] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <span className="font-serif text-4xl text-[#ffd88a] block font-bold">05</span>
              <h3 className="font-serif text-xl text-white">Hình Học Ánh Sáng Sinh Học</h3>
              <p className="font-body-muted text-xs text-[#ded7cb] leading-relaxed">
                Chúng tôi khước từ ánh sáng rọi trần gắt gỏng gây chói mắt. Ánh sáng nhân tạo được giấu kín dưới khe sàn, chỉ âm trần và hốc tường, mô phỏng nhiệt độ màu vàng ấm tự nhiên của ánh hoàng hôn thư thái.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-b from-[#27231d] to-[#1e1b17] text-[#fbf9f5] border border-[#d4af37]/40 flex flex-col justify-between shadow-[0_0_25px_rgba(212,175,55,0.2)]">
              <div>
                <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-widest block mb-2 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                  ĐỐI THOẠI TRỰC TIẾP
                </span>
                <h3 className="font-serif text-xl text-white">
                  Ủy Thác Hồ Sơ Atelier
                </h3>
                <p className="font-body-muted text-xs text-[#ded7cb] mt-2 leading-relaxed">
                  Tìm hiểu cách 5 tôn chỉ này được hiện thực hóa trên dinh thự tư nhân hoặc phòng trưng bày nghệ thuật của quý vị.
                </p>
              </div>
              <button
                onClick={onOpenConsultation}
                className="mt-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] font-label-caps uppercase text-[11px] tracking-widest font-bold hover:scale-[1.02] transition-all shadow-md"
              >
                Khởi Đầu Cuộc Trò Chuyện
              </button>
            </div>
          </div>
        </section>

        {/* Geological Materiality Archive */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#d4af37]/20 pb-4">
            <div>
              <span className="font-mono text-xs text-[#f5c065] uppercase tracking-widest block mb-1 font-bold">
                VẬT LIỆU NGUYÊN BẢN TỪ ĐỊA CẦU
              </span>
              <h2 className="font-headline-lg text-white">
                Sổ Lưu Trữ Nguồn Gốc Mỏ Khai Thác
              </h2>
            </div>
            <span className="text-xs font-mono text-[#ffd88a] font-medium">
              KHAI THÁC MINH BẠCH &amp; KHÔNG DÙNG HÓA CHẤT ĐỘC HẠI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MATERIALS_DATA.map((mat) => (
              <div
                key={mat.id}
                className="bg-[#221f1a] border border-[#d4af37]/35 p-6 md:p-8 flex flex-col justify-between hover:border-[#d4af37] transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-[#2b2721] overflow-hidden mb-6 border border-[#d4af37]/25">
                    <img src={mat.image} alt={mat.name} className="w-full h-full object-cover brightness-95" />
                    <div className="absolute top-3 left-3 bg-[#191715] text-[#ffd88a] font-mono text-[10px] px-2.5 py-1 border border-[#d4af37]/35 font-bold">
                      {mat.code}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-white">{mat.name}</h3>
                  <div className="space-y-1.5 mt-3 font-mono text-xs text-[#c5baa9]">
                    <p><strong className="text-[#ffd88a]">XUẤT XỨ ĐỊA CHẤT:</strong> {mat.origin}</p>
                    <p><strong className="text-[#ffd88a]">KỸ THUẬT BỀ MẶT:</strong> {mat.finish}</p>
                    <p><strong className="text-[#ffd88a]">ỨNG DỤNG KHUYÊN DÙNG:</strong> {mat.application}</p>
                  </div>

                  <p className="font-body-muted text-xs text-[#ded7cb] mt-4 leading-relaxed">
                    {mat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#d4af37]/20 flex justify-between items-center text-xs font-mono text-[#f5c065]">
                  <span>LÔ KHAI THÁC ĐẠT CHUẨN ĐẠO ĐỨC</span>
                  <span className="font-bold text-[#ffd88a]">100% TRUY XUẤT NGUỒN GỐC</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Atelier Locations Directory */}
        <section className="bg-gradient-to-r from-[#211e19] via-[#2a2520] to-[#211e19] text-[#fbf9f5] p-8 md:p-12 border border-[#d4af37]/35 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <div className="max-w-3xl mb-10">
            <span className="font-mono text-xs text-[#f5c065] uppercase tracking-widest block mb-2 font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              TRỤ SỞ &amp; VĂN PHÒNG ĐIỀU HÀNH
            </span>
            <h2 className="font-serif text-3xl text-white">
              Tọa Độ Các Phân Xưởng Atelier &amp; Ban Lãnh Đạo
            </h2>
            <p className="font-body-muted text-xs text-[#ded7cb] mt-2 leading-relaxed">
              Các xưởng chế tác do các kiến trúc sư trưởng dẫn dắt trải dài khắp châu Âu và Đông Nam Á, đảm bảo mối liên hệ mật thiết với các mỏ đá cổ và nghệ nhân thủ công bản địa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ATELIER_LOCATIONS.map((loc) => (
              <div key={loc.city} className="border border-[#d4af37]/30 p-6 bg-[#1b1916] space-y-3 hover:border-[#d4af37]/60 transition-colors">
                <div className="flex justify-between items-start">
                  <span className="font-serif text-2xl text-white">{loc.city}</span>
                  <span className="font-mono text-[10px] text-[#ffd88a] font-bold">{loc.coordinates}</span>
                </div>
                <p className="font-mono text-xs text-[#f5c065] font-semibold">{loc.district}</p>
                <p className="font-body-muted text-xs text-[#ded7cb]">{loc.address}<br />{loc.postal}</p>
                <div className="pt-3 border-t border-[#d4af37]/20 font-mono text-xs space-y-1">
                  <p className="text-[#ffd88a] font-semibold">{loc.director}</p>
                  <p className="text-[#c5baa9]">{loc.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
