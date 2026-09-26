// Luận giải kết luận cuối cùng bằng AI (endpoint tương thích OpenAI — mặc định Gemini).
// Không có key / model lỗi → trả 503, client tự dùng bộ máy luận giải cục bộ.
export const runtime = "nodejs";
export const maxDuration = 60;

type CardIn = {
  name: string;
  reversed: boolean;
  pos: string;
  keywords: string[];
  general: string;
  focus: string;
  advice: string;
  score: number;
};

type Profile = { length?: string; directness?: string; specificity?: string; liked?: string[]; disliked?: string[] };

const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

// Giới hạn tần suất đơn giản theo IP (theo từng instance serverless — chỉ chặn spam cơ bản)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter(t => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > 12;
}

function parseBody(raw: unknown) {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Record<string, unknown>;
  if (!Array.isArray(b.cards) || b.cards.length < 1 || b.cards.length > 5) return null;
  const cards: CardIn[] = [];
  for (const c of b.cards as Record<string, unknown>[]) {
    if (!c || typeof c !== "object") return null;
    const name = str(c.name, 60);
    if (!name) return null;
    cards.push({
      name,
      reversed: c.reversed === true,
      pos: str(c.pos, 30),
      keywords: Array.isArray(c.keywords) ? c.keywords.slice(0, 4).map(k => str(k, 40)) : [],
      general: str(c.general, 700),
      focus: str(c.focus, 700),
      advice: str(c.advice, 400),
      score: Math.max(-2, Math.min(2, Number(c.score) || 0)),
    });
  }
  const history = Array.isArray(b.history)
    ? (b.history as Record<string, unknown>[]).slice(0, 5).map(h => ({
        q: str(h?.q, 200), cards: str(h?.cards, 200), verdict: str(h?.verdict, 60), ago: str(h?.ago, 30),
      }))
    : [];
  const p = (b.profile && typeof b.profile === "object" ? b.profile : {}) as Profile;
  return {
    question: str(b.question, 300),
    qtype: str(b.qtype, 20),
    topic: str(b.topic, 30),
    verdict: str(b.verdict, 60),
    score: Math.max(-2, Math.min(2, Number(b.score) || 0)),
    cards,
    history,
    profile: {
      length: str(p.length, 10),
      directness: str(p.directness, 10),
      specificity: str(p.specificity, 10),
      liked: Array.isArray(p.liked) ? p.liked.slice(0, 3).map(s => str(s, 200)) : [],
      disliked: Array.isArray(p.disliked) ? p.disliked.slice(0, 3).map(s => str(s, 60)) : [],
    },
  };
}

const QTYPE_GUIDE: Record<string, string> = {
  yesno: "Câu hỏi CÓ/KHÔNG: câu đầu tiên phải nói rõ Có, Không, hay Có-nếu (kèm điều kiện cụ thể).",
  when: "Câu hỏi KHI NÀO: đưa khung thời gian ước lượng (ngày/tuần/tháng) dựa trên nguyên tố và số của lá, nêu dấu hiệu nhận biết thời điểm đã tới.",
  choice: "Câu hỏi LỰA CHỌN A hay B: gọi tên từng phương án bằng chính lời người hỏi, so sánh, rồi chọn dứt khoát một phương án và giải thích vì sao.",
  feelings: "Câu hỏi về CẢM XÚC/SUY NGHĨ của người khác: mô tả cảm xúc hiện tại, điều họ chưa nói ra, và khả năng họ hành động — không khẳng định tuyệt đối về người thật.",
  how: "Câu hỏi LÀM SAO/NÊN LÀM GÌ: đưa kế hoạch hành động cụ thể, có thứ tự, bắt đầu được ngay trong tuần này.",
  why: "Câu hỏi TẠI SAO: chỉ ra gốc rễ (lá quá khứ/lá xấu nhất), điều đang duy trì vấn đề, và cách tháo gỡ.",
  open: "Câu hỏi MỞ: vẽ bức tranh diễn biến sắp tới, điểm then chốt, và điều người hỏi kiểm soát được.",
};

