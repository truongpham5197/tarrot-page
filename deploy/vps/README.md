# Sarah Reader VPS deployment

Production: **https://sarahreader.com**. Admin: **https://sarahreader.com/admin**. `www` redirects to the canonical domain.

## Runtime
- VPS: 36.50.55.41, Ubuntu, Docker Compose and the existing shared Caddy reverse proxy.
- App directory: `/opt/sarahreader`; compose file: `/opt/sarahreader/compose.yaml`.
- Container: `sarahreader-web`, non-root user, private Docker-network port 3000; no public application port.
- PostgreSQL 16 runs in the shared `infra-postgres-1` container. The app uses its own `sarahreader` database and login role over `infra_internal`.
- Runtime credentials: `/opt/sarahreader/.env.production`, permissions 0600. Never commit or put them in the Docker build context.
- Current release: `sarahreader:20261123-calendar`, Linux amd64. Local Docker builds avoid using the shared VPS's build memory.

The PostgreSQL cutover copied and verified the production SQLite records in a single transaction. It preserved the original owner account, booking, published slots and session records, and added a second administrator. Admin setup remains locked. The final SQLite snapshot is in `/opt/sarahreader/backups/sarah-pre-postgres-*.sqlite3`.

## Updating the app
Build the Linux image locally, save/compress it, transfer it using SSH, then load it on the VPS. Use a new release tag, update only `SARAH_IMAGE` in `/opt/sarahreader/.env`, and run:

```sh
cd /opt/sarahreader
python3 backup.py
docker compose --file compose.yaml up -d --wait
docker compose --file compose.yaml ps
```

The Dockerfile uses Next.js standalone output and includes public/static assets. `.dockerignore` excludes environment files, databases, SSH keys, tests and development artifacts. Set the PostgreSQL `BOOKING_DATABASE_URL` in `.env.production` and preserve the production database across releases.

## Domain and HTTPS
Cloudflare DNS was configured in the owner's existing Chrome session:
- A `@` → `36.50.55.41`, DNS only.
- CNAME `www` → `sarahreader.com`, DNS only.
- SSL/TLS encryption setting: Full (strict).

Caddy issues and renews valid public certificates for both names. The Sarah block from `Caddyfile` was appended to `/opt/infra/Caddyfile`, with a pre-change backup under `/opt/infra/backups/`. Validate the shared Caddy configuration before any reload; do not replace other applications' blocks. DNS-only mode currently sends traffic directly to Caddy; Cloudflare's TLS setting is ready if proxying is enabled later.

Admin and booking APIs return no-store headers. Same-origin validation and Secure-cookie decisions use the external Host and proxy-provided scheme so HTTPS works correctly behind Caddy. The application container is reachable only through the private proxy network.

## Database backups
`/etc/cron.d/sarahreader-backup` runs `backup.py` at 20:15 UTC (03:15 Vietnam time). It keeps seven PostgreSQL archives in `/opt/sarahreader/backups/` and verifies that `pg_restore` can read each new archive. The directory has permissions 0700 and archives have permissions 0600.

Run `python3 /opt/sarahreader/backup.py` for a manual backup. For recovery, back up the active database and restore the chosen archive to a separate database using `pg_restore --no-owner --role=sarahreader`. Verify the restored records before pointing Sarah Reader at the restored database and recreating the web container. Once production has written to PostgreSQL, switching it back to the old SQLite file would discard those updates.

## First-release verification
- Linux container production build, full isolated customer/admin browser flow and native database operations passed before upload.
- Origin HTTPS certificate validation passed; homepage, booking, login and public slot API returned 200.
- Anonymous admin data returned 401; disabled account setup returned 403; same-origin admin mutation reached authentication rather than being falsely rejected by proxy origin handling.
- Existing data preserved: one admin, one booking and four published slots at cutover. Database integrity was `ok`.
- Container health is `healthy`; restart policy `unless-stopped`; private persistent data mount verified.
- Public readonly browser regressions and consent checkbox passed with valid TLS. Host mapping was used only in the isolated test browsers because the development machine's DNS resolver cached an earlier negative answer; public Cloudflare, Google and Quad9 resolvers all resolved both domain names correctly, and public HTTPS worked from the VPS.
- `www` HTTPS redirects with 301; HTTP redirects to HTTPS. A verified backup was created after deployment.

Other running VPS applications were not rebuilt or stopped.

## Calendar release — 2026-11-23
- Deployed `sarahreader:20261123-calendar` with week/day calendar, 30-minute start choices, 60-minute consultations, overlap protection and normalized phone history search.
- Verified PostgreSQL backup `sarah-20261123T033551Z.dump` before release. Previous image remains `sarahreader:20261121-postgres`; previous image selection is saved in `/opt/sarahreader/.env.before-20261123-calendar`.
- Uploaded image archive SHA-256 matched locally and remotely. Compose health check passed after replacing only the web container.
- Counts remained unchanged across deployment: one appointment, two admin accounts, four published slots.
- HTTPS homepage, booking, admin login and availability returned 200. Anonymous admin data returned 401 with no-store; anonymous `/admin` redirected to login. Live Chrome checks found no page errors.
- Before release, calendar geometry/availability tests, daily schedule tests, full isolated booking/admin browser regression and Linux Docker production build passed.
