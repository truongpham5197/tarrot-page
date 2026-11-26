import { isServiceCode, unsureCode, unsureLabelVi } from "@/lib/catalog";
import { vi } from "@/lib/i18n/messages/vi";

/** Labels that earlier versions of the site stored in the database / sent from old clients. */
const legacyLabels = [
  "Tarot 1 câu hỏi",
  "Tarot chuyên sâu",
  "Lenormand",
  "Chiêm tinh học",
  "Matrix Destiny",
  "Solar Return Chart",
  "Thần số học",
  "Combo cá nhân",
  "Tarot",
];

/**
 * Turn what the client sent (a stable service code, "unsure", or an older
 * Vietnamese label) into the canonical Vietnamese label that is stored in the
 * database and shown to Sarah in the admin. Returns null when unknown.
 */
export function resolveServiceLabel(value: string): string | null {
  if (isServiceCode(value)) return vi.services[value].title;
  if (value === unsureCode) return unsureLabelVi;
  const known = new Set<string>([
    unsureLabelVi,
    ...legacyLabels,
    ...Object.values(vi.services).map((service) => service.title),
  ]);
  return known.has(value) ? value : null;
}
