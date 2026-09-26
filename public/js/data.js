// Dữ liệu 22 lá Major Arcana — nghĩa vui vẻ, gần gũi
const MAJOR_DECK = [
  {
    id: 0, name: "The Fool", vi: "Kẻ Ngố", icon: "🃏",
    colors: ["#f7b733", "#fc4a1a"],
    keywords: ["khởi đầu", "phiêu lưu", "ngây thơ"],
    up: "Một hành trình mới đang mở ra! Đừng suy nghĩ quá nhiều — cứ nhảy vào như Kẻ Ngố, vũ trụ sẽ đỡ bạn. Hôm nay là ngày đẹp để thử cái gì đó bạn chưa từng dám làm.",
    rev: "Bạn đang hơi liều hoặc hơi hoang tưởng. Kiểm tra lại xem trước mặt có phải vực thật không trước khi bước tiếp nhé."
  },
  {
    id: 1, name: "The Magician", vi: "Pháp Sư", icon: "🪄",
    colors: ["#8e2de2", "#4a00e0"],
    keywords: ["sáng tạo", "quyền lực", "hành động"],
    up: "Bạn đang cầm đủ cả bộ đồ nghề trong tay: tài năng, ý tưởng, cơ hội. Đừng ngồi chờ — biến ý tưởng thành hành động ngay hôm nay!",
    rev: "Có ai đó (hoặc chính bạn) đang 'ảo thuật' quá mức. Cẩn thận lời hứa nghe hay nhưng thiếu thật, kể cả với chính mình."
  },
  {
    id: 2, name: "The High Priestess", vi: "Nữ Tư Tế", icon: "🌙",
    colors: ["#355c7d", "#6c5b7b"],
    keywords: ["trực giác", "bí mật", "nội tâm"],
    up: "Câu trả lời bạn tìm không nằm trên Google mà nằm trong bụng bạn. Im lặng một chút, nghe trực giác — nó đang thì thầm đúng đấy.",
    rev: "Bạn đang bỏ qua tiếng nói bên trong và nghe quá nhiều tiếng ồn bên ngoài. Tắt thông báo điện thoại một lát đi."
  },
  {
    id: 3, name: "The Empress", vi: "Nữ Hoàng", icon: "👑",
    colors: ["#134e5e", "#71b280"],
    keywords: ["nuôi dưỡng", "sung túc", "yêu thương"],
    up: "Năng lượng mẹ thiên nhiên bao bọc bạn. Ăn ngon, ngủ đủ, tự thưởng cho mình — sự sung túc đang đến, kể cả tiền lẫn tình cảm.",
    rev: "Bạn đang chăm cả thế giới mà quên chăm chính mình. Hôm nay xin phép được 'keo kiệt' với người khác và hào phóng với bản thân."
  },
  {
    id: 4, name: "The Emperor", vi: "Hoàng Đế", icon: "🦅",
    colors: ["#870000", "#190a05"],
    keywords: ["kỷ luật", "quyền lực", "ổn định"],
    up: "Đến lúc dựng vương quốc của riêng bạn: kỷ luật, kế hoạch, nền móng vững. Ai cần leader ở đây? Chính là bạn đấy.",
    rev: "Cẩn thận độc tài mini trong bạn (hoặc quanh bạn). Kiểm soát vừa thôi — nắm quá chặt thì cát chảy hết qua kẽ tay."
  },
  {
    id: 5, name: "The Hierophant", vi: "Giáo Hoàng", icon: "📿",
    colors: ["#4b6cb7", "#182848"],
    keywords: ["truyền thống", "lời khuyên", "niềm tin"],
    up: "Một người thầy, một lời khuyên xưa, hoặc cách làm 'chính thống' sẽ giúp bạn. Đừng ngại hỏi người đi trước — họ từng vấp chỗ bạn đang vấp.",
    rev: "Quy tắc chỉ là quy tắc. Nếu cách cũ không hợp, bạn được phép phá — miễn là hiểu mình đang phá cái gì."
  },
  {
    id: 6, name: "The Lovers", vi: "Tình Nhân", icon: "💞",
    colors: ["#ff512f", "#dd2476"],
    keywords: ["tình yêu", "lựa chọn", "kết nối"],
    up: "Trái tim bạn đang được vũ trụ ủng hộ! Dù là người yêu, bạn bè hay một lựa chọn lớn — hãy chọn bằng cả trái tim, đừng chỉ bằng cái đầu.",
    rev: "Tim và đầu đang cãi nhau to. Một quyết định cảm xúc cần thêm vài hôm đắn đo — đừng vội nhắn tin lúc 2 giờ sáng."
  },
  {
    id: 7, name: "The Chariot", vi: "Cỗ Xe", icon: "🐎",
    colors: ["#0f2027", "#2c5364"],
    keywords: ["chiến thắng", "ý chí", "tiến lên"],
    up: "Cầm cương và phi! Mục tiêu bạn nhắm đang ở rất gần, chỉ cần giữ tay lái thật chắc và đừng cho nghi ngờ ngồi ghế phụ.",
    rev: "Bạn đang kéo xe mà quên xem bản đồ. Dừng lại một nhịp, xem lại hướng đi trước khi tăng ga tiếp."
  },
  {
    id: 8, name: "Strength", vi: "Sức Mạnh", icon: "🦁",
    colors: ["#c02425", "#f0cb35"],
    keywords: ["kiên nhẫn", "dũng cảm", "mềm mại"],
    up: "Sức mạnh thật sự không phải gầm lên mà là dịu dàng với con sư tử trong bạn. Kiên nhẫn hôm nay sẽ thắng mọi cơn nóng vội ngày mai. Bạn làm được.",
    rev: "Tự ti đang gặm bạn lúc nửa đêm. Nhắc nhẹ: bạn đã sống sót qua 100% những ngày tệ nhất của mình rồi đấy."
  },
  {
    id: 9, name: "The Hermit", vi: "Ẩn Sĩ", icon: "🏮",
    colors: ["#232526", "#414345"],
    keywords: ["suy tư", "một mình", "trí tuệ"],
    up: "Một chút 'ở ẩn' có chủ đích sẽ làm bạn sáng ra. Tối nay: đèn vàng, trà nóng, không drama — câu trả lời sẽ tự gõ cửa.",
    rev: "Một mình quá lâu hoá cô đơn. Rủ ai đó đi ăn, nhắn cho một người bạn cũ — đèn của Ẩn Sĩ cũng cần người soi."
  },
  {
    id: 10, name: "Wheel of Fortune", vi: "Vòng Xoay", icon: "☸️",
    colors: ["#ffb347", "#ffcc33"],
    keywords: ["vận may", "chu kỳ", "bước ngoặt"],
    up: "Bánh xe vận mệnh đang quay về phía bạn! Giai đoạn xui (nếu có) sắp hết — chuẩn bị đón chuỗi may mắn mới.",
    rev: "Vũ trụ đang 'lag' một chút, mọi thứ chậm lại không phải lỗi của bạn. Giữ nhịp, đừng phá nhịp — sóng sẽ tới."
  },
  {
    id: 11, name: "Justice", vi: "Công Lý", icon: "⚖️",
    colors: ["#3a7bd5", "#3a6073"],
    keywords: ["công bằng", "sự thật", "quyết định"],
    up: "Công lý sẽ được thực thi — kể cả trong việc ai rửa bát hôm nay. Hãy thật thà, làm đúng, và trả nợ những gì mình đã vay.",
    rev: "Có gì đó chưa công bằng đang diễn ra. Nói thẳng sự thật (nhẹ nhàng thôi) — tránh né chỉ làm cán cân nghiêng mãi."
  },
  {
    id: 12, name: "The Hanged Man", vi: "Người Treo", icon: "🙃",
    colors: ["#2980b9", "#6dd5fa"],
    keywords: ["góc nhìn mới", "chờ đợi", "buông"],
    up: "Đôi khi phải 'treo' mình một chút mới thấy thế giới khác đi. Buông tay khỏi kế hoạch cũ — góc nhìn mới đang tới rất nhanh.",
    rev: "Bạn đang hy sinh kiểu 'hero không cần thiết'. Nghĩ lại xem sự chờ đợi này có thật sự đáng không."
  },
  {
    id: 13, name: "Death", vi: "Kết Thúc", icon: "💀",
    colors: ["#141e30", "#243b55"],
    keywords: ["kết thúc", "chuyển hóa", "mở đầu mới"],
    up: "Đừng sợ — lá này nghĩa là 'màn kết thúc đẹp' của một chương cũ. Dọn bàn, tắt tab cũ: chương mới của bạn còn hay hơn nhiều.",
    rev: "Bạn đang ôm chặt một thứ đã hết hạn sử dụng (công việc? thói quen? mối quan hệ?). Buông nhẹ thôi, không ai bắt giữ cả đâu."
  },
  {
    id: 14, name: "Temperance", vi: "Tiết Chế", icon: "🍵",
    colors: ["#02aab0", "#00cdac"],
    keywords: ["cân bằng", "kiên nhẫn", "hài hòa"],
    up: "Cuộc sống là nghệ thuật pha trà: đủ nóng, đủ ngọt, đủ chờ. Cân bằng công việc và nghỉ ngơi — bạn đang đi đúng nhịp.",
    rev: "Bạn đang chạy hơi quá đà (hoặc chơi quá đà). Kéo nhẹ phanh, uống nước, ngủ sớm — đơn giản vậy thôi."
  },
  {
    id: 15, name: "The Devil", vi: "Ác Ma", icon: "😈",
    colors: ["#000000", "#434343"],
    keywords: ["cám dỗ", "ràng buộc", "bóng tối"],
    up: "Cám dỗ đang gọi tên bạn (bánh tráng? doom-scroll? mối quan hệ độc hại?). Nhìn thẳng vào nó — khi bạn gọi tên được, nó hết quyền lực.",
    rev: "Tin vui: bạn đang thoát khỏi một 'thói quen xấu' hoặc vòng lặp cũ. Cứ tiếp tục — tự do đang ở rất gần."
  },
  {
    id: 16, name: "The Tower", vi: "Tòa Tháp", icon: "⚡",
    colors: ["#e53935", "#e35d5b"],
    keywords: ["sụp đổ", "thức tỉnh", "bất ngờ"],
    up: "Có thể một 'tòa tháp' nào đó sẽ rung — nhưng nhớ: chỉ những gì xây trên nền yếu mới sập. Sau cú sốc là mặt đất thật, vững hơn nhiều.",
    rev: "Bạn đang cố giữ một tòa tháp đã nứt. Để nó đổ một phần cũng không sao — bạn sẽ xây lại đẹp hơn."
  },
  {
    id: 17, name: "The Star", vi: "Ngôi Sao", icon: "⭐",
    colors: ["#136a8a", "#267871"],
    keywords: ["hy vọng", "chữa lành", "ước mơ"],
    up: "Lá đẹp nhất bộ bài gửi lời chúc: hy vọng đang cháy sáng. Ước đi — nghiêm túc đấy — vũ trụ đang nghe rõ hơn bạn tưởng.",
    rev: "Niềm tin của bạn đang hơi cạn pin. Làm một việc nhỏ tử tế cho ai đó hôm nay — sao sáng lên khi ta mới tin lại."
  },
  {
    id: 18, name: "The Moon", vi: "Mặt Trăng", icon: "🌛",
    colors: ["#2c3e50", "#4ca1af"],
    keywords: ["mơ hồ", "giấc mơ", "ảo giác"],
    up: "Mọi thứ hơi mờ sương — đừng chốt quyết định lớn trong cơn mơ mộng. Ghi lại giấc mơ đêm nay, nó đang nói gì đó thú vị.",
    rev: "Sương đang tan! Cái bạn từng sợ hoá ra nhỏ hơn tưởng tượng. Nhìn lại một lần nữa bằng mắt sáng — mọi thứ ổn hơn bạn nghĩ."
  },
  {
    id: 19, name: "The Sun", vi: "Mặt Trời", icon: "🌞",
    colors: ["#f2994a", "#f2c94c"],
    keywords: ["vui vẻ", "thành công", "rực rỡ"],
    up: "Rực rỡ nhất bộ bài! Thành công, niềm vui và năng lượng vàng óng đang tới. Cười lên, khoe bạn ra, chia sẻ ánh nắng của bạn đi.",
    rev: "Mây nhỏ che nắng lớn — niềm vui vẫn ở đó, chỉ hơi lúp xúp. Tự tạo cho mình một niềm vui mini ngay hôm nay."
  },
  {
    id: 20, name: "Judgement", vi: "Phán Xét", icon: "📯",
    colors: ["#642b73", "#c6426e"],
    keywords: ["thức tỉnh", "cơ hội thứ hai", "tái sinh"],
    up: "Kèn thức tỉnh đang thổi: một cơ hội 'round 2' đang xuất hiện — với người cũ, dự án cũ, hay phiên bản mới của chính bạn. Trả lời cuộc gọi đi!",
    rev: "Bạn đang tự phán xét mình khắt khe hơn cả ban giám khảo. Tha cho chính mình đi — quá khứ không phải là án tử."
  },
  {
    id: 21, name: "The World", vi: "Thế Giới", icon: "🌍",
    colors: ["#1f4037", "#99f2c8"],
    keywords: ["hoàn thành", "trọn vẹn", "hành trình mới"],
    up: "Một chu kỳ trọn vẹn đang khép lại thật đẹp — ăn mừng đi! Và rồi cánh cửa 'next level' sẽ mở ra ngay sau đó.",
    rev: "Gần đích rồi mà thiếu một cú hích cuối. Hoàn thiện nốt 5% cuối cùng — cảm giác 'xong' đáng giá hơn bạn tưởng."
  }
];

