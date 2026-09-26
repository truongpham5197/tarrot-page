/* ===== Tiệm Tarot — trang chủ ===== */

makeStars();
initSoundToggle();

// ---- Lá bài của ngày + pha trăng ----
(function dailyCard() {
  const rng = mulberry32(hashStr("daily-" + todayKey));
  const card = TAROT_DECK[Math.floor(rng() * TAROT_DECK.length)];
  const reversed = rng() < 0.25;
  const el = document.getElementById("dailyCard");
  el.style.setProperty("--c1", card.colors[0]);
  el.style.setProperty("--c2", card.colors[1]);
  document.getElementById("dailyBack").innerHTML = CARD_BACK;
  document.getElementById("dailyFront").innerHTML = cardFrontHTML(card, reversed);
  document.getElementById("dailyFront").classList.toggle("reversed-art", reversed);

  const moon = moonPhase();
  document.getElementById("moonChip").innerHTML =
    `${moon.e} <b>${moon.n}</b> — ${moon.line}`;

  let flipped = false;
  const flip = () => {
    flipped = !flipped;
    el.classList.toggle("flipped", flipped);
    const name = document.getElementById("dailyName");
    const meaning = document.getElementById("dailyMeaning");
    if (flipped) {
      name.innerHTML = `${card.icon} ${card.vi} <small>(${card.name})${reversed ? " — ngược" : ""}</small>`;
      meaning.textContent = reversed ? card.rev : card.up;
      SFX.play("flip");
      fxFlip(el, card);
    } else {
      name.textContent = "Chạm lá bài để lật";
      meaning.textContent = "Lá bài của ngày sẽ mách bạn vibe chính của 24h tới…";
    }
  };
  el.addEventListener("click", flip);
  el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
})();

// ---- Game rút bài ----
const deckZone = document.getElementById("deckZone");
const deckEl = document.getElementById("deck");
const deckHint = document.getElementById("deckHint");
const revealZone = document.getElementById("revealZone");
const pickedCardsEl = document.getElementById("pickedCards");
const flipBtn = document.getElementById("flipBtn");
const resetBtn = document.getElementById("resetBtn");
const spreadPicker = document.getElementById("spreadPicker");
const readingResult = document.getElementById("readingResult");

const POSITIONS = {
  1: ["Thông điệp"],
  3: ["Quá khứ", "Hiện tại", "Tương lai"],
  5: ["Tình cảm", "Tài lộc", "Sự nghiệp", "Sức khoẻ", "Lời khuyên"]
};
let spreadSize = 0;
let chosen = [];
let gameDeck = [];

function startSpread(n) {
  spreadSize = n;
  chosen = [];
  readingResult.hidden = true;
  readingResult.innerHTML = "";
  pickedCardsEl.innerHTML = "";
  revealZone.hidden = true;
  flipBtn.disabled = false;
  SFX.play("whoosh");

  // Xào 78 lá, đặt 24 lá úp lên bàn — mỗi lá 30% ngược
  gameDeck = shuffle(TAROT_DECK).slice(0, 24).map(card => ({ card, reversed: Math.random() < 0.3 }));
  deckEl.innerHTML = "";
  gameDeck.forEach((entry, i) => {
    const el = makeCardEl(entry.card, false);
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.style.setProperty("--rot", `${(i - (gameDeck.length - 1) / 2) * 3.2}deg`);
    el.style.animation = `dealIn .35s ${i * 0.018}s ease both`;
    const choose = () => pickCard(el, entry);
    el.addEventListener("click", choose);
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); } });
    deckEl.appendChild(el);
  });

  deckZone.hidden = false;
  deckHint.innerHTML = `Bộ bài 78 lá đã xào xong — chọn <b>${n} lá</b> (đã chọn 0/${n}):`;
  deckZone.scrollIntoView({ behavior: "smooth", block: "center" });
}

