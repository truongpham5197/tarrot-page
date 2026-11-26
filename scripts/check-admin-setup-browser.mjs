import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";
if (!process.env.TARGET_URL)
  throw new Error("TARGET_URL must be an isolated, unconfigured test server.");
const base = process.env.TARGET_URL.replace(/\/$/, "");
const state = await (await fetch(`${base}/api/admin/auth`)).json();
assert.equal(
  state.setupRequired,
  true,
  "test requires a database with no admin",
);
assert.equal(
  state.setupAllowed,
  false,
  "setup must be disabled without owner configuration",
);
for (const setupToken of [undefined, "guessed-token"]) {
  const response = await fetch(`${base}/api/admin/setup`, {
    method: "POST",
    headers: { Origin: base, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "unauthorized@example.test",
      password: "Unauthorized test password!",
      setupToken,
    }),
  });
  assert.equal(response.status, 403);
}
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});
try {
  const page = await browser.newPage();
  await page.goto(`${base}/admin/setup`, { waitUntil: "networkidle0" });
  await page.waitForFunction(() =>
    document.querySelector("h1")?.textContent.includes("đã khóa"),
  );
  assert.equal(
    await page.$(".admin-access-form"),
    null,
    "locked setup must not expose an account creation form",
  );
  await page.goto(`${base}/admin/login`, { waitUntil: "networkidle0" });
  assert.equal(
    await page.$('a[href="/admin/setup"]'),
    null,
    "login must not invite public admin registration",
  );
  const after = await (await fetch(`${base}/api/admin/auth`)).json();
  assert.equal(
    after.setupRequired,
    true,
    "blocked attempts must not create an account",
  );
  console.log(
    "PASS: unconfigured fresh server rejects account creation with 403, setup UI is locked, login has no signup link, no account created.",
  );
} finally {
  await browser.close();
}
