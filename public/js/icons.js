/* ===== Bộ icon SVG nét vàng — thay emoji cho sắc nét, đồng bộ mọi máy ===== */
const ICONS = {
  crystal: '<circle cx="12" cy="10" r="7"/><path d="M6.5 20.5h11l-1.6-3.2H8.1z"/><path d="M8.6 7.6a4.2 4.2 0 0 1 2.9-2.6"/><path d="M14.5 10.5l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5z" fill="currentColor" stroke="none"/>',
  moon: '<path d="M15.2 3.4a8.6 8.6 0 1 0 5.4 13.8A7 7 0 0 1 15.2 3.4z"/><path d="M18.5 5.5l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4z" fill="currentColor" stroke="none"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  sparkle: '<path d="M12 2.5l1.9 7.6 7.6 1.9-7.6 1.9-1.9 7.6-1.9-7.6L2.5 12l7.6-1.9z"/>',
  cards: '<rect x="3.6" y="4.8" width="10" height="15" rx="1.6" transform="rotate(-11 8.6 12.3)"/><rect x="10" y="3.6" width="10" height="15" rx="1.6" transform="rotate(8 15 11.1)"/><path d="M15.1 8.6l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" fill="currentColor" stroke="none"/>',
  eye: '<path d="M12 3l9.6 17H2.4z"/><path d="M7.4 14.6q4.6-4.6 9.2 0-4.6 4.6-9.2 0z"/><circle cx="12" cy="14.6" r="1.4" fill="currentColor"/>',
  wheel: '<circle cx="12" cy="12" r="9.2"/><circle cx="12" cy="12" r="5.4"/><path d="M12 2.8v3.8M12 17.4v3.8M2.8 12h3.8M17.4 12h3.8M5.5 5.5l2.7 2.7M15.8 15.8l2.7 2.7M5.5 18.5l2.7-2.7M15.8 8.2l2.7-2.7"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>',
  grid9: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><g fill="currentColor" stroke="none"><circle cx="8" cy="8" r="1.2"/><circle cx="12" cy="8" r="1.2"/><circle cx="16" cy="8" r="1.2"/><circle cx="8" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.8"/><circle cx="16" cy="12" r="1.2"/><circle cx="8" cy="16" r="1.2"/><circle cx="12" cy="16" r="1.2"/><circle cx="16" cy="16" r="1.2"/></g>',
  octagram: '<rect x="5.2" y="5.2" width="13.6" height="13.6"/><rect x="5.2" y="5.2" width="13.6" height="13.6" transform="rotate(45 12 12)"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r=".9" fill="currentColor"/>',
  orbit: '<circle cx="12" cy="12" r="3.4"/><ellipse cx="12" cy="12" rx="9.6" ry="4.4" transform="rotate(-24 12 12)"/><circle cx="19.6" cy="8.3" r="1.5" fill="currentColor"/>',
  soundOn: '<path d="M4 9.2h3.4L12.6 5v14l-5.2-4.2H4z"/><path d="M16 9.2a4 4 0 0 1 0 5.6M18.6 6.6a7.6 7.6 0 0 1 0 10.8"/>',
  soundOff: '<path d="M4 9.2h3.4L12.6 5v14l-5.2-4.2H4z"/><path d="M16.2 9.4l4.6 5.2M20.8 9.4l-4.6 5.2"/>',
  music: '<path d="M9 17.6V5.4l11-2.2v12"/><circle cx="6.4" cy="17.6" r="2.6"/><circle cx="17.4" cy="15.2" r="2.6"/>',
  musicOff: '<path d="M9 17.6V5.4l11-2.2v12"/><circle cx="6.4" cy="17.6" r="2.6"/><circle cx="17.4" cy="15.2" r="2.6"/><path d="M3 3l18 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  home: '<path d="M3.5 11.2L12 3.8l8.5 7.4"/><path d="M5.8 9.6V20h12.4V9.6"/><path d="M10 20v-5.2h4V20"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="3.6"/><g fill="currentColor" stroke="none"><circle cx="8.6" cy="8.6" r="1.25"/><circle cx="15.4" cy="15.4" r="1.25"/><circle cx="12" cy="12" r="1.25"/><circle cx="15.4" cy="8.6" r="1.25"/><circle cx="8.6" cy="15.4" r="1.25"/></g>',
  share: '<path d="M12 3.5v11.5M7.4 8.1L12 3.5l4.6 4.6"/><path d="M5 13.5v6.5h14v-6.5"/>',
  book: '<path d="M12 6.4C9.8 4.9 6.8 4.5 3.5 5v13.4c3.3-.5 6.3-.1 8.5 1.4 2.2-1.5 5.2-1.9 8.5-1.4V5c-3.3-.5-6.3-.1-8.5 1.4z"/><path d="M12 6.4v13.4"/>',
  scroll: '<path d="M7 4h11.5a2 2 0 0 1 0 4H17v10a2 2 0 0 1-2 2H5.5a2 2 0 0 1 0-4H7z"/><path d="M7 16V4M10 8.5h4M10 11.5h4"/>',
  heart: '<path d="M12 20s-7.8-4.6-7.8-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.8 2.4C19.8 15.4 12 20 12 20z"/>',
  coin: '<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="5.6"/><path d="M12 8.2l1.1 2.5 2.7.3-2 1.8.6 2.7-2.4-1.4-2.4 1.4.6-2.7-2-1.8 2.7-.3z"/>',
  quill: '<path d="M20.4 3.6C13 4.4 7.9 9.4 6.4 17.6l1.7 1.7C16.3 17.8 21.2 12.8 20.4 3.6z"/><path d="M6.4 17.6L3.6 20.4M10.5 13.5l5-5"/>',
  mood: '<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4a4.3 4.3 0 0 1 0 8.6 4.3 4.3 0 0 0 0 8.6"/><circle cx="12" cy="7.7" r="1" fill="currentColor"/><circle cx="12" cy="16.3" r="1"/>',
  amulet: '<path d="M7.6 3.5L12 8l4.4-4.5"/><path d="M12 8.2l4.9 5-4.9 7.3-4.9-7.3z"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor"/>',
  hash: '<path d="M9.6 4L8 20M16 4l-1.6 16M4.5 9h15.5M4 15h15.5"/>',
  compass: '<circle cx="12" cy="12" r="8.8"/><path d="M12 5.2l2.4 6.8L12 18.8 9.6 12z"/><path d="M12 5.2L9.6 12h4.8z" fill="currentColor"/>',
  rings: '<circle cx="9" cy="13" r="5.6"/><circle cx="15" cy="13" r="5.6"/><path d="M10.6 4.4l1.4-1.4 1.4 1.4-1.4 1.4z"/>',
  bolt: '<path d="M13.4 2.8L5 13.6h6.2l-1 7.6 8.8-11h-6.4z"/>',
  chat: '<path d="M4 5.5h16v10.5H10l-4.6 3.6V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  curtain: '<path d="M3 4h18M4.5 4c0 7 1.5 12 5 16H4.5zM19.5 4c0 7-1.5 12-5 16h5z"/><path d="M12 13.2l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" fill="currentColor" stroke="none"/>',
  hourglass: '<path d="M6.5 3.5h11M6.5 20.5h11M7.5 3.5c0 5 9 6 9 8.5s-9 3.5-9 8.5M16.5 3.5c0 5-9 6-9 8.5s9 3.5 9 8.5"/>',
  candle: '<path d="M8.5 11h7v9.5h-7z"/><path d="M12 11V9"/><path d="M12 2.8c1.8 2 2.2 3.3 1.3 4.6a1.6 1.6 0 0 1-2.6 0c-.9-1.3-.5-2.6 1.3-4.6z" fill="currentColor"/>',
  reverse: '<path d="M4.5 12a7.5 7.5 0 0 1 13-5.1L19.5 9"/><path d="M19.5 4v5h-5"/><path d="M19.5 12a7.5 7.5 0 0 1-13 5.1L4.5 15"/><path d="M4.5 20v-5h5"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  owl: '<path d="M5 4.5l2.8 2.2a7 7 0 0 1 8.4 0L19 4.5v8.3a7 7 0 0 1-14 0z"/><circle cx="9.3" cy="11" r="2.1"/><circle cx="14.7" cy="11" r="2.1"/><circle cx="9.3" cy="11" r=".7" fill="currentColor"/><circle cx="14.7" cy="11" r=".7" fill="currentColor"/><path d="M11.2 13.6L12 15l.8-1.4z" fill="currentColor"/>',
  fire: '<path d="M12 21c-3.9 0-6.5-2.6-6.5-6 0-3.8 3.2-5.6 4-9.5 2.9 1.6 3.4 4.3 3 6 1-.4 1.9-1.4 2.3-2.8 1.8 1.8 3.7 4 3.7 6.6 0 3.3-2.6 5.7-6.5 5.7z"/>',
  water: '<path d="M12 3c3.4 4.4 6.2 7.8 6.2 11.2A6.2 6.2 0 0 1 5.8 14.2C5.8 10.8 8.6 7.4 12 3z"/><path d="M9 14.8a3 3 0 0 0 2.4 2.7"/>',
  air: '<path d="M3.5 9h11a3 3 0 1 0-3-3M3.5 13h15a3 3 0 1 1-3 3M3.5 17h6"/>',
  earth: '<path d="M3 19.5l6.2-10 3.6 5.6 2.4-3.4 5.8 7.8z"/><circle cx="17" cy="6.5" r="2"/>'
};

