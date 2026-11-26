import "../shared-styles";
import "./admin.css";
import "./schedule.css";

export const metadata = {
  title: "Quản trị lịch hẹn",
  robots: { index: false, follow: false },
};

// Admin is its own root layout (the public site's root layout lives in app/[lang]).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
