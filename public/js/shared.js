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

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;
const GYRO = { x: 0, y: 0 }; // độ nghiêng máy (-1..1), cập nhật bởi initTouchFX

// ---- Bầu trời đêm (canvas): sao lấp lánh, chòm sao hiện dần, sao băng ----
function makeStars() {
  const wrap = document.getElementById("stars");
  if (!wrap) return;
  const cv = document.createElement("canvas");
  cv.className = "sky-canvas";
  wrap.appendChild(cv);
  const g = cv.getContext("2d");
  let W = 0, H = 0, dpr = 1, stars = [], constellations = [], meteors = [];
  const TINTS = ["255,249,234", "232,200,116", "200,190,255", "170,220,255"];

  function build() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(260, (W * H) / 5200));
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() < .08 ? 1.3 + Math.random() * .9 : .35 + Math.random() * .8,
      tw: Math.random() * Math.PI * 2, sp: .6 + Math.random() * 1.8,
      tint: TINTS[Math.random() < .7 ? 0 : 1 + Math.floor(Math.random() * 3)],
      depth: .2 + Math.random() * .8
    }));
    // 3 chòm sao: nhặt vài ngôi sáng gần nhau rồi nối nét
    constellations = [];
    for (let k = 0; k < 3; k++) {
      const cx = W * (.15 + .7 * Math.random()), cy = H * (.1 + .6 * Math.random());
      const pts = Array.from({ length: 5 + Math.floor(Math.random() * 3) }, () => ({
        x: cx + (Math.random() - .5) * Math.min(260, W * .35),
        y: cy + (Math.random() - .5) * Math.min(180, H * .3)
      })).sort((a, b) => a.x - b.x);
      constellations.push({ pts, phase: Math.random() * Math.PI * 2, speed: .12 + Math.random() * .1 });
    }
  }

  function spawnMeteor() {
    meteors.push({ x: W * (.2 + Math.random() * .8), y: H * Math.random() * .4,
      vx: -(6 + Math.random() * 5), vy: 2.4 + Math.random() * 2.2, life: 1 });
  }

  let last = 0, nextMeteor = 3000;
  function frame(t) {
    const dt = Math.min(64, t - last); last = t;
    const scroll = scrollY;
    g.clearRect(0, 0, W, H);
    for (const s of stars) {
      const a = reduceMotion ? .6 : .35 + .65 * Math.abs(Math.sin(s.tw + t / 1000 * s.sp));
      const y = ((s.y - scroll * s.depth * .08 + GYRO.y * s.depth * 18) % H + H) % H;
      g.fillStyle = `rgba(${s.tint},${a})`;
      const x = s.x + GYRO.x * s.depth * 18;
      g.beginPath(); g.arc(x, y, s.r, 0, 7); g.fill();
      if (s.r > 1.3) { // sao sáng có quầng
        g.fillStyle = `rgba(${s.tint},${a * .12})`;
        g.beginPath(); g.arc(x, y, s.r * 4, 0, 7); g.fill();
      }
    }
    for (const c of constellations) {
      const a = reduceMotion ? .18 : Math.max(0, Math.sin(c.phase + t / 1000 * c.speed)) * .3;
      if (a < .01) continue;
      const off = -scroll * .03;
      g.strokeStyle = `rgba(232,200,116,${a * .6})`; g.lineWidth = .7;
      g.beginPath();
      c.pts.forEach((p, i) => i ? g.lineTo(p.x, p.y + off) : g.moveTo(p.x, p.y + off));
      g.stroke();
      g.fillStyle = `rgba(255,244,214,${a * 2.4})`;
      c.pts.forEach(p => { g.beginPath(); g.arc(p.x, p.y + off, 1.6, 0, 7); g.fill(); });
    }
    if (!reduceMotion) {
      nextMeteor -= dt;
      if (nextMeteor < 0) { spawnMeteor(); nextMeteor = 5000 + Math.random() * 9000; }
      meteors = meteors.filter(m => m.life > 0);
      for (const m of meteors) {
        m.x += m.vx * dt / 16; m.y += m.vy * dt / 16; m.life -= dt / 1100;
        const grad = g.createLinearGradient(m.x, m.y, m.x - m.vx * 12, m.y - m.vy * 12);
        grad.addColorStop(0, `rgba(255,249,234,${m.life})`);
        grad.addColorStop(1, "rgba(255,249,234,0)");
        g.strokeStyle = grad; g.lineWidth = 1.6;
        g.beginPath(); g.moveTo(m.x, m.y); g.lineTo(m.x - m.vx * 12, m.y - m.vy * 12); g.stroke();
      }
    }
    if (!reduceMotion && !document.hidden) requestAnimationFrame(frame);
  }
  build();
  addEventListener("resize", () => { build(); if (reduceMotion) frame(0); });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && !reduceMotion) requestAnimationFrame(t => { last = t; frame(t); });
  });
  requestAnimationFrame(frame);
  initAmbientFX();
}

// Vệt bụi sao theo con trỏ + nghiêng 3D lá bài khi rê chuột
function initAmbientFX() {
  if (!finePointer) return initTouchFX();
  if (reduceMotion) return;
  let lastDust = 0;
  addEventListener("pointermove", e => {
    const now = performance.now();
    if (now - lastDust < 45) return;
    lastDust = now;
    const d = document.createElement("span");
    d.className = "stardust";
    d.style.left = e.clientX + "px"; d.style.top = e.clientY + "px";
    document.body.appendChild(d);
    d.animate([
      { transform: "translate(-50%,-50%) scale(1)", opacity: .9 },
      { transform: `translate(${(Math.random() - .5) * 26 - 13}px, ${14 + Math.random() * 18}px) scale(0)`, opacity: 0 }
    ], { duration: 900, easing: "ease-out" }).onfinish = () => d.remove();
  }, { passive: true });

  const TILT = ".daily-card, .picked-cards .tarot-card, .tilt";
  document.addEventListener("pointermove", e => {
    const el = e.target.closest?.(TILT);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    el.style.rotate = `${-py} ${px} 0 ${Math.hypot(px, py) * 22}deg`;
    el.style.setProperty("--mx", `${(px + .5) * 100}%`);
    el.style.setProperty("--my", `${(py + .5) * 100}%`);
  }, { passive: true });
  document.addEventListener("pointerout", e => {
    const el = e.target.closest?.(TILT);
    if (el && !el.contains(e.relatedTarget)) el.style.rotate = "";
  });
}

