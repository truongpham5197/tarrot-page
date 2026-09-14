import { ArrowLeft, FileText, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Đặt lịch tư vấn",
  description: "Đặt lịch tư vấn Tarot, Chiêm tinh, Thần số học, Matrix Destiny hoặc Solar Return với Lumiere.",
  alternates: { canonical: "/booking" },
};

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;

  return (
    <main className="booking-page">
      <section className="booking-hero">
        <SiteHeader />
        <div className="booking-stars" />
        <div className="container booking-hero-inner">
          <Link className="back-link" href="/"><ArrowLeft size={17} /> Quay lại trang chủ</Link>
          <p className="eyebrow eyebrow-gold">Lumiere · Đặt lịch 1:1</p>
          <h1>Một cuộc hẹn<br /><em>dành riêng cho bạn.</em></h1>
          <p>Chọn dịch vụ và để lại thông tin. Yêu cầu được chuyển tới Zalo 0328 052 889 để thống nhất thời gian và hình thức phù hợp.</p>
          <div className="booking-highlights"><span><ShieldCheck /> Thông tin riêng tư</span><span><FileText /> Có kết quả PDF</span><span><Sparkles /> Tư vấn cá nhân hóa</span></div>
        </div>
      </section>

      <section className="booking-main">
        <div className="container booking-layout">
          <aside>
            <p className="eyebrow">Trước khi bắt đầu</p>
            <h2>Bạn chưa cần biết chính xác mình nên chọn gói nào.</h2>
            <p>Chọn “Chưa chắc — cần tư vấn” nếu bạn muốn được gợi ý. Sau khi hoàn tất, trang sẽ mở Zalo và sao chép sẵn nội dung để bạn gửi. Lịch hẹn chỉ được ghi nhận sau khi hai bên xác nhận.</p>
            <ol><li><span>01</span>Điền thông tin cơ bản</li><li><span>02</span>Lumiere liên hệ xác nhận</li><li><span>03</span>Thống nhất lịch và thanh toán / cọc</li></ol>
          </aside>
          <div className="booking-form-card"><BookingForm initialService={service} /></div>
        </div>
      </section>

      <footer className="booking-footer"><div className="container"><span>© 2026 Lumiere</span><span>Tarot · Chiêm tinh · Thần số học</span></div></footer>
    </main>
  );
}
