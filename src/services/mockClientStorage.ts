/**
 * Mock Client Storage Service
 * Manages VIP architectural dossiers, custom commissions, and persistent state
 * across ClientPortalModal, ConsultationSection, and QuickBookingDrawer.
 */

export interface ClientDossier {
  code: string;
  projectTitle: string;
  clientName: string;
  email: string;
  phone?: string;
  location: string;
  typology: string;
  budget: string;
  atelier: string;
  status: 'PENDING_REVIEW' | 'IN_PROGRESS' | 'FABRICATION' | 'COMPLETED';
  statusLabel: string;
  leadArchitect: string;
  createdDate: string;
  currentPhase: number;
  milestones: {
    phaseNumber: number;
    title: string;
    description: string;
    date: string;
    completed: boolean;
    active: boolean;
  }[];
  specifications: {
    stoneQuarry: string;
    joinerySystem: string;
    acousticTarget: string;
    totalWeight: string;
  };
  fieldNotes: string;
}

const STORAGE_KEY = 'aura_stone_vip_dossiers';

export const INITIAL_DOSSIERS: ClientDossier[] = [
  {
    code: 'AS-2025-MIL',
    projectTitle: 'Dinh Thự Castiglione — Hồ Como',
    clientName: 'Gia Tộc Visconti di Modrone',
    email: 'castiglione.archive@visconti.it',
    phone: '+39 02 7839 2100',
    location: 'Bờ Đông Hồ Como, Lombardy, Ý',
    typology: 'Biệt Thự / Dinh Thự Ẩn Mình (1.200 m²)',
    budget: 'Trên 3.000.000 €',
    atelier: 'Milano Quadrilatero',
    status: 'IN_PROGRESS',
    statusLabel: 'Đang Gia Công Khô Tại Atelier',
    leadArchitect: 'Lorenzo Vane (KTS Trưởng Milano)',
    createdDate: '14/10/2024',
    currentPhase: 3,
    milestones: [
      {
        phaseNumber: 1,
        title: 'Quy Hoạch Khối Tích & Lưới Hình Học Tectonic',
        description: 'Được gia chủ và Hội đồng Kiến trúc Lombardy phê duyệt với độ vươn console 14 mét.',
        date: '14/12/2024',
        completed: true,
        active: false,
      },
      {
        phaseNumber: 2,
        title: 'Khai Thác Khối Đá Mỏ Tivoli #094',
        description: 'Khối đá 42 tấn đã được quét siêu âm loại trừ nứt ngầm và cắt tia nước cao áp tại Brescia.',
        date: '28/01/2025',
        completed: true,
        active: false,
      },
      {
        phaseNumber: 3,
        title: 'Lắp Ghép Thử Nghiệm Khô & Mộng Gỗ Sồi Pháp',
        description: 'Đang tiến hành tại phân xưởng Milan · Kiểm định dung sai khớp nối dưới 0.4 mm.',
        date: 'Hiện tại (Tuần 11)',
        completed: false,
        active: true,
      },
      {
        phaseNumber: 4,
        title: 'Lắp Đặt Thực Địa & Thẩm Âm Tu Viện 28 dBA',
        description: 'Cân chỉnh tiêu âm tường travertine lỗ rỗng và tích hợp hệ thống ánh sáng 2400K.',
        date: 'Dự kiến 04/2025',
        completed: false,
        active: false,
      },
    ],
    specifications: {
      stoneQuarry: 'Mỏ Đá La Mã Cổ Tivoli Vỉa #04, Ý',
      joinerySystem: 'Mộng Đá Khóa Trọng Lực & Chốt Đồng Thau Sáp Ong',
      acousticTarget: 'Âm nền phòng khách đạt 26.5 dBA (Chuẩn thiền viện)',
      totalWeight: '48 Tấn đá Travertine nguyên khối',
    },
    fieldNotes: 'Toàn bộ khối đá đã vượt qua bài kiểm tra chấn động và không có tỳ vết khoáng chất bất lợi.',
  },
  {
    code: 'AS-PAR-2025-08',
    projectTitle: 'Penthouse Tái Thiết Quai d’Orsay — Paris',
    clientName: 'Family Office Baudelaire',
    email: 'heritage@baudelaire-paris.fr',
    phone: '+33 1 42 68 55 00',
    location: 'Quai d’Orsay, Quận 7, Paris, Pháp',
    typology: 'Penthouse Trung Tâm Tái Thiết (450 m²)',
    budget: '1.500.000 € — 3.000.000 €',
    atelier: 'Paris Saint-Germain',
    status: 'IN_PROGRESS',
    statusLabel: 'Chế Tác Lò Sưởi & Bồn Tắm Độc Bản',
    leadArchitect: 'Claire de Montmirail',
    createdDate: '19/11/2024',
    currentPhase: 2,
    milestones: [
      {
        phaseNumber: 1,
        title: 'Phân Tích Tải Trọng Sàn Kiến Trúc Haussmann',
        description: 'Gia cố khung thép chịu lực ẩn dưới sàn gỗ sồi xương cá lịch sử.',
        date: '05/01/2025',
        completed: true,
        active: false,
      },
      {
        phaseNumber: 2,
        title: 'Điêu Khắc Bồn Tắm Đá Cẩm Thạch Nero Marquina',
        description: 'Đục khoét nguyên khối từ khối cẩm thạch Tây Ban Nha 3.8 tấn.',
        date: 'Hiện tại',
        completed: false,
        active: true,
      },
      {
        phaseNumber: 3,
        title: 'Hoàn Thiện Tủ Console Đồng Xước Micro-Fluted',
        description: 'Phủ sáp ong mờ giữ lớp patina tự nhiên tại xưởng kim khí.',
        date: 'Dự kiến 05/2025',
        completed: false,
        active: false,
      },
      {
        phaseNumber: 4,
        title: 'Bàn Giao Chìa Khóa & Bộ Chứng Thư Độc Bản',
        description: 'Bàn giao hộp chứng thư bọc da thủ công và USB mã hóa 256-bit.',
        date: 'Dự kiến 06/2025',
        completed: false,
        active: false,
      },
    ],
    specifications: {
      stoneQuarry: 'Mỏ Đá Nero Marquina, Xứ Basque & Gỗ Sồi Burgundy',
      joinerySystem: 'Bản lề phay chìm CNC & Nam châm đất hiếm',
      acousticTarget: 'Hệ tường ngăn cách âm 55 dB với đại lộ ven sông Seine',
      totalWeight: '12 Tấn vật liệu hoàn thiện',
    },
    fieldNotes: 'Đã hoàn tất giấy phép vận chuyển cẩu tháp đưa bồn tắm lên tầng 6 an toàn.',
  },
  {
    code: 'AS-HAN-2025-14',
    projectTitle: 'Biệt Thự Bán Đảo Quảng An — Hồ Tây Hà Nội',
    clientName: 'Tập Đoàn Đầu Tư Di Sản',
    email: 'contact@heritage-quangan.vn',
    phone: '+84 91 888 6688',
    location: 'Quảng An, Tây Hồ, Hà Nội, Việt Nam',
    typology: 'Điền Trang Sân Trong & Hồ Nước Vi Khí Hậu (850 m²)',
    budget: 'Trên 3.000.000 €',
    atelier: 'Hà Nội Phố Cổ (Tràng Tiền)',
    status: 'IN_PROGRESS',
    statusLabel: 'Lập Khung Kết Cấu Đá Bazan Núi Lửa',
    leadArchitect: 'Nguyễn Thành Long & KTS Cố vấn Milan',
    createdDate: '02/01/2025',
    currentPhase: 1,
    milestones: [
      {
        phaseNumber: 1,
        title: 'Nghiên Cứu Vi Khí Hậu Hơi Nước & Hướng Gió Mùa',
        description: 'Tối ưu hóa các khe thông gió đối lưu và hành lang đá mát tự nhiên.',
        date: '15/02/2025',
        completed: true,
        active: false,
      },
      {
        phaseNumber: 2,
        title: 'Gia Công Các Phiến Đá Bazan Tây Nguyên & Đá Travertine Nhập Khẩu',
        description: 'Đá bazan xẻ thô kết hợp với travertine La Mã tạo độ tương phản xúc giác.',
        date: 'Hiện tại',
        completed: false,
        active: true,
      },
      {
        phaseNumber: 3,
        title: 'Xử Lý Mộng Gỗ Teak Chịu Ẩm Nhiệt Đới',
        description: 'Áp dụng công nghệ tẩm dầu khoáng sinh học chống cong vênh.',
        date: 'Dự kiến 06/2025',
        completed: false,
        active: false,
      },
      {
        phaseNumber: 4,
        title: 'Thử Nghiệm Âm Học Màn Nước & Bàn Giao',
        description: 'Tiếng nước chảy róc rách đạt dải tần số thư giãn 40-50 dB.',
        date: 'Dự kiến 09/2025',
        completed: false,
        active: false,
      },
    ],
    specifications: {
      stoneQuarry: 'Đá Bazan Núi Lửa Pleiku & Travertine Tivoli Nhập Khẩu',
      joinerySystem: 'Mộng ngàm cổ truyền kết hợp chốt thép không gỉ 316L',
      acousticTarget: 'Âm thanh tĩnh mịch mặt nước triệt tiêu tiếng ồn phố thị',
      totalWeight: '65 Tấn cấu kiện đá nguyên khối',
    },
    fieldNotes: 'Mẫu vật liệu đã được gửi về Atelier Milan để kiểm định hệ số giãn nở nhiệt đới.',
  }
];

