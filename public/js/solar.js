/* ===== Solar Return — chủ đề năm cá nhân ===== */

makeStars();
initSoundToggle();

(function prefill() {
  const p = Profile.get();
  if (p.name) document.getElementById("nameInput").value = p.name;
  if (p.dob) document.getElementById("dobInput").value = p.dob;
})();

document.getElementById("solarBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim() || "Bạn";
  const dob = document.getElementById("dobInput").value;
  if (!dob) { toast("Cho mình xin ngày sinh đã!"); return; }

  const [by, bm, bd] = dob.split("-").map(Number);
  Profile.set({ ...Profile.get(), name, dob });

  const now = new Date();
  const thisYear = now.getFullYear();
  const bdayThisYear = new Date(thisYear, bm - 1, bd);
  const lastBDayYear = now >= bdayThisYear ? thisYear : thisYear - 1;
  const nextBday = now >= bdayThisYear ? new Date(thisYear + 1, bm - 1, bd) : bdayThisYear;
  const ageAtNext = nextBday.getFullYear() - by;
  const daysLeft = Math.ceil((nextBday - now) / 864e5);

  // Năm cá nhân (sinh nhật → sinh nhật)
  const py = reduceNum(reduceNum(bd + bm) + reduceNum(lastBDayYear));
  const theme = SOLAR_YEAR[py];

  // Lá chủ đề năm — seeded theo năm solar return
  const rng = mulberry32(hashStr(`solar-${dob}-${lastBDayYear}`));
  const card = MAJOR_DECK[Math.floor(rng() * 22)];
  const reversed = rng() < 0.25;

  const sun = sunSign(bd, bm);
  const isToday = daysLeft === 365 || daysLeft === 0;

  const html = `
    <div class="result-card">
      <div class="result-icon">${ICON("candle")}</div>
      <div>
        <div class="result-pos">Đếm ngược</div>
        <h4>${isToday ? "Hôm nay là sinh nhật bạn — chúc mừng sinh nhật!" : `Còn ${daysLeft} ngày nữa là tuổi ${ageAtNext}`}</h4>
        <div class="meaning">Solar Return gần nhất của ${esc(name)}: <b>${bd}/${bm}/${lastBDayYear}</b> — năm này chạy đến ${bd}/${bm}/${nextBday.getFullYear()}.</div>
      </div>
    </div>

    <div class="solar-grid">
      <div class="num-card ${[11, 22].includes(py) ? "master" : ""}">
        <div class="num-badge">${py}</div>
        <div class="num-body">
          <div class="result-pos">Năm cá nhân ${py}${[11, 22].includes(py) ? ' <small class="approx">MASTER</small>' : ""}</div>
          <h4>${NUM_MEANINGS[py].name}</h4>
          <div class="meaning">${theme}</div>
          <div class="num-calc">Ngày+tháng sinh (${reduceNum(bd + bm)}) + năm solar return ${lastBDayYear} (${reduceNum(lastBDayYear)}) → ${py}</div>
        </div>
      </div>

      <div class="result-card solar-card">
        <div class="tarot-card mini flipped" style="--c1:${card.colors[0]};--c2:${card.colors[1]}">
          <div class="card-inner">
            <div class="card-face card-back"><div class="back-pattern">☾</div></div>
            <div class="card-face card-front ${reversed ? "reversed-art" : ""}">${cardFrontHTML(card, reversed)}</div>
          </div>
        </div>
        <div>
          <div class="result-pos">Lá chủ đề năm</div>
          <h4>${card.vi} — ${card.name}${reversed ? '<span class="rev-tag">NGƯỢC</span>' : ""}</h4>
          <div class="meaning">${reversed ? card.rev : card.up}</div>
        </div>
      </div>
    </div>

    <div class="result-card">
      <div class="result-icon big-icon">${sun.icon}</div>
      <div>
        <div class="result-pos">Điểm Mặt trời về nhà</div>
        <div class="meaning">Mặt trời trở lại đúng vị trí <b>${sun.vi}</b> khi bạn chào đời — ${SIGN_ESSENCE[ZODIAC_SIGNS.indexOf(sun)]}.</div>
        <button class="btn btn-ghost btn-sm" id="shareSolar">${ICON("share")}Chia sẻ</button>
      </div>
    </div>`;

  const box = document.getElementById("solarResult");
  box.innerHTML = html;
  box.hidden = false;
  SFX.play(isToday ? "reveal" : "sparkle");
  burstAt(box.querySelector(".tarot-card"), 16);
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });

  document.getElementById("shareSolar").addEventListener("click", async () => {
    const text = `☀️ Solar Return của ${name}: năm cá nhân ${py} (${NUM_MEANINGS[py].name}), lá chủ đề ${card.vi}${reversed ? " ngược" : ""}` +
      (isToday ? " — và hôm nay là sinh nhật tôi! 🎂" : ` — còn ${daysLeft} ngày nữa sinh nhật.`) + ` — tại Tiệm Tarot Đêm Khuya!`;
    try {
      if (navigator.share) await navigator.share({ title: "Solar Return", text });
      else { await navigator.clipboard.writeText(text); toast("Đã copy!"); }
    } catch { /* cancelled */ }
  });
});
