'use client';

import React, { useState } from 'react';

export interface LocationArtwork {
  locationId: string;
  name: string;
  subtitle: string;
  region: 'north' | 'central' | 'south';
  regionLabel: string;
  culturalSnippet: string;
  accentColor: string;
  imagePath: string;
  alt: string;
  renderThumbnail: (className?: string) => React.ReactNode;
  renderHero: (className?: string) => React.ReactNode;
}

// Component that renders destination photograph with graceful fallback
export function LocationPhotoThumbnail({ 
  src, 
  alt, 
  className = 'w-full h-full' 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`bg-linear-to-br from-amber-100 to-emerald-100 flex items-center justify-center text-slate-700 text-[9px] font-bold rounded-xs ${className}`}>
        🏛️
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xs relative group shadow-2xs border border-slate-200/80 ${className}`}>
      <img 
        src={src} 
        alt={alt}
        loading="lazy"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

// Component that renders high-resolution hero photo for location cards
export function LocationPhotoHero({
  src,
  alt,
  className = 'w-full h-40'
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
    </div>
  );
}

export const LOCATION_ARTWORKS: Record<string, LocationArtwork> = {
  '01_nguyen_hue': {
    locationId: '01_nguyen_hue',
    name: 'Nguyễn Huệ',
    subtitle: 'Đại lộ danh giá & Tòa Đô Chánh Sài Gòn',
    region: 'south',
    regionLabel: '📍 Sài Gòn — Miền Nam',
    culturalSnippet: 'Đại lộ đi bộ sầm uất nhìn thẳng ra Tòa thị chính kiến trúc Pháp cổ kính xây dựng từ năm 1909.',
    accentColor: '#dc2626',
    imagePath: '/locations/01_nguyen_hue.webp',
    alt: 'Phố đi bộ Nguyễn Huệ và Tòa thị chính TP.HCM',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/01_nguyen_hue.webp" alt="Nguyễn Huệ" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/01_nguyen_hue.webp" alt="Nguyễn Huệ" className={className} />
    )
  },

  '03_le_loi': {
    locationId: '03_le_loi',
    name: 'Lê Lợi',
    subtitle: 'Chợ Bến Thành & Trục thương mại lịch sử',
    region: 'south',
    regionLabel: '📍 Sài Gòn — Miền Nam',
    culturalSnippet: 'Trục đại lộ kết nối Nhà hát Lớn và Chợ Bến Thành với tháp đồng hồ 3 mặt biểu tượng.',
    accentColor: '#dc2626',
    imagePath: '/locations/03_le_loi.webp',
    alt: 'Tháp đồng hồ Chợ Bến Thành đường Lê Lợi',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/03_le_loi.webp" alt="Lê Lợi" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/03_le_loi.webp" alt="Lê Lợi" className={className} />
    )
  },

  '05_ben_xe_can_giuoc': {
    locationId: '05_ben_xe_can_giuoc',
    name: 'Bến Xe Cần Giuộc',
    subtitle: 'Đầu mối giao thông sông nước Nam Bộ',
    region: 'south',
    regionLabel: '📍 Tây Nam Bộ — Miền Nam',
    culturalSnippet: 'Bến xe khách kết nối cửa ngõ Long An và vùng đồng bằng sông nước Cửu Long.',
    accentColor: '#0284c7',
    imagePath: '/locations/05_ben_xe_can_giuoc.webp',
    alt: 'Bến xe và sông nước miền Tây Cần Giuộc',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/05_ben_xe_can_giuoc.webp" alt="Bến Xe Cần Giuộc" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/05_ben_xe_can_giuoc.webp" alt="Bến Xe Cần Giuộc" className={className} />
    )
  },

  '06_luong_dinh_cua': {
    locationId: '06_luong_dinh_cua',
    name: 'Lương Định Của',
    subtitle: 'Bán đảo đô thị tài chính Thủ Thiêm',
    region: 'south',
    regionLabel: '📍 Thủ Thiêm — Miền Nam',
    culturalSnippet: 'Đại lộ huyết mạch xuyên tâm bán đảo Thủ Thiêm hướng về trung tâm tài chính tương lai.',
    accentColor: '#ec4899',
    imagePath: '/locations/06_luong_dinh_cua.webp',
    alt: 'Bán đảo Thủ Thiêm và cầu Thủ Thiêm',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/06_luong_dinh_cua.webp" alt="Lương Định Của" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/06_luong_dinh_cua.webp" alt="Lương Định Của" className={className} />
    )
  },

  '08_vo_thi_sau': {
    locationId: '08_vo_thi_sau',
    name: 'Võ Thị Sáu',
    subtitle: 'Biệt thự di sản & Công viên rợp bóng cây',
    region: 'south',
    regionLabel: '📍 Quận 3 — Miền Nam',
    culturalSnippet: 'Khu biệt thự cổ kính thời Pháp và công viên Lê Văn Tám rợp bóng me xanh mát.',
    accentColor: '#ec4899',
    imagePath: '/locations/08_vo_thi_sau.webp',
    alt: 'Biệt thự cổ kính và công viên đường Võ Thị Sáu',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/08_vo_thi_sau.webp" alt="Võ Thị Sáu" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/08_vo_thi_sau.webp" alt="Võ Thị Sáu" className={className} />
    )
  },

  '09_hai_ba_trung': {
    locationId: '09_hai_ba_trung',
    name: 'Hai Bà Trưng',
    subtitle: 'Nhà thờ Tân Định màu hồng độc đáo',
    region: 'south',
    regionLabel: '📍 Tân Định — Miền Nam',
    culturalSnippet: 'Công trình kiến trúc Gothic màu hồng tuyệt mỹ thu hút du khách khắp năm châu.',
    accentColor: '#ec4899',
    imagePath: '/locations/09_hai_ba_trung.webp',
    alt: 'Nhà thờ Tân Định màu hồng đường Hai Bà Trưng',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/09_hai_ba_trung.webp" alt="Hai Bà Trưng" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/09_hai_ba_trung.webp" alt="Hai Bà Trưng" className={className} />
    )
  },

  '11_nguyen_tat_thanh': {
    locationId: '11_nguyen_tat_thanh',
    name: 'Nguyễn Tất Thành',
    subtitle: 'Bến Cảng Nhà Rồng Lịch Sử 1911',
    region: 'south',
    regionLabel: '📍 Quận 4 — Miền Nam',
    culturalSnippet: 'Di tích lịch sử nơi người thanh niên yêu nước Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911.',
    accentColor: '#0d9488',
    imagePath: '/locations/11_nguyen_tat_thanh.webp',
    alt: 'Bến cảng Nhà Rồng trên sông Sài Gòn',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/11_nguyen_tat_thanh.webp" alt="Nguyễn Tất Thành" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/11_nguyen_tat_thanh.webp" alt="Nguyễn Tất Thành" className={className} />
    )
  },

  '13_nguyen_trai': {
    locationId: '13_nguyen_trai',
    name: 'Nguyễn Trãi',
    subtitle: 'Phố Thời Trang Chợ Lớn Cổ Kính',
    region: 'south',
    regionLabel: '📍 Quận 5 — Miền Nam',
    culturalSnippet: 'Khu phố thương mại cổ kính giao thoa văn hóa người Hoa với những dãy nhà phố lồng đèn đỏ.',
    accentColor: '#0d9488',
    imagePath: '/locations/13_nguyen_trai.webp',
    alt: 'Phố lồng đèn Chợ Lớn đường Nguyễn Trãi',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/13_nguyen_trai.webp" alt="Nguyễn Trãi" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/13_nguyen_trai.webp" alt="Nguyễn Trãi" className={className} />
    )
  },

  '14_an_duong_vuong': {
    locationId: '14_an_duong_vuong',
    name: 'An Dương Vương',
    subtitle: 'Thủ Phủ Phụ Tùng & Cơ Giới',
    region: 'south',
    regionLabel: '📍 Quận 5 — Miền Nam',
    culturalSnippet: 'Đại lộ sầm uất quy tụ các hãng phụ tùng ô tô và công nghiệp máy móc danh tiếng.',
    accentColor: '#0d9488',
    imagePath: '/locations/14_an_duong_vuong.webp',
    alt: 'Đại lộ công nghiệp An Dương Vương',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/14_an_duong_vuong.webp" alt="An Dương Vương" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/14_an_duong_vuong.webp" alt="An Dương Vương" className={className} />
    )
  },

  '15_ben_xe_mien_tay': {
    locationId: '15_ben_xe_mien_tay',
    name: 'Bến Xe Miền Tây',
    subtitle: 'Cửa ngõ 13 tỉnh Đồng Bằng Sông Cửu Long',
    region: 'south',
    regionLabel: '📍 Bình Tân — Miền Nam',
    culturalSnippet: 'Đầu mối giao thông liên tỉnh vận chuyển hàng triệu lượt khách mỗi năm về miền sông nước.',
    accentColor: '#0284c7',
    imagePath: '/locations/15_ben_xe_mien_tay.webp',
    alt: 'Đại bến xe khách Miền Tây An Lạc',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/15_ben_xe_mien_tay.webp" alt="Bến Xe Miền Tây" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/15_ben_xe_mien_tay.webp" alt="Bến Xe Miền Tây" className={className} />
    )
  },

  '16_hau_giang': {
    locationId: '16_hau_giang',
    name: 'Hậu Giang',
    subtitle: 'Chợ Cây Gõ & Phố Vải Truyền Thống',
    region: 'south',
    regionLabel: '📍 Quận 6 — Miền Nam',
    culturalSnippet: 'Trung tâm đầu mối cung cấp vải vóc và thời trang dệt may lớn bậc nhất cả nước.',
    accentColor: '#10b981',
    imagePath: '/locations/16_hau_giang.webp',
    alt: 'Chợ Cây Gõ đường Hậu Giang',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/16_hau_giang.webp" alt="Hậu Giang" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/16_hau_giang.webp" alt="Hậu Giang" className={className} />
    )
  },

  '18_hung_vuong': {
    locationId: '18_hung_vuong',
    name: 'Hùng Vương',
    subtitle: 'Quảng Trường & Viện Đại Học Y Dược',
    region: 'south',
    regionLabel: '📍 Quận 5 — Miền Nam',
    culturalSnippet: 'Đại lộ mang tên vị vua dựng nước, quy tụ những bệnh viện và viện nghiên cứu hàng đầu.',
    accentColor: '#10b981',
    imagePath: '/locations/18_hung_vuong.webp',
    alt: 'Khu viện trường y khoa Hùng Vương',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/18_hung_vuong.webp" alt="Hùng Vương" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/18_hung_vuong.webp" alt="Hùng Vương" className={className} />
    )
  },

  '19_huynh_tan_phat': {
    locationId: '19_huynh_tan_phat',
    name: 'Huỳnh Tấn Phát',
    subtitle: 'Cầu Phú Mỹ & Cảng Biển Nam Sài Gòn',
    region: 'south',
    regionLabel: '📍 Nhà Bè — Miền Nam',
    culturalSnippet: 'Cửa ngõ vươn ra biển Đông kết nối đại công trình cầu dây văng Phú Mỹ tráng lệ.',
    accentColor: '#10b981',
    imagePath: '/locations/19_huynh_tan_phat.webp',
    alt: 'Cầu dây văng Phú Mỹ nối cảng biển',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/19_huynh_tan_phat.webp" alt="Huỳnh Tấn Phát" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/19_huynh_tan_phat.webp" alt="Huỳnh Tấn Phát" className={className} />
    )
  },

  '21_pham_the_hien': {
    locationId: '21_pham_the_hien',
    name: 'Phạm Thế Hiển',
    subtitle: 'Xóm Đạo Bình An Rực Rỡ Ánh Đèn',
    region: 'south',
    regionLabel: '📍 Quận 8 — Miền Nam',
    culturalSnippet: 'Cung đường xóm đạo lung linh sắc màu với những hang đá kỳ công mỗi mùa Giáng Sinh.',
    accentColor: '#f59e0b',
    imagePath: '/locations/21_pham_the_hien.webp',
    alt: 'Xóm đạo rực rỡ Giáng Sinh Phạm Thế Hiển',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/21_pham_the_hien.webp" alt="Phạm Thế Hiển" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/21_pham_the_hien.webp" alt="Phạm Thế Hiển" className={className} />
    )
  },

  '23_kha_van_can': {
    locationId: '23_kha_van_can',
    name: 'Kha Vạn Cân',
    subtitle: 'Đại Lộ Đông Bắc & Cầu Bình Lợi',
    region: 'south',
    regionLabel: '📍 TP. Thủ Đức — Miền Nam',
    culturalSnippet: 'Tuyến đường huyết mạch nối liền cầu đường sắt Bình Lợi trăm năm tuổi và trung tâm Thủ Đức.',
    accentColor: '#f59e0b',
    imagePath: '/locations/23_kha_van_can.webp',
    alt: 'Cầu đường sắt Bình Lợi trăm tuổi',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/23_kha_van_can.webp" alt="Kha Vạn Cân" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/23_kha_van_can.webp" alt="Kha Vạn Cân" className={className} />
    )
  },

  '24_nguyen_tri_phuong': {
    locationId: '24_nguyen_tri_phuong',
    name: 'Nguyễn Tri Phương',
    subtitle: 'Thiên Đường Ẩm Thực Đêm Sài Gòn',
    region: 'south',
    regionLabel: '📍 Quận 10 — Miền Nam',
    culturalSnippet: 'Thánh địa ẩm thực đường phố nhộn nhịp thâu đêm với chè Thái, hủ tiếu và hải sản tươi ngon.',
    accentColor: '#f59e0b',
    imagePath: '/locations/24_nguyen_tri_phuong.webp',
    alt: 'Phố ẩm thực đêm Nguyễn Tri Phương',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/24_nguyen_tri_phuong.webp" alt="Nguyễn Tri Phương" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/24_nguyen_tri_phuong.webp" alt="Nguyễn Tri Phương" className={className} />
    )
  },

  '25_ben_xe_cho_lon': {
    locationId: '25_ben_xe_cho_lon',
    name: 'Bến Xe Chợ Lớn',
    subtitle: 'Trạm Trung Chuyển Xe Buýt Quận 5',
    region: 'south',
    regionLabel: '📍 Chợ Lớn — Miền Nam',
    culturalSnippet: 'Trạm xe buýt nội thành lâu đời nép mình bên những dãy nhà mái ngói cổ kính.',
    accentColor: '#0284c7',
    imagePath: '/locations/25_ben_xe_cho_lon.webp',
    alt: 'Bến xe buýt Chợ Lớn trung tâm Quận 5',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/25_ben_xe_cho_lon.webp" alt="Bến Xe Chợ Lớn" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/25_ben_xe_cho_lon.webp" alt="Bến Xe Chợ Lớn" className={className} />
    )
  },

  '26_le_dai_hanh': {
    locationId: '26_le_dai_hanh',
    name: 'Lê Đại Hành',
    subtitle: 'Trường Đua Ngựa Phú Thọ Lịch Sử',
    region: 'south',
    regionLabel: '📍 Quận 11 — Miền Nam',
    culturalSnippet: 'Địa danh trường đua ngựa đầu tiên của Việt Nam xây dựng từ năm 1932.',
    accentColor: '#eab308',
    imagePath: '/locations/26_le_dai_hanh.webp',
    alt: 'Trường đua ngựa Phú Thọ 1932',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/26_le_dai_hanh.webp" alt="Lê Đại Hành" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/26_le_dai_hanh.webp" alt="Lê Đại Hành" className={className} />
    )
  },

  '27_truong_chinh': {
    locationId: '27_truong_chinh',
    name: 'Trường Chinh',
    subtitle: 'Cửa Ngõ Tây Bắc & Ga Tuyến Tàu Điện',
    region: 'south',
    regionLabel: '📍 Tân Bình — Miền Nam',
    culturalSnippet: 'Đầu mối giao thông liên tỉnh hiện đại kết nối tuyến Metro số 2 tương lai.',
    accentColor: '#eab308',
    imagePath: '/locations/27_truong_chinh.webp',
    alt: 'Tuyến tàu điện Metro hiện đại Trường Chinh',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/27_truong_chinh.webp" alt="Trường Chinh" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/27_truong_chinh.webp" alt="Trường Chinh" className={className} />
    )
  },

  '29_hoang_van_thu': {
    locationId: '29_hoang_van_thu',
    name: 'Hoàng Văn Thụ',
    subtitle: 'Công Viên Lá Phổi Sân Bay Tân Sơn Nhất',
    region: 'south',
    regionLabel: '📍 Tân Bình — Miền Nam',
    culturalSnippet: 'Khu công viên xanh mát hình tam giác đón chào hành khách đến với cửa ngõ hàng không quốc tế.',
    accentColor: '#eab308',
    imagePath: '/locations/29_hoang_van_thu.webp',
    alt: 'Công viên cửa ngõ sân bay Tân Sơn Nhất',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/29_hoang_van_thu.webp" alt="Hoàng Văn Thụ" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/29_hoang_van_thu.webp" alt="Hoàng Văn Thụ" className={className} />
    )
  },

  '31_cong_hoa': {
    locationId: '31_cong_hoa',
    name: 'Cộng Hòa',
    subtitle: 'Đại Lộ Văn Phòng & Logistics Hàng Không',
    region: 'south',
    regionLabel: '📍 Tân Bình — Miền Nam',
    culturalSnippet: 'Đại lộ sầm uất với các tòa tháp cao ốc văn phòng và trung tâm logistics sôi động.',
    accentColor: '#0ea5e9',
    imagePath: '/locations/31_cong_hoa.webp',
    alt: 'Cao ốc văn phòng tài chính đường Cộng Hòa',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/31_cong_hoa.webp" alt="Cộng Hòa" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/31_cong_hoa.webp" alt="Cộng Hòa" className={className} />
    )
  },

  '32_nguyen_kiem': {
    locationId: '32_nguyen_kiem',
    name: 'Nguyễn Kiệm',
    subtitle: 'Công Viên Gia Định Rợp Bóng Mát',
    region: 'south',
    regionLabel: '📍 Gò Vấp — Miền Nam',
    culturalSnippet: 'Tuyến đường rợp bóng hàng cây cổ thụ dẫn lối vào công viên lớn nhất thành phố.',
    accentColor: '#0ea5e9',
    imagePath: '/locations/32_nguyen_kiem.webp',
    alt: 'Công viên Gia Định rợp bóng mát',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/32_nguyen_kiem.webp" alt="Nguyễn Kiệm" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/32_nguyen_kiem.webp" alt="Nguyễn Kiệm" className={className} />
    )
  },

  '34_quang_trung': {
    locationId: '34_quang_trung',
    name: 'Quang Trung',
    subtitle: 'Công Viên Phần Mềm & Thung Lũng Công Nghệ',
    region: 'south',
    regionLabel: '📍 Quận 12 — Miền Nam',
    culturalSnippet: 'Khu công nghệ cao tập trung hàng ngàn kỹ sư tài năng thúc đẩy đổi mới sáng tạo.',
    accentColor: '#0ea5e9',
    imagePath: '/locations/34_quang_trung.webp',
    alt: 'Công viên phần mềm Quang Trung QTSC',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/34_quang_trung.webp" alt="Quang Trung" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/34_quang_trung.webp" alt="Quang Trung" className={className} />
    )
  },

  '35_ben_xe_mien_dong': {
    locationId: '35_ben_xe_mien_dong',
    name: 'Bến Xe Miền Đông',
    subtitle: 'Bến Xe Khách Lớn Nhất Việt Nam',
    region: 'south',
    regionLabel: '📍 TP. Thủ Đức — Miền Nam',
    culturalSnippet: 'Đại công trình bến xe hiện đại chuẩn quốc tế kết nối các tỉnh miền Trung và miền Bắc.',
    accentColor: '#0284c7',
    imagePath: '/locations/35_ben_xe_mien_dong.webp',
    alt: 'Bến xe Miền Đông mới quy mô lớn',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/35_ben_xe_mien_dong.webp" alt="Bến Xe Miền Đông" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/35_ben_xe_mien_dong.webp" alt="Bến Xe Miền Đông" className={className} />
    )
  },

  '37_luy_ban_bich': {
    locationId: '37_luy_ban_bich',
    name: 'Lũy Bán Bích',
    subtitle: 'Chiến Lũy Phòng Thủ Cổ Xưa 1772',
    region: 'south',
    regionLabel: '📍 Tân Phú — Miền Nam',
    culturalSnippet: 'Công trình chiến lũy lịch sử được danh tướng Nguyễn Cửu Đàm đắp nên bảo vệ Gia Định xưa.',
    accentColor: '#1e40af',
    imagePath: '/locations/37_luy_ban_bich.webp',
    alt: 'Di tích Lũy Bán Bích và chùa cổ Giác Lâm',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/37_luy_ban_bich.webp" alt="Lũy Bán Bích" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/37_luy_ban_bich.webp" alt="Lũy Bán Bích" className={className} />
    )
  },

  '39_tan_ky_tan_quy': {
    locationId: '39_tan_ky_tan_quy',
    name: 'Tân Kỳ Tân Quý',
    subtitle: 'Đại Trung Tâm Bất Động Sản Hoàng Gia',
    region: 'south',
    regionLabel: '📍 Tân Phú — Miền Nam',
    culturalSnippet: 'Vương quốc bất động sản hoàng kim đắt giá bậc nhất — Nơi hội tụ các nhà đầu tư tỷ phú.',
    accentColor: '#1e40af',
    imagePath: '/locations/39_tan_ky_tan_quy.webp',
    alt: 'Đại trung tâm bất động sản thịnh vượng',
    renderThumbnail: (className = 'w-full h-5 md:h-6') => (
      <LocationPhotoThumbnail src="/locations/39_tan_ky_tan_quy.webp" alt="Tân Kỳ Tân Quý" className={className} />
    ),
    renderHero: (className = 'w-full h-40') => (
      <LocationPhotoHero src="/locations/39_tan_ky_tan_quy.webp" alt="Tân Kỳ Tân Quý" className={className} />
    )
  }
};

export function getLocationArtwork(spaceId: string): LocationArtwork | null {
  return LOCATION_ARTWORKS[spaceId] || null;
}

export function validateLocationArtworkRegistry(spaces: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    const propertyAndTransportSpaces = spaces.filter(s => s.type === 'property' || s.type === 'transport');
    let validCount = 0;
    let missingCount = 0;

    propertyAndTransportSpaces.forEach(s => {
      if (LOCATION_ARTWORKS[s.id]) {
        validCount++;
      } else {
        missingCount++;
        console.warn(`[LocationArtwork] ⚠ Missing artwork for space: "${s.name}" (ID: "${s.id}")`);
      }
    });

    console.log(`[LocationArtwork Validation] ✓ ${validCount} location images valid, ${missingCount} missing.`);
  }
}

