import {
  ArrowRight,
  Check,
  Clock3,
  FileText,
  Grid3X3,
  Hash,
  MapPin,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Star,
  Sunrise,
  Video,
} from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const services = [
  {
    icon: Sparkles,
    title: "Tarot",
    text: "Giúp bạn nhìn rõ vấn đề, khai mở những khía cạnh tiềm ẩn và tìm ra hướng đi phù hợp.",
    tags: ["Tình cảm", "Công việc", "Quyết định"],
    className: "service-tarot",
  },
  {
    icon: MoonStar,
    title: "Chiêm tinh học",
    text: "Phân tích bản đồ sao cá nhân, khám phá tính cách, tiềm năng và những chu kỳ quan trọng trong cuộc sống.",
    tags: ["Bản đồ sao", "Tình cảm", "Sự nghiệp"],
    className: "service-astrology",
  },
  {
    icon: Hash,
    title: "Thần số học",
    text: "Giải mã những con số trong ngày sinh, hiểu rõ điểm mạnh, điểm cần phát triển và định hướng tương lai.",
    tags: ["Số chủ đạo", "Năm cá nhân", "Định hướng"],
    className: "service-numerology",
  },
  {
    icon: Grid3X3,
    title: "Matrix Destiny Chart",
    text: "Khám phá ma trận vận mệnh từ ngày sinh, nhận diện năng lượng cốt lõi, bài học và những khuynh hướng cần cân bằng.",
    tags: ["Ma trận vận mệnh", "Bài học", "Tiềm năng"],
    className: "service-matrix",
  },
  {
    icon: Sunrise,
    title: "Solar Return Chart",
    text: "Đọc bản đồ sao Mặt Trời quay về để nhận diện chủ đề, cơ hội và điểm cần lưu tâm trong năm tuổi mới của bạn.",
    tags: ["Chủ đề năm", "Cơ hội", "Chu kỳ mới"],
    className: "service-solar",
  },
];

const formats = [
  { icon: Video, label: "Tư vấn online", title: "Kết nối từ nơi bạn thấy thoải mái", text: "Linh hoạt thời gian, kết nối dễ dàng qua Google Meet / Zalo / Zoom." },
  { icon: MapPin, label: "Tư vấn offline", title: "Một không gian riêng tư và ấm cúng", text: "Gặp trực tiếp tại TP. Hồ Chí Minh. Địa điểm được xác nhận khi chốt lịch." },
  { icon: FileText, label: "Nhận kết quả PDF", title: "Giữ lại những điều quan trọng", text: "Tổng hợp nội dung buổi tư vấn, giúp bạn xem lại chậm rãi sau buổi gặp." },
];

const packages = [
  { slug: "tarot-one-question", name: "Tarot 1 vấn đề", duration: "Thời lượng linh hoạt", price: "Liên hệ", items: ["Tư vấn trực tiếp", "Tập trung 1 vấn đề", "Online / Offline"], featured: false },
  { slug: "tarot-deep", name: "Tarot chuyên sâu", duration: "Theo nhu cầu", price: "Liên hệ", items: ["Tư vấn trực tiếp", "Phân tích chuyên sâu", "Nhận PDF tóm tắt", "Online / Offline"], featured: true },
  { slug: "astrology", name: "Bản đồ sao cá nhân", duration: "Theo lá số", price: "Liên hệ", items: ["Phân tích bản đồ sao chi tiết", "Tính cách, tình cảm, sự nghiệp", "Nhận PDF đầy đủ", "Hỗ trợ Online"], featured: false },
  { slug: "numerology", name: "Thần số học", duration: "Theo nhu cầu", price: "Liên hệ", items: ["Giải mã ngày sinh", "Điểm mạnh & thách thức", "Định hướng phát triển", "Nhận PDF", "Online / Offline"], featured: false },
  { slug: "matrix-destiny", name: "Matrix Destiny Chart", duration: "Theo ma trận", price: "Liên hệ", items: ["Lập ma trận từ ngày sinh", "Năng lượng cốt lõi & bài học", "Định hướng cân bằng", "Nhận PDF"], featured: false },
  { slug: "solar-return", name: "Solar Return Chart", duration: "Theo năm tuổi mới", price: "Liên hệ", items: ["Lập Solar Return Chart", "Chủ đề & cơ hội trong năm", "Các giai đoạn đáng lưu ý", "Nhận PDF"], featured: false },
  { slug: "personal-combo", name: "Combo cá nhân", duration: "Thiết kế riêng", price: "Liên hệ", items: ["Kết hợp 2 phương pháp", "Phân tích theo nhu cầu", "Nhận PDF tổng hợp", "Online / Offline"], featured: false },
];

