# Quickstart
1. `npm install`, `npm run dev`.
2. Owner sets a private random ADMIN_SETUP_TOKEN (32+ characters) in the server environment and restarts the app. Without it, setup is locked even on localhost. The owner opens /admin/setup, enters this private token and chooses email/password (12+ characters). Remove the token after account creation. No default credentials and no public signup link.
3. In admin, open Giờ trống, choose a future date and publish some hours.
4. Open /booking in a separate session. Choose a published slot or select Đề xuất thời gian khác. Submit valid details and consent; keep the saved SR- reference.
5. Refresh admin; view the new request, confirm, reschedule or cancel. No external notification is sent automatically.

Development data: private `.data/sarah.db`. Serverless production: configure BOOKING_DATABASE_URL and BOOKING_DATABASE_AUTH_TOKEN for durable remote libSQL/Turso, plus ADMIN_SETUP_TOKEN for one-time account creation. See `.env.example` and README. Do not use a temporary SQLite file on Vercel.

Verification: npm run test:appointments; npm run lint; npx tsc --noEmit; npm run build. Browser regression uses test:sarah and test:consent with the corresponding TARGET_URL. Full test:booking-browser requires a separate server/database and explicit ALLOW_APPOINTMENT_TESTS=1; it creates test bookings and an account. Run only on isolated test storage.
