export interface Card {
  id: string;
  type: 'chance' | 'fortune';
  title: string;
  description: string;
  icon: string;
  effect: {
    type: 'money' | 'move_to' | 'move_steps' | 'jail' | 'collect_from_all' | 'pay_to_all' | 'repairs';
    amount?: number;
    targetPosition?: number;
    steps?: number;
    houseFee?: number;
    hotelFee?: number;
  };
}

export const CHANCE_CARDS: Card[] = [
  {
    id: 'chance_1',
    type: 'chance',
    title: 'Trúng Xổ Số Kiến Thiết',
    description: 'Bạn vừa trúng giải nhì xổ số kiến thiết miền Nam!',
    icon: '🎉',
    effect: { type: 'money', amount: 2_000_000 }
  },
  {
    id: 'chance_2',
    type: 'chance',
    title: 'Vi Phạm Giao Thông',
    description: 'Vượt đèn đỏ tại ngã tư Hàng Xanh. Nộp phạt cho cảnh sát giao thông.',
    icon: '👮',
    effect: { type: 'money', amount: -500_000 }
  },
  {
    id: 'chance_3',
    type: 'chance',
    title: 'Đi Dạo Phố Đi Bộ',
    description: 'Tiến thẳng đến đại lộ Nguyễn Huệ để ngắm cảnh và dạo mát.',
    icon: '🚶',
    effect: { type: 'move_to', targetPosition: 1 }
  },
  {
    id: 'chance_4',
    type: 'chance',
    title: 'Bắt Chuyến Xe Khách',
    description: 'Đến ngay Bến Xe Miền Đông để đón người thân từ quê lên.',
    icon: '🚌',
    effect: { type: 'move_to', targetPosition: 35 }
  },
  {
    id: 'chance_5',
    type: 'chance',
    title: 'Bị Bắt Vào Tù',
    description: 'Bị phát hiện gian lận thương mại. Vào tù ngay lập tức, không qua ô Bắt Đầu!',
    icon: '🚓',
    effect: { type: 'jail' }
  },
  {
    id: 'chance_6',
    type: 'chance',
    title: 'Cổ Tức Chứng Khoán',
    description: 'Công ty đầu tư làm ăn phát đạt, bạn nhận được cổ tức 1.500.000 ₫.',
    icon: '📈',
    effect: { type: 'money', amount: 1_500_000 }
  },
  {
    id: 'chance_7',
    type: 'chance',
    title: 'Du Lịch Vịnh Hạ Long',
    description: 'Đặt vé du thuyền tham quan di sản thiên nhiên thế giới Vịnh Hạ Long.',
    icon: '⛵',
    effect: { type: 'move_to', targetPosition: 24 }
  },
  {
    id: 'chance_8',
    type: 'chance',
    title: 'Khám Phá Cố Đô Huế',
    description: 'Mua vé tàu hỏa ghé thăm Đại Nội và lăng tẩm Cố Đô Huế.',
    icon: '🏯',
    effect: { type: 'move_to', targetPosition: 11 }
  },
  {
    id: 'chance_9',
    type: 'chance',
    title: 'Ghé Thăm Hồ Gươm',
    description: 'Dừng chân ngắm Tháp Rùa và thưởng thức kem Tràng Tiền tại Hà Nội.',
    icon: '🐢',
    effect: { type: 'move_to', targetPosition: 39 }
  },
  {
    id: 'chance_10',
    type: 'chance',
    title: 'Tránh Đoạn Đường Kẹt Xe',
    description: 'Đường phía trước đang ùn tắc ngập nước, lùi lại 3 ô để tìm đường nhánh.',
    icon: '⏪',
    effect: { type: 'move_steps', steps: -3 }
  },
  {
    id: 'chance_11',
    type: 'chance',
    title: 'Bảo Hiểm Xe Máy',
    description: 'Đến hạn đóng phí bảo hiểm trách nhiệm dân sự bắt buộc.',
    icon: '🛵',
    effect: { type: 'money', amount: -300_000 }
  },
  {
    id: 'chance_12',
    type: 'chance',
    title: 'Trúng Thưởng Vietlott',
    description: 'Tấm vé số tự chọn mang lại cho bạn giải thưởng lớn 3.000.000 ₫!',
    icon: '🎰',
    effect: { type: 'money', amount: 3_000_000 }
  },
  {
    id: 'chance_13',
    type: 'chance',
    title: 'Ủng Hộ Đồng Bào Bão Lũ',
    description: 'Chung tay đóng góp quỹ cứu trợ đồng bào miền Trung khắc phục thiên tai.',
    icon: '🤝',
    effect: { type: 'money', amount: -500_000 }
  },
  {
    id: 'chance_14',
    type: 'chance',
    title: 'Thưởng Doanh Số Năm',
    description: 'Đạt danh hiệu chiến sĩ thi đua xuất sắc, ban giám đốc thưởng nóng.',
    icon: '🏆',
    effect: { type: 'money', amount: 1_200_000 }
  },
  {
    id: 'chance_15',
    type: 'chance',
    title: 'Cà Phê Nhà Thờ Đức Bà',
    description: 'Hẹn gặp đối tác uống cà phê sáng tại khu vực Nhà Thờ Đức Bà.',
    icon: '☕',
    effect: { type: 'move_to', targetPosition: 3 }
  },
  {
    id: 'chance_16',
    type: 'chance',
    title: 'Bảo Trì Bất Động Sản',
    description: 'Cải tạo và sơn mới các bất động sản: Nộp 250.000 ₫ mỗi Nhà, 1.000.000 ₫ mỗi Khách Sạn.',
    icon: '🛠️',
    effect: { type: 'repairs', houseFee: 250_000, hotelFee: 1_000_000 }
  },
  {
    id: 'chance_17',
    type: 'chance',
    title: 'Đến Ô Bắt Đầu',
    description: 'Tiến thẳng về ô Bắt Đầu để nhận lương 2.000.000 ₫.',
    icon: '⬆️',
    effect: { type: 'move_to', targetPosition: 0 }
  },
  {
    id: 'chance_18',
    type: 'chance',
    title: 'Vi Phạm Nồng Độ Cồn',
    description: 'Uống rượu bia sau tiệc liên hoan rồi tự lái xe. Bị phạt kịch khung!',
    icon: '🚫',
    effect: { type: 'money', amount: -1_500_000 }
  }
];

