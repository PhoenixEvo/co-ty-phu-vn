import { BoardSpace } from './types';

// Rents and house costs are derived from standard Monopoly rules
// based on the verified property prices printed on the Vietnamese Cờ Tỷ Phú board.
export const BOARD_SPACES: BoardSpace[] = [
  { id: '00_start', position: 0, name: 'Bắt Đầu', type: 'start' },
  { id: '01_nguyen_hue', position: 1, name: 'Nguyễn Huệ', type: 'property', colorGroup: 'red', price: 60, baseRent: 2, houseRents: [10, 30, 90, 160], hotelRent: 250, houseCost: 50 },
  { id: '02_khi_van_1', position: 2, name: 'Khí Vận', type: 'fortune' },
  { id: '03_le_loi', position: 3, name: 'Lê Lợi', type: 'property', colorGroup: 'red', price: 60, baseRent: 4, houseRents: [20, 60, 180, 320], hotelRent: 450, houseCost: 50 },
  { id: '04_thue_thu_nhap', position: 4, name: 'Thuế Thu Nhập', type: 'tax', taxAmount: 200, isPercentageOption: true },
  { id: '05_ben_xe_can_giuoc', position: 5, name: 'Bến Xe Cần Giuộc', type: 'transport', price: 200, baseRent: 25 },
  { id: '06_luong_dinh_cua', position: 6, name: 'Lương Định Của', type: 'property', colorGroup: 'pink', price: 100, baseRent: 6, houseRents: [30, 90, 270, 400], hotelRent: 550, houseCost: 50 },
  { id: '07_co_hoi_1', position: 7, name: 'Cơ Hội', type: 'chance' },
  { id: '08_vo_thi_sau', position: 8, name: 'Võ Thị Sáu', type: 'property', colorGroup: 'pink', price: 100, baseRent: 6, houseRents: [30, 90, 270, 400], hotelRent: 550, houseCost: 50 },
  { id: '09_hai_ba_trung', position: 9, name: 'Hai Bà Trưng', type: 'property', colorGroup: 'pink', price: 120, baseRent: 8, houseRents: [40, 100, 300, 450], hotelRent: 600, houseCost: 50 },
  
  { id: '10_jail', position: 10, name: 'Ở Tù / Thăm Tù', type: 'jail' },
  { id: '11_nguyen_tat_thanh', position: 11, name: 'Nguyễn Tất Thành', type: 'property', colorGroup: 'teal', price: 140, baseRent: 10, houseRents: [50, 150, 450, 625], hotelRent: 750, houseCost: 100 },
  { id: '12_dien_luc', position: 12, name: 'Công Ty Điện Lực', type: 'utility', price: 200 },
  { id: '13_nguyen_trai', position: 13, name: 'Nguyễn Trãi', type: 'property', colorGroup: 'teal', price: 140, baseRent: 10, houseRents: [50, 150, 450, 625], hotelRent: 750, houseCost: 100 },
  { id: '14_an_duong_vuong', position: 14, name: 'An Dương Vương', type: 'property', colorGroup: 'teal', price: 160, baseRent: 12, houseRents: [60, 180, 500, 700], hotelRent: 900, houseCost: 100 },
  { id: '15_ben_xe_mien_tay', position: 15, name: 'Bến Xe Miền Tây', type: 'transport', price: 200, baseRent: 25 },
  { id: '16_hau_giang', position: 16, name: 'Hậu Giang', type: 'property', colorGroup: 'light-green', price: 180, baseRent: 14, houseRents: [70, 200, 550, 750], hotelRent: 950, houseCost: 100 },
  { id: '17_khi_van_2', position: 17, name: 'Khí Vận', type: 'fortune' },
  { id: '18_hung_vuong', position: 18, name: 'Hùng Vương', type: 'property', colorGroup: 'light-green', price: 180, baseRent: 14, houseRents: [70, 200, 550, 750], hotelRent: 950, houseCost: 100 },
  { id: '19_huynh_tan_phat', position: 19, name: 'Huỳnh Tấn Phát', type: 'property', colorGroup: 'light-green', price: 200, baseRent: 16, houseRents: [80, 220, 600, 800], hotelRent: 1000, houseCost: 100 },

  { id: '20_parking', position: 20, name: 'Bãi Đậu Xe Miễn Phí', type: 'parking' },
  { id: '21_pham_the_hien', position: 21, name: 'Phạm Thế Hiển', type: 'property', colorGroup: 'orange', price: 220, baseRent: 18, houseRents: [90, 250, 700, 875], hotelRent: 1050, houseCost: 150 },
  { id: '22_co_hoi_2', position: 22, name: 'Cơ Hội', type: 'chance' },
  { id: '23_kha_van_can', position: 23, name: 'Kha Vạn Cân', type: 'property', colorGroup: 'orange', price: 220, baseRent: 18, houseRents: [90, 250, 700, 875], hotelRent: 1050, houseCost: 150 },
  { id: '24_nguyen_tri_phuong', position: 24, name: 'Nguyễn Tri Phương', type: 'property', colorGroup: 'orange', price: 240, baseRent: 20, houseRents: [100, 300, 750, 925], hotelRent: 1100, houseCost: 150 },
  { id: '25_ben_xe_cho_lon', position: 25, name: 'Bến Xe Chợ Lớn', type: 'transport', price: 200, baseRent: 25 },
  { id: '26_le_dai_hanh', position: 26, name: 'Lê Đại Hành', type: 'property', colorGroup: 'yellow', price: 260, baseRent: 22, houseRents: [110, 330, 800, 975], hotelRent: 1150, houseCost: 150 },
  { id: '27_truong_chinh', position: 27, name: 'Trường Chinh', type: 'property', colorGroup: 'yellow', price: 260, baseRent: 22, houseRents: [110, 330, 800, 975], hotelRent: 1150, houseCost: 150 },
  { id: '28_cap_nuoc', position: 28, name: 'Công Ty Cấp Nước', type: 'utility', price: 200 },
  { id: '29_hoang_van_thu', position: 29, name: 'Hoàng Văn Thụ', type: 'property', colorGroup: 'yellow', price: 280, baseRent: 24, houseRents: [120, 360, 850, 1025], hotelRent: 1200, houseCost: 150 },

  { id: '30_go_to_jail', position: 30, name: 'Vào Tù', type: 'go_to_jail' },
  { id: '31_cong_hoa', position: 31, name: 'Cộng Hòa', type: 'property', colorGroup: 'cyan', price: 300, baseRent: 26, houseRents: [130, 390, 900, 1100], hotelRent: 1275, houseCost: 200 },
  { id: '32_nguyen_kiem', position: 32, name: 'Nguyễn Kiệm', type: 'property', colorGroup: 'cyan', price: 300, baseRent: 26, houseRents: [130, 390, 900, 1100], hotelRent: 1275, houseCost: 200 },
  { id: '33_khi_van_3', position: 33, name: 'Khí Vận', type: 'fortune' },
  { id: '34_quang_trung', position: 34, name: 'Quang Trung', type: 'property', colorGroup: 'cyan', price: 320, baseRent: 28, houseRents: [150, 450, 1000, 1200], hotelRent: 1400, houseCost: 200 },
  { id: '35_ben_xe_mien_dong', position: 35, name: 'Bến Xe Miền Đông', type: 'transport', price: 200, baseRent: 25 },
  { id: '36_co_hoi_3', position: 36, name: 'Cơ Hội', type: 'chance' },
  { id: '37_luy_ban_bich', position: 37, name: 'Lũy Bán Bích', type: 'property', colorGroup: 'dark-blue', price: 350, baseRent: 35, houseRents: [175, 500, 1100, 1300], hotelRent: 1500, houseCost: 200 },
  { id: '38_thue_dac_biet', position: 38, name: 'Thuế Đặc Biệt', type: 'tax', taxAmount: 100 },
  { id: '39_tan_ky_tan_quy', position: 39, name: 'Tân Kỳ Tân Quý', type: 'property', colorGroup: 'dark-blue', price: 400, baseRent: 50, houseRents: [200, 600, 1400, 1700], hotelRent: 2000, houseCost: 200 },
];
