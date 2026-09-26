/* ===== Thần số học Pythagoras ===== */

makeStars();
initSoundToggle();

(function prefill() {
  const p = Profile.get();
  if (p.name) document.getElementById("nameInput").value = p.name;
  if (p.dob) document.getElementById("dobInput").value = p.dob;
})();

const VOWELS = new Set("aeiouy".split("")); // y tính nguyên âm theo trường phái phổ biến

// Chuỗi mô tả cách cộng: 27 -> "27 → 2+7 = 9"
function calcChain(n) {
  const steps = [String(n)];
  while (n > 9 && ![11, 22].includes(n)) {
    const next = digitSum(n);
    steps.push(`${String(n).split("").join("+")} = ${next}`);
    n = next;
  }
  return { final: n, chain: steps.join(" → ") };
}

function letterSum(str, onlyVowels = null) {
  let total = 0;
  for (const ch of vnFold(str)) {
    const isVowel = VOWELS.has(ch);
    if (onlyVowels === true && !isVowel) continue;
    if (onlyVowels === false && isVowel) continue;
    total += NUM_MAP[ch] || 0;
  }
  return total;
}

function numCard(icon, label, desc, num, chain, extra = "") {
  const m = NUM_MEANINGS[num];
  const master = [11, 22].includes(num);
  return `
    <div class="num-card ${master ? "master" : ""}">
      <div class="num-badge">${icon} ${num}</div>
      <div class="num-body">
        <div class="result-pos">${label}${master ? ' <small class="approx">MASTER</small>' : ""}</div>
        <h4>${m.name}</h4>
        <div class="num-desc">${desc}</div>
        <div class="num-calc">${chain}</div>
        <div class="meaning">${m.text}</div>
        ${extra}
      </div>
    </div>`;
}

document.getElementById("decodeBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim();
  const dob = document.getElementById("dobInput").value;
  if (!dob) { toast("Cho mình xin ngày sinh đã!"); return; }
  if (!name) { toast("Cần họ tên để đọc số Linh hồn & Biểu đạt!"); return; }

  const [y, m, d] = dob.split("-").map(Number);
  Profile.set({ ...Profile.get(), name, dob });

  const lifepath = calcChain(d + m + y);
  const soul = calcChain(letterSum(name, true));
  const expr = calcChain(letterSum(name));
  const birthday = calcChain(d);
  const personalYear = calcChain(reduceNum(d + m) + reduceNum(new Date().getFullYear()));

  const nameHint = `<div class="num-calc">Chữ cái quy về số theo bảng Pythagoras (A=1…Z=8)</div>`;

  const html = `
    <div class="result-card">
      <div class="result-icon">${ICON("mood")}</div>
      <div><div class="result-pos">Hồ sơ</div>
      <h4>${esc(name)}</h4>
      <div class="meaning">Sinh ${d}/${m}/${y} — vũ trụ xếp xong con số của bạn rồi đây:</div></div>
    </div>
    <div class="num-grid">
      ${numCard(ICON("compass"), NUM_LABELS.lifepath, NUM_LABELS.lifepathDesc, lifepath.final, `Ngày ${d} + Tháng ${m} + Năm ${y} = ${d + m + y} → ${lifepath.chain}`)}
      ${numCard(ICON("heart"), NUM_LABELS.soul, NUM_LABELS.soulDesc, soul.final, `Nguyên âm trong “${name}” = ${letterSum(name, true)} → ${soul.chain}`)}
      ${numCard(ICON("chat"), NUM_LABELS.expression, NUM_LABELS.expressionDesc, expr.final, `Toàn bộ “${name}” = ${letterSum(name)} → ${expr.chain}`)}
      ${numCard(ICON("candle"), NUM_LABELS.birthday, NUM_LABELS.birthdayDesc, birthday.final, `Ngày sinh ${d} → ${birthday.chain}`)}
      ${numCard(ICON("hourglass"), NUM_LABELS.personalYear, NUM_LABELS.personalYearDesc, personalYear.final, `Ngày+tháng sinh (${reduceNum(d + m)}) + năm ${new Date().getFullYear()} (${reduceNum(new Date().getFullYear())}) → ${personalYear.chain}`, nameHint)}
    </div>
    <div class="result-card">
      <div class="result-icon">${ICON("amulet")}</div>
      <div>
        <div class="result-pos">Ghép lại</div>
        <div class="meaning">
          Tóm gọn: đường đời <b>${lifepath.final}</b> · linh hồn khát <b>${soul.final}</b> · thế giới thấy <b>${expr.final}</b> · quà trời cho <b>${birthday.final}</b> · năm nay đang chạy vibe số <b>${personalYear.final}</b>.
        </div>
        <button class="btn btn-ghost btn-sm" id="shareNum">${ICON("share")}Chia sẻ</button>
      </div>
    </div>`;

  const box = document.getElementById("numResult");
  box.innerHTML = html;
  box.hidden = false;
  SFX.play("reveal");
  burstAt(box.querySelector(".num-grid"), 18);
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });

  document.getElementById("shareNum").addEventListener("click", async () => {
    const text = `🔢 Thần số học của ${name}: Đường đời ${lifepath.final} · Linh hồn ${soul.final} · Biểu đạt ${expr.final} · Ngày sinh ${birthday.final} · Năm cá nhân ${personalYear.final} — tại Tiệm Tarot Đêm Khuya!`;
    try {
      if (navigator.share) await navigator.share({ title: "Thần số học", text });
      else { await navigator.clipboard.writeText(text); toast("Đã copy!"); }
    } catch { /* cancelled */ }
  });
});
