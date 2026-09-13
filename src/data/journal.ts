import { JournalArticle, MaterialSample, AtelierLocation } from '../types';

export const JOURNAL_DATA: JournalArticle[] = [
  {
    id: 'monograph-vol-4',
    title: 'Chuyên Khảo Tập IV: Sự Tĩnh Lặng & Đá Mài Mịn',
    subtitle: 'Ấn Bản Lưu Trữ Về Tỷ Lệ Nguyên Khối Trong Nhà Ở Thượng Lưu',
    category: 'Chuyên Khảo',
    date: 'Mùa Thu 2024',
    readTime: '12 phút nghiên cứu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS0O-8tQyVo0cSCZOG51CTwawGsmcm2YFFz8ko_iv3Lp2JkqnPopxXNgQcXnWVlXRs0lNK_Qfyn-RkuMZhWdvoCwI9b7KNOJboyN3-Ar53DsmYn7Lb-50CQJjmQotq7VDdHcLIH3aNZQ-tu5UDMl7nJtFLa9S74QEi82e0fCTbFflH2LnG8PCQUlVa0UGLwbRk8hkqtrhZP0yze1ZB0tXRlpdHxgb5-o07yoqSDooVSd98XHJhqswt',
    author: 'Lorenzo Vane & Mai Nguyen',
    role: 'Kiến Trúc Sư Trưởng & Đồng Sáng Lập',
    excerpt: 'Một cuộc truy vấn về cách các lớp vỏ kiến trúc thuần khiết, không trang trí rườm rà tích tụ sức nặng cảm xúc và phẩm giá qua nhiều thế hệ gia chủ.',
    pullQuote: 'Sự xa xỉ tột cùng không nằm ở việc tích tụ đồ vật quý hiếm; đó là sự can đảm để dọn sạch không gian cho đến khi chỉ còn lại ánh sáng, đá tự nhiên và sự tĩnh lặng.',
    citation: 'Trích từ Chuyên Khảo IV, Phần II: "Lập Trường Bất Bại Của Phi Trang Trí", Nhà Xuất Bản Milan Atelier.',
    content: [
      'Trong thời đại ngày nay khi con người ngày càng mỏi mệt vì quá tải thị giác, nội thất nhà ở thường bị biến thành những sân khấu tạm bợ. Các trào lưu theo mùa vội vã ốp lên tường thạch cao, để rồi lại bị phá dỡ chỉ sau vài năm.',
      'Studio của chúng tôi theo đuổi sự trường tồn của kiến trúc. Khi một không gian được tạo tác từ các phiến đá La Mã travertine dày 8cm hay những khối gỗ sồi Pháp hàng trăm năm tuổi, không gian ấy không còn là sự trang trí. Nó trở thành địa chất.',
      'Xây dựng với đá tự nhiên là hòa mình vào dòng thời gian của đất mẹ. Những đường vân, hóa thạch vi mô và lỗ rỗng tự nhiên của travertine không phải là khuyết điểm cần lấp đầy bằng keo hóa chất; chúng là biên niên sử của dòng nước trầm tích qua hàng ngàn năm.',
      'Trong chuyên khảo này, chúng tôi ghi chép lại 12 dinh thự tư nhân hoàn thiện từ năm 2020 đến 2024 tại dãy Alps, vùng Île-de-France và miền Bắc Việt Nam, phân tích cách sự tiết chế không gian đem lại sự an yên đích thực trong tâm hồn.'
    ]
  },
  {
    id: 'quarrying-the-vein',
    title: 'Khai Thác Mạch Đá: Nhật Ký Hầm Đá Tivoli',
    subtitle: 'Hành trình vào lòng các hố đá vôi cổ xưa ngầm dưới lòng đất Lazio',
    category: 'Nghiên Cứu Vật Liệu',
    date: 'Mùa Hè 2024',
    readTime: '8 phút đọc',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_4hwnSCzhPsZs8d5f68pisMEeAyCDRUMsH8Hwc-u9yZTggfmZmHFXJob5VCHQvOAFi9mdGWto4Qa0vCeRKHVyq9eFJzifWwsHKilo6z9NXfrbMgwCMjsPNh7tthaHDjWUb1AYl-0y5yX9_G-MjrzNXh2P1KsUgZtWWXucLvzYU1TS2o9FuUKxPaTKca5r825HvyUFezs6j5D_A6gx-UliB0xJ8h5RVnExR9kuMxxNg7_sR9gj9ID1',
    author: 'Fabrizio Rossi',
    role: 'Chuyên Gia Giám Tuyển Đá Tự Nhiên',
    excerpt: 'Trước khi đặt bút vẽ mặt bằng đầu tiên, đội ngũ kiến trúc sư của chúng tôi trực tiếp xuống các mỏ đá travertine bên ngoài thành Rome để chọn từng khối đá nguyên bản.',
    pullQuote: 'Bạn không thể chọn đá quý từ một cuốn catalogue in sẵn. Bạn phải chạm tay vào vách mỏ đá lạnh giá, lần theo mạch vân ngang và lắng nghe tiếng vang của đá dưới búa thép.',
    citation: 'Sổ Lưu Trữ Mỏ Đá Tivoli, Nhật Ký Khai Thác Khối Số 094.',
    content: [
      'Cách Rome 30 km về phía đông, đồng bằng Tivoli đã cung cấp đá cho các tượng đài và công trình La Mã vĩ đại từ thế kỷ thứ nhất trước Công nguyên. Nơi đây, dòng nước khoáng nhiệt bão hòa canxi cacbonat đã bồi đắp các tầng đá vôi qua hơn bốn trăm ngàn năm.',
      'Đối với Dinh thự Castiglione, chúng tôi dành trọn ba tuần khảo sát các tầng sâu nhất của Mạch Mỏ 094. Chúng tôi chọn ra một khối đá độc bản 42 tấn với sắc be tro thanh lịch và các dải vân ngang uốn lượn tuyệt mỹ.',
      'Thay vì xẻ mỏng theo quy chuẩn công nghiệp, chúng tôi yêu cầu cắt dây kim cương tùy biến với độ dày lên đến 12 cm cho các bậc thang console vươn dài và bồn tắm nguyên khối. Mỗi phiến đá được mài bằng nước suối tự nhiên và cát kim cương mịn, tuyệt đối không dùng chất phủ bóng hóa học.',
      'Kết quả là bề mặt đá luôn mát dịu giữa trưa hè nhiệt đới, hòa nhịp cùng độ ẩm tự nhiên của căn phòng và lên nước bóng đẹp dần qua nhiều thập kỷ.'
    ]
  },
  {
    id: 'acoustic-architecture',
    title: 'Kiến Trúc Âm Học: Triệt Tiêu Tạp Âm Đô Thị',
    subtitle: 'Nghệ thuật kiến tạo sự yên tĩnh của thánh đường giữa lòng các siêu đô thị',
    category: 'Chuyên Đề Âm Học',
    date: 'Mùa Xuân 2024',
    readTime: '10 phút đọc',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMg9lJoLrkonjeac9AmzlVOGjSHjeEprqQy7ApsPwdD7vttBJm09laauB-uMKJCGakIg_upbwzNJ55a-3yvH8CB9c9PUTkA6HB2lVotYpC7T6_pNP103mKJVXnMQFdFjq-8rJjke9-yzOoCBqLvj63oiqP0sXW_E5-ahkkds6dhbigmJObkRalnGA4qUE0fVOMUuoP4rQk1jJ8Fkd8czqPqa63ksRINW3xXZE9FHkHX01n1AIjKXIe',
    author: 'Mai Nguyen & Jean-Luc Mercier',
    role: 'Kỹ Sư Âm Học & Kiến Trúc Sư',
    excerpt: 'Tại sao đỉnh cao xa xỉ trong nhà ở thế kỷ 21 không phải là diện tích bao nhiêu mét vuông, mà là sự cách ly hoàn toàn khỏi rung động và tiếng ầm ào của xe cộ.',
    pullQuote: 'Khi cường độ âm thanh môi trường giảm xuống dưới 28 dBA, hệ thần kinh con người tự động thoát khỏi trạng thái phòng thủ và chuyển sang sóng não alpha thư giãn sâu.',
    citation: 'Báo Cáo Phòng Thí Nghiệm Âm Học AURA & STONE AS-AC-24.',
    content: [
      'Các căn hộ cao cấp tại đô thị hiện đại liên tục bị ô nhiễm cảm giác vô hình: rung chấn tàu điện ngầm, tiếng rù rì của máy nén điều hòa, còi xe ngoài đường và tiếng vang dội của vách thạch cao.',
      'Tại các công trình ở Paris và Hà Nội, chúng tôi chế tác lớp vỏ âm học hai lớp tách rời (decoupled). Các bức tường khoáng nặng được ngăn cách với kết cấu bên ngoài bằng các gối giảm chấn đàn hồi chuyên dụng.',
      'Đồng thời, chúng tôi xử lý phản xạ âm bên trong phòng bằng các lớp nan gỗ vi lỗ đục giấu sau các tấm thảm dệt thô bằng vải lanh không tẩy. Thời gian ngân vang (RT60) được tinh chỉnh chính xác từ 0,35 đến 0,45 giây—mang lại sự trang nghiêm tĩnh lặng của một tu viện cổ xưa.',
      'Trong bầu không khí tĩnh mịch ấy, ngay cả tiếng tí tách của giọt nước rơi nơi sân trong cũng trở thành giai điệu thiền định nuôi dưỡng tâm hồn.'
    ]
  }
];