export const FORTUNE_CARDS: Card[] = [
  {
    id: 'fortune_1',
    type: 'fortune',
    title: 'Mừng Tuổi Đầu Năm',
    description: 'Nhận lì xì may mắn đầu năm mới từ họ hàng gia đình!',
    icon: '🧧',
    effect: { type: 'money', amount: 1_000_000 }
  },
  {
    id: 'fortune_2',
    type: 'fortune',
    title: 'Khám Sức Khỏe Định Kỳ',
    description: 'Chi trả viện phí kiểm tra sức khỏe tại bệnh viện Chợ Rẫy.',
    icon: '🏥',
    effect: { type: 'money', amount: -1_000_000 }
  },
  {
    id: 'fortune_3',
    type: 'fortune',
    title: 'Tiệc Sinh Nhật Rộn Ràng',
    description: 'Hôm nay là sinh nhật bạn! Thu mỗi người chơi 250.000 ₫ tiền quà mừng.',
    icon: '🎂',
    effect: { type: 'collect_from_all', amount: 250_000 }
  },
  {
    id: 'fortune_4',
    type: 'fortune',
    title: 'Hoàn Thuế Nhà Nước',
    description: 'Cơ quan thuế hoàn lại khoản thuế thu nhập cá nhân nộp thừa cho bạn.',
    icon: '💰',
    effect: { type: 'money', amount: 750_000 }
  },
  {
    id: 'fortune_5',
    type: 'fortune',
    title: 'Sửa Chữa Điện Nước',
    description: 'Bảo trì hệ thống điện và đường ống nước trong nhà trước mùa mưa bão.',
    icon: '🔨',
    effect: { type: 'money', amount: -600_000 }
  },
  {
    id: 'fortune_6',
    type: 'fortune',
    title: 'Tiến Về Ô Bắt Đầu',
    description: 'Tiến về ô Bắt Đầu để nhận lương 2.000.000 ₫.',
    icon: '⬆️',
    effect: { type: 'move_to', targetPosition: 0 }
  },
  {
    id: 'fortune_7',
    type: 'fortune',
    title: 'Mừng Cưới Bạn Thân',
    description: 'Đi dự tiệc cưới của bạn thân chí cốt, gửi phong bì mừng hạnh phúc.',
    icon: '💒',
    effect: { type: 'money', amount: -500_000 }
  },
  {
    id: 'fortune_8',
    type: 'fortune',
    title: 'Kinh Doanh Online Phát Đạt',
    description: 'Gian hàng thương mại điện tử chốt được hàng trăm đơn hàng ngày hội mua sắm.',
    icon: '📦',
    effect: { type: 'money', amount: 1_200_000 }
  },
  {
    id: 'fortune_9',
    type: 'fortune',
    title: 'Khao Bạn Bè Ăn Lẩu',
    description: 'Vừa ký được hợp đồng mới, bạn hào phóng mời mỗi người chơi 200.000 ₫ đi ăn lẩu.',
    icon: '🍲',
    effect: { type: 'pay_to_all', amount: 200_000 }
  },
  {
    id: 'fortune_10',
    type: 'fortune',
    title: 'Đóng Tiền Học Phí',
    description: 'Thanh toán học phí khóa học nâng cao kỹ năng công nghệ chuyên sâu.',
    icon: '🎓',
    effect: { type: 'money', amount: -1_200_000 }
  },
  {
    id: 'fortune_11',
    type: 'fortune',
    title: 'Tiền Thuê Nhà Hàng Tháng',
    description: 'Nhận tiền thuê trọ và mặt bằng kinh doanh thụ động định kỳ hàng tháng.',
    icon: '🏘️',
    effect: { type: 'money', amount: 800_000 }
  },
  {
    id: 'fortune_12',
    type: 'fortune',
    title: 'Sửa Xe Máy Hỏng Dọc Đường',
    description: 'Xe bị thủng lốp và đứt dây curoa trên đường đi làm, phải vào tiệm sửa gấp.',
    icon: '🔧',
    effect: { type: 'money', amount: -400_000 }
  },
  {
    id: 'fortune_13',
    type: 'fortune',
    title: 'Bốc Thăm May Mắn Siêu Thị',
    description: 'Hóa đơn mua sắm cuối tuần trúng phiếu quà tặng trị giá 500.000 ₫.',
    icon: '🎁',
    effect: { type: 'money', amount: 500_000 }
  },
  {
    id: 'fortune_14',
    type: 'fortune',
    title: 'Hóa Đơn Tiền Điện Nắng Nóng',
    description: 'Máy lạnh chạy hết công suất suốt mùa nắng cao điểm, tiền điện tăng vọt.',
    icon: '⚡',
    effect: { type: 'money', amount: -800_000 }
  },
  {
    id: 'fortune_15',
    type: 'fortune',
    title: 'Đại Tu Bất Động Sản',
    description: 'Chống thấm dột và bảo dưỡng: Đóng 150.000 ₫ mỗi Nhà, 600.000 ₫ mỗi Khách Sạn.',
    icon: '🏗️',
    effect: { type: 'repairs', houseFee: 150_000, hotelFee: 600_000 }
  },
  {
    id: 'fortune_16',
    type: 'fortune',
    title: 'Nhận Kiều Hối Từ Nước Ngoài',
    description: 'Người thân ở hải ngoại gửi kiều hối về mừng gia đình dịp lễ Tết.',
    icon: '💵',
    effect: { type: 'money', amount: 2_500_000 }
  },
  {
    id: 'fortune_17',
    type: 'fortune',
    title: 'Phạt Đậu Xe Sai Quy Định',
    description: 'Đỗ xe dưới lòng lề đường nơi có biển cấm dừng đỗ ở trung tâm quận 1.',
    icon: '🅿️',
    effect: { type: 'money', amount: -350_000 }
  },
  {
    id: 'fortune_18',
    type: 'fortune',
    title: 'Nghỉ Dưỡng Tại Đà Lạt',
    description: 'Tiến thẳng lên thành phố ngàn hoa Đà Lạt để tận hưởng không khí trong lành.',
    icon: '🌲',
    effect: { type: 'move_to', targetPosition: 19 }
  }
];
