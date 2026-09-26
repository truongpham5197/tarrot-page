/* ===== Dữ liệu Chiêm tinh · Thần số học · Destiny · Solar Return ===== */

// Bản chất từng cung — dùng chung cho Moon/Rising/element tally
const SIGN_ESSENCE = [
  "lửa nhiệt huyết, thích đi đầu, nóng nhưng chân thành",
  "đất ổn định, chậm mà chắc, mê đồ ngon và sự chắc tay",
  "gió lanh lợi, nói nhanh nghĩ nhanh hơn, đa nhiệm bậc thầy",
  "nước sâu sắc, cảm xúc dày, chăm sóc như bà ngoại của cả nhóm",
  "lửa rực rỡ, sân khấu gọi tên, hào phóng và hơi cần được ngắm",
  "đất chi tiết, ngăn nắp chu đáo, thấy lỗi nhỏ người khác không thấy",
  "gió duyên dáng, cân bằng đến mức khó quyết, sống để đẹp và hoà",
  "nước bí ẩn, cường độ cao, yêu ghét rõ ràng, trực giác như radar",
  "lửa phiêu lưu, tự do là chân ái, hứa to nhưng cười xoá nợ",
  "đất tham vọng, kiên trì, plan A đến Z và vẫn có plan dự phòng",
  "gió lập dị, khác biệt làm nghề, quan tâm cả nhân loại hơn hàng xóm",
  "nước mộng mơ, nghệ sĩ bẩm sinh, cảm hộ cảm xúc cả vũ trụ"
];

// ---- Thần số học: nghĩa các số 1-9 + master 11/22 ----
const NUM_MEANINGS = {
  1:  { name: "Thủ lĩnh",      text: "Bạn sinh ra để đi đầu — độc lập, quyết đoán, ghét được sai khiến. Nhớ lắng nghe kẻo 'thủ lĩnh' hoá 'độc tài mini'." },
  2:  { name: "Hoà giải viên", text: "Nhạy cảm, tinh tế, là keo dán của mọi nhóm. Điểm yếu: hay ôm cảm xúc giùm người khác — nhớ giữ phần cho mình." },
  3:  { name: "Nghệ sĩ",       text: "Sáng tạo, vui tính, diễn đạt đỉnh. Cuộc đời bạn là sân khấu — chỉ cần bớt dàn trải năng lượng." },
  4:  { name: "Người xây",     text: "Chắc chắn, kỷ luật, đáng tin đến mức người ta gửi cả mật khẩu. Nhớ chơi đùa tí, đời không chỉ có cột mốc." },
  5:  { name: "Nhà phiêu lưu", text: "Tự do là oxygen. Thay đổi, trải nghiệm, không ngồi yên — cạm bẫy là bỏ dở khi mới tới đoạn hay." },
  6:  { name: "Người chăm sóc",text: "Trách nhiệm, ấm áp, lúc nào cũng là 'mẹ/nhà' của nhóm. Cẩn thận chăm cả thế giới mà quên chăm mình." },
  7:  { name: "Nhà hiền triết",text: "Tò mò sự thật, thích một mình nghiền ngẫm, chất lượng hơn số lượng — kể cả bạn bè lẫn thông tin." },
  8:  { name: "Nhà điều hành", text: "Tham vọng, thực tế, giỏi tiền và quyền lực. Thử thách: cân bằng giữa chinh phục và sống chậm." },
  9:  { name: "Nhà nhân đạo",  text: "Lòng trắc ẩn lớn, lý tưởng cao, thấy buồn của người khác như buồn của mình. Học cách nhận lại cũng là bài học." },
  11: { name: "Trực giác thần giao (Master)", text: "Số master! Trực giác siêu nhạy, cảm hứng nghệ thuật & tâm linh — đổi lại là hệ thần kinh hay 'quá tải'. Cần nghỉ ngơi nhiều hơn bạn tưởng." },
  22: { name: "Kiến trúc sư vĩ đại (Master)", text: "Số master mạnh nhất — biến giấc mơ to thành công trình thật. Trách nhiệm nặng nề, nhưng bạn xây được thứ người khác chỉ dám tưởng tượng." }
};

const NUM_LABELS = {
  lifepath: "Số Đường đời", lifepathDesc: "Bài học & con đường lớn nhất của kiếp này — tính từ ngày sinh.",
  soul:     "Số Linh hồn",   soulDesc:     "Khát khao bên trong, điều trái tim bạn thật sự muốn — tính từ nguyên âm trong tên.",
  expression:"Số Biểu đạt",  expressionDesc:"Tài năng & cách thế giới nhìn thấy bạn — tính từ toàn bộ tên.",
  birthday: "Số Ngày sinh",  birthdayDesc: "Quà tặng kèm từ ngày bạn chào đời — một tài năng bẩm sinh.",
  personalYear: "Năm cá nhân", personalYearDesc: "Chủ đề năng lượng của năm nay — tính từ ngày sinh + năm hiện tại."
};

// ---- Matrix Destiny: vị trí các điểm năng lượng ----
const MATRIX_POSITIONS = [
  { key: "A", label: "Nhân cách",         hint: "Cách bạn xuất hiện với thế giới" },
  { key: "B", label: "Sứ mệnh linh hồn",  hint: "Điều trời cao giao cho bạn" },
  { key: "C", label: "Bài học karma",     hint: "Món nợ kiếp trước cần trả" },
  { key: "D", label: "Tình & tiền",       hint: "Chương quan hệ & tài chính" },
  { key: "E", label: "Lõi năng lượng",    hint: "Bản chất thật sự của bạn" },
  { key: "T1", label: "Vùng an toàn",     hint: "Nơi bạn nạp lại năng lượng" },
  { key: "T2", label: "Tài năng",         hint: "Kỹ năng trời phú dễ thành" },
  { key: "T3", label: "Đường tình duyên", hint: "Phong cách yêu của bạn" },
  { key: "T4", label: "Dòng tiền",        hint: "Cách tiền chảy vào đời bạn" }
];

