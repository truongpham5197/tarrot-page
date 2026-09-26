/* ===== Tiệm Tarot — trang chủ ===== */

makeStars();
initSoundToggle();

// ---- Cú Nguyệt chào khách ----
const heroSay = document.getElementById("heroSay");
const tableSay = document.getElementById("tableSay");
setTimeout(() => Narrator.say(heroSay, greetingByHour()), 500);

// ---- Lá bài của ngày + pha trăng ----
(function dailyCard() {
  const rng = mulberry32(hashStr("daily-" + todayKey));
  const card = TAROT_DECK[Math.floor(rng() * TAROT_DECK.length)];
  const reversed = rng() < 0.25;
  const el = document.getElementById("dailyCard");
  el.style.setProperty("--c1", card.colors[0]);
  el.style.setProperty("--c2", card.colors[1]);
  document.getElementById("dailyBack").innerHTML = CARD_BACK;
  document.getElementById("dailyFront").innerHTML = cardFrontHTML(card, reversed) + '<span class="shine"></span>';
  document.getElementById("dailyFront").classList.toggle("reversed-art", reversed);

  const moon = moonPhase();
  document.getElementById("moonChip").innerHTML =
    `${moonSVG(moon.age)} <b>${moon.n}</b> — ${moon.line}`;

  const name = document.getElementById("dailyName");
  const meaning = document.getElementById("dailyMeaning");
  const idleName = name.textContent, idleMeaning = meaning.textContent;
  let flipped = false;
  const flip = () => {
    flipped = !flipped;
    el.classList.toggle("flipped", flipped);
    if (flipped) {
      name.innerHTML = `${card.vi} <small>(${card.name})${reversed ? " — ngược" : ""}</small>`;
      Narrator.say(meaning, reversed ? card.rev : card.up, 12);
      SFX.play("flip");
      setTimeout(() => fxFlip(el, card), 260);
    } else {
      name.textContent = idleName;
      meaning.textContent = idleMeaning;
      SFX.play("page");
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
const SPREAD_LINES = {
  1: "Một lá thôi, nhưng đừng xem thường. Lướt tay qua bộ bài — lá nào khiến bạn khựng lại, chọn lá đó.",
  3: "Ba lá kể một câu chuyện có đầu, có giữa, có cuối. Cứ chọn chậm, ta không vội.",
  5: "Năm lá cho năm góc đời. Nhắm mắt một nhịp rồi hẵng chọn nhé."
};
let spreadSize = 0;
let chosen = [];
let gameDeck = [];
let dealing = false;

async function startSpread(n) {
  if (dealing) return;
  dealing = true;
  spreadSize = n;
  chosen = [];
  readingResult.hidden = true;
  readingResult.innerHTML = "";
  pickedCardsEl.innerHTML = "";
  revealZone.hidden = true;
  flipBtn.disabled = false;

  // Nghi thức xào bài trước khi trải quạt
  deckZone.hidden = false;
  deckHint.innerHTML = "Đang xào bài — giữ câu hỏi trong đầu nhé…";
  Narrator.say(tableSay, "Để ta xào bài. Bộ bài cần <b>nghe câu hỏi</b> của bạn trước đã…");
  deckZone.scrollIntoView({ behavior: "smooth", block: "center" });
  await shuffleRitual(deckEl);

  // Xào 78 lá, đặt 24 lá úp lên bàn — mỗi lá 30% ngược
  gameDeck = shuffle(TAROT_DECK).slice(0, 24).map(card => ({ card, reversed: Math.random() < 0.3 }));
  deckEl.innerHTML = "";
  gameDeck.forEach((entry, i) => {
    const el = makeCardEl(entry.card, false);
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", `Lá bài úp số ${i + 1}`);
    el.style.setProperty("--rot", `${(i - (gameDeck.length - 1) / 2) * 3.2}deg`);
    el.style.animation = `dealIn .4s ${i * 0.022}s cubic-bezier(.2,.8,.3,1) both`;
    const choose = () => pickCard(el, entry);
    el.addEventListener("click", choose);
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); } });
    // Rê qua quạt bài nghe như vuốt dây đàn hạc — chặn tần suất cho khỏi rối tai
    el.addEventListener("pointerenter", () => {
      const now = performance.now();
      if (now - (startSpread._lastHover || 0) < 90 || el.classList.contains("chosen")) return;
      startSpread._lastHover = now;
      SFX.glass(1046.5 * Math.pow(2, (i % 10) / 10), 0, .025, .8);
    });
    deckEl.appendChild(el);
  });
  SFX.play("whoosh");
  deckHint.innerHTML = `Bài đã trải — chọn <b>${n} lá</b> <span class="muted">(0/${n})</span>`;
  Narrator.say(tableSay, SPREAD_LINES[n]);
  dealing = false;
}