function pickCard(el, entry) {
  if (chosen.length >= spreadSize || el.classList.contains("chosen")) return;
  el.classList.add("chosen");
  chosen.push({ el, entry });
  SFX.play("pick");
  deckHint.innerHTML = `Chọn <b>${spreadSize} lá</b> (đã chọn ${chosen.length}/${spreadSize})` +
    (chosen.length < spreadSize ? " — chọn tiếp:" : " — đang xếp bài…");
  if (chosen.length === spreadSize) setTimeout(showPicked, 450);
}

function showPicked() {
  deckZone.hidden = true;
  chosen.forEach(({ entry }) => pickedCardsEl.appendChild(makeCardEl(entry.card, entry.reversed)));
  revealZone.hidden = false;
  revealZone.scrollIntoView({ behavior: "smooth", block: "center" });
}

flipBtn.addEventListener("click", () => {
  const cards = pickedCardsEl.querySelectorAll(".tarot-card");
  cards.forEach((c, i) => setTimeout(() => {
    c.classList.add("flipped");
    SFX.play("flip");
    fxFlip(c, c._card);
  }, i * 380));
  flipBtn.disabled = true;

  setTimeout(() => {
    renderReading();
    readingResult.hidden = false;
    SFX.play("reveal");
    saveJournal();
    readingResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, cards.length * 380 + 500);
});

function renderReading() {
  const q = document.getElementById("questionInput").value.trim();
  const positions = POSITIONS[spreadSize];
  readingResult.innerHTML = "";
  if (q) {
    const qEl = document.createElement("div");
    qEl.className = "result-card";
    qEl.innerHTML = `<div class="result-icon">💬</div>
      <div><div class="result-pos">Câu hỏi của bạn</div>
      <div class="meaning">“${esc(q)}”</div></div>`;
    readingResult.appendChild(qEl);
  }
  chosen.forEach(({ entry }, i) => {
    const { card, reversed } = entry;
    const div = document.createElement("div");
    div.className = "result-card";
    div.innerHTML = `
      <div class="result-icon ${reversed ? "reversed" : ""}">${card.icon}</div>
      <div>
        <div class="result-pos">${positions[i]}</div>
        <h4>${card.vi} — ${card.name}${reversed ? '<span class="rev-tag">NGƯỢC</span>' : ""}</h4>
        <div class="result-keywords">Từ khoá: ${card.keywords.join(" · ")}</div>
        <div class="meaning">${reversed ? card.rev : card.up}</div>
      </div>`;
    readingResult.appendChild(div);
  });

  const shareEl = document.createElement("div");
  shareEl.className = "result-card";
  shareEl.innerHTML = `<div class="result-icon">📤</div>
    <div><div class="result-pos">Chia sẻ</div>
    <button class="btn btn-ghost btn-sm" id="shareReading">Copy kết quả gửi cho bạn bè</button></div>`;
  readingResult.appendChild(shareEl);
  shareEl.querySelector("#shareReading").addEventListener("click", async () => {
    const names = chosen.map((c, i) => `${positions[i]}: ${c.entry.card.vi}${c.entry.reversed ? " (ngược)" : ""}`);
    const text = `🔮 Trải bài ${spreadSize} lá tại Tiệm Tarot Đêm Khuya${q ? ` — “${q}”` : ""}:\n` + names.join("\n");
    try {
      if (navigator.share) await navigator.share({ title: "Tiệm Tarot", text });
      else { await navigator.clipboard.writeText(text); toast("Đã copy — dán vào chat đi!"); }
    } catch { /* cancelled */ }
  });
}

resetBtn.addEventListener("click", () => {
  revealZone.hidden = true;
  readingResult.hidden = true;
  startSpread(spreadSize);
});

spreadPicker.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-spread]");
  if (btn) startSpread(Number(btn.dataset.spread));
});

// ---- Sổ tay bói (localStorage) ----
const JOURNAL_KEY = "tarot-journal";
const journalBox = document.getElementById("journal");
const journalList = document.getElementById("journalList");

