/* ===== Chiêm tinh — Bản đồ sao mini ===== */

makeStars();
initSoundToggle();
setTimeout(() => document.getElementById("owlSay").textContent || owlSay("Chào lữ khách! Cho ta xin ngày sinh — có giờ sinh thì càng tốt — ta sẽ dò xem Mặt Trời, Mặt Trăng và Cung Mọc của bạn đang đứng ở đâu trên bầu trời."), 400);

const hourSel = document.getElementById("hourInput");
for (let h = 0; h < 24; h++) {
  const o = document.createElement("option");
  o.value = h;
  o.textContent = `${String(h).padStart(2, "0")}:00`;
  hourSel.appendChild(o);
}

// Prefill hồ sơ đã lưu
(function prefill() {
  const p = Profile.get();
  if (p.name) document.getElementById("nameInput").value = p.name;
  if (p.dob) document.getElementById("dobInput").value = p.dob;
  if (p.hour !== undefined) hourSel.value = String(p.hour);
})();

const PLACEMENT_INFO = [
  { icon: ICON("sun"), key: "sun",   role: "Cung Mặt trời", what: "Con người bạn thể hiện ra — bản sắc & cái tôi" },
  { icon: ICON("moon"), key: "moon",  role: "Cung Mặt trăng", what: "Thế giới cảm xúc bên trong — bạn khi không có ai nhìn" },
  { icon: ICON("compass"), key: "asc",   role: "Cung mọc", what: "Ấn tượng đầu tiên — 'vỏ ngoài' người khác gặp trước tiên" }
];

const ELEMENT_ICON = { "Lửa": ICON("fire"), "Đất": ICON("earth"), "Khí": ICON("air"), "Nước": ICON("water") };

