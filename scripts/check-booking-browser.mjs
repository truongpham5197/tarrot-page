import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdir } from 'node:fs/promises';
import puppeteer from "puppeteer-core";

if (process.env.ALLOW_APPOINTMENT_TESTS !== "1" || !process.env.TARGET_URL)
  throw new Error(
    "Run against an isolated test database only: set ALLOW_APPOINTMENT_TESTS=1 and TARGET_URL.",
  );
const base = process.env.TARGET_URL.replace(/\/$/, "");
const date = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
const credentials = {
  email: "sarah-admin@example.test",
  password: "Temporary E2E Password #2026",
};
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
async function request(path, method = "GET", payload, headers = {}) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      Origin: base,
      ...(payload ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  return { status: response.status, data };
}
async function setInput(page, selector, value) {
  await page.$eval(
    selector,
    (input, value) => {
      Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      ).set.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    },
    value,
  );
}
async function adminData(page) {
  return page.evaluate(
    async () =>
      await (await fetch("/api/admin/bookings", { cache: "no-store" })).json(),
  );
}
async function chooseDay(page) {
  if (!(await page.$(`[data-calendar-date="${date}"]`)))
    await page.click('button[aria-label="Tháng sau"]');
  await page.click(`[data-calendar-date="${date}"]`);
}
async function fillCustomer(page, name) {
  await page.type('input[name="name"]', name);
  await page.type('input[name="contact"]', "0900000000");
  await page.type('input[name="email"]', "customer@example.test");
  await page.click(".consent-row input");
}
try {
  assert.equal((await request("/api/admin/bookings")).status, 401);
  assert.equal(
    (await request("/api/admin/slots", "POST", { date, times: ["09:00"] }))
      .status,
    401,
  );
  assert.equal(
    (await request("/api/admin/slots", "DELETE", { id: "unknown" })).status,
    401,
  );
  assert.equal(
    (
      await request("/api/admin/bookings/unknown", "PATCH", {
        status: "confirmed",
        version: 1,
      })
    ).status,
    401,
  );
  assert.equal(
    (
      await request(
        "/api/bookings",
        "POST",
        {},
        { Origin: "https://untrusted.example" },
      )
    ).status,
    403,
  );
  assert.equal(
    (await request("/api/bookings", "POST", { name: "bad" })).status,
    400,
  );
  const adminContext = await browser.createBrowserContext();
  const customerContext = await browser.createBrowserContext();
  const admin = await adminContext.newPage(),
    customer = await customerContext.newPage();
  await admin.setViewport({ width: 1440, height: 950 });
  const errors = [];
  admin.on("pageerror", (err) => errors.push(err.message));
  customer.on("pageerror", (err) => errors.push(err.message));
  const setupState = await request("/api/admin/auth");
  if (setupState.data.setupRequired) {
    assert.equal(
      (await request("/api/admin/setup", "POST", credentials)).status,
      403,
      "creating admin without owner token must be rejected",
    );
    assert.equal(
      (
        await request("/api/admin/setup", "POST", {
          ...credentials,
          setupToken: "wrong-owner-token",
        })
      ).status,
      403,
      "wrong owner token must be rejected",
    );
  }
  await admin.goto(
    `${base}/admin/${setupState.data.setupRequired ? "setup" : "login"}`,
    { waitUntil: "networkidle0" },
  );
  await admin.waitForSelector('input[name="email"]');
  await admin.type('input[name="email"]', credentials.email);
  await admin.type('input[name="password"]', credentials.password);
  if (setupState.data.setupRequired) {
    await admin.type('input[name="confirmPassword"]', credentials.password);
    const token = await admin.$('input[name="setupToken"]');
    if (token)
      await token.type(
        process.env.E2E_SETUP_TOKEN ||
          "local-test-bootstrap-only-at-least-32-characters",
      );
  }
  await admin.click('button[type="submit"]');
  await admin.waitForSelector(".admin-shell");
  await admin.waitForFunction(() => !document.querySelector(".admin-loading"));
  const cookies = await adminContext.cookies();
  const session = cookies.find(
    (cookie) => cookie.name === "sarah_admin_session",
  );
  assert(session?.httpOnly);
  assert.equal(session.sameSite, "Strict");
  const cookieHeader = `sarah_admin_session=${session.value}`;
  assert.equal(
    (
      await request(
        "/api/admin/slots",
        "POST",
        { date, times: ["09:00"] },
        { Cookie: cookieHeader, Origin: "https://untrusted.example" },
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await request("/api/admin/setup", "POST", {
        ...credentials,
        setupToken:
          process.env.E2E_SETUP_TOKEN ||
          "local-test-bootstrap-only-at-least-32-characters",
      })
    ).status,
    409,
  );
  assert(
    await admin.$("[data-daily-schedule]"),
    "daily agenda is the default admin view",
  );
  await admin.click('[data-admin-tab="availability"]');
  await admin.waitForSelector('input[name="availabilityDate"]');
  await setInput(admin, 'input[name="availabilityDate"]', date);
  for (const hour of ["09:00", "10:00", "11:00"])
    await admin.click(`.admin-hour-grid input[value="${hour}"]`);
  await admin.click('.admin-slot-form button[type="submit"]');
  await admin.waitForFunction(() =>
    document.querySelector(".admin-notice")?.textContent.includes("Đã mở"),
  );
  const publicSlots = (await request("/api/booking-slots")).data.slots;
  const chosen = publicSlots.find(
    (slot) => slot.date === date && slot.time === "09:00",
  );
  assert(chosen);
  let captured;
  customer.on("request", (req) => {
    if (req.url() === `${base}/api/bookings` && req.method() === "POST")
      captured = JSON.parse(req.postData());
  });
  await customer.setViewport({ width: 390, height: 844 });
  await customer.goto(`${base}/booking?service=lenormand`, {
    waitUntil: "networkidle0",
  });
  await chooseDay(customer);
  await customer.click(`[data-slot-id="${chosen.id}"]`);
  await fillCustomer(customer, "Khách chọn giờ kiểm thử");
  await customer.click('button[type="submit"]');
  await customer.waitForSelector("[data-booking-reference]");
  const reference = await customer.$eval(
    "[data-booking-reference]",
    (el) => el.textContent,
  );
  assert.match(reference, /^SR-/);
  assert.equal(
    (await request("/api/bookings", "POST", captured)).data.booking.reference,
    reference,
  );
  assert.equal(
    (
      await request("/api/bookings", "POST", {
        ...captured,
        requestKey: randomUUID(),
      })
    ).status,
    409,
  );
  assert(
    !(await request("/api/booking-slots")).data.slots.some(
      (slot) => slot.id === chosen.id,
    ),
  );
  assert(
    !JSON.stringify((await request("/api/booking-slots")).data).includes(
      "Khách chọn giờ",
    ),
  );
  const proposal = await customerContext.newPage();
  await proposal.goto(`${base}/booking?service=astrology`, {
    waitUntil: "networkidle0",
  });
  await proposal.click('input[name="bookingMode"][value="proposal"]');
  await setInput(proposal, 'input[name="date"]', date);
  await proposal.select('select[name="time"]', "10:00");
  await fillCustomer(proposal, "Khách đề xuất kiểm thử");
  await proposal.click('button[type="submit"]');
  await proposal.waitForSelector("[data-booking-reference]");
  const proposalReference = await proposal.$eval(
    "[data-booking-reference]",
    (el) => el.textContent,
  );
  assert(
    (await request("/api/booking-slots")).data.slots.some(
      (slot) => slot.date === date && slot.time === "10:00",
    ),
  );
  await admin.click('[data-admin-tab="bookings"]');
  await admin.click('button[aria-label="Làm mới lịch hẹn"]');
  await admin.waitForFunction(
    (ref) => document.body.innerText.includes(ref),
    {},
    reference,
  );
  assert.match(
    await admin.$eval(".admin-new-notice", (el) => el.textContent),
    /yêu cầu|đề xuất/,
  );
  await admin.click('[data-admin-tab="schedule"]');
  await admin.select('select[aria-label="Chế độ xem lịch"]', 'day');
  await setInput(admin, 'input[name="scheduleDate"]', date);
  await admin.waitForFunction(() =>
    document
      .querySelector('.admin-calendar-event')
      ?.textContent.includes("Khách chọn giờ kiểm thử"),
  );
  assert(
    !(await admin.$eval('.admin-calendar-grid', (el) =>
      el.textContent.includes("Khách đề xuất kiểm thử"),
    )),
    "proposal does not reserve its requested hour",
  );
  assert.match(
    await admin.$eval(".admin-day-proposal-list", (el) => el.textContent),
    /Khách đề xuất kiểm thử/,
  );
  if(process.env.CAPTURE_SCHEDULING_SCREENSHOTS==='1'){
    await mkdir('.playwright-mcp',{recursive:true});
    await admin.screenshot({path:'.playwright-mcp/admin-daily-desktop.png',fullPage:true});
    await admin.setViewport({width:390,height:844});
    await admin.screenshot({path:'.playwright-mcp/admin-daily-mobile.png',fullPage:true});
    await admin.setViewport({width:1440,height:950});
  }
  await admin.click("[data-schedule-proposal]");
  await admin.waitForSelector("dialog[open]");
  await admin.click(".admin-dialog-head button");
  await admin.waitForSelector("dialog[open]", { hidden: true });
  await admin.click('button[aria-label="Ngày trước"]');
  assert.notEqual(
    await admin.$eval('input[name="scheduleDate"]', (el) => el.value),
    date,
  );
  await admin.click('button[aria-label="Ngày sau"]');
  assert.equal(
    await admin.$eval('input[name="scheduleDate"]', (el) => el.value),
    date,
  );
  await admin.click(".admin-calendar-publish");
  assert.equal(
    await admin.$eval('input[name="availabilityDate"]', (el) => el.value),
    date,
    "opening availability preserves the selected schedule date",
  );
  await admin.click(".admin-stats button:last-child");
  await admin.waitForSelector("[data-daily-schedule]");
  assert(
    !(await admin.$eval(".admin-calendar-grid", (el) =>
      el.textContent.includes("Khách chọn giờ kiểm thử"),
    )),
    "today agenda excludes future appointments",
  );
  await admin.click('[data-admin-tab="bookings"]');
  await admin.click(".admin-filters button:first-child");
  await admin.waitForSelector(".admin-table");
  await admin.focus('input[name="bookingSearch"]');
  await admin.waitForFunction(
    () =>
      getComputedStyle(document.querySelector(".admin-search input"))
        .boxShadow === "none" &&
      getComputedStyle(
        document.querySelector(".admin-search"),
      ).boxShadow.includes("3px"),
  );
  const focus = await admin.$eval(".admin-search", (el) => ({
    outerShadow: getComputedStyle(el).boxShadow,
    innerOutline: getComputedStyle(el.querySelector("input")).outlineStyle,
    innerShadow: getComputedStyle(el.querySelector("input")).boxShadow,
  }));
  assert.equal(focus.innerOutline, "none");
  assert.equal(focus.innerShadow, "none");
  assert.notEqual(focus.outerShadow, "none");
  assert.match(
    await admin.$eval(
      ".admin-stats strong",
      (el) => getComputedStyle(el).fontFamily,
    ),
    /DM Sans/,
  );
  assert.match(
    await admin.$eval(
      ".admin-stats strong",
      (el) => getComputedStyle(el).fontVariantNumeric,
    ),
    /tabular-nums/,
  );
  await admin.keyboard.press("Tab");
  assert.equal(
    await admin.evaluate(
      () => getComputedStyle(document.activeElement).outlineStyle,
    ),
    "solid",
    "keyboard focus remains visible",
  );
  await admin.click(`button[aria-label="Xem lịch ${reference}"]`);
  await admin.waitForSelector("dialog[open]");
  await admin.select('dialog select[name="status"]', "confirmed");
  await admin.type(
    'dialog textarea[name="adminNote"]',
    "Ghi chú chỉ admin được xem",
  );
  await admin.click('dialog button[type="submit"]');
  await admin.waitForSelector("dialog[open]", { hidden: true });
  let list = await adminData(admin);
  let booking = list.bookings.find((item) => item.reference === reference);
  assert.equal(booking.status, "confirmed");
  assert.equal(booking.adminNote, "Ghi chú chỉ admin được xem");
  await admin.click(`button[aria-label="Xem lịch ${proposalReference}"]`);
  await admin.select('dialog select[name="status"]', "confirmed");
  await proposal.close();
  await admin.select('dialog select[name="time"]', "09:00");
  await admin.click('dialog button[type="submit"]');
  await admin.waitForSelector("dialog .form-error");
  assert.match(
    await admin.$eval("dialog .form-error", (el) => el.textContent),
    /không còn|trùng|được giữ/,
  );
  await admin.select('dialog select[name="time"]', "11:00");
  await admin.click('dialog button[type="submit"]');
  await admin.waitForSelector("dialog[open]", { hidden: true });
  list = await adminData(admin);
  assert.equal(
    list.bookings.find((item) => item.reference === proposalReference).status,
    "confirmed",
  );
  await admin.click(`button[aria-label="Xem lịch ${reference}"]`);
  await admin.select('dialog select[name="time"]', "10:00");
  await admin.click('dialog button[type="submit"]');
  await admin.waitForSelector("dialog[open]", { hidden: true });
  assert(
    (await request("/api/booking-slots")).data.slots.some(
      (slot) => slot.date === date && slot.time === "09:00",
    ),
  );
  await admin.click(`button[aria-label="Xem lịch ${reference}"]`);
  await admin.select('dialog select[name="status"]', "cancelled");
  await admin.click('dialog button[type="submit"]');
  await admin.waitForSelector("dialog[open]", { hidden: true });
  assert(
    (await request("/api/booking-slots")).data.slots.some(
      (slot) => slot.date === date && slot.time === "10:00",
    ),
  );
  await admin.click('[data-admin-tab="availability"]');
  await admin.click(`button[aria-label="Đóng giờ 10:00 ngày ${date}"]`);
  await admin.waitForFunction(() =>
    document.querySelector(".admin-notice")?.textContent.includes("Đã đóng"),
  );
  assert(
    !(await request("/api/booking-slots")).data.slots.some(
      (slot) => slot.date === date && slot.time === "10:00",
    ),
  );
  await admin.click('[data-admin-tab="schedule"]');
  await setInput(admin, 'input[name="scheduleDate"]', date);
  for (const width of [360, 390, 768, 1440]) {
    await admin.setViewport({ width, height: 900 });
    assert(
      await admin.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `admin overflow ${width}`,
    );
    await customer.setViewport({ width, height: 900 });
    await customer.goto(`${base}/booking`, { waitUntil: "networkidle0" });
    assert(
      await customer.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `booking overflow ${width}`,
    );
  }
  await admin.setViewport({ width: 390, height: 844 });
  await admin.click("[data-admin-logout]");
  await admin.waitForSelector(".admin-access-form");
  assert.equal(
    (
      await request("/api/admin/bookings", "GET", undefined, {
        Cookie: cookieHeader,
      })
    ).status,
    401,
    "logged out token must be revoked",
  );
  const homepage = await (await fetch(base)).text();
  assert(!homepage.includes("20/10"));
  assert(!homepage.includes("giảm <strong>10%"));
  assert.deepEqual(errors, []);
  console.log(
    "PASS: real admin setup/sign-in, server authorization and CSRF, publish availability, customer calendar booking, proposal, durable receipts/idempotency, new-request notice, private notes, confirmation/conflict/reschedule/cancel, close slot, 4 viewport widths and session revocation.",
  );
} finally {
  await browser.close();
}