function getJournal() { try { return JSON.parse(localStorage.getItem(JOURNAL_KEY)) || []; } catch { return []; } }
function saveJournal() {
  const entries = getJournal();
  const q = document.getElementById("questionInput").value.trim();
  entries.unshift({
    ts: Date.now(), q, spread: spreadSize,
    cards: chosen.map(c => c.entry.card.vi + (c.entry.reversed ? " (ngược)" : ""))
  });
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries.slice(0, 8)));
  renderJournal();
}
function renderJournal() {
  const entries = getJournal();
  journalBox.hidden = entries.length === 0;
  journalList.innerHTML = entries.map(e => {
    const d = new Date(e.ts);
    const date = `${d.getDate()}/${d.getMonth() + 1} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    return `<li>
      <div class="j-meta">${date} · trải ${e.spread} lá${e.q ? ` · “${esc(e.q)}”` : ""}</div>
      <div class="j-cards">${e.cards.map(c => esc(c)).join(" · ")}</div>
    </li>`;
  }).join("");
}
document.getElementById("clearJournal").addEventListener("click", () => {
  localStorage.removeItem(JOURNAL_KEY);
  renderJournal();
  toast("Sổ tay đã sạch — trang mới cho vũ trụ viết!");
});
renderJournal();

// ---- Hỏi nhanh Có / Không ----
const NEUTRAL_IDS = new Set([0, 2, 10, 12, 14, 18]); // Ngố, Nữ Tu, Vòng Xoay, Người Treo, Tiết Chế, Mặt Trăng
document.getElementById("yesnoBtn").addEventListener("click", () => {
  const q = document.getElementById("yesnoInput").value.trim();
  const card = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
  const reversed = Math.random() < 0.3;
  const verdict = NEUTRAL_IDS.has(card.id) ? "half" : (reversed ? "no" : "yes");
  const verdictText = { yes: "CÓ! 🎉", no: "KHÔNG (hoặc chưa phải lúc) 🙅", half: "50/50 — VŨ TRỤ ĐỂ BẠN TỰ CHỌN 🤷" }[verdict];
  SFX.play(verdict === "no" ? "no" : "yes");

  const box = document.getElementById("yesnoResult");
  box.innerHTML = `
    <div class="verdict ${verdict}">${verdictText}</div>
    ${q ? `<div class="verdict-q">“${esc(q)}”</div>` : ""}
    <div class="verdict-card">
      <span class="result-icon ${reversed ? "reversed" : ""}">${card.icon}</span>
      <div>
        <b>${card.vi}</b> <small>(${card.name})${reversed ? " — ngược" : ""}</small>
        <div class="meaning">${reversed ? card.rev : card.up}</div>
      </div>
    </div>`;
  box.hidden = false;
  burstAt(box, 12);
});

// ---- Gợi ý câu hỏi ----
document.getElementById("suggestBtn").addEventListener("click", () => {
  const input = document.getElementById("questionInput");
  input.value = pick(Math.random, QUESTION_SUGGESTIONS);
  input.focus();
  SFX.play("pick");
});

// ---- Tử vi 12 cung + đo độ hợp ----
const zodiacGrid = document.getElementById("zodiacGrid");
const horoResult = document.getElementById("horoResult");
document.getElementById("horoDate").textContent =
  "Chọn cung hoàng đạo của bạn — tử vi ngày " + todayKey.split("-").reverse().join("/") + ":";

let primarySign = null;
ZODIAC_SIGNS.forEach(sign => {
  const b = document.createElement("button");
  b.className = "zodiac-btn";
  b.innerHTML = `<span class="z-icon">${sign.icon}</span>
    <span class="z-name">${sign.vi}</span>
    <span class="z-dates">${sign.dates}</span>`;
  b.addEventListener("click", () => onSignClick(sign, b));
  zodiacGrid.appendChild(b);
});

function onSignClick(sign, btn) {
  // Đang có kết quả + chọn cung khác → đo độ hợp
  if (primarySign && primarySign !== sign) {
    showCompat(primarySign, sign, btn);
    return;
  }
  primarySign = sign;
  zodiacGrid.querySelectorAll(".zodiac-btn").forEach(x => x.classList.remove("active", "partner"));
  btn.classList.add("active");
  showHoroscope(sign);
  SFX.play("pick");
  burstAt(btn, 10);
}

function showHoroscope(sign) {
  const rng = mulberry32(hashStr(`${todayKey}-${sign.id}`));
  const score = 2 + Math.floor(rng() * 4);
  const luckyNum = Math.floor(rng() * 99) + 1;

  const rows = [
    ["💘 Tình cảm", pick(rng, FORTUNE_POOLS.love)],
    ["💰 Tài lộc", pick(rng, FORTUNE_POOLS.money)],
    ["📋 Việc & học", pick(rng, FORTUNE_POOLS.work)],
    ["🎭 Tâm trạng", pick(rng, FORTUNE_POOLS.mood)],
    ["🎁 Vật may mắn", "Hôm nay nên mang theo: " + pick(rng, FORTUNE_POOLS.luckyItem)],
    ["🔢 Số may mắn", `${luckyNum} — ghi nhớ, có thể trúng… sự vui vẻ`],
    ["🧭 Lời vũ trụ", pick(rng, FORTUNE_POOLS.advice)],
    ["💞 Đo độ hợp", `Đang chọn <b>${sign.vi}</b> — bấm thêm 1 cung nữa để xem độ hợp hôm nay!`]
  ];

  horoResult.innerHTML = `
    <div class="horo-head">
      <span class="big-icon">${sign.icon}</span>
      <h3>${sign.vi}</h3>
      <span class="el">${sign.dates} · Nguyên tố ${sign.element}</span>
      <span class="horo-score">${"★".repeat(score)}${"☆".repeat(5 - score)} ${score}/5</span>
    </div>
    ${rows.map(([k, v]) => `<div class="horo-row"><div class="k">${k}</div><div class="v">${v}</div></div>`).join("")}`;

  horoResult.hidden = false;
  horoResult.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showCompat(a, b, btn) {
  zodiacGrid.querySelectorAll(".zodiac-btn").forEach(x => x.classList.remove("partner"));
  btn.classList.add("partner");

  const rng = mulberry32(hashStr(`${todayKey}-compat-${[a.id, b.id].sort().join("-")}`));
  const pct = 40 + Math.floor(rng() * 61);
  const comment = compatComment(a.element, b.element);
  const tier = compatTier(pct);

  horoResult.innerHTML = `
    <div class="horo-head">
      <span class="big-icon">${a.icon} ${b.icon}</span>
      <h3>${a.vi} × ${b.vi}</h3>
      <span class="horo-score">${"💗".repeat(Math.max(1, Math.round(pct / 20)))}</span>
    </div>
    <div class="compat-meter"><div class="compat-fill" style="width:${pct}%">${pct}%</div></div>
    <div class="horo-row"><div class="k">🔥 Nguyên tố</div><div class="v">${a.element} × ${b.element}: ${comment}.</div></div>
    <div class="horo-row"><div class="k">📊 Kết luận</div><div class="v">${tier}</div></div>
    <div class="horo-row"><div class="k">💡 Gợi ý</div><div class="v">Bấm lại vào ${a.vi} hoặc ${b.vi} để xem tử vi từng cung — hoặc chọn cặp khác.</div></div>`;

  SFX.play("sparkle");
  burstAt(horoResult.querySelector(".compat-meter"), 16);
  horoResult.hidden = false;
  horoResult.scrollIntoView({ behavior: "smooth", block: "center" });

  // Reset để lần click sau bắt đầu cặp mới
  primarySign = null;
  zodiacGrid.querySelectorAll(".zodiac-btn").forEach(x => x.classList.remove("active"));
}
