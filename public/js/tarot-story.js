/* ===== Tarot — Hành trình của Kẻ Ngố (story mode) ===== */

makeStars();
initSoundToggle();

// Mỗi lá Ẩn Chính là một cảnh trong truyện: hình ảnh trên lá bài + khúc quanh khi lá ngược + món quà mang về
const SCENES = [
  { motif: "chiếc tay nải", gift: "sự hồn nhiên dám bắt đầu lại",
    scene: "Một lữ khách trẻ, tay nải nhẹ tênh, đứng sát mép vực mà vẫn ngước nhìn trời; chú chó nhỏ sủa vang như giục giã.",
    twist: "Nhưng bước chân vội quá — suýt nữa hụt chân vì chẳng buồn nhìn đường." },
  { motif: "cây đũa phép", gift: "niềm tin rằng mình đã đủ công cụ",
    scene: "Một pháp sư giơ cao cây đũa phép; trên bàn trước mặt có đủ gậy, chén, kiếm, đồng tiền — mọi thứ bạn cần đều đã sẵn trong tay.",
    twist: "Có điều phép thuật đang dùng sai chỗ — tài năng thì có, chỉ thiếu sự tập trung." },
  { motif: "cuộn sách bí mật", gift: "đôi tai nghe được trực giác",
    scene: "Giữa hai cột trụ đen trắng, Nữ Tư Tế khẽ hé cuộn sách bí mật — có những câu trả lời chỉ đến khi bạn đủ lặng để nghe.",
    twist: "Nhưng tấm màn vẫn buông kín: bạn đang phớt lờ tiếng nói bên trong của chính mình." },
  { motif: "khu vườn lúa mì", gift: "sự dịu dàng biết nuôi dưỡng",
    scene: "Bạn lạc vào khu vườn lúa mì chín vàng, nơi Nữ Hoàng tựa gối nhung — những gì bạn chăm bẵm bấy lâu bắt đầu trổ bông.",
    twist: "Có điều khu vườn đang héo, vì bạn mải tưới cho người khác mà quên tưới cho mình." },
  { motif: "ngai đá", gift: "một kỷ luật vững như đá",
    scene: "Trên ngai đá khắc đầu cừu, Hoàng Đế nhìn thẳng vào bạn: “Muốn đi xa, phải có bản đồ và kỷ luật.”",
    twist: "Nhưng luật lệ đã hoá thành gông — cứng quá thì gãy." },
  { motif: "chiếc chìa khoá bạc", gift: "sự khiêm tốn để học hỏi",
    scene: "Vị Giáo Hoàng trao cho bạn chiếc chìa khoá bạc, kèm theo lời dặn của những người đã đi trước.",
    twist: "Nhưng chiếc chìa ấy không vừa ổ khoá của bạn — đôi khi phải tự rèn chìa riêng." },
  { motif: "lời thề dưới tán cây", gift: "một lựa chọn xuất phát từ trái tim",
    scene: "Dưới tán cây trái cấm, hai người trao nhau lời thề — và bạn phải chọn điều mình thật sự trân quý.",
    twist: "Nhưng lòng bạn đang chia đôi: miệng đã hứa mà tim chưa gật." },
  { motif: "cỗ xe nhân sư", gift: "ý chí biết cầm cương",
    scene: "Cỗ xe do hai con nhân sư đen trắng kéo lao đến; bạn nắm cương, và chỉ ý chí mới giữ chúng chạy chung một hướng.",
    twist: "Nhưng hai con nhân sư đang kéo hai ngả — bạn gồng hết sức mà xe vẫn đứng yên." },
  { motif: "con sư tử hiền", gift: "sức mạnh của sự dịu dàng",
    scene: "Một con sư tử chặn đường. Thay vì rút kiếm, bạn đặt tay lên bờm nó — và nó cúi đầu hiền như mèo.",
    twist: "Nhưng con sư tử ấy đang gầm bên trong bạn — nỗi sợ và cơn giận chưa được vỗ về." },
  { motif: "ngọn đèn lồng", gift: "ngọn đèn soi vào bên trong",
    scene: "Trên đỉnh núi tuyết, một ẩn sĩ giơ cao ngọn đèn lồng, soi cho bạn thấy đúng một bước tiếp theo — và thế là đủ.",
    twist: "Nhưng ở một mình quá lâu, ánh đèn đã thành bức tường ngăn bạn với mọi người." },
  { motif: "bánh xe vận mệnh", gift: "niềm tin vào vòng quay của đời",
    scene: "Bánh xe vận mệnh khổng lồ chầm chậm quay trên bầu trời; thứ đang ở dưới sắp được nâng lên.",
    twist: "Bánh xe lỡ quay ngược một nhịp — vận xui ghé ngang, nhưng không ở lại lâu." },
  { motif: "cán cân vàng", gift: "sự công bằng với chính mình",
    scene: "Nữ thần Công Lý đặt cán cân vàng trước mặt bạn — mọi việc bạn từng làm đều được cân đủ, không thừa không thiếu.",
    twist: "Nhưng cán cân lệch hẳn một bên — có điều gì đó bạn chưa thành thật với chính mình." },
  { motif: "cây treo ngược", gift: "một góc nhìn hoàn toàn mới",
    scene: "Bạn gặp một người treo ngược trên cây, gương mặt bình thản lạ lùng. Thử nhìn thế giới lộn ngược như anh, bạn chợt thấy một lối đi khác.",
    twist: "Nhưng chờ lâu quá thành trì hoãn — sợi dây kia do chính tay bạn buộc." },
  { motif: "đoá hồng trắng", gift: "lòng can đảm để buông tay",
    scene: "Một kỵ sĩ áo đen cưỡi ngựa trắng đi ngang, lá cờ thêu đoá hồng trắng — một chương cũ khép lại để chương mới có chỗ mở ra.",
    twist: "Nhưng bạn cứ níu cánh cửa không cho khép — và cái cũ cứ lay lắt mãi." },
  { motif: "hai chiếc chén", gift: "sự cân bằng vừa đủ",
    scene: "Bên bờ suối, một thiên thần rót nước qua lại giữa hai chiếc chén mà không rơi một giọt — mọi thứ đều cần đúng liều lượng.",
    twist: "Nhưng nước đang tràn — bạn dồn quá nhiều vào một chỗ." },
  { motif: "sợi xích lỏng", gift: "tự do khỏi những sợi xích vô hình",
    scene: "Trong hang tối, hai người bị xích dưới chân Ác Ma. Nhìn kỹ mới thấy vòng xích lỏng lẻo — họ có thể tự tháo ra bất cứ lúc nào.",
    twist: "Tin vui là sợi xích đang tuột dần — bạn đã bắt đầu nhận ra thói quen nào đang trói mình." },
  { motif: "toà tháp sét đánh", gift: "sự thật lộ ra sau đổ vỡ",
    scene: "Một tia sét giáng xuống toà tháp cao; những gì xây trên nền móng giả sụp đổ, để lộ ra nền đất thật.",
    twist: "Tia sét lẽ ra đã đánh, nhưng bạn gắng chống đỡ — cơn đổ vỡ chỉ đang bị hoãn lại." },
  { motif: "hồ nước sao", gift: "niềm hy vọng đã được chữa lành",
    scene: "Sau cơn bão là bầu trời đầy sao. Bên hồ nước lấp lánh, một cô gái rót hy vọng trở lại mặt đất.",
    twist: "Nhưng mây vẫn còn che — bạn tạm quên rằng mình từng tin vào điều tốt đẹp." },
  { motif: "con đường dưới trăng", gift: "bản lĩnh đi xuyên qua nỗi sợ",
    scene: "Con đường dưới trăng uốn lượn giữa hai ngọn tháp; sói tru, tôm hùm bò lên từ hồ sâu — không phải mọi thứ đều như vẻ ngoài.",
    twist: "Làn sương đang tan dần — điều mơ hồ bấy lâu sắp lộ rõ hình hài." },
  { motif: "đứa trẻ cưỡi ngựa trắng", gift: "niềm vui trong trẻo",
    scene: "Mặt Trời bừng lên rực rỡ, một đứa trẻ cưỡi ngựa trắng vẫy tay chào bạn — niềm vui không cần lý do.",
    twist: "Nắng vẫn ở đó, chỉ hơi bị mây che — niềm vui đến chậm hơn bạn muốn, chứ không phải không đến." },
  { motif: "tiếng kèn thức tỉnh", gift: "tiếng gọi thức tỉnh",
    scene: "Tiếng kèn vang lên từ trời cao; người người đứng dậy, sẵn sàng cho một phiên bản mới của chính mình.",
    twist: "Kèn đã vang mà bạn vẫn kéo chăn trùm đầu — nỗi sợ bị phán xét đang giữ bạn nằm lại." },
  { motif: "vòng nguyệt quế", gift: "cảm giác trọn vẹn",
    scene: "Vòng nguyệt quế khép tròn, một vũ công bay lượn giữa bốn phương trời — một hành trình đã trọn.",
    twist: "Vòng tròn còn hở một khe — chỉ thiếu đúng một bước cuối để khép lại." }
];

