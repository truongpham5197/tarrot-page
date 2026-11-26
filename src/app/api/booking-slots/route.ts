import { getAvailableSlots } from "@/lib/appointments/service";
import { api, json } from "@/lib/appointments/http";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  return api(request, async () =>
    json({
      slots: await getAvailableSlots(),
      timezone: "Asia/Ho_Chi_Minh",
      durationMinutes: 60,
    }),
  );
}
