# Implementation Plan: Sarah Reader

**Date**: 2026-11-21 | **Spec**: [spec.md](spec.md)

## Summary
Adapt the reference into a working responsive blue-and-white website. Keep App Router, existing contacts and tools; add Lenormand booking and truthful request/copy states.

## Technical Context
TypeScript, Next.js 16.3.5, React 19.3, CSS, lucide-react, local @fontsource Cormorant Garamond / Allura / DM Sans. Browser acceptance uses existing puppeteer-core. No new backend/storage. Target 360px–desktop, keyboard and touch.

## Constitution Check
PASS: reference palette and fonts preserved; all five services and real booking journeys planned; no fake prices/testimonials; date-aware campaign and clipboard fallback; no deployment or domain-registration claims. Rechecked after design: PASS.

## Project Structure
- `src/lib/site.ts`: shared branding, services, contacts and campaign status.
- `src/components/service-symbol.tsx`: matching thin-line celestial service art.
- `src/components/site-header.tsx`: Sarah identity and responsive navigation.
- `src/app/page.tsx`: hero, five services, campaign, online format, reader introduction, tools, FAQs and footer.
- `src/app/globals.css`: responsive blue/white typography, decoration and booking styles.
- `src/components/booking-form.tsx`: validated request preparation, copy fallback and editing.
- `src/app/booking/page.tsx`: Sarah booking layout.
- `src/app/layout.tsx`, sitemap and public robots/manifest: canonical Sarah branding.
- `public/css/sarah-theme.css`: preserve existing tool markup while matching new palette.
- `public/img/sarah-seaside.webp`: generated decorative still life.
- `scripts/check-sarah.mjs`: meaningful browser journey coverage.

## Execution
1. Run acceptance test against existing website and observe old-brand failure.
2. Implement shared data and complete landing page.
3. Update booking and metadata, keep old service slugs valid.
4. Theme existing tools without changing their reading engines.
5. Run lint/typecheck/build and browser journey checks; visually inspect desktop/mobile; record evidence.

## Risks
Owner must connect domain independently. Existing reading engines and external contact apps remain external dependencies. Generated imagery is decorative; all text and controls remain accessible HTML. Contact request is user-sent, not automatically persisted.