// 12 cung hoàng đạo
const ZODIAC_SIGNS = [
  { id: "aries",       vi: "Bạch Dương",  icon: "♈\uFE0E", dates: "21/3 – 19/4",  element: "Lửa" },
  { id: "taurus",      vi: "Kim Ngưu",    icon: "♉\uFE0E", dates: "20/4 – 20/5",  element: "Đất" },
  { id: "gemini",      vi: "Song Tử",     icon: "♊\uFE0E", dates: "21/5 – 20/6",  element: "Khí" },
  { id: "cancer",      vi: "Cự Giải",     icon: "♋\uFE0E", dates: "21/6 – 22/7",  element: "Nước" },
  { id: "leo",         vi: "Sư Tử",       icon: "♌\uFE0E", dates: "23/7 – 22/8",  element: "Lửa" },
  { id: "virgo",       vi: "Xử Nữ",       icon: "♍\uFE0E", dates: "23/8 – 22/9",  element: "Đất" },
  { id: "libra",       vi: "Thiên Bình",  icon: "♎\uFE0E", dates: "23/9 – 22/10", element: "Khí" },
  { id: "scorpio",     vi: "Bọ Cạp",      icon: "♏\uFE0E", dates: "23/10 – 21/11", element: "Nước" },
  { id: "sagittarius", vi: "Nhân Mã",     icon: "♐\uFE0E", dates: "22/11 – 21/12", element: "Lửa" },
  { id: "capricorn",   vi: "Ma Kết",      icon: "♑\uFE0E", dates: "22/12 – 19/1",  element: "Đất" },
  { id: "aquarius",    vi: "Bảo Bình",    icon: "♒\uFE0E", dates: "20/1 – 18/2",   element: "Khí" },
  { id: "pisces",      vi: "Song Ngư",    icon: "♓\uFE0E", dates: "19/2 – 20/3",   element: "Nước" }
];

