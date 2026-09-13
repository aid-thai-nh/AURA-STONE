import React, { useState } from 'react';
import { JournalArticle, ArchitecturalEvent, EventStatus } from '../types';
import { JOURNAL_DATA } from '../data/journal';
import { EVENTS_DATA } from '../data/events';
import { 
  ArrowRight, 
  Download, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Ticket, 
  AlertCircle,
  Radio,
  FileText,
  BookOpen
} from 'lucide-react';
import { Modal, Form, Input, Select, message } from 'antd';

interface JournalViewProps {
  onOpenConsultation: () => void;
}

export const JournalView: React.FC<JournalViewProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'journal' | 'events'>('events');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [bookOrdered, setBookOrdered] = useState(false);
  
  // Event Status filtering state
  const [eventStatusFilter, setEventStatusFilter] = useState<'ALL' | EventStatus>('ALL');
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<ArchitecturalEvent | null>(null);
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpForm] = Form.useForm();

  const selectedArticle = JOURNAL_DATA.find(a => a.id === selectedArticleId);

  const filteredEvents = EVENTS_DATA.filter(event => {
    if (eventStatusFilter === 'ALL') return true;
    return event.status === eventStatusFilter;
  });

  const handleDownloadExtract = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleOrderBook = () => {
    setBookOrdered(true);
    setTimeout(() => setBookOrdered(false), 4500);
  };

  const handleRsvpSubmit = (values: Record<string, string>) => {
    setRsvpSubmitting(true);
    setTimeout(() => {
      setRsvpSubmitting(false);
      setSelectedEventForRsvp(null);
      rsvpForm.resetFields();
      message.success(`Đã xác nhận yêu cầu vé mời cho ${values.fullName || 'Quý khách'}. Thư ký Atelier sẽ liên hệ qua điện thoại & email.`);
    }, 800);
  };

  // Helper for Status Badge styling
  const renderStatusBadge = (status: EventStatus, statusLabel: string, remainingSeats?: number) => {
    switch (status) {
      case 'HAPPENING_NOW':
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-[11px] uppercase font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>{statusLabel}</span>
            {remainingSeats !== undefined && (
              <span className="bg-emerald-900/90 text-emerald-200 px-1.5 py-0.5 text-[10px]">
                CÒN {remainingSeats} VÉ
              </span>
            )}
          </div>
        );
      case 'LIMITED_SEATS':
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono text-[11px] uppercase font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{statusLabel}</span>
          </div>
        );
      case 'UPCOMING':
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2b251a] border border-[#d4af37]/60 text-[#ffd88a] font-mono text-[11px] uppercase font-bold">
            <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{statusLabel}</span>
          </div>
        );
      case 'COMPLETED':
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#23201d] border border-[#524a40] text-[#a89e90] font-mono text-[11px] uppercase font-bold">
            <FileText className="w-3.5 h-3.5 text-[#a89e90]" />
            <span>{statusLabel}</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full pt-28 pb-20 px-4 md:px-8 lg:px-12 bg-[#191715] text-[#fbf9f5]">
      <div className="max-w-[1440px] mx-auto">
        {selectedArticle ? (
          /* Single Article Reader View */
          <div className="max-w-4xl mx-auto animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="inline-flex items-center gap-2 font-label-caps uppercase text-xs text-[#ffd88a] hover:text-white transition-colors mb-8 font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Quay Lại Kho Chuyên Khảo
            </button>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-xs font-mono text-[#c5baa9]">
                <span className="text-[#ffd88a] uppercase font-bold">{selectedArticle.category}</span>
                <span>·</span>
                <span>{selectedArticle.date}</span>
                <span>·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <h1 className="font-display-hero text-white text-balance">
                {selectedArticle.title}
              </h1>
              <p className="font-serif italic text-xl text-[#f5c065]">
                {selectedArticle.subtitle}
              </p>
              <div className="pt-2 text-xs font-mono text-[#ded7cb]">
                TÁC GIẢ: <strong className="text-[#ffd88a]">{selectedArticle.author.toUpperCase()}</strong> · {selectedArticle.role.toUpperCase()}
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] bg-[#2b2721] overflow-hidden mb-12 border border-[#d4af37]/35 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover brightness-95" />
            </div>

            {/* Pull Quote */}
            {selectedArticle.pullQuote && (
              <div className="my-10 p-8 md:p-12 bg-[#24211c] border-l-4 border-[#d4af37] shadow-lg">
                <p className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed">
                  &ldquo;{selectedArticle.pullQuote}&rdquo;
                </p>
                {selectedArticle.citation && (
                  <span className="font-mono text-xs text-[#ffd88a] block mt-4 uppercase font-semibold">
                    — {selectedArticle.citation}
                  </span>
                )}
              </div>
            )}

            {/* Article Content Paragraphs */}
            <div className="space-y-6 font-body-lead text-[#ded7cb] leading-relaxed border-b border-[#d4af37]/20 pb-12">
              {selectedArticle.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Bottom Reader Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => handleDownloadExtract(selectedArticle.title)}
                className="px-6 py-3 border border-[#d4af37]/45 bg-[#24211c] hover:border-[#d4af37] text-[#ffd88a] hover:text-white transition-all font-label-caps uppercase text-xs flex items-center gap-2 font-bold"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> Bản Tóm Tắt Chuyên Khảo Đã Tải Về
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Tải Trích Đoạn Chuyên Khảo PDF
                  </>
                )}
              </button>

              <button
                onClick={onOpenConsultation}
                className="btn-monolith"
              >
                Đối Thoại Với Tác Giả &amp; KTS
              </button>
            </div>
          </div>
        ) : (
          /* Archive Overview */
          <>
            <div className="border-b border-[#d4af37]/25 pb-8 mb-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37] inline-block"></span>
                <span className="font-label-caps text-[#f5c065] uppercase tracking-[0.25em] text-xs font-bold">
                  LƯU TRỮ VĂN HÓA &amp; SỰ KIỆN ATELIER
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="font-display-hero text-white tracking-tight">
                    Tạp Chí &amp; Lịch Sự Kiện Quốc Tế
                  </h1>
                  <p className="font-body-lead text-[#ded7cb] max-w-2xl mt-3 leading-relaxed">
                    Theo dõi lịch triển lãm điêu khắc đá, các buổi tọa đàm âm học riêng tư tại Milan, Paris, Hà Nội và kho lưu trữ chuyên khảo kiến trúc nguyên khối.
                  </p>
                </div>

                {/* Primary Section Switcher */}
                <div className="flex items-center p-1 bg-[#221f1a] border border-[#d4af37]/35 shrink-0 self-start md:self-auto">
                  <button
                    onClick={() => setActiveTab('events')}
                    className={`px-5 py-2.5 font-label-caps uppercase text-xs font-bold transition-all flex items-center gap-2 ${
                      activeTab === 'events'
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] shadow-md'
                        : 'text-[#ded7cb] hover:text-white hover:bg-[#2b2721]'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Lịch Sự Kiện &amp; Triển Lãm ({EVENTS_DATA.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('journal')}
                    className={`px-5 py-2.5 font-label-caps uppercase text-xs font-bold transition-all flex items-center gap-2 ${
                      activeTab === 'journal'
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] shadow-md'
                        : 'text-[#ded7cb] hover:text-white hover:bg-[#2b2721]'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Chuyên Khảo Lưu Trữ ({JOURNAL_DATA.length})
                  </button>
                </div>
              </div>
            </div>

            {/* TAB CONTENT: EVENTS & VERNISSAGES */}
            {activeTab === 'events' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Status Filter Badges Bar */}
                <div className="bg-[#221f1a] border border-[#d4af37]/30 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#ffd88a]" />
                    <span className="font-label-caps text-xs uppercase tracking-widest text-[#ffd88a] font-bold">
                      LỌC THEO TRẠNG THÁI SỰ KIỆN:
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full md:w-auto">
                    {[
                      { key: 'ALL', label: 'Tất Cả' },
                      { key: 'HAPPENING_NOW', label: 'Đang Diễn Ra', icon: Radio },
                      { key: 'LIMITED_SEATS', label: 'Chỉ Còn Ít Suất', icon: AlertCircle },
                      { key: 'UPCOMING', label: 'Sắp Diễn Ra', icon: Calendar },
                      { key: 'COMPLETED', label: 'Đã Lưu Kỷ Yếu', icon: FileText }
                    ].map((st) => (
                      <button
                        key={st.key}
                        onClick={() => setEventStatusFilter(st.key as any)}
                        className={`px-3 py-1.5 border text-xs font-mono font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          eventStatusFilter === st.key
                            ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold shadow-sm'
                            : 'bg-[#1e1b18] text-[#ded7cb] border-[#443d33] hover:border-[#d4af37]/50 hover:text-white'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Events Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-[#221f1a] border border-[#d4af37]/35 flex flex-col justify-between hover:border-[#d4af37] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                    >
                      <div>
                        {/* Event Image Banner with Status Overlay */}
                        <div className="relative aspect-[16/9] bg-[#292520] overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4">
                            {renderStatusBadge(event.status, event.statusLabel, event.remainingSeats)}
                          </div>
                          <div className="absolute bottom-3 right-3 bg-[#191715]/90 backdrop-blur-md px-3 py-1 border border-[#d4af37]/35 text-[11px] font-mono text-[#ffd88a]">
                            {event.city}
                          </div>
                        </div>

                        {/* Event Body Info */}
                        <div className="p-6 sm:p-8 space-y-4">
                          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#c5baa9] border-b border-[#d4af37]/15 pb-3">
                            <span className="flex items-center gap-1.5 text-[#ffd88a] font-semibold">
                              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> {event.date}
                            </span>
                            <span className="flex items-center gap-1.5 text-[#ded7cb]">
                              <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> {event.time}
                            </span>
                          </div>

                          <h3 className="font-serif text-2xl text-white hover:text-[#ffd88a] transition-colors leading-snug">
                            {event.title}
                          </h3>

                          <p className="font-serif italic text-sm text-[#f5c065]">
                            {event.subtitle}
                          </p>

                          <p className="font-body-muted text-xs text-[#ded7cb] leading-relaxed">
                            {event.description}
                          </p>

                          {/* Location & Atelier */}
                          <div className="p-3.5 bg-[#1b1916] border border-[#d4af37]/20 flex items-start gap-2.5 text-xs">
                            <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-white font-medium">{event.location}</div>
                              <div className="font-mono text-[10.5px] text-[#c5baa9] mt-0.5">
                                Điểm tiếp đón: {event.atelier} · Giám tuyển: <strong className="text-[#ffd88a]">{event.curator}</strong>
                              </div>
                            </div>
                          </div>

                          {/* Highlights Checklist */}
                          <div className="space-y-1.5 pt-2">
                            <div className="font-mono text-[10px] text-[#ffd88a] uppercase tracking-wider font-semibold">
                              ĐIỂM NHẤN CHƯƠNG TRÌNH:
                            </div>
                            {event.highlights.map((hl, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-[#ded7cb]">
                                <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Event Card Action Footer */}
                      <div className="p-6 sm:p-8 pt-0">
                        <div className="border-t border-[#d4af37]/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="text-xs font-mono text-[#c5baa9]">
                            {event.status === 'COMPLETED' ? (
                              <span className="text-[#a89e90]">Kỷ yếu đã phát hành</span>
                            ) : event.remainingSeats ? (
                              <span>
                                Giới hạn:{' '}
                                <strong className="text-[#ffd88a]">
                                  {event.remainingSeats}/{event.totalSeats} chỗ
                                </strong>
                              </span>
                            ) : (
                              <span className="text-[#ffd88a]">Mở đăng ký công khai</span>
                            )}
                          </div>

                          {event.status === 'COMPLETED' ? (
                            <button
                              onClick={() => handleDownloadExtract(event.title)}
                              className="w-full sm:w-auto px-4 py-2 border border-[#d4af37]/45 bg-[#24211c] hover:border-[#d4af37] text-[#ffd88a] hover:text-white transition-all font-label-caps uppercase text-xs flex items-center justify-center gap-2 font-bold"
                            >
                              <Download className="w-3.5 h-3.5" /> Tải Kỷ Yếu Hội Thảo PDF
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedEventForRsvp(event);
                                rsvpForm.resetFields();
                              }}
                              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] hover:bg-white transition-all font-label-caps uppercase text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:brightness-110"
                            >
                              <Ticket className="w-3.5 h-3.5" /> Đăng Ký Thư Mời VIP (RSVP)
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: MONOGRAPHS & RESEARCH JOURNAL */}
            {activeTab === 'journal' && (
              <div className="space-y-12 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {JOURNAL_DATA.map((article) => (
                    <article
                      key={article.id}
                      className="group bg-[#221f1a] border border-[#d4af37]/35 flex flex-col justify-between hover:border-[#d4af37] transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                    >
                      <div>
                        <div
                          className="relative aspect-[16/10] bg-[#2b2721] overflow-hidden cursor-pointer"
                          onClick={() => setSelectedArticleId(article.id)}
                        >
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                          />
                          <div className="absolute top-3 left-3 bg-[#191715] text-[#ffd88a] border border-[#d4af37]/45 px-2.5 py-1 font-mono text-[10px] uppercase font-bold">
                            {article.category}
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-2 text-xs font-mono text-[#c5baa9] mb-2">
                            <span>{article.date}</span>
                            <span>·</span>
                            <span>{article.readTime}</span>
                          </div>

                          <h2
                            onClick={() => setSelectedArticleId(article.id)}
                            className="font-serif text-2xl text-white cursor-pointer group-hover:text-[#ffd88a] transition-colors"
                          >
                            {article.title}
                          </h2>

                          <p className="font-serif italic text-sm text-[#f5c065] mt-1">
                            {article.subtitle}
                          </p>

                          <p className="font-body-muted text-xs text-[#ded7cb] mt-3 line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <div className="border-t border-[#d4af37]/20 pt-4 flex items-center justify-between">
                          <span className="font-mono text-[10px] text-[#ffd88a] font-medium">
                            TÁC GIẢ: {article.author}
                          </span>
                          <button
                            onClick={() => setSelectedArticleId(article.id)}
                            className="inline-flex items-center gap-1 font-label-caps uppercase text-[11px] tracking-wider text-[#ffd88a] hover:text-white transition-colors font-bold"
                          >
                            Đọc Chuyên Khảo <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Print Monograph Order Notice */}
                <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-[#211e19] via-[#2a2520] to-[#211e19] border border-[#d4af37]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#f5c065] uppercase tracking-widest block font-bold flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      ẤN BẢN VẢI BỌC BÌA CỨNG GIỚI HẠN
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-white">
                      Chuyên Khảo Tập IV: Bản Bìa Vải Thủ Công Sưu Tầm
                    </h3>
                    <p className="font-body-muted text-xs text-[#ded7cb] max-w-2xl leading-relaxed">
                      Quyển sách 340 trang in tại xưởng in Verona trên giấy nghệ thuật Munken cao cấp của Ý với bìa vải buckram dập chìm không màu. Tặng kèm các trang gấp khổ lớn của Dinh thự Castiglione và Biệt thự Travertine.
                    </p>
                    {bookOrdered && (
                      <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center gap-2">
                        <Check className="w-4 h-4" /> Đã gửi yêu cầu đặt sách lưu niệm về bàn thư ký xuất bản tại Milan. Chúng tôi sẽ gửi email xác nhận.
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleOrderBook}
                    className="btn-monolith shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    Đặt Sách Lưu Trữ (140 € ~ 3.700.000 đ)
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Ant Design Modal: RSVP for Event */}
        <Modal
          open={!!selectedEventForRsvp}
          onCancel={() => setSelectedEventForRsvp(null)}
          footer={null}
          centered
          className="luxury-modal"
          styles={{
            content: {
              backgroundColor: '#1d1a16',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              borderRadius: 0,
              padding: '28px',
              color: '#fbf9f5'
            }
          }}
        >
          {selectedEventForRsvp && (
            <div className="space-y-5">
              <div className="border-b border-[#d4af37]/20 pb-3">
                <div className="flex items-center gap-2 mb-1.5">
                  {renderStatusBadge(selectedEventForRsvp.status, selectedEventForRsvp.statusLabel, selectedEventForRsvp.remainingSeats)}
                </div>
                <h3 className="font-serif text-2xl text-white mt-2">
                  Đăng Ký Thư Mời VIP (RSVP)
                </h3>
                <p className="font-serif italic text-xs text-[#f5c065] mt-1">
                  {selectedEventForRsvp.title}
                </p>
                <div className="font-mono text-[11px] text-[#c5baa9] mt-2 flex items-center gap-3">
                  <span>{selectedEventForRsvp.date}</span>
                  <span>·</span>
                  <span>{selectedEventForRsvp.location}</span>
                </div>
              </div>

              <Form
                form={rsvpForm}
                layout="vertical"
                onFinish={handleRsvpSubmit}
                className="space-y-3"
              >
                <Form.Item
                  label={<span className="font-mono text-xs text-[#ded7cb]">HỌ VÀ TÊN KHÁCH MỜI</span>}
                  name="fullName"
                  rules={[{ required: true, message: 'Vui lòng cung cấp danh xưng' }]}
                >
                  <Input placeholder="Ví dụ: Ông Trần Anh Tuấn" className="bg-[#24201c] border-[#443d33] text-white" />
                </Form.Item>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Form.Item
                    label={<span className="font-mono text-xs text-[#ded7cb]">SỐ ĐIỆN THOẠI TRỰC TIẾP</span>}
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                  >
                    <Input placeholder="+84 90 123 4567" className="bg-[#24201c] border-[#443d33] text-white" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="font-mono text-xs text-[#ded7cb]">EMAIL BẢO MẬT NHẬN THƯ MỜI</span>}
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}
                  >
                    <Input placeholder="tuan.tran@domain.com" className="bg-[#24201c] border-[#443d33] text-white" />
                  </Form.Item>
                </div>

                <Form.Item
                  label={<span className="font-mono text-xs text-[#ded7cb]">SỐ LƯỢNG KHÁCH THÁP TÙNG (TỐI ĐA 2 NGƯỜI)</span>}
                  name="guests"
                  initialValue="1"
                >
                  <Select
                    options={[
                      { value: '1', label: '1 Khách mời chính thức' },
                      { value: '2', label: '2 Khách mời (Kèm phu nhân/phu quân hoặc KTS riêng)' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="font-mono text-xs text-[#ded7cb]">GHI CHÚ ĐẶC BIỆT / QUAN TÂM TÁC PHẨM</span>}
                  name="notes"
                >
                  <Input.TextArea rows={3} placeholder="Ví dụ: Quan tâm bàn console đá Tivoli nguyên khối cho biệt thự ven hồ..." className="bg-[#24201c] border-[#443d33] text-white" />
                </Form.Item>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedEventForRsvp(null)}
                    className="px-4 py-2 text-xs font-mono text-[#ded7cb] hover:text-white"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={rsvpSubmitting}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] font-label-caps uppercase text-xs font-bold hover:bg-white transition-all shadow-md"
                  >
                    {rsvpSubmitting ? 'Đang Xử Lý...' : 'Xác Nhận Thư Mời VIP'}
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};