// Năng lượng 1-22 (gắn Major Arcana) — mô tả ngắn gọn theo trường phái Ma trận
const DESTINY22 = [
  "năng lượng người tiên phong — mở đường, dẫn đầu, tự lập",
  "năng lượng cân bằng & hoà giải — kết nối, mềm mại, thấu cảm",
  "năng lượng nuôi dưỡng & sung túc — tạo ra thứ lớn lao từ nhỏ",
  "năng lượng quyền lực & kỷ luật — xây đế chế, làm chủ",
  "năng lượng tri thức & truyền đạt — học, dạy, giữ luật",
  "năng lượng tình yêu & lựa chọn — kết nối, chọn đúng người/việc",
  "năng lượng chinh phục & chiến thắng — đặt mục tiêu rồi phi",
  "năng lượng công lý & nhân quả — gieo gì gặt nấy, sòng phẳng",
  "năng lượng trí tuệ & hành hương — một mình mà sáng",
  "năng lượng vận may & dòng chảy — thuận theo chu kỳ, không gồng",
  "năng lượng sức mạnh nội tâm — mềm mại mà bền, dũng cảm kín đáo",
  "năng lượng góc nhìn khác — đổi cách nhìn để đổi thế giới",
  "năng lượng chuyển hoá — cái cũ chết đi, cái mới được sinh",
  "năng lượng nghệ thuật & thuật giả kim — pha trộn, chữa lành",
  "năng lượng thôi miên & cám dỗ — sức hút mạnh, giữ cho tỉnh táo",
  "năng lượng tái sinh qua sụp đổ — phá để xây lại vững hơn",
  "năng lượng ngôi sao hy vọng — truyền cảm hứng, ước và tin",
  "năng lượng trực giác & thế giới ngầm — mơ sâu, cảm mạnh",
  "năng lượng mặt trời — tỏa sáng, vui vẻ, thành công rực",
  "năng lượng phán xét & thức tỉnh — thức dậy phiên bản mới",
  "năng lượng viên mãn — hoàn thành chu kỳ, kết nối toàn cầu",
  "năng lượng kẻ ngố tự do — hồn nhiên, phiêu lưu, không khuôn"
];

// ---- Solar Return: chủ đề năm cá nhân 1-9/11/22 ----
const SOLAR_YEAR = {
  1:  "Năm khởi đầu — gieo hạt, mở hướng mới, dám là 'người đầu tiên'.",
  2:  "Năm kết nối — quan hệ, hợp tác, kiên nhẫn nuôi mầm năm ngoái gieo.",
  3:  "Năm sáng tạo & giao tiếp — nói, viết, trình diễn, bung xoã.",
  4:  "Năm nền móng — kỷ luật, xây nhà (nghĩa đen lẫn nghĩa bóng).",
  5:  "Năm thay đổi & phiêu lưu — đổi việc, đổi phố, đổi cả chính mình.",
  6:  "Năm gia đình & trách nhiệm — chăm sóc, sửa nhà, yêu thương lên ngôi.",
  7:  "Năm chiêm nghiệm — học sâu, tĩnh lặng, tìm sự thật bên trong.",
  8:  "Năm quyền lực & tài chính — thăng tiến, làm ăn, chơi ván to.",
  9:  "Năm khép lại & cho đi — dọn cũ, tha thứ, chuẩn bị chu kỳ mới.",
  11: "Năm master trực giác — cảm hứng cao, kết nối tâm linh sâu sắc.",
  22: "Năm master kiến tạo — cơ hội xây thứ gì đó thật lớn, đừng bỏ phí."
};

// ---- Độ hợp cung (nhóm nguyên tố) ----
const ELEMENT_PAIR = {
  "Lửa-Khí":   "gió thổi lửa cháy — combo bùng nổ, đứng gần là vui",
  "Nước-Đất":  "nước tưới đất nở hoa — combo bền vững, chậm mà chắc",
  "Lửa-Nước":  "hấp hơi nhau — nóng rồi nguội rồi lại nóng",
  "Lửa-Đất":   "lửa gặp đất — một bên muốn phi, một bên muốn xây; kiên nhẫn nhé",
  "Khí-Nước":  "gió và mưa — đẹp kiểu phim, nhưng dễ hiểu lầm",
  "Khí-Đất":   "mây gặp bùn — một bên bay, một bên neo; cần bản đồ chung"
};
function compatComment(elA, elB) {
  if (elA === elB) return "cùng nguyên tố " + elA + " — cùng tần số, hiểu nhau không cần caption";
  const key = [elA, elB].sort().join("-");
  return ELEMENT_PAIR[key] || "tổ hợp lạ lẫm — vũ trụ đang theo dõi nhiệt tình";
}
function compatTier(p) {
  if (p >= 90) return "OTP của vũ trụ — cưới… à quên, giải trí thôi!";
  if (p >= 75) return "Match made in heaven — chớp mắt là hiểu nhau";
  if (p >= 60) return "Khá hợp — cần chút xíu lắc cho đều";
  if (p >= 45) return "Bình thường — cố gắng lắc đều là nên";
  return "Kịch bản phim truyền hình 40 tập — vui mà hơi mệt";
}
