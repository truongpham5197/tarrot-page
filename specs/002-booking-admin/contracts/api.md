# API contracts
All replies use no-store/private cache headers. Mutations require matching Origin. Admin requests require a valid HttpOnly session; anonymous requests get 401. No customer details in public APIs.

- GET /api/booking-slots → slots [{id,date,time,startsAt}], timezone, durationMinutes. Future free published slots only.
- POST /api/bookings → name, contact, optional email/note, service label, consent=true, UUID requestKey, mode=slot plus slotId OR mode=proposal plus date/time. 201 returns reference/status/date/time/service. Retry requestKey returns the existing receipt. A taken slot returns 409.
- GET /api/admin/auth → authentication and first-setup availability; only signed-in callers receive their admin email.
- POST /api/admin/auth → email/password. Sets revocable session cookie.
- DELETE /api/admin/auth → revokes session and clears cookie.
- POST /api/admin/setup → email/password plus setupToken on production. Creates account once, rejects subsequent setup with 409.
- GET /api/admin/bookings → private bookings and future active slots with occupied markers.
- PATCH /api/admin/bookings/:id → status, version, optional date/time/adminNote. 409 on stale version/conflict; validates status transitions.
- POST /api/admin/slots → date, times[]. Publish or reopen future hourly slots.
- DELETE /api/admin/slots → id. Close unused slot; occupied slot returns 409.

400 malformed/invalid input; 403 cross-origin or invalid setup access; 413 oversized body; 415 invalid content type; 429 throttle; 503 storage/server issue with honest failure UI.
