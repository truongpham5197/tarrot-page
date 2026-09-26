import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "./globals.css";

const siteUrl = "https://lumiere-tarot-chiem-tinh.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lumiere Tarot & Chiêm Tinh | Tư vấn 1:1",
    template: "%s | Lumiere Tarot & Chiêm Tinh",
  },
  description:
    "Đặt lịch xem Tarot, Chiêm tinh, Thần số học, Matrix Destiny và Solar Return online hoặc tại TP.HCM. Tư vấn 1:1, nhận kết quả PDF.",
  keywords: [
    "xem Tarot",
    "Tarot online",
    "xem Tarot TP.HCM",
    "chiêm tinh học",
    "bản đồ sao cá nhân",
    "thần số học",
    "Matrix Destiny Chart",
    "Solar Return Chart",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "Lumiere Tarot & Chiêm Tinh",
    title: "Lumiere Tarot & Chiêm Tinh | Tư vấn 1:1",
    description: "Tarot, Chiêm tinh, Thần số học, Matrix Destiny và Solar Return — tư vấn online hoặc tại TP.HCM, có kết quả PDF.",
  },
  twitter: {
    card: "summary",
    title: "Lumiere Tarot & Chiêm Tinh",
    description: "Tư vấn Tarot và các phương pháp khám phá bản thân theo hình thức online hoặc offline.",
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Lumiere Tarot & Chiêm Tinh",
  url: siteUrl,
  description: "Dịch vụ tư vấn Tarot, Chiêm tinh, Thần số học, Matrix Destiny và Solar Return theo hình thức online hoặc offline.",
  areaServed: ["Việt Nam", "Thành phố Hồ Chí Minh"],
  priceRange: "Liên hệ",
  serviceType: ["Tarot", "Chiêm tinh học", "Thần số học", "Matrix Destiny Chart", "Solar Return Chart"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