const CHAPTERS = [
  { pos: "Chương I · Điểm khởi đầu", lead: "Trang đầu tiên mở ra.",
    up: "Đó là bạn lúc này — hành trang đã sẵn, chỉ chờ một bước chân.",
    rev: "Đó là bạn lúc này — chưa hoàn hảo, nhưng câu chuyện nào cũng bắt đầu như thế." },
  { pos: "Chương II · Lời gọi phiêu lưu", lead: "Rồi một đêm, lời gọi đến.",
    up: "Nó thì thầm: “Đi thôi, đừng đợi đủ can đảm rồi mới đi.”",
    rev: "Lời gọi vẫn vang — chỉ là bạn đang giả vờ không nghe thấy." },
  { pos: "Chương III · Thử thách", lead: "Con đường bắt đầu dốc.",
    up: "Đây là thử thách không thể đi vòng — nhưng bạn đủ sức vượt qua.",
    rev: "Thử thách này khó hơn tưởng tượng, vì một nửa của nó nằm ngay trong bạn." },
  { pos: "Chương IV · Đồng hành & phép màu", lead: "Khi ngọn đèn tưởng như sắp tắt —",
    up: "Bạn nhận ra mình chưa bao giờ thật sự đi một mình.",
    rev: "Sự giúp đỡ vẫn ở đó, chỉ là bạn cần mở lời trước." },
  { pos: "Chương V · Trở về", lead: "Cuối con đường,",
    up: g => `Bạn trở về, mang theo ${g}.`,
    rev: g => `Bạn trở về — chưa trọn vẹn, nhưng đã có trong tay hạt mầm của ${g}.` }
];