// Nguyên liệu pha chế tử vi vui vẻ — gieo theo ngày + cung nên mỗi ngày một vị
const FORTUNE_POOLS = {
  love: [
    "Crush hôm nay nhìn bạn lâu hơn 0.5 giây — đó là dấu hiệu vũ trụ.",
    "Nên nhắn tin cho người đang nghĩ tới. Không nhắn thì vũ trụ buồn.",
    "Tình yêu hôm nay như trà sữa: ngọt vừa, trân châu đầy.",
    "Ai đó đang thầm thương trộm nhớ bạn. Có thể là người bạn gặp hôm qua.",
    "Độc thân vui vẻ là phong cách sống đẳng cấp nhất hôm nay.",
    "Một cuộc trò chuyện nhỏ có thể thành 'chuyện' to. Cứ mở lòng.",
    "Đừng soi giá trị của mình qua số tim trên story. Bạn là bản limited edition.",
    "Hôm nay hợp xin lỗi trước — kể cả khi bạn đúng. Đời sẽ mềm hơn."
  ],
  money: [
    "Ví tiền hôm nay: giữ chặt — cám dỗ giảm giá đang rình rập.",
    "Một khoản nhỏ bất ngờ sẽ đến (tiền hoàn? ai trả nợ? check app đi!).",
    "Đừng mua thứ bạn chỉ thích trong 3 phút. Ngủ một giấc rồi mua sau.",
    "Hôm nay hợp gom voucher, deal, mã giảm giá. Tiết kiệm là chân ái.",
    "Đầu tư vào bản thân (sách, khoá học, cốc trà) hôm nay sinh lời cao.",
    "Tiền không mua được hạnh phúc nhưng mua được topping — hôm nay nên thêm topping.",
    "Cẩn thận 'ăn nhẹ tí thôi' hoá ra hết ngân sách cả tuần.",
    "Một ý tưởng kiếm tiền sẽ lóe lên lúc bạn đang làm việc khác — note lại ngay."
  ],
  work: [
    "Công việc hôm nay: làm cái khó trước, cái dễ sau — vũ trụ thưởng điểm.",
    "Đồng nghiệp sẽ nói một câu hơi lạ — đừng suy nghĩ nhiều, họ chỉ đói.",
    "Ý tưởng bạn tưởng 'ngu ngu' hôm qua hoá ra khá hay. Trình bày đi!",
    "Deadline đang áp lực? Chia nhỏ ra, làm 25 phút rồi nghỉ — hiệu quả bất ngờ.",
    "Hôm nay hợp dọn bàn làm việc — không gian sạch, đầu óc sáng.",
    "Ai đó sẽ nhờ bạn giúp — giúp thì tốt, nhưng đừng nhận hết.",
    "Email khó nhằn: đọc lại 2 lần rồi mới gửi. Vũ trụ cảm ơn bạn.",
    "Học thêm 15 phút cái gì đó mới hôm nay — tương lai bạn gửi lời cảm ơn."
  ],
  mood: [
    "Năng lượng hôm nay: nắng sau mưa 🌦️➡️🌞",
    "Vibe của ngày: lo-fi chill + một chút phấn khích.",
    "Hôm nay bạn hơi 'mèo': muốn được yêu nhưng cũng muốn một mình.",
    "Tâm trạng: như cốc trà đá buổi sáng — mát, sảng, hơi đắng nhẹ.",
    "Hôm nay nên cười to hơn bình thường 20%.",
    "Năng lượng chính: 'lười nhưng vẫn slay'.",
    "Hôm nay hợp nghe playlist cũ, nhớ kỷ niệm xưa, cười một mình.",
    "Vibe: main character trong phim của riêng mình."
  ],
  luckyItem: [
    "cốc trà sữa full topping", "áo khoác màu mật", "chiếc ví biết thở",
    "gối ôm quen thuộc", "bàn phím gõ nghe sướng tay", "ly nước đá đầy",
    "đôi tất mới tinh", "cây bút viết trơn", "chiếc mũ che nắng che luôn drama",
    "playlist 8D", "quyển sổ note nhỏ", "chai nước hoa xịt đúng tâm trạng",
    "nắp chai 'trúng thưởng'", "chiếc ghế ngồi vừa vặn lạ thường"
  ],
  advice: [
    "Đừng check điện thoại ngay khi mở mắt — để não thức dậy trước đã.",
    "Uống nước. Đúng rồi, ngay bây giờ.",
    "Nói 'không' với một thứ hôm nay — sức mạnh thầm kín.",
    "Khen một người thật lòng — may mắn nhân đôi.",
    "Đi ngủ sớm hơn 30 phút. Tương lai bạn cảm ơn.",
    "Ăn một món bạn thích mà không cảm thấy tội lỗi.",
    "Xoá một app không dùng — dọn điện thoại là dọn tâm hồn.",
    "Đi bộ 10 phút ngoài trời — vũ trụ thích người di chuyển.",
    "Đừng tranh luận với người lạ trên mạng hôm nay. Đáng không thèm.",
    "Nhắn 'nhớ cậu' cho một người bạn lâu chưa nói chuyện."
  ]
};

