import { BoardSpace } from './types';

// Authoritative 40-Space Vietnamese Cờ Tỷ Phú Board Configuration
// Contains 28 asset-related spaces (22 properties + 4 bus stations + 2 utilities),
// 3 Chance, 3 Fortune, 2 Taxes, and 4 Corner spaces.
export const BOARD_SPACES: BoardSpace[] = [
  // 0: Start
  { 
    id: '00_start', 
    position: 0, 
    name: 'Bắt Đầu', 
    type: 'start' 
  },

  // 1: Red Group (Historic Boulevards)
  { 
    id: '01_nguyen_hue', 
    position: 1, 
    name: 'Nguyễn Huệ', 
    type: 'property', 
    colorGroup: 'red', 
    price: 60, 
    baseRent: 2, 
    houseRents: [10, 30, 90, 160], 
    hotelRent: 250, 
    houseCost: 50,
    region: 'south',
    landmark: 'Phố Đi Bộ & UBND Thành Phố',
    landmarkIcon: '🏛️',
    description: 'Đại lộ danh giá và sầm uất bậc nhất trung tâm Sài Gòn.'
  },

  // 2: Fortune
  { 
    id: '02_khi_van_1', 
    position: 2, 
    name: 'Khí Vận', 
    type: 'fortune' 
  },

  // 3: Red Group
  { 
    id: '03_le_loi', 
    position: 3, 
    name: 'Lê Lợi', 
    type: 'property', 
    colorGroup: 'red', 
    price: 60, 
    baseRent: 4, 
    houseRents: [20, 60, 180, 320], 
    hotelRent: 450, 
    houseCost: 50,
    region: 'south',
    landmark: 'Chợ Bến Thành & Nhà Hát Lớn',
    landmarkIcon: '🎭',
    description: 'Trục đường thương mại lịch sử nối liền Chợ Bến Thành và Nhà hát Thành phố.'
  },

  // 4: Tax
  { 
    id: '04_thue_thu_nhap', 
    position: 4, 
    name: 'Thuế Thu Nhập', 
    type: 'tax', 
    taxAmount: 200, 
    isPercentageOption: true 
  },

  // 5: Transport
  { 
    id: '05_ben_xe_can_giuoc', 
    position: 5, 
    name: 'Bến Xe Cần Giuộc', 
    type: 'transport', 
    price: 200, 
    baseRent: 25,
    region: 'south',
    landmark: 'Bến Xe Cần Giuộc - Miền Tây',
    landmarkIcon: '🚌',
    description: 'Đầu mối vận tải hành khách nối liền miền Tây Nam Bộ sông nước.'
  },

  // 6: Pink Group
  { 
    id: '06_luong_dinh_cua', 
    position: 6, 
    name: 'Lương Định Của', 
    type: 'property', 
    colorGroup: 'pink', 
    price: 100, 
    baseRent: 6, 
    houseRents: [30, 90, 270, 400], 
    hotelRent: 550, 
    houseCost: 50,
    region: 'south',
    landmark: 'Khu Đô Thị Mới Thủ Thiêm',
    landmarkIcon: '🏙️',
    description: 'Tuyến giao thông trọng điểm kết nối bán đảo tài chính Thủ Thiêm.'
  },

  // 7: Chance
  { 
    id: '07_co_hoi_1', 
    position: 7, 
    name: 'Cơ Hội', 
    type: 'chance' 
  },

  // 8: Pink Group
  { 
    id: '08_vo_thi_sau', 
    position: 8, 
    name: 'Võ Thị Sáu', 
    type: 'property', 
    colorGroup: 'pink', 
    price: 100, 
    baseRent: 6, 
    houseRents: [30, 90, 270, 400], 
    hotelRent: 550, 
    houseCost: 50,
    region: 'south',
    landmark: 'Biệt Thự Di Sản & Công Viên',
    landmarkIcon: '🌳',
    description: 'Trục đường rợp bóng cây xanh cổ thụ với những tòa biệt thự kiểu Pháp sang trọng.'
  },

  // 9: Pink Group
  { 
    id: '09_hai_ba_trung', 
    position: 9, 
    name: 'Hai Bà Trưng', 
    type: 'property', 
    colorGroup: 'pink', 
    price: 120, 
    baseRent: 8, 
    houseRents: [40, 100, 300, 450], 
    hotelRent: 600, 
    houseCost: 50,
    region: 'south',
    landmark: 'Nhà Thờ Tân Định Màu Hồng',
    landmarkIcon: '⛪',
    description: 'Con phố ẩm thực và thương mại sầm uất với Nhà thờ Tân Định màu hồng nổi tiếng thế giới.'
  },
  
  // 10: Jail (Corner)
  { 
    id: '10_jail', 
    position: 10, 
    name: 'Ở Tù / Thăm Tù', 
    type: 'jail' 
  },

  // 11: Teal Group
  { 
    id: '11_nguyen_tat_thanh', 
    position: 11, 
    name: 'Nguyễn Tất Thành', 
    type: 'property', 
    colorGroup: 'teal', 
    price: 140, 
    baseRent: 10, 
    houseRents: [50, 150, 450, 625], 
    hotelRent: 750, 
    houseCost: 100,
    region: 'south',
    landmark: 'Bến Cảng Nhà Rồng Lịch Sử',
    landmarkIcon: '🚢',
    description: 'Nơi Bác Hồ ra đi tìm đường cứu nước năm 1911 trên sông Sài Gòn.'
  },

  // 12: Utility
  { 
    id: '12_dien_luc', 
    position: 12, 
    name: 'Công Ty Điện Lực', 
    type: 'utility', 
    price: 200 
  },

  // 13: Teal Group
  { 
    id: '13_nguyen_trai', 
    position: 13, 
    name: 'Nguyễn Trãi', 
    type: 'property', 
    colorGroup: 'teal', 
    price: 140, 
    baseRent: 10, 
    houseRents: [50, 150, 450, 625], 
    hotelRent: 750, 
    houseCost: 100,
    region: 'south',
    landmark: 'Phố Thời Trang & Chợ Lớn Cổ Kính',
    landmarkIcon: '🛍️',
    description: 'Con phố thời trang nhộn nhịp ngày đêm của khu Chợ Lớn sầm uất.'
  },

  // 14: Teal Group
  { 
    id: '14_an_duong_vuong', 
    position: 14, 
    name: 'An Dương Vương', 
    type: 'property', 
    colorGroup: 'teal', 
    price: 160, 
    baseRent: 12, 
    houseRents: [60, 180, 500, 700], 
    hotelRent: 900, 
    houseCost: 100,
    region: 'south',
    landmark: 'Khu Thương Mại & Cơ Khí',
    landmarkIcon: '🚘',
    description: 'Tuyến đường giao thương phụ tùng và cơ giới lớn nhất thành phố.'
  },

  // 15: Transport
  { 
    id: '15_ben_xe_mien_tay', 
    position: 15, 
    name: 'Bến Xe Miền Tây', 
    type: 'transport', 
    price: 200, 
    baseRent: 25,
    region: 'south',
    landmark: 'Bến Xe Miền Tây An Lạc',
    landmarkIcon: '🚌',
    description: 'Cửa ngõ giao thông huyết mạch kết nối TP.HCM với 13 tỉnh Đồng Bằng Sông Cửu Long.'
  },

  // 16: Light-Green Group
  { 
    id: '16_hau_giang', 
    position: 16, 
    name: 'Hậu Giang', 
    type: 'property', 
    colorGroup: 'light-green', 
    price: 180, 
    baseRent: 14, 
    houseRents: [70, 200, 550, 750], 
    hotelRent: 950, 
    houseCost: 100,
    region: 'south',
    landmark: 'Chợ Cây Gõ & Phố Vải',
    landmarkIcon: '🏪',
    description: 'Trung tâm đầu mối bán buôn hàng dệt may và vải vóc truyền thống.'
  },

  // 17: Fortune
  { 
    id: '17_khi_van_2', 
    position: 17, 
    name: 'Khí Vận', 
    type: 'fortune' 
  },

  // 18: Light-Green Group
  { 
    id: '18_hung_vuong', 
    position: 18, 
    name: 'Hùng Vương', 
    type: 'property', 
    colorGroup: 'light-green', 
    price: 180, 
    baseRent: 14, 
    houseRents: [70, 200, 550, 750], 
    hotelRent: 950, 
    houseCost: 100,
    region: 'south',
    landmark: 'Quảng Trường & Bệnh Viện Y Dược',
    landmarkIcon: '🏥',
    description: 'Đại lộ lịch sử quy tụ nhiều bệnh viện và trường đại học lớn.'
  },

  // 19: Light-Green Group
  { 
    id: '19_huynh_tan_phat', 
    position: 19, 
    name: 'Huỳnh Tấn Phát', 
    type: 'property', 
    colorGroup: 'light-green', 
    price: 200, 
    baseRent: 16, 
    houseRents: [80, 220, 600, 800], 
    hotelRent: 1000, 
    houseCost: 100,
    region: 'south',
    landmark: 'Cầu Phú Mỹ & Cảng Nhà Bè',
    landmarkIcon: '🌉',
    description: 'Tuyến đường huyết mạch nối liền khu cảng biển Nam Sài Gòn và Cần Giờ.'
  },

  // 20: Free Parking (Corner)
  { 
    id: '20_parking', 
    position: 20, 
    name: 'Bãi Đậu Xe Miễn Phí', 
    type: 'parking' 
  },

  // 21: Orange Group
  { 
    id: '21_pham_the_hien', 
    position: 21, 
    name: 'Phạm Thế Hiển', 
    type: 'property', 
    colorGroup: 'orange', 
    price: 220, 
    baseRent: 18, 
    houseRents: [90, 250, 700, 875], 
    hotelRent: 1050, 
    houseCost: 150,
    region: 'south',
    landmark: 'Xóm Đạo Bình An Rực Rỡ',
    landmarkIcon: '✨',
    description: 'Khu xóm đạo lộng lẫy và náo nhiệt bậc nhất mỗi mùa Giáng Sinh.'
  },

  // 22: Chance
  { 
    id: '22_co_hoi_2', 
    position: 22, 
    name: 'Cơ Hội', 
    type: 'chance' 
  },

  // 23: Orange Group
  { 
    id: '23_kha_van_can', 
    position: 23, 
    name: 'Kha Vạn Cân', 
    type: 'property', 
    colorGroup: 'orange', 
    price: 220, 
    baseRent: 18, 
    houseRents: [90, 250, 700, 875], 
    hotelRent: 1050, 
    houseCost: 150,
    region: 'south',
    landmark: 'Chợ Thủ Đức & Cầu Bình Lợi',
    landmarkIcon: '🛤️',
    description: 'Tuyến đường lịch sử nối trung tâm thành phố với thành phố sáng tạo Thủ Đức.'
  },

  // 24: Orange Group
  { 
    id: '24_nguyen_tri_phuong', 
    position: 24, 
    name: 'Nguyễn Tri Phương', 
    type: 'property', 
    colorGroup: 'orange', 
    price: 240, 
    baseRent: 20, 
    houseRents: [100, 300, 750, 925], 
    hotelRent: 1100, 
    houseCost: 150,
    region: 'south',
    landmark: 'Phố Ẩm Thực Đêm & Cầu NTP',
    landmarkIcon: '🍜',
    description: 'Thiên đường ẩm thực đường phố và giao thương tấp nập.'
  },

  // 25: Transport
  { 
    id: '25_ben_xe_cho_lon', 
    position: 25, 
    name: 'Bến Xe Chợ Lớn', 
    type: 'transport', 
    price: 200, 
    baseRent: 25,
    region: 'south',
    landmark: 'Bến Xe Chợ Lớn - Quận 5',
    landmarkIcon: '🚌',
    description: 'Trạm trung chuyển xe buýt nội thành lâu đời của trung tâm người Hoa.'
  },

  // 26: Yellow Group
  { 
    id: '26_le_dai_hanh', 
    position: 26, 
    name: 'Lê Đại Hành', 
    type: 'property', 
    colorGroup: 'yellow', 
    price: 260, 
    baseRent: 22, 
    houseRents: [110, 330, 800, 975], 
    hotelRent: 1150, 
    houseCost: 150,
    region: 'south',
    landmark: 'Trường Đua Ngựa Phú Thọ',
    landmarkIcon: '🏇',
    description: 'Trường đua ngựa lịch sử đầu tiên và lâu đời bậc nhất Việt Nam.'
  },

  // 27: Yellow Group
  { 
    id: '27_truong_chinh', 
    position: 27, 
    name: 'Trường Chinh', 
    type: 'property', 
    colorGroup: 'yellow', 
    price: 260, 
    baseRent: 22, 
    houseRents: [110, 330, 800, 975], 
    hotelRent: 1150, 
    houseCost: 150,
    region: 'south',
    landmark: 'Cửa Ngõ Tây Bắc & Tuyến Metro',
    landmarkIcon: '🚇',
    description: 'Đầu mối giao thông huyết mạch kết nối Tây Bắc thành phố với Quốc lộ 22.'
  },

  // 28: Utility
  { 
    id: '28_cap_nuoc', 
    position: 28, 
    name: 'Công Ty Cấp Nước', 
    type: 'utility', 
    price: 200 
  },

  // 29: Yellow Group
  { 
    id: '29_hoang_van_thu', 
    position: 29, 
    name: 'Hoàng Văn Thụ', 
    type: 'property', 
    colorGroup: 'yellow', 
    price: 280, 
    baseRent: 24, 
    houseRents: [120, 360, 850, 1025], 
    hotelRent: 1200, 
    houseCost: 150,
    region: 'south',
    landmark: 'Công Viên Lá Phổi Sân Bay',
    landmarkIcon: '✈️',
    description: 'Lá phổi xanh tại cửa ngõ sân bay quốc tế Tân Sơn Nhất.'
  },

  // 30: Go To Jail (Corner)
  { 
    id: '30_go_to_jail', 
    position: 30, 
    name: 'Vào Tù', 
    type: 'go_to_jail' 
  },

  // 31: Cyan Group
  { 
    id: '31_cong_hoa', 
    position: 31, 
    name: 'Cộng Hòa', 
    type: 'property', 
    colorGroup: 'cyan', 
    price: 300, 
    baseRent: 26, 
    houseRents: [130, 390, 900, 1100], 
    hotelRent: 1275, 
    houseCost: 200,
    region: 'south',
    landmark: 'Đại Lộ Văn Phòng & Tài Chính',
    landmarkIcon: '🏢',
    description: 'Khu vực tập trung nhiều tòa nhà văn phòng và trung tâm logistics hàng không.'
  },

  // 32: Cyan Group
  { 
    id: '32_nguyen_kiem', 
    position: 32, 
    name: 'Nguyễn Kiệm', 
    type: 'property', 
    colorGroup: 'cyan', 
    price: 300, 
    baseRent: 26, 
    houseRents: [130, 390, 900, 1100], 
    hotelRent: 1275, 
    houseCost: 200,
    region: 'south',
    landmark: 'Công Viên Gia Định Xanh Mát',
    landmarkIcon: '🌲',
    description: 'Tuyến đường rợp bóng cây cổ thụ nối liền quận Gò Vấp và Phú Nhuận.'
  },

  // 33: Fortune
  { 
    id: '33_khi_van_3', 
    position: 33, 
    name: 'Khí Vận', 
    type: 'fortune' 
  },

  // 34: Cyan Group
  { 
    id: '34_quang_trung', 
    position: 34, 
    name: 'Quang Trung', 
    type: 'property', 
    colorGroup: 'cyan', 
    price: 320, 
    baseRent: 28, 
    houseRents: [150, 450, 1000, 1200], 
    hotelRent: 1400, 
    houseCost: 200,
    region: 'south',
    landmark: 'Công Viên Phần Mềm Quang Trung',
    landmarkIcon: '💻',
    description: 'Trung tâm công nghệ thông tin và chuyển đổi số hàng đầu Việt Nam.'
  },

  // 35: Transport
  { 
    id: '35_ben_xe_mien_dong', 
    position: 35, 
    name: 'Bến Xe Miền Đông', 
    type: 'transport', 
    price: 200, 
    baseRent: 25,
    region: 'south',
    landmark: 'Bến Xe Miền Đông Mới',
    landmarkIcon: '🚌',
    description: 'Bến xe hiện đại quy mô lớn nhất Việt Nam kết nối miền Trung và miền Bắc.'
  },

  // 36: Chance
  { 
    id: '36_co_hoi_3', 
    position: 36, 
    name: 'Cơ Hội', 
    type: 'chance' 
  },

  // 37: Dark-Blue Group (Prime Jewels)
  { 
    id: '37_luy_ban_bich', 
    position: 37, 
    name: 'Lũy Bán Bích', 
    type: 'property', 
    colorGroup: 'dark-blue', 
    price: 350, 
    baseRent: 35, 
    houseRents: [175, 500, 1100, 1300], 
    hotelRent: 1500, 
    houseCost: 200,
    region: 'south',
    landmark: 'Di Tích Lũy Bán Bích & Chùa Giác Lâm',
    landmarkIcon: '🏯',
    description: 'Chiến lũy phòng thủ cổ xưa xây dựng từ năm 1772 dưới thời chúa Nguyễn.'
  },

  // 38: Tax
  { 
    id: '38_thue_dac_biet', 
    position: 38, 
    name: 'Thuế Đặc Biệt', 
    type: 'tax', 
    taxAmount: 100 
  },

  // 39: Dark-Blue Group (King of Real Estate)
  { 
    id: '39_tan_ky_tan_quy', 
    position: 39, 
    name: 'Tân Kỳ Tân Quý', 
    type: 'property', 
    colorGroup: 'dark-blue', 
    price: 400, 
    baseRent: 50, 
    houseRents: [200, 600, 1400, 1700], 
    hotelRent: 2000, 
    houseCost: 200,
    region: 'south',
    landmark: 'Khu Đô Thị Thương Mại Vàng Bạc',
    landmarkIcon: '💎',
    description: 'Tấc đất tấc vàng — Trung tâm bất động sản thịnh vượng và đắt giá nhất bàn cờ.'
  },
];
