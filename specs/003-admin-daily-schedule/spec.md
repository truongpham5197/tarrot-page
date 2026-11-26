# Admin daily schedule, readable figures and contact consistency
Created: 2026-11-21. Status: Ready.

User requests: fix oversized focus borders and hard-to-read admin figures, show a manageable day-by-day schedule, and use Sarah's existing phone/Zalo and Facebook from the old source.

## Acceptance
- Admin opens on a daily agenda with a date picker, previous/next day, Today, and a seven-day navigator. Hours show confirmed/pending/completed appointments, genuinely published free slots and unopened time separately.
- Proposals do not occupy the timeline; show them in a separate panel for the selected date. Cancelled records are history and do not occupy hours. Clicking any appointment/proposal opens the existing authenticated detail editor.
- Owner can jump from a selected day to availability publication for that same day. Existing list/search/filter and secured admin provisioning continue to work.
- Statistical and calendar digits use readable sans-serif tabular numerals. Text-field focus uses the input/container border and a soft ring, without a displaced inner rectangle; keyboard controls retain visible focus.
- Public contacts use the old index.html values: telephone/Zalo 0328052889, displayed 0328 052 889, Zalo https://zalo.me/0328052889 and Facebook https://www.facebook.com/misocduabeonhuheo. Expose phone, Zalo and Facebook in footer and booking support; use one shared configuration.
- Desktop and mobile have no horizontal document overflow. No owner data/account modifications during testing.

## Assumptions
Retain the existing hourly 08:00–21:00 / 60-minute Vietnam-time model. Use already protected booking/slot data. Historical slot availability includes the last 90 days; public bookable slots stay future-only. No authentication or notification-channel expansion.
