import { listBookings, getAdminSlots } from "@/lib/appointments/service";
import { api, json } from "@/lib/appointments/http";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  return api(
    request,
    async () => {
      const [bookings, slots] = await Promise.all([
        listBookings(),
        getAdminSlots(),
      ]);
      return json({ bookings, slots });
    },
    { admin: true },
  );
}
