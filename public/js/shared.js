/* ===== Shared helpers — Tiệm Tarot ===== */

// ---- RNG có hạt giống (tử vi/destiny đổi theo ngày nhưng ổn định trong ngày) ----
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const todayKey = new Date().toISOString().slice(0, 10);
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
const shuffle = (arr, rng = Math.random) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const esc = s => String(s).replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---- Bầu trời sao ----
function makeStars() {
  const wrap = document.getElementById("stars");
  if (!wrap) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 140; i++) {
    const s = document.createElement("span");
    const size = Math.random() * 2.2 + 0.6;
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;` +
      `width:${size}px;height:${size}px;--dur:${(Math.random() * 4 + 2).toFixed(1)}s;` +
      `--del:${(Math.random() * 4).toFixed(1)}s`;
    frag.appendChild(s);
  }
  wrap.appendChild(frag);
}

// ---- Âm thanh WebAudio (không cần file) ----
const SFX = (() => {
  let ctx = null;
  let enabled = localStorage.getItem("tiem-sound") !== "off";
  const ac = () => (ctx ??= new (window.AudioContext || window.webkitAudioContext)());
  function tone(freq, delay = 0, dur = 0.18, type = "sine", vol = 0.12) {
    if (!enabled) return;
    try {
      const a = ac(), o = a.createOscillator(), g = a.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0, a.currentTime + delay);
      g.gain.linearRampToValueAtTime(vol, a.currentTime + delay + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + delay + dur);
      o.connect(g).connect(a.destination);
      o.start(a.currentTime + delay);
      o.stop(a.currentTime + delay + dur + 0.05);
    } catch (e) { /* audio bị chặn thì thôi */ }
  }
  function slide(f1, f2, delay = 0, dur = 0.25, type = "sine", vol = 0.1) {
    if (!enabled) return;
    try {
      const a = ac(), o = a.createOscillator(), g = a.createGain();
      o.type = type;
      const t = a.currentTime + delay;
      o.frequency.setValueAtTime(f1, t);
      o.frequency.exponentialRampToValueAtTime(f2, t + dur);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(a.destination);
      o.start(t); o.stop(t + dur + 0.05);
    } catch (e) { /* audio bị chặn thì thôi */ }
  }
  // Âm thanh riêng theo tính chất lá bài
  const FX_SOUNDS = {
    star:  [[880, 1319, "sine"], [1760, 2093, "sine"]],
    light: [[784, 1175, "triangle"], [1047, 1319, "sine"]],
    dark:  [[220, 147, "sine"], [147, 98, "sine"]],
    fire:  [[330, 494, "sawtooth"], [494, 659, "triangle"]],
    water: [[659, 494, "sine"], [494, 392, "sine"]],
    air:   [[988, 1319, "sine"], [1319, 1760, "sine"]],
    earth: [[262, 196, "triangle"], [330, 262, "sine"]],
    love:  [[659, 988, "sine"], [831, 1245, "sine"]],
    bolt:  [[1568, 988, "sawtooth"], [1175, 784, "triangle"]]
  };
  return {
    isEnabled: () => enabled,
    toggle() { enabled = !enabled; localStorage.setItem("tiem-sound", enabled ? "on" : "off"); return enabled; },
    play(kind) {
      if (!enabled) return;
      if (kind === "pick") tone(520, 0, 0.1, "triangle", 0.12);
      else if (kind === "flip") { tone(300, 0, 0.15, "sawtooth", 0.05); tone(660, 0.05, 0.14, "sine", 0.1); }
      else if (kind === "reveal") [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.3, "sine", 0.12));
      else if (kind === "sparkle") [880, 1174, 1568].forEach((f, i) => tone(f, i * 0.06, 0.2, "triangle", 0.08));
      else if (kind === "yes") [523, 784].forEach((f, i) => tone(f, i * 0.08, 0.25, "sine", 0.12));
      else if (kind === "no") tone(196, 0, 0.25, "square", 0.07);
      else if (kind === "whoosh") tone(140, 0, 0.4, "sawtooth", 0.04);
    },
    fx(kind) {
      if (!enabled) return;
      (FX_SOUNDS[kind] || FX_SOUNDS.star).forEach(([f1, f2, t], i) =>
        slide(f1, f2, i * 0.07, 0.28, t, 0.07));
    }
  };
})();

// ---- Nhạc nền ambient (WebAudio, không cần file) ----
const Music = (() => {
  let ctx = null, master = null, timer = null, started = false;
  let playing = localStorage.getItem("tiem-music") === "on";
  // Tiến trình huyền bí nhẹ nhàng: Am – Em – F – Dm, pad mềm + chuông gió
  const CHORDS = [
    [220.0, 261.63, 329.63],   // Am
    [164.81, 246.94, 329.63],  // Em
    [174.61, 220.0, 261.63],   // F
    [146.83, 220.0, 293.66]    // Dm
  ];
  const BELLS = [440, 523.25, 587.33, 659.25, 880]; // ngũ cung thứ — nghe mộng
  let ci = 0;

  function ensure() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.04;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
  }
  function pad(freq, dur) {
    const t = ctx.currentTime;
    const f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = "lowpass"; f.frequency.value = 620;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.42, t + 2.6);   // attack chậm mơ màng
    g.gain.linearRampToValueAtTime(0, t + dur);
    f.connect(g); g.connect(master);
    // 2 oscillator lệch nhẹ — không khí dày, êm
    [["triangle", -5], ["sine", 5]].forEach(([type, det]) => {
      const o = ctx.createOscillator();
      o.type = type; o.frequency.value = freq; o.detune.value = det;
      o.connect(f); o.start(t); o.stop(t + dur + 0.1);
    });
  }
  function bell() {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.value = BELLS[Math.floor(Math.random() * BELLS.length)];
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.045, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + 3);
  }
  function tick() {
    CHORDS[ci++ % CHORDS.length].forEach(f => pad(f, 7.4));
    if (Math.random() < 0.45) setTimeout(bell, 1400 + Math.random() * 2400);
  }
  function start() {
    if (started) return;
    ensure(); started = true;
    tick(); timer = setInterval(tick, 7000);
  }
  function stop() { clearInterval(timer); timer = null; started = false; }
  return {
    isPlaying: () => playing,
    toggle() {
      playing = !playing;
      localStorage.setItem("tiem-music", playing ? "on" : "off");
      playing ? start() : stop();
      return playing;
    },
    resumeIfWanted() { if (playing && !started) start(); }
  };
})();

function initSoundToggle() {
  const sfx = document.getElementById("soundToggle");
  if (sfx) {
    const paint = () => { sfx.textContent = SFX.isEnabled() ? "🔊" : "🔇"; };
    sfx.addEventListener("click", () => { const on = SFX.toggle(); paint(); if (on) SFX.play("pick"); });
    paint();
  }
  const mus = document.getElementById("musicToggle");
  if (mus) {
    const paint = () => { mus.textContent = Music.isPlaying() ? "🎶" : "🎵"; mus.classList.toggle("off", !Music.isPlaying()); };
    mus.addEventListener("click", () => { const on = Music.toggle(); paint(); if (on) toast("Nhạc đêm khuya đang phát 🎶"); });
    paint();
  }
  // Trình duyệt chặn autoplay — nếu user đã bật nhạc, phát lại sau cử chỉ đầu tiên
  if (Music.isPlaying()) {
    document.addEventListener("pointerdown", () => Music.resumeIfWanted(), { once: true });
    document.addEventListener("keydown", () => Music.resumeIfWanted(), { once: true });
  }
  // Hamburger menu (mobile)
  const navBtn = document.getElementById("navToggle");
  const header = document.querySelector(".site-header");
  if (navBtn && header) {
    navBtn.addEventListener("click", e => {
      e.stopPropagation();
      const open = header.classList.toggle("nav-open");
      navBtn.setAttribute("aria-expanded", open);
    });
    header.querySelectorAll("nav a").forEach(a =>
      a.addEventListener("click", () => header.classList.remove("nav-open")));
    document.addEventListener("click", e => {
      if (!header.contains(e.target)) header.classList.remove("nav-open");
    });
  }
}

// ---- Toast nhỏ ----
function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast"; t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.hidden = false;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2400);
}

// ---- Sao bắn (sparkle burst) ----
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function burst(x, y, n = 14, colors = null, chars = null) {
  if (reduceMotion) return;
  let wrap = document.getElementById("sparkles");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "sparkles"; wrap.className = "sparkles";
    document.body.appendChild(wrap);
  }
  const glyphs = chars || ["✦", "✧", "⋆", "✶"];
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.textContent = glyphs[i % glyphs.length];
    s.style.left = x + "px"; s.style.top = y + "px";
    if (colors) s.style.color = colors[i % colors.length];
    s.style.fontSize = (10 + Math.random() * 10).toFixed(0) + "px";
    wrap.appendChild(s);
    const ang = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 90;
    const rot = (Math.random() - 0.5) * 240;
    s.animate([
      { transform: "translate(-50%,-50%) scale(0) rotate(0deg)", opacity: 1 },
      { transform: `translate(${Math.cos(ang) * dist - 8}px, ${Math.sin(ang) * dist - 8}px) scale(${0.6 + Math.random()}) rotate(${rot}deg)`, opacity: 0 }
    ], { duration: 650 + Math.random() * 500, easing: "cubic-bezier(.1,.7,.3,1)" })
      .onfinish = () => s.remove();
  }
}
function burstAt(el, n = 14, colors = null, chars = null) {
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, n, colors, chars);
}

// ---- Hiệu ứng riêng theo lá bài ----
const FX_LIB = {
  star:  { chars: ["✦", "✧", "⋆"],   colors: ["#D7A94A", "#FFF9EA"],           glow: "#D7A94A", snd: "star" },
  light: { chars: ["✦", "☀", "✧"],   colors: ["#E9B74F", "#FFF9EA", "#F3B18D"], glow: "#E9B74F", snd: "light" },
  dark:  { chars: ["☾", "✧", "⋆"],   colors: ["#9B7BFF", "#5f7686", "#FFF9EA"], glow: "#9B7BFF", snd: "dark" },
  fire:  { chars: ["🔥", "✦", "❋"],  colors: ["#E45C4F", "#F3B18D", "#D7A94A"], glow: "#E45C4F", snd: "fire" },
  water: { chars: ["💧", "❋", "✦"],  colors: ["#2B9B98", "#8FC3D9", "#FFF9EA"], glow: "#2B9B98", snd: "water" },
  air:   { chars: ["✧", "❖", "⋆"],   colors: ["#9aa7ad", "#FFF9EA", "#8FC3D9"], glow: "#8FC3D9", snd: "air" },
  earth: { chars: ["❁", "✿", "✦"],   colors: ["#49A77D", "#D7A94A", "#79b98f"], glow: "#49A77D", snd: "earth" },
  love:  { chars: ["♥", "✦", "❁"],   colors: ["#EE8A73", "#ff9dcf", "#FFF9EA"], glow: "#EE8A73", snd: "love" },
  bolt:  { chars: ["⚡", "✦", "✧"],  colors: ["#E9B74F", "#FFF9EA", "#F3B18D"], glow: "#E9B74F", snd: "bolt" }
};
// 22 lá Major → loại hiệu ứng
const MAJOR_FXMAP = ["air", "star", "dark", "earth", "fire", "light", "love",
  "star", "fire", "dark", "star", "air", "water", "dark", "water", "fire",
  "bolt", "star", "dark", "light", "air", "earth"];
const SUIT_FXMAP = ["fire", "water", "air", "earth"]; // gậy cốc kiếm tiền
function cardFX(card) {
  const kind = card.id < 22 ? MAJOR_FXMAP[card.id] : SUIT_FXMAP[Math.floor((card.id - 22) / 14)];
  return FX_LIB[kind];
}
// Hiệu ứng lật bài: glow theo màu + particle riêng + âm thanh riêng
function fxFlip(el, card) {
  if (!el || !card) return;
  const fx = cardFX(card);
  el.style.setProperty("--fx", fx.glow);
  el.classList.remove("fx-flash");
  void el.offsetWidth; // reflow để animation chạy lại
  el.classList.add("fx-flash");
  setTimeout(() => el.classList.remove("fx-flash"), 1000);
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, 16, fx.colors, fx.chars);
  SFX.fx(fx.snd);
}

// ---- Mặt sau lá bài: medallion trăng-sao huyền bí (SVG) ----
const CARD_BACK = (() => {
  const dots = [];
  for (let gy = 0; gy < 8; gy++) for (let gx = 0; gx < 6; gx++)
    dots.push(`<circle cx="${23 + gx * 23}" cy="${30 + gy * 22}" r="1"/>`);
  const star4 = (x, y, s) => `M${x} ${y - s} Q${x + s * .22} ${y - s * .22} ${x + s} ${y} Q${x + s * .22} ${y + s * .22} ${x} ${y + s} Q${x - s * .22} ${y + s * .22} ${x - s} ${y} Q${x - s * .22} ${y - s * .22} ${x} ${y - s}Z`;
  const orbit = [0, 45, 90, 135, 180, 225, 270, 315].map(a => {
    const r = a * Math.PI / 180;
    return `<path d="${star4(80 + 32 * Math.cos(r), 106 + 32 * Math.sin(r), 3.6)}" fill="#d7a94a"/>`;
  }).join("");
  const corners = [[18, 18], [142, 18], [18, 194], [142, 194]]
    .map(([x, y]) => `<path d="${star4(x, y, 4.4)}" fill="#f5e8d1" opacity=".8"/>`).join("");
  return `<svg class="back-svg" viewBox="0 0 160 212" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><radialGradient id="cbg" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#11616f"/><stop offset="55%" stop-color="#0a404e"/><stop offset="100%" stop-color="#052531"/>
    </radialGradient></defs>
    <rect width="160" height="212" fill="url(#cbg)"/>
    <g fill="#f5e8d1" opacity=".1">${dots.join("")}</g>
    <rect x="7" y="7" width="146" height="198" rx="9" fill="none" stroke="#f5e8d1" stroke-opacity=".5" stroke-width="1.1"/>
    <rect x="12.5" y="12.5" width="135" height="187" rx="6" fill="none" stroke="#d7a94a" stroke-opacity=".7" stroke-width=".8"/>
    ${corners}
    <path d="M80 22l4 6-4 6-4-6Z" fill="#d7a94a"/><path d="M64 28h10M86 28h10" stroke="#f5e8d1" stroke-opacity=".55" stroke-width="1"/>
    <path d="M80 178l4 6-4 6-4-6Z" fill="#d7a94a"/><path d="M64 184h10M86 184h10" stroke="#f5e8d1" stroke-opacity=".55" stroke-width="1"/>
    <circle cx="80" cy="106" r="37" fill="none" stroke="#d7a94a" stroke-opacity=".85" stroke-width="1.3"/>
    <circle cx="80" cy="106" r="29.5" fill="none" stroke="#f5e8d1" stroke-opacity=".5" stroke-width=".8"/>
    ${orbit}
    <path d="M80 84 A22 22 0 1 0 80 128 A17 17 0 1 1 80 84Z" fill="#d7a94a"/>
    <path d="${star4(97, 95, 4.6)}" fill="#f5e8d1"/>
    <circle cx="80" cy="106" r="1.8" fill="#f5e8d1" opacity=".85"/>
  </svg>`;
})();

// ---- Vẽ lá bài Tarot — ảnh thật Rider-Waite-Smith ----
function cardFrontHTML(card, reversed) {
  return `<img class="card-img" src="${CARDART.src(card)}" alt="${card.vi} — ${card.name}" draggable="false" loading="lazy">` +
    (reversed ? '<span class="rev-chip" title="Lá ngược">⟲ NGƯỢC</span>' : "");
}
function makeCardEl(card, reversed = false) {
  const el = document.createElement("div");
  el.className = "tarot-card";
  el.style.setProperty("--c1", card.colors[0]);
  el.style.setProperty("--c2", card.colors[1]);
  el.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-back">${CARD_BACK}</div>
      <div class="card-face card-front ${reversed ? "reversed-art" : ""}">${cardFrontHTML(card, reversed)}</div>
    </div>`;
  el._card = card;
  el._reversed = reversed;
  return el;
}