// ---- Mobile: gợn sáng khi chạm, rung nhẹ, nghiêng theo con quay, vệt bụi sao theo ngón tay ----
const HAPTIC = {
  tap: 6, pick: 12, flip: [8, 40, 16], shuffle: [6, 70, 6, 70, 6, 70, 14],
  reveal: [10, 60, 10, 60, 28], yes: [14, 50, 14], no: 45, fx: [10, 30, 22], owl: [8, 60, 8]
};
function haptic(kind) {
  const p = HAPTIC[kind];
  if (p && navigator.vibrate && !finePointer) try { navigator.vibrate(p); } catch {}
}
const TAPPABLE = "a, button, select, input, summary, [role=button], .tarot-card, .game-card, .zodiac-grid > *, .m-point, [data-owl]";

function tapRipple(x, y, strong) {
  const r = document.createElement("span");
  r.className = "tap-ripple" + (strong ? " strong" : "");
  r.style.left = x + "px"; r.style.top = y + "px";
  document.body.appendChild(r);
  r.addEventListener("animationend", () => r.remove());
  if (strong) burst(x, y, 5, ["#f7e3a1", "#fff9ea", "#b9a4ff"], ["✦", "⋆", "✧"]);
}

function initTouchFX() {
  // Chạm: vòng sáng vàng + rung khẽ trên phần tử bấm được
  document.addEventListener("pointerdown", e => {
    if (e.pointerType === "mouse") return;
    const hit = e.target.closest?.(TAPPABLE);
    if (hit) haptic("tap");
    if (!reduceMotion) tapRipple(e.clientX, e.clientY, !!hit);
  }, { passive: true });

  // Rung theo âm thanh sự kiện (kể cả khi đã tắt tiếng)
  const play = SFX.play, fx = SFX.fx;
  SFX.play = kind => { haptic(kind); play(kind); };
  SFX.fx = kind => { haptic("fx"); fx(kind); };

  if (reduceMotion) return;

  // Vệt bụi sao theo ngón tay khi vuốt
  let lastDust = 0;
  addEventListener("touchmove", e => {
    const now = performance.now();
    if (now - lastDust < 60) return;
    lastDust = now;
    const t = e.touches[0];
    const d = document.createElement("span");
    d.className = "stardust";
    d.style.left = t.clientX + "px"; d.style.top = t.clientY + "px";
    document.body.appendChild(d);
    d.animate([
      { transform: "translate(-50%,-50%) scale(1.3)", opacity: .95 },
      { transform: `translate(${(Math.random() - .5) * 30 - 15}px, ${10 + Math.random() * 20}px) scale(0)`, opacity: 0 }
    ], { duration: 800, easing: "ease-out" }).onfinish = () => d.remove();
  }, { passive: true });

  // Con quay: bầu trời trôi theo tay cầm, lá bài nghiêng + ánh bóng chạy
  let base = null, gx = 0, gy = 0, raf = 0;
  const TILT = ".daily-card, .picked-cards .tarot-card, .game-card";
  function onOrient(e) {
    if (e.beta == null) return;
    if (!base) base = { b: e.beta, g: e.gamma };
    // trôi dần về tư thế cầm máy hiện tại
    base.b += (e.beta - base.b) * .01; base.g += (e.gamma - base.g) * .01;
    gx = Math.max(-1, Math.min(1, (e.gamma - base.g) / 25));
    gy = Math.max(-1, Math.min(1, (e.beta - base.b) / 25));
    if (!raf) raf = requestAnimationFrame(apply);
  }
  function apply() {
    raf = 0;
    GYRO.x += (gx - GYRO.x) * .5; GYRO.y += (gy - GYRO.y) * .5;
    const ang = Math.hypot(GYRO.x, GYRO.y) * 12;
    const rot = ang > .3 ? `${-GYRO.y} ${GYRO.x} 0 ${ang.toFixed(2)}deg` : "";
    document.querySelectorAll(TILT).forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      el.style.rotate = rot;
      el.style.setProperty("--mx", `${50 + GYRO.x * 45}%`);
      el.style.setProperty("--my", `${40 + GYRO.y * 40}%`);
    });
    document.documentElement.classList.toggle("gyro-on", !!rot);
  }
  const DOE = window.DeviceOrientationEvent;
  if (!DOE) return;
  addEventListener("deviceorientation", onOrient); // Android: chạy ngay
  if (typeof DOE.requestPermission === "function") {
    // iOS: chỉ xin quyền khi chưa có dữ liệu và người chơi chạm vào lá bài lần đầu
    const ask = e => {
      if (base || !e.target.closest?.(".tarot-card, .daily-card")) return;
      document.removeEventListener("click", ask, true);
      DOE.requestPermission().catch(() => {});
    };
    document.addEventListener("click", ask, true);
  }
}

