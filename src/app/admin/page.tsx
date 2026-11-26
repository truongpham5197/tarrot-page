import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/appointments/http";
import { AdminDashboard } from "@/components/admin/dashboard";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminDashboard email={admin.email} />;
}