function buildPrompt(d: NonNullable<ReturnType<typeof parseBody>>) {
  const len = d.profile.length === "short" ? "ngắn gọn: 2 đoạn, mỗi đoạn 2–3 câu"
    : d.profile.length === "long" ? "rất chi tiết: 4 đoạn, mỗi đoạn 4–5 câu" : "3 đoạn, mỗi đoạn 3–4 câu";
  const system = [
    "Bạn là Cú Nguyệt — người đọc Tarot lâu năm của Tiệm Tarot Đêm Khuya. Viết tiếng Việt tự nhiên, ấm áp, sâu sắc, không sáo rỗng.",
    "Nhiệm vụ: viết KẾT LUẬN CUỐI CÙNG cho trải bài, trả lời ĐÚNG TRỌNG TÂM câu hỏi cụ thể của người hỏi — không viết chung chung kiểu áp dụng cho ai cũng được.",
    "Nguyên tắc:",
    "- Tổng hợp các lá thành MỘT câu chuyện liền mạch: nhắc tên lá và vị trí khi lập luận, chỉ ra lá nào củng cố/mâu thuẫn lá nào.",
    "- Giữ nhất quán với điểm năng lượng (score từ -2 đến +2) và mức kết luận đã tính; được phép thêm sắc thái nhưng không đảo ngược.",
    "- Mỗi lần diễn đạt khác đi, dùng hình ảnh và từ ngữ gắn với chính câu hỏi; tránh mở đầu bằng 'Nhìn chung' hay 'Tóm lại'.",
    "- Nếu có lịch sử hỏi trước: nhận xét xu hướng (tiến triển, lặp lại, hay hỏi đi hỏi lại) một cách tế nhị.",
    "- Sức khoẻ/tài chính/pháp lý: không phán chắc chắn; khuyên gặp chuyên gia khi cần. Không hù doạ.",
    "- Không nhắc đến AI, mô hình hay điểm số dạng con số.",
    "- Chỉ dùng **đậm** cho vài cụm quan trọng; không dùng markdown khác.",
    'Trả về DUY NHẤT JSON: {"answer": "1–2 câu trả lời thẳng câu hỏi", "paragraphs": ["..."], "steps": ["2–3 việc cụ thể, mỗi việc 1 câu"], "closing": "1 câu chốt đáng nhớ"}.',
  ].join("\n");

  const lines = [
    `Câu hỏi: ${d.question ? `“${d.question}”` : "(không đặt câu hỏi — đọc tổng quan)"}`,
    `Dạng câu hỏi: ${d.qtype || "open"} → ${QTYPE_GUIDE[d.qtype] || QTYPE_GUIDE.open}`,
    `Chủ đề: ${d.topic || "tổng quan"} · Mức kết luận đã tính: ${d.verdict} (điểm ${d.score.toFixed(2)})`,
    "Các lá bài:",
    ...d.cards.map((c, i) =>
      `${i + 1}. [${c.pos}] ${c.name}${c.reversed ? " (NGƯỢC)" : ""} · điểm ${c.score} · từ khoá: ${c.keywords.join(", ")}\n   Ý chung: ${c.general}\n   Theo chủ đề: ${c.focus}\n   Lời khuyên của lá: ${c.advice}`),
  ];
  if (d.history.length) {
    lines.push("Lịch sử hỏi gần đây của người này (mới nhất trước):");
    d.history.forEach(h => lines.push(`- ${h.ago}: “${h.q || "(không câu hỏi)"}” → ${h.cards}${h.verdict ? ` · ${h.verdict}` : ""}`));
  }
  lines.push(`Độ dài mong muốn: ${len}.`);
  if (d.profile.directness === "high") lines.push("Người này từng phàn nàn kết luận chưa trả lời đúng câu hỏi → câu đầu tiên phải trả lời thẳng, nhắc lại đúng từ khoá trong câu hỏi.");
  if (d.profile.specificity === "high") lines.push("Người này thấy kết luận trước quá chung chung → nêu chi tiết cụ thể: tên lá, tình huống đời thường, mốc thời gian.");
  if (d.profile.disliked.length) lines.push(`Tránh: ${d.profile.disliked.join("; ")}.`);
  if (d.profile.liked.length) lines.push(`Văn phong người này từng thích (tham khảo giọng, đừng chép): ${d.profile.liked.map(s => `“${s}”`).join(" / ")}`);
  return { system, user: lines.join("\n") };
}

type Reading = { answer: string; paragraphs: string[]; steps: string[]; closing: string };

function parseReading(text: string): Reading | null {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const j = JSON.parse(m[0]);
    const clean = (v: unknown, max: number) => str(v, max);
    const r: Reading = {
      answer: clean(j.answer, 600),
      paragraphs: Array.isArray(j.paragraphs) ? j.paragraphs.slice(0, 5).map((p: unknown) => clean(p, 1500)).filter(Boolean) : [],
      steps: Array.isArray(j.steps) ? j.steps.slice(0, 4).map((s: unknown) => clean(s, 300)).filter(Boolean) : [],
      closing: clean(j.closing, 300),
    };
    return r.answer && r.paragraphs.length ? r : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const base = process.env.LLM_BASE_URL;
  const key = process.env.LLM_API_KEY;
  const models = (process.env.LLM_MODELS || process.env.LLM_MODEL || "").split(",").map(s => s.trim()).filter(Boolean);
  if (!base || !key || !models.length) return Response.json({ error: "ai_disabled" }, { status: 503 });

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  const rawText = await request.text();
  if (rawText.length > 20_000) return Response.json({ error: "too_large" }, { status: 413 });
  let data;
  try { data = parseBody(JSON.parse(rawText)); } catch { data = null; }
  if (!data) return Response.json({ error: "bad_request" }, { status: 400 });

  const { system, user } = buildPrompt(data);
  const deadline = Date.now() + 50_000; // còn chỗ trong maxDuration 60s
  for (const model of models) {
    const left = deadline - Date.now();
    if (left < 4_000) break;
    try {
      const res = await fetch(`${base.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          reasoning_effort: "low",
          temperature: 0.9,
          max_tokens: 4000,
          response_format: { type: "json_object" },
          messages: [{ role: "system", content: system }, { role: "user", content: user }],
        }),
        signal: AbortSignal.timeout(Math.min(25_000, left)),
      });
      if (!res.ok) {
        console.warn(`[tarot-reading] ${model} → HTTP ${res.status}`);
        continue; // 429/503/… → thử model kế tiếp
      }
      const j = await res.json();
      const reading = parseReading(j?.choices?.[0]?.message?.content || "");
      if (reading) return Response.json({ ...reading, model });
      console.warn(`[tarot-reading] ${model} → nội dung không hợp lệ`);
    } catch (e) {
      console.warn(`[tarot-reading] ${model} → ${(e as Error).name}`);
    }
  }
  return Response.json({ error: "ai_failed" }, { status: 503 });
}
