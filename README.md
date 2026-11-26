# Reader Sarah — sarahreader.com

Website tư vấn online Tarot, Lenormand, Chiêm tinh học, Matrix Destiny và Solar Return Chart. Giao diện theo ảnh tham chiếu: xanh pastel–trắng, hoa bên biển, chữ Cormorant Garamond và chữ viết tay Allura, hỗ trợ tiếng Việt. App chính dùng Next.js 16.3.5 / React 19.3; các công cụ khám phá giữ nguyên trong `public/`.

## Chạy dự án

```sh
npm install
npm run dev
```

Mở http://localhost:3000. Production: `npm run build` rồi `npm start`. Tham khảo tài liệu Next.js đi kèm trong `node_modules/next/dist/docs/` trước khi thay đổi API.

## Spec Kit

Đã khởi tạo bằng Specify CLI với integration Codex và script PowerShell. Nguyên tắc tại `.specify/memory/constitution.md`, tính năng hiện tại được trỏ bằng `.specify/feature.json`.

- [Đặc tả lịch trình theo ngày](specs/003-admin-daily-schedule/spec.md)
- [Kế hoạch](specs/003-admin-daily-schedule/plan.md)
- [Công việc](specs/003-admin-daily-schedule/tasks.md)
- [Kiểm chứng](specs/003-admin-daily-schedule/validation.md)
- [Nguồn ảnh và prompt](specs/001-sarah-reader/assets.md)

Các lệnh Spec Kit được cài tại `.agents/skills/speckit-*`.

## Luồng đặt lịch

Mỗi dịch vụ dẫn tới `/booking?service=...` và chọn đúng dịch vụ. Khách có hai cách: chọn ngày và giờ trống Sarah đã mở trên lịch tháng, hoặc đề xuất một thời gian khác. Sau khi điền thông tin và đồng ý, yêu cầu được lưu vào cơ sở dữ liệu; khách nhận mã `SR-...`. Yêu cầu chọn giờ trống giữ chỗ ngay để tránh trùng; đề xuất chưa giữ chỗ. Sarah xác nhận trong admin rồi liên hệ khách qua thông tin đã cung cấp. Không có email/SMS tự động.

Liên hệ dùng cấu hình chung trong `src/lib/site.ts`, lấy đúng từ bản `index.html` cũ: điện thoại/Zalo **0328 052 889**, Zalo `https://zalo.me/0328052889`, Facebook `https://www.facebook.com/misocduabeonhuheo`. Footer và phần hỗ trợ đặt hẹn dùng các thông tin này, có liên kết gọi điện. Mỗi buổi mặc định 60 phút, từ 08:00–21:00 theo giờ Việt Nam, đặt trong 90 ngày tới. Không tạo giờ trống giả; admin phải chủ động mở lịch.

## Quản trị và lưu dữ liệu

1. Không có đăng ký admin công khai hay ngoại lệ localhost. Chủ website cấu hình `ADMIN_SETUP_TOKEN` bí mật, ngẫu nhiên, tối thiểu 32 ký tự trong môi trường server rồi khởi động lại. Khi chưa có mã hoặc mã quá ngắn, cả giao diện và API tạo admin đều bị khóa. Chỉ sau đó chủ website mới mở `/admin/setup`, nhập đúng mã riêng để cấp tài khoản đầu tiên với mật khẩu tối thiểu 12 ký tự. Không có tài khoản/mật khẩu mặc định; không có nút đăng ký trên trang đăng nhập. Sau khi có tài khoản, thiết lập đóng và cần bỏ mã khỏi môi trường server.
2. Đăng nhập tại `/admin/login`; `/admin` mở mặc định ở **Lịch trình** theo ngày. Chọn ngày, chuyển trước/sau, bấm **Hôm nay** hoặc chọn trong dải tuần để xem các cuộc hẹn theo giờ. Đề xuất của khách nằm riêng và không chiếm giờ; lịch đã hủy nằm trong mục lịch sử. Bấm cuộc hẹn/đề xuất để mở chi tiết; **Mở giờ cho ngày này** chuyển sang phần mở lịch đúng ngày đang xem. Tab **Lịch hẹn** giữ danh sách, tìm kiếm, lọc trạng thái, ghi chú, xác nhận, đổi giờ, hoàn tất và hủy. Tab **Giờ trống** cho phép mở nhiều giờ theo ngày hoặc đóng giờ chưa có khách.
3. Admin nhận thông báo yêu cầu/đề xuất mới trong giao diện; dữ liệu làm mới mỗi 30 giây khi trang đang hiển thị. Hủy/đổi lịch giải phóng giờ cũ. Kiểm tra phiên bản ngăn ghi đè các cập nhật đồng thời.

