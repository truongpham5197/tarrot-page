import { defaultLocale, type Locale } from "@/lib/i18n/config";

/**
 * Reference exchange rate used ONLY to show an approximate USD figure next to
 * the VND price (for overseas / Việt kiều visitors). Change it here when the
 * market rate drifts. VND stays the real price.
 */
export const vndPerUsd = 26000;

export type ServiceGroup = "cards" | "self" | "love" | "astro";
export const serviceGroups: ServiceGroup[] = ["cards", "self", "love", "astro"];

export type PriceUnit =
  | "spread"
  | "question"
  | "questions5"
  | "topic5"
  | "min30"
  | "min60"
  | "file"
  | "fileOrCall";

export type Delivery = "file5" | "file7" | "fileOrCall5" | "none";

export type Service = {
  /** Stable code. Used in URLs (?service=), forms and API. Never translate. */
  code: string;
  group: ServiceGroup;
  symbol: "tarot" | "lenormand" | "astrology" | "matrix" | "solar";
  delivery: Delivery;
  prices: { unit: PriceUnit; vnd: number }[];
};

export const services = [
  // Tarot & Lenormand
  {
    code: "tarot-one-question",
    group: "cards",
    symbol: "tarot",
    delivery: "none",
    prices: [
      { unit: "question", vnd: 20000 },
      { unit: "questions5", vnd: 80000 },
    ],
  },
  {
    code: "tarot-spread",
    group: "cards",
    symbol: "tarot",
    delivery: "none",
    prices: [{ unit: "spread", vnd: 50000 }],
  },
  {
    code: "lenormand",
    group: "cards",
    symbol: "lenormand",
    delivery: "none",
    prices: [{ unit: "spread", vnd: 40000 }],
  },
  {
    code: "tarot-lenormand-topic",
    group: "cards",
    symbol: "lenormand",
    delivery: "none",
    prices: [{ unit: "topic5", vnd: 240000 }],
  },
  {
    code: "tarot-lenormand-session",
    group: "cards",
    symbol: "tarot",
    delivery: "none",
    prices: [
      { unit: "min30", vnd: 200000 },
      { unit: "min60", vnd: 350000 },
    ],
  },
  {
    code: "read-others",
    group: "cards",
    symbol: "tarot",
    delivery: "none",
    prices: [{ unit: "question", vnd: 70000 }],
  },
  // Self-discovery & career
  {
    code: "career-aptitude",
    group: "self",
    symbol: "astrology",
    delivery: "fileOrCall5",
    prices: [{ unit: "fileOrCall", vnd: 300000 }],
  },
  {
    code: "self-discovery",
    group: "self",
    symbol: "astrology",
    delivery: "none",
    prices: [{ unit: "min60", vnd: 300000 }],
  },
  {
    code: "numerology",
    group: "self",
    symbol: "matrix",
    delivery: "file5",
    prices: [{ unit: "file", vnd: 200000 }],
  },
  {
    code: "matrix-destiny",
    group: "self",
    symbol: "matrix",
    delivery: "file5",
    prices: [{ unit: "file", vnd: 130000 }],
  },
  // Couples
  {
    code: "matrix-couple",
    group: "love",
    symbol: "matrix",
    delivery: "file5",
    prices: [{ unit: "file", vnd: 250000 }],
  },
  {
    code: "past-life-basic",
    group: "love",
    symbol: "astrology",
    delivery: "file5",
    prices: [{ unit: "file", vnd: 250000 }],
  },
  {
    code: "past-life-deep",
    group: "love",
    symbol: "astrology",
    delivery: "file5",
    prices: [{ unit: "file", vnd: 350000 }],
  },
  // Astrology
  {
    code: "solar-return",
    group: "astro",
    symbol: "solar",
    delivery: "fileOrCall5",
    prices: [{ unit: "fileOrCall", vnd: 300000 }],
  },
  {
    code: "astrology",
    group: "astro",
    symbol: "astrology",
    delivery: "file7",
    prices: [{ unit: "file", vnd: 1000000 }],
  },
] as const satisfies readonly Service[];

export type ServiceCode = (typeof services)[number]["code"];

/** Placeholder option in the booking form when the visitor is not sure yet. */
export const unsureCode = "unsure";
export const unsureLabelVi = "Chưa chắc — cần tư vấn";

export function isServiceCode(value: unknown): value is ServiceCode {
  return services.some((service) => service.code === value);
}

export function minPrice(service: Pick<Service, "prices">): number {
  return Math.min(...service.prices.map((price) => price.vnd));
}

/** "50.000đ" (vi) or "50,000 VND" (en). */
export function formatVnd(vnd: number, lang: Locale): string {
  if (lang === defaultLocale)
    return `${vnd.toLocaleString("vi-VN")}đ`;
  return `${vnd.toLocaleString("en-US")} VND`;
}

/** Approximate USD for reference: "$1.5", "$8", "$38". */
export function formatUsd(vnd: number): string {
  const usd = vnd / vndPerUsd;
  const value = usd < 5 ? Math.round(usd * 10) / 10 : Math.round(usd);
  return `$${value}`;
}

/** Price for display: "20.000đ" (vi) or "20,000 VND (≈ $0.8)" (en). */
export function formatPrice(vnd: number, lang: Locale): string {
  if (lang === defaultLocale) return formatVnd(vnd, lang);
  return `${formatVnd(vnd, lang)} (≈ ${formatUsd(vnd)})`;
}

/** Lowest price across the whole catalog (used for "from …" in copy and meta). */
export const lowestPrice = Math.min(...services.map(minPrice));
