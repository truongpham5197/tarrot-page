# Validation — 2026-11-21

## Automated checks

- `npm run build`: PASS. Next.js 16.3.5 compiled and generated homepage, icon, sitemap; booking and existing API remain dynamic routes.
- `npx tsc --noEmit`: PASS, exit 0.
- `npm run lint`: PASS, exit 0; 0 errors, 43 pre-existing warnings in the unchanged shared reading-engine JavaScript files. No new warnings in Sarah components.
- `npm run test:sarah` against development localhost:3000: PASS.
- Same browser journey test against production `next start` localhost:3001: PASS.
- `npm run test:consent` against development and production: PASS. Native appearance remains auto, 16×16px, starts unchecked and toggles visibly.
- `git diff --check`: PASS (only local Git line-ending notices).

## Acceptance coverage

- Sarah page title and canonical domain.
- Exactly five visible service cards, correct booking link destinations, all five query-selected options.
- Unknown service safely defaults to consultation guidance.
- Homepage fits 360, 390, 768 and 1440px widths without horizontal document overflow.
- FAQ expands; mobile navigation opens, closes on selection and closes with Escape.
- Empty/whitespace name, invalid email and past date rejected by native form validity.
- Valid request includes SARAH READER, entered name and Lenormand.
- Denied clipboard displays manual-copy instructions; successful copy reports success and contains the expected summary.
- Editing a prepared request preserves entered name and form state.
- All six existing public exploration routes return 200; no page JavaScript errors observed in tested journeys.

## Visual inspection

Inspected the homepage in Orca's browser at desktop and 390px mobile, including a full-page mobile capture; inspected the re-themed exploration homepage. Verified blue/white seaside art, Vietnamese serif and handwritten typography, celestial five-service symbols, dated campaign card, online consultation, reader section, FAQs and footer. The generated optimized WebP is 1536×1024 and 87,948 bytes. Handwritten/serif fonts contain Vietnamese subsets.

## Limits

Canonical/SEO domain configuration does not register a domain, change DNS or publish the site. Zalo/Facebook requests must be sent by the visitor and accepted by Sarah; no appointment storage or automatic confirmation was introduced. The pictured October 2026 campaign is explicitly marked ended. Existing reading algorithms and external AI configuration were left intact.
