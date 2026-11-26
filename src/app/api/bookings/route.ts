import { createBooking } from "@/lib/appointments/service";
import { api, body, json, throttle } from "@/lib/appointments/http";
import { AppointmentError } from "@/lib/appointments/types";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return api(
    request,
    async () => {
      await throttle(request, "booking");
      const input = await body(request);
      if (input.website) throw new AppointmentError("Yêu cầu không hợp lệ.");
      return json({ booking: await createBooking(input) }, 201);
    },
    { mutation: true },
  );
}
