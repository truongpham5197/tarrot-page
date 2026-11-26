# Verification — 2026-11-21
- Production build PASS; TypeScript PASS; targeted ESLint on source and changed tests PASS. `git diff --check` PASS.
- Pure daily-schedule test PASS: selected-date grouping, pending/confirmed/completed reservations, proposed/cancelled non-reservation, free versus unopened hours, week navigation and month/year boundaries.
- Existing appointment/security regressions PASS: concurrent reservations, idempotency, cancellation, rescheduling/conflicts, persisted records, private-cache bypass and owner-token-only provisioning.
- Expanded full browser journey PASS on production localhost:3007 with isolated test SQLite: default agenda, chosen date's timeline, separate proposals, detail editor, previous/next day, same-day availability shortcut, Today excluding future bookings, remaining confirm/reschedule/cancel flows and revoked-session checks.
- Computed browser styles verify that search has one soft outer focus ring and no displaced inner outline/shadow; keyboard Tab retains a visible outline. Statistics use DM Sans and tabular numerals.
- Admin agenda and customer booking fit 360, 390, 768 and 1440px with no document overflow. Desktop and mobile agenda screenshots inspected from `.playwright-mcp/admin-daily-desktop.png` and `admin-daily-mobile.png`; only test customers shown.
- Public regression PASS: five service links, native proposal validation, menu/FAQ, six existing tools, correct old-source telephone/Zalo/Facebook links and readable phone text on booking support. Native consent checkbox regression PASS.
- Sarah's contact details were verified against original root `index.html` lines 327–329 and reused through the shared site configuration.

No owner account, real appointments, environment secrets, deployment or DNS were changed. Protected admin data includes active slot history for 90 days; customer availability remains future-only. Calendar proposals remain unreserved until admin confirmation.
