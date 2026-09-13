import React, { useState, useMemo } from 'react';
import { Project, FurniturePiece, SpaceTypology, JournalArticle, PageView } from '../types';
import { Search, X, ArrowUpRight, Compass, Box, Home, BookOpen, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { FURNITURE_DATA } from '../data/furniture';
import { SPACES_DATA } from '../data/spaces';
import { JOURNAL_DATA } from '../data/journal';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onSelectFurniture: (piece: FurniturePiece) => void;
  onNavigate: (page: PageView) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onSelectFurniture,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'projects' | 'furniture' | 'spaces' | 'journal'>('all');

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();

    const matchedProjects = (activeFilter === 'all' || activeFilter === 'projects')
      ? PROJECTS_DATA.filter(p => 
          !q || 
          p.title.toLowerCase().includes(q) || 
          p.location.toLowerCase().includes(q) || 
          p.materiality.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        )
      : [];

    const matchedFurniture = (activeFilter === 'all' || activeFilter === 'furniture')
      ? FURNITURE_DATA.filter(f => 
          !q || 
          f.title.toLowerCase().includes(q) || 
          f.materiality.toLowerCase().includes(q) || 
          f.description.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
        )
      : [];

    const matchedSpaces = (activeFilter === 'all' || activeFilter === 'spaces')
      ? SPACES_DATA.filter(s => 
          !q || 
          s.title.toLowerCase().includes(q) || 
          s.tagline.toLowerCase().includes(q) || 
          s.description.toLowerCase().includes(q)
        )
      : [];

    const matchedJournal = (activeFilter === 'all' || activeFilter === 'journal')
      ? JOURNAL_DATA.filter(j => 
          !q || 
          j.title.toLowerCase().includes(q) || 
          j.subtitle.toLowerCase().includes(q) || 
          j.excerpt.toLowerCase().includes(q)
        )
      : [];

    return {
      projects: matchedProjects,
      furniture: matchedFurniture,
      spaces: matchedSpaces,
      journal: matchedJournal,
      total: matchedProjects.length + matchedFurniture.length + matchedSpaces.length + matchedJournal.length
    };
  }, [query, activeFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md p-4 md:p-10 pt-16 md:pt-24">
      <div className="w-full max-w-3xl bg-[#221f1a] text-[#fbf9f5] border border-[#d4af37]/45 shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Header */}
        <div className="p-4 md:p-6 border-b border-[#d4af37]/25 flex items-center gap-4 bg-[#1c1916]">
          <Search className="w-5 h-5 text-[#ffd88a] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm dinh thự, khối đá nguyên khối, đồ gỗ mộc, mỏ travertine, âm học..."
            className="w-full bg-transparent text-white placeholder-[#8f8578] font-sans text-base focus:outline-none"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-[#ffd88a] hover:text-white text-xs font-mono uppercase font-bold"
            >
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 border border-[#d4af37]/40 text-[#ffd88a] hover:bg-[#d4af37] hover:text-[#0b0a09] transition-colors"
            aria-label="Đóng tìm kiếm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Badges */}
        <div className="px-6 py-3 bg-[#201d18] border-b border-[#d4af37]/25 flex items-center gap-2 overflow-x-auto text-xs font-label-caps">
          <span className="text-[#c5baa9] mr-2 font-medium">Bộ lọc:</span>
          {[
            { id: 'all', label: 'Tất Cả Lưu Trữ' },
            { id: 'projects', label: 'Dinh Thự' },
            { id: 'furniture', label: 'Nội Thất Khối' },
            { id: 'spaces', label: 'Loại Hình' },
            { id: 'journal', label: 'Chuyên Khảo' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1 border transition-colors uppercase tracking-wider text-[10px] whitespace-nowrap font-bold ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#f5c065] text-[#0b0a09] border-[#d4af37] shadow-sm'
                  : 'bg-[#191715] text-[#ded7cb] border-[#d4af37]/35 hover:border-[#d4af37]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {filteredResults.total === 0 ? (
            <div className="py-12 text-center text-[#c5baa9]">
              <Compass className="w-8 h-8 mx-auto mb-3 stroke-[1.2] text-[#ffd88a]" />
              <p className="font-serif text-lg text-white">Không tìm thấy bản ghi tương ứng</p>
              <p className="text-xs font-body-muted mt-1 text-[#c5baa9]">Thử tìm kiếm với từ khóa &ldquo;Travertine&rdquo;, &ldquo;Gỗ sồi&rdquo;, &ldquo;Como&rdquo;, hoặc &ldquo;Bazan&rdquo;</p>
            </div>
          ) : (
            <>
              {/* Projects */}
              {filteredResults.projects.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-widest block mb-3 font-bold">
                    CÔNG TRÌNH DINH THỰ ĐẶC TRƯNG ({filteredResults.projects.length})
                  </span>
                  <div className="divide-y divide-[#d4af37]/20 border-t border-b border-[#d4af37]/20">
                    {filteredResults.projects.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectProject(p);
                          onClose();
                        }}
                        className="w-full text-left py-3 px-2 flex items-center justify-between hover:bg-[#2a2620] transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <img src={p.image} alt={p.title} className="w-12 h-12 object-cover border border-[#d4af37]/35" />
                          <div>
                            <span className="font-serif text-base block text-white group-hover:text-[#ffd88a] transition-colors">
                              {p.title}
                            </span>
                            <span className="text-xs text-[#c5baa9]">
                              {p.location}, {p.country} · {p.year} · {p.materiality}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#ffd88a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Furniture */}
              {filteredResults.furniture.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-widest block mb-3 font-bold">
                    TÁC PHẨM NỘI THẤT NGUYÊN KHỐI ({filteredResults.furniture.length})
                  </span>
                  <div className="divide-y divide-[#d4af37]/20 border-t border-b border-[#d4af37]/20">
                    {filteredResults.furniture.map(f => (
                      <button
                        key={f.id}
                        onClick={() => {
                          onSelectFurniture(f);
                          onClose();
                        }}
                        className="w-full text-left py-3 px-2 flex items-center justify-between hover:bg-[#2a2620] transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <img src={f.image} alt={f.title} className="w-12 h-12 object-cover border border-[#d4af37]/35" />
                          <div>
                            <span className="font-serif text-base block text-white group-hover:text-[#ffd88a] transition-colors">
                              {f.title}
                            </span>
                            <span className="text-xs text-[#c5baa9]">
                              {f.edition} · {f.materiality} · {f.dimensions}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#ffd88a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Spaces */}
              {filteredResults.spaces.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-widest block mb-3 font-bold">
                    LOẠI HÌNH KHÔNG GIAN KIẾN TRÚC ({filteredResults.spaces.length})
                  </span>
                  <div className="divide-y divide-[#d4af37]/20 border-t border-b border-[#d4af37]/20">
                    {filteredResults.spaces.map(s => (
                      <button
                        key={s.id}
                        onClick={() => {
                          onNavigate('spaces');
                          onClose();
                        }}
                        className="w-full text-left py-3 px-2 flex items-center justify-between hover:bg-[#2a2620] transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <img src={s.image} alt={s.title} className="w-12 h-12 object-cover border border-[#d4af37]/35" />
                          <div>
                            <span className="font-serif text-base block text-white group-hover:text-[#ffd88a] transition-colors">
                              {s.title}
                            </span>
                            <span className="text-xs text-[#c5baa9]">{s.tagline}</span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#ffd88a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Journal */}
              {filteredResults.journal.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] text-[#f5c065] uppercase tracking-widest block mb-3 font-bold">
                    CHUYÊN KHẢO &amp; BÀI NGHIÊN CỨU ({filteredResults.journal.length})
                  </span>
                  <div className="divide-y divide-[#d4af37]/20 border-t border-b border-[#d4af37]/20">
                    {filteredResults.journal.map(j => (
                      <button
                        key={j.id}
                        onClick={() => {
                          onNavigate('journal');
                          onClose();
                        }}
                        className="w-full text-left py-3 px-2 flex items-center justify-between hover:bg-[#2a2620] transition-colors group"
                      >
                        <div>
                          <span className="font-serif text-base block text-white group-hover:text-[#ffd88a] transition-colors">
                            {j.title}
                          </span>
                          <span className="text-xs text-[#c5baa9]">
                            {j.category} · {j.date} · Tác giả {j.author}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#ffd88a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#1c1916] border-t border-[#d4af37]/25 text-center text-[10px] font-mono text-[#c5baa9]">
          NHẤN ESC ĐỂ ĐÓNG · DANH MỤC BẢO MẬT AURA &amp; STONE
        </div>
      </div>
    </div>
  );
};
