# Feature Specification: Customer appointments and Sarah admin

**Created**: 2026-11-21
**Status**: Ready
**Input**: Remove the October promotion. Add an admin appointment manager. Customers select admin-published availability or propose a different date/time, notifying the admin for confirmation.

## User Scenarios & Testing
### US1 — Book an open time (P1)
A visitor selects a service, sees a calendar of published free slots, picks one, enters contact details and submits. A durable pending appointment is created and a reference is shown. That slot stops being offered immediately.
Acceptance: unauthenticated visitors can create but never list/read other appointments. Two concurrent requests cannot reserve the same slot. Failed requests preserve the form and offer retry. No booking is reported saved before persistence succeeds.

### US2 — Propose another time (P1)
A visitor can choose “Đề xuất thời gian khác”, specify a future date and time, and send their request. It appears in admin as a proposal/new request. A proposal does not reserve a time until the admin confirms it.
Acceptance: proposals are clearly distinct from reserved slots; admin sees them with service/contact/notes and can confirm, reschedule or cancel. Confirmation must check conflicts atomically.

### US3 — Manage consultations (P1)
Sarah signs in to /admin, sees pending/proposed/today counts and upcoming appointments, filters/searches bookings, opens details, confirms, reschedules, adds private notes, completes or cancels. New requests appear on refresh and periodic polling with an in-app notice.
Acceptance: every read/mutation requires a valid server session, notes are private, concurrent stale updates are rejected, cancellation frees the reserved slot, changes survive restart.

### US4 — Publish available hours (P1)
Admin selects a date and one or more hourly time slots, publishes them and can close unused slots. Occupied slots cannot be silently deleted. Public calendar immediately reflects availability.
Acceptance: past/overlapping hours rejected; dates/times consistently use Asia/Ho_Chi_Minh. Default consultation length is 60 minutes.

### US5 — Remove obsolete campaign (P1)
Homepage, navigation and FAQs contain no 20/10 offer, 10% discount or expired campaign. Retain the blue-white design and replace that section with evergreen booking guidance.

## Edge Cases
No slots: show an empty calendar and offer the proposal mode. Invalid service, date, email, missing consent, overlong bodies: reject on server. Malformed JSON: 400. Missing/invalid session: 401. Cross-origin mutations: 403. Reserved slot/stale update: 409. Database unavailable: honest 503, no successful-looking receipt. Repeated submission key: same receipt, one record.

## Requirements
- FR001: Remove obsolete promotion from live pages.
- FR002: Persist bookings and availability in SQL, with atomic reservation/conflict checks and idempotent creation.
- FR003: Public calendar exposes only free slot IDs, dates and times; customer details never appear in public APIs.
- FR004: Implement both confirmed-by-admin open-slot requests and alternative-time proposals.
- FR005: Protect admin UI and all management APIs with hashed-password authentication and revocable HttpOnly sessions. No shipped/default password.
- FR006: First account setup is disabled in every environment, including localhost, unless the owner configures a private random setup token of at least 32 characters. Creating the first account requires that token; setup closes after account creation. No public registration link.
- FR007: Admin can publish/close slots, filter/search appointments, view contacts, change status/time and maintain private notes.
- FR008: New requests/proposals are notified inside admin through badges and periodic refresh. External email/SMS sending is out of scope.
- FR009: Validate input, throttle public/auth requests, reject cross-origin mutations, do not cache private appointment data.
- FR010: Preserve mobile layout, Vietnamese typography, existing five-service selections and legacy exploration tools.

## Success Criteria
Customers can complete each booking mode and obtain a stored reference; admin can sign in, see it and change its state. Exactly one competing reservation succeeds per slot. Anonymous access discloses no PII. Cancelled reservations release slots. No campaign copy remains in served app source. Build, lint, typecheck and complete browser journeys pass.

## Assumptions
One reader/admin owner, 60-minute hourly appointments, Vietnam time. No payment or automated external notifications. Local development uses a private SQLite file; serverless production requires a configured durable remote libSQL/Turso database and must never silently fall back to temporary files. No deployment is requested.
