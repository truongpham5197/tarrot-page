/* ===== Card Art — ảnh thật bộ Rider-Waite-Smith (public domain, Wikimedia Commons) ===== */
const CARDART = (() => {
  const BASE = location.pathname.includes("/games/") ? "../" : "";
  const SUIT_DIR = ["wands", "cups", "swords", "pentacles"];
  function src(card) {
    if (card.id < 22) return `${BASE}img/cards/major-${String(card.id).padStart(2, "0")}.jpg`;
    const idx = card.id - 22;
    const suit = SUIT_DIR[Math.floor(idx / 14)];
    const rank = String((idx % 14) + 1).padStart(2, "0");
    return `${BASE}img/cards/${suit}-${rank}.jpg`;
  }
  return { src };
})();
