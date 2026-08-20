# Hướng Dẫn Triển Khai Production (Deployment Guide)
# Dành cho dự án Cờ Tỷ Phú Việt Nam

Dự án này sử dụng kiến trúc **Vercel** (cho Frontend Next.js) và **PartyKit / Cloudflare** (cho Backend Realtime).

---

## 1. Cấu Trúc Hệ Thống (Deployment Architecture)
- **Frontend**: Next.js 16 (App Router, Turbopack) triển khai trên Vercel.
- **Backend / Realtime Server**: PartyKit Edge server triển khai trên mạng lưới Cloudflare Workers.
- **Database**: Trạng thái game được lưu trữ tự động trong `party.storage` của PartyKit (Cloudflare Durable Objects). 

> **Lưu ý quan trọng**: Dự án này **không** sử dụng Supabase hay PostgreSQL theo như mặc định của một số template. Hệ thống Backend đã được tối ưu hóa đặc biệt trên PartyKit để xử lý Realtime tốc độ cao.

---

## 2. Các Biến Môi Trường (Environment Variables)
Xem file `.env.example` để biết cấu trúc.

### Vercel (Frontend)
Yêu cầu duy nhất 1 biến môi trường:
- `NEXT_PUBLIC_PARTYKIT_HOST`: Domain Production của PartyKit sau khi bạn deploy Backend. (Ví dụ: `co-ty-phu.your-username.partykit.dev`)

### PartyKit (Backend)
Không yêu cầu biến môi trường bí mật nào để chạy logic game cơ bản.

---

## 3. Các Bước Triển Khai (Deployment Steps)

### Bước 1: Triển Khai Backend (PartyKit)
Backend phải được deploy trước để có URL cung cấp cho Frontend.

1. Đăng nhập vào PartyKit:
   ```bash
   npx partykit login
   ```
2. Triển khai server:
   ```bash
   npx partykit deploy
   ```
3. Chú ý dòng output trong terminal. PartyKit sẽ cung cấp cho bạn một URL, ví dụ:
   `https://co-ty-phu-vn.<username>.partykit.dev`
4. Lấy phần Host (bỏ `https://`): `co-ty-phu-vn.<username>.partykit.dev`. Đây chính là `NEXT_PUBLIC_PARTYKIT_HOST`.

### Bước 2: Triển Khai Frontend (Vercel)
1. Đẩy code lên GitHub.
2. Đăng nhập Vercel, chọn **Add New Project**, chọn Repository của bạn.
3. Trong phần **Environment Variables**, thêm biến:
   - Name: `NEXT_PUBLIC_PARTYKIT_HOST`
   - Value: `<URL Host PartyKit ở Bước 1>`
4. Nhấn **Deploy**.

---

## 4. Quá Trình Kiểm Định Bảo Mật (Security Audit)
Backend `party/gameLogic.ts` đã được audit nghiêm ngặt:
- **Server Authoritative**: Toàn bộ xúc xắc (dice roll), di chuyển, tính toán tiền bạc đều thực hiện hoàn toàn trên server.
- **Client Validation**: Client chỉ có thể gửi tín hiệu Hành động (ví dụ: `ROLL_DICE`, `BUY_PROPERTY`), KHÔNG thể tự ý thay đổi dữ liệu (ví dụ: không thể gửi tọa độ đích đến, số tiền tùy ý).
- **Phòng chống giả mạo**: Mỗi lượt chơi đều được kiểm tra tính hợp lệ của `playerId` và `turnState`.

---

## 5. Xử Lý Sự Cố Thường Gặp (Troubleshooting)

**Lỗi: Khách (Client) không thể kết nối tới phòng chơi.**
- *Nguyên nhân*: Thiếu biến `NEXT_PUBLIC_PARTYKIT_HOST` trên Vercel.
- *Khắc phục*: Thêm biến này trong cài đặt Vercel, sau đó thực hiện redeploy frontend.

**Lỗi: Mất kết nối liên tục.**
- *Khắc phục*: Hệ thống đã được lập trình để tự động reconnect (`partysocket` có cơ chế auto-reconnect) và tự động đồng bộ lại trạng thái từ server. Không làm mới (F5) trang khi đang reconnect.

## 6. Quy Trình Rollback (Rollback Procedure)
- **Frontend**: Trong Vercel dashboard, chọn mục Deployments, chọn bản build cũ đang hoạt động tốt, nhấn ba chấm `...` và chọn **Promote to Production**.
- **Backend**: Có thể dùng `npx partykit deploy --name <tên-cũ>` hoặc revert commit trên GitHub và deploy lại.
