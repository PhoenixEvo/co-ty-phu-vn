export interface Card {
  id: string;
  type: 'chance' | 'fortune';
  title: string;
  description: string;
  icon: string;
  effect: {
    type: 'money' | 'move_to' | 'move_steps' | 'jail' | 'collect_from_all';
    amount?: number;
    targetPosition?: number;
    steps?: number;
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
    description: 'Tiến thẳng đến đại lộ Nguyễn Huệ để ngắm cảnh.',
    icon: '🚶',
    effect: { type: 'move_to', targetPosition: 1 }
  },
  {
    id: 'chance_4',
    type: 'chance',
    title: 'Bắt Chuyến Xe Khách',
    description: 'Đến ngay Bến Xe Miền Đông để đón người thân.',
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
    description: 'Cơ quan thuế hoàn lại khoản thuế đóng thừa cho bạn.',
    icon: '💰',
    effect: { type: 'money', amount: 750_000 }
  },
  {
    id: 'fortune_5',
    type: 'fortune',
    title: 'Sửa Chữa Nhà Cửa',
    description: 'Bảo trì hệ thống điện nước trong nhà trước mùa mưa bão.',
    icon: '🔨',
    effect: { type: 'money', amount: -600_000 }
  },
  {
    id: 'fortune_6',
    type: 'fortune',
    title: 'Đến Ô Bắt Đầu',
    description: 'Tiến về ô Bắt Đầu để nhận lương 2.000.000 ₫.',
    icon: '⬆️',
    effect: { type: 'move_to', targetPosition: 0 }
  }
];
