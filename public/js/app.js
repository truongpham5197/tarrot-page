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
      const d = cardDetail(card, reversed);
      Narrator.say(meaning, `${d.g} <b>Thông điệp vũ trụ:</b> ${CARD_MSG[card.id][reversed ? 1 : 0]} <b>Lời khuyên hôm nay:</b> ${d.adv}`, 12);
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

// ---- Tự học: phản hồi 👍/👎 + từ khoá chủ đề người dùng dạy (localStorage) ----
const FEEDBACK_KEY = "tarot-feedback";
const LEARN_KEY = "tarot-learn-topics";
const store = {
  get(k, dflt) { try { return JSON.parse(localStorage.getItem(k)) ?? dflt; } catch { return dflt; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* chế độ riêng tư */ } }
};
Object.assign(LEARNED_TOPIC_WORDS, store.get(LEARN_KEY, {}));

// Hồ sơ văn phong rút ra từ 20 phản hồi gần nhất (cũ tự phai dần)
function learnProfile() {
  const fb = store.get(FEEDBACK_KEY, { events: [], liked: [] });
  const cnt = r => fb.events.filter(e => e.r === r).length;
  const long = cnt("long") - cnt("short");
  return {
    length: long >= 2 ? "short" : long <= -2 ? "long" : "normal",
    directness: cnt("offtopic") >= 1 ? "high" : "normal",
    specificity: cnt("generic") >= 1 ? "high" : "normal",
    liked: fb.liked.slice(0, 3),
    disliked: [cnt("long") >= 2 && "lan man, dài dòng", cnt("generic") >= 2 && "câu sáo rỗng áp dụng cho ai cũng được", cnt("offtopic") >= 2 && "lạc đề"].filter(Boolean)
  };
}
function recordFeedback(v, r, text) {
  const fb = store.get(FEEDBACK_KEY, { events: [], liked: [] });
  fb.events = [{ v, r, ts: Date.now() }, ...fb.events].slice(0, 20);
  if (v === "up" && text) fb.liked = [text.slice(0, 200), ...fb.liked].slice(0, 3);
  store.set(FEEDBACK_KEY, fb);
}
// Người dùng sửa chủ đề → nhớ các từ trong câu hỏi chưa thuộc chủ đề nào
const STOP_WORDS = new Set("tôi mình em anh chị tớ có không nên sẽ được là và của cho với này đó thì mà khi nào bao giờ sao tại vì làm gì như thế nào hay hoặc người ấy nó họ ta rồi chưa đã đang một những các lại ra vào bị".split(" "));
function learnTopic(q, topic) {
  const learned = store.get(LEARN_KEY, {});
  for (const w of q.normalize("NFC").toLowerCase().split(/[^\p{L}]+/u)) {
    if (w.length < 2 || STOP_WORDS.has(w)) continue;
    if (topic === "general") delete learned[w]; else learned[w] = topic;
  }
  const keys = Object.keys(learned);
  keys.slice(0, Math.max(0, keys.length - 300)).forEach(k => delete learned[k]);
  store.set(LEARN_KEY, learned);
  for (const k in LEARNED_TOPIC_WORDS) delete LEARNED_TOPIC_WORDS[k];
  Object.assign(LEARNED_TOPIC_WORDS, learned);
}

let lastReading = null;   // cho sổ tay: {topic, score, qtype, verdict}
let conclToken = 0;       // bỏ kết quả AI về trễ của lượt trải cũ
const fmtAI = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");