// Chạm vào Cú Nguyệt: cú nhún, kêu "hú hú" và rắc lông sao
const OWL_HOOTS = ["Hú hú~", "Hú… ta đây!", "Nhột quá!", "Hú hú, hỏi gì nào?", "Suỵt, sao đang nghe", "Hú~ bình tĩnh nha"];
document.addEventListener("click", e => {
  const owl = e.target.closest?.(".owl");
  if (!owl) return;
  haptic("owl");
  SFX.play("chime");
  owl.classList.remove("owl-poke"); void owl.offsetWidth; owl.classList.add("owl-poke");
  owl.addEventListener("animationend", ev => { if (ev.animationName === "owlPoke") owl.classList.remove("owl-poke"); }, { once: true });
  const r = owl.getBoundingClientRect();
  if (!reduceMotion) burst(r.left + r.width / 2, r.top + r.height / 3, 10, ["#f7e3a1", "#fff9ea", "#c9b8ff"], ["✦", "❋", "⋆"]);
  const pop = document.createElement("span");
  pop.className = "owl-hoot";
  pop.textContent = OWL_HOOTS[Math.floor(Math.random() * OWL_HOOTS.length)];
  pop.style.left = r.left + r.width / 2 + "px"; pop.style.top = r.top + "px";
  document.body.appendChild(pop);
  pop.addEventListener("animationend", () => pop.remove());
});

// ---- Lõi âm thanh WebAudio: bus chung có nén + reverb (sinh impulse, không cần file) ----
const AudioCore = (() => {
  let ctx = null, bus = null, verb = null, noise = null;
  function impulse(sec, decay) {
    const len = Math.floor(ctx.sampleRate * sec);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
    return buf;
  }
  function get() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16; comp.ratio.value = 4;
      comp.connect(ctx.destination);
      bus = ctx.createGain(); bus.gain.value = .9; bus.connect(comp);
      verb = ctx.createConvolver(); verb.buffer = impulse(3.6, 2.6);
      const wet = ctx.createGain(); wet.gain.value = .55;
      verb.connect(wet).connect(comp);
      noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const nd = noise.getChannelData(0);
      for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  // Nút ra: tín hiệu khô vào bus, một phần gửi sang reverb
  function out(send = .3, into = null) {
    get();
    const g = ctx.createGain();
    const s = ctx.createGain(); s.gain.value = send;
    g.connect(into || bus); g.connect(s); s.connect(verb);
    return g;
  }
  return { get, out, noiseBuf: () => (get(), noise) };
})();

// ---- Hiệu ứng âm thanh: chuông FM, chuông pha lê, bát hát, tiếng giấy bài ----
const SFX = (() => {
  let enabled = localStorage.getItem("tiem-sound") !== "off";
  const safe = fn => (...a) => { if (!enabled) return; try { fn(...a); } catch (e) { /* audio bị chặn thì thôi */ } };

  // Chuông kim loại: FM với tỉ lệ lệch → ra âm "ting" có màu sắc thật
  const bell = safe((f, delay = 0, dur = 2.2, vol = .12, send = .45) => {
    const a = AudioCore.get(), t = a.currentTime + delay;
    const out = AudioCore.out(send);
    const car = a.createOscillator(), mod = a.createOscillator(), mg = a.createGain(), g = a.createGain();
    car.frequency.value = f; mod.frequency.value = f * 3.51;
    mg.gain.setValueAtTime(f * 2.2, t); mg.gain.exponentialRampToValueAtTime(f * .05, t + dur * .6);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .006);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    mod.connect(mg).connect(car.frequency); car.connect(g).connect(out);
    car.start(t); mod.start(t); car.stop(t + dur + .1); mod.stop(t + dur + .1);
  });
  // Chuông pha lê: vài bội âm sine tắt nhanh
  const glass = safe((f, delay = 0, vol = .07, dur = 1.2) => {
    const a = AudioCore.get(), t = a.currentTime + delay, out = AudioCore.out(.5);
    [[1, 1], [2.76, .4], [5.4, .18]].forEach(([m, v]) => {
      const o = a.createOscillator(), g = a.createGain();
      o.frequency.value = f * m;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol * v, t + .004);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur / m ** .4);
      o.connect(g).connect(out); o.start(t); o.stop(t + dur + .1);
    });
  });
  // Bát hát Tây Tạng: bội âm không hài + phách chậm
  const bowl = safe((f = 147, delay = 0, vol = .1, dur = 4.5) => {
    const a = AudioCore.get(), t = a.currentTime + delay, out = AudioCore.out(.6);
    [[1, 1, 0], [1.006, .7, 0], [2.71, .35, 2], [5.12, .12, -3]].forEach(([m, v, det]) => {
      const o = a.createOscillator(), g = a.createGain();
      o.frequency.value = f * m; o.detune.value = det;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol * v, t + .05);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(g).connect(out); o.start(t); o.stop(t + dur + .1);
    });
  });
  // Tiếng giấy/không khí: noise qua band-pass quét tần số
  const swish = safe((delay = 0, dur = .2, f1 = 900, f2 = 4200, vol = .16, q = 1.2, send = .15) => {
    const a = AudioCore.get(), t = a.currentTime + delay, out = AudioCore.out(send);
    const src = a.createBufferSource(); src.buffer = AudioCore.noiseBuf();
    const bp = a.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = q;
    bp.frequency.setValueAtTime(f1, t); bp.frequency.exponentialRampToValueAtTime(f2, t + dur);
    const g = a.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + dur * .25);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    src.connect(bp).connect(g).connect(out);
    src.start(t, Math.random() * .5); src.stop(t + dur + .05);
  });
  // Tiếng "tộc" gỗ nhẹ khi đặt lá xuống bàn
  const thump = safe((delay = 0, f = 150, vol = .12) => {
    const a = AudioCore.get(), t = a.currentTime + delay, out = AudioCore.out(.1);
    const o = a.createOscillator(), g = a.createGain();
    o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * .45, t + .12);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + .16);
    o.connect(g).connect(out); o.start(t); o.stop(t + .2);
  });
  // Giọt nước: sine rơi cao độ
  const drop = safe((delay = 0, f = 1400, vol = .08) => {
    const a = AudioCore.get(), t = a.currentTime + delay, out = AudioCore.out(.5);
    const o = a.createOscillator(), g = a.createGain();
    o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * .5, t + .09);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + .14);
    o.connect(g).connect(out); o.start(t); o.stop(t + .2);
  });

  // Âm giai Rê thứ ngũ cung — nghe "cổ tích phương Đông"
  const PENTA = [293.66, 349.23, 392, 440, 523.25, 587.33, 698.46, 783.99, 880, 1046.5];
  const SOUNDS = {
    pick()    { bell(PENTA[4 + Math.floor(Math.random() * 4)], 0, 1.4, .07, .35); swish(0, .12, 2000, 5000, .06); },
    flip()    { swish(0, .22, 700, 5200, .14); thump(.16, 170, .07); },
    shuffle() { for (let i = 0; i < 11; i++) swish(i * .075 + Math.random() * .03, .1, 1400, 3200 + Math.random() * 2000, .1, 2); thump(.9, 140, .1); },
    reveal()  { [0, 2, 4, 5, 7, 9].forEach((k, i) => bell(PENTA[k], i * .11, 2.6, .075, .55)); bowl(146.83, .05, .05, 5); },
    sparkle() { for (let i = 0; i < 5; i++) glass(PENTA[5 + Math.floor(Math.random() * 5)] * 2, i * .06, .035); },
    yes()     { [587.33, 739.99, 880, 1174.66].forEach((f, i) => bell(f, i * .09, 2.2, .08)); },
    no()      { bowl(110, 0, .12, 3.6); },
    whoosh()  { swish(0, .8, 250, 2400, .12, .7, .4); },
    chime()   { glass(1318.5, 0, .05); glass(1760, .08, .04); },
    bowl()    { bowl(146.83, 0, .11, 5); },
    page()    { swish(0, .35, 1800, 700, .08, .8); }
  };
  // Âm riêng theo tính chất lá bài
  const FX_SOUNDS = {
    star()  { [7, 8, 9].forEach((k, i) => glass(PENTA[k] * 1.5, i * .07, .05)); bell(1174.66, .05, 2.4, .05); },
    light() { [587.33, 739.99, 880].forEach((f, i) => bell(f, i * .05, 2.4, .06)); },
    dark()  { bowl(98, 0, .12, 4.8); glass(587.33, .3, .025, 2); },
    fire()  { swish(0, .5, 300, 1800, .14, .6, .2); bell(392, .05, 1.8, .06); },
    water() { drop(0, 1500); drop(.13, 1200); drop(.27, 1700); bell(523.25, .1, 2.2, .05); },
    air()   { swish(0, .7, 1200, 6000, .09, 3, .5); glass(1568, .2, .04); },
    earth() { bowl(130.8, 0, .1, 3.2); thump(0, 110, .12); },
    love()  { bell(659.25, 0, 2.4, .07); bell(830.61, .12, 2.4, .06); bell(987.77, .24, 2.6, .05); },
    bolt()  { swish(0, .35, 5000, 400, .2, .5, .5); thump(.02, 70, .2); bell(1174.66, .12, 1.6, .05); }
  };
  return {
    isEnabled: () => enabled,
    toggle() { enabled = !enabled; localStorage.setItem("tiem-sound", enabled ? "on" : "off"); return enabled; },
    play(kind) { if (enabled) SOUNDS[kind]?.(); },
    fx(kind) { if (enabled) (FX_SOUNDS[kind] || FX_SOUNDS.star)(); },
    bell, glass
  };
})();