const BRIGHT = new Set([1, 3, 6, 7, 8, 10, 11, 14, 17, 19, 20, 21]);
const SHADOW = new Set([12, 13, 15, 16, 18]);
const ENDINGS = {
  windward: { title: "Đi ngược gió",
    text: "Nhiều lá ngược cho thấy bạn đang bước ngược chiều gió. Không sao cả — lữ khách giỏi nhất là người biết dừng lại buộc lại dây giày. Chăm chút cho mình trước, rồi hẵng đi tiếp." },
  shadow: { title: "Băng qua bóng tối",
    text: "Câu chuyện của bạn có những khúc quanh tối. Nhưng chính bóng đêm mới làm các vì sao hiện rõ — bạn không đi qua nó để thắng, bạn đi qua để hiểu mình hơn." },
  bright: { title: "Khúc ca rạng rỡ",
    text: "Vũ trụ đang đứng về phía bạn: đường mở, gió xuôi. Việc còn lại chỉ là dám bước — và dám nhận những điều tốt đẹp đang tới." },
  mixed: { title: "Nửa nắng nửa mưa",
    text: "Như mọi câu chuyện đáng kể, hành trình của bạn có cả nắng lẫn mưa. Giữ lấy bài học ở chương cuối — đó là chìa khoá cho chương tiếp theo." }
};

const deckZone = document.getElementById("deckZone");
const deckEl = document.getElementById("deck");
const deckHint = document.getElementById("deckHint");
const revealZone = document.getElementById("revealZone");
const pickedCardsEl = document.getElementById("pickedCards");
const flipBtn = document.getElementById("flipBtn");
const storyResult = document.getElementById("storyResult");
const storySay = document.getElementById("storySay");

let chosen = [];
let gameDeck = [];
let dealing = false;

setTimeout(() => Narrator.say(storySay, "Ngồi xuống đây, lữ khách. 22 lá Ẩn Chính là 22 chặng đường của Kẻ Ngố — đêm nay, nhân vật chính là <b>bạn</b>."), 400);

document.getElementById("suggestBtn").addEventListener("click", () => {
  const input = document.getElementById("questionInput");
  input.value = pick(Math.random, QUESTION_SUGGESTIONS);
  input.focus();
  SFX.play("pick");
});

document.getElementById("startBtn").addEventListener("click", startJourney);

