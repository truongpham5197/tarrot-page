import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";

const base = process.env.TARGET_URL ?? "http://localhost:3000";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-gpu",
    ...(process.env.BROWSER_HOST_RULES
      ? [`--host-resolver-rules=${process.env.BROWSER_HOST_RULES}`]
      : []),
  ],
});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base, { waitUntil: "networkidle0" });
  assert.match(await page.title(), /Sarah/);
  assert.equal(
    await page.$eval('link[rel="canonical"]', (el) => el.href),
    "https://sarahreader.com/",
  );
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewport({ width, height: 900 });
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    );
  }
  assert.equal(await page.$$eval(".service-card", (els) => els.length), 5);
  assert.equal(
    await page.$eval('.footer-social a[href^="tel:"]', (el) =>
      el.getAttribute("href"),
    ),
    "tel:0328052889",
  );
  assert.equal(
    await page.$eval(
      '.footer-social a[href^="https://zalo.me/"]',
      (el) => el.href,
    ),
    "https://zalo.me/0328052889",
  );
  assert.equal(
    await page.$eval(
      '.footer-social a[href^="https://www.facebook.com/"]',
      (el) => el.href,
    ),
    "https://www.facebook.com/misocduabeonhuheo",
  );
  const serviceLinks = await page.$$eval(".service-card a", (links) =>
    links.map((link) => link.getAttribute("href")),
  );
  assert.deepEqual(
    serviceLinks,
    [
      "tarot-one-question",
      "lenormand",
      "astrology",
      "matrix-destiny",
      "solar-return",
    ].map((slug) => `/booking?service=${slug}`),
  );
  await page.click("details summary");
  assert.equal(await page.$eval("details", (el) => el.open), true);
  // Select values are stable service codes, so the same ?service= works in every language.
  for (const slug of [
    "tarot-one-question",
    "lenormand",
    "astrology",
    "matrix-destiny",
    "solar-return",
    "numerology",
    "past-life-deep",
  ]) {
    await page.goto(`${base}/booking?service=${slug}`, {
      waitUntil: "networkidle0",
    });
    assert.equal(
      await page.$eval('select[name="service"]', (el) => el.value),
      slug,
    );
  }
  await page.goto(`${base}/booking?service=unknown`, {
    waitUntil: "networkidle0",
  });
  assert.equal(
    await page.$eval('select[name="service"]', (el) => el.value),
    "unsure",
  );
  await page.goto(`${base}/booking?service=lenormand`, {
    waitUntil: "networkidle0",
  });
  assert.match(
    await page.$eval(".booking-contact-strip", (el) => el.textContent),
    /0328 052 889/,
  );
  await page.click('input[name="bookingMode"][value="proposal"]');
  await page.click('button[type="submit"]');
  assert.equal(
    await page.$(".booking-success"),
    null,
    "empty form must not submit",
  );
  assert.equal(
    await page.$eval('input[name="name"]', (el) => {
      el.value = "   ";
      const valid = el.checkValidity();
      el.value = "";
      return valid;
    }),
    false,
    "whitespace name must be invalid",
  );
  assert.equal(
    await page.$eval('input[name="date"]', (el) => {
      el.value = "2000-01-01";
      const valid = el.checkValidity();
      el.value = "";
      return valid;
    }),
    false,
    "past date must be invalid",
  );
  assert.equal(
    await page.$eval('input[name="email"]', (el) => {
      el.value = "invalid-email";
      const valid = el.checkValidity();
      el.value = "";
      return valid;
    }),
    false,
    "invalid email must be blocked",
  );
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.click(".menu-button");
  assert.equal(
    await page.$eval(".menu-button", (el) => el.getAttribute("aria-expanded")),
    "true",
  );
  await page.click("#mobile-menu a");
  assert.equal(
    await page.$eval(".menu-button", (el) => el.getAttribute("aria-expanded")),
    "false",
  );
  await page.click(".menu-button");
  await page.keyboard.press("Escape");
  assert.equal(
    await page.$eval(".menu-button", (el) => el.getAttribute("aria-expanded")),
    "false",
  );
  for (const route of [
    "/game.html",
    "/games/tarot.html",
    "/games/chiem-tinh.html",
    "/games/than-so.html",
    "/games/ma-tran.html",
    "/games/solar-return.html",
  ]) {
    const response = await page.goto(`${base}${route}`, {
      waitUntil: "domcontentloaded",
    });
    assert.equal(response.status(), 200, route);
  }
  // --- i18n: Vietnamese at the root, English under /en, linked by hreflang ---
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(base, { waitUntil: "networkidle0" });
  assert.equal(
    await page.$eval("html", (el) => el.lang),
    "vi",
    "root page is Vietnamese",
  );
  assert.equal(
    await page.$eval('link[rel="alternate"][hreflang="en"]', (el) =>
      el.getAttribute("href"),
    ),
    "https://sarahreader.com/en",
  );
  assert.equal(
    await page.$eval('.lang-switch', (el) => el.getAttribute("href")),
    "/en",
  );
  assert.match(
    await page.$eval(".service-card .service-price", (el) => el.textContent),
    /20\.000đ/,
    "vi home cards show the lowest VND price",
  );
  await page.goto(`${base}/pricing`, { waitUntil: "networkidle0" });
  assert.equal(await page.$$eval(".pricing-card", (els) => els.length), 15);

  await page.goto(`${base}/en`, { waitUntil: "networkidle0" });
  assert.equal(await page.$eval("html", (el) => el.lang), "en");
  assert.equal(
    await page.$eval('link[rel="canonical"]', (el) => el.href),
    "https://sarahreader.com/en",
  );
  assert.equal(
    await page.$eval(".lang-switch", (el) => el.getAttribute("href")),
    "/",
  );
  assert.match(
    await page.$eval(".service-card .service-price", (el) => el.textContent),
    /VND.*\$/,
    "en home cards show VND with an approximate USD amount",
  );
  assert.equal(
    await page.$("#kham-pha"),
    null,
    "Vietnamese-only games corner is hidden in English",
  );
  await page.goto(`${base}/en/pricing`, { waitUntil: "networkidle0" });
  assert.equal(await page.$$eval(".pricing-card", (els) => els.length), 15);
  assert.equal(
    await page.$eval(".lang-switch", (el) => el.getAttribute("href")),
    "/pricing",
  );
  await page.goto(`${base}/en/booking?service=matrix-destiny`, {
    waitUntil: "networkidle0",
  });
  assert.equal(
    await page.$eval('select[name="service"]', (el) => el.value),
    "matrix-destiny",
  );
  assert.equal(
    await page.$eval(".lang-switch", (el) => el.getAttribute("href")),
    "/booking?service=matrix-destiny",
  );
  assert.match(
    await page.$eval("h1", (el) => el.textContent),
    /listen/i,
    "English booking heading",
  );
  const legacy = await page.goto(`${base}/vi/booking`, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(new URL(page.url()).pathname, "/booking");
  assert(legacy.ok());
  assert.deepEqual(errors, []);
  console.log(
    "PASS: Sarah metadata, service selections by code, 4 viewport widths, FAQ, mobile menu, proposal form validation, vi/en pages with hreflang, pricing and 6 existing tools.",
  );
} finally {
  await browser.close();
}