// Câu hỏi gợi ý vui vẻ
const QUESTION_SUGGESTIONS = [
  "Hôm nay có nên chốt đơn trà sữa không?",
  "Crush có đang nghĩ tới mình không?",
  "Tháng này ví mình còn sống sót không?",
  "Nên học nghề gì cho đời bớt drama?",
  "Dự án đang làm có 'toang' không?",
  "Có nên nhắn tin cho người cũ không? (gợi ý: thôi)",
  "Cuối tuần này nên đi chơi hay ở nhà?",
  "Cơ hội mới sắp tới là gì?"
];

// ===== Minor Arcana — 56 lá tự sinh theo rank × suit =====
const SUITS = [
  {
    key: "wands", vi: "Gậy", en: "Wands", icon: "♣️", element: "Lửa",
    domain: "đam mê & năng lượng", colors: ["#c94b12", "#4b1f06"],
    flavorUp: "Lửa nhiệt huyết trong bạn đang cháy đúng bếp — hành động đi, đừng chờ 'đủ tự tin'.",
    flavorRev: "Bạn đang hết gas hoặc đốt lửa sai chỗ. Nạp năng lượng trước đã."
  },
  {
    key: "cups", vi: "Cốc", en: "Cups", icon: "❤️", element: "Nước",
    domain: "tình cảm & cảm xúc", colors: ["#1d6fa5", "#0b2a4a"],
    flavorUp: "Chuyện lòng đang mềm mại — mở lòng một chút, người ta sẽ vào được.",
    flavorRev: "Cảm xúc đang đầy cốc tràn — đổ bớt ra (tâm sự, viết, khóc một xíu cũng ok)."
  },
  {
    key: "swords", vi: "Kiếm", en: "Swords", icon: "♠️", element: "Khí",
    domain: "suy nghĩ & giao tiếp", colors: ["#5f6f94", "#1c2333"],
    flavorUp: "Đầu óc bạn đang sắc như kiếm Nhật — dùng nó để cắt vấn đề, đừng cắt người khác.",
    flavorRev: "Overthinking detected! Não bạn đang chạy 47 tab — đóng bớt vài tab đi."
  },
  {
    key: "pentacles", vi: "Tiền", en: "Pentacles", icon: "♦️", element: "Đất",
    domain: "tiền bạc & công việc", colors: ["#7a6a2f", "#26200a"],
    flavorUp: "Đất đang mùa — gieo hôm nay, gặt ngày mai. Việc & tiền đều đang lên.",
    flavorRev: "Kiểm tra lại nền móng tài chính — đừng xây lầu trên ví đang lẹt đẹt."
  }
];

