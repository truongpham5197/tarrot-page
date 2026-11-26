import { createSlots, closeSlot } from "@/lib/appointments/service";
import { api, body, json } from "@/lib/appointments/http";
import { AppointmentError } from "@/lib/appointments/types";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return api(
    request,
    async () => {
      const input = await body(request);
      await createSlots(input.date, input.times);
      return json({ success: true }, 201);
    },
    { admin: true, mutation: true },
  );
}
export async function DELETE(request: Request) {
  return api(
    request,
    async () => {
      const input = await body(request);
      if (typeof input.id !== "string" || input.id.length > 80)
        throw new AppointmentError("Khung giờ không hợp lệ.");
      await closeSlot(input.id);
      return json({ success: true });
    },
    { admin: true, mutation: true },
  );
}