const steps = [
  ["01", "Chọn dịch vụ", "Chọn gói tư vấn phù hợp với nhu cầu của bạn."],
  ["02", "Chọn ngày giờ", "Đặt lịch online hoặc offline theo thời gian phù hợp."],
  ["03", "Xác nhận & thanh toán", "Hoàn tất thông tin và thanh toán / cọc."],
  ["04", "Tư vấn & nhận PDF", "Tham gia buổi tư vấn và nhận PDF qua Zalo hoặc email."],
];


const faqs = [
  ["Tarot có dự đoán chính xác tương lai không?", "Không. Tarot là công cụ soi chiếu và gợi mở góc nhìn, không phải lời khẳng định chắc chắn về tương lai. Quyết định cuối cùng luôn thuộc về bạn."],
  ["Tôi không biết giờ sinh thì có xem chiêm tinh được không?", "Vẫn có thể đọc một số vị trí chính dựa trên ngày và nơi sinh. Tuy nhiên, thiếu giờ sinh sẽ giới hạn việc phân tích cung Mọc, các nhà và một số yếu tố quan trọng."],
  ["Buổi online diễn ra qua đâu?", "Bạn có thể chọn Google Meet, Zalo hoặc Zoom. Kênh kết nối được thống nhất khi xác nhận lịch."],
  ["Tôi nhận PDF sau bao lâu?", "Thời gian gửi phụ thuộc vào gói dịch vụ và được xác nhận trước buổi tư vấn. Bản PDF được gửi qua Zalo hoặc email bạn cung cấp."],
  ["Có bảo mật thông tin cá nhân không?", "Có. Thông tin đặt lịch và nội dung chia sẻ chỉ được dùng để chuẩn bị, thực hiện buổi tư vấn và gửi kết quả."],
  ["Tôi có thể đổi lịch không?", "Có. Hãy thông báo sớm qua kênh đã xác nhận lịch để được hỗ trợ sắp xếp thời gian khác."],
  ["Offline ở đâu?", "Các buổi offline diễn ra tại TP. Hồ Chí Minh. Địa chỉ cụ thể được gửi sau khi lịch hẹn được xác nhận."],
];

