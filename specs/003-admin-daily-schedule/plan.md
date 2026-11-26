# Implementation plan
1. Add a pure day-schedule grouping helper and tests that distinguish reservations, proposals, cancelled history and published free hours.
2. Add daily schedule component and make it admin's default tab; keep the appointment list and availability tabs, reuse the detail editor, pass selected day into availability.
3. Include recent historical active slots in protected admin data, while availability publication continues showing future slots only.
4. Refine scoped form focus rings and switch statistics/times/counts to readable tabular sans numerals.
5. Centralize the existing old-source phone and display name with the retained Zalo/Facebook links, reuse on public contact surfaces.
6. Extend isolated browser tests for agenda navigation/details, proposal non-reservation, focus styling, numerals, contact links and mobile layout. Run backend regressions, TypeScript, lint and production build.
