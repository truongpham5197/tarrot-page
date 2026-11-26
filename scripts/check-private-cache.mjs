import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
const listeners = {};
runInNewContext(
  await readFile(new URL("../public/sw.js", import.meta.url), "utf8"),
  {
    URL,
    fetch: () => new Promise(() => {}),
    location: { origin: "https://sarahreader.com" },
    self: {
      addEventListener: (event, handler) => {
        listeners[event] = handler;
      },
    },
  },
);
for (const path of [
  "/admin",
  "/admin/login",
  "/admin?_rsc=private",
  "/api/admin/bookings",
  "/api/admin/auth",
  "/api/bookings",
  "/api/booking-slots",
  "/booking?service=tarot",
]) {
  let intercepted = false;
  listeners.fetch({
    request: {
      url: `https://sarahreader.com${path}`,
      method: "GET",
      destination: "document",
    },
    respondWith: () => {
      intercepted = true;
    },
  });
  assert.equal(
    intercepted,
    false,
    `service worker must not intercept or cache ${path}`,
  );
}
console.log(
  "PASS: service worker bypasses all private admin, API and booking requests.",
);