const RANKS = [
  { r: "A",   vi: "Át",       en: "Ace",    kw: "khởi nguồn",
    up: "Một mầm mống mới toanh đang chớm nở — cơ hội nguyên chất, chưa vụn vặt.",
    rev: "Cơ hội vẫn nằm đó, chỉ là bạn chưa chịu nhặt lên." },
  { r: "II",  vi: "Hai",      en: "Two",    kw: "cân bằng",
    up: "Đang phân vân giữa hai lựa chọn — nghe tim 51%, nghe đầu 49%, rồi quyết.",
    rev: "Cân nhắc mãi hoá ra chẳng chịu chọn — cái giá của lười quyết định là cả hai." },
  { r: "III", vi: "Ba",       en: "Three",  kw: "mở rộng",
    up: "Hạt giống đã nảy — thời điểm hợp tác, mở rộng, trình bày ý tưởng ra đời.",
    rev: "Kế hoạch giãn chưa đều — thu về phạm vi vừa tay đã." },
  { r: "IV",  vi: "Bốn",      en: "Four",   kw: "nền móng",
    up: "Nền móng vững — nghỉ ngơi, củng cố, đắp thêm gạch cho chắc.",
    rev: "Giữ khư khư một thứ ổn định đến… nhàm. Lắc nhẹ cho đỡ bí." },
  { r: "V",   vi: "Năm",      en: "Five",   kw: "thử thách",
    up: "Có chút xung đột/sóng gió — nhưng đây là kiểu khó luyện thành chiến binh.",
    rev: "Giông bão đang qua dần — đừng cố nhặt lại những gì đã vỡ." },
  { r: "VI",  vi: "Sáu",      en: "Six",    kw: "hài hòa",
    up: "Chuyển tiếp êm đẹp — hoặc có người giúp, hoặc bạn là người giúp người.",
    rev: "Bám mãi quá khứ ngọt ngào — hồi ức để ngắm, không phải để ở." },
  { r: "VII", vi: "Bảy",      en: "Seven",  kw: "đánh giá",
    up: "Đứng lại nhìn thử thách — đánh giá kỹ rồi giữ vị thế, đừng lui.",
    rev: "Đang bị dồn ép hoặc tự thẩm định quá gay gắt — nới tiêu chuẩn một chút." },
  { r: "VIII",vi: "Tám",      en: "Eight",  kw: "chuyển động",
    up: "Mọi thứ tăng tốc — tin tức, tiến độ, cơ hội đến nhanh hơn tưởng tượng.",
    rev: "Có gì đó đang trì trệ — gỡ nút thắt nhỏ nhất trước." },
  { r: "IX",  vi: "Chín",     en: "Nine",   kw: "gần đích",
    up: "Gần đích rồi! Kiên trì nốt đoạn cuối — phần thưởng ngay sau ngọn đồi.",
    rev: "Mệt vì tự gánh cả thế giới — xin phép được nghỉ 15 phút." },
  { r: "X",   vi: "Mười",     en: "Ten",    kw: "trọn vẹn",
    up: "Một chu kỳ khép lại trọn vẹn — có thể hơi nặng, nhưng đó là trái ngọt.",
    rev: "Gánh đang quá nặng — chia bớt, giao bớt, bỏ bớt vẫn là hoàn thành." },
  { r: "J",   vi: "Tiểu Đồng", en: "Page",   kw: "tin vui",
    up: "Tin vui hoặc một bài học mới đang trên đường — giữ tâm trạng học trò.",
    rev: "Tin đồn thiên hạ nhiều hơn tin thật — kiểm chứng trước khi tin." },
  { r: "C",   vi: "Hiệp sĩ",  en: "Knight", kw: "hành động",
    up: "Năng lượng lao thẳng về phía trước — chọn hướng đúng rồi phi!",
    rev: "Vội quá hoá hỏng — chậm lại 3 giây trước khi hành động." },
  { r: "Q",   vi: "Hoàng hậu",en: "Queen",  kw: "làm chủ mềm",
    up: "Làm chủ một cách mềm mại — nuôi dưỡng vấn đề này như chăm cây.",
    rev: "Cho đi quá nhiều, giữ lại cho mình quá ít — cân lại đi." },
  { r: "K",   vi: "Vua",      en: "King",   kw: "làm chủ",
    up: "Đỉnh cao làm chủ — bạn (hoặc ai đó) đang nắm chắc ván bài.",
    rev: "Quyền lực đang bị dùng hơi… nhiều. Lãnh đạo ≠ lãnh đồ." }
];