// ---- Nhạc nền: piano cổ điển (Beethoven, Mozart) — bản thu Public domain / CC0 từ Wikimedia Commons ----
// Nguồn: commons.wikimedia.org (Musopen), nén lại MP3 96kbps, host tại public/audio.
// Không tải được (offline…) → lùi về nhạc tổng hợp "đêm khuya".
// Đường dẫn tính theo vị trí shared.js để dùng được cả ở trang con games/*.html
const AUDIO_BASE = new URL("../audio/", document.currentScript?.src || location.href).href;
const PIANO_TRACKS = [
  { composer: "Beethoven", title: "Sonata Ánh Trăng — I. Adagio sostenuto",
    src: AUDIO_BASE + "moonlight.mp3" },
  { composer: "Mozart", title: "Sonata số 13, K.333 — II. Andante cantabile",
    src: AUDIO_BASE + "mozart-k333-andante.mp3" },
  { composer: "Beethoven", title: "Sonata Bi Thương — II. Adagio cantabile",
    src: AUDIO_BASE + "pathetique-adagio.mp3" },
  { composer: "Mozart", title: "Sonata số 16, K.545 — I. Allegro",
    src: AUDIO_BASE + "mozart-k545-allegro.mp3" }
];

const Music = (() => {
  let master = null, timers = [], drones = [], started = false;
  let playing = localStorage.getItem("tiem-music") !== "off"; // mặc định bật
  // Dm9 – B♭maj7 – Gm9 – A7sus4: u huyền, lơ lửng, không bao giờ "chốt"
  const CHORDS = [
    [146.83, 220.0, 261.63, 329.63],
    [116.54, 174.61, 220.0, 293.66],
    [98.0, 174.61, 233.08, 293.66],
    [110.0, 164.81, 196.0, 293.66]
  ];
  const BELLS = [587.33, 698.46, 783.99, 880, 1046.5, 1174.66];
  let ci = 0;

  function pad(freq, dur) {
    const a = AudioCore.get(), t = a.currentTime;
    const f = a.createBiquadFilter(), g = a.createGain();
    f.type = "lowpass"; f.frequency.setValueAtTime(500, t);
    f.frequency.linearRampToValueAtTime(1100, t + dur * .5);
    f.frequency.linearRampToValueAtTime(500, t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(.05, t + 3);
    g.gain.linearRampToValueAtTime(0, t + dur);
    f.connect(g).connect(master);
    [["sawtooth", -7, .35], ["triangle", 6, 1], ["sine", 0, 1]].forEach(([type, det, v]) => {
      const o = a.createOscillator(), og = a.createGain();
      o.type = type; o.frequency.value = freq; o.detune.value = det; og.gain.value = v;
      o.connect(og).connect(f); o.start(t); o.stop(t + dur + .1);
    });
  }
  function drone() {
    const a = AudioCore.get(), t = a.currentTime;
    const f = a.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 260; f.Q.value = 4;
    const lfo = a.createOscillator(), lg = a.createGain();
    lfo.frequency.value = .05; lg.gain.value = 140;
    lfo.connect(lg).connect(f.frequency);
    const g = a.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.09, t + 5);
    f.connect(g).connect(master);
    const oscs = [73.42, 73.9, 110].map(fr => {
      const o = a.createOscillator(); o.type = "sawtooth"; o.frequency.value = fr;
      o.connect(f); o.start(t); return o;
    });
    lfo.start(t);
    drones = [...oscs, lfo];
  }
  function tick() {
    CHORDS[ci++ % CHORDS.length].forEach(fr => pad(fr, 9.4));
    for (let i = 0; i < 3; i++) if (Math.random() < .5)
      timers.push(setTimeout(chimeNote, 800 + Math.random() * 7000));
  }
  function chimeNote() {
    if (!started) return;
    const a = AudioCore.get(), t = a.currentTime, f = BELLS[Math.floor(Math.random() * BELLS.length)];
    const o = a.createOscillator(), g = a.createGain();
    o.frequency.value = f;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.045, t + .01);
    g.gain.exponentialRampToValueAtTime(.0001, t + 4);
    o.connect(g).connect(master); o.start(t); o.stop(t + 4.1);
  }
  function synthStart() {
    if (started) return;
    const a = AudioCore.get();
    master = AudioCore.out(.9);
    master.gain.setValueAtTime(0, a.currentTime);
    master.gain.linearRampToValueAtTime(.55, a.currentTime + 3);
    started = true;
    drone(); tick();
    timers.push(setInterval(tick, 9000));
  }
  function synthStop() {
    if (!started) return;
    started = false;
    timers.forEach(id => { clearTimeout(id); clearInterval(id); }); timers = [];
    const a = AudioCore.get(), m = master, d = drones;
    m.gain.cancelScheduledValues(a.currentTime);
    m.gain.setValueAtTime(m.gain.value, a.currentTime);
    m.gain.linearRampToValueAtTime(0, a.currentTime + 1.5);
    setTimeout(() => { d.forEach(o => { try { o.stop(); } catch { /* đã dừng */ } }); m.disconnect(); }, 1700);
  }
  // ---- Piano: phát lần lượt danh sách (xáo trộn), fade vào/ra, lỗi bài nào bỏ qua bài đó ----
  const VOL = .45;
  let audio = null, order = [], idx = 0, fails = 0, fadeTimer = null, pianoOn = false, useSynth = false;
  function fadeTo(target, ms, done) {
    clearInterval(fadeTimer);
    const from = audio.volume, steps = Math.max(1, Math.round(ms / 50));
    let i = 0;
    fadeTimer = setInterval(() => {
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * (++i / steps)));
      if (i >= steps) { clearInterval(fadeTimer); if (done) done(); }
    }, 50);
  }
  function shuffle() {
    order = PIANO_TRACKS.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  }
  function playCurrent() {
    audio.src = PIANO_TRACKS[order[idx]].src;
    audio.volume = 0;
    audio.play().then(() => fadeTo(VOL, 3000)).catch(() => { /* autoplay bị chặn — chờ cử chỉ người dùng */ });
  }
  function next() {
    if (++idx >= order.length) { shuffle(); idx = 0; }
    playCurrent();
  }
  function pianoStart() {
    if (!audio) {
      audio = new Audio();
      audio.preload = "auto";
      audio.addEventListener("ended", () => { fails = 0; next(); });
      audio.addEventListener("playing", () => { fails = 0; });
      audio.addEventListener("error", () => {
        if (!pianoOn) return;
        if (++fails >= PIANO_TRACKS.length) { pianoOn = false; useSynth = true; synthStart(); return; }
        next();
      });
      shuffle();
    }
    pianoOn = true;
    if (audio.src && !audio.ended) audio.play().then(() => fadeTo(VOL, 2000)).catch(() => {});
    else playCurrent();
  }
  function pianoStop() {
    pianoOn = false;
    if (audio && !audio.paused) fadeTo(0, 1500, () => { if (!pianoOn) audio.pause(); });
  }
  const start = () => (useSynth ? synthStart() : pianoStart());
  const stop = () => { pianoStop(); synthStop(); };

  return {
    isPlaying: () => playing,
    toggle() {
      // Đang "bật" nhưng autoplay bị chặn nên chưa có tiếng → lần bấm này là để nghe, không phải tắt
      if (playing && !started && !(audio && !audio.paused)) { start(); return true; }
      playing = !playing;
      localStorage.setItem("tiem-music", playing ? "on" : "off");
      playing ? start() : stop();
      return playing;
    },
    current: () => (useSynth || !order.length ? null : PIANO_TRACKS[order[idx]]),
    resumeIfWanted() { if (playing && !started && !(audio && !audio.paused)) start(); }
  };
})();