export const getDossiers = (): ClientDossier[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DOSSIERS));
      return INITIAL_DOSSIERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DOSSIERS;
  }
};

export const findDossierByCode = (code: string): ClientDossier | undefined => {
  const dossiers = getDossiers();
  const trimmed = code.trim().toUpperCase();
  return dossiers.find(d => d.code.toUpperCase() === trimmed);
};

export const saveNewDossier = (dossier: Partial<ClientDossier> & { clientName: string; email: string }): ClientDossier => {
  const dossiers = getDossiers();
  const atelierPrefix = (dossier.atelier || 'MIL').substring(0, 3).toUpperCase();
  const randomNum = Math.floor(100 + Math.random() * 900);
  const code = dossier.code || `AS-${atelierPrefix}-2025-${randomNum}`;

  const newEntry: ClientDossier = {
    code,
    projectTitle: dossier.projectTitle || `Hồ Sơ Ủy Thác ${dossier.typology || 'Dinh Thự'} — ${dossier.location || 'Địa Điểm Chỉ Định'}`,
    clientName: dossier.clientName,
    email: dossier.email,
    phone: dossier.phone || 'Chưa cập nhật',
    location: dossier.location || 'Địa điểm bảo mật theo thỏa thuận NDA',
    typology: dossier.typology || 'Biệt Thự / Dinh Thự Ẩn Mình',
    budget: dossier.budget || '1.500.000 € — 3.000.000 €',
    atelier: dossier.atelier || 'Milano Quadrilatero',
    status: 'PENDING_REVIEW',
    statusLabel: 'Đã Tiếp Nhận · Bàn Giám Tuyển Đang Thẩm Định',
    leadArchitect: 'Giám Tuyển & KTS Trưởng Khu Vực',
    createdDate: new Date().toLocaleDateString('vi-VN'),
    currentPhase: 1,
    milestones: [
      {
        phaseNumber: 1,
        title: 'Tiếp Nhận Yêu Cầu & Ký Kết Thỏa Thuận Bảo Mật NDA',
        description: 'Hồ sơ đã được mã hóa bảo mật 256-bit và gửi thông báo tới KTS Trưởng.',
        date: 'Hôm nay',
        completed: true,
        active: false,
      },
      {
        phaseNumber: 2,
        title: 'Khảo Sát Địa Mạo, Ánh Sáng & Khối Tích Sơ Bộ',
        description: 'Chuyên viên kỹ thuật sẽ đặt lịch đối thoại chuyên sâu cùng gia chủ trong 48h.',
        date: 'Đang xếp lịch',
        completed: false,
        active: true,
      },
      {
        phaseNumber: 3,
        title: 'Lựa Chọn Vỉa Đá Tại Mỏ & Đúc Mẫu Thử Nghiệm',
        description: 'Gửi hộp mẫu đá travertine và gỗ sồi hun khói nguyên bản trao tay gia chủ.',
        date: 'Dự kiến Tuần 4',
        completed: false,
        active: false,
      },
      {
        phaseNumber: 4,
        title: 'Trình Bản Vẽ Thi Công Chi Tiết & Khởi Động Chế Tác',
        description: 'Ký kết hợp đồng ủy thác thi công và bàn giao USB mã hóa.',
        date: 'Dự kiến Tuần 6',
        completed: false,
        active: false,
      },
    ],
    specifications: {
      stoneQuarry: 'Chỉ định theo nguyện vọng thiết kế (Travertine Tivoli / Nero Marquina / Bazan)',
      joinerySystem: 'Mộng âm dương truyền thống & Khóa trọng lực',
      acousticTarget: 'Tiêu chuẩn tĩnh mịch 28 dBA chuẩn viện bảo tàng',
      totalWeight: 'Tính toán theo quy mô mặt bằng thực tế',
    },
    fieldNotes: dossier.fieldNotes || 'Hồ sơ đang trong quy trình phân loại mật cấp 1.',
  };

  const updated = [newEntry, ...dossiers];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
  return newEntry;
};