// ---- Pha trăng (tính thật, xấp xỉ) ----
const MOON_PHASES = [
  { e: "🌑", n: "Trăng non",      line: "Trăng mới — đêm đẹp để gieo ý định mới." },
  { e: "🌒", n: "Trăng lưỡi liềm đầu", line: "Năng lượng đang lên — bắt đầu hành động đi." },
  { e: "🌓", n: "Bán nguyệt đầu", line: "Đến lúc quyết đoán — đừng ngồi yên trên hàng rào." },
  { e: "🌔", n: "Trăng khuyết đầu", line: "Gần tròn rồi — tinh chỉnh nốt, đừng dở dang." },
  { e: "🌕", n: "Trăng tròn",     line: "Trăng tròn! Cảm xúc căng đầy — coi chừng drama đêm nay." },
  { e: "🌖", n: "Trăng khuyết cuối", line: "Trăng tàn dần — biết ơn rồi buông bớt." },
  { e: "🌗", n: "Bán nguyệt cuối", line: "Đêm của sự buông — thứ gì hết hạn thì để nó đi." },
  { e: "🌘", n: "Trăng lưỡi liềm cuối", line: "Giai đoạn nghỉ dưỡng — nạp pin cho chu kỳ mới." }
];
function moonPhase(date = new Date()) {
  const syn = 29.53058867;
  const ref = Date.UTC(2000, 0, 6, 18, 14); // trăng non mốc
  let age = ((date.getTime() - ref) / 864e5) % syn;
  if (age < 0) age += syn;
  return { ...MOON_PHASES[Math.floor((age / syn) * 8 + 0.5) % 8], age };
}