function initSoundToggle() {
  const sfx = document.getElementById("soundToggle");
  if (sfx) {
    const paint = () => {
      sfx.innerHTML = ICON(SFX.isEnabled() ? "soundOn" : "soundOff");
      sfx.classList.toggle("off", !SFX.isEnabled());
      sfx.setAttribute("aria-label", SFX.isEnabled() ? "Tắt hiệu ứng âm thanh" : "Bật hiệu ứng âm thanh");
    };
    sfx.addEventListener("click", () => { const on = SFX.toggle(); paint(); if (on) SFX.play("chime"); });
    paint();
  }
  const mus = document.getElementById("musicToggle");
  if (mus) {
    const paint = () => {
      mus.innerHTML = ICON(Music.isPlaying() ? "music" : "musicOff");
      mus.classList.toggle("off", !Music.isPlaying());
      mus.classList.toggle("playing", Music.isPlaying());
      mus.setAttribute("aria-label", Music.isPlaying() ? "Tắt nhạc nền" : "Bật nhạc nền");
    };
    mus.addEventListener("click", () => { const on = Music.toggle(); paint(); if (on) { const t = Music.current(); toast(t ? `Piano cổ điển: ${t.composer} — ${t.title}` : "Nhạc đêm khuya đã lên — đeo tai nghe để nghe trọn nhé"); } });
    paint();
  }
  // Nhạc bật sẵn: thử phát ngay khi vào trang; trình duyệt chặn autoplay có tiếng thì
  // nhạc lên ở lần chạm/click/phím đầu tiên bất kỳ đâu trên trang
  if (Music.isPlaying()) {
    Music.resumeIfWanted();
    const mus = document.getElementById("musicToggle");
    const kick = e => { if (!(mus && mus.contains(e.target))) Music.resumeIfWanted(); ["pointerdown", "keydown", "touchstart"].forEach(n => document.removeEventListener(n, kick, true)); };
    ["pointerdown", "keydown", "touchstart"].forEach(n => document.addEventListener(n, kick, true));
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
  toast._t = setTimeout(() => t.classList.remove("show"), 2600);
}

// ---- Cú Nguyệt — chủ tiệm, người dẫn chuyện (chữ hiện dần như đang nói) ----
const Narrator = {
  say(el, text, speed = 18) {
    if (!el) return Promise.resolve();
    clearInterval(el._typing);
    el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
    if (reduceMotion) { el.innerHTML = text; return Promise.resolve(); }
    // Gõ từng ký tự nhưng giữ nguyên thẻ HTML (<b>, <em>…)
    const parts = text.split(/(<[^>]+>)/);
    let pi = 0, ci = 0, shown = "";
    el.innerHTML = "";
    return new Promise(done => {
      el._typing = setInterval(() => {
        while (pi < parts.length && parts[pi].startsWith("<")) shown += parts[pi++];
        if (pi >= parts.length) { clearInterval(el._typing); el.innerHTML = shown; return done(); }
        shown += parts[pi][ci++];
        if (ci >= parts[pi].length) { pi++; ci = 0; }
        el.innerHTML = shown + '<span class="caret"></span>';
      }, speed);
    });
  }
};
// Cú Nguyệt nói ở khung dẫn chuyện #owlSay của trang (nếu có)
function owlSay(text) { return Narrator.say(document.getElementById("owlSay"), text); }

function greetingByHour(h = new Date().getHours()) {
  if (h < 4) return "Giờ này còn thức là có chuyện canh cánh rồi. Ngồi xuống đây, kể ta nghe.";
  if (h < 11) return "Trời sáng rồi mà bạn vẫn ghé tiệm đêm — chắc vũ trụ có lời muốn gửi sớm.";
  if (h < 17) return "Giữa ban ngày mà tìm đến đây à? Kéo rèm lại, ta thắp nến nhé.";
  if (h < 21) return "Hoàng hôn vừa tắt, nến vừa thắp. Khách đầu tiên của đêm nay là bạn đấy.";
  return "Đêm càng khuya, bài càng nói thật. Mời bạn ngồi — trà vừa pha.";
}

// ---- Sao bắn (sparkle burst) ----
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
    const col = colors ? colors[i % colors.length] : "#e8c874";
    s.style.color = col;
    s.style.textShadow = `0 0 8px ${col}`;
    s.style.fontSize = (10 + Math.random() * 12).toFixed(0) + "px";
    wrap.appendChild(s);
    const ang = Math.random() * Math.PI * 2;
    const dist = 50 + Math.random() * 110;
    const rot = (Math.random() - 0.5) * 240;
    s.animate([
      { transform: "translate(-50%,-50%) scale(0) rotate(0deg)", opacity: 1 },
      { transform: `translate(${Math.cos(ang) * dist - 8}px, ${Math.sin(ang) * dist - 8}px) scale(${0.6 + Math.random()}) rotate(${rot}deg)`, opacity: 0 }
    ], { duration: 750 + Math.random() * 650, easing: "cubic-bezier(.1,.7,.3,1)" })
      .onfinish = () => s.remove();
  }
}
function burstAt(el, n = 14, colors = null, chars = null) {
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, n, colors, chars);
}

