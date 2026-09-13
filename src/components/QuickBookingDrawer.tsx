import React, { useState } from 'react';
import { Drawer, Steps, Select, DatePicker, Input, Button, message, Checkbox } from 'antd';
import { Calendar, Clock, MapPin, ShieldCheck, Check, Sparkles, Phone, Mail, User, X } from 'lucide-react';
import dayjs from 'dayjs';

interface QuickBookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast?: (msg: string) => void;
}

export const QuickBookingDrawer: React.FC<QuickBookingDrawerProps> = ({
  isOpen,
  onClose,
  onSuccessToast
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    typology: 'villa',
    atelier: 'milano',
    location: '',
    date: null as string | null,
    timeSlot: '14:30',
    fullName: '',
    phone: '',
    email: '',
    ndaAccepted: true,
  });

  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  const handleFinish = () => {
    if (!formData.fullName || !formData.phone) {
      message.error('Quý khách vui lòng cung cấp họ tên và số điện thoại bảo mật.');
      return;
    }
    const code = `AS-EXP-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingConfirmed(code);
    if (onSuccessToast) {
      onSuccessToast(`Lịch hẹn khảo sát ${code} đã được chuyển tới Kiến Trúc Sư Trưởng.`);
    }
  };

  const handleResetAndClose = () => {
    setBookingConfirmed(null);
    setCurrentStep(0);
    setFormData({
      typology: 'villa',
      atelier: 'milano',
      location: '',
      date: null,
      timeSlot: '14:30',
      fullName: '',
      phone: '',
      email: '',
      ndaAccepted: true,
    });
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={handleResetAndClose}
      size={typeof window !== 'undefined' && window.innerWidth < 640 ? '100%' : 520}
      title={
        <div className="flex items-center justify-between w-full py-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37] inline-block animate-pulse"></span>
            <span className="font-label-caps text-[#ffd88a] uppercase tracking-[0.2em] text-xs font-bold">
              ĐẶT LỊCH CỐ VẤN &amp; KHẢO SÁT THỰC ĐỊA
            </span>
          </div>
        </div>
      }
      styles={{
        header: {
          backgroundColor: '#191715',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
          padding: '16px 24px',
        },
        body: {
          backgroundColor: '#1e1b17',
          color: '#fbf9f5',
          padding: '24px',
        },
      }}
    >
      {bookingConfirmed ? (
        <div className="py-6 space-y-6 animate-in fade-in duration-300">
          <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] uppercase text-[#ffd88a] tracking-widest font-bold">
              XÁC NHẬN LỊCH HẸN BẢO MẬT
            </span>
            <h3 className="font-serif text-2xl text-white">
              Đã Ghi Nhận Lịch Gặp Với KTS Trưởng
            </h3>
            <p className="font-mono text-xs text-[#ded7cb]">
              Mã Lịch Hẹn: <span className="text-[#ffd88a] font-bold">{bookingConfirmed}</span>
            </p>
          </div>

          <div className="p-4 bg-[#26221c] border border-[#d4af37]/30 space-y-3 font-mono text-xs text-[#ded7cb]">
            <div className="flex justify-between border-b border-[#d4af37]/15 pb-2">
              <span className="text-[#c5baa9]">CHỦ ĐẦU TƯ:</span>
              <span className="text-white font-bold">{formData.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-[#d4af37]/15 pb-2">
              <span className="text-[#c5baa9]">PHÂN XƯỞNG ĐÓN TIẾP:</span>
              <span className="text-[#ffd88a] font-bold uppercase">Atelier {formData.atelier}</span>
            </div>
            <div className="flex justify-between border-b border-[#d4af37]/15 pb-2">
              <span className="text-[#c5baa9]">THỜI GIAN DỰ KIẾN:</span>
              <span className="text-white font-bold">{formData.date || 'Theo thỏa thuận riêng'} · {formData.timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#c5baa9]">ĐỊA ĐIỂM CÔNG TRÌNH:</span>
              <span className="text-[#ffd88a]">{formData.location || 'Chưa cung cấp'}</span>
            </div>
          </div>

          <p className="text-xs text-[#ded7cb] leading-relaxed text-center">
            Trợ lý riêng của KTS Lorenzo Vane sẽ liên hệ trực tiếp qua số <strong className="text-white">{formData.phone}</strong> trong vòng 4 giờ làm việc để gửi thư mời chính thức kèm lộ trình di chuyển.
          </p>

          <button
            onClick={handleResetAndClose}
            className="w-full py-3 bg-[#d4af37] text-[#0b0a09] font-label-caps uppercase text-xs tracking-widest font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Đóng Cửa Sổ Hẹn
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Subtle note */}
          <div className="p-3 bg-[#26221c] border border-[#d4af37]/25 text-xs text-[#ded7cb] flex items-start gap-2.5 leading-relaxed">
            <Sparkles className="w-4 h-4 text-[#ffd88a] shrink-0 mt-0.5" />
            <span>
              Mỗi cuộc gặp là buổi làm việc riêng tư 1:1 với Giám đốc Thiết kế hoặc Kiến trúc sư trưởng, kèm bảo mật danh tính tuyệt đối.
            </span>
          </div>

          {/* Stepper */}
          <div className="border-b border-[#d4af37]/20 pb-4">
            <Steps
              size="small"
              current={currentStep}
              items={[
                { title: <span className="text-xs text-white">Quy Mô</span> },
                { title: <span className="text-xs text-white">Thời Gian</span> },
                { title: <span className="text-xs text-white">Bảo Mật</span> },
              ]}
            />
          </div>

          {/* Step 1: Typology & Location */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="font-mono text-[11px] uppercase text-[#ffd88a] block mb-1.5 font-bold">
                  1. Loại Hình Công Trình Ủy Thác
                </label>
                <Select
                  className="w-full"
                  value={formData.typology}
                  onChange={(val) => setFormData({ ...formData, typology: val })}
                  options={[
                    { value: 'villa', label: 'Dinh Thự Độc Lập Ven Hồ / Ven Rừng' },
                    { value: 'penthouse', label: 'Penthouse Duplex Trung Tâm Đô Thị' },
                    { value: 'sanctuary', label: 'Không Gian Thiền Định & Spa Tư Nhân' },
                    { value: 'gallery', label: 'Không Gian Lưu Trữ Nghệ Thuật & Bảo Tàng Gia Đình' },
                    { value: 'furniture', label: 'Ủy Thác Bộ Điêu Khắc Nội Thất Đá Nguyên Khối' },
                  ]}
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase text-[#ffd88a] block mb-1.5 font-bold">
                  2. Địa Điểm Khu Đất / Hiện Trạng
                </label>
                <Input
                  placeholder="Ví dụ: Bán đảo Como, Quận Tây Hồ Hà Nội, Saint-Germain Paris..."
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  prefix={<MapPin className="w-3.5 h-3.5 text-[#d4af37]" />}
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase text-[#ffd88a] block mb-1.5 font-bold">
                  3. Phân Xưởng Tiếp Nhận Khảo Sát
                </label>
                <Select
                  className="w-full"
                  value={formData.atelier}
                  onChange={(val) => setFormData({ ...formData, atelier: val })}
                  options={[
                    { value: 'milano', label: 'Atelier Milano (Via Montenapoleone, Ý)' },
                    { value: 'paris', label: 'Atelier Paris (Rue du Faubourg Saint-Honoré, Pháp)' },
                    { value: 'hanoi', label: 'Atelier Hà Nội (Phố Tràng Tiền, Hoàn Kiếm, VN)' },
                  ]}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] font-label-caps uppercase text-xs font-bold hover:brightness-110 transition-all shadow-md"
                >
                  Tiếp Tục: Chọn Thời Gian →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="font-mono text-[11px] uppercase text-[#ffd88a] block mb-1.5 font-bold">
                  1. Ngày Hẹn Dự Kiến
                </label>
                <DatePicker
                  className="w-full"
                  placeholder="Chọn ngày gặp mong muốn"
                  format="DD/MM/YYYY"
                  disabledDate={(current) => current && current < dayjs().endOf('day')}
                  onChange={(_, dateStr) => setFormData({ ...formData, date: Array.isArray(dateStr) ? dateStr[0] : dateStr })}
                />
                <span className="text-[11px] text-[#c5baa9] block mt-1">
                  Khuyến nghị đặt trước tối thiểu 48 giờ để chuẩn bị tư liệu mỏ đá phù hợp.
                </span>
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase text-[#ffd88a] block mb-1.5 font-bold">
                  2. Khung Giờ Làm Việc Ưu Tiên
                </label>
                <Select
                  className="w-full"
                  value={formData.timeSlot}
                  onChange={(val) => setFormData({ ...formData, timeSlot: val })}
                  options={[
                    { value: '09:30', label: 'Buổi Sáng: 09:30 — Khảo sát tư liệu vật liệu tự nhiên' },
                    { value: '14:30', label: 'Buổi Chiều: 14:30 — Phân tích mặt bằng & ánh sáng' },
                    { value: '17:00', label: 'Hoàng Hôn: 17:00 — Thưởng trà & đối thoại ý niệm kiến trúc' },
                  ]}
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  className="px-4 py-2 border border-[#d4af37]/40 text-[#ded7cb] font-label-caps uppercase text-xs hover:text-white"
                >
                  ← Quay Lại
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] font-label-caps uppercase text-xs font-bold hover:brightness-110 transition-all shadow-md"
                >
                  Tiếp Tục: Xác Nhận Danh Tính →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Identity & NDA */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="font-mono text-[11px] uppercase text-[#ffd88a] block mb-1.5 font-bold">
                  Họ &amp; Tên Chủ Đầu Tư / Người Đại Diện
                </label>
                <Input
                  placeholder="Ví dụ: Ông Trần Vũ Hoàng Nam"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  prefix={<User className="w-3.5 h-3.5 text-[#d4af37]" />}
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase text-[#ffd88a] block mb-1.5 font-bold">
                  Số Điện Thoại Riêng / Hotline Bảo Mật
                </label>
                <Input
                  placeholder="Ví dụ: +84 90 888 9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  prefix={<Phone className="w-3.5 h-3.5 text-[#d4af37]" />}
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase text-[#ffd88a] block mb-1.5 font-bold">
                  Email Nhận Hồ Sơ Kiến Trúc
                </label>
                <Input
                  placeholder="name@residence.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  prefix={<Mail className="w-3.5 h-3.5 text-[#d4af37]" />}
                />
              </div>

              <div className="pt-2">
                <Checkbox
                  checked={formData.ndaAccepted}
                  onChange={(e) => setFormData({ ...formData, ndaAccepted: e.target.checked })}
                >
                  <span className="text-xs text-[#ded7cb]">
                    Yêu cầu kích hoạt điều khoản cam kết bảo mật thông tin (NDA) hai chiều cho toàn bộ bản vẽ và tài liệu trao đổi.
                  </span>
                </Checkbox>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-[#d4af37]/40 text-[#ded7cb] font-label-caps uppercase text-xs hover:text-white"
                >
                  ← Quay Lại
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] font-label-caps uppercase text-xs font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                >
                  Khởi Tạo Lịch Hẹn Độc Bản ✓
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
};