async function startJourney() {
  if (dealing) return;
  dealing = true;
  chosen = [];
  storyResult.hidden = true;
  storyResult.innerHTML = "";
  pickedCardsEl.innerHTML = "";
  pickedCardsEl.classList.remove("reading-on");
  revealZone.hidden = true;
  flipBtn.disabled = false;

  deckZone.hidden = false;
  deckHint.textContent = "Đang xào 22 lá Ẩn Chính…";
  Narrator.say(storySay, "Để ta xào bài. Mỗi lá là một ngã rẽ — lát nữa bạn sẽ chọn năm ngã cho câu chuyện của mình.");
  deckZone.scrollIntoView({ behavior: "smooth", block: "center" });
  await shuffleRitual(deckEl);

  // Chỉ dùng 22 lá Major Arcana — vì đây là hành trình của Kẻ Ngố
  gameDeck = shuffle(MAJOR_DECK).map(card => ({ card, reversed: Math.random() < 0.3 }));
  deckEl.innerHTML = "";
  gameDeck.forEach((entry, i) => {
    const el = makeCardEl(entry.card, false);
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", `Lá bài úp số ${i + 1}`);
    el.style.setProperty("--rot", `${(i - 10.5) * 4.3}deg`);
    el.style.animation = `dealIn .4s ${i * 0.025}s cubic-bezier(.2,.8,.3,1) both`;
    const choose = () => pickCard(el, entry);
    el.addEventListener("click", choose);
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); } });
    deckEl.appendChild(el);
  });
  SFX.play("whoosh");
  updateHint();
  Narrator.say(storySay, "Chọn <b>5 lá</b> theo trực giác. Đừng nghĩ nhiều — lá nào “gọi” bạn thì chọn lá đó.");
  dealing = false;
}

function updateHint() {
  deckHint.innerHTML = `Chọn <b>5 lá</b> <span class="muted">(${chosen.length}/5)</span>` +
    (chosen.length < 5 ? " — lá nào gọi bạn thì chọn" : " — đang xếp bài…");
}

function pickCard(el, entry) {
  if (chosen.length >= 5 || el.classList.contains("chosen")) return;
  el.classList.add("chosen");
  chosen.push({ el, entry });
  SFX.play("pick");
  burstAt(el, 8);
  updateHint();
  if (chosen.length === 5) setTimeout(showPicked, 500);
}

function showPicked() {
  deckZone.hidden = true;
  chosen.forEach(({ entry }, i) => {
    const el = makeCardEl(entry.card, entry.reversed);
    el.style.animation = `rise .5s ${i * 0.1}s ease both`;
    pickedCardsEl.appendChild(el);
  });
  revealZone.hidden = false;
  Narrator.say(storySay, "Năm chặng đường đã bày trên bàn. Lật lên — câu chuyện bắt đầu từ đây.");
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
    renderStory();
    storyResult.hidden = false;
    SFX.play("reveal");
    storyResult.scrollIntoView({ behavior: "smooth", block: "start" });
  }, cards.length * STEP + 700);
});

function chapterText(i, card, reversed) {
  const s = SCENES[card.id], ch = CHAPTERS[i];
  const tail = reversed ? ch.rev : ch.up;
  return `${ch.lead} ${s.scene}${reversed ? " " + s.twist : ""} ${typeof tail === "function" ? tail(s.gift) : tail}`;
}

function pickEnding(cards) {
  const revs = cards.filter(c => c.reversed).length;
  const bright = cards.filter(c => BRIGHT.has(c.card.id) && !c.reversed).length;
  const shadow = cards.filter(c => SHADOW.has(c.card.id)).length;
  if (revs >= 3) return ENDINGS.windward;
  if (shadow >= 2) return ENDINGS.shadow;
  if (bright >= 3) return ENDINGS.bright;
  return ENDINGS.mixed;
}