function pickCard(el, entry) {
  if (chosen.length >= spreadSize || el.classList.contains("chosen")) return;
  el.classList.add("chosen");
  chosen.push({ el, entry });
  SFX.play("pick");
  burstAt(el, 8);
  const left = spreadSize - chosen.length;
  deckHint.innerHTML = `Chọn <b>${spreadSize} lá</b> <span class="muted">(${chosen.length}/${spreadSize})</span>` +
    (left ? ` — còn ${left} lá nữa` : " — đang xếp bài lên bàn…");
  if (!left) setTimeout(showPicked, 500);
}

function showPicked() {
  deckZone.hidden = true;
  chosen.forEach(({ entry }, i) => {
    const el = makeCardEl(entry.card, entry.reversed);
    el.style.animation = `rise .5s ${i * 0.1}s ease both`;
    pickedCardsEl.appendChild(el);
  });
  revealZone.hidden = false;
  Narrator.say(tableSay, "Đủ bài rồi. Bạn chọn bài, mà bài cũng chọn bạn đấy. <b>Lật lên</b> xem chúng muốn nói gì nào.");
  revealZone.scrollIntoView({ behavior: "smooth", block: "center" });
}

flipBtn.addEventListener("click", () => {
  const cards = pickedCardsEl.querySelectorAll(".tarot-card");
  const STEP = 520;
  cards.forEach((c, i) => setTimeout(() => {
    c.classList.add("flipped");
    SFX.play("flip");
    setTimeout(() => fxFlip(c, c._card), 240);
  }, i * STEP));
  flipBtn.disabled = true;

  setTimeout(() => {
    renderReading();
    readingResult.hidden = false;
    SFX.play("reveal");
    saveJournal();
    readingResult.scrollIntoView({ behavior: "smooth", block: "start" });
  }, cards.length * STEP + 700);
});

// Nhìn tổng thể cả trải bài: bao nhiêu lá Ẩn Chính, bao nhiêu lá ngược, bộ nào trội
function spreadSummary() {
  const n = chosen.length;
  const majors = chosen.filter(c => c.entry.card.id < 22).length;
  const revs = chosen.filter(c => c.entry.reversed).length;
  const suitCount = [0, 0, 0, 0];
  chosen.forEach(c => { if (c.entry.card.id >= 22) suitCount[Math.floor((c.entry.card.id - 22) / 14)]++; });
  const top = suitCount.indexOf(Math.max(...suitCount));
  const chips = [], notes = [];
  chips.push(`${ICON("sparkle")} ${majors}/${n} lá Ẩn Chính`);
  chips.push(`${ICON("reverse")} ${revs}/${n} lá ngược`);
  if (n > 1 && suitCount[top] >= 2) {
    const s = SUITS[top];
    chips.push(`${ICON(["fire", "water", "air", "earth"][top])} Bộ ${s.vi} trội · ${s.element}`);
    notes.push(`Bộ <b>${s.vi}</b> xuất hiện nhiều — chuyện này xoay quanh ${s.domain}.`);
  }
  if (n === 1) notes.push(majors ? "Một lá Ẩn Chính — thông điệp hôm nay có sức nặng hơn bạn nghĩ." : "Lá Ẩn Phụ — lời nhắn gần gũi, áp dụng được ngay trong ngày.");
  else if (majors / n >= .5) notes.push("Nhiều lá Ẩn Chính: đây không phải chuyện vặt, nó đang chạm vào một bước ngoặt của bạn.");
  else if (!majors) notes.push("Toàn lá Ẩn Phụ: mọi thứ nằm trong tầm tay — chỉnh từng việc nhỏ là đổi được cục diện.");
  if (n > 1 && revs / n > .5) notes.push("Lá ngược chiếm đa số: năng lượng đang nghẽn đâu đó. Chậm lại và nhìn vào bên trong trước khi đẩy ra ngoài.");
  else if (n > 1 && !revs) notes.push("Không lá nào ngược — dòng chảy đang thông, cứ mạnh dạn mà đi.");
  return { chips, notes };
}