// Icon cho lá triều thần (J/Q/K) — lá số thì vẽ pips từ ký hiệu bộ
const COURT_ICONS = { 11: "🌱", 12: "🐎", 13: "👑", 14: "🤴" };

const MINOR_DECK = SUITS.flatMap((suit, si) =>
  RANKS.map((rank, ri) => {
    const n = ri + 1;
    const art = COURT_ICONS[n]
      ? `<div class="court-icon">${COURT_ICONS[n]}</div><div class="pips">${suit.icon}</div>`
      : `<div class="pips">${n <= 5
          ? suit.icon.repeat(n)
          : suit.icon.repeat(5) + "<br>" + suit.icon.repeat(n - 5)}</div>`;
    return {
      id: 22 + si * 14 + ri,
      name: `${rank.en} of ${suit.en}`,
      vi: `${rank.vi} ${suit.vi}`,
      icon: suit.icon,
      art,
      num: `${rank.r} · ${suit.vi.toUpperCase()}`,
      colors: suit.colors,
      keywords: [rank.kw, suit.domain],
      up: `${rank.up} ${suit.flavorUp}`,
      rev: `${rank.rev} ${suit.flavorRev}`
    };
  })
);

// Bộ bài đầy đủ 78 lá
const TAROT_DECK = [...MAJOR_DECK, ...MINOR_DECK];