Local dùng SQLite tại `.data/sarah.db`, được bỏ qua bởi git. Sao lưu file này nếu cần giữ dữ liệu. Mật khẩu được băm scrypt, phiên đăng nhập lưu dạng băm trong SQL và cookie HttpOnly/SameSite=Strict; đăng xuất thu hồi phiên.

Trên **VPS production**, `BOOKING_DATABASE_URL` trỏ tới PostgreSQL qua mạng Docker nội bộ. Trên **Vercel/serverless**, ứng dụng cần cơ sở dữ liệu từ xa như libSQL/Turso với `BOOKING_DATABASE_AUTH_TOKEN`. Xem `.env.example` để biết các biến môi trường. Để thiết lập tài khoản đầu tiên cho một bản cài đặt mới, cấu hình `ADMIN_SETUP_TOKEN` ngẫu nhiên, nhập mã tại `/admin/setup`, rồi bỏ biến đó sau khi thiết lập.

Service worker bỏ qua toàn bộ `/api`, `/admin`, `/booking` và không cache phản hồi `no-store`, giữ thông tin đặt hẹn ngoài bộ nhớ offline.

## Kiểm tra

```sh
npm run lint
npx tsc --noEmit
npm run build
```

Khi server đang chạy:

```sh
npm run test:sarah
npm run test:consent
npm run test:appointments
npm run test:daily-schedule
```

Browser tests dùng `puppeteer-core` và Chrome tại đường dẫn Windows trong script. `TARGET_URL` có thể trỏ tới server kiểm thử khác; `test:sarah` nhận URL gốc, `test:consent` nhận URL trang `/booking`.

`test:appointments` tự tạo SQLite riêng trong `.test-data/`, kiểm tra cạnh tranh giữ chỗ, đề xuất, đổi/hủy, xác thực và khả năng đọc lại dữ liệu từ process mới. `test:booking-browser` chạy cả luồng khách và admin, cần `ALLOW_APPOINTMENT_TESTS=1`, `TARGET_URL` và server dùng **database test riêng**; có thể truyền `E2E_SETUP_TOKEN` cho bước thiết lập. Script tạo dữ liệu thử và không được chạy trên database thật.

Đặt `TEST_POSTGRES_URL` trỏ tới một PostgreSQL test để chạy bộ kiểm thử đặt lịch trên PostgreSQL. Script tạo và xóa một schema riêng cho mỗi lần chạy.

## Các tuyến chính

- `/`: trang giới thiệu Sarah và 5 dịch vụ.
- `/booking`: lịch tháng, giờ trống và đề xuất thời gian; gửi yêu cầu thật.
- `/admin`, `/admin/login`, `/admin/setup`: quản trị riêng và thiết lập tài khoản.
- `/game.html`: góc khám phá chung.
- `/games/tarot.html`, `/games/chiem-tinh.html`, `/games/than-so.html`, `/games/ma-tran.html`, `/games/solar-return.html`: công cụ hiện có, dùng lớp giao diện `public/css/sarah-theme.css`.
- `/api/tarot-reading`: API luận giải hiện có; giữ nguyên hành vi và cấu hình.

Website chạy trên VPS tại **https://sarahreader.com** và trang quản trị tại **https://sarahreader.com/admin**. DNS được quản lý trên Cloudflare và `www` chuyển về tên miền chính. Dữ liệu production nằm trong PostgreSQL và được sao lưu hằng ngày. Xem [cấu hình VPS, cập nhật và sao lưu](deploy/vps/README.md). Các tệp `index.html`, `css/` và `img/` ở root thuộc bản static cũ.
