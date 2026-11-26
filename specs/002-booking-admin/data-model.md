# Data model
- appointment_slots: UUID, unique UTC start, UTC end, active flag. Public availability excludes reserved slots and past hours.
- appointments: UUID, unique public reference, unique client request key, customer name/contact/email, service label, customer note, private admin note, original booking mode, lifecycle status, optional slot foreign key, requested/scheduled UTC start/end, created/updated timestamps and version.
- Statuses: proposed → confirmed/cancelled; pending → confirmed/cancelled; confirmed → rescheduled confirmed/completed/cancelled. Completed/cancelled records are terminal in this release.
- Partial unique active-slot index protects pending/confirmed/completed reservations. Write transactions handle create, proposal acceptance and rescheduling; optimistic version checks reject stale admin changes.
- appointment_admin: one singleton ID 1 with normalized email and salted scrypt digest. No seeded production account.
- admin_sessions: opaque token digest, admin foreign key, expiry. Logout deletes the session.
- request_limits: hashed address/purpose, window counter and reset time; persisted throttling for login, setup and booking.

Proposal records contain requested time without reserving it. Cancellation excludes the previous slot from active reservations, so it becomes publicly selectable again. Admin rescheduling creates/reuses the new slot and atomically moves the reservation.
