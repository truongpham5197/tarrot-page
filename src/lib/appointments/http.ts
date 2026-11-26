import "server-only";
import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";
import { sessionAdmin, consumeLimit } from "./auth";
import { AppointmentError } from "./types";

export const SESSION_COOKIE = "sarah_admin_session";
export const privateHeaders = {
  "Cache-Control": "no-store, private, max-age=0",
  "X-Robots-Tag": "noindex, nofollow",
};
export async function currentAdmin() {
  return sessionAdmin((await cookies()).get(SESSION_COOKIE)?.value);
}
export function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: privateHeaders });
}
export async function body(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new AppointmentError("Yêu cầu cần dùng định dạng JSON.", 415);
  if (Number(request.headers.get("content-length") || 0) > 16000)
    throw new AppointmentError("Nội dung quá dài.", 413);
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 16000)
    throw new AppointmentError("Nội dung quá dài.", 413);
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error();
    return parsed;
  } catch {
    throw new AppointmentError("Nội dung yêu cầu không hợp lệ.");
  }
}
export async function api(
  request: Request,
  task: () => Promise<Response>,
  options: { admin?: boolean; mutation?: boolean } = {},
) {
  try {
    if (
      options.mutation &&
      (request.headers.get("origin") !== externalOrigin(request) ||
        request.headers.get("sec-fetch-site") === "cross-site")
    )
      throw new AppointmentError("Yêu cầu từ nguồn không được phép.", 403);
    if (options.admin && !(await currentAdmin()))
      throw new AppointmentError("Vui lòng đăng nhập quản trị.", 401);
    return await task();
  } catch (error) {
    if (error instanceof AppointmentError)
      return json({ error: error.message }, error.status);
    console.error(
      "[appointments] Request failed:",
      error instanceof Error ? error.name : "UnknownError",
    );
    return json(
      {
        error:
          "Hệ thống đặt hẹn đang tạm gián đoạn. Vui lòng thử lại sau hoặc nhắn Sarah qua Zalo.",
      },
      503,
    );
  }
}
export function externalOrigin(request: Request) {
  const url = new URL(request.url);
  const host = request.headers.get("host") || url.host;
  const forwardedProtocol = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    .trim();
  const protocol =
    forwardedProtocol === "https" || forwardedProtocol === "http"
      ? forwardedProtocol
      : url.protocol.slice(0, -1);
  return `${protocol}://${host}`;
}
export async function throttle(
  request: Request,
  kind: "booking" | "login" | "setup",
) {
  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const hash = createHash("sha256").update(address).digest("hex");
  await consumeLimit(
    `${kind}:${hash}`,
    kind === "booking" ? 15 : kind === "setup" ? 5 : 10,
    15 * 60000,
  );
}
export function setupAllowed() {
  return (process.env.ADMIN_SETUP_TOKEN?.trim().length ?? 0) >= 32;
}
export function verifySetup(token: unknown) {
  if (!setupAllowed())
    throw new AppointmentError(
      "Thiết lập quản trị chưa được bật trên máy chủ.",
      403,
    );
  const expected = process.env.ADMIN_SETUP_TOKEN!;
  const actual = typeof token === "string" ? token : "";
  const left = createHash("sha256").update(actual).digest(),
    right = createHash("sha256").update(expected).digest();
  if (!timingSafeEqual(left, right))
    throw new AppointmentError("Mã thiết lập chưa đúng.", 403);
}
