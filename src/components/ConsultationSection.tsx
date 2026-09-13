import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, Send, Download, Lock, MapPin, Calendar, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { ATELIER_LOCATIONS } from '../data/journal';
import { saveNewDossier } from '../services/mockClientStorage';

interface ConsultationSectionProps {
  initialProject?: string;
  onOpenClientPortal?: (code?: string) => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ 
  initialProject,
  onOpenClientPortal
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    typology: 'villa',
    atelier: 'milano',
    budget: '1.5m-3m',
    timeline: '6-12-months',
    notes: initialProject ? `Thư ủy thác khởi nguồn từ cảm hứng công trình: ${initialProject}.` : '',
    ndaRequested: true,
  });

  // When initialProject changes, update notes
  useEffect(() => {
    if (initialProject) {
      setFormData(prev => ({
        ...prev,
        notes: initialProject.startsWith('Ủy thác') 
          ? initialProject 
          : `Thư ủy thác khởi nguồn từ cảm hứng công trình: ${initialProject}.`
      }));
    }
  }, [initialProject]);

  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cityCode = formData.atelier.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const dossierRef = `AS-${cityCode}-2025-${randomNum}`;
    
    // Save to persistent mock storage
    saveNewDossier({
      code: dossierRef,
      clientName: formData.fullName || 'Khách Hàng Quý Tộc',
      email: formData.email,
      phone: formData.phone,
      location: formData.location || 'Địa điểm bảo mật theo NDA',
      typology: formData.typology === 'villa' ? 'Biệt Thự / Dinh Thự Ẩn Mình (400 - 1.500 m²)' :
                formData.typology === 'penthouse' ? 'Penthouse Trung Tâm Tái Thiết (250 - 600 m²)' :
                formData.typology === 'courtyard' ? 'Điền Trang Sân Trong & Hồ Nước Vi Khí Hậu' :
                formData.typology === 'furniture' ? 'Bộ Sưu Tập Đồ Nội Thất Đánh Số Giới Hạn' :
                'Không Gian Triển Lãm / Quỹ Nghệ Thuật Riêng Tư',
      budget: formData.budget === '500k-1.5m' ? '500.000 € — 1.500.000 €' :
              formData.budget === '1.5m-3m' ? '1.500.000 € — 3.000.000 €' :
              formData.budget === '3m-plus' ? 'Trên 3.000.000 €' : 'Đặt Hàng Đồ Điêu Khắc Nội Thất Riêng Lẻ',
      atelier: formData.atelier === 'milano' ? 'Milano Quadrilatero' :
               formData.atelier === 'paris' ? 'Paris Saint-Germain' : 'Hà Nội Phố Cổ',
      fieldNotes: formData.notes || 'Không có ghi chú bổ sung.'
    });

    setSubmittedCode(dossierRef);
  };

  const handleReset = () => {
    setSubmittedCode(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      typology: 'villa',
      atelier: 'milano',
      budget: '1.5m-3m',
      timeline: '6-12-months',
      notes: '',
      ndaRequested: true,
    });
  };

  const handleDownloadDossier = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <section className="w-full bg-[#1a1815] py-20 px-4 md:px-8 lg:px-12 border-t border-b border-[#d4af37]/30 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#25221d] border border-[#d4af37]/45 mb-3 shadow-md">
              <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block shadow-[0_0_6px_#d4af37]"></span>
              <span className="font-label-caps text-[#f5c065] text-[10px] tracking-[0.22em] uppercase font-bold">
                ỦY THÁC ĐỘC BẢN &amp; BẢO MẬT THƯỢNG LƯU
              </span>
            </div>
            <h2 className="font-headline-xl text-white tracking-tight text-balance">
              Khởi Đầu Cuộc Đối Thoại Kiến Trúc
            </h2>
            <p className="font-body-muted text-[#ded7cb] max-w-xl mx-auto mt-3 text-balance leading-relaxed">
              Xưởng của chúng tôi chỉ tiếp nhận số lượng giới hạn các công trình dinh thự và không gian nghệ thuật tư nhân mỗi năm để đảm bảo độ tỉ mỉ vật liệu và sự tập trung kiến trúc tuyệt đối.
            </p>
          </div>

          {submittedCode ? (
            <div className="bg-[#24211c] border border-[#d4af37] p-8 md:p-12 shadow-[0_0_35px_rgba(212,175,55,0.25)] animate-in fade-in duration-300">
              <div className="flex items-center gap-4 text-emerald-400 mb-6 pb-6 border-b border-[#d4af37]/25">
                <div className="w-12 h-12 bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                    HỒ SƠ MẬT ĐÃ ĐƯỢC MÃ HÓA &amp; TIẾP NHẬN
                  </span>
                  <h3 className="font-serif text-2xl text-white">
                    Mã Hồ Sơ Lưu Trữ: <span className="font-mono text-[#ffd88a] font-bold">{submittedCode}</span>
                  </h3>
                </div>
              </div>

              <p className="font-body-muted text-sm text-[#ded7cb] leading-relaxed mb-6">
                Trân trọng cảm ơn quý khách <strong className="text-[#ffd88a]">{formData.fullName}</strong>. Yêu cầu ủy thác cho loại hình <strong className="text-[#ffd88a]">{formData.typology.toUpperCase()}</strong> tại địa điểm <strong className="text-[#ffd88a]">{formData.location || 'khu vực chỉ định'}</strong> đã được chuyển trực tiếp tới Kiến Trúc Sư Trưởng phân xưởng <strong className="text-[#ffd88a]">{formData.atelier.toUpperCase()}</strong>.
              </p>

              <div className="p-5 bg-[#1a1815] border border-[#d4af37]/25 space-y-3 text-xs font-mono text-[#ded7cb] mb-8">
                <div className="flex justify-between border-b border-[#d4af37]/15 pb-2">
                  <span>LIÊN HỆ KHÁCH HÀNG:</span>
                  <span className="text-[#ffd88a] font-semibold">{formData.email}</span>
                </div>
                <div className="flex justify-between border-b border-[#d4af37]/15 pb-2">
                  <span>THỎA THUẬN BẢO MẬT NDA:</span>
                  <span className="text-emerald-400 font-bold">
                    {formData.ndaRequested ? 'ÁP DỤNG THỎA THUẬN BẢO MẬT HAI CHIỀU' : 'BẢO MẬT TIÊU CHUẨN'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>THỜI GIAN PHẢN HỒI SƠ BỘ:</span>
                  <span className="text-[#ffd88a] font-semibold">TRONG VÒNG 48 GIỜ LÀM VIỆC</span>
                </div>
              </div>

              {downloadSuccess && (
                <div className="mb-4 p-3 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4" /> Bản tóm tắt điện tử kèm chữ ký số xác thực đã được tạo lập thành công.
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#d4af37]/25">
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleDownloadDossier}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] font-label-caps font-bold text-xs uppercase hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                  >
                    <Download className="w-4 h-4" /> Tải Bản Sao Biên Nhận Hồ Sơ
                  </button>
                  {onOpenClientPortal && submittedCode && (
                    <button
                      onClick={() => onOpenClientPortal(submittedCode)}
                      className="w-full sm:w-auto px-5 py-3 border border-[#d4af37] bg-[#2a241e] text-[#ffd88a] font-label-caps font-bold text-xs uppercase hover:bg-[#d4af37] hover:text-[#0b0a09] transition-all flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" /> Tra Cứu Tiến Độ Trên Cổng Khách Hàng <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs font-mono text-[#ffd88a] hover:underline"
                >
                  Gửi thêm yêu cầu ủy thác khác
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#24211c] border border-[#d4af37]/35 p-6 md:p-12 space-y-8 shadow-[0_0_35px_rgba(0,0,0,0.4)]">
              {/* Atelier Selector */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-[#f5c065] block mb-3 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                  1. CHỌN PHÂN XƯỞNG ATELIER TIẾP NHẬN
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'milano', label: 'Milano Quadrilatero', sub: 'Via Santo Spirito, 14 · Ý' },
                    { id: 'paris', label: 'Paris Saint-Germain', sub: 'Rue Bonaparte, 28 · Pháp' },
                    { id: 'hanoi', label: 'Hà Nội Phố Cổ', sub: '18 Tràng Tiền, Hoàn Kiếm · Việt Nam' }
                  ].map((office) => (
                    <label
                      key={office.id}
                      className={`cursor-pointer p-4 border transition-all flex flex-col justify-between ${
                        formData.atelier === office.id
                          ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#ffd88a] shadow-[0_0_15px_rgba(212,175,55,0.2)] font-semibold'
                          : 'border-[#d4af37]/20 bg-[#1c1916] text-[#ded7cb] hover:border-[#d4af37]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-medium">{office.label}</span>
                        <input
                          type="radio"
                          name="atelier"
                          checked={formData.atelier === office.id}
                          onChange={() => setFormData({ ...formData, atelier: office.id })}
                          className="accent-[#d4af37]"
                        />
                      </div>
                      <span className="text-[11px] text-[#c5baa9] font-mono mt-2">{office.sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Client Credentials */}
              <div className="space-y-4">
                <label className="font-mono text-xs uppercase tracking-widest text-[#f5c065] block font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                  2. THÔNG TIN KHÁCH HÀNG &amp; LIÊN HỆ BẢO MẬT
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#ded7cb] block mb-1 font-semibold">
                      Họ và Tên / Đại diện Gia Tộc *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ví dụ: Nguyễn Văn Hoàng hoặc Family Office"
                      className="w-full px-4 py-3 bg-[#191715] border border-[#d4af37]/30 text-white text-sm focus:outline-none focus:border-[#d4af37] placeholder:text-[#7d7568]"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#ded7cb] block mb-1 font-semibold">
                      Email Bảo Mật Trực Tiếp *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ví dụ: principal@familyoffice.com"
                      className="w-full px-4 py-3 bg-[#191715] border border-[#d4af37]/30 text-white text-sm focus:outline-none focus:border-[#d4af37] placeholder:text-[#7d7568]"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#ded7cb] block mb-1 font-semibold">
                      Số Điện Thoại Trực Tiếp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+84 / +39 / +33 / +1 ..."
                      className="w-full px-4 py-3 bg-[#191715] border border-[#d4af37]/30 text-white text-sm focus:outline-none focus:border-[#d4af37] placeholder:text-[#7d7568]"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#ded7cb] block mb-1 font-semibold">
                      Địa Điểm Dự Án / Khu Đất Xây Dựng *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ví dụ: Hồ Como, Paris, Hồ Tây Hà Nội, Đà Lạt..."
                      className="w-full px-4 py-3 bg-[#191715] border border-[#d4af37]/30 text-white text-sm focus:outline-none focus:border-[#d4af37] placeholder:text-[#7d7568]"
                    />
                  </div>
                </div>
              </div>

              {/* Typology and Scale */}
              <div className="space-y-4">
                <label className="font-mono text-xs uppercase tracking-widest text-[#f5c065] block font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                  3. LOẠI HÌNH KHÔNG GIAN &amp; QUY MÔ DỰ KIẾN
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#ded7cb] block mb-1 font-semibold">
                      Loại Hình Công Trình
                    </label>
                    <select
                      value={formData.typology}
                      onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                      className="w-full px-4 py-3 bg-[#191715] border border-[#d4af37]/30 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="villa">Biệt Thự / Dinh Thự Ẩn Mình (400 - 1.500 m²)</option>
                      <option value="penthouse">Penthouse Trung Tâm Tái Thiết (250 - 600 m²)</option>
                      <option value="courtyard">Điền Trang Sân Trong &amp; Hồ Nước Vi Khí Hậu</option>
                      <option value="furniture">Bộ Sưu Tập Đồ Nội Thất Đánh Số Giới Hạn</option>
                      <option value="cultural">Không Gian Triển Lãm / Quỹ Nghệ Thuật Riêng Tư</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#ded7cb] block mb-1 font-semibold">
                      Ngân Sách Đầu Tư Dự Kiến
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-[#191715] border border-[#d4af37]/30 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="500k-1.5m">500.000 € — 1.500.000 € (~13 - 40 tỷ VNĐ)</option>
                      <option value="1.5m-3m">1.500.000 € — 3.000.000 € (~40 - 80 tỷ VNĐ)</option>
                      <option value="3m-plus">Trên 3.000.000 € (Quy Mô Dinh Thự Tổng Thể)</option>
                      <option value="furniture-only">Đặt Hàng Đồ Điêu Khắc Nội Thất Riêng Lẻ</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Architectural Intent */}
              <div>
                <label className="font-mono text-xs uppercase tracking-widest text-[#f5c065] block mb-1 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                  4. NGUYỆN VỌNG KIẾN TRÚC &amp; ĐẶC ĐIỂM ĐỊA THẾ
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mô tả tầm nhìn không gian của quý khách, điều kiện tự nhiên khu đất, các vật liệu mong muốn (đá travertine, đá bazan, gỗ sồi hun khói, đồng thau...) và tiến độ kỳ vọng..."
                  className="w-full px-4 py-3 bg-[#191715] border border-[#d4af37]/30 text-white text-sm focus:outline-none focus:border-[#d4af37] placeholder:text-[#7d7568]"
                ></textarea>
              </div>

              {/* NDA Checkbox */}
              <div className="pt-2 bg-[#1c1916] p-4 border border-[#d4af37]/25">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.ndaRequested}
                    onChange={(e) => setFormData({ ...formData, ndaRequested: e.target.checked })}
                    className="mt-1 accent-[#d4af37]"
                  />
                  <span className="font-body-muted text-xs text-[#ded7cb] leading-relaxed">
                    <strong className="text-[#ffd88a]">Ký Kết Thỏa Thuận Không Tiết Lộ Thông Tin (NDA Hai Chiều)</strong>. Chúng tôi cam kết bảo mật tuyệt đối mọi địa điểm xây dựng, bản vẽ mặt bằng, thông tin chủ đầu tư và ngân sách tài chính.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#d4af37]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-[#c5baa9] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#d4af37]" /> MÃ HÓA CẤP QUÂN SỰ 256-BIT ATELIER
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f5c065] to-[#b8860b] text-[#0b0a09] hover:scale-[1.02] transition-all font-label-caps uppercase tracking-[0.2em] text-[11px] font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  <Send className="w-4 h-4" /> Chuyển Tiếp Hồ Sơ Ủy Thác
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