function BookingLink({ service, className = "button button-gold", children = "Đặt lịch ngay" }: { service?: string; className?: string; children?: React.ReactNode }) {
  const href = service ? `/booking?service=${service}` : "/booking";
  return <Link className={className} href={href}>{children}<ArrowRight size={17} /></Link>;
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="trang-chu">
        <SiteHeader />
        <div className="hero-stars" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-gold">Tarot · Chiêm tinh · Thần số · Matrix Destiny · Solar Return</p>
            <h1>Hiểu mình sâu hơn.<br /><em>Nhìn rõ điều đang chờ phía trước.</em></h1>
            <p className="hero-description">Những buổi tư vấn 1:1 giúp bạn thấu hiểu bản thân, giải đáp những băn khoăn trong tình cảm, công việc và cuộc sống.</p>
            <p className="hero-note">Không phải để đoán trước tương lai, mà để bạn đưa ra lựa chọn tốt hơn cho chính mình.</p>
            <div className="hero-actions">
              <BookingLink />
              <a className="button button-ghost-light" href="#goi-dich-vu">Xem các gói dịch vụ</a>
            </div>
            <ul className="trust-points">
              <li><span>◉</span>Tư vấn 1:1 cá nhân hóa</li>
              <li><span>◉</span>Online hoặc Offline</li>
              <li><span>◉</span>Nhận PDF sau buổi tư vấn</li>
            </ul>
          </div>

          <div className="hero-still-life" aria-label="Minh họa Tarot, trăng sao, pha lê, nến và sách chiêm tinh">
            <div className="silk-fold silk-one" /><div className="silk-fold silk-two" />
            <div className="zodiac-chart"><span className="zodiac-center">☾</span>{["♈","♉","♊","♋","♌","♍","♎","♏"].map((symbol, index) => <i key={symbol} style={{ "--i": index } as React.CSSProperties}>{symbol}</i>)}</div>
            <div className="book"><span>CELESTIAL</span><strong>ATLAS</strong><small>Stars · Cycles · Self</small></div>
            <div className="crystal crystal-one" /><div className="crystal crystal-two" />
            <div className="candle"><span className="flame" /><span className="wick" /></div>
            <div className="tarot tarot-back"><span>✦</span></div>
            <div className="tarot tarot-moon"><small>XVIII</small><div className="moon-art">☾</div><strong>THE MOON</strong></div>
            <div className="tarot tarot-star"><small>XVII</small><div className="star-art">✦</div><strong>THE STAR</strong></div>
            <div className="gold-star gs-one">✦</div><div className="gold-star gs-two">·</div><div className="gold-star gs-three">✧</div>
          </div>
        </div>
        <a className="scroll-cue" href="#dich-vu"><span>Khám phá</span><i /></a>
      </section>

      <section className="section services" id="dich-vu">
        <div className="container">
          <header className="section-header centered">
            <p className="eyebrow">Dịch vụ của mình</p>
            <h2>Năm phương pháp để hiểu mình sâu hơn</h2>
            <p>Năm công cụ — Một hành trình thấu hiểu. Mỗi phương pháp mang đến một góc nhìn khác nhau, giúp bạn hiểu rõ bản thân và tìm ra hướng đi phù hợp.</p>
          </header>
          <div className="services-grid">
            {services.map(({ icon: Icon, ...service }, index) => (
              <article className={`service-card ${service.className}`} key={service.title}>
                <span className="card-index">0{index + 1}</span>
                <span className="service-icon"><Icon strokeWidth={1.35} /></span>
                <h3>{service.title}</h3><p>{service.text}</p>
                <div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <a href="#goi-dich-vu" aria-label={`Xem gói ${service.title}`}>Khám phá <ArrowRight size={16} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="formats">
        <div className="container formats-grid">
          {formats.map(({ icon: Icon, ...format }) => (
            <article className="format-card" key={format.label}>
              <span className="format-icon"><Icon strokeWidth={1.4} /></span>
              <div><p className="eyebrow">{format.label}</p><h3>{format.title}</h3><p>{format.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="game-banner" id="tro-choi">
        <div className="final-stars" aria-hidden="true" />
        <div className="container gb-inner">
          <div>
            <p className="eyebrow eyebrow-gold">Mở cửa miễn phí</p>
            <h3>Sân chơi Tarot &amp; Chiêm tinh đêm khuya</h3>
            <p>Trước khi đặt lịch tư vấn, bạn có thể thử tự mình kéo vài lá: rút bài tarot 78 lá, hỏi Có/Không, xem tử vi, thần số, ma trận định mệnh — vui mà vẫn chiêm nghiệm.</p>
            <div className="gb-mini">
              <a href="/games/tarot.html">Tarot cốt truyện</a>
              <a href="/games/chiem-tinh.html">Bản đồ sao</a>
              <a href="/games/than-so.html">Thần số học</a>
              <a href="/games/ma-tran.html">Ma trận</a>
              <a href="/games/solar-return.html">Solar Return</a>
            </div>
          </div>
          <a className="button button-gold" href="/game.html">Vào chơi ngay <ArrowRight size={17} /></a>
        </div>
      </section>

      <section className="section pricing" id="goi-dich-vu">
        <div className="container">
          <header className="section-header pricing-header">
            <div><p className="eyebrow">Các gói dịch vụ</p><h2>Chọn gói phù hợp với nhu cầu của bạn</h2></div>
            <Link href="/booking">Liên hệ để được tư vấn gói phù hợp <ArrowRight size={17} /></Link>
          </header>
          <p className="placeholder-notice">Mình đang trong giai đoạn xây dựng dịch vụ nên chi phí được trao đổi trực tiếp theo nhu cầu và độ sâu của từng buổi tư vấn.</p>
          <div className="pricing-grid">
            {packages.map((item) => (
              <article className={`price-card ${item.featured ? "featured" : ""}`} key={item.slug}>
                {item.featured && <span className="popular-label">Gợi ý bắt đầu</span>}
                <p className="duration"><Clock3 size={15} /> {item.duration}</p>
                <h3>{item.name}</h3>
                <ul>{item.items.map((entry) => <li key={entry}><Check size={15} />{entry}</li>)}</ul>
                <div className="price"><strong>{item.price}</strong><span>để được tư vấn</span></div>
                <BookingLink service={item.slug} className={item.featured ? "button button-gold" : "button button-outline-dark"} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process" id="quy-trinh">
        <div className="container">
          <header className="section-header centered compact"><p className="eyebrow">Quy trình đặt lịch</p><h2>Chỉ 4 bước đơn giản</h2></header>
          <ol className="process-grid">
            {steps.map(([number, title, text], index) => <li key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div>{index < steps.length - 1 && <ArrowRight className="step-arrow" />}</li>)}
          </ol>
        </div>
      </section>

      <section className="section testimonials" id="cam-nhan">
        <div className="container">
          <div className="testimonial-empty">
            <span className="testimonial-symbol">✦</span>
            <div><p className="eyebrow eyebrow-gold">Cảm nhận khách hàng</p><h2>Những chia sẻ thật sẽ được lưu lại ở đây.</h2></div>
            <div><p>Lumiere đang ở những bước đầu tiên. Mình không sử dụng lời chứng thực giả — mỗi chia sẻ sau này chỉ được đăng khi khách hàng đồng ý.</p><BookingLink>Trở thành một trong những vị khách đầu tiên</BookingLink></div>
          </div>
        </div>
      </section>

      <section className="section about" id="ve-minh">
        <div className="container about-grid">
          <div className="reader-portrait" aria-label="Vị trí dành cho ảnh chân dung reader">
            <div className="portrait-frame"><span className="portrait-moon">☾</span><div className="portrait-silhouette"><i className="head" /><i className="body" /></div><small>Ảnh chân dung reader</small></div>
            <div className="portrait-card"><Star size={17} fill="currentColor" /><span>Một không gian riêng<br />cho câu chuyện của bạn</span></div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">Về mình</p>
            <h2>Đồng hành cùng bạn<br />trên hành trình thấu hiểu</h2>
            <p>Mình tin rằng mỗi người đều có câu chuyện riêng, và luôn có những câu trả lời bên trong chính mình.</p>
            <p>Tarot, Chiêm tinh và Thần số học là những công cụ giúp mình — và giờ là giúp bạn — nhìn rõ hơn những lựa chọn, tiềm năng và hướng đi trong cuộc sống.</p>
            <blockquote>“Không phải để dự đoán tương lai, mà để bạn sống chủ động và ý nghĩa hơn ngay từ hôm nay.”</blockquote>
            <Link className="text-link" href="/booking">Tìm hiểu thêm về mình <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="container faq-grid">
          <header className="faq-heading"><p className="eyebrow">Câu hỏi thường gặp</p><h2>Bạn có<br />thắc mắc?</h2><p>Nếu chưa tìm thấy câu trả lời, bạn có thể để lại lời nhắn trong bước đặt lịch.</p><span className="faq-orbit"><MoonStar /></span></header>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><span className="faq-plus">+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-stars" aria-hidden="true" />
        <span className="cta-moon" aria-hidden="true">☾</span>
        <div className="container final-content"><p className="eyebrow eyebrow-gold">Lumiere · Tựa sáng điều bên trong</p><h2>Bạn đã sẵn sàng<br />lắng nghe chính mình?</h2><p>Đặt lịch tư vấn ngay hôm nay để bắt đầu hành trình thay đổi.</p><BookingLink /></div>
        <div className="landscape" aria-hidden="true" />
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand"><div className="brand"><span className="brand-symbol"><Sparkles size={18} /></span><span className="brand-copy"><strong>Lumiere</strong><small>Tựa sáng điều bên trong</small></span></div><p>Tarot · Chiêm tinh · Thần số · Matrix Destiny · Solar Return</p></div>
          <nav><strong>Khám phá</strong><a href="#trang-chu">Trang chủ</a><a href="#dich-vu">Dịch vụ</a><a href="#ve-minh">Về mình</a><a href="#cam-nhan">Cảm nhận khách hàng</a><a href="#faq">FAQ</a><a href="/game.html">Trò chơi miễn phí ✦</a></nav>
          <nav><strong>Kết nối</strong><a href="https://zalo.me/0328052889" target="_blank" rel="noreferrer">Zalo · 0328 052 889</a><a href="https://www.facebook.com/misocduabeonhuheo" target="_blank" rel="noreferrer">Facebook</a><a href="tel:0328052889">Gọi điện</a></nav>
          <div className="footer-note"><ShieldCheck /><p>Nội dung mang tính tham khảo, chiêm nghiệm; không thay thế tư vấn y tế, pháp lý hoặc tài chính.</p></div>
          <div className="footer-bottom"><span>© 2026 Lumiere. All rights reserved.</span><span>Online · Offline · PDF</span></div>
        </div>
      </footer>

      <Link className="mobile-sticky-cta" href="/booking">Đặt lịch ngay <ArrowRight size={17} /></Link>
    </main>
  );
}
