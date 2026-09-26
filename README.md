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

---

# 🔮 Tiệm Tarot Đêm Khuya (static game site)

Trang web giải trí bói bài & chiêm tinh vui vẻ bằng HTML/CSS/JS thuần — mở là chơi, không cần build. Nằm ở root repo (độc lập với app Next.js).

## Chạy

```bash
python -m http.server 8321
# mở http://localhost:8321
```

Hoặc mở trực tiếp `index.html` bằng trình duyệt.

## Sân chơi vũ trụ

| Trang | Nội dung |
|---|---|
| `index.html` | Landing **Lumiere** bản static (mirror của app Next.js) + mục Trò chơi miễn phí |
| `game.html` | Sân chơi chính: lá của ngày + pha trăng, rút bài 1/3/5 lá, hỏi Có/Không, tử vi 12 cung + đo độ hợp, sổ tay bói |
| `games/tarot.html` | Tarot cốt truyện — "Hành trình của Kẻ Ngố", 5 lá = 5 chương truyện, có hướng dẫn từng bước |
| `games/chiem-tinh.html` | Chiêm tinh: bản đồ sao mini (Mặt trời · Mặt trăng · Cung mọc + nguyên tố trội) |
| `games/than-so.html` | Thần số học Pythagoras: Đường đời, Linh hồn, Biểu đạt, Ngày sinh, Năm cá nhân |
| `games/ma-tran.html` | Matrix Destiny: 9 điểm năng lượng 1-22 trên bát quái, click từng điểm xem nghĩa |
| `games/solar-return.html` | Solar Return: năm cá nhân, lá chủ đề năm, đếm ngược sinh nhật |

## Cấu trúc

- `js/shared.js` — helpers chung (RNG seeded, âm thanh WebAudio, sparkle, pha trăng, hồ sơ)
- `js/data.js` — 78 lá Tarot (22 Major viết tay + 56 Minor sinh tự động) + 12 cung + pool tử vi
- `js/esoteric.js` — dữ liệu thần số, destiny 22, solar year, độ hợp cung
- `js/app.js` — logic trang chủ; mỗi game có file `.js` riêng
- `img/cards/` — 78 ảnh Rider-Waite-Smith (public domain, Wikimedia Commons)
- `manifest.webmanifest` + `sw.js` — PWA offline

*Kết quả mang tính giải trí — vũ trụ không chịu trách nhiệm về quyết định của bạn.*
