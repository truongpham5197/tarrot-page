import { cookies } from "next/headers";
import { hasAdmin, loginAdmin, revokeSession } from "@/lib/appointments/auth";
import {
  api,
  body,
  currentAdmin,
  json,
  SESSION_COOKIE,
  setupAllowed,
  throttle,
  externalOrigin,
} from "@/lib/appointments/http";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  return api(request, async () => {
    const admin = await currentAdmin();
    const setupRequired = !(await hasAdmin());
    return json({
      authenticated: Boolean(admin),
      email: admin?.email,
      setupRequired,
      setupAllowed: setupRequired && setupAllowed(),
      tokenRequired: true,
    });
  });
}
export async function POST(request: Request) {
  return api(
    request,
    async () => {
      await throttle(request, "login");
      const input = await body(request);
      const token = await loginAdmin(input.email, input.password);
      (await cookies()).set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: externalOrigin(request).startsWith("https://"),
        sameSite: "strict",
        path: "/",
        maxAge: 12 * 3600,
      });
      return json({ success: true });
    },
    { mutation: true },
  );
}
export async function DELETE(request: Request) {
  return api(
    request,
    async () => {
      const store = await cookies();
      await revokeSession(store.get(SESSION_COOKIE)?.value);
      store.delete(SESSION_COOKIE);
      return json({ success: true });
    },
    { admin: true, mutation: true },
  );
}
