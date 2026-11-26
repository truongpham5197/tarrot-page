"use client";

import { ArrowLeft, LoaderCircle, LockKeyhole, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { adminRequest } from "./client";

type AccessState = {
  authenticated: boolean;
  setupRequired: boolean;
  setupAllowed: boolean;
  tokenRequired: boolean;
};
export function AdminAccess({ setup = false }: { setup?: boolean }) {
  const router = useRouter();
  const [state, setState] = useState<AccessState | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    let active = true;
    adminRequest<AccessState>("/api/admin/auth")
      .then((data) => {
        if (!active) return;
        setState(data);
        if (data.authenticated) router.replace("/admin");
        else if (setup && !data.setupRequired) router.replace("/admin/login");
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [router, setup]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    if (setup && data.get("password") !== data.get("confirmPassword")) {
      setError("Hai mật khẩu chưa trùng nhau.");
      return;
    }
    setBusy(true);
    setError("");
    const credentials = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      if (setup)
        await adminRequest("/api/admin/setup", "POST", {
          ...credentials,
          setupToken: data.get("setupToken"),
        });
      await adminRequest("/api/admin/auth", "POST", credentials);
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa đăng nhập được.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="admin-access">
      <div className="admin-access-card">
        <Link href="/" className="admin-access-brand">
          <Sparkles strokeWidth={1} />
          <span className="script">Reader Sarah</span>
        </Link>
        <span className="admin-lock">
          <LockKeyhole size={24} strokeWidth={1.3} />
        </span>
        <p className="eyebrow">KHÔNG GIAN QUẢN TRỊ RIÊNG CỦA SARAH</p>
        <h1>
          {setup
            ? state && !state.setupAllowed
              ? "Thiết lập quản trị đã khóa."
              : "Thiết lập dành cho chủ website."
            : "Chào Sarah, mừng bạn về."}
        </h1>
        <p>
          {setup
            ? "Chỉ chủ website có mã thiết lập riêng mới có thể cấp tài khoản quản trị."
            : "Đăng nhập để xem yêu cầu mới và chăm sóc những cuộc hẹn của bạn."}
        </p>
        {!state && !error && (
          <p className="admin-loading">
            <LoaderCircle className="loading-spinner" size={16} /> Đang kết nối…
          </p>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {state &&
          (setup && !state.setupAllowed ? (
            <p className="form-error">
              Website không mở đăng ký quản trị. Chủ website cần bật mã thiết
              lập riêng trên máy chủ để cấp tài khoản đầu tiên.
            </p>
          ) : !setup && state.setupRequired ? (
            <div className="admin-first-setup">
              <p>
                Tài khoản quản trị được cấp riêng bởi chủ website. Trang này
                không mở đăng ký tài khoản.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="admin-access-form">
              <label>
                <span>Email quản trị</span>
                <input
                  required
                  name="email"
                  type="email"
                  maxLength={200}
                  autoComplete="username"
                  placeholder="Email của bạn"
                />
              </label>
              <label>
                <span>Mật khẩu {setup && "(ít nhất 12 ký tự)"}</span>
                <input
                  required
                  name="password"
                  type="password"
                  minLength={setup ? 12 : 1}
                  maxLength={256}
                  autoComplete={setup ? "new-password" : "current-password"}
                />
              </label>
              {setup && (
                <>
                  <label>
                    <span>Nhập lại mật khẩu</span>
                    <input
                      required
                      name="confirmPassword"
                      type="password"
                      minLength={12}
                      maxLength={256}
                      autoComplete="new-password"
                    />
                  </label>
                  {
                    <label>
                      <span>Mã thiết lập quản trị</span>
                      <input
                        required
                        name="setupToken"
                        type="password"
                        autoComplete="off"
                      />
                    </label>
                  }
                </>
              )}
              <button
                className="button button-blue"
                disabled={busy}
                type="submit"
              >
                {busy ? (
                  <LoaderCircle className="loading-spinner" size={16} />
                ) : (
                  <LockKeyhole size={15} />
                )}{" "}
                {setup ? "Tạo tài khoản và đăng nhập" : "Đăng nhập"}
              </button>
            </form>
          ))}
        <Link className="admin-back" href="/">
          <ArrowLeft size={14} /> Về trang Sarah Reader
        </Link>
      </div>
      <p className="admin-access-note">
        sarahreader.com · Lắng nghe tận tâm, tôn trọng riêng tư.
      </p>
    </main>
  );
}