// ---- Cung hoàng đạo từ ngày sinh ----
const SIGN_CUTOFFS = [
  [20, "capricorn", "aquarius"],   [19, "aquarius", "pisces"],
  [21, "pisces", "aries"],         [20, "aries", "taurus"],
  [21, "taurus", "gemini"],        [21, "gemini", "cancer"],
  [23, "cancer", "leo"],           [23, "leo", "virgo"],
  [23, "virgo", "libra"],          [23, "libra", "scorpio"],
  [22, "scorpio", "sagittarius"],  [22, "sagittarius", "capricorn"]
];
function sunSignIndex(day, month) {
  const [cut, before, after] = SIGN_CUTOFFS[month - 1];
  const id = day < cut ? before : after;
  return ZODIAC_SIGNS.findIndex(s => s.id === id);
}
function sunSign(day, month) { return ZODIAC_SIGNS[sunSignIndex(day, month)]; }

// Mặt trăng chạy ~13.18°/ngày — ước lượng vui vẻ, sai ±1 cung
function moonSignIndex(date) {
  const { age } = moonPhase(date);
  const sunDeg = sunSignIndex(date.getDate(), date.getMonth() + 1) * 30 + 15;
  const deg = (sunDeg + age * 13.176) % 360;
  return Math.floor(deg / 30);
}
// Cung mọc ~ cung mọc lúc 6h sáng bằng cung mặt trời, đổi mỗi 2h
function ascSignIndex(sunIdx, hour) {
  return (sunIdx + Math.floor((((hour - 6) % 24) + 24) % 24 / 2)) % 12;
}

// ---- Hồ sơ vũ trụ (nhập 1 lần dùng chung) ----
const Profile = {
  get() { try { return JSON.parse(localStorage.getItem("cosmic-profile")) || {}; } catch { return {}; } },
  set(p) { localStorage.setItem("cosmic-profile", JSON.stringify(p)); },
  clear() { localStorage.removeItem("cosmic-profile"); }
};

// ---- Thần số học helpers ----
function vnFold(str) {
  return str.normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z]/g, "");
}
const NUM_MAP = { a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8 };
const digitSum = n => String(n).split("").reduce((a, c) => a + +c, 0);
function reduceNum(n, masters = [11, 22]) {
  while (n > 9 && !masters.includes(n)) n = digitSum(n);
  return n;
}

// ---- Đăng ký PWA service worker ----
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  const swPath = location.pathname.includes("/games/") ? "../sw.js" : "sw.js";
  addEventListener("load", () => navigator.serviceWorker.register(swPath).catch(() => {}));
}