export const MATERIALS_DATA: MaterialSample[] = [
  {
    id: 'tivoli-travertine',
    code: 'MÃ VẬT LIỆU: 094-TIVOLI',
    name: 'Đá Travertine La Mã Tivoli Tự Nhiên',
    origin: 'Mạch Mỏ Tivoli Số 094, Lazio, Ý',
    finish: 'Mài nước thủ công, giữ lỗ rỗng khoáng sản tự nhiên, đánh sáp ong',
    description: 'Đá vôi trầm tích với sắc thái cashmere ấm áp và dải vân ngang thanh thoát. Cảm giác mát lạnh khi chạm vào, độ bền vĩnh cửu.',
    application: 'Mảng tường nguyên khối, lò sưởi console vươn dài, bồn ngâm điêu khắc',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS0O-8tQyVo0cSCZOG51CTwawGsmcm2YFFz8ko_iv3Lp2JkqnPopxXNgQcXnWVlXRs0lNK_Qfyn-RkuMZhWdvoCwI9b7KNOJboyN3-Ar53DsmYn7Lb-50CQJjmQotq7VDdHcLIH3aNZQ-tu5UDMl7nJtFLa9S74QEi82e0fCTbFflH2LnG8PCQUlVa0UGLwbRk8hkqtrhZP0yze1ZB0tXRlpdHxgb5-o07yoqSDooVSd98XHJhqswt'
  },
  {
    id: 'french-smoked-oak',
    code: 'MÃ VẬT LIỆU: 182-CHENE',
    name: 'Gỗ Sồi Pháp Hun Khói (Chêne Fumé)',
    origin: 'Khai thác bền vững từ rừng sồi cổ thụ, Burgundy, Pháp',
    finish: 'Hun khói amoniac sâu trong thớ gỗ, cào xước vân nổi, quét dầu sáp cứng',
    description: 'Sắc gỗ nâu khói sâu thẳm với độ sâu vân gỗ ấn tượng. Chất tannin tự nhiên lên nước đậm đà và bóng mượt theo thời gian.',
    application: 'Hệ ốp vách kiến trúc liền mạch, cửa mở giấu khuôn phẳng mặt, tủ kệ độc bản',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6kiEkFJjKzVNGfTSdi38sGT1LDm-evgt3lwji4o2Pv4VgMl_E711cUVvi5rF6VkJKPPnZKfTY-bKX_6nbzByLHWK5jkc3FFL2I_PVBkT-ESxJ71vcGioYo_IMK10-LwXTJWauKZz6SAzJku_Gk-5b_dIj5LMvRXQdRxQTq-HMGwmhizUYbW047I5bejHq44dtULMMTWgl3of1YxW8Myi3SrTquzNLQ_iPzcQCkDvar2Vv3Zia8U7f'
  },
  {
    id: 'brushed-champagne-brass',
    code: 'MÃ VẬT LIỆU: 045-OTTONE',
    name: 'Đồng Thau Champagne Đánh Xước Thủ Công',
    origin: 'Phay tại Milan, đánh bóng thủ công',
    finish: 'Đánh xước định hướng cát 240, đồng sống nguyên bản không phủ bóng nhựa',
    description: 'Hợp kim ánh kim vàng nhạt quý phái, oxy hóa tự nhiên theo dấu ấn chạm của con người, tạo nên lớp patina ánh đồng cổ điển độc nhất.',
    application: 'Chỉ viền rãnh 1mm siêu mảnh, ngưỡng cửa phẳng sàn, hệ đèn chiếu nghệ thuật',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF6vRTy7KVqWRtotM3eJ4hRC7nzWizUEMPIitSyMcw5Zt2LKAzVyljKYnTm5bgqVx1cyiF31rzrdKp60ONYW36-QkdMRhP5JWrH7hhnIL2VYrU2iJiZ39W3d_Nyql4H0940eTNjL7SpPD3Iv6EvVn44qy66CVcoTDnOKN3b3u7eYK5DVCRXM0Mk4pYP_c92lSeb8di2j5qGItR7qVZ7LJDb96toAPORsKhk8spIWAX9cZOSDApZOXK'
  },
  {
    id: 'volcanic-dark-basalt',
    code: 'MÃ VẬT LIỆU: 077-BASALTE',
    name: 'Đá Bazan Đen Núi Lửa',
    origin: 'Dòng dung nham núi lửa Kỷ Pleistocen, Tây Nguyên, Việt Nam',
    finish: 'Khò lửa bề mặt và chải mịn vi mô chống trơn trượt',
    description: 'Đá magma đen tuyền sâu thẳm với đặc tính tiêu âm nhờ các lỗ bọt khí vi mô. Mật độ đá cực cao, trơ với nước và biến thiên nhiệt độ.',
    application: 'Hồ nước mưa phản chiếu, phòng tắm ướt spa, sàn sảnh trưng bày nghệ thuật',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbjBHT7XgTscXabvNARKTc9LIfhBpndb5m7pznP9J_-cvqOkOgz097ztu8lGOtXEmBLgeteNwLeguK6g_Vq14W1-gtDx911I1BdVkNILj3vRNX3tcojoTQJvp2ERDtxfs1iyMfI0YE23Reiz59PAw3KvdmQh85MMmKxG1Gz0P8HPnFoL74QCf4SDyFyVk1ITV64Xt0OjoPA2Cy7Ar7r0vtYcj0k9nkQ7fGy42GF0CaTyIrhJnE5gmj'
  }
];

