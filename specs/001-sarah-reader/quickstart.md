# Run and verify

1. `npm install`
2. `npm run dev` — open http://localhost:3000.
3. `npm run lint`, `npx tsc --noEmit`, `npm run build`.
4. With dev server running: `node scripts/check-sarah.mjs` and `$env:TARGET_URL='http://localhost:3000/booking'; npm run test:consent`.
5. Inspect desktop and mobile screenshots; choose each of five services, expand FAQ, test required fields, deny clipboard, re-edit request and open existing tool routes.

The configured canonical domain is sarahreader.com. Connecting that domain to hosting is a separate infrastructure operation.
