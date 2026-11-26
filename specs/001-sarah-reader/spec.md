# Feature Specification: Sarah Reader reference redesign

**Created**: 2026-11-21
**Status**: Ready for implementation
**Input**: Update the existing website to match the attached artwork, name it sarahreader.com, preserve the pictured colors, fonts and functions, and apply Spec Kit.

## User Scenarios & Testing

### User Story 1 — Discover Reader Sarah (P1)
Visitors see a pale blue and white floral seaside design, handwritten accents and elegant Vietnamese serif typography. Hero: “Đôi khi, chỉ một câu hỏi cũng có thể mở ra một góc nhìn mới”.
**Independent test**: inspect homepage on desktop and mobile.
**Acceptance**: Reader Sarah / sarahreader.com branding; all five services in reference order: Tarot, Lenormand, Chiêm tinh học, Matrix Destiny, Solar Return Chart; navigation and mobile menu work.

### User Story 2 — Choose a consultation (P1)
Visitors choose one question or a deeper reading, then prepare a private online booking via established Zalo/Facebook contacts.
**Independent test**: select Lenormand, complete required fields and consent, prepare request, copy or manually select summary.
**Acceptance**: service preselected; invalid submissions blocked; summary includes Sarah and chosen service; clipboard denial gives accurate fallback; appointment remains pending agreement; past dates blocked.

### User Story 3 — Understand the offer and explore (P2)
Visitors read the pictured 18–20/10 campaign (one question plus 10% off deep consultation), online format and explore existing reading tools.
**Independent test**: open offer, service links, FAQs and tools.
**Acceptance**: campaign dates and current availability are explicit; FAQs expand; existing Tarot, astrology, numerology, Matrix and Solar Return routes work.

### Edge Cases
- Mobile: reflow five services without horizontal page overflow.
- Clipboard denied/unavailable: selectable summary and manual-copy instructions.
- Popup blocked: explicit Zalo and Facebook links remain available.
- Unknown service query: select the consultation guidance option.
- Outside Oct 18–20: label pictured promotion as past and invite contact for current offers.

## Requirements
- FR-001: Pale sky blue, white, readable ink blue on homepage, booking and existing tools.
- FR-002: Vietnamese-capable serif and handwritten fonts, subtle celestial motifs and floral imagery.
- FR-003: All five pictured services including Lenormand have descriptions and booking links.
- FR-004: Preserve contacts and reading tools; no fabricated testimonials/prices.
- FR-005: Validate required booking data, email, consent and dates; truthful clipboard state.
- FR-006: Titles, social metadata, sitemap and robots use https://sarahreader.com.
- FR-007: Show dated one-question / 10% offer with accurate availability.
- FR-008: Navigation, FAQs and contact actions support keyboard and touch.

### Key Entities
- Service: stable slug, display label, summary, optional existing exploration route.
- Booking request: name, contact, optional email, service, online format, optional date/note. Prepared locally and sent by the visitor through existing contacts.
- Campaign: Oct 18–20, one question and 10% off deep reading, date-aware status.

## Success Criteria
- SC-001: All five service booking links select the correct option.
- SC-002: Zero horizontal document overflow at 360, 390, 768 and 1440px.
- SC-003: Navigation and FAQs work with no browser errors in core journeys.
- SC-004: Metadata and structured data consistently use Sarah Reader / sarahreader.com.
- SC-005: Visitor can prepare a request and recover from denied clipboard access without losing data.

## Assumptions
- Screenshot defines visual direction and copy, adapted into a responsive website.
- Existing Zalo and Facebook contacts remain the owner's contacts.
- New consultation design advertises online; existing numerology tools remain additional tools.
- Domain registration, DNS and production deployment are outside this local code change.