function renderStory() {
  const q = document.getElementById("questionInput").value.trim();
  const cards = chosen.map(c => c.entry);
  const names = cards.map(c => c.card.vi + (c.reversed ? " (ngược)" : ""));
  const title = `Từ ${SCENES[cards[0].card.id].motif} đến ${SCENES[cards[4].card.id].motif}`;
  const ending = pickEnding(cards);
  const pickedEls = pickedCardsEl.querySelectorAll(".tarot-card");

  storyResult.innerHTML = `
    <h3 class="story-title"><small>Câu chuyện của bạn</small>${title}</h3>
    ${q ? `<p class="verdict-q">“${esc(q)}”</p>` : ""}
    <div id="chapters" style="display:grid;gap:22px"></div>
    <div class="story-controls" id="storyControls">
      <button class="btn btn-gold" id="nextChapter">${ICON("book")}Đọc chương I</button>
      <button class="btn btn-ghost" id="readAll">${ICON("scroll")}Đọc hết một mạch</button>
    </div>
    <div id="storyEnd"></div>`;

  const chaptersEl = storyResult.querySelector("#chapters");
  const nextBtn = storyResult.querySelector("#nextChapter");
  const ROMAN = ["I", "II", "III", "IV", "V"];
  let step = 0, typingEl = null, typingText = "";

  function addChapter(instant) {
    const { card, reversed } = cards[step];
    const text = chapterText(step, card, reversed);
    const div = document.createElement("div");
    div.className = "result-card chapter";
    div.innerHTML = `
      ${cardThumb(card, reversed)}
      <div>
        <div class="result-pos">${CHAPTERS[step].pos}</div>
        <h4>${card.vi} <small>· ${card.name}</small>${reversed ? '<span class="rev-tag">NGƯỢC</span>' : ""}</h4>
        <p class="meaning story-text"></p>
        <div class="story-plot"><b>Lời bài:</b> ${reversed ? card.rev : card.up}</div>
      </div>`;
    chaptersEl.appendChild(div);
    const textEl = div.querySelector(".story-text");
    pickedCardsEl.classList.add("reading-on");
    pickedEls.forEach((el, k) => el.classList.toggle("reading", k === step));
    if (instant) textEl.textContent = text;
    else {
      if (typingEl) { clearInterval(typingEl._typing); typingEl.innerHTML = typingText; }
      typingEl = textEl; typingText = text;
      Narrator.say(textEl, text, 14);
      SFX.play("page");
      SFX.fx(cardFX(card).snd);
      div.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    step++;
    nextBtn.innerHTML = step < 5 ? `${ICON("book")}Đọc chương ${ROMAN[step]}` : `${ICON("sparkle")}Xem lời kết`;
  }

  function showEnding() {
    if (typingEl) { clearInterval(typingEl._typing); typingEl.innerHTML = typingText; }
    pickedCardsEl.classList.remove("reading-on");
    pickedEls.forEach(el => el.classList.remove("reading"));
    storyResult.querySelector("#storyControls").remove();
    const end = storyResult.querySelector("#storyEnd");
    end.innerHTML = `<div class="result-card story-ending chapter">
      <div style="width:100%">
        <div class="result-pos">Lời kết</div>
        <h4>${ending.title}</h4>
        <div class="card-row">${cards.map(c => cardThumb(c.card, c.reversed)).join("")}</div>
        <p class="meaning">${ending.text}</p>
        <p class="meaning" style="margin-top:10px">Món quà bạn mang về: <b>${SCENES[cards[4].card.id].gift}</b>.</p>
        <div class="story-controls" style="margin-top:16px">
          <button class="btn btn-gold btn-sm" id="shareStory">${ICON("share")}Chia sẻ câu chuyện</button>
        </div>
      </div>
    </div>`;
    SFX.play("reveal");
    burstAt(end.querySelector("h4"), 22);
    Narrator.say(storySay, `Câu chuyện “${title}” đã khép lại. Trang sau là do bạn tự viết.`);
    end.scrollIntoView({ behavior: "smooth", block: "center" });

    end.querySelector("#shareStory").addEventListener("click", async () => {
      const text = `Câu chuyện Tarot của mình: “${title}”\n` +
        names.map((n, i) => `${ROMAN[i]}. ${n}`).join("\n") +
        `\nKết: ${ending.title}.` + (q ? `\nCâu hỏi: “${q}”` : "") +
        `\nThử tại ${location.origin}/games/tarot.html`;
      try {
        if (navigator.share) await navigator.share({ title: "Hành trình Kẻ Ngố", text });
        else { await navigator.clipboard.writeText(text); toast("Đã chép câu chuyện — dán vào story hay khung chat nhé!"); }
      } catch { /* người dùng huỷ */ }
    });
  }

  nextBtn.addEventListener("click", () => (step < 5 ? addChapter(false) : showEnding()));
  storyResult.querySelector("#readAll").addEventListener("click", () => {
    if (typingEl) { clearInterval(typingEl._typing); typingEl.innerHTML = typingText; typingEl = null; }
    while (step < 5) addChapter(true);
    showEnding();
  });
  Narrator.say(storySay, "Bài đã lật. Bấm <b>Đọc chương I</b> — ta sẽ kể cho bạn nghe từng chặng một.");
}

document.getElementById("resetBtn").addEventListener("click", () => {
  revealZone.hidden = true;
  startJourney();
});
