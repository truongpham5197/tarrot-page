# Lumiere Tarot & Chiêm Tinh

Landing page Next.js theo UI specification Lumiere cho dịch vụ Tarot, chiêm tinh học và thần số học.

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Production: [https://lumiere-tarot-chiem-tinh.vercel.app](https://lumiere-tarot-chiem-tinh.vercel.app)

## Cấu hình email đặt lịch (tùy chọn)

Tạo `.env.local`:

```env
NEXT_PUBLIC_BOOKING_EMAIL=hello@example.com
```

Khi biến này được thiết lập, màn hình xác nhận sẽ có nút mở email với nội dung đặt lịch được điền sẵn. Nếu chưa cấu hình, khách vẫn có thể sao chép nội dung để gửi qua Zalo/Instagram.
