import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, FileText, ArrowRight, ShieldCheck, Check, Sparkles, Building2, MapPin, Calendar, Clock, UserCheck } from 'lucide-react';
import { getDossiers, findDossierByCode, ClientDossier } from '../services/mockClientStorage';
import { Select } from 'antd';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNew: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  onBookNew
}) => {
  const [accessCode, setAccessCode] = useState('AS-2025-MIL');
  const [activeDossier, setActiveDossier] = useState<ClientDossier | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [logDownloaded, setLogDownloaded] = useState(false);
  const [allDossiers, setAllDossiers] = useState<ClientDossier[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const list = getDossiers();
      setAllDossiers(list);
      // Auto-populate default if available
      const defaultDoc = findDossierByCode('AS-2025-MIL') || list[0];
      if (defaultDoc && !authenticated) {
        setAccessCode(defaultDoc.code);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    const found = findDossierByCode(accessCode);
    if (found) {
      setActiveDossier(found);
      setAuthenticated(true);
    } else {
      setErrorMessage(`Không tìm thấy hồ sơ mang mã "${accessCode.trim().toUpperCase()}". Vui lòng kiểm tra lại hoặc chọn mã mẫu.`);
    }
  };

  const handleSelectPredefined = (code: string) => {
    setAccessCode(code);
    setErrorMessage(null);
    const found = findDossierByCode(code);
    if (found) {
      setActiveDossier(found);
      setAuthenticated(true);
    }
  };

  const handleDownloadLog = () => {
    setLogDownloaded(true);
    setTimeout(() => setLogDownloaded(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#201d19] text-[#fbf9f5] border border-[#d4af37]/45 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col max-h-[94vh] overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="p-4 md:p-6 bg-[#181613] text-[#fbf9f5] flex items-center justify-between border-b border-[#d4af37]/35 shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#ffd88a]" />
            <span className="font-label-caps text-[#f5c065] text-[10px] tracking-[0.25em] uppercase font-bold">
              CỔNG TRUY CẬP HỒ SƠ ỦY THÁC BẢO MẬT 256-BIT
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-[#d4af37]/40 text-[#ffd88a] hover:bg-[#d4af37] hover:text-[#0b0a09] transition-colors"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {!authenticated ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-white">
                  Tra Cứu Hồ Sơ &amp; Tiến Độ Khai Thác Đá
                </h3>
                <p className="font-body-muted text-sm text-[#ded7cb] mt-2 leading-relaxed">
                  Nhập mã ủy thác độc bản từ bộ tài liệu bọc da đã được gửi tới dinh thự của quý khách để truy cập nhật ký chế tác thực địa và camera giám sát tại xưởng đá Ý &amp; Pháp.
                </p>
              </div>

              {/* Predefined Dossiers Quick Selector */}
              <div className="p-4 bg-[#27231e] border border-[#d4af37]/25 space-y-2">
                <span className="font-mono text-[10px] text-[#ffd88a] uppercase tracking-wider block font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  CHỌN NHANH HỒ SƠ MẪU ĐANG THỰC HIỆN:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {allDossiers.slice(0, 3).map((d) => (
                    <button
                      key={d.code}
                      type="button"
                      onClick={() => handleSelectPredefined(d.code)}
                      className="text-left p-2.5 bg-[#1a1714] border border-[#d4af37]/20 hover:border-[#d4af37] transition-all group"
                    >
                      <span className="font-mono text-[10px] text-[#ffd88a] font-bold block">
                        {d.code}
                      </span>
                      <span className="font-serif text-xs text-white group-hover:text-[#ffd88a] transition-colors line-clamp-1">
                        {d.projectTitle.split('—')[0]}
                      </span>
                      <span className="text-[10px] text-[#c5baa9] block mt-0.5">{d.atelier}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] uppercase text-[#f5c065] block mb-1 font-bold">
                    KHÓA BẢO MẬT HỒ SƠ / MÃ KHÁCH HÀNG
                  </label>
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="w-full px-4 py-3 bg-[#171513] border border-[#d4af37]/40 text-white font-mono text-sm tracking-widest focus:outline-none focus:border-[#d4af37]"
                    placeholder="Ví dụ: AS-2025-MIL"
                  />
                  {errorMessage && (
                    <p className="text-red-400 text-xs font-mono mt-1.5">{errorMessage}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto btn-monolith shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                  >
                    Xác Thực Quyền Truy Cập
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onBookNew();
                    }}
                    className="text-xs font-mono text-[#ffd88a] hover:underline font-semibold"
                  >
                    Cần khởi tạo một hồ sơ ủy thác mới?
                  </button>
                </div>
              </form>
            </div>
          ) : (
            activeDossier && (
              <div className="space-y-6">
                {/* Active Header Card */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#d4af37]/25 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-0.5 uppercase tracking-wider font-bold">
                        {activeDossier.statusLabel}
                      </span>
                      <span className="text-xs font-mono text-[#a89e90]">Mã: <strong className="text-[#ffd88a]">{activeDossier.code}</strong></span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-white mt-1.5">
                      {activeDossier.projectTitle}
                    </h3>
                    <div className="text-xs font-mono text-[#ded7cb] mt-1 flex flex-wrap gap-x-4 gap-y-1">
                      <span>Chủ đầu tư: <strong className="text-white">{activeDossier.clientName}</strong></span>
                      <span>·</span>
                      <span>KTS Trưởng: <strong className="text-[#ffd88a]">{activeDossier.leadArchitect}</strong></span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAuthenticated(false)}
                    className="text-xs font-mono text-[#c5baa9] hover:text-white border border-[#d4af37]/30 px-3 py-1 bg-[#1a1714] self-start"
                  >
                    Đổi Hồ Sơ
                  </button>
                </div>

                {/* Technical Overview Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3 bg-[#181613] border border-[#d4af37]/20">
                    <span className="text-[10px] text-[#a89e90] block uppercase">VỈA ĐÁ NGUYÊN BẢN</span>
                    <strong className="text-white text-xs block mt-0.5 line-clamp-1" title={activeDossier.specifications.stoneQuarry}>
                      {activeDossier.specifications.stoneQuarry.split(',')[0]}
                    </strong>
                  </div>
                  <div className="p-3 bg-[#181613] border border-[#d4af37]/20">
                    <span className="text-[10px] text-[#a89e90] block uppercase">TỔNG TẢI TRỌNG</span>
                    <strong className="text-[#ffd88a] text-xs block mt-0.5">
                      {activeDossier.specifications.totalWeight}
                    </strong>
                  </div>
                  <div className="p-3 bg-[#181613] border border-[#d4af37]/20">
                    <span className="text-[10px] text-[#a89e90] block uppercase">MỤC TIÊU ÂM HỌC</span>
                    <strong className="text-white text-xs block mt-0.5">
                      {activeDossier.specifications.acousticTarget.split('(')[0]}
                    </strong>
                  </div>
                  <div className="p-3 bg-[#181613] border border-[#d4af37]/20">
                    <span className="text-[10px] text-[#a89e90] block uppercase">PHÂN XƯỞNG CHẾ TÁC</span>
                    <strong className="text-[#ffd88a] text-xs block mt-0.5">
                      {activeDossier.atelier}
                    </strong>
                  </div>
                </div>

                {/* Progress Milestones */}
                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-wider block font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#d4af37] inline-block"></span>
                    TIẾN ĐỘ THI CÔNG &amp; NGHIỆM THU THEO MỐC
                  </span>

                  <div className="space-y-2.5 font-mono text-xs">
                    {activeDossier.milestones.map((m) => (
                      <div
                        key={m.phaseNumber}
                        className={`flex items-start gap-3 p-3.5 border transition-all ${
                          m.active
                            ? 'bg-[#27221b] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                            : m.completed
                            ? 'bg-[#1b1916] border-emerald-500/35'
                            : 'bg-[#161412] border-[#3a352e] opacity-60'
                        }`}
                      >
                        {m.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : m.active ? (
                          <div className="w-3.5 h-3.5 bg-[#d4af37] shadow-[0_0_8px_#d4af37] animate-pulse shrink-0 mt-1"></div>
                        ) : (
                          <div className="w-3.5 h-3.5 border border-[#857b6f] shrink-0 mt-1"></div>
                        )}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className={`font-medium ${m.active ? 'text-[#ffd88a] font-bold' : m.completed ? 'text-white' : 'text-[#a89e90]'}`}>
                              Giai Đoạn 0{m.phaseNumber}: {m.title}
                            </span>
                            <span className="text-[10px] text-[#ded7cb]">{m.date}</span>
                          </div>
                          <p className="text-[11px] text-[#ded7cb] mt-1 font-sans leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {logDownloaded && (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center gap-2">
                    <Check className="w-4 h-4" /> Bản báo cáo kiểm định chất lượng phân giải cao kèm kết quả quét siêu âm đá đã được tải về.
                  </div>
                )}

                <div className="pt-4 border-t border-[#d4af37]/20 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <button
                    onClick={handleDownloadLog}
                    className="w-full sm:w-auto px-5 py-2.5 border border-[#d4af37]/45 text-xs font-label-caps uppercase text-[#ffd88a] hover:bg-[#d4af37] hover:text-[#0b0a09] transition-all font-bold flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> Tải Biên Bản Giám Định &amp; Thẩm Âm (PDF)
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#27231d] border border-[#d4af37]/35 text-white text-xs font-label-caps uppercase hover:border-[#d4af37] transition-colors"
                  >
                    Đóng Cổng Thông Tin
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
