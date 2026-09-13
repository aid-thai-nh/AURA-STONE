import { ArchitecturalEvent } from '../types';

export const EVENTS_DATA: ArchitecturalEvent[] = [
  {
    id: 'event-milan-design-week-2026',
    title: 'Triển Lãm Điêu Khắc Đá & Khí Sắc Ánh Sáng Milan 2026',
    subtitle: 'Khai mạc tuần lễ thiết kế quốc tế tại Atelier Via Santo Spirito',
    date: '10 Tháng 09 – 25 Tháng 09, 2026',
    time: '14:00 – 21:00 (Mỗi ngày)',
    location: 'Atelier Milano, Via Santo Spirito, 14',
    city: 'Milano, Ý',
    atelier: 'Atelier I · Milan Quadrilatero',
    status: 'HAPPENING_NOW',
    statusLabel: 'ĐANG DIỄN RA',
    remainingSeats: 6,
    totalSeats: 30,
    curator: 'Lorenzo Vane & Fabrizio Rossi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbjBHT7XgTscXabvNARKTc9LIfhBpndb5m7pznP9J_-cvqOkOgz097ztu8lGOtXEmBLgeteNwLeguK6g_Vq14W1-gtDx911I1BdVkNILj3vRNX3tcojoTQJvp2ERDtxfs1iyMfI0YE23Reiz59PAw3KvdmQh85MMmKxG1Gz0P8HPnFoL74QCf4SDyFyVk1ITV64Xt0OjoPA2Cy7Ar7r0vtYcj0k9nkQ7fGy42GF0CaTyIrhJnE5gmj',
    description: 'Ra mắt 12 tác phẩm điêu khắc đá travertine La Mã nguyên khối và hệ thống chiếu sáng thấu quang mật ong hổ phách 2400K. Không gian được biến đổi thành một thánh đường chiêm niệm đa giác quan, nơi âm thanh và ánh sáng giao hòa tuyệt mỹ.',
    highlights: [
      'Trải nghiệm trực tiếp khối đá Tivoli Travertine nguyên tảng 4.2 tấn',
      'Thưởng thức trà thảo mộc vùng Tuscan cùng KTS Trưởng Lorenzo Vane',
      'Trao chứng thư giám tuyển số cho các nhà sưu tập đã đăng ký sở hữu tác phẩm'
    ],
    schedule: [
      { time: '14:00', activity: 'Đón tiếp đại diện các gia tộc thượng lưu & Giới thiệu ý niệm trác diện' },
      { time: '16:30', activity: 'Tọa đàm chuyên sâu: Sự trường cửu của địa chất trong nhà ở tư nhân' },
      { time: '19:00', activity: 'Khai tiệc cocktail nghệ thuật & Trình diễn biến thiên ánh sáng hoàng hôn' }
    ],
    rsvpRequired: true
  },
  {
    id: 'event-paris-acoustic-salon',
    title: 'Đêm Hội Đàm Âm Học & Không Gian Tĩnh Mịch Paris',
    subtitle: 'Nghiên cứu về sự cô lập tạp âm đô thị và trường năng lượng sóng não alpha',
    date: '05 Tháng 10, 2026',
    time: '18:30 – 22:00',
    location: 'Atelier Paris, Rue Bonaparte, 28',
    city: 'Paris, Pháp',
    atelier: 'Atelier II · Paris Saint-Germain',
    status: 'LIMITED_SEATS',
    statusLabel: 'CHỈ CÒN 3 SUẤT ỦY THÁC',
    remainingSeats: 3,
    totalSeats: 15,
    curator: 'Claire Beaumont & Kỹ sư Âm học Jean-Luc Mercier',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMg9lJoLrkonjeac9AmzlVOGjSHjeEprqQy7ApsPwdD7vttBJm09laauB-uMKJCGakIg_upbwzNJ55a-3yvH8CB9c9PUTkA6HB2lVotYpC7T6_pNP103mKJVXnMQFdFjq-8rJjke9-yzOoCBqLvj63oiqP0sXW_E5-ahkkds6dhbigmJObkRalnGA4qUE0fVOMUuoP4rQk1jJ8Fkd8czqPqa63ksRINW3xXZE9FHkHX01n1AIjKXIe',
    description: 'Một phiên làm việc riêng tư giới hạn 15 khách mời danh dự tại hầm ngầm cổ kính của Saint-Germain. Phân tích các biểu đồ decibel thực tế của dinh thự Castiglione và thử nghiệm phòng cách âm đa diện.',
    highlights: [
      'Trải nghiệm phòng thính giác < 24 dBA với hệ tường gối giảm chấn vi mô',
      'Nhận ấn bản tóm tắt phân tích sóng âm và rung chấn công trình đô thị',
      'Tư vấn trực tiếp 1:1 cùng Kỹ sư trưởng về giải pháp âm học cho dinh thự đang xây'
    ],
    schedule: [
      { time: '18:30', activity: 'Đón khách & Trải nghiệm phòng tiêu âm tĩnh lặng tuyệt đối' },
      { time: '19:45', activity: 'Báo cáo độc quyền về công nghệ vỏ kép tách rời (Decoupled Envelope)' },
      { time: '21:00', activity: 'Tiệc thử rượu vang Bordeaux hảo hạng & Đối thoại kín' }
    ],
    rsvpRequired: true
  },
  {
    id: 'event-hanoi-vernissage-2026',
    title: 'Salon Khởi Tạo Kiệt Tác Dinh Thự Mùa Thu Hà Nội',
    subtitle: 'Gặp gỡ KTS Mai Nguyễn & Khám phá hành trình hòa nhập văn hóa Á Đông',
    date: '18 Tháng 11, 2026',
    time: '09:00 – 17:00',
    location: '18 Tràng Tiền, Hoàn Kiếm',
    city: 'Hà Nội, Việt Nam',
    atelier: 'Atelier III · Hà Nội Hoàn Kiếm',
    status: 'UPCOMING',
    statusLabel: 'SẮP DIỄN RA',
    remainingSeats: 12,
    totalSeats: 25,
    curator: 'KTS Mai Nguyễn & Ban Cố Vấn Kiến Trúc',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6kiEkFJjKzVNGfTSdi38sGT1LDm-evgt3lwji4o2Pv4VgMl_E711cUVvi5rF6VkJKPPnZKfTY-bKX_6nbzByLHWK5jkc3FFL2I_PVBkT-ESxJ71vcGioYo_IMK10-LwXTJWauKZz6SAzJku_Gk-5b_dIj5LMvRXQdRxQTq-HMGwmhizUYbW047I5bejHq44dtULMMTWgl3of1YxW8Myi3SrTquzNLQ_iPzcQCkDvar2Vv3Zia8U7f',
    description: 'Chuyên đề đối thoại dành cho các chủ nhân yêu thích tỷ lệ nguyên khối châu Âu nhưng tìm kiếm sự linh hoạt và vi khí hậu phù hợp với thổ nhưỡng nhiệt đới gió mùa.',
    highlights: [
      'Công bố bản vẽ chi tiết các giếng trời lấy gió tự nhiên cho nhà phố & biệt phủ',
      'Giới thiệu bộ mẫu đá bazan núi lửa Tây Nguyên gia công thủ công tại Ý',
      'Đăng ký quyền ưu tiên ủy thác thi công cho quý I/2027'
    ],
    schedule: [
      { time: '09:00', activity: 'Thưởng trà cổ thụ shan tuyết & Tham quan phòng thí nghiệm vật liệu' },
      { time: '10:30', activity: 'Thuyết trình chuyên khảo: Vi khí hậu & Sự thở của đá tự nhiên' },
      { time: '14:30', activity: 'Khảo sát sa bàn thực địa dinh thự ven hồ Tây và Ba Vì' }
    ],
    rsvpRequired: true
  },
  {
    id: 'event-carrara-symposium-archived',
    title: 'Đại Hội Thảo Mỏ Đá Carrara & Thẩm Mỹ Vô Thức',
    subtitle: 'Hành trình khảo cổ địa chất và biên soạn Chuyên khảo Tập IV',
    date: '15 Tháng 05, 2026',
    time: 'Đã hoàn thành',
    location: 'Quarry Basin 094, Massa-Carrara',
    city: 'Tuscany, Ý',
    atelier: 'Phân Xưởng Khai Thác Đá Ý',
    status: 'COMPLETED',
    statusLabel: 'ĐÃ LƯU TRỮ VÀO KỶ YẾU',
    curator: 'Fabrizio Rossi & Hội Đồng Điêu Khắc Milan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_4hwnSCzhPsZs8d5f68pisMEeAyCDRUMsH8Hwc-u9yZTggfmZmHFXJob5VCHQvOAFi9mdGWto4Qa0vCeRKHVyq9eFJzifWwsHKilo6z9NXfrbMgwCMjsPNh7tthaHDjWUb1AYl-0y5yX9_G-MjrzNXh2P1KsUgZtWWXucLvzYU1TS2o9FuUKxPaTKca5r825HvyUFezs6j5D_A6gx-UliB0xJ8h5RVnExR9kuMxxNg7_sR9gj9ID1',
    description: 'Sự kiện chuyên sâu kéo dài 3 ngày tại lòng chảo khai thác mỏ đá vôi cẩm thạch trắng. Các tư liệu hình ảnh, mẫu thớ đá và video 8K đã được tổng hợp trọn vẹn vào Chuyên Khảo Tập IV.',
    highlights: [
      'Khảo sát 40 km đường hầm khai thác đá sâu 600m dưới dãy Apuan Alps',
      'Ký thỏa thuận quyền khai thác độc quyền 3 vỉa đá Nero Marquina thượng phẩm',
      'Chụp ảnh bộ phim tài liệu "Hơi Thở Thạch Nhũ" lưu trữ tại Viện Kiến Trúc Milan'
    ],
    schedule: [
      { time: 'Lưu trữ', activity: 'Toàn bộ tư liệu đã được mã hóa bảo mật và sẵn sàng tải về dưới dạng PDF' }
    ],
    rsvpRequired: false
  }
];