// ---- Hiệu ứng riêng theo lá bài ----
const FX_LIB = {
  star:  { chars: ["✦", "✧", "⋆"],  colors: ["#D7A94A", "#FFF9EA"],           glow: "#D7A94A", snd: "star",  el: "Ánh sao" },
  light: { chars: ["✦", "✺", "✧"],  colors: ["#E9B74F", "#FFF9EA", "#F3B18D"], glow: "#E9B74F", snd: "light", el: "Ánh sáng" },
  dark:  { chars: ["☾", "✧", "⋆"],  colors: ["#9B7BFF", "#5f7686", "#FFF9EA"], glow: "#9B7BFF", snd: "dark",  el: "Bóng tối" },
  fire:  { chars: ["✹", "✦", "❋"],  colors: ["#E45C4F", "#F3B18D", "#D7A94A"], glow: "#E45C4F", snd: "fire",  el: "Lửa" },
  water: { chars: ["❍", "❋", "✦"],  colors: ["#2B9B98", "#8FC3D9", "#FFF9EA"], glow: "#2B9B98", snd: "water", el: "Nước" },
  air:   { chars: ["✧", "❖", "⋆"],  colors: ["#9aa7ad", "#FFF9EA", "#8FC3D9"], glow: "#8FC3D9", snd: "air",   el: "Khí" },
  earth: { chars: ["❁", "✿", "✦"],  colors: ["#49A77D", "#D7A94A", "#79b98f"], glow: "#49A77D", snd: "earth", el: "Đất" },
  love:  { chars: ["♥", "✦", "❁"],  colors: ["#EE8A73", "#ff9dcf", "#FFF9EA"], glow: "#EE8A73", snd: "love",  el: "Tình" },
  bolt:  { chars: ["ϟ", "✦", "✧"],  colors: ["#E9B74F", "#FFF9EA", "#F3B18D"], glow: "#E9B74F", snd: "bolt",  el: "Sấm sét" }
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
// Hiệu ứng lật bài: vòng sáng theo màu + particle riêng + âm thanh riêng
function fxFlip(el, card) {
  if (!el || !card) return;
  const fx = cardFX(card);
  el.style.setProperty("--fx", fx.glow);
  el.classList.remove("fx-flash");
  void el.offsetWidth; // reflow để animation chạy lại
  el.classList.add("fx-flash");
  setTimeout(() => el.classList.remove("fx-flash"), 1400);
  if (!reduceMotion) {
    const ring = document.createElement("span");
    ring.className = "fx-ring";
    el.appendChild(ring);
    setTimeout(() => ring.remove(), 1200);
  }
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, 20, fx.colors, fx.chars);
  SFX.fx(fx.snd);
}