function drawWheel(sunIdx, moonIdx, ascIdx) {
  const C = 160, R_OUT = 148, R_IN = 112, R_TXT = 130;
  const pt = (deg, r) => {
    const a = (deg - 90) * Math.PI / 180;
    return [C + r * Math.cos(a), C + r * Math.sin(a)];
  };
  // Xoay cả bánh để cung mọc nằm bên trái như bản đồ thật
  const rot = ascIdx >= 0 ? 180 - (ascIdx * 30 + 15) : 0;

  let svg = `<svg viewBox="0 0 320 320" class="astro-wheel">
    <circle cx="${C}" cy="${C}" r="${R_OUT}" class="wheel-ring"/>
    <circle cx="${C}" cy="${C}" r="${R_IN}" class="wheel-ring thin"/>
    <g transform="rotate(${rot} ${C} ${C})">`;

  for (let i = 0; i < 12; i++) {
    const deg = i * 30;
    const [x1, y1] = pt(deg, R_IN);
    const [x2, y2] = pt(deg, R_OUT);
    const [tx, ty] = pt(deg + 15, R_TXT);
    const isAsc = i === ascIdx;
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="wheel-spoke ${isAsc ? "asc" : ""}"/>
      <text x="${tx}" y="${ty}" class="wheel-glyph ${isAsc ? "asc" : ""}"
        transform="rotate(${deg + 15 + 90} ${tx} ${ty})">${ZODIAC_SIGNS[i].icon}</text>`;
  }

  const marker = (idx, char, cls, r) => {
    if (idx < 0) return "";
    const [x, y] = pt(idx * 30 + 15, r);
    return `<text x="${x}" y="${y}" class="wheel-marker ${cls}">${char}</text>`;
  };
  svg += marker(sunIdx, "☀", "sun", 92) + marker(moonIdx, "☽", "moon", 92) + marker(ascIdx, "⬆", "asc", 70);
  svg += `</g></svg>`;
  return svg;
}

document.getElementById("drawBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim() || "Bạn";
  const dob = document.getElementById("dobInput").value;
  const hour = parseInt(hourSel.value, 10);

  if (!dob) { owlSay("Ơ kìa, thiếu ngày sinh thì ta biết dò sao ở chỗ nào bây giờ?"); toast("Vũ trụ cần ngày sinh để vẽ bản đồ!"); return; }
  const d = new Date(dob + "T12:00:00");
  const day = d.getDate(), month = d.getMonth() + 1;

  Profile.set({ ...Profile.get(), name, dob, hour });

  const sunIdx = sunSignIndex(day, month);
  const moonIdx = moonSignIndex(d);
  const ascIdx = hour >= 0 ? ascSignIndex(sunIdx, hour) : -1;
  const sun = ZODIAC_SIGNS[sunIdx], moon = ZODIAC_SIGNS[moonIdx], asc = ascIdx >= 0 ? ZODIAC_SIGNS[ascIdx] : null;

  // Đếm nguyên tố trong Big Three
  const tally = {};
  [sun, moon, asc].filter(Boolean).forEach(s => { tally[s.element] = (tally[s.element] || 0) + 1; });
  const dom = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
  const domText = {
    "Lửa": "bạn là cục năng lượng biết đi — nhiệt huyết tràn trề",
    "Đất": "bạn là người 'đứng đất' — chắc chắn, thực tế, đáng tin",
    "Khí": "bạn là cơn gió — tư duy nhanh, giao tiếp đỉnh",
    "Nước": "bạn là dòng nước sâu — cảm xúc phong phú, trực giác mạnh"
  }[dom[0]];

  const placements = [
    { ...PLACEMENT_INFO[0], sign: sun },
    { ...PLACEMENT_INFO[1], sign: moon, approx: true },
    asc && { ...PLACEMENT_INFO[2], sign: asc, approx: true }
  ].filter(Boolean);

  const html = `
    <div class="astro-head">
      <h3>${ICON("orbit")} Bản đồ sao của ${esc(name)}</h3>
      <div class="astro-wheel-wrap">${drawWheel(sunIdx, moonIdx, ascIdx)}</div>
      ${ascIdx < 0 ? '<p class="guide-note">Giờ sinh bí ẩn — vũ trụ giữ kín cung mọc của bạn.</p>' : ""}
    </div>
    <div class="big-three">
      ${placements.map(p => `
        <div class="big3-card">
          <div class="big3-icon">${p.icon} <span class="z-icon">${p.sign.icon}</span></div>
          <div class="result-pos">${p.role}${p.approx ? ' <small class="approx">(ước lượng)</small>' : ""}</div>
          <h4>${p.sign.vi}</h4>
          <div class="big3-what">${p.what}</div>
          <div class="meaning">Bạn mang năng lượng ${p.sign.element.toLowerCase()}: ${SIGN_ESSENCE[p.sign === sun ? sunIdx : p.sign === moon ? moonIdx : ascIdx]}.</div>
        </div>`).join("")}
    </div>
    <div class="result-card">
      <div class="result-icon">${ELEMENT_ICON[dom[0]]}</div>
      <div>
        <div class="result-pos">Nguyên tố trội</div>
        <h4>${dom[0]} (${dom[1]}/3 vị trí)</h4>
        <div class="meaning">Tổng kết: ${domText}.</div>
        <button class="btn btn-ghost btn-sm" id="shareAstro">${ICON("share")}Chia sẻ</button>
      </div>
    </div>`;

  const box = document.getElementById("astroResult");
  box.innerHTML = html;
  box.hidden = false;
  owlSay(`${name === "Bạn" ? "" : esc(name) + " à, "}Mặt Trời của bạn ở <b>${sun.vi}</b>, Mặt Trăng ghé <b>${moon.vi}</b>${asc ? `, còn Cung Mọc là <b>${asc.vi}</b>` : ""}. Nguyên tố <b>${dom[0]}</b> đang dẫn dắt bạn đấy!`);
  SFX.play("reveal");
  burstAt(box.querySelector(".astro-wheel-wrap"), 18);
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });

  document.getElementById("shareAstro").addEventListener("click", async () => {
    const text = `⭐ Bản đồ sao của ${name}: ☀️ ${sun.vi} · 🌙 ${moon.vi}` +
      (asc ? ` · ⬆️ ${asc.vi}` : "") + ` — nguyên tố trội ${dom[0]}. Check tại Tiệm Tarot Đêm Khuya!`;
    try {
      if (navigator.share) await navigator.share({ title: "Bản đồ sao", text });
      else { await navigator.clipboard.writeText(text); toast("Đã copy!"); }
    } catch { /* cancelled */ }
  });
});
