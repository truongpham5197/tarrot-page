/* ===== Matrix Destiny Chart ===== */

makeStars();
initSoundToggle();

(function prefill() {
  const p = Profile.get();
  if (p.name) document.getElementById("nameInput").value = p.name;
  if (p.dob) document.getElementById("dobInput").value = p.dob;
})();

const red22 = n => { while (n > 22) n = digitSum(n); return n; };

// Vị trí toạ độ 9 điểm trong bát quái (hệ toạ độ 0-100)
const COORDS = {
  E:  [50, 50],
  B:  [50, 8],
  C:  [92, 50],
  D:  [50, 92],
  A:  [8, 50],
  T1: [19, 19],
  T2: [81, 19],
  T3: [81, 81],
  T4: [19, 81]
};
const LINES = [
  ["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"],        // hình vuông ngoài
  ["T1", "T2"], ["T2", "T3"], ["T3", "T4"], ["T4", "T1"],// hình vuông trong
  ["A", "C"], ["B", "D"]                                  // trục chính
];

document.getElementById("matrixBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim() || "Bạn";
  const dob = document.getElementById("dobInput").value;
  if (!dob) { toast("Cho mình xin ngày sinh đã!"); return; }

  const [y, m, d] = dob.split("-").map(Number);
  Profile.set({ ...Profile.get(), name, dob });

  // Tính 9 điểm năng lượng
  const A = red22(d), B = red22(m), C = red22(A + B), D = red22(digitSum(y));
  const E = red22(A + B + C + D);
  const vals = {
    A, B, C, D, E,
    T1: red22(A + B), T2: red22(B + C), T3: red22(C + D), T4: red22(D + A)
  };

  // Vẽ bát quái bằng SVG
  const lines = LINES.map(([p, q]) => {
    const [x1, y1] = COORDS[p], [x2, y2] = COORDS[q];
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="m-line"/>`;
  }).join("");

  const nodes = MATRIX_POSITIONS.map(pos => {
    const [x, y2] = COORDS[pos.key];
    return `<g class="m-node" data-key="${pos.key}" tabindex="0" role="button" aria-label="${pos.label}">
      <circle cx="${x}" cy="${y2}" r="${pos.key === "E" ? 8 : 6.4}" class="m-circle ${pos.key === "E" ? "core" : ""}"/>
      <text x="${x}" y="${y2 + 0.3}" class="m-num">${vals[pos.key]}</text>
    </g>`;
  }).join("");

  document.getElementById("matrixChart").innerHTML =
    `<svg viewBox="0 0 100 100" class="matrix-svg">${lines}${nodes}</svg>`;

  const chart = document.getElementById("matrixChart");
  const detail = document.getElementById("matrixDetail");

  function showNode(key) {
    const pos = MATRIX_POSITIONS.find(p => p.key === key);
    const n = vals[key];
    const card = MAJOR_DECK[n - 1]; // năng lượng n ↔ lá Major n-1
    chart.querySelectorAll(".m-circle").forEach(c => c.classList.remove("active"));
    chart.querySelector(`.m-node[data-key="${key}"] .m-circle`).classList.add("active");

    detail.innerHTML = `
      <div class="m-detail-card">
        <div class="result-pos">${pos.label} · Năng lượng ${n}</div>
        <h4>${card.icon} ${card.vi} <small>(${card.name})</small></h4>
        <div class="m-hint">📍 ${pos.hint}</div>
        <div class="meaning">Con số ${n} mang ${DESTINY22[n - 1]}. Với ${esc(name)}, ở vị trí <b>${pos.label.toLowerCase()}</b>, năng lượng này tỏ rõ nhất — ${card.up}</div>
        <div class="num-calc">🔍 ${calcDesc(key, { d, m, y, A, B, C, D, E })}</div>
      </div>`;
    SFX.play("pick");
    burstAt(chart.querySelector(`.m-node[data-key="${key}"]`), 8);
  }

  function calcDesc(key, v) {
    const r = red22;
    const map = {
      A:  `Ngày ${v.d} → ${v.A}`,
      B:  `Tháng ${v.m} → ${v.B}`,
      C:  `A + B = ${v.A + v.B} → ${v.C}`,
      D:  `Năm ${v.y}: ${String(v.y).split("").join("+")} = ${digitSum(v.y)} → ${v.D}`,
      E:  `A+B+C+D = ${v.A + v.B + v.C + v.D} → ${v.E}`,
      T1: `A + B = ${v.A + v.B} → ${vals.T1}`,
      T2: `B + C = ${v.B + v.C} → ${vals.T2}`,
      T3: `C + D = ${v.C + v.D} → ${vals.T3}`,
      T4: `D + A = ${v.D + v.A} → ${vals.T4}`
    };
    return map[key];
  }

  chart.querySelectorAll(".m-node").forEach(g => {
    g.addEventListener("click", () => showNode(g.dataset.key));
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showNode(g.dataset.key); } });
  });

  const box = document.getElementById("matrixResult");
  box.hidden = false;
  SFX.play("reveal");
  box.scrollIntoView({ behavior: "smooth", block: "center" });
  showNode("E"); // mở sẵn điểm lõi
});
