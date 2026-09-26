/* ===== Tarot — Hành trình của Kẻ Ngố (story mode) ===== */

makeStars();
initSoundToggle();

const CHAPTERS = [
  {
    pos: "Chương I — Điểm khởi đầu",
    narr: c => `Mở đầu câu chuyện là hình bóng của ${c.vi}. Đây là bạn — nhân vật chính — ở trang đầu tiên, với tất cả hành lý đang mang trên vai.`
  },
  {
    pos: "Chương II — Lời gọi phiêu lưu",
    narr: c => `Rồi một lời gọi vang lên, mang hình dáng ${c.vi}. Vũ trụ đang rủ rê bạn bước ra khỏi vùng an toàn quen thuộc.`
  },
  {
    pos: "Chương III — Thử thách lớn",
    narr: c => `Như mọi câu chuyện hay, giữa đường xuất hiện ${c.vi} — thử thách không thể né, thứ sẽ rèn bạn thành phiên bản cứng hơn.`
  },
  {
    pos: "Chương IV — Người đồng hành & phép màu",
    narr: c => `May sao, bạn không đi một mình: ${c.vi} xuất hiện đúng lúc — như người đồng hành, hay một phép màu giữa đêm tối.`
  },
  {
    pos: "Chương V — Trở về & kết chương",
    narr: c => `Và chương cuối khép lại bằng ${c.vi} — bài học bạn mang về nhà, thứ sẽ đi theo bạn sang câu chuyện tiếp theo.`
  }
];

const ENDINGS = [
  "Đèn bật lên, hết phim — bạn rời rạp với một nụ cười nhẹ. Phần 2 do bạn tự viết.",
  "Màn hình hiện 'TO BE CONTINUED…' — vũ trụ đang viết phần tiếp theo theo cách bạn sống hôm nay.",
  "Kẻ Ngố nhìn lại con đường đã đi, mỉm cười — và bạn cũng vậy. Câu chuyện hay nhất là câu chuyện đang diễn ra.",
  "Nhân vật chính khép sách lại — nhưng chừa một trang trắng. Trang đó dành cho ngày mai của bạn."
];

const deckZone = document.getElementById("deckZone");
const deckEl = document.getElementById("deck");
const deckHint = document.getElementById("deckHint");
const revealZone = document.getElementById("revealZone");
const pickedCardsEl = document.getElementById("pickedCards");
const flipBtn = document.getElementById("flipBtn");
const storyResult = document.getElementById("storyResult");

let chosen = [];
let gameDeck = [];

document.getElementById("suggestBtn").addEventListener("click", () => {
  const input = document.getElementById("questionInput");
  input.value = pick(Math.random, QUESTION_SUGGESTIONS);
  input.focus();
  SFX.play("pick");
});

document.getElementById("startBtn").addEventListener("click", startJourney);

function startJourney() {
  chosen = [];
  storyResult.hidden = true;
  storyResult.innerHTML = "";
  pickedCardsEl.innerHTML = "";
  revealZone.hidden = true;
  flipBtn.disabled = false;
  SFX.play("whoosh");

  // Chỉ dùng 22 lá Major Arcana — vì đây là hành trình của Kẻ Ngố
  gameDeck = shuffle(MAJOR_DECK).map(card => ({ card, reversed: Math.random() < 0.3 }));
  deckEl.innerHTML = "";
  gameDeck.forEach((entry, i) => {
    const el = makeCardEl(entry.card, false);
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.style.setProperty("--rot", `${(i - 10.5) * 4.3}deg`);
    el.style.animation = `dealIn .35s ${i * 0.022}s ease both`;
    const choose = () => pickCard(el, entry);
    el.addEventListener("click", choose);
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); } });
    deckEl.appendChild(el);
  });

  deckZone.hidden = false;
  updateHint();
  deckZone.scrollIntoView({ behavior: "smooth", block: "center" });
}

function updateHint() {
  deckHint.innerHTML = `Chọn <b>5 lá</b> theo trực giác (đã chọn ${chosen.length}/5)` +
    (chosen.length < 5 ? " — lá nào 'gọi' thì chọn:" : " — đang xếp bài…");
}

function pickCard(el, entry) {
  if (chosen.length >= 5 || el.classList.contains("chosen")) return;
  el.classList.add("chosen");
  chosen.push({ el, entry });
  SFX.play("pick");
  updateHint();
  if (chosen.length === 5) setTimeout(showPicked, 450);
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
  }, i * 420));
  flipBtn.disabled = true;

  setTimeout(() => {
    renderStory();
    storyResult.hidden = false;
    SFX.play("reveal");
    storyResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, cards.length * 420 + 500);
});

function renderStory() {
  const q = document.getElementById("questionInput").value.trim();
  const cards = chosen.map(c => c.entry);
  const names = cards.map(c => c.card.vi + (c.reversed ? " (ngược)" : ""));

  let html = `<div class="story-intro result-card">
    <div class="result-icon">📖</div>
    <div>
      <div class="result-pos">Câu chuyện của bạn${q ? "" : " — vũ trụ tự chọn đề tài"}</div>
      ${q ? `<div class="meaning">“${esc(q)}”</div>` : ""}
      <div class="story-plot">Tóm gọn cốt truyện: đi từ <b>${names[0]}</b>, nghe lời gọi <b>${names[1]}</b>, đối mặt <b>${names[2]}</b>, được <b>${names[3]}</b> nâng đỡ, và khép lại ở <b>${names[4]}</b>.</div>
    </div>
  </div>`;

  cards.forEach(({ card, reversed }, i) => {
    html += `<div class="result-card story-chapter">
      <div class="result-icon ${reversed ? "reversed" : ""}">${card.icon}</div>
      <div>
        <div class="result-pos">${CHAPTERS[i].pos}</div>
        <h4>${card.vi} — ${card.name}${reversed ? '<span class="rev-tag">NGƯỢC</span>' : ""}</h4>
        <div class="meaning story-narr">${CHAPTERS[i].narr(card)}</div>
        <div class="meaning">${reversed ? card.rev : card.up}</div>
      </div>
    </div>`;
  });

  html += `<div class="result-card story-end">
    <div class="result-icon">🎬</div>
    <div>
      <div class="result-pos">Lời kết</div>
      <div class="meaning">${pick(Math.random, ENDINGS)}</div>
      <button class="btn btn-ghost btn-sm" id="shareStory">📤 Chia sẻ câu chuyện</button>
    </div>
  </div>`;

  storyResult.innerHTML = html;

  document.getElementById("shareStory").addEventListener("click", async () => {
    const text = `🔮 Câu chuyện Tarot của tôi tại Tiệm Tarot Đêm Khuya:\n` +
      `từ ${names[0]} → lời gọi ${names[1]} → thử thách ${names[2]} → ${names[3]} nâng đỡ → kết ở ${names[4]}.` +
      (q ? `\nCâu hỏi: “${q}”` : "");
    try {
      if (navigator.share) await navigator.share({ title: "Tiệm Tarot", text });
      else { await navigator.clipboard.writeText(text); toast("Đã copy — dán vào story/chat đi!"); }
    } catch { toast("Chia sẻ bị huỷ — không sao!"); }
  });
}

document.getElementById("resetBtn").addEventListener("click", () => {
  revealZone.hidden = true;
  startJourney();
});
