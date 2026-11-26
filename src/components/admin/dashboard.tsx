"use client";

import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  CalendarRange,
  Clock3,
  Inbox,
  LoaderCircle,
  LogOut,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  statusLabels,
  bookingStatuses,
  vietnamDate,
  type Booking,
  type BookingStatus,
} from "@/lib/appointments/types";
import { AdminRequestError, adminRequest } from "./client";
import { Availability, type AdminSlot } from "./availability";
import { BookingEditor } from "./booking-editor";
import { DailySchedule } from "./daily-schedule";

type DashboardData = { bookings: Booking[]; slots: AdminSlot[] };
function normalizedPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("84") ? `0${digits.slice(2)}` : digits;
}

export function AdminDashboard({ email }: { email: string }) {
  const router = useRouter();
  const [data, setData] = useState<DashboardData>({ bookings: [], slots: [] }),
    [loading, setLoading] = useState(true),
    [refreshing, setRefreshing] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [tab, setTab] = useState<"schedule" | "bookings" | "availability">(
      "schedule",
    ),
    [scheduleDate, setScheduleDate] = useState(() => vietnamDate()),
    [availabilityDate, setAvailabilityDate] = useState(() => vietnamDate()),
    [availabilityTime, setAvailabilityTime] = useState<string | undefined>(),
    [search, setSearch] = useState(""),
    [filter, setFilter] = useState<BookingStatus | "all" | "today">("all"),
    [page, setPage] = useState(0),
    [selected, setSelected] = useState<Booking | null>(null);
  const known = useRef<Set<string> | null>(null),
    alive = useRef(true);
  const refresh = useCallback(() => {
    return adminRequest<DashboardData>("/api/admin/bookings")
      .then((next) => {
        if (!alive.current) return;
        if (known.current) {
          const count = next.bookings.filter(
            (item) => !known.current!.has(item.id),
          ).length;
          if (count)
            setNotice(`Bạn có ${count} yêu cầu hoặc đề xuất lịch hẹn mới.`);
        }
        known.current = new Set(next.bookings.map((item) => item.id));
        setData(next);
        setError("");
      })
      .catch((err) => {
        if (!alive.current) return;
        if (err instanceof AdminRequestError && err.status === 401) {
          router.replace("/admin/login");
          return;
        }
        setError(
          err instanceof Error ? err.message : "Chưa tải được lịch hẹn.",
        );
      })
      .finally(() => {
        if (alive.current) {
          setRefreshing(false);
          setLoading(false);
        }
      });
  }, [router]);
  useEffect(() => {
    alive.current = true;
    void refresh();
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 30000);
    return () => {
      alive.current = false;
      clearInterval(interval);
    };
  }, [refresh]);
  const today = vietnamDate();
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("vi");
    const phoneQuery = normalizedPhone(query);
    return data.bookings.filter(
      (booking) =>
        (filter === "all" ||
          (filter === "today"
            ? booking.date === today &&
              ["pending", "confirmed"].includes(booking.status)
            : booking.status === filter)) &&
        (!query ||
          [
            booking.name,
            booking.reference,
            booking.service,
            booking.email,
          ].some((value) => value.toLocaleLowerCase("vi").includes(query)) ||
          (phoneQuery.length > 0 &&
            normalizedPhone(booking.contact).includes(phoneQuery))),
    );
  }, [data.bookings, filter, search, today]);
  const stats = [
    {
      label: "Chờ xác nhận",
      count: data.bookings.filter((item) => item.status === "pending").length,
      icon: Clock3,
      value: "pending",
    },
    {
      label: "Đề xuất thời gian",
      count: data.bookings.filter((item) => item.status === "proposed").length,
      icon: Inbox,
      value: "proposed",
    },
    {
      label: "Đã xác nhận",
      count: data.bookings.filter((item) => item.status === "confirmed").length,
      icon: CalendarDays,
      value: "confirmed",
    },
    {
      label: "Cuộc hẹn hôm nay",
      count: data.bookings.filter(
        (item) =>
          item.date === today && ["confirmed", "pending"].includes(item.status),
      ).length,
      icon: CalendarRange,
      value: "today",
    },
  ] as const;
  const pageCount = Math.max(1, Math.ceil(filtered.length / 20)),
    currentPage = Math.min(page, pageCount - 1),
    shown = filtered.slice(currentPage * 20, currentPage * 20 + 20);
  async function logout() {
    try {
      await adminRequest("/api/admin/auth", "DELETE");
      router.replace("/admin/login");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa đăng xuất được.");
    }
  }
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-logo">
          <Sparkles size={24} strokeWidth={1} />
          <span className="script">Reader Sarah</span>
        </Link>
        <p className="eyebrow admin-sidebar-kicker">KHÔNG GIAN QUẢN TRỊ</p>
        <nav aria-label="Quản trị">
          <button
            type="button"
            data-admin-tab="schedule"
            className={tab === "schedule" ? "active" : ""}
            aria-pressed={tab === "schedule"}
            onClick={() => setTab("schedule")}
          >
            <CalendarRange size={18} /> Lịch trình
          </button>
          <button
            data-admin-tab="bookings"
            aria-pressed={tab === "bookings"}
            className={tab === "bookings" ? "active" : ""}
            onClick={() => setTab("bookings")}
          >
            <CalendarDays size={18} /> Lịch hẹn{" "}
            <span>
              {
                data.bookings.filter((item) =>
                  ["pending", "proposed"].includes(item.status),
                ).length
              }
            </span>
          </button>
          <button
            data-admin-tab="availability"
            aria-pressed={tab === "availability"}
            className={tab === "availability" ? "active" : ""}
            onClick={() => {
              setAvailabilityTime(undefined);
              setTab("availability");
            }}
          >
            <CalendarRange size={18} /> Giờ trống
          </button>
          <Link href="/booking" target="_blank">
            Trang đặt hẹn <ArrowUpRight size={16} />
          </Link>
        </nav>
        <div className="admin-sidebar-bottom">
          <span className="admin-avatar">S</span>
          <div>
            <strong>Sarah</strong>
            <small>{email}</small>
          </div>
          <button onClick={() => void logout()} aria-label="Đăng xuất">
            <LogOut size={17} />
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <span>
            <i /> Sarah Reader · Quản lý lịch hẹn
          </span>
          <div>
            <Link href="/">
              Xem website <ArrowUpRight size={13} />
            </Link>
            <button
              className="admin-refresh"
              type="button"
              onClick={() => {
                setRefreshing(true);
                void refresh();
              }}
              disabled={refreshing}
              aria-label="Làm mới lịch hẹn"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "loading-spinner" : ""}
              />
            </button>
            <button
              className="admin-refresh"
              type="button"
              data-admin-logout
              aria-label="Đăng xuất tài khoản"
              onClick={() => void logout()}
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>
        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <p className="eyebrow">
                {new Date().toLocaleDateString("vi-VN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Asia/Ho_Chi_Minh",
                })}
              </p>
              <h1>
                {tab === "schedule"
                  ? "Một ngày của Sarah."
                  : tab === "bookings"
                    ? "Những cuộc hẹn của bạn."
                    : "Dành thời gian để lắng nghe."}
              </h1>
              <p>
                {tab === "schedule"
                  ? "Nhìn rõ từng khung giờ, dành tâm trí cho từng cuộc hẹn."
                  : tab === "bookings"
                    ? "Một nơi để đón nhận, sắp xếp và chăm sóc từng câu chuyện."
                    : "Mở những khung giờ phù hợp để khách dễ dàng tìm đến Sarah."}
              </p>
            </div>
            <span className="admin-heading-star" aria-hidden="true">
              ✧
            </span>
          </div>
          {notice && (
            <div className="admin-new-notice" role="status">
              <Bell size={16} />
              {notice}
              <button onClick={() => setNotice("")} aria-label="Đóng thông báo">
                ×
              </button>
            </div>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="admin-stats">
            {stats.map(({ label, count, icon: Icon, value }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (value === "today") {
                    setScheduleDate(today);
                    setTab("schedule");
                    return;
                  }
                  setTab("bookings");
                  setFilter(value);
                  setPage(0);
                }}
              >
                <span>
                  <Icon size={18} strokeWidth={1.3} />
                  {label}
                </span>
                <strong>{loading ? "—" : count}</strong>
                <small>
                  {value === "today" ? "Theo giờ Việt Nam" : "Xem danh sách"}{" "}
                  <ArrowUpRight size={12} />
                </small>
              </button>
            ))}
          </div>
          {loading ? (
            <div className="admin-loading">
              <LoaderCircle size={19} className="loading-spinner" /> Đang tải
              không gian quản trị…
            </div>
          ) : tab === "availability" ? (
            <Availability
              key={`${availabilityDate}-${availabilityTime ?? ""}`}
              initialDate={availabilityDate}
              initialTime={availabilityTime}
              slots={data.slots}
              onChanged={() => void refresh()}
            />
          ) : tab === "schedule" ? (
            <DailySchedule
              date={scheduleDate}
              today={today}
              bookings={data.bookings}
              slots={data.slots}
              onDateChange={setScheduleDate}
              onSelect={setSelected}
              onOpenAvailability={(date, time) => {
                setAvailabilityDate(date);
                setAvailabilityTime(time);
                setTab("availability");
              }}
            />
          ) : (
            <section className="admin-panel admin-bookings-panel">
              <div className="admin-list-heading">
                <div>
                  <h2>Lịch hẹn & đề xuất</h2>
                  <p>
                    Yêu cầu mới tự cập nhật mỗi 30 giây khi bạn đang xem trang.
                  </p>
                </div>
                <label className="admin-search">
                  <Search size={15} />
                  <input
                    name="bookingSearch"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(0);
                    }}
                    placeholder="Tìm tên, số điện thoại, mã lịch…"
                    aria-label="Tìm lịch hẹn theo tên, số điện thoại hoặc mã lịch"
                  />
                </label>
              </div>
              <div className="admin-filters" aria-label="Lọc trạng thái">
                <button
                  className={filter === "all" ? "active" : ""}
                  onClick={() => {
                    setFilter("all");
                    setPage(0);
                  }}
                >
                  Tất cả <span>{data.bookings.length}</span>
                </button>
                <button
                  className={filter === "today" ? "active" : ""}
                  onClick={() => {
                    setFilter("today");
                    setPage(0);
                  }}
                >
                  Hôm nay
                </button>
                {bookingStatuses.map((status) => (
                  <button
                    className={filter === status ? "active" : ""}
                    key={status}
                    onClick={() => {
                      setFilter(status);
                      setPage(0);
                    }}
                  >
                    {statusLabels[status]}{" "}
                    <span>
                      {
                        data.bookings.filter((item) => item.status === status)
                          .length
                      }
                    </span>
                  </button>
                ))}
              </div>
              {shown.length === 0 ? (
                <div className="admin-empty">
                  <Inbox size={35} strokeWidth={1} />
                  <h3>
                    {search || filter !== "all"
                      ? "Chưa có lịch phù hợp."
                      : "Chờ một cuộc hẹn hữu duyên."}
                  </h3>
                  <p>
                    {search || filter !== "all"
                      ? "Thử tìm từ khóa hoặc trạng thái khác nhé."
                      : "Mở giờ trống để khách chọn lịch, hoặc nhận đề xuất thời gian từ trang đặt hẹn."}
                  </p>
                  {!search && filter === "all" && (
                    <button
                      className="button button-blue"
                      onClick={() => setTab("availability")}
                    >
                      Mở giờ trống <ArrowUpRight size={15} />
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Khách hàng</th>
                          <th>Dịch vụ</th>
                          <th>Ngày & giờ hẹn</th>
                          <th>Trạng thái</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {shown.map((booking) => (
                          <tr key={booking.id}>
                            <td>
                              <strong>{booking.name}</strong>
                              <small>{booking.contact}</small>
                              <span className="admin-reference">
                                {booking.reference}
                              </span>
                            </td>
                            <td>
                              {booking.service}
                              <small>
                                {booking.mode === "proposal"
                                  ? "Khách đề xuất"
                                  : "Giờ Sarah đã mở"}
                              </small>
                            </td>
                            <td>
                              <strong>{booking.time}</strong>
                              <small>
                                {booking.date.split("-").reverse().join("/")} ·
                                GMT+7
                              </small>
                            </td>
                            <td>
                              <span className={`admin-badge ${booking.status}`}>
                                {statusLabels[booking.status]}
                              </span>
                            </td>
                            <td>
                              <button
                                className="admin-detail-button"
                                type="button"
                                onClick={() => setSelected(booking)}
                                aria-label={`Xem lịch ${booking.reference}`}
                              >
                                Chi tiết <ArrowUpRight size={13} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="admin-mobile-bookings">
                    {shown.map((booking) => (
                      <button
                        type="button"
                        key={booking.id}
                        onClick={() => setSelected(booking)}
                      >
                        <span>
                          <strong>{booking.name}</strong>
                          <small>{booking.service}</small>
                        </span>
                        <span className={`admin-badge ${booking.status}`}>
                          {statusLabels[booking.status]}
                        </span>
                        <p>
                          {booking.time} ·{" "}
                          {booking.date.split("-").reverse().join("/")}{" "}
                          <ArrowUpRight size={14} />
                        </p>
                      </button>
                    ))}
                  </div>
                  <div className="admin-pagination">
                    <span>
                      {filtered.length} lịch hẹn · Trang {currentPage + 1}/
                      {pageCount}
                    </span>
                    <div>
                      <button
                        disabled={currentPage === 0}
                        onClick={() => setPage(currentPage - 1)}
                      >
                        Trước
                      </button>
                      <button
                        disabled={currentPage >= pageCount - 1}
                        onClick={() => setPage(currentPage + 1)}
                      >
                        Sau
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          )}
          <footer className="admin-footer">
            Reader Sarah · Thông tin lịch hẹn chỉ dành cho quản trị viên.
            <span>Giờ Việt Nam (GMT+7)</span>
          </footer>
        </div>
      </main>
      {selected && (
        <BookingEditor
          booking={selected}
          onClose={() => setSelected(null)}
          onSaved={() => {
            setSelected(null);
            setNotice("Đã cập nhật lịch hẹn.");
            void refresh();
          }}
        />
      )}
    </div>
  );
}
