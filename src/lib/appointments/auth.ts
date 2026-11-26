import "server-only";
import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { database } from "./db";
import { AppointmentError } from "./types";

const derive = promisify(scrypt);
const digest = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export async function hasAdmin() {
  return Boolean(
    (
      await (
        await database()
      ).execute("SELECT id FROM appointment_admin LIMIT 1")
    ).rows[0],
  );
}
export async function createAdmin(email: unknown, password: unknown) {
  if (
    typeof email !== "string" ||
    email.length > 200 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof password !== "string" ||
    password.length < 12 ||
    password.length > 256
  )
    throw new AppointmentError(
      "Nhập email hợp lệ và mật khẩu từ 12 đến 256 ký tự.",
    );
  const salt = randomBytes(16).toString("hex");
  const derived = (await derive(password, salt, 64)) as Buffer;
  const db = await database();
  const result = await db.execute({
    sql: "INSERT INTO appointment_admin(id,email,password_hash) VALUES(1,?,?) ON CONFLICT(id) DO NOTHING",
    args: [email.trim().toLowerCase(), `${salt}:${derived.toString("hex")}`],
  });
  if (!result.rowsAffected)
    throw new AppointmentError("Tài khoản quản trị đã được thiết lập.", 409);
}
export async function loginAdmin(email: unknown, password: unknown) {
  if (
    typeof email !== "string" ||
    email.length > 200 ||
    typeof password !== "string" ||
    password.length > 256
  )
    throw new AppointmentError("Email hoặc mật khẩu chưa đúng.", 401);
  const db = await database();
  const rows = await db.execute({
    sql: "SELECT id, password_hash FROM appointment_admin WHERE email=?",
    args: [email.trim().toLowerCase()],
  });
  const account = rows.rows[0];
  const stored = account?.password_hash
    ? String(account.password_hash)
    : `${"0".repeat(32)}:${"0".repeat(128)}`;
  const [salt, hash] = stored.split(":");
  const derived = (await derive(password, salt, 64)) as Buffer;
  if (!timingSafeEqual(Buffer.from(hash, "hex"), derived) || !account)
    throw new AppointmentError("Email hoặc mật khẩu chưa đúng.", 401);
  const token = randomBytes(32).toString("hex");
  await db.batch(
    [
      {
        sql: "DELETE FROM admin_sessions WHERE expires_at<?",
        args: [Date.now()],
      },
      {
        sql: "INSERT INTO admin_sessions(token_hash,expires_at,admin_id) VALUES(?,?,?)",
        args: [digest(token), Date.now() + 12 * 3600000, Number(account.id)],
      },
    ],
    "write",
  );
  return token;
}
export async function sessionAdmin(token: string | undefined) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const db = await database();
  const result = await db.execute({
    sql: "SELECT a.email FROM admin_sessions s JOIN appointment_admin a ON a.id=s.admin_id WHERE token_hash=? AND expires_at>?",
    args: [digest(token), Date.now()],
  });
  return result.rows[0] ? { email: String(result.rows[0].email) } : null;
}
export async function revokeSession(token: string | undefined) {
  if (token)
    await (
      await database()
    ).execute({
      sql: "DELETE FROM admin_sessions WHERE token_hash=?",
      args: [digest(token)],
    });
}
export async function consumeLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const result = await (
    await database()
  ).execute({
    sql: `INSERT INTO request_limits(key,count,resets_at) VALUES(?,1,?)
      ON CONFLICT(key) DO UPDATE SET
        count=CASE WHEN request_limits.resets_at<=? THEN 1 ELSE request_limits.count+1 END,
        resets_at=CASE WHEN request_limits.resets_at<=? THEN excluded.resets_at ELSE request_limits.resets_at END
      RETURNING count`,
    args: [key, now + windowMs, now, now],
  });
  if (Number(result.rows[0].count) > max)
    throw new AppointmentError(
      "Bạn đã thử nhiều lần. Vui lòng đợi vài phút rồi thử lại.",
      429,
    );
}
