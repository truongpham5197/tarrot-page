# Validation — 2026-11-21

## Completed checks
- Production build: PASS with homepage, booking, admin/login/setup, public scheduling APIs and protected management APIs.
- TypeScript: `npx tsc --noEmit` PASS.
- ESLint: full project PASS with zero errors and 43 existing warnings in unchanged legacy game engine scripts. Targeted `src` and new/updated verification scripts PASS with no warnings.
- `test:appointments`: PASS. Validates past date/whitespace/consent rejection, one winner for concurrent reservation, cancellation release, stale-update rejection, proposal idempotency and non-reservation, conflict checking when accepting proposals, rescheduling, occupied-slot closure protection, first-admin singleton, password verification, session revocation and persisted appointments readable from an independent new Node process.
- `check-private-cache`: demonstrated failure before the service-worker fix, PASS after fix; all admin, API and booking paths bypass offline handling.
- `test:booking-browser`: PASS against final production server on localhost:3003 using a unique isolated SQLite file. Real browser flows covered admin setup/login, publishing availability through UI, customer calendar selection and alternative-time proposal, actual saved receipt, retry idempotency, taken-slot 409, in-app new-request notice, today filter excluding future appointments, internal notes, confirmation, conflict display, reschedule, cancel, slot closure, mobile logout and revoked-session 401.
- HTTP access checks: anonymous admin reads/updates/slot mutations 401; cross-origin mutation 403 even with a valid admin cookie; repeated admin setup 409; invalid public booking 400. Public slot responses contain no customer details.
- `test:sarah`: PASS for five service selections, canonical metadata, FAQ/mobile menu, native proposal form validation, four viewport widths and all six legacy exploration routes.
- `test:consent`: PASS on production; native 16×16 checkbox starts unchecked and visibly toggles.
- Responsive checks: booking and admin have no horizontal document overflow at 360, 390, 768 and 1440px.
- Visual inspection in Orca: desktop booking/calendar, admin sign-in and desktop dashboard. Blue/white identity, serif/handwritten fonts and calendar controls verified.
- `git diff --check`: PASS.

## Data and operational boundaries
Security correction: removed the localhost setup exemption. The new policy regression test demonstrated failure against the old code and now passes for missing/weak/wrong setup tokens. A fresh production test server without a configured token rejects setup POSTs with 403, renders a locked setup page, exposes no creation form or signup link and remains without an account after attempted requests. A separate isolated production server with an owner token passes the full booking/admin journey, including rejection of missing/wrong tokens and closure after first account creation. Production build, TypeScript and targeted ESLint pass. Existing owner accounts were not changed.

All test accounts/appointments are confined to `.test-data/`. No default password, deployment, DNS change or external notification was performed. Public booking and availability are fully implemented locally. Serverless production requires BOOKING_DATABASE_URL / BOOKING_DATABASE_AUTH_TOKEN for durable remote libSQL. Every environment now requires a private random ADMIN_SETUP_TOKEN of at least 32 characters for first-account provisioning, including localhost; without it setup is closed. Existing owner accounts are preserved. Local/private persistent SQLite is used on development or a regular Node server.

Notifications are inside the admin dashboard: pending/proposed counts, detection of new requests on refresh, and periodic visible-tab polling. Actual email/SMS/third-party messaging is not enabled. Consultations default to 60-minute hourly sessions, Vietnam timezone and a 90-day booking window.
