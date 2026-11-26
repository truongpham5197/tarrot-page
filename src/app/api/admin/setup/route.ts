import { createAdmin } from "@/lib/appointments/auth";
import { AppointmentError } from "@/lib/appointments/types";
import {
  api,
  body,
  json,
  throttle,
  verifySetup,
  setupAllowed,
} from "@/lib/appointments/http";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return api(
    request,
    async () => {
      if (!setupAllowed())
        throw new AppointmentError(
          "Thiết lập tài khoản quản trị đang bị khóa.",
          403,
        );
      await throttle(request, "setup");
      const input = await body(request);
      verifySetup(input.setupToken);
      await createAdmin(input.email, input.password);
      return json({ success: true }, 201);
    },
    { mutation: true },
  );
}
