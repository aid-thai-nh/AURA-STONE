import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FurniturePiece } from '../types';
import { 
  ArrowRight, 
  Sliders, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  RotateCcw, 
  Box, 
  Scale, 
  Clock, 
  RotateCw,
  Bookmark,
  Layers,
  X,
  Plus
} from 'lucide-react';
import { Pagination, Select, Input } from 'antd';
import { motion, AnimatePresence } from 'motion/react';
import { FurnitureSkeleton } from './FurnitureSkeleton';

interface FurnitureViewProps {
  furniture: FurniturePiece[];
  onSelectFurniture: (piece: FurniturePiece) => void;
  onOpenConsultation: () => void;
  curatedPieces?: FurniturePiece[];
  onToggleCurate?: (piece: FurniturePiece) => void;
  comparePieces?: FurniturePiece[];
  onToggleCompare?: (piece: FurniturePiece) => void;
  onOpenComparator?: () => void;
  onClearCompare?: () => void;
  onOpenCuratedDrawer?: () => void;
}

export const FurnitureView: React.FC<FurnitureViewProps> = ({
  furniture = [],
  onSelectFurniture,
  onOpenConsultation,
  curatedPieces = [],
  onToggleCurate,
  comparePieces = [],
  onToggleCompare,
  onOpenComparator,
  onClearCompare,
  onOpenCuratedDrawer
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [leadTimeFilter, setLeadTimeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('curated');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const gridTopRef = useRef<HTMLDivElement>(null);

  // Initial loading skeleton simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const triggerLoadingTransition = (action: () => void, duration = 300) => {
    setIsLoading(true);
    action();
    setTimeout(() => {
      setIsLoading(false);
    }, duration);
  };

  // Filter & Search & Sort Logic
  const filteredAndSortedPieces = useMemo(() => {
    let result = [...furniture];

    // 1. Category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. Material
    if (materialFilter !== 'all') {
      result = result.filter(p => {
        const mat = p.materiality.toLowerCase();
        if (materialFilter === 'travertine') return mat.includes('travertine');
        if (materialFilter === 'oak') return mat.includes('sồi') || mat.includes('oak') || mat.includes('óc chó');
        if (materialFilter === 'basalt') return mat.includes('bazan') || mat.includes('basalt');
        if (materialFilter === 'marble') return mat.includes('cẩm thạch') || mat.includes('marquina') || mat.includes('marble');
        if (materialFilter === 'brass') return mat.includes('đồng') || mat.includes('brass') || mat.includes('bronze');
        if (materialFilter === 'alabaster') return mat.includes('alabaster') || mat.includes('thạch cao');
        return true;
      });
    }

    // 3. Lead time
    if (leadTimeFilter !== 'all') {
      result = result.filter(p => {
        const lt = p.leadTime.toLowerCase();
        if (leadTimeFilter === 'fast') return lt.includes('6-8') || lt.includes('8-10');
        if (leadTimeFilter === 'medium') return lt.includes('10-12') || lt.includes('12-14');
        if (leadTimeFilter === 'long') return lt.includes('14-16') || lt.includes('16-18');
        return true;
      });
    }

    // 4. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.materiality.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.dimensions.toLowerCase().includes(q) ||
        p.edition.toLowerCase().includes(q)
      );
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === 'weight-desc') {
        const parseW = (w: string) => parseInt(w.replace(/\D/g, ''), 10) || 0;
        return parseW(b.weight) - parseW(a.weight);
      }
      if (sortBy === 'weight-asc') {
        const parseW = (w: string) => parseInt(w.replace(/\D/g, ''), 10) || 0;
        return parseW(a.weight) - parseW(b.weight);
      }
      if (sortBy === 'edition-asc') {
        return a.totalEditions - b.totalEditions;
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title, 'vi');
      }
      return 0; // curated default
    });

    return result;
  }, [furniture, activeCategory, materialFilter, leadTimeFilter, searchQuery, sortBy]);

  // Paginated slice
  const paginatedPieces = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedPieces.slice(start, start + pageSize);
  }, [filteredAndSortedPieces, currentPage, pageSize]);

  const handlePageChange = (page: number, size?: number) => {
    triggerLoadingTransition(() => {
      setCurrentPage(page);
      if (size) setPageSize(size);
    }, 280);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setMaterialFilter('all');
    setLeadTimeFilter('all');
    setSearchQuery('');
    setSortBy('curated');
    setCurrentPage(1);
  };

  const handleManualRefresh = () => {
    triggerLoadingTransition(() => {}, 500);
  };

  const hasActiveFilters =
    activeCategory !== 'all' ||
    materialFilter !== 'all' ||
    leadTimeFilter !== 'all' ||
    searchQuery !== '' ||
    sortBy !== 'curated';

  return (
    <div className="w-full pt-28 pb-28 px-4 md:px-8 lg:px-12 bg-[#191715] text-[#fbf9f5] relative">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="border-b border-[#d4af37]/25 pb-10 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37] inline-block"></span>
            <span className="font-label-caps text-[#f5c065] uppercase tracking-[0.25em] text-xs font-bold">
              BỘ SƯU TẬP TẬP IV · PHIÊN BẢN ĐÁNH SỐ GIỚI HẠN
            </span>
          </div>
          <h1 className="font-display-hero text-white tracking-tight">
            Nội Thất &amp; Điêu Khắc Đá Nguyên Khối
          </h1>
          <p className="font-body-lead text-[#ded7cb] max-w-3xl mt-4 leading-relaxed">
            Các tác phẩm điêu khắc công năng được cắt gọt trực tiếp từ các vỉa đá nguyên khối tại mỏ đá La Mã cổ và các thân gỗ sồi châu Âu hun khói thủ công. Mỗi tác phẩm được giới hạn nghiêm ngặt từ 6 đến 12 bản trên toàn thế giới.
          </p>
        </div>

        {/* Anchor point for smooth scrolling on page change */}
        <div ref={gridTopRef} className="scroll-mt-32" />

        {/* Category Primary Filter Tabs + Quick Selection Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#d4af37]/20">
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-label-caps uppercase pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'Tất Cả Tác Phẩm' },
              { id: 'tables', label: 'Bàn Nguyên Khối' },
              { id: 'seating', label: 'Ghế & Băng Đá' },
              { id: 'casegoods', label: 'Tủ Kệ Kiến Trúc' },
              { id: 'lighting', label: 'Chiếu Sáng Điêu Khắc' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  if (activeCategory !== cat.id) {
                    triggerLoadingTransition(() => {
                      setActiveCategory(cat.id);
                      setCurrentPage(1);
                    }, 280);
                  }
                }}
                className={`px-4 py-2.5 border transition-all whitespace-nowrap font-bold ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                    : 'bg-[#24211c] text-[#ded7cb] border-[#443d33] hover:border-[#d4af37]/60 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {onOpenCuratedDrawer && (
              <button
                onClick={onOpenCuratedDrawer}
                className="flex items-center gap-2 text-xs font-mono text-[#ffd88a] bg-[#29241e] hover:bg-[#342e26] px-3.5 py-2 border border-[#d4af37]/45 font-bold transition-all shadow-sm"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Hồ Sơ Tuyển Chọn ({curatedPieces.length})</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#ded7cb] bg-[#24211c] px-3.5 py-2 border border-[#d4af37]/35 font-medium shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>CHỨNG THƯ ĐỘC BẢN CÓ CHỮ KÝ TÁC GIẢ</span>
            </div>
          </div>
        </div>

        {/* Multi-Dimensional Filter Toolbar */}
        <div className="bg-[#221f1a] border border-[#d4af37]/30 p-4 md:p-6 mb-10 shadow-[0_4px_25px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#d4af37]/20">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#ffd88a]" />
              <span className="font-label-caps text-xs uppercase tracking-widest text-[#ffd88a] font-bold">
                BỘ LỌC CHUYÊN SÂU &amp; TRA CỨU TÁC PHẨM
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-xs text-[#c5baa9]">
                Tìm thấy <strong className="text-[#ffd88a]">{filteredAndSortedPieces.length}</strong> tác phẩm
              </span>
              <button
                onClick={handleManualRefresh}
                className="flex items-center gap-1 font-mono text-[11px] text-[#ffd88a] hover:text-white bg-[#28241f] hover:bg-[#332e27] border border-[#d4af37]/35 px-2.5 py-1 transition-all"
                title="Mô phỏng hiệu ứng skeleton loading"
              >
                <RotateCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} /> Tải Lại
              </button>
              {hasActiveFilters && (
                <button
                  onClick={() => triggerLoadingTransition(handleResetFilters, 280)}
                  className="flex items-center gap-1 font-mono text-[11px] text-[#ffd88a] hover:text-white underline font-semibold transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Đặt lại bộ lọc
                </button>
              )}
            </div>
          </div>

          {/* 4-column filter grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block font-mono text-[10.5px] uppercase tracking-wider text-[#ded7cb] mb-1.5 font-semibold">
                Từ Khóa / Kích Thước
              </label>
              <Input
                placeholder="Travertine, sồi hun khói, 320 cm..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                prefix={<Search className="w-3.5 h-3.5 text-[#d4af37]" />}
                allowClear
              />
            </div>

            <div>
              <label className="block font-mono text-[10.5px] uppercase tracking-wider text-[#ded7cb] mb-1.5 font-semibold">
                Vật Liệu Khai Thác
              </label>
              <Select
                className="w-full"
                value={materialFilter}
                onChange={(val) => {
                  setMaterialFilter(val);
                  setCurrentPage(1);
                }}
                options={[
                  { value: 'all', label: 'Tất Cả Vật Liệu (Đá & Gỗ Sồi & Đồng)' },
                  { value: 'travertine', label: 'Đá Travertine La Mã Tivoli' },
                  { value: 'marble', label: 'Đá Cẩm Thạch Nero Marquina' },
                  { value: 'basalt', label: 'Đá Bazan Núi Lửa Nguyên Khối' },
                  { value: 'oak', label: 'Gỗ Sồi Pháp & Óc Chó Hun Khói' },
                  { value: 'brass', label: 'Đồng Thau & Đồng Đúc Sa Thạch' },
                  { value: 'alabaster', label: 'Thạch Cao Alabaster Volterra' },
                ]}
              />
            </div>

            <div>
              <label className="block font-mono text-[10.5px] uppercase tracking-wider text-[#ded7cb] mb-1.5 font-semibold">
                Tiến Độ Chế Tác
              </label>
              <Select
                className="w-full"
                value={leadTimeFilter}
                onChange={(val) => {
                  setLeadTimeFilter(val);
                  setCurrentPage(1);
                }}
                options={[
                  { value: 'all', label: 'Tất Cả Thời Gian Hoàn Thiện' },
                  { value: 'fast', label: 'Tiến Độ Nhanh (6 - 10 Tuần)' },
                  { value: 'medium', label: 'Tiến Độ Trung Bình (10 - 14 Tuần)' },
                  { value: 'long', label: 'Công Trình Độc Bản Lớn (14 - 18 Tuần)' },
                ]}
              />
            </div>

            <div>
              <label className="block font-mono text-[10.5px] uppercase tracking-wider text-[#ded7cb] mb-1.5 font-semibold">
                Sắp Xếp Danh Mục
              </label>
              <Select
                className="w-full"
                value={sortBy}
                onChange={(val) => setSortBy(val)}
                options={[
                  { value: 'curated', label: 'Giám Tuyển Ưu Tiên (Tiêu chuẩn)' },
                  { value: 'weight-desc', label: 'Khối Lượng: Nặng Nhất Trước' },
                  { value: 'weight-asc', label: 'Khối Lượng: Gọn Nhẹ Trước' },
                  { value: 'edition-asc', label: 'Độ Hiếm: Dưới 6 Bản Độc Quyền' },
                  { value: 'title-asc', label: 'Tên Tác Phẩm: A → Z' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Furniture Cards Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FurnitureSkeleton count={pageSize} />
            </motion.div>
          ) : paginatedPieces.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center bg-[#221f1a] border border-[#d4af37]/30 p-8"
            >
              <Box className="w-10 h-10 text-[#ffd88a] mx-auto mb-3 stroke-[1.2]" />
              <h3 className="font-serif text-xl text-white">Không tìm thấy tác phẩm phù hợp tiêu chí</h3>
              <p className="text-xs text-[#ded7cb] mt-2 max-w-md mx-auto leading-relaxed">
                Vui lòng thử điều chỉnh lại bộ lọc vật liệu hoặc xóa từ khóa tìm kiếm để khám phá toàn bộ bộ sưu tập điêu khắc đá nguyên khối.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 px-5 py-2.5 bg-[#d4af37] text-[#0b0a09] font-label-caps uppercase text-xs font-bold hover:bg-white transition-all shadow-md"
              >
                Xóa Bộ Lọc Để Xem Toàn Bộ
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`page-${currentPage}-${activeCategory}-${materialFilter}-${sortBy}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {paginatedPieces.map((piece, index) => {
                const isCurated = curatedPieces.some(p => p.id === piece.id);
                const isCompared = comparePieces.some(p => p.id === piece.id);

                return (
                  <motion.div
                    key={piece.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-[#221f1a] border border-[#d4af37]/35 flex flex-col justify-between transition-all duration-300 hover:border-[#d4af37] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                  >
                    <div>
                      {/* Image Container with Floating Curate & Compare Badges */}
                      <div
                        className="relative aspect-[4/3] bg-[#2b2721] overflow-hidden cursor-pointer"
                        onClick={() => onSelectFurniture(piece)}
                      >
                        <img
                          src={piece.image}
                          alt={piece.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                        />
                        <div className="absolute top-3 left-3 bg-[#191715]/90 backdrop-blur-sm text-[#ffd88a] border border-[#d4af37]/45 px-3 py-1 font-mono text-[10px] font-bold shadow-md">
                          {piece.edition}
                        </div>

                        {/* Top Right Quick Action Buttons */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                          {onToggleCurate && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleCurate(piece);
                              }}
                              className={`p-1.5 border transition-all ${
                                isCurated
                                  ? 'bg-[#d4af37] text-[#0b0a09] border-[#d4af37]'
                                  : 'bg-[#191715]/85 text-[#ffd88a] border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-[#0b0a09]'
                              }`}
                              title={isCurated ? 'Đã lưu vào tuyển chọn' : 'Lưu vào tuyển chọn'}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {onToggleCompare && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleCompare(piece);
                              }}
                              className={`p-1.5 border transition-all ${
                                isCompared
                                  ? 'bg-[#d4af37] text-[#0b0a09] border-[#d4af37]'
                                  : 'bg-[#191715]/85 text-[#ffd88a] border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-[#0b0a09]'
                              }`}
                              title={isCompared ? 'Đang trong bảng so sánh' : 'Thêm vào so sánh'}
                            >
                              <Scale className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-6">
                        <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-wider block mb-1 font-bold">
                          {piece.categoryLabel}
                        </span>

                        <h3
                          onClick={() => onSelectFurniture(piece)}
                          className="font-serif text-2xl text-white cursor-pointer group-hover:text-[#ffd88a] transition-colors leading-snug"
                        >
                          {piece.title}
                        </h3>

                        <p className="font-body-muted text-xs text-[#ded7cb] mt-3 line-clamp-3 leading-relaxed">
                          {piece.description}
                        </p>

                        <div className="mt-4 pt-4 border-t border-[#d4af37]/20 space-y-1.5 font-mono text-[11px] text-[#c5baa9]">
                          <div className="flex justify-between">
                            <span className="flex items-center gap-1.5">
                              <Box className="w-3.5 h-3.5 text-[#d4af37]" />
                              KÍCH THƯỚC:
                            </span>
                            <span className="text-[#ffd88a] font-medium">{piece.dimensions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="flex items-center gap-1.5">
                              <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
                              KHỐI LƯỢNG:
                            </span>
                            <span className="text-[#ffd88a] font-medium">{piece.weight}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>VẬT LIỆU CHẾ TÁC:</span>
                            <span className="text-[#fbf9f5] font-medium truncate max-w-[170px]" title={piece.materiality}>
                              {piece.materiality}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Card Actions */}
                    <div className="p-6 pt-0">
                      <div className="border-t border-[#d4af37]/20 pt-4 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#f5c065] font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#d4af37]" />
                          {piece.leadTime}
                        </span>
                        <button
                          onClick={() => onSelectFurniture(piece)}
                          className="inline-flex items-center gap-1 font-label-caps uppercase text-[11px] tracking-wider text-[#ffd88a] hover:text-white transition-colors font-bold"
                        >
                          Xem Thông Số <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ant Design Pagination Container */}
        {filteredAndSortedPieces.length > pageSize && (
          <div className="mt-14 pt-8 border-t border-[#d4af37]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#c5baa9]">
              Hiển thị tác phẩm <strong className="text-white">{(currentPage - 1) * pageSize + 1}</strong> – <strong className="text-white">{Math.min(currentPage * pageSize, filteredAndSortedPieces.length)}</strong> trên tổng số <strong className="text-[#ffd88a]">{filteredAndSortedPieces.length}</strong>
            </span>

            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredAndSortedPieces.length}
              onChange={handlePageChange}
              showSizeChanger={false}
              className="custom-luxury-pagination"
            />
          </div>
        )}

        {/* Bespoke Furniture Commissions Note */}
        <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-[#211e19] via-[#2a2520] to-[#211e19] border border-[#d4af37]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-widest block font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              CHẾ TÁC ĐIÊU KHẮC THEO YÊU CẦU KIẾN TRÚC
            </span>
            <h3 className="font-serif text-2xl text-white">
              Cần Tinh Chỉnh Kích Thước Cho Khối Kiến Trúc Dinh Thự?
            </h3>
            <p className="font-body-muted text-xs text-[#ded7cb] max-w-xl leading-relaxed">
              Chúng tôi nhận đo đạc và cắt xẻ các khối đá bàn ăn nguyên khối, bồn tắm vách đá vươn console và viền lò sưởi đồng thau riêng biệt hoàn toàn theo hệ lưới kết cấu của công trình gia chủ.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="btn-monolith shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Ủy Thác Đặt Kích Thước Riêng
          </button>
        </div>
      </div>

      {/* Floating Sticky Bottom Compare Dock */}
      {comparePieces.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-[#1c1916]/95 backdrop-blur-md border border-[#d4af37] p-3 shadow-[0_10px_40px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {comparePieces.map(p => (
                <div key={p.id} className="relative w-11 h-11 bg-[#25211c] border border-[#d4af37]/40 overflow-hidden shrink-0">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  {onToggleCompare && (
                    <button
                      onClick={() => onToggleCompare(p)}
                      className="absolute top-0 right-0 bg-black/80 text-white hover:text-red-400 p-0.5"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              ))}
              {Array.from({ length: 3 - comparePieces.length }).map((_, i) => (
                <div key={i} className="w-11 h-11 border border-dashed border-[#d4af37]/25 flex items-center justify-center text-[#d4af37]/40 text-xs font-mono">
                  +
                </div>
              ))}
            </div>
            <div className="hidden sm:block">
              <span className="font-label-caps uppercase text-[10px] text-[#f5c065] font-bold block">
                ĐỐI CHIẾU THÔNG SỐ ({comparePieces.length}/3)
              </span>
              <span className="text-[11px] text-[#ded7cb] font-mono">
                {comparePieces.length < 2 ? 'Chọn thêm để so sánh' : 'Sẵn sàng so sánh'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onClearCompare && (
              <button
                onClick={onClearCompare}
                className="p-2 text-xs font-mono text-[#c5baa9] hover:text-white"
                title="Xóa lựa chọn"
              >
                Xóa
              </button>
            )}
            {onOpenComparator && (
              <button
                onClick={onOpenComparator}
                className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] font-label-caps uppercase text-xs font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all whitespace-nowrap flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5" /> So Sánh ({comparePieces.length})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