function renderReading() {
  const q = document.getElementById("questionInput").value.trim();
  const positions = POSITIONS[spreadSize];
  const { chips, notes } = spreadSummary();
  readingResult.innerHTML = `<div class="reading-summary">${chips.map(c => `<span class="chip">${c}</span>`).join("")}</div>`;
  if (q) {
    const qEl = document.createElement("div");
    qEl.className = "result-card";
    qEl.innerHTML = `<div class="g-icon">${ICON("chat")}</div>
      <div><div class="result-pos">Câu hỏi của bạn</div>
      <div class="meaning">“${esc(q)}”</div></div>`;
    readingResult.appendChild(qEl);
  }
  chosen.forEach(({ entry }, i) => {
    const { card, reversed } = entry;
    const div = document.createElement("div");
    div.className = "result-card";
    div.style.animationDelay = `${i * 0.12}s`;
    div.innerHTML = `
      ${cardThumb(card, reversed)}
      <div>
        <div class="result-pos">${positions[i]}</div>
        <h4>${card.vi} <small>· ${card.name}</small>${reversed ? '<span class="rev-tag">NGƯỢC</span>' : ""}</h4>
        <div class="result-keywords">${card.keywords.join(" · ")}</div>
        <div class="meaning">${reversed ? card.rev : card.up}</div>
      </div>`;
    readingResult.appendChild(div);
  });

  const shareEl = document.createElement("div");
  shareEl.className = "result-card";
  shareEl.innerHTML = `<div class="owl">${OWL()}</div>
    <div><div class="result-pos">Cú Nguyệt dặn dò</div>
    <div class="meaning">${notes.join(" ")} Bài chỉ soi đường — người bước vẫn là bạn.</div>
    <div class="story-controls" style="justify-content:flex-start;margin-top:12px">
      <button class="btn btn-ghost btn-sm" id="shareReading">${ICON("share")}Gửi kết quả cho bạn bè</button>
    </div></div>`;
  readingResult.appendChild(shareEl);
  Narrator.say(tableSay, notes[0] || "Bài đã nói xong. Đọc chậm từng lá nhé.");
  shareEl.querySelector("#shareReading").addEventListener("click", async () => {
    const names = chosen.map((c, i) => `• ${positions[i]}: ${c.entry.card.vi}${c.entry.reversed ? " (ngược)" : ""}`);
    const text = `Mình vừa trải ${spreadSize} lá ở Tiệm Tarot Đêm Khuya${q ? ` — “${q}”` : ""}:\n` +
      names.join("\n") + `\n${location.origin}/game.html`;
    try {
      if (navigator.share) await navigator.share({ title: "Tiệm Tarot Đêm Khuya", text });
      else { await navigator.clipboard.writeText(text); toast("Đã chép kết quả — dán vào khung chat là xong!"); }
    } catch { /* người dùng huỷ */ }
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
  SFX.play("page");
  toast("Sổ tay đã trắng tinh — sẵn sàng cho những trang mới.");
});
renderJournal();

// ---- Hỏi nhanh Có / Không ----
const NEUTRAL_IDS = new Set([0, 2, 10, 12, 14, 18]); // Ngố, Nữ Tư Tế, Vòng Xoay, Người Treo, Tiết Chế, Mặt Trăng
document.getElementById("yesnoBtn").addEventListener("click", () => {
  const q = document.getElementById("yesnoInput").value.trim();
  const card = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
  const reversed = Math.random() < 0.3;
  const verdict = NEUTRAL_IDS.has(card.id) ? "half" : (reversed ? "no" : "yes");
  const verdictText = {
    yes: "CÓ — cứ mạnh dạn!",
    no: "CHƯA — chưa phải lúc",
    half: "Lưng chừng — vũ trụ để bạn tự quyết"
  }[verdict];
  SFX.play({ yes: "yes", no: "no", half: "bowl" }[verdict]);

  const box = document.getElementById("yesnoResult");
  box.innerHTML = `
    <div class="verdict ${verdict}">${verdictText}</div>
    ${q ? `<div class="verdict-q">“${esc(q)}”</div>` : ""}
    <div class="verdict-card">
      ${cardThumb(card, reversed)}
      <div>
        <b>${card.vi}</b> <small>(${card.name})${reversed ? " — ngược" : ""}</small>
        <div class="meaning">${reversed ? card.rev : card.up}</div>
      </div>
    </div>`;
  box.hidden = false;
  burstAt(box.querySelector(".verdict"), 14, cardFX(card).colors, cardFX(card).chars);
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
  "Tử vi ngày " + todayKey.split("-").reverse().join("/") + " — chọn cung của bạn:";

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
  SFX.play("chime");
  burstAt(btn, 10);
}

const row = (icon, k, v) => `<div class="horo-row"><div class="k">${ICON(icon)} ${k}</div><div class="v">${v}</div></div>`;

function showHoroscope(sign) {
  const rng = mulberry32(hashStr(`${todayKey}-${sign.id}`));
  const score = 2 + Math.floor(rng() * 4);
  const luckyNum = Math.floor(rng() * 99) + 1;

  horoResult.innerHTML = `
    <div class="horo-head">
      <span class="big-icon">${sign.icon}</span>
      <h3>${sign.vi}</h3>
      <span class="el">${sign.dates} · Nguyên tố ${sign.element}</span>
      <span class="horo-score">${"★".repeat(score)}${"☆".repeat(5 - score)} ${score}/5</span>
    </div>
    ${row("heart", "Tình cảm", pick(rng, FORTUNE_POOLS.love))}
    ${row("coin", "Tài lộc", pick(rng, FORTUNE_POOLS.money))}
    ${row("quill", "Việc & học", pick(rng, FORTUNE_POOLS.work))}
    ${row("mood", "Tâm trạng", pick(rng, FORTUNE_POOLS.mood))}
    ${row("amulet", "Vật may mắn", "Hôm nay nên mang theo " + pick(rng, FORTUNE_POOLS.luckyItem))}
    ${row("hash", "Số may mắn", `${luckyNum} — biết đâu đấy!`)}
    ${row("compass", "Lời vũ trụ", pick(rng, FORTUNE_POOLS.advice))}
    ${row("rings", "Đo độ hợp", `Bạn đang chọn <b>${sign.vi}</b> — bấm thêm một cung nữa để xem hôm nay hai bạn hợp nhau đến đâu.`)}`;

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
  const hearts = Math.max(1, Math.round(pct / 20));

  horoResult.innerHTML = `
    <div class="horo-head">
      <span class="big-icon">${a.icon} ${b.icon}</span>
      <h3>${a.vi} × ${b.vi}</h3>
      <span class="horo-score">${"♥".repeat(hearts)}${"♡".repeat(5 - hearts)}</span>
    </div>
    <div class="compat-meter"><div class="compat-fill" style="width:${pct}%">${pct}%</div></div>
    ${row("orbit", "Nguyên tố", `${a.element} × ${b.element}: ${comment}.`)}
    ${row("scroll", "Kết luận", tier)}
    ${row("sparkle", "Mẹo nhỏ", `Bấm lại ${a.vi} hoặc ${b.vi} để xem tử vi riêng từng cung — hoặc thử một cặp khác.`)}`;

  SFX.play("sparkle");
  SFX.fx("love");
  burstAt(horoResult.querySelector(".compat-meter"), 16, FX_LIB.love.colors, FX_LIB.love.chars);
  horoResult.hidden = false;
  horoResult.scrollIntoView({ behavior: "smooth", block: "center" });

  // Reset để lần click sau bắt đầu cặp mới
  primarySign = null;
  zodiacGrid.querySelectorAll(".zodiac-btn").forEach(x => x.classList.remove("active"));
}
