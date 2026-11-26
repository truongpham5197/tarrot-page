import { updateBooking } from "@/lib/appointments/service";
import { api, body, json } from "@/lib/appointments/http";
export const runtime = "nodejs";
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return api(
    request,
    async () => {
      const { id } = await params;
      return json({ booking: await updateBooking(id, await body(request)) });
    },
    { admin: true, mutation: true },
  );
}
