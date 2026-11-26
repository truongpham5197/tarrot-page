# Plan: customer scheduling and admin
1. Remove seasonal campaign; replace with evergreen three-step booking card.
2. Add shared types/time validation, private SQL connection/schema, appointment service and password/session authentication.
3. Add public free-slot/create-request APIs and protected admin authentication, booking and slot APIs with same-origin guards and error handling.
4. Build monthly customer calendar with available-hour selection and alternative-time form; save directly and show durable request reference.
5. Build admin first setup/sign-in, appointment list/search/status filters/details, status/reschedule/private-note editor and availability publisher. Poll for new requests every 30 seconds while visible.
6. Cover database reservation races, proposal conflicts, cancellation, idempotency, auth and HTTP access boundaries; run complete browser journeys and existing regression checks.

## Technical choices
Existing Next.js 16.3.5 App Router; read installed route-handler, cookies and authentication guides. @libsql/client supports a local SQLite development file and remote libSQL in serverless production. Parameterized SQL, write transactions and unique active-reservation indexes protect slots. Node crypto scrypt for passwords, random opaque sessions hashed in SQL; no browser-stored auth credentials. All protected data access checks sessions at the API boundary.

## Constitution check
Retain reference styling and real contacts. Replace prepared-message-only booking with actual persisted requests; no automatic confirmation claim. Do not publish real availability until owner creates it. Store private data outside public/ and fail closed if durable production storage is missing.