// Glyph cung hoàng đạo — ép dạng chữ (VS15) để không bị vẽ thành emoji tím
const ZGLYPH = s => s.replace(/️/g, "") + "︎";

function ICON(name, cls = "") {
  const body = ICONS[name] || ICONS.sparkle;
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

// Bàn xoay thiên văn (astrolabe) — nền trang trí sau hero, 3 vòng xoay ngược chiều
function ASTROLABE() {
  const C = 200, rad = d => (d - 90) * Math.PI / 180;
  const at = (r, d) => [C + r * Math.cos(rad(d)), C + r * Math.sin(rad(d))].map(v => v.toFixed(1));
  let ticks = "";
  for (let d = 0; d < 360; d += 5) {
    const [x1, y1] = at(186, d), [x2, y2] = at(d % 30 ? 180 : 172, d);
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  }
  const glyphs = "♈♉♊♋♌♍♎♏♐♑♒♓".split("").map((g, i) => {
    const [x, y] = at(156, i * 30 + 15);
    return `<text x="${x}" y="${y}">${g}︎</text>`;
  }).join("");
  const spokes = Array.from({ length: 12 }, (_, i) => {
    const [x1, y1] = at(136, i * 30), [x2, y2] = at(172, i * 30);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  }).join("");
  const star = Array.from({ length: 8 }, (_, i) => {
    const [x, y] = at(i % 2 ? 44 : 110, i * 45), [a, b] = at(18, i * 45 + 22.5), [c, e] = at(18, i * 45 - 22.5);
    return `<path d="M${c} ${e}L${x} ${y}L${a} ${b}"/>`;
  }).join("");
  return `<svg class="astrolabe" viewBox="0 0 400 400" aria-hidden="true">
    <g class="al-outer"><circle cx="200" cy="200" r="190"/><circle cx="200" cy="200" r="172"/>${ticks}</g>
    <g class="al-mid"><circle cx="200" cy="200" r="136"/>${spokes}<g class="al-glyphs">${glyphs}</g></g>
    <g class="al-inner"><circle cx="200" cy="200" r="118" stroke-dasharray="2 6"/>
      <ellipse cx="200" cy="200" rx="118" ry="46"/><ellipse cx="200" cy="200" rx="46" ry="118"/>${star}
      <circle cx="200" cy="200" r="18"/><circle cx="200" cy="200" r="4" class="al-dot"/></g>
  </svg>`;
}

// Tự thay mọi <… data-icon="tên"> bằng SVG tương ứng
// Gốc thư mục public/ — suy ra từ chính file icons.js để chạy đúng cả ở /games/
const ASSET_BASE = new URL("../", document.currentScript ? document.currentScript.src : location.href).href;
// Chân dung Cú Nguyệt — ảnh thật (Eagle Owl Portrait, CC0, Joselodos / Wikimedia Commons)
function OWL() {
  return `<img class="owl-img" src="${ASSET_BASE}img/cu-nguyet-192.webp" srcset="${ASSET_BASE}img/cu-nguyet-192.webp 1x, ${ASSET_BASE}img/cu-nguyet-384.webp 2x" alt="Cú Nguyệt" width="96" height="96" draggable="false">`;
}

function paintIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach(el => {
    el.innerHTML = ICON(el.dataset.icon, el.dataset.iconClass || "");
  });
  root.querySelectorAll("[data-owl]").forEach(el => { el.innerHTML = OWL(); });
  root.querySelectorAll("[data-astrolabe]").forEach(el => { el.innerHTML = ASTROLABE(); });
}
paintIcons();
