import React, { useEffect } from 'react';
import { PageView } from '../types';

interface SEOHeadProps {
  currentPage: PageView;
}

interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  schemaType: string;
  jsonLd: Record<string, unknown>;
}

const PAGE_META_MAP: Record<PageView, PageMeta> = {
  home: {
    title: 'AURA & STONE — Kiến Trúc & Điêu Khắc Đá Nguyên Khối | Milan · Paris · Hà Nội',
    description: 'Chuyên khảo kiến trúc sang trọng đỉnh cao và giám tuyển không gian nội thất độc bản tại Milan, Paris và Hà Nội. Tỷ lệ nguyên khối, vật liệu đá tự nhiên tuyệt mỹ và sự tĩnh lặng vô song.',
    keywords: 'kiến trúc dinh thự, biệt thự cao cấp, điêu khắc đá nguyên khối, travertine La Mã, AURA STONE',
    schemaType: 'ArchitecturalStudio',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ArchitecturalStudio',
      name: 'AURA & STONE Atelier',
      url: 'https://auraandstone.com',
      description: 'Chuyên khảo kiến trúc sang trọng đỉnh cao và giám tuyển không gian nội thất độc bản tại Milan, Paris và Hà Nội.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Kiến Trúc & Nội Thất Điêu Khắc Độc Bản',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Thiết Kế Kiến Trúc Dinh Thự Tư Nhân' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Nội Thất Đá Travertine Nguyên Khối' } }
        ]
      }
    }
  },
  projects: {
    title: 'Hồ Sơ Kiệt Tác Dinh Thự & Biệt Phủ Độc Bản | AURA & STONE',
    description: 'Tuyển tập các công trình kiến trúc dinh thự, biệt thự ven hồ và penthouse nguyên khối được thực hiện tại Milan, Paris, Hồ Como và Việt Nam.',
    keywords: 'dự án dinh thự, biệt phủ travertine, penthouse ven hồ, công trình kiến trúc kiệt tác',
    schemaType: 'CollectionPage',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Hồ Sơ Kiệt Tác Kiến Trúc Dinh Thự',
      description: 'Tuyển tập các công trình kiến trúc dinh thự, biệt phủ và pavilion nguyên khối của AURA & STONE Atelier.',
      isPartOf: { '@type': 'WebSite', name: 'AURA & STONE', url: 'https://auraandstone.com' }
    }
  },
  spaces: {
    title: 'Không Gian Tĩnh Mịch & Khí Sắc Âm Học | AURA & STONE',
    description: 'Khám phá các loại hình không gian sống thấu quang, hồ nước mưa tĩnh lặng và phòng nghe âm học đạt chuẩn tu viện dưới 24 dBA.',
    keywords: 'không gian tĩnh mịch, âm học kiến trúc, phòng thiền, hồ nước mưa phản chiếu',
    schemaType: 'ItemPage',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      name: 'Các Loại Hình Không Gian Tĩnh Mịch',
      description: 'Các loại hình không gian sống nguyên khối tối thượng cách ly khỏi tạp âm đô thị.'
    }
  },
  'furniture-collection': {
    title: 'Bộ Sưu Tập Nội Thất Điêu Khắc Đá Travertine & Gỗ Sồi | AURA & STONE',
    description: 'Các tác phẩm bàn console, bàn ăn nguyên khối, ghế đá travertine La Mã và tủ kệ gỗ sồi hun khói. Đánh số giới hạn từ 6 đến 12 bản trên toàn thế giới.',
    keywords: 'bàn đá travertine, bàn ăn nguyên khối, ghế đá La Mã, nội thất giới hạn 12 bản, điêu khắc đá',
    schemaType: 'CollectionPage',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Bộ Sưu Tập Nội Thất Điêu Khắc Đá Nguyên Khối Tập IV',
      description: 'Tuyển tập 12 tác phẩm nội thất điêu khắc đánh số giới hạn chế tác thủ công tại Milan và Verona.',
      provider: { '@type': 'Organization', name: 'AURA & STONE Atelier' }
    }
  },
  philosophy: {
    title: 'Triết Lý Kiến Trúc Phi Trang Trí & Trường Tồn Địa Chất | AURA & STONE',
    description: 'Lập trường kiên định về sự trường cửu của đá tự nhiên, tỷ lệ vàng hình học và sự phản kháng lại chủ nghĩa tiêu dùng trang trí tạm bợ.',
    keywords: 'triết lý kiến trúc, kiến trúc phi trang trí, tỷ lệ nguyên khối, vật liệu tự nhiên trường tồn',
    schemaType: 'AboutPage',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Triết Lý Bản Sắc AURA & STONE',
      description: 'Lập trường kiến trúc về tỷ lệ nguyên khối, sự lắng đọng của địa chất và không gian tĩnh mịch.'
    }
  },
  journal: {
    title: 'Tạp Chí Chuyên Ngành, Lịch Sự Kiện & Vernissages 2026 | AURA & STONE',
    description: 'Các bài nghiên cứu âm học, nhật ký mỏ đá vôi Tivoli, ấn phẩm Chuyên Khảo Tập IV và lịch sự kiện triển lãm quốc tế tại Milan, Paris, Hà Nội.',
    keywords: 'tạp chí kiến trúc, chuyên khảo IV, sự kiện kiến trúc Milan, triển lãm điêu khắc đá, vernissage',
    schemaType: 'Blog',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Tạp Chí Kiến Trúc & Lịch Sự Kiện Atelier',
      description: 'Nghiên cứu phê bình kiến trúc chuyên sâu và lịch các sự kiện triển lãm của AURA & STONE Atelier.'
    }
  },
  'private-consultation': {
    title: 'Bàn Khởi Tạo Ủy Thác & Đặt Lịch Khảo Sát Kín (NDA) | AURA & STONE',
    description: 'Tiếp nhận tối đa 12 công trình dinh thự tư nhân mỗi năm. Ký kết thỏa thuận bảo mật danh tính (NDA) và khởi tạo hồ sơ trực tiếp cùng Kiến Trúc Sư Trưởng.',
    keywords: 'ủy thác kiến trúc, đặt lịch kts trưởng, tư vấn dinh thự cao cấp, bảo mật NDA',
    schemaType: 'ContactPage',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Khởi Tạo Hồ Sơ Ủy Thác Bảo Mật',
      description: 'Cổng tiếp nhận ủy thác kín cho công trình dinh thự tư nhân với Kiến Trúc Sư Trưởng.'
    }
  }
};

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPage }) => {
  useEffect(() => {
    const meta = PAGE_META_MAP[currentPage] || PAGE_META_MAP.home;

    // Update Document Title
    document.title = meta.title;

    // Update Meta Description
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }

    // Update Meta Keywords
    let keywordsEl = document.querySelector('meta[name="keywords"]');
    if (!keywordsEl) {
      keywordsEl = document.createElement('meta');
      keywordsEl.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsEl);
    }
    keywordsEl.setAttribute('content', meta.keywords);

    // Update OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', meta.title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', meta.description);

    // Inject / Update Dynamic Page JSON-LD
    let scriptEl = document.getElementById('dynamic-page-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-page-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(meta.jsonLd, null, 2);
  }, [currentPage]);

  return null;
};