function renderConclusion(el, q, topicOverride) {
  const token = ++conclToken;
  const positions = POSITIONS[spreadSize];
  const info = buildConclusion(
    chosen.map(({ entry }, i) => ({ card: entry.card, reversed: entry.reversed, pos: positions[i] })), q, topicOverride);
  const profile = learnProfile();
  const history = getJournal();
  const deep = deepConclusion(info, q, { history, profile });
  lastReading = { topic: info.topic, score: +info.score.toFixed(2), qtype: deep.qtype, verdict: info.verdict.title };

  el.innerHTML = `<div class="g-icon">${ICON("sparkle")}</div>
    <div><div class="result-pos">Kết luận</div>
    <div class="verdict ${info.verdict.cls} verdict-inline">${info.verdict.title}</div>
    ${info.parts.map(p => `<p class="meaning">${p}</p>`).join("")}
    <div class="final-concl">
      <div class="final-head"><span>${ICON("sparkle")} Kết luận cuối cùng</span><span class="final-src"></span></div>
      <div class="final-body read-long meaning">${deep.paras.map(p => `<p>${p}</p>`).join("")}</div>
    </div>
    <div class="fb-row">
      <span class="fb-q">Kết luận này có đúng ý bạn?</span>
      <button class="btn btn-ghost btn-sm" data-fb="up" aria-label="Hữu ích">👍</button>
      <button class="btn btn-ghost btn-sm" data-fb="down" aria-label="Chưa ổn">👎</button>
    </div>
    <div class="fb-more" hidden></div></div>`;

  const src = el.querySelector(".final-src");
  const body = el.querySelector(".final-body");
  let aiText = "";

  // Gọi AI khi có câu hỏi; lỗi/không có key → giữ nguyên bản cục bộ
  if (q) {
    const cacheKey = "ai:" + hashStr(q + info.topic + chosen.map(c => c.entry.card.id + (c.entry.reversed ? "r" : "")).join(","));
    let cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(cacheKey)); } catch { /* bỏ qua */ }
    const show = r => {
      if (token !== conclToken) return;
      aiText = r.answer;
      body.innerHTML = `<p class="final-answer">${fmtAI(r.answer)}</p>` +
        r.paragraphs.map(p => `<p>${fmtAI(p)}</p>`).join("") +
        (r.steps.length ? `<p><b>Lộ trình:</b></p><ol class="final-steps">${r.steps.map(s => `<li>${fmtAI(s)}</li>`).join("")}</ol>` : "") +
        (r.closing ? `<p><b>Chốt lại:</b> ${fmtAI(r.closing)}</p>` : "");
      src.textContent = "✦ luận riêng cho câu hỏi của bạn";
      src.className = "final-src ai";
    };
    if (cached) show(cached);
    else {
      src.textContent = "Cú Nguyệt đang suy ngẫm sâu hơn…";
      src.className = "final-src loading";
      const topicField = e => { const t = POSITION_TOPIC[e.pos]; return t && t !== "adv" ? t : info.topic === "general" ? "g" : info.topic; };
      fetch("/api/tarot-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q, qtype: deep.qtype, topic: TOPIC_INFO[info.topic]?.label || "tổng quan",
          verdict: info.verdict.title, score: info.score, profile,
          cards: info.scored.map(e => ({
            name: e.card.vi, reversed: e.reversed, pos: e.pos, keywords: e.d.kw.split(",").map(s => s.trim()),
            general: e.d.g, focus: e.d[topicField(e)], advice: e.d.adv, score: e.d.score
          })),
          history: history.slice(0, 5).map(h => ({
            q: h.q, cards: h.cards.join(", "), verdict: h.verdict || "",
            ago: `${Math.max(0, Math.round((Date.now() - h.ts) / 86400000))} ngày trước`
          }))
        })
      }).then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(r => {
          if (!r || !r.answer || !Array.isArray(r.paragraphs)) throw 0;
          r.steps = Array.isArray(r.steps) ? r.steps : [];
          try { sessionStorage.setItem(cacheKey, JSON.stringify(r)); } catch { /* đầy bộ nhớ */ }
          show(r);
        })
        .catch(() => { if (token === conclToken) { src.textContent = ""; src.className = "final-src"; } });
    }
  }

  // Phản hồi → học
  const more = el.querySelector(".fb-more");
  const row = el.querySelector(".fb-row");
  const thanks = msg => { row.innerHTML = `<span class="fb-q">${msg}</span>`; more.hidden = true; };
  el.querySelector('[data-fb="up"]').addEventListener("click", () => {
    recordFeedback("up", "", aiText);
    SFX.play("page");
    thanks("Cảm ơn bạn — Cú Nguyệt sẽ giữ giọng đọc này cho những lần sau. 🦉");
  });
  el.querySelector('[data-fb="down"]').addEventListener("click", () => {
    more.hidden = false;
    more.innerHTML = `<div class="fb-q">Điều gì chưa ổn?</div>
      <div class="fb-chips">
        <button class="chip" data-r="offtopic">Chưa trả lời đúng câu hỏi</button>
        <button class="chip" data-r="generic">Chung chung quá</button>
        <button class="chip" data-r="long">Dài quá</button>
        <button class="chip" data-r="short">Ngắn quá</button>
      </div>`;
    more.querySelectorAll("[data-r]").forEach(b => b.addEventListener("click", () => {
      const r = b.dataset.r;
      recordFeedback("down", r);
      if (r !== "offtopic" || !q) { thanks("Đã ghi nhận — lần sau kết luận sẽ được điều chỉnh theo ý bạn."); return; }
      // Lạc đề: hỏi lại chủ đề thật, dạy từ khoá rồi luận lại ngay
      more.innerHTML = `<div class="fb-q">Câu hỏi của bạn thực ra về chuyện gì?</div>
        <div class="fb-chips">${[...Object.entries(TOPIC_INFO).map(([k, t]) => [k, t.label]), ["general", "Tổng quát"]]
          .map(([k, l]) => `<button class="chip" data-t="${k}">${l}</button>`).join("")}</div>`;
      more.querySelectorAll("[data-t]").forEach(t => t.addEventListener("click", () => {
        learnTopic(q, t.dataset.t);
        SFX.play("flip");
        renderConclusion(el, q, t.dataset.t);
        toast("Đã học — những câu hỏi tương tự sẽ được hiểu đúng hơn.");
      }));
    }));
  });
  return info;
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
  const topic = detectTopic(q);
  chosen.forEach(({ entry }, i) => {
    const { card, reversed } = entry;
    const pos = positions[i];
    const posTopic = POSITION_TOPIC[pos];
    // Luận giải dài: trải 5 lá đọc theo mảng của vị trí, còn lại theo chủ đề câu hỏi
    const paras = longReading(card, reversed, posTopic || topic, pos);
    const div = document.createElement("div");
    div.className = "result-card";
    div.style.animationDelay = `${i * 0.12}s`;
    div.innerHTML = `
      ${cardThumb(card, reversed)}
      <div>
        <div class="result-pos">${pos}</div>
        <h4>${card.vi} <small>· ${card.name}</small>${reversed ? '<span class="rev-tag">NGƯỢC</span>' : ""}</h4>
        <div class="result-keywords">${card.keywords.join(" · ")}</div>
        ${POSITION_HINT[pos] ? `<div class="pos-hint">${POSITION_HINT[pos]}</div>` : ""}
        <div class="read-long meaning">${paras.map(p => `<p>${p}</p>`).join("")}</div>
      </div>`;
    readingResult.appendChild(div);
  });

  // Kết luận: tổng quan + kết luận cuối cùng (cục bộ trước, AI thay vào khi về)
  const concl = document.createElement("div");
  concl.className = "result-card conclusion";
  readingResult.appendChild(concl);
  const verdictInfo = renderConclusion(concl, q);

  const shareEl = document.createElement("div");
  shareEl.className = "result-card";
  shareEl.innerHTML = `<div class="owl">${OWL()}</div>
    <div><div class="result-pos">Cú Nguyệt dặn dò</div>
    <div class="meaning">${notes.join(" ")} Bài chỉ soi đường — người bước vẫn là bạn.</div>
    <div class="story-controls" style="justify-content:flex-start;margin-top:12px">
      <button class="btn btn-ghost btn-sm" id="shareReading">${ICON("share")}Gửi kết quả cho bạn bè</button>
    </div></div>`;
  readingResult.appendChild(shareEl);
  Narrator.say(tableSay, `Kết luận: <b>${verdictInfo.verdict.title}</b>. Đọc chậm từng lá, rồi xem phần kết luận nhé.`);
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
    ts: Date.now(), q, spread: spreadSize, ...lastReading,
    cards: chosen.map(c => c.entry.card.vi + (c.entry.reversed ? " (ngược)" : ""))
  });
  store.set(JOURNAL_KEY, entries.slice(0, 20));
  renderJournal();
}
function renderJournal() {
  const entries = getJournal().slice(0, 8);
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
document.getElementById("yesnoBtn").addEventListener("click", () => {
  const q = document.getElementById("yesnoInput").value.trim();
  const card = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
  const reversed = Math.random() < 0.3;
  const d = cardDetail(card, reversed);
  const verdict = d.score >= 1 ? "yes" : d.score <= -1 ? "no" : "half";
  const topic = detectTopic(q);
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
        <div class="read-long meaning">${longReading(card, reversed, topic).map(p => `<p>${p}</p>`).join("")}</div>
        <div class="meaning"><b>Kết luận:</b> ${{
          yes: "Lá bài ủng hộ bạn — cứ tiến hành, nhưng làm cho chắc tay.",
          no: "Lá bài chưa ủng hộ ở thời điểm này — lùi lại, chuẩn bị thêm rồi hỏi lại sau.",
          half: "Kết quả chưa ngã ngũ — nó phụ thuộc vào cách bạn hành động."
        }[verdict]}</div>
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