// ---- Nghi thức xào bài: chồng bài tách đôi rồi hợp lại trước khi trải quạt ----
function shuffleRitual(container, ms = 1300) {
  return new Promise(done => {
    SFX.play("shuffle");
    if (reduceMotion) return done();
    const stack = document.createElement("div");
    stack.className = "shuffle-stack";
    for (let i = 0; i < 10; i++) {
      const c = document.createElement("div");
      c.className = "shuffle-card";
      c.style.setProperty("--i", i);
      c.style.setProperty("--side", i % 2 ? 1 : -1);
      c.innerHTML = CARD_BACK;
      stack.appendChild(c);
    }
    container.innerHTML = "";
    container.appendChild(stack);
    setTimeout(() => { stack.remove(); done(); }, ms);
  });
}

// ---- Mặt sau lá bài: mặt trời – trăng – sao, lá vàng trên nền chàm đêm (SVG) ----
const CARD_BACK = (() => {
  const CX = 80, CY = 106, f = n => +n.toFixed(2);
  const rnd = mulberry32(20260926);
  const star4 = (x, y, s, k = .2) => `M${f(x)} ${f(y - s)}Q${f(x + s * k)} ${f(y - s * k)} ${f(x + s)} ${f(y)}Q${f(x + s * k)} ${f(y + s * k)} ${f(x)} ${f(y + s)}Q${f(x - s * k)} ${f(y + s * k)} ${f(x - s)} ${f(y)}Q${f(x - s * k)} ${f(y - s * k)} ${f(x)} ${f(y - s)}Z`;
  const polar = (r, deg) => [CX + r * Math.cos(deg * Math.PI / 180), CY + r * Math.sin(deg * Math.PI / 180)];

  // Tia mặt trời: 24 tia dài hình kim + 24 tia ngắn xen kẽ
  let rays = "";
  for (let i = 0; i < 48; i++) {
    const d = i * 7.5 - 90;
    if (i % 2 === 0) {
      const [x1, y1] = polar(35, d - 2.2), [x2, y2] = polar(35, d + 2.2), [xt, yt] = polar(i % 4 === 0 ? 58 : 51, d);
      rays += `<path d="M${f(x1)} ${f(y1)}L${f(xt)} ${f(yt)}L${f(x2)} ${f(y2)}Z"/>`;
    } else {
      const [x1, y1] = polar(35, d), [x2, y2] = polar(45, d);
      rays += `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="url(#cbGold)" stroke-width=".6" fill="none"/>`;
    }
  }
  // Vạch chia độ trong vòng sáng
  let ticks = "";
  for (let i = 0; i < 72; i++) {
    const [x1, y1] = polar(30.6, i * 5), [x2, y2] = polar(i % 6 === 0 ? 27.4 : 29, i * 5);
    ticks += `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;
  }
  // Bụi sao rải ngoài huy chương
  let dust = "";
  for (let i = 0; i < 70; i++) {
    const x = 16 + rnd() * 128, y = 18 + rnd() * 176;
    if (Math.hypot(x - CX, y - CY) < 62) continue;
    const r = rnd() < .12 ? .9 : .35 + rnd() * .35;
    dust += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" opacity="${f(.35 + rnd() * .55)}"/>`;
  }
  const sparkles = [[30, 62, 3], [131, 150, 3], [128, 58, 2.2], [33, 152, 2.2], [52, 42, 1.6], [110, 172, 1.6]]
    .map(([x, y, r]) => `<path d="${star4(x, y, r, .16)}"/>`).join("");

  // Pha trăng: lưỡi liềm – bán nguyệt – tròn – bán nguyệt – lưỡi liềm
  const phases = y => {
    const r = 3.3, xs = [58, 69, 80, 91, 102];
    const cres = (x, dir) => `<path d="M${x} ${y - r}A${r} ${r} 0 1 ${dir ? 1 : 0} ${x} ${y + r}A${r * .55} ${r} 0 1 ${dir ? 0 : 1} ${x} ${y - r}Z"/>`;
    const half = (x, dir) => `<path d="M${x} ${y - r}A${r} ${r} 0 0 ${dir ? 1 : 0} ${x} ${y + r}Z"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="url(#cbGold)" stroke-width=".45"/>`;
    return `<g fill="url(#cbGold)">${cres(xs[0], 0)}${half(xs[1], 0)}<circle cx="${xs[2]}" cy="${y}" r="${r + .4}"/>${half(xs[3], 1)}${cres(xs[4], 1)}</g>
      <path d="M22 ${y}H51M109 ${y}H138" stroke="url(#cbGold)" stroke-width=".5" opacity=".7"/>
      <path d="${star4(22, y, 2.2)}${star4(138, y, 2.2)}" fill="url(#cbGold)"/>`;
  };

  // Hoa văn góc (vẽ 1 góc rồi lật)
  const corner = `<g fill="none" stroke="url(#cbGold)" stroke-width=".7">
      <path d="M14 40V22Q14 14 22 14H40"/><path d="M18 34V24Q18 18 24 18H34" stroke-width=".45" opacity=".8"/>
      <path d="M22 14Q24 22 14 22" stroke-width=".5"/><circle cx="40" cy="14" r="1.1" fill="url(#cbGold)" stroke="none"/><circle cx="14" cy="40" r="1.1" fill="url(#cbGold)" stroke="none"/>
    </g><path d="${star4(23.5, 23.5, 4.2, .14)}" fill="url(#cbGold)"/>`;
  const corners = [[1, 1, 0, 0], [-1, 1, 160, 0], [1, -1, 0, 212], [-1, -1, 160, 212]]
    .map(([sx, sy, tx, ty]) => `<g transform="translate(${tx} ${ty}) scale(${sx} ${sy})">${corner}</g>`).join("");

  const ishtar = `<path d="${star4(CX + 6, CY - 3, 9, .13)}"/><path d="${star4(CX + 6, CY - 3, 5.6, .13)}" transform="rotate(45 ${CX + 6} ${CY - 3})"/>`;

  return `<svg class="back-svg" viewBox="0 0 160 212" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="cbBg" cx="50%" cy="48%" r="72%">
        <stop offset="0" stop-color="#2a1d5c"/><stop offset=".5" stop-color="#140e33"/><stop offset="1" stop-color="#06040f"/>
      </radialGradient>
      <linearGradient id="cbGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#8a6420"/><stop offset=".22" stop-color="#f7e3a1"/><stop offset=".42" stop-color="#b8862f"/>
        <stop offset=".6" stop-color="#fff4c8"/><stop offset=".8" stop-color="#9c7426"/><stop offset="1" stop-color="#e9c874"/>
      </linearGradient>
      <radialGradient id="cbHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#f7d98a" stop-opacity=".28"/><stop offset=".55" stop-color="#b98cff" stop-opacity=".08"/><stop offset="1" stop-color="#b98cff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="cbDisc" cx="42%" cy="38%" r="70%">
        <stop offset="0" stop-color="#231a4d"/><stop offset="1" stop-color="#07051a"/>
      </radialGradient>
      <pattern id="cbLat" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0H9M0 0V9" stroke="#e9c874" stroke-width=".35" opacity=".09"/>
      </pattern>
    </defs>
    <rect width="160" height="212" fill="url(#cbBg)"/>
    <rect x="10" y="10" width="140" height="192" fill="url(#cbLat)"/>
    <g fill="#fff4c8">${dust}</g>
    <g fill="url(#cbGold)" opacity=".85">${sparkles}</g>
    <rect x="4.5" y="4.5" width="151" height="203" rx="8" fill="none" stroke="url(#cbGold)" stroke-width="1.6"/>
    <rect x="8" y="8" width="144" height="196" rx="5.5" fill="none" stroke="url(#cbGold)" stroke-width=".5" opacity=".75"/>
    <path d="M14 40V172M146 40V172M40 14H120M40 198H120" stroke="url(#cbGold)" stroke-width=".7" fill="none"/>
    ${corners}
    <path d="M14 99l2.4 7-2.4 7-2.4-7ZM146 99l2.4 7-2.4 7-2.4-7Z" fill="url(#cbGold)"/>
    ${phases(30)}${phases(182)}
    <circle cx="${CX}" cy="${CY}" r="64" fill="url(#cbHalo)"/>
    <g fill="url(#cbGold)">${rays}</g>
    <circle cx="${CX}" cy="${CY}" r="34" fill="url(#cbDisc)" stroke="url(#cbGold)" stroke-width="1.4"/>
    <circle cx="${CX}" cy="${CY}" r="31.2" fill="none" stroke="url(#cbGold)" stroke-width=".45"/>
    <path d="${ticks}" stroke="url(#cbGold)" stroke-width=".4" opacity=".8"/>
    <circle cx="${CX}" cy="${CY}" r="25.5" fill="none" stroke="url(#cbGold)" stroke-width=".35" stroke-dasharray=".8 2" opacity=".7"/>
    <path d="M${CX - 1} ${CY - 21}A21 21 0 0 0 ${CX - 1} ${CY + 21}A12 21 0 0 1 ${CX - 1} ${CY - 21}Z" fill="url(#cbGold)"/>
    <g fill="url(#cbGold)">${ishtar}</g>
    <circle cx="${CX + 6}" cy="${CY - 3}" r="1.3" fill="#fff4c8"/>
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
      <div class="card-face card-front ${reversed ? "reversed-art" : ""}">${cardFrontHTML(card, reversed)}<span class="shine"></span></div>
    </div>`;
  el._card = card;
  el._reversed = reversed;
  return el;
}
// Ảnh thu nhỏ lá bài cho khung kết quả (thay emoji)
function cardThumb(card, reversed = false) {
  return `<span class="card-thumb${reversed ? " rev" : ""}"><img src="${CARDART.src(card)}" alt="${card.vi}" loading="lazy" draggable="false"></span>`;
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
// Vẽ pha trăng đúng tuổi trăng (SVG) — phần sáng ghép từ nửa đĩa + elip đường phân chia
function moonSVG(age, size = 22) {
  const p = age / 29.53058867, r = 9, k = Math.abs(Math.cos(2 * Math.PI * p) * r).toFixed(2);
  const gibbous = Math.cos(2 * Math.PI * p) < 0;
  const lit = p < .5
    ? `M12 3A${r} ${r} 0 0 1 12 21A${k} ${r} 0 0 ${gibbous ? 1 : 0} 12 3Z`
    : `M12 3A${r} ${r} 0 0 0 12 21A${k} ${r} 0 0 ${gibbous ? 0 : 1} 12 3Z`;
  return `<svg class="ico moon-svg" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="${r}" fill="#221a40" stroke="rgba(232,200,116,.45)" stroke-width=".8"/>
    <path d="${lit}" fill="#f5e0a3"/></svg>`;
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
