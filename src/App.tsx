/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, Project, FurniturePiece } from './types';
import { PROJECTS_DATA } from './data/projects';
import { FURNITURE_DATA } from './data/furniture';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProjectsView } from './components/ProjectsView';
import { SpacesView } from './components/SpacesView';
import { FurnitureView } from './components/FurnitureView';
import { PhilosophyView } from './components/PhilosophyView';
import { JournalView } from './components/JournalView';
import { ConsultationSection } from './components/ConsultationSection';
import { MonolithicDrawer } from './components/MonolithicDrawer';
import { SearchModal } from './components/SearchModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { FurnitureDetailModal } from './components/FurnitureDetailModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { BespokeComparatorModal } from './components/BespokeComparatorModal';
import { CuratedDossierDrawer } from './components/CuratedDossierDrawer';
import { AntdThemeConfig } from './components/AntdConfigProvider';
import { QuickBookingDrawer } from './components/QuickBookingDrawer';
import { FloatingConciergeButton } from './components/FloatingConciergeButton';
import { SEOHead } from './components/SEOHead';
import { LoadingPage } from './components/LoadingPage';
import { 
  getCuratedPieces, 
  toggleCuratedPiece, 
  getComparePieces, 
  toggleComparePiece, 
  clearCompare 
} from './services/curatedStorage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isSiteLoading, setIsSiteLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFurniture, setSelectedFurniture] = useState<FurniturePiece | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);
  const [isCuratedDrawerOpen, setIsCuratedDrawerOpen] = useState(false);
  const [consultationPrefill, setConsultationPrefill] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Curated pieces & Compare pieces synced with localStorage
  const [curatedPieces, setCuratedPieces] = useState<FurniturePiece[]>([]);
  const [comparePieces, setComparePieces] = useState<FurniturePiece[]>([]);

  useEffect(() => {
    setCuratedPieces(getCuratedPieces());
    setComparePieces(getComparePieces());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Curate handlers
  const handleToggleCurate = (piece: FurniturePiece) => {
    const isAdded = toggleCuratedPiece(piece);
    setCuratedPieces(getCuratedPieces());
    if (isAdded) {
      showToast(`Đã thêm "${piece.title}" vào Hồ sơ tuyển chọn của gia chủ.`);
    } else {
      showToast(`Đã bỏ "${piece.title}" khỏi danh mục tuyển chọn.`);
    }
  };

  const handleRemoveCurated = (id: string) => {
    const target = curatedPieces.find(p => p.id === id);
    if (target) {
      toggleCuratedPiece(target);
      setCuratedPieces(getCuratedPieces());
      showToast(`Đã gỡ "${target.title}" khỏi danh mục tuyển chọn.`);
    }
  };

  // Compare handlers
  const handleToggleCompare = (piece: FurniturePiece) => {
    const res = toggleComparePiece(piece);
    if (res.message) {
      showToast(res.message);
      return;
    }
    setComparePieces(res.list);
    if (res.added) {
      showToast(`Đã thêm "${piece.title}" vào ma trận so sánh (${res.list.length}/3).`);
    } else {
      showToast(`Đã gỡ "${piece.title}" khỏi bảng so sánh.`);
    }
  };

  const handleRemoveCompare = (id: string) => {
    const target = comparePieces.find(p => p.id === id);
    if (target) {
      const res = toggleComparePiece(target);
      setComparePieces(res.list);
    }
  };

  const handleClearCompare = () => {
    clearCompare();
    setComparePieces([]);
    showToast('Đã làm trống bảng so sánh thông số.');
  };

  // Keyboard shortcut listener for ESC to close modals and '/' or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedFurniture(null);
        setIsSearchOpen(false);
        setIsDrawerOpen(false);
        setIsClientPortalOpen(false);
        setIsBookingDrawerOpen(false);
        setIsComparatorOpen(false);
        setIsCuratedDrawerOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AntdThemeConfig>
      {/* Brand & SEO Head Tag Controller */}
      <SEOHead currentPage={currentPage} />

      {/* Atmospheric Initial Page Entry Loading Screen */}
      <LoadingPage 
        onFinishedLoading={() => setIsSiteLoading(false)} 
        durationMs={850} 
      />

      <div className="min-h-screen bg-[#191715] text-[#fbf9f5] flex flex-col selection:bg-[#d4af37] selection:text-[#0b0a09]">
        {/* Persistent Global Header with 1440px Grid Alignment */}
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenClientPortal={() => setIsClientPortalOpen(true)}
          onOpenBooking={() => setIsBookingDrawerOpen(true)}
        />

        {/* Dynamic Page Views with Smooth Framer Motion Page Fade Transitions */}
        <AnimatePresence mode="wait">
          <motion.main
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow w-full"
          >
            {currentPage === 'home' && (
              <HomeView
                projects={PROJECTS_DATA}
                furniture={FURNITURE_DATA}
                onNavigate={handleNavigate}
                onSelectProject={(p) => setSelectedProject(p)}
                onSelectFurniture={(f) => setSelectedFurniture(f)}
                onOpenConsultation={() => handleNavigate('private-consultation')}
                onOpenBooking={() => setIsBookingDrawerOpen(true)}
              />
            )}

            {currentPage === 'projects' && (
              <ProjectsView
                projects={PROJECTS_DATA}
                onSelectProject={(p) => setSelectedProject(p)}
                onOpenConsultation={() => handleNavigate('private-consultation')}
              />
            )}

            {currentPage === 'spaces' && (
              <SpacesView
                onOpenConsultation={() => handleNavigate('private-consultation')}
              />
            )}

            {currentPage === 'furniture-collection' && (
              <FurnitureView
                furniture={FURNITURE_DATA}
                onSelectFurniture={(f) => setSelectedFurniture(f)}
                onOpenConsultation={() => handleNavigate('private-consultation')}
                curatedPieces={curatedPieces}
                onToggleCurate={handleToggleCurate}
                comparePieces={comparePieces}
                onToggleCompare={handleToggleCompare}
                onOpenComparator={() => setIsComparatorOpen(true)}
                onClearCompare={handleClearCompare}
                onOpenCuratedDrawer={() => setIsCuratedDrawerOpen(true)}
              />
            )}

            {currentPage === 'philosophy' && (
              <PhilosophyView
                onOpenConsultation={() => handleNavigate('private-consultation')}
              />
            )}

            {currentPage === 'journal' && (
              <JournalView
                onOpenConsultation={() => handleNavigate('private-consultation')}
              />
            )}

            {currentPage === 'private-consultation' && (
              <div className="pt-28 pb-12">
                <ConsultationSection 
                  initialProject={consultationPrefill} 
                  onOpenClientPortal={(code) => {
                    setIsClientPortalOpen(true);
                  }}
                />
              </div>
            )}
          </motion.main>
        </AnimatePresence>

        {/* Global Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenConsultation={() => handleNavigate('private-consultation')}
          onDownloadMonograph={() => showToast('Đã tải về trích đoạn Chuyên khảo Tập IV. Vui lòng kiểm tra thư mục tải xuống.')}
        />

        {/* Non-intrusive Floating Concierge Booking Trigger */}
        <FloatingConciergeButton onOpenBooking={() => setIsBookingDrawerOpen(true)} />

        {/* Quick Booking Concierge Drawer (Ant Design) */}
        <QuickBookingDrawer
          isOpen={isBookingDrawerOpen}
          onClose={() => setIsBookingDrawerOpen(false)}
          onSuccessToast={showToast}
        />

        {/* Slide-out Monolithic Architectural Drawer */}
        <MonolithicDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          onOpenClientPortal={() => {
            setIsDrawerOpen(false);
            setIsClientPortalOpen(true);
          }}
        />

        {/* Archive Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProject={(p) => setSelectedProject(p)}
          onSelectFurniture={(f) => setSelectedFurniture(f)}
          onNavigate={handleNavigate}
        />

        {/* Project Blueprint & Specification Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onRequestDossier={(title) => {
            setSelectedProject(null);
            setConsultationPrefill(title);
            handleNavigate('private-consultation');
            showToast(`Đang khởi tạo hồ sơ ủy thác bảo mật cho ${title}.`);
          }}
        />

        {/* Monolithic Furniture Inspection Modal */}
        <FurnitureDetailModal
          piece={selectedFurniture}
          onClose={() => setSelectedFurniture(null)}
          onInquire={(title) => {
            showToast(`Yêu cầu thông số tác phẩm ${title} đã được chuyển tới bàn giám tuyển.`);
          }}
          isCurated={selectedFurniture ? curatedPieces.some(p => p.id === selectedFurniture.id) : false}
          onToggleCurate={handleToggleCurate}
          isCompared={selectedFurniture ? comparePieces.some(p => p.id === selectedFurniture.id) : false}
          onToggleCompare={handleToggleCompare}
        />

        {/* Bespoke Furniture Matrix Comparator Modal */}
        <BespokeComparatorModal
          isOpen={isComparatorOpen}
          onClose={() => setIsComparatorOpen(false)}
          pieces={comparePieces}
          onRemovePiece={handleRemoveCompare}
          onSelectPiece={(piece) => setSelectedFurniture(piece)}
          onOpenConsultation={() => {
            const listStr = comparePieces.map(p => p.title).join(', ');
            setConsultationPrefill(`Ủy thác đối chiếu nhóm tác phẩm: ${listStr}`);
            handleNavigate('private-consultation');
          }}
        />

        {/* Curated Pieces Architectural Dossier Drawer */}
        <CuratedDossierDrawer
          isOpen={isCuratedDrawerOpen}
          onClose={() => setIsCuratedDrawerOpen(false)}
          curatedPieces={curatedPieces}
          onRemovePiece={handleRemoveCurated}
          onSelectPiece={(piece) => setSelectedFurniture(piece)}
          onProceedToConsultation={(summary) => {
            setConsultationPrefill(summary);
            handleNavigate('private-consultation');
          }}
        />

        {/* Private Client Commission Status Portal */}
        <ClientPortalModal
          isOpen={isClientPortalOpen}
          onClose={() => setIsClientPortalOpen(false)}
          onBookNew={() => {
            setIsClientPortalOpen(false);
            handleNavigate('private-consultation');
          }}
        />

        {/* Global Notification Toast (positioned bottom-left so no collision) */}
        {toastMessage && (
          <div className="fixed bottom-6 left-6 z-50 bg-[#1c1b1a] text-[#fbf9f6] border border-[#d4af37]/60 px-5 py-3 shadow-2xl font-mono text-xs flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <span className="w-2 h-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37]"></span>
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </AntdThemeConfig>
  );
}
