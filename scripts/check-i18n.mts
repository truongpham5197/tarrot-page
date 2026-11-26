import assert from "node:assert/strict";
import {
  formatPrice,
  formatUsd,
  formatVnd,
  isServiceCode,
  lowestPrice,
  serviceGroups,
  services,
  unsureCode,
  unsureLabelVi,
} from "../src/lib/catalog.ts";
import { localePath, locales, splitLocale } from "../src/lib/i18n/config.ts";
import { fill, getDictionary } from "../src/lib/i18n/dictionaries.ts";
import { resolveServiceLabel } from "../src/lib/service-resolve.ts";

const vi = getDictionary("vi");
const en = getDictionary("en");

// Same shape in both languages: every key present, same array lengths, strings only.
function shape(value: unknown, path: string, out: string[]) {
  if (Array.isArray(value)) {
    out.push(`${path}[${value.length}]`);
    value.forEach((item, index) => shape(item, `${path}[${index}]`, out));
  } else if (value && typeof value === "object") {
    for (const key of Object.keys(value).sort())
      shape((value as Record<string, unknown>)[key], `${path}.${key}`, out);
  } else {
    out.push(`${path}:${typeof value}`);
  }
}
const viShape: string[] = [],
  enShape: string[] = [];
shape(vi, "dict", viShape);
shape(en, "dict", enShape);
const onlyVi = viShape.filter((item) => !enShape.includes(item));
const onlyEn = enShape.filter((item) => !viShape.includes(item));
// Vietnamese-only content (the games corner) may be empty in English; arrays differ in length only there.
// SEO keyword lists are written per language and may differ in length.
const tolerated = (item: string) =>
  item.startsWith("dict.home.explore") || /\.keywords\[\d+\]/.test(item);
assert.deepEqual(
  onlyVi.filter((item) => !tolerated(item)),
  [],
  "keys missing from en",
);
assert.deepEqual(
  onlyEn.filter((item) => !tolerated(item)),
  [],
  "keys missing from vi",
);

// Every catalog entry is translated in both languages.
for (const dict of [vi, en]) {
  for (const service of services) {
    const copy = dict.services[service.code];
    assert(copy?.title && copy.description, `service copy ${service.code}`);
    assert(
      dict.deliveries[service.delivery] !== undefined,
      `delivery ${service.delivery}`,
    );
    for (const price of service.prices)
      assert(dict.units[price.unit], `unit ${price.unit}`);
  }
  for (const group of serviceGroups)
    assert(dict.groups[group]?.title, `group ${group}`);
  for (const [code] of dict.home.cards.map((card) => [card.code])) {
    assert(isServiceCode(code), `home card code ${code}`);
  }
}
assert.equal(new Set(services.map((s) => s.code)).size, services.length);
assert.equal(services.length, 15);

// No leftover placeholders other than the documented {from}/{title}/{day}-style tokens.
const allowed = new Set(["from", "title", "day", "month", "count", "tz"]);
for (const [name, dict] of [
  ["vi", vi],
  ["en", en],
] as const) {
  for (const match of JSON.stringify(dict).matchAll(/\{(\w+)\}/g))
    assert(allowed.has(match[1]), `${name}: unexpected token {${match[1]}}`);
}

// Prices and money formatting.
assert.equal(lowestPrice, 20000);
assert.equal(formatVnd(20000, "vi"), "20.000đ");
assert.match(formatVnd(20000, "en"), /20,000 VND/);
assert.match(formatUsd(26000), /\$1/);
assert.equal(formatPrice(20000, "vi"), "20.000đ");
assert.match(formatPrice(20000, "en"), /^20,000 VND \(≈ \$/);
assert.equal(fill("a {x} b {x} {y}", { x: 1, y: "z" }), "a 1 b 1 z");

// Locale paths: Vietnamese stays at the root.
assert.deepEqual([...locales], ["vi", "en"]);
assert.equal(localePath("vi", "/booking"), "/booking");
assert.equal(localePath("en", "/booking"), "/en/booking");
assert.equal(localePath("en", "/"), "/en");
assert.equal(localePath("en", "/#faq"), "/en#faq");
assert.equal(localePath("vi", "/"), "/");
assert.deepEqual(splitLocale("/en/pricing"), { lang: "en", path: "/pricing" });
assert.deepEqual(splitLocale("/en"), { lang: "en", path: "/" });
assert.deepEqual(splitLocale("/booking"), { lang: "vi", path: "/booking" });

// The booking API accepts codes and legacy labels; the DB keeps the Vietnamese title.
for (const service of services)
  assert.equal(resolveServiceLabel(service.code), vi.services[service.code].title);
assert.equal(resolveServiceLabel(unsureCode), unsureLabelVi);
assert.equal(resolveServiceLabel(unsureLabelVi), unsureLabelVi);
for (const legacy of ["Tarot", "Lenormand", "Tarot 1 câu hỏi", "Chiêm tinh học"])
  assert(resolveServiceLabel(legacy), `legacy label ${legacy}`);
assert.equal(resolveServiceLabel("<script>"), null);

console.log("PASS: i18n dictionaries, catalog, money formatting, locale paths and service resolution.");