export const ATELIER_LOCATIONS: AtelierLocation[] = [
  {
    city: 'Milano',
    district: 'Quadrilatero della Moda',
    address: 'Via Santo Spirito, 14',
    postal: '20121 Milano, Ý',
    coordinates: "45°28'B 9°11'Đ",
    phone: '+39 02 8901 4420',
    email: 'milano@auraandstone.com',
    director: 'Lorenzo Vane, Kiến Trúc Sư Trưởng'
  },
  {
    city: 'Paris',
    district: 'Saint-Germain-des-Prés',
    address: 'Rue Bonaparte, 28',
    postal: '75006 Paris, Pháp',
    coordinates: "48°51'B 2°21'Đ",
    phone: '+33 1 43 29 88 10',
    email: 'paris@auraandstone.com',
    director: 'Claire Beaumont, Đối Tác Cấp Cao'
  },
  {
    city: 'Hà Nội',
    district: 'Khu Phố Cổ & Tràng Tiền',
    address: '18 Tràng Tiền, Hoàn Kiếm',
    postal: '100000 Hà Nội, Việt Nam',
    coordinates: "21°01'B 105°51'Đ",
    phone: '+84 24 3933 6710',
    email: 'hanoi@auraandstone.com',
    director: 'Mai Nguyễn, Kiến Trúc Sư Sáng Lập'
  }
];
