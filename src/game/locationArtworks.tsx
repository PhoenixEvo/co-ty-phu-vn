'use client';

import React from 'react';

export interface LocationArtwork {
  locationId: string;
  name: string;
  subtitle: string;
  region: 'north' | 'central' | 'south';
  regionLabel: string;
  culturalSnippet: string;
  accentColor: string;
  renderThumbnail: (className?: string) => React.ReactNode;
  renderHero: (className?: string) => React.ReactNode;
}

export const LOCATION_ARTWORKS: Record<string, LocationArtwork> = {
  '01_nguyen_hue': {
    locationId: '01_nguyen_hue',
    name: 'Nguyễn Huệ',
    subtitle: 'Đại lộ danh giá trung tâm Sài Gòn',
    region: 'south',
    regionLabel: '📍 Sài Gòn — Miền Nam',
    culturalSnippet: 'Đại lộ đi bộ sầm uất nhìn thẳng ra Tòa thị chính kiến trúc Pháp cổ kính xây dựng từ năm 1909.',
    accentColor: '#dc2626',
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="16" width="28" height="18" rx="1" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" />
        <path d="M 14 16 L 14 8 L 26 8 L 26 16 Z" fill="#f87171" stroke="#dc2626" strokeWidth="1.5" />
        <circle cx="20" cy="12" r="2.5" fill="#ffffff" stroke="#dc2626" strokeWidth="1" />
        <rect x="9" y="22" width="4" height="6" rx="1" fill="#dc2626" />
        <rect x="18" y="22" width="4" height="12" rx="1" fill="#991b1b" />
        <rect x="27" y="22" width="4" height="6" rx="1" fill="#dc2626" />
        <line x1="2" y1="34" x2="38" y2="34" stroke="#dc2626" strokeWidth="2" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-rose-100 via-amber-50 to-orange-100 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="340" cy="60" r="35" fill="#fecaca" opacity="0.6" />
          <path d="M 0 160 L 400 160 L 400 200 L 0 200 Z" fill="#e2e8f0" />
          <path d="M 80 160 L 320 160 L 300 80 L 100 80 Z" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
          <rect x="160" y="40" width="80" height="40" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
          <polygon points="200,10 170,40 230,40" fill="#dc2626" />
          <circle cx="200" cy="60" r="10" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />
          <line x1="200" y1="53" x2="200" y2="60" stroke="#dc2626" strokeWidth="2" />
          <line x1="200" y1="60" x2="205" y2="60" stroke="#dc2626" strokeWidth="2" />
          <rect x="185" y="110" width="30" height="50" rx="15" fill="#991b1b" />
          <line x1="0" y1="175" x2="400" y2="175" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="12 8" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,4 10,14 30,14" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
        <rect x="12" y="14" width="16" height="12" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
        <circle cx="20" cy="20" r="3.5" fill="#ffffff" stroke="#c2410c" strokeWidth="1" />
        <rect x="6" y="26" width="28" height="10" fill="#ffedd5" stroke="#ea580c" strokeWidth="1" />
        <path d="M 17 36 A 3 3 0 0 1 23 36 Z" fill="#9a3412" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-amber-100 via-orange-50 to-amber-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="200,20 140,70 260,70" fill="#dc2626" />
          <rect x="150" y="70" width="100" height="60" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
          <circle cx="200" cy="100" r="16" fill="#ffffff" stroke="#9a3412" strokeWidth="2.5" />
          <rect x="80" y="130" width="240" height="40" fill="#ffedd5" stroke="#c2410c" strokeWidth="2" />
          <path d="M 180 170 C 180 150, 220 150, 220 170 Z" fill="#9a3412" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="28" height="18" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
        <rect x="10" y="14" width="8" height="6" rx="1" fill="#e0f2fe" />
        <rect x="22" y="14" width="8" height="6" rx="1" fill="#e0f2fe" />
        <circle cx="12" cy="28" r="3" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
        <circle cx="28" cy="28" r="3" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-sky-100 to-blue-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 160 Q 100 140 200 160 T 400 150 L 400 200 L 0 200 Z" fill="#0284c7" />
          <rect x="120" y="70" width="160" height="90" rx="16" fill="#38bdf8" stroke="#0369a1" strokeWidth="3" />
          <rect x="140" y="85" width="50" height="35" rx="4" fill="#ffffff" />
          <rect x="210" y="85" width="50" height="35" rx="4" fill="#ffffff" />
          <circle cx="160" cy="160" r="14" fill="#0f172a" />
          <circle cx="240" cy="160" r="14" fill="#0f172a" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="8" height="18" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
        <rect x="18" y="8" width="10" height="26" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
        <rect x="30" y="18" width="6" height="16" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
        <line x1="4" y1="34" x2="38" y2="34" stroke="#db2777" strokeWidth="1.5" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-pink-100 to-rose-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="100" y="60" width="50" height="110" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
          <rect x="170" y="30" width="70" height="140" fill="#f472b6" stroke="#be185d" strokeWidth="2.5" />
          <polygon points="205,5 180,30 230,30" fill="#db2777" />
          <rect x="260" y="70" width="50" height="100" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
          <line x1="0" y1="170" x2="400" y2="170" stroke="#9d174d" strokeWidth="3" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="14" r="8" fill="#86efac" stroke="#16a34a" strokeWidth="1" />
        <rect x="6" y="16" width="18" height="16" fill="#fdf2f8" stroke="#db2777" strokeWidth="1" />
        <polygon points="15,8 4,16 26,16" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
        <line x1="28" y1="22" x2="28" y2="34" stroke="#15803d" strokeWidth="2" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-emerald-50 via-pink-50 to-rose-100 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="310" cy="90" r="50" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
          <rect x="295" y="140" width="30" height="40" fill="#15803d" />
          <rect x="80" y="80" width="160" height="90" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
          <polygon points="160,30 60,80 260,80" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="16" width="16" height="18" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
        <polygon points="20,4 14,16 26,16" fill="#f472b6" stroke="#be185d" strokeWidth="1" />
        <line x1="20" y1="1" x2="20" y2="6" stroke="#be185d" strokeWidth="1.5" />
        <line x1="18" y1="3" x2="22" y2="3" stroke="#be185d" strokeWidth="1.5" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="200,10 160,70 240,70" fill="#f472b6" stroke="#be185d" strokeWidth="2" />
          <rect x="160" y="70" width="80" height="100" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
          <path d="M 185 170 C 185 140, 215 140, 215 170 Z" fill="#9d174d" />
        </svg>
      </div>
    )
  },

  '11_nguyen_tat_thanh': {
    locationId: '11_nguyen_tat_thanh',
    name: 'Nguyễn Tất Thành',
    subtitle: 'Bến Cảng Nhà Rồng Lịch Sử',
    region: 'south',
    regionLabel: '📍 Quận 4 — Miền Nam',
    culturalSnippet: 'Di tích lịch sử nơi người thanh niên yêu nước Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911.',
    accentColor: '#0d9488',
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="24" height="16" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1.5" />
        <polygon points="20,8 6,16 34,16" fill="#14b8a6" stroke="#0f766e" strokeWidth="1" />
        <path d="M 10 9 Q 14 5 18 8" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
        <path d="M 30 9 Q 26 5 22 8" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-teal-100 to-emerald-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 165 Q 100 155 200 165 T 400 160 L 400 200 L 0 200 Z" fill="#0f766e" />
          <rect x="100" y="80" width="200" height="85" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2.5" />
          <polygon points="200,40 80,80 320,80" fill="#14b8a6" stroke="#0f766e" strokeWidth="2" />
          <path d="M 120 40 Q 160 20 190 38" stroke="#f59e0b" strokeWidth="3" fill="none" />
          <path d="M 280 40 Q 240 20 210 38" stroke="#f59e0b" strokeWidth="3" fill="none" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="24" height="20" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1.5" />
        <polygon points="20,6 6,14 34,14" fill="#0d9488" />
        <circle cx="14" cy="18" r="2" fill="#ef4444" />
        <circle cx="26" cy="18" r="2" fill="#ef4444" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-teal-50 to-amber-100 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="90" y="70" width="220" height="100" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
          <polygon points="200,30 70,70 330,70" fill="#0d9488" stroke="#115e59" strokeWidth="2" />
          <circle cx="130" cy="85" r="10" fill="#ef4444" />
          <circle cx="270" cy="85" r="10" fill="#ef4444" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="12" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
        <circle cx="20" cy="20" r="4" fill="#0f766e" />
        <path d="M 20 8 L 20 12 M 20 28 L 20 32 M 8 20 L 12 20 M 28 20 L 32 20" stroke="#0f766e" strokeWidth="2" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-teal-100 to-slate-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="100" r="60" fill="#ccfbf1" stroke="#0f766e" strokeWidth="6" />
          <circle cx="200" cy="100" r="20" fill="#0f766e" />
          <line x1="200" y1="20" x2="200" y2="60" stroke="#0f766e" strokeWidth="6" />
          <line x1="200" y1="140" x2="200" y2="180" stroke="#0f766e" strokeWidth="6" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="28" height="20" rx="3" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <line x1="6" y1="20" x2="34" y2="20" stroke="#0284c7" strokeWidth="1" />
        <circle cx="12" cy="30" r="3" fill="#0f172a" />
        <circle cx="28" cy="30" r="3" fill="#0f172a" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-sky-100 to-cyan-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="80" y="60" width="240" height="100" rx="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
          <line x1="80" y1="110" x2="320" y2="110" stroke="#0284c7" strokeWidth="2" />
          <circle cx="140" cy="160" r="16" fill="#0f172a" />
          <circle cx="260" cy="160" r="16" fill="#0f172a" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8 28 C 12 12, 28 12, 32 28 Z" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
        <path d="M 14 28 C 16 16, 24 16, 26 28" stroke="#059669" strokeWidth="1" fill="none" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-emerald-100 to-teal-100 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 80 160 C 120 60, 280 60, 320 160 Z" fill="#d1fae5" stroke="#059669" strokeWidth="4" />
          <path d="M 140 160 C 160 90, 240 90, 260 160" stroke="#059669" strokeWidth="3" fill="none" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="24" height="20" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
        <rect x="18" y="18" width="4" height="12" fill="#ef4444" />
        <rect x="14" y="22" width="12" height="4" fill="#ef4444" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-emerald-100 to-green-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="100" y="60" width="200" height="110" fill="#d1fae5" stroke="#059669" strokeWidth="3" />
          <rect x="185" y="85" width="30" height="60" fill="#ef4444" />
          <rect x="170" y="100" width="60" height="30" fill="#ef4444" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,34 14,8 16,8 18,34" fill="#047857" />
        <polygon points="22,34 24,8 26,8 28,34" fill="#047857" />
        <line x1="2" y1="24" x2="38" y2="24" stroke="#059669" strokeWidth="1.5" />
        <line x1="15" y1="12" x2="4" y2="24" stroke="#6ee7b7" />
        <line x1="25" y1="12" x2="36" y2="24" stroke="#6ee7b7" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-teal-100 via-emerald-100 to-sky-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="130,170 145,20 155,20 170,170" fill="#047857" />
          <polygon points="230,170 245,20 255,20 270,170" fill="#047857" />
          <line x1="0" y1="120" x2="400" y2="120" stroke="#059669" strokeWidth="4" />
          <line x1="150" y1="40" x2="40" y2="120" stroke="#10b981" strokeWidth="2" />
          <line x1="250" y1="40" x2="360" y2="120" stroke="#10b981" strokeWidth="2" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,4 23,14 34,14 25,20 28,30 20,24 12,30 15,20 6,14 17,14" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-indigo-950 via-slate-900 to-amber-950 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="200,20 215,65 265,65 225,95 240,140 200,110 160,140 175,95 135,65 185,65" fill="#fde047" />
          <circle cx="80" cy="50" r="4" fill="#ffffff" />
          <circle cx="320" cy="70" r="5" fill="#ffffff" />
          <circle cx="120" cy="140" r="3" fill="#f59e0b" />
          <circle cx="280" cy="130" r="4" fill="#f59e0b" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 6 26 A 14 14 0 0 1 34 26" stroke="#d97706" strokeWidth="2.5" fill="none" />
        <line x1="4" y1="26" x2="36" y2="26" stroke="#b45309" strokeWidth="2" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-amber-100 to-orange-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 60 140 A 140 140 0 0 1 340 140" stroke="#d97706" strokeWidth="6" fill="none" />
          <line x1="40" y1="140" x2="360" y2="140" stroke="#b45309" strokeWidth="5" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8 20 Q 20 34 32 20 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <path d="M 14 16 Q 16 10 18 16" stroke="#d97706" strokeWidth="1.5" fill="none" />
        <path d="M 22 16 Q 24 10 26 16" stroke="#d97706" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-amber-100 via-orange-100 to-yellow-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100 110 Q 200 190 300 110 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />
          <path d="M 160 90 Q 180 50 190 90" stroke="#d97706" strokeWidth="3" fill="none" />
          <path d="M 210 90 Q 230 50 240 90" stroke="#d97706" strokeWidth="3" fill="none" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,8 8,16 32,16" fill="#0284c7" />
        <rect x="10" y="16" width="20" height="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-blue-100 to-indigo-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="200,40 100,90 300,90" fill="#0284c7" stroke="#0369a1" strokeWidth="3" />
          <rect x="120" y="90" width="160" height="80" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 28 Q 20 8 30 28" stroke="#ca8a04" strokeWidth="2" fill="none" />
        <circle cx="20" cy="16" r="4" fill="#eab308" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-yellow-100 to-amber-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 80 150 Q 200 40 320 150" stroke="#ca8a04" strokeWidth="5" fill="none" />
          <circle cx="200" cy="80" r="20" fill="#eab308" stroke="#a16207" strokeWidth="3" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="20" height="22" rx="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
        <rect x="14" y="14" width="12" height="8" rx="1" fill="#ffffff" />
        <circle cx="14" cy="27" r="1.5" fill="#ca8a04" />
        <circle cx="26" cy="27" r="1.5" fill="#ca8a04" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-yellow-100 via-amber-50 to-orange-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="130" y="50" width="140" height="110" rx="16" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
          <rect x="155" y="70" width="90" height="45" rx="6" fill="#ffffff" stroke="#ca8a04" strokeWidth="2" />
          <circle cx="160" cy="135" r="8" fill="#ca8a04" />
          <circle cx="240" cy="135" r="8" fill="#ca8a04" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8 26 Q 20 8 32 26 Z" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
        <path d="M 20 6 L 24 16 L 34 18 L 26 24 L 20 6" fill="#0284c7" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-sky-100 via-emerald-50 to-yellow-100 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100 150 Q 200 60 300 150 Z" fill="#86efac" stroke="#16a34a" strokeWidth="3" />
          <polygon points="200,20 220,60 270,70 230,90 200,20" fill="#0284c7" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="10" height="24" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
        <rect x="22" y="16" width="10" height="18" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-sky-100 to-blue-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="110" y="40" width="70" height="130" fill="#bae6fd" stroke="#0284c7" strokeWidth="3" />
          <rect x="210" y="70" width="80" height="100" fill="#7dd3fc" stroke="#0284c7" strokeWidth="3" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="16" r="10" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
        <rect x="18" y="24" width="4" height="10" fill="#15803d" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-sky-50 via-emerald-50 to-green-100 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="90" r="55" fill="#bbf7d0" stroke="#16a34a" strokeWidth="4" />
          <rect x="190" y="140" width="20" height="35" fill="#15803d" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="24" height="16" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <polygon points="16,30 24,30 22,26 18,26" fill="#0284c7" />
        <circle cx="20" cy="18" r="3" fill="#38bdf8" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-slate-900 to-indigo-950 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="120" y="50" width="160" height="100" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
          <polygon points="170,165 230,165 215,150 185,150" fill="#38bdf8" />
          <circle cx="200" cy="100" r="20" fill="#0284c7" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 6 12 Q 20 4 34 12 L 34 28 L 6 28 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-sky-100 to-blue-200 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 60 70 Q 200 20 340 70 L 340 160 L 60 160 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="24" height="18" fill="#dbeafe" stroke="#1e40af" strokeWidth="1.5" />
        <polygon points="20,6 6,16 34,16" fill="#1e40af" />
        <circle cx="20" cy="24" r="3" fill="#f59e0b" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-blue-100 via-indigo-50 to-amber-100 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="100" y="80" width="200" height="90" fill="#dbeafe" stroke="#1e40af" strokeWidth="3" />
          <polygon points="200,30 80,80 320,80" fill="#1e40af" stroke="#172554" strokeWidth="3" />
          <circle cx="200" cy="120" r="16" fill="#f59e0b" />
        </svg>
      </div>
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
    renderThumbnail: (className = 'w-5 h-5') => (
      <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,4 28,14 24,28 16,28 12,14" fill="#fde047" stroke="#1e40af" strokeWidth="1.5" />
        <circle cx="20" cy="16" r="3" fill="#1e40af" />
      </svg>
    ),
    renderHero: (className = 'w-full h-40') => (
      <div className={`relative overflow-hidden bg-linear-to-b from-amber-200 via-yellow-100 to-indigo-900 flex items-center justify-center ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="200,20 270,70 240,150 160,150 130,70" fill="#fde047" stroke="#b45309" strokeWidth="4" />
          <circle cx="200" cy="85" r="18" fill="#1e40af" />
        </svg>
      </div>
    )
  }
};

export function getLocationArtwork(spaceId: string): LocationArtwork | null {
  return LOCATION_ARTWORKS[spaceId] || null;
}
