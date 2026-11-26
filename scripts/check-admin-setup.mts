import assert from "node:assert/strict";
const { setupAllowed, verifySetup, externalOrigin } =
  await import("../src/lib/appointments/http");
const originalToken = process.env.ADMIN_SETUP_TOKEN;
assert.equal(
  externalOrigin(
    new Request("http://0.0.0.0:3000/api/admin/auth", {
      headers: { host: "sarahreader.com", "x-forwarded-proto": "https" },
    }),
  ),
  "https://sarahreader.com",
);
assert.equal(
  externalOrigin(
    new Request("http://0.0.0.0:3000/api/admin/auth", {
      headers: { host: "127.0.0.1:3010" },
    }),
  ),
  "http://127.0.0.1:3010",
);
const addresses = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://[::1]:3000",
  "https://sarahreader.com",
];
try {
  delete process.env.ADMIN_SETUP_TOKEN;
  for (const address of addresses) {
    assert.equal(
      setupAllowed(),
      false,
      `setup must be closed without an owner token on ${address}`,
    );
    assert.throws(() => verifySetup(undefined));
  }
  for (const token of ["", "   ", "change-me", "short-test-token"]) {
    process.env.ADMIN_SETUP_TOKEN = token;
    assert.equal(
      setupAllowed(),
      false,
      "weak setup configuration must stay closed",
    );
  }
  const ownerToken = "a-test-only-owner-token-with-at-least-32-characters";
  process.env.ADMIN_SETUP_TOKEN = ownerToken;
  assert.equal(setupAllowed(), true);
  for (const invalid of [undefined, null, 123, "", "wrong-token"])
    assert.throws(() => verifySetup(invalid));
  assert.doesNotThrow(() => verifySetup(ownerToken));
  console.log(
    "PASS: no localhost exception, missing/weak token disables setup, missing/wrong supplied token rejected, only owner token accepted.",
  );
} finally {
  if (originalToken === undefined) delete process.env.ADMIN_SETUP_TOKEN;
  else process.env.ADMIN_SETUP_TOKEN = originalToken;
}
