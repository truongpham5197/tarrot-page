import type { Locale } from "./config";
import { en } from "./messages/en";
import { vi, type Dictionary } from "./messages/vi";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { vi, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

/** Replace `{token}` placeholders. Dictionaries hold plain strings (no functions) so they can cross into client components. */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
