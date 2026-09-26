// Nghĩa chi tiết từng lá (78 lá) theo từng mặt đời sống — dùng cho luận giải & kết luận câu hỏi.
// Mỗi chiều (xuôi/ngược) có: kw (từ khoá), g (tổng quan), love (tình cảm), work (công việc/học tập),
// money (tài chính), health (sức khoẻ/tinh thần), adv (lời khuyên) và score từ -2 (rất bất lợi) đến +2 (rất thuận).
const CARD_DETAIL = {};
function defCard(id, upScore, revScore, up, rev) {
  CARD_DETAIL[id] = { up: { ...up, score: upScore }, rev: { ...rev, score: revScore } };
}

// ================= 22 LÁ ẨN CHÍNH =================
defCard(0, 1, -1, {
  kw: "khởi đầu mới",
  g: "Kẻ Ngố là số 0 — điểm khởi đầu trước mọi câu chuyện. Lá này báo hiệu một chương mới, một chuyến đi hay một quyết định dám bước ra khỏi vùng an toàn. Năng lượng ở đây là sự hồn nhiên, tin vào điều tốt và sẵn sàng học trên đường đi; bạn chưa cần biết hết mọi thứ mới được bắt đầu.",
  love: "Một mối quan hệ mới mẻ, nhẹ nhàng, chưa nhiều ràng buộc. Nếu đang độc thân, bạn dễ gặp ai đó theo cách rất tình cờ — một chuyến đi, một lời rủ rê bất chợt. Nếu đang có đôi, hai người nên cùng thử điều gì đó mới để làm tươi lại cảm xúc, đừng để mối quan hệ chìm trong lối mòn.",
  work: "Thời điểm tốt để bắt đầu việc mới, đổi hướng, học một kỹ năng lạ hoặc nhận một dự án chưa từng làm. Sự thiếu kinh nghiệm lúc này không phải điểm yếu mà là lợi thế: bạn nhìn vấn đề với con mắt mới. Cứ bắt tay vào và học dần, nhưng nhớ hỏi người có kinh nghiệm ở những bước quan trọng.",
  money: "Có cơ hội mới nhưng bạn còn thiếu kinh nghiệm để đánh giá hết rủi ro. Được phép thử với số tiền nhỏ, coi như học phí. Đừng dốc hết vốn chỉ vì hào hứng hay vì người khác bảo ‘chắc ăn’.",
  health: "Tinh thần phơi phới, muốn vận động, muốn đi đây đi đó — rất tốt cho sức khoẻ tinh thần. Tuy vậy hãy để ý tai nạn nhỏ do bất cẩn như va quệt, trượt ngã khi đang vui quá đà. Đây cũng là lúc hợp để bắt đầu một môn thể thao mới.",
  adv: "Dám bắt đầu, nhưng mang theo một ‘chiếc bản đồ’ tối thiểu: biết điểm dừng và mức rủi ro bạn chịu được. Bước đầu tiên không cần hoàn hảo, chỉ cần có thật."
}, {
  kw: "liều lĩnh thiếu chuẩn bị",
  g: "Kẻ Ngố ngược là sự liều lĩnh thiếu chuẩn bị, hoặc ngược lại — sợ đến mức không dám bước. Bạn có thể đang nhảy vào một chuyện mà chưa nhìn kỹ, hoặc đang đứng mãi ở mép vực vì lo lắng. Cả hai đều khiến bạn không tiến lên được một cách lành mạnh.",
  love: "Dễ vướng vào mối quan hệ bốc đồng, thiếu cam kết, hoặc gặp một người chưa trưởng thành về cảm xúc. Có thể bạn đang lao vào ai đó quá nhanh chỉ vì sợ cô đơn. Với người đang yêu, lá này cảnh báo sự hời hợt, thiếu trách nhiệm từ một phía.",
  work: "Kế hoạch thiếu chi tiết, dễ bỏ ngang giữa chừng hoặc nhảy việc theo cảm hứng. Kiểm tra lại hợp đồng, deadline và những việc bạn đang xem nhẹ. Nếu định bỏ việc hay khởi nghiệp, hãy chắc rằng mình có phương án dự phòng.",
  money: "Nguy cơ chi tiêu bốc đồng, đầu tư theo phong trào, cho vay không suy nghĩ. Chưa phải lúc mạo hiểm với tiền. Hãy xem lại các khoản chi gần đây để biết tiền đang chảy đi đâu.",
  health: "Dễ chủ quan với cơ thể: thức khuya, ăn uống thất thường, bỏ qua dấu hiệu mệt mỏi. Cẩn thận chấn thương do hành động vội. Đừng thử những thứ ‘cho vui’ có thể gây hại.",
  adv: "Dừng lại một nhịp, liệt kê rủi ro ra giấy trước khi làm. Can đảm thật sự là can đảm có tính toán."
});

defCard(1, 2, -1, {
  kw: "năng lực & hành động",
  g: "Pháp Sư là lá của hành động và năng lực. Bạn đang có đủ công cụ — kỹ năng, ý tưởng, mối quan hệ, thời điểm — để biến mong muốn thành hiện thực. Điều cần thiết lúc này là tập trung ý chí và bắt tay vào làm, vì cơ hội đang nằm trong tầm tay bạn.",
  love: "Bạn đang rất cuốn hút và chủ động. Đây là lúc tỏ tình, hẹn hò hay nói rõ điều mình muốn — lời nói của bạn có sức thuyết phục. Nếu đang chờ người kia bước trước, lá này khuyên bạn hãy là người mở lời.",
  work: "Rất thuận cho khởi nghiệp, thuyết trình, phỏng vấn, đàm phán hay ra mắt sản phẩm. Kỹ năng của bạn sẽ được nhìn thấy và đánh giá cao. Hãy tận dụng mọi nguồn lực đang có thay vì chờ thêm điều kiện.",
  money: "Có khả năng tạo ra thu nhập từ chính tài năng của mình: làm thêm, bán hàng, nhận dự án riêng. Tiền đến từ hành động chủ động chứ không từ may mắn. Thời điểm tốt để đàm phán lương hoặc giá dịch vụ.",
  health: "Năng lượng dồi dào, ý chí mạnh — thời điểm tốt để bắt đầu một thói quen lành mạnh và giữ được nó. Tâm trí minh mẫn, dễ tập trung. Chỉ cần tránh ôm quá nhiều việc cùng lúc.",
  adv: "Đừng chờ thêm điều kiện nào nữa. Chọn một mục tiêu, dồn lực vào đó và làm ngay hôm nay."
}, {
  kw: "lời hứa suông, thao túng",
  g: "Pháp Sư ngược cảnh báo sự thao túng, lời hứa suông hoặc tài năng bị lãng phí. Có thể ai đó đang ‘diễn’ với bạn, hoặc chính bạn đang phân tán năng lượng vào quá nhiều thứ mà không làm xong việc nào. Khả năng vẫn có, nhưng đang bị dùng sai chỗ.",
  love: "Cẩn thận người nói hay nhưng làm không bao nhiêu, hoặc người dùng lời ngọt để đạt mục đích riêng. Tình cảm có thể đang bị dùng như một trò chơi quyền lực. Hãy nhìn vào hành động nhất quán của họ thay vì lời hứa.",
  work: "Kế hoạch đẹp trên giấy nhưng thiếu thực thi. Để ý lừa đảo, hợp tác thiếu minh bạch hoặc người nhận công sức của bạn. Cũng có thể bạn đang thiếu tự tin nên không dám thể hiện năng lực thật.",
  money: "Tránh các lời mời làm giàu nhanh, đa cấp hay hứa hẹn lợi nhuận phi thực tế. Kiểm tra kỹ mọi giao dịch trước khi chuyển tiền. Kỹ năng kiếm tiền của bạn vẫn còn, chỉ là đang chưa được dùng đúng.",
  health: "Năng lượng tản mát, dễ kiệt sức vì ôm đồm. Tâm trí bồn chồn khó tập trung, dễ mất ngủ. Cẩn thận với thực phẩm chức năng hay phương pháp chữa bệnh được quảng cáo quá đà.",
  adv: "Hỏi thẳng: ‘Bằng chứng đâu?’. Và thu hẹp việc của mình lại để làm cho xong một thứ trước."
});

defCard(2, 0, -1, {
  kw: "trực giác, điều chưa lộ",
  g: "Nữ Tư Tế là trực giác, bí mật và những điều chưa được nói ra. Câu trả lời không đến từ việc hỏi thêm người khác mà từ việc lắng nghe chính mình. Có những thông tin còn ẩn — đừng vội kết luận khi bức tranh chưa đầy đủ.",
  love: "Có cảm xúc chưa được bày tỏ, có thể từ bạn hoặc từ người kia. Người ấy có thể có tình cảm nhưng kín đáo, chưa sẵn sàng thể hiện. Mối quan hệ cần thời gian và sự tinh tế; đừng ép người ta phải trả lời ngay.",
  work: "Chưa phải lúc hành động lớn. Quan sát, thu thập thông tin, giữ kín kế hoạch cho đến khi chín muồi. Rất hợp cho học tập, nghiên cứu, những công việc cần chiều sâu và sự tinh ý.",
  money: "Có thông tin bạn chưa nắm đủ, đặc biệt về các điều khoản hay chi phí ẩn. Tạm hoãn quyết định tài chính lớn cho đến khi mọi thứ rõ ràng. Linh cảm của bạn về một khoản đầu tư đáng được lắng nghe.",
  health: "Cơ thể đang gửi tín hiệu nhỏ — hãy lắng nghe trước khi thành chuyện lớn. Hợp với thiền, ngủ sớm, giảm kích thích từ điện thoại. Với phụ nữ, nên để ý chu kỳ và nội tiết.",
  adv: "Im lặng và quan sát thêm một thời gian. Cảm giác đầu tiên của bạn thường đúng hơn bạn nghĩ."
}, {
  kw: "phớt lờ trực giác, bí mật",
  g: "Nữ Tư Tế ngược là khi bạn phớt lờ trực giác, hoặc có bí mật sắp lộ ra. Bạn có thể đang nghe quá nhiều ý kiến bên ngoài mà quên mất cảm nhận thật của mình. Những gì bị che giấu đang tìm cách trồi lên bề mặt.",
  love: "Có sự che giấu hoặc hiểu lầm vì không ai chịu nói thật. Cảm xúc bị dồn nén quá lâu có thể bùng ra theo cách không mong muốn. Nếu bạn đã linh cảm điều gì không ổn, đừng tự thuyết phục mình rằng đó chỉ là tưởng tượng.",
  work: "Tin đồn, thông tin sai lệch, hoặc bạn đang bỏ qua một chi tiết quan trọng mà mình đã linh cảm từ trước. Có chuyện nội bộ chưa được công khai. Hãy kiểm chứng trước khi hành động.",
  money: "Chi phí ẩn, điều khoản khuất, người không minh bạch về tiền. Đọc kỹ trước khi ký, trước khi chuyển tiền. Đừng để lời khuyên của người khác lấn át cảm giác bất an của bạn.",
  health: "Căng thẳng tinh thần, mất ngủ vì nghĩ quá nhiều. Đừng lờ đi những dấu hiệu bất thường của cơ thể. Nên đi khám nếu một triệu chứng kéo dài.",
  adv: "Tắt bớt tiếng ồn bên ngoài, viết ra điều bạn thực sự cảm thấy — rồi tin vào nó."
});

defCard(3, 2, -1, {
  kw: "sung túc, nuôi dưỡng",
  g: "Nữ Hoàng tượng trưng cho sự sung túc, nuôi dưỡng và sáng tạo. Mọi thứ bạn đã chăm chút đang đơm hoa kết trái. Đây là năng lượng của sự đủ đầy, được yêu thương và biết tận hưởng cuộc sống.",
  love: "Tình cảm ấm áp, được chăm sóc và trân trọng. Rất tốt cho các cặp đôi muốn tiến xa hơn như sống chung, cưới hỏi; cũng có thể báo tin vui gia đình, con cái. Người độc thân đang toả ra sức hút dịu dàng khó cưỡng.",
  work: "Công việc phát triển tự nhiên, đặc biệt trong lĩnh vực sáng tạo, chăm sóc, làm đẹp, ẩm thực, giáo dục. Thành quả đến từ sự bền bỉ vun trồng. Môi trường làm việc dễ chịu, bạn được đồng nghiệp quý mến.",
  money: "Tài chính dư dả hơn, có thể có khoản thu thêm hoặc quà tặng. Bạn được phép tận hưởng thành quả, miễn là trong khả năng. Rất hợp để đầu tư cho nhà cửa, cho sự thoải mái lâu dài.",
  health: "Sức khoẻ tốt, cơ thể hồi phục nhanh. Hãy ăn ngon, ngủ đủ và gần gũi thiên nhiên. Thuận cho chuyện sinh nở và chăm sóc sức khoẻ sinh sản.",
  adv: "Nuôi dưỡng điều bạn muốn lớn lên — kể cả chính mình. Sự dịu dàng cũng là một loại sức mạnh."
}, {
  kw: "cạn kiệt vì cho đi",
  g: "Nữ Hoàng ngược là sự cạn kiệt vì cho đi quá nhiều, hoặc sự phụ thuộc, bao bọc thái quá. Bạn có thể đang chăm lo mọi người mà bỏ quên nhu cầu của chính mình. Sự sáng tạo và sức sống cũng vì thế mà bị tắc nghẽn.",
  love: "Mối quan hệ mất cân bằng: một người cho, một người nhận. Có thể có sự kiểm soát núp dưới dạng ‘quan tâm’, hoặc một bên quá phụ thuộc vào bên kia. Bạn cần được yêu thương, không chỉ là người yêu thương.",
  work: "Sáng tạo bị tắc, cảm giác làm mãi không thấy kết quả. Dự án cần thêm thời gian ươm, đừng ép nó chín sớm. Bạn có thể đang gánh việc của người khác mà không được ghi nhận.",
  money: "Chi tiêu cho người khác hoặc hưởng thụ quá tay khiến ngân sách hụt. Cần siết lại chi tiêu và xem ai đang dựa vào túi tiền của bạn. Tránh mua sắm để khoả lấp cảm xúc.",
  health: "Mệt mỏi, cơ thể thiếu chăm sóc. Chú ý nội tiết, ăn uống thất thường và giấc ngủ. Bạn cần nghỉ ngơi thật sự chứ không chỉ ‘tranh thủ’.",
  adv: "Trước khi rót cho ai, hãy rót đầy cốc của mình. Nói ‘không’ đúng lúc cũng là yêu thương."
});

defCard(4, 1, -1, {
  kw: "trật tự, kỷ luật",
  g: "Hoàng Đế là trật tự, kỷ luật và quyền kiểm soát. Thành công đến từ kế hoạch rõ ràng, nguyên tắc vững và sự quyết đoán. Có thể xuất hiện một người có quyền lực, một người cha, sếp hay người bảo hộ đứng sau hỗ trợ bạn.",
  love: "Mối quan hệ ổn định, có trách nhiệm. Người kia (hoặc bạn) nghiêm túc và muốn xây dựng lâu dài, dù thể hiện tình cảm hơi cứng nhắc. Đây là tình yêu của hành động và sự bảo vệ hơn là lời nói ngọt ngào.",
  work: "Rất tốt cho thăng tiến, quản lý, lập kế hoạch, làm việc với cấp trên hay cơ quan nhà nước. Hãy đứng ra dẫn dắt và đặt quy trình rõ ràng. Sự chuyên nghiệp của bạn sẽ được ghi nhận.",
  money: "Tài chính vững nhờ quản lý chặt chẽ. Thời điểm tốt để lập ngân sách, tiết kiệm có hệ thống, đầu tư dài hạn an toàn. Tránh những khoản chi theo cảm xúc.",
  health: "Thể lực tốt nếu giữ nếp sinh hoạt đều đặn. Chú ý căng thẳng, đau đầu, huyết áp do áp lực công việc. Kỷ luật trong tập luyện sẽ mang lại kết quả rõ rệt.",
  adv: "Đặt ra luật chơi cho chính mình và giữ đúng nó. Rõ ràng thì mạnh."
}, {
  kw: "độc đoán hoặc mất kiểm soát",
  g: "Hoàng Đế ngược là quyền lực bị lạm dụng hoặc mất kiểm soát. Có thể bạn đang gặp một người quá độc đoán, hoặc chính bạn đang cứng nhắc đến mức làm mọi thứ ngột ngạt. Cũng có khi là điều ngược lại: thiếu kỷ luật khiến mọi thứ trôi tuột.",
  love: "Kiểm soát, ghen tuông, áp đặt — một bên muốn nắm quyền quyết định mọi thứ. Mối quan hệ thiếu sự tôn trọng ngang hàng. Nếu bạn là người bị kiểm soát, hãy đặt lại ranh giới rõ ràng.",
  work: "Xung đột với cấp trên, tổ chức lộn xộn, luật lệ vô lý. Cẩn thận tranh chấp quyền hạn hoặc bị giao trách nhiệm mà không có quyền. Bạn cũng nên xem lại cách mình quản lý người khác.",
  money: "Chi tiêu thiếu kế hoạch hoặc phụ thuộc tài chính vào người khác. Có thể mất kiểm soát ngân sách vì không theo dõi. Nên lập lại bảng thu chi ngay.",
  health: "Căng thẳng tích tụ, huyết áp, đau lưng vai gáy. Thiếu nếp sinh hoạt khiến cơ thể mệt mỏi. Cần xây lại thói quen ăn ngủ đều.",
  adv: "Buông bớt những gì không thuộc quyền mình, và siết lại những gì bạn đã để trôi."
});

defCard(5, 1, -1, {
  kw: "truyền thống, người dẫn đường",
  g: "Giáo Hoàng đại diện cho truyền thống, người thầy và những giá trị đã được kiểm chứng. Đi theo con đường chính thống, hỏi ý kiến người có kinh nghiệm sẽ giúp bạn tránh được nhiều vấp ngã. Niềm tin và sự thuộc về một cộng đồng đang nâng đỡ bạn.",
  love: "Mối quan hệ hướng tới sự nghiêm túc: ra mắt gia đình, đính hôn, cưới hỏi. Giá trị sống chung quan trọng hơn cảm xúc nhất thời. Sự ủng hộ của gia đình hai bên là điểm cộng lớn.",
  work: "Thuận cho học tập, thi cử, lấy chứng chỉ, làm việc trong tổ chức lớn có quy trình. Tìm một người hướng dẫn sẽ giúp bạn tiến nhanh hơn tự mò mẫm. Làm đúng quy trình sẽ an toàn hơn đi đường tắt.",
  money: "Đi theo cách an toàn, truyền thống: gửi tiết kiệm, bảo hiểm, tham khảo chuyên gia có uy tín. Không phải lúc chơi mạo hiểm. Tài chính gia đình được sắp xếp ổn thoả.",
  health: "Nên đi khám theo đúng quy trình, nghe lời bác sĩ hơn là tự chữa theo mạng. Các phương pháp truyền thống, đã kiểm chứng sẽ hiệu quả. Đời sống tinh thần, tâm linh giúp bạn bình an.",
  adv: "Hỏi người đi trước. Kinh nghiệm của họ là lối tắt an toàn nhất lúc này."
}, {
  kw: "phá khuôn mẫu",
  g: "Giáo Hoàng ngược là sự phá vỡ khuôn mẫu. Những quy tắc cũ không còn phù hợp, hoặc bạn đang bị gò ép theo kỳ vọng của người khác. Đôi khi đó cũng là lời khuyên sai từ một ‘người có thẩm quyền’.",
  love: "Áp lực từ gia đình, định kiến xã hội, hoặc hai người khác biệt quan điểm sống. Có thể bạn đang yêu theo cách người khác mong chứ không theo cách mình muốn. Mối quan hệ không truyền thống cần sự dũng cảm và thống nhất giữa hai người.",
  work: "Muốn làm theo cách riêng, không hợp với hệ thống hiện tại. Cân nhắc kỹ trước khi đi ngược số đông, nhưng đừng để quy trình vô lý giết chết sáng tạo. Cẩn thận với người hướng dẫn thiếu tâm.",
  money: "Cẩn thận lời khuyên tài chính từ người ‘có vẻ uy tín’. Tự kiểm chứng mọi thông tin. Các khoản chi theo nghĩa vụ, lễ nghĩa có thể đang quá sức.",
  health: "Có thể cần tìm ý kiến thứ hai hoặc phương pháp phù hợp hơn với bản thân. Đừng máy móc làm theo mọi xu hướng sống khoẻ. Lắng nghe cơ thể mình.",
  adv: "Bạn được phép làm khác — miễn là hiểu rõ mình đang từ bỏ điều gì và vì sao."
});

defCard(6, 2, -1, {
  kw: "tình yêu & lựa chọn từ trái tim",
  g: "Tình Nhân là tình yêu, sự hoà hợp và những lựa chọn đến từ trái tim. Lá này nói về sự kết nối sâu sắc giữa hai con người và một quyết định quan trọng cần sự thành thật với giá trị của chính bạn. Khi lòng và lý cùng hướng, mọi thứ sẽ thuận.",
  love: "Một trong những lá tình cảm đẹp nhất: hai người hợp nhau, có sức hút và sự thấu hiểu. Rất thuận cho tỏ tình, hẹn hò nghiêm túc, tiến tới cam kết. Nếu bạn hỏi người ấy có tình cảm không — lá này nghiêng mạnh về có.",
  work: "Hợp tác ăn ý, tìm được đối tác phù hợp. Nếu đứng trước lựa chọn nghề nghiệp, hãy chọn điều khớp với giá trị và đam mê của bạn hơn là chỉ vì lương. Làm việc nhóm hai người đặc biệt hiệu quả.",
  money: "Tiền bạc liên quan đến hợp tác, đồng sở hữu, tài chính chung của cặp đôi. Quyết định chi tiêu nên được bàn bạc và cân nhắc cả hai phía. Chi cho điều mình thật sự trân trọng là đáng.",
  health: "Tinh thần cân bằng, được yêu thương nên khoẻ hơn. Tốt cho việc cùng người thân chăm sóc sức khoẻ. Để ý tim mạch và cảm xúc.",
  adv: "Chọn bằng trái tim, nhưng đảm bảo lựa chọn đó phù hợp với con người thật của bạn."
}, {
  kw: "lệch nhịp, lựa chọn sai",
  g: "Tình Nhân ngược là sự mất cân bằng, bất đồng hoặc một lựa chọn sai lệch với giá trị thật. Trái tim và lý trí đang không cùng hướng. Bạn có thể đang chọn vì sợ hãi, vì áp lực, hoặc vì cám dỗ nhất thời.",
  love: "Mâu thuẫn, lệch nhịp, người thứ ba hoặc một bên không còn cùng mong muốn. Tình cảm có thể đang một chiều. Đừng vội ra quyết định lúc đang cảm xúc — hãy nói chuyện thẳng thắn về điều cả hai thực sự muốn.",
  work: "Hợp tác trục trặc, bất đồng với đồng nghiệp hoặc đối tác. Cân nhắc lại lựa chọn đang làm vì lý do bên ngoài (tiền, danh, gia đình ép). Công việc hiện tại có thể không khớp với giá trị của bạn.",
  money: "Tranh chấp tiền bạc với người thân, người yêu; chi tiêu vì cảm xúc. Cẩn thận với việc góp vốn chung khi chưa rõ ràng. Tách bạch tiền bạc sẽ đỡ rắc rối.",
  health: "Căng thẳng vì chuyện tình cảm ảnh hưởng tới giấc ngủ, ăn uống. Tâm trạng lên xuống thất thường. Cần chăm sóc tinh thần trước.",
  adv: "Hỏi thật lòng: mình đang chọn vì yêu, hay vì sợ mất? Trả lời xong hẵng quyết."
});

defCard(7, 2, -1, {
  kw: "ý chí & chiến thắng",
  g: "Cỗ Xe là chiến thắng nhờ ý chí và sự tập trung. Bạn phải điều khiển hai lực kéo ngược nhau — cảm xúc và lý trí — để đi thẳng về đích. Đây là lá của tiến lên, vượt qua trở ngại bằng quyết tâm.",
  love: "Bạn chủ động theo đuổi và có khả năng thành công cao. Với cặp đôi, cùng vượt qua thử thách giúp quan hệ vững hơn. Lá này cũng có thể nói về yêu xa, di chuyển, hoặc một bên đang rất quyết tâm với mối quan hệ.",
  work: "Thắng lợi trong cạnh tranh, thi cử, đàm phán, tranh luận. Dự án tiến nhanh nếu bạn giữ nhịp và không để bị phân tâm. Có thể có công tác, chuyển nơi làm việc theo hướng tốt.",
  money: "Tài chính cải thiện nhờ nỗ lực chủ động, không phải chờ may mắn. Có thể liên quan đến xe cộ, đi lại, công tác. Mục tiêu tài chính đạt được nếu kiên trì với kế hoạch.",
  health: "Thể lực và ý chí tốt; thích hợp đặt mục tiêu tập luyện cụ thể. Để ý an toàn khi di chuyển, lái xe. Tinh thần quyết thắng giúp vượt qua bệnh tật.",
  adv: "Xác định đích đến rõ ràng, nắm chặt dây cương và đừng quay đầu."
}, {
  kw: "mất phương hướng",
  g: "Cỗ Xe ngược là mất phương hướng, bị kéo về nhiều phía hoặc cố quá thành quá cố. Kế hoạch có thể bị chững lại vì thiếu kiểm soát. Bạn đang dùng sức nhiều nhưng không đi được xa.",
  love: "Hai người muốn đi hai hướng khác nhau, hoặc một bên đang cố ép mối quan hệ theo ý mình. Thiếu sự đồng lòng khiến chuyện tình dậm chân. Yêu xa có thể gặp trở ngại.",
  work: "Trì hoãn, thất bại vì thiếu tập trung, hoặc bị đối thủ vượt mặt. Xem lại mục tiêu: bạn có đang theo đuổi quá nhiều thứ? Tránh hành động nóng vội khi bị áp lực.",
  money: "Chi phí phát sinh do vội vàng, có thể liên quan đến xe cộ, đi lại. Kế hoạch tài chính bị trật hướng. Cần ngồi lại tính toán.",
  health: "Căng thẳng, nóng nảy, kiệt sức vì cố quá. Để ý tai nạn khi lái xe vội. Nên giảm tốc độ sống.",
  adv: "Dừng xe lại một chút, chọn một hướng duy nhất rồi mới nhấn ga."
});

defCard(8, 2, -1, {
  kw: "can đảm mềm mỏng",
  g: "Sức Mạnh không phải sức mạnh cơ bắp mà là sự can đảm, kiên nhẫn và lòng trắc ẩn. Bạn chế ngự được khó khăn bằng sự mềm mỏng và bình tĩnh, không phải bằng áp đặt. Nội lực của bạn lúc này lớn hơn bạn nghĩ.",
  love: "Tình cảm được vun đắp bằng sự kiên nhẫn và bao dung. Bạn đủ sức hàn gắn, xoa dịu những căng thẳng. Người ấy cảm thấy an toàn khi ở cạnh bạn — đó là nền tảng vững cho mối quan hệ.",
  work: "Bạn đủ bản lĩnh xử lý tình huống khó, khách hàng khó hay đồng nghiệp khó. Mềm nắn rắn buông sẽ thắng. Sự tự tin điềm tĩnh giúp bạn được tin tưởng giao việc lớn.",
  money: "Kiên trì với kế hoạch tài chính, kiềm chế ham muốn chi tiêu — kết quả sẽ đến. Bạn có khả năng tự chủ tốt. Không cần đi đường tắt.",
  health: "Sức đề kháng tốt, hồi phục nhanh. Tinh thần vững vàng giúp vượt qua bệnh tật. Hợp với những bộ môn rèn sức bền như yoga, bơi, chạy bộ.",
  adv: "Giữ bình tĩnh. Sự dịu dàng kiên định mạnh hơn mọi cơn giận."
}, {
  kw: "tự ti, mất bình tĩnh",
  g: "Sức Mạnh ngược là tự ti, sợ hãi, hoặc để cảm xúc như giận dữ, ham muốn lấn át. Bạn có thể đang nghi ngờ khả năng của chính mình. Sức mạnh vẫn ở đó, chỉ là bị nỗi sợ che lấp.",
  love: "Thiếu tự tin trong tình cảm, ghen tuông hoặc để cơn giận phá hỏng mọi thứ. Có thể bạn đang nhún nhường quá mức vì sợ mất người kia. Tình yêu lành mạnh cần hai người cùng vững.",
  work: "Mất tự tin, dễ bỏ cuộc hoặc phản ứng thái quá trước áp lực. Có thể bạn đang để người khác lấn át. Cần lấy lại sự điềm tĩnh trước khi ra quyết định.",
  money: "Chi tiêu theo cảm xúc, khó kiềm chế mua sắm. Lo lắng tiền bạc khiến bạn quyết định vội. Hãy tạm dừng trước mỗi khoản chi lớn.",
  health: "Mệt mỏi, suy giảm năng lượng, lo âu. Cơ thể và tinh thần cần nghỉ ngơi và nạp lại. Đừng ép mình quá sức.",
  adv: "Bạn mạnh hơn nỗi sợ. Bắt đầu bằng một việc nhỏ chứng minh điều đó."
});

defCard(9, 0, -1, {
  kw: "lắng lại, tìm câu trả lời bên trong",
  g: "Ẩn Sĩ là giai đoạn lùi lại để nhìn vào bên trong. Bạn cần sự tĩnh lặng, thời gian một mình để tìm câu trả lời thật sự. Cũng có thể là một người thầy thông thái xuất hiện soi đường cho bạn.",
  love: "Cần khoảng lặng: có thể bạn hoặc người kia muốn có thời gian riêng để suy nghĩ. Người ấy có thể đang khép mình, chưa sẵn sàng. Độc thân lúc này là để hiểu mình hơn trước khi mở lòng.",
  work: "Hợp với nghiên cứu, học chuyên sâu, làm việc độc lập, viết lách. Chưa phải lúc phô trương hay mở rộng. Một người đi trước có kinh nghiệm có thể cho bạn lời khuyên quý.",
  money: "Chi tiêu tối giản, tập trung vào điều thật sự cần. Không nên đầu tư lớn hay theo đám đông. Đây là lúc xem lại giá trị thật của đồng tiền với bạn.",
  health: "Cơ thể cần nghỉ ngơi và yên tĩnh. Tốt cho thiền, đi bộ một mình, tránh ồn ào. Để ý sức khoẻ tinh thần, đừng để cô đơn biến thành u uất.",
  adv: "Tắt bớt kết nối bên ngoài để nghe rõ điều bên trong. Câu trả lời cần chút thời gian."
}, {
  kw: "cô lập, né tránh",
  g: "Ẩn Sĩ ngược là sự cô lập quá mức, tự khép mình, hoặc ngược lại — sợ ở một mình nên lao vào đám đông để trốn tránh suy nghĩ. Cả hai đều khiến bạn xa rời chính mình. Bạn cần tìm lại sự cân bằng giữa riêng tư và kết nối.",
  love: "Cô đơn, xa cách, một bên rút lui không lời giải thích. Mối quan hệ thiếu giao tiếp. Nếu bạn đang tự cô lập vì tổn thương cũ, đã đến lúc mở cửa lại.",
  work: "Làm việc đơn độc quá lâu, thiếu kết nối và hỗ trợ. Bạn bỏ lỡ cơ hội vì không chịu lên tiếng. Hãy chia sẻ ý tưởng của mình với người khác.",
  money: "Keo kiệt quá mức hoặc né tránh nhìn vào tình hình tài chính. Không dám hỏi ý kiến ai về tiền bạc. Đối diện với con số sẽ đỡ lo hơn.",
  health: "Dễ buồn bã, trầm uất nếu cô lập kéo dài. Hãy tìm người để chia sẻ, hoặc chuyên gia tâm lý nếu cần. Ra ngoài, gặp gỡ, phơi nắng.",
  adv: "Một mình để hồi phục thì tốt, nhưng đừng biến nó thành bức tường. Mở cửa cho ai đó."
});

defCard(10, 1, -1, {
  kw: "bước ngoặt may mắn",
  g: "Vòng Xoay May Mắn là sự thay đổi, chu kỳ và vận may. Bánh xe đang quay theo hướng có lợi — những điều bất ngờ, cơ hội tình cờ sẽ đến. Nhưng hãy nhớ: mọi thứ đều vận động, nên hãy nắm bắt khi thời cơ đến.",
  love: "Gặp gỡ định mệnh, bước ngoặt tích cực trong tình cảm. Chuyện đang bế tắc có thể bỗng chuyển biến theo hướng tốt. Người cũ hoặc mối duyên cũ có thể quay lại.",
  work: "Cơ hội bất ngờ, thay đổi vị trí, may mắn được chọn. Nắm bắt ngay khi thấy, đừng chần chừ. Thời điểm thuận để đổi việc hay nhận vai trò mới.",
  money: "Vận tài chính lên, có thể có khoản thu bất ngờ. Nhưng đừng coi may mắn là mãi mãi — để dành một phần. Tránh đặt cược tất cả vào vận may.",
  health: "Cải thiện theo hướng tốt. Giai đoạn chuyển mùa, để ý thay đổi thói quen và thời tiết. Một thay đổi nhỏ trong lối sống mang lại hiệu quả lớn.",
  adv: "Thuận gió thì giương buồm. Nắm cơ hội, và để dành một phần cho lúc bánh xe quay ngược."
}, {
  kw: "vận đi xuống tạm thời",
  g: "Vòng Xoay ngược là vận xui tạm thời, chu kỳ đi xuống hoặc thay đổi ngoài ý muốn. Bạn có thể cảm thấy mọi thứ nằm ngoài tầm kiểm soát. Đây là giai đoạn cần phòng thủ và kiên nhẫn chờ vòng quay mới.",
  love: "Trục trặc bất ngờ, lặp lại vết xe đổ cũ trong tình cảm. Thời điểm chưa thuận để tiến tới. Hãy nhìn lại những mô thức lặp lại trong các mối quan hệ của bạn.",
  work: "Kế hoạch trễ, thay đổi đột ngột không mong muốn. Chưa phải thời điểm tốt để mạo hiểm hay đổi việc. Giữ vững những gì đang có.",
  money: "Chi phí bất ngờ, thu nhập giảm tạm thời. Giữ quỹ dự phòng và cắt bớt khoản không cần. Tránh vay mượn lúc này.",
  health: "Sức khoẻ lên xuống thất thường; đừng chủ quan. Giữ nếp sinh hoạt ổn định. Khám định kỳ nếu có dấu hiệu lạ.",
  adv: "Không chống lại vòng quay, hãy chuẩn bị cho vòng tiếp theo. Chuyện xấu cũng sẽ qua."
});

defCard(11, 1, -1, {
  kw: "công bằng, nhân quả",
  g: "Công Lý là sự công bằng, sự thật và nhân quả. Mọi việc sẽ được phân xử đúng với những gì bạn đã làm. Những quyết định lúc này cần lý trí, trung thực và cân nhắc hai phía.",
  love: "Mối quan hệ cần sự công bằng và trung thực. Nếu bạn đã cho đi chân thành, bạn sẽ nhận lại xứng đáng. Hai người nên nói chuyện rõ ràng về kỳ vọng và trách nhiệm của mỗi bên.",
  work: "Thuận cho hợp đồng, giấy tờ, pháp lý, đánh giá hiệu suất. Bạn được ghi nhận đúng năng lực. Các tranh chấp sẽ được giải quyết theo lẽ phải.",
  money: "Tài chính minh bạch, có thể nhận lại khoản đã bỏ ra. Giải quyết nợ nần công bằng. Mọi giao dịch nên có giấy tờ rõ ràng.",
  health: "Cần cân bằng giữa làm và nghỉ. Kết quả xét nghiệm, khám bệnh rõ ràng. Những gì bạn đầu tư cho sức khoẻ sẽ được đền đáp.",
  adv: "Hãy trung thực — với người khác và với chính mình. Làm đúng thì không phải sợ."
}, {
  kw: "bất công, trốn tránh",
  g: "Công Lý ngược là sự bất công, thiên vị hoặc trốn tránh trách nhiệm. Có thể bạn đang bị đối xử không công bằng — hoặc đang không thành thật với ai đó. Hậu quả của những việc làm trước đang tìm đến.",
  love: "Một bên chịu thiệt, thiếu trung thực, đổ lỗi qua lại. Mối quan hệ mất cân bằng về trách nhiệm. Cần thẳng thắn nhìn nhận ai đang sai ở đâu.",
  work: "Tranh chấp, đánh giá không công bằng, giấy tờ có vấn đề. Kiểm tra kỹ hợp đồng trước khi ký. Có thể bị đổ lỗi cho việc không phải của mình.",
  money: "Rắc rối pháp lý về tiền, nợ nần chưa rõ ràng. Có người không trả đúng hẹn. Hãy lưu giữ mọi bằng chứng giao dịch.",
  health: "Mất cân bằng lối sống đang để lại hậu quả. Cơ thể ‘đòi nợ’ những đêm thức khuya. Đến lúc điều chỉnh.",
  adv: "Nhận phần trách nhiệm của mình, và đòi lại phần công bằng bạn xứng đáng."
});

defCard(12, 0, -1, {
  kw: "tạm dừng, đổi góc nhìn",
  g: "Người Treo là sự tạm dừng, chấp nhận và nhìn mọi thứ từ góc độ khác. Chưa phải lúc hành động — việc chờ đợi lúc này có ý nghĩa. Một sự hy sinh nhỏ sẽ mở ra hiểu biết lớn.",
  love: "Mối quan hệ đang ở trạng thái chờ, chưa tiến chưa lùi. Hãy thử đặt mình vào vị trí người kia để thấu hiểu. Đôi khi buông bớt kỳ vọng lại giúp tình cảm thoải mái hơn.",
  work: "Dự án chững lại, cần kiên nhẫn. Đây là lúc suy nghĩ lại chiến lược thay vì lao đầu vào làm. Một cách tiếp cận khác thường có thể là lời giải.",
  money: "Tạm hoãn các khoản chi, khoản đầu tư lớn. Tiền đang ‘treo’ chờ thời điểm. Chấp nhận chậm một chút để an toàn.",
  health: "Cơ thể cần nghỉ ngơi thật sự. Nằm yên cũng là chữa lành. Hợp với các bài giãn cơ, yoga, thiền.",
  adv: "Đổi góc nhìn trước khi đổi hành động. Chờ đợi đúng lúc là một kỹ năng."
}, {
  kw: "trì hoãn vô ích",
  g: "Người Treo ngược là trì hoãn vô ích, hy sinh không được đền đáp hoặc cố chấp không chịu thay đổi góc nhìn. Bạn đang mắc kẹt vì không chịu buông. Thời gian trôi mà mọi thứ vẫn đứng yên.",
  love: "Chờ đợi một người không hồi đáp, hy sinh một chiều. Bạn đã cho đi quá nhiều mà không nhận lại. Đến lúc tự hỏi mình còn chờ đến bao giờ.",
  work: "Trì trệ kéo dài, lãng phí thời gian vào việc không đi đến đâu. Chần chừ quyết định khiến cơ hội trôi qua. Cần hành động dứt khoát.",
  money: "Tiền bị kẹt, khoản đầu tư không sinh lời mà vẫn không dám cắt lỗ. Chi tiêu vì người khác mà mình thiệt. Hãy đặt giới hạn.",
  health: "Mệt mỏi kéo dài vì không chịu thay đổi thói quen. Tâm trạng ì ạch, thiếu động lực. Một thay đổi nhỏ sẽ tạo đà.",
  adv: "Nếu đã chờ đủ lâu mà không có gì thay đổi — đến lúc tự cởi dây và bước xuống."
});

defCard(13, 0, -1, {
  kw: "kết thúc để tái sinh",
  g: "Cái Chết hầu như không nói về cái chết thật, mà về sự kết thúc để bắt đầu lại. Một giai đoạn, một mối quan hệ hay một thói quen cần khép lại để nhường chỗ cho điều mới. Sự chuyển hoá này tuy đau nhưng cần thiết và mở ra tương lai tốt hơn.",
  love: "Kết thúc một kiểu quan hệ cũ: có thể là chia tay, hoặc hai người cùng thay đổi để bước sang giai đoạn mới trưởng thành hơn. Nếu đang níu kéo người cũ, lá này khuyên nên khép lại. Người độc thân sẵn sàng cho khởi đầu mới sau khi buông quá khứ.",
  work: "Kết thúc công việc, dự án hay vị trí hiện tại; một cánh cửa mới đang mở sau đó. Tái cơ cấu, chuyển ngành, thay đổi lớn. Đừng bám vào vị trí đã hết thời.",
  money: "Thay đổi lớn trong cách kiếm tiền. Cắt bỏ khoản chi, khoản đầu tư không hiệu quả. Một nguồn thu cũ có thể dừng lại, nhưng nguồn mới sẽ đến.",
  health: "Giai đoạn thay đổi cơ thể, bỏ thói quen xấu. Thời điểm tốt để bắt đầu lối sống mới hoàn toàn. Không mang nghĩa bệnh nặng.",
  adv: "Đừng níu kéo cái đã hết. Buông tay là cách duy nhất để hai tay được rảnh đón điều mới."
}, {
  kw: "sợ thay đổi, níu kéo",
  g: "Cái Chết ngược là sự kháng cự thay đổi. Bạn biết điều gì đó đã kết thúc nhưng vẫn cố níu giữ, khiến mình mắc kẹt trong trạng thái lưng chừng. Càng trì hoãn, sự chuyển đổi càng đau.",
  love: "Níu kéo mối quan hệ đã cạn, sợ cô đơn nên không dám kết thúc. Hoặc quay lại với người cũ dù biết không hợp. Mối quan hệ lặp đi lặp lại những vấn đề cũ.",
  work: "Sợ thay đổi, bám vào công việc đã không còn phù hợp. Tổ chức cần đổi mới nhưng bị trì hoãn. Bạn đang lãng phí thời gian quý.",
  money: "Không chịu cắt lỗ, giữ những khoản chi đã lỗi thời. Thói quen tài chính cũ đang kéo bạn lại. Cần mạnh tay thay đổi.",
  health: "Không chịu bỏ thói quen xấu dù biết có hại. Hồi phục chậm vì không thay đổi lối sống. Đến lúc quyết tâm.",
  adv: "Sự thay đổi sẽ đến dù bạn có sẵn sàng hay không. Chủ động bước qua sẽ đỡ đau hơn."
});

defCard(14, 1, -1, {
  kw: "cân bằng, chữa lành",
  g: "Tiết Chế là sự cân bằng, điều độ và kiên nhẫn. Kết hợp những yếu tố đối lập một cách khéo léo sẽ tạo ra kết quả tốt. Mọi thứ đang được chữa lành dần dần, không vội nhưng chắc chắn.",
  love: "Mối quan hệ hài hoà, hai người biết nhường nhịn và dung hoà. Hàn gắn sau xung đột diễn ra tự nhiên. Tình cảm tiến triển từ từ nhưng bền.",
  work: "Làm việc nhóm tốt, dung hoà các bên. Tiến độ vừa phải nhưng bền vững. Bạn có vai trò cầu nối, hoà giải.",
  money: "Chi tiêu điều độ, cân đối thu chi tốt. Không cần mạo hiểm, cứ đều đặn là đủ. Tài chính ổn định dần.",
  health: "Rất tốt cho hồi phục, điều trị lâu dài. Ăn uống cân bằng là chìa khoá. Kết hợp nhiều phương pháp mang lại hiệu quả.",
  adv: "Không quá nhanh, không quá chậm. Pha trộn đúng liều sẽ ra điều kỳ diệu."
}, {
  kw: "mất cân bằng, thái quá",
  g: "Tiết Chế ngược là mất cân bằng, thái quá hoặc thiếu kiên nhẫn. Bạn đang cực đoan ở một mặt nào đó của cuộc sống. Muốn nhanh thì lại hoá chậm.",
  love: "Xung đột vì hai bên không chịu nhường, hoặc một bên quá đà trong cảm xúc. Thiếu sự hoà hợp về nhịp sống. Cần tìm điểm chung.",
  work: "Quá tải, xung đột nhóm, làm vội làm ẩu. Công việc lấn át cuộc sống. Cần điều chỉnh khối lượng.",
  money: "Chi tiêu vô độ hoặc thắt chặt quá mức. Thu chi mất cân đối. Lập lại ngân sách.",
  health: "Ăn uống, sinh hoạt thất thường, lạm dụng chất kích thích như cà phê, rượu bia. Cơ thể đang báo động. Điều độ lại ngay.",
  adv: "Tìm lại điểm giữa. Điều gì đang quá nhiều thì bớt, điều gì thiếu thì bù."
});

defCard(15, -1, 1, {
  kw: "ràng buộc, cám dỗ",
  g: "Ác Quỷ là sự ràng buộc, cám dỗ và những xiềng xích do chính mình tự đeo. Có thể là nghiện ngập, ham muốn vật chất, mối quan hệ độc hại hoặc nỗi sợ khiến bạn không dám thoát ra. Điều đáng nhớ: sợi xích thường lỏng hơn bạn nghĩ.",
  love: "Sức hút mãnh liệt nhưng dễ độc hại, ghen tuông, chiếm hữu. Có thể là quan hệ bí mật, lệ thuộc hoặc chỉ dựa trên ham muốn. Hãy tự hỏi mối quan hệ này có làm bạn tốt lên không.",
  work: "Bị trói buộc vào công việc vì tiền, dù không vui. Cẩn thận cám dỗ làm điều sai trái để đạt mục đích. Môi trường có thể độc hại.",
  money: "Nợ nần, chi tiêu theo ham muốn, cờ bạc, đầu cơ. Tiền bạc đang kiểm soát bạn thay vì ngược lại. Tránh xa các khoản vay nóng.",
  health: "Nghiện ngập, thói quen xấu như rượu, thuốc lá, thức khuya, điện thoại. Cơ thể đang chịu hậu quả. Cần quyết tâm cai.",
  adv: "Nhìn thẳng vào sợi xích — nó lỏng hơn bạn nghĩ. Bạn luôn có quyền bước ra."
}, {
  kw: "giải thoát",
  g: "Ác Quỷ ngược là sự giải thoát. Bạn đang nhận ra những gì trói buộc mình và bắt đầu tháo gỡ. Một bước ngoặt tích cực để lấy lại tự do và quyền làm chủ bản thân.",
  love: "Thoát khỏi mối quan hệ độc hại, hoặc hai người vượt qua sự chiếm hữu để yêu lành mạnh hơn. Bạn tỉnh táo nhìn rõ người kia. Tình cảm trở nên nhẹ nhõm hơn.",
  work: "Can đảm rời bỏ công việc trói buộc, lấy lại quyền quyết định. Thoát khỏi môi trường độc hại. Bạn chọn làm vì mình muốn chứ không vì buộc phải.",
  money: "Bắt đầu trả nợ, kiểm soát lại chi tiêu. Cai được thói quen mua sắm vô độ. Tài chính dần sáng sủa.",
  health: "Cai được thói quen xấu, sức khoẻ cải thiện. Tinh thần nhẹ nhõm. Tiếp tục kiên trì để không tái phát.",
  adv: "Tiếp tục đi — đừng quay lại vì chút cám dỗ cũ."
});

defCard(16, -2, -1, {
  kw: "biến cố, đổ vỡ",
  g: "Tòa Tháp là biến cố bất ngờ làm sụp đổ những gì xây trên nền móng sai. Nó gây sốc, nhưng giải phóng bạn khỏi ảo tưởng. Sau đổ vỡ là cơ hội xây lại vững hơn trên nền sự thật.",
  love: "Sự thật bất ngờ, cãi vã lớn hoặc chia tay đột ngột. Những gì không thật sẽ không đứng vững. Nếu mối quan hệ có vấn đề bị che giấu, nó sẽ lộ ra.",
  work: "Thay đổi đột ngột: tái cơ cấu, mất việc, dự án đổ vỡ. Chuẩn bị phương án B ngay. Kế hoạch dựa trên giả định sai sẽ sụp.",
  money: "Tổn thất tài chính bất ngờ. Không phải lúc đầu tư, vay mượn hay cho vay. Giữ tiền mặt dự phòng.",
  health: "Cú sốc thể chất hoặc tinh thần; cần cẩn trọng và đi khám khi có dấu hiệu lạ. Tránh các hoạt động nguy hiểm. Căng thẳng có thể bùng phát.",
  adv: "Đừng cố chống cái đã sụp. Cứu những gì quý nhất, rồi xây lại trên nền thật."
}, {
  kw: "khủng hoảng âm ỉ",
  g: "Tòa Tháp ngược là biến cố được né tránh hoặc bị trì hoãn. Bạn có thể đang cố chống đỡ một thứ đã lung lay — nhưng sự thay đổi chỉ bị hoãn, không biến mất. Vẫn còn cơ hội tự điều chỉnh trước khi mọi thứ đổ sập.",
  love: "Né tránh cuộc nói chuyện cần thiết, giữ yên ổn bề ngoài. Vấn đề âm ỉ chưa được giải quyết. Nói ra sớm sẽ đỡ tổn thương hơn.",
  work: "Khủng hoảng âm ỉ, cảnh báo sớm. Còn kịp điều chỉnh nếu hành động ngay. Đừng lờ đi những dấu hiệu bất ổn.",
  money: "Rủi ro đang tích tụ. Rà soát và cắt giảm ngay. Tránh để nợ nần chồng chất.",
  health: "Cơ thể đang cảnh báo; đừng đợi tới lúc ‘sập’ mới xử lý. Đi khám sớm. Giảm căng thẳng.",
  adv: "Tự tháo dỡ phần mục nát trước khi nó tự đổ."
});

defCard(17, 2, 0, {
  kw: "hy vọng, chữa lành",
  g: "Ngôi Sao là hy vọng, chữa lành và niềm tin sau giông bão. Mọi thứ đang dần tốt lên, bạn được soi đường và được tiếp thêm cảm hứng. Đây là một trong những lá bài tích cực nhất của bộ Tarot.",
  love: "Tình cảm chân thành, hy vọng mới sau tổn thương. Người phù hợp có thể đang đến, hoặc mối quan hệ đang được chữa lành. Bạn xứng đáng được yêu thương thật lòng.",
  work: "Cảm hứng sáng tạo dồi dào, tầm nhìn dài hạn rõ ràng. Tốt cho nghệ thuật, truyền thông, định hướng tương lai. Ước mơ nghề nghiệp có cơ hội thành hiện thực.",
  money: "Tài chính hồi phục dần, triển vọng tốt về lâu dài. Kiên trì với kế hoạch sẽ thấy kết quả. Không cần vội.",
  health: "Hồi phục, chữa lành cả thân và tâm. Rất tốt cho điều trị. Tinh thần lạc quan là liều thuốc quý.",
  adv: "Giữ hy vọng và tiếp tục. Điều bạn mong đang trên đường tới."
}, {
  kw: "mất niềm tin tạm thời",
  g: "Ngôi Sao ngược là mất niềm tin, chán nản hoặc hoài nghi bản thân. Hy vọng vẫn còn, chỉ là bạn tạm không nhìn thấy nó. Đây là giai đoạn cần tự chữa lành trước khi tiếp tục.",
  love: "Thất vọng, bi quan về tình yêu sau tổn thương. Cần chữa lành bản thân trước khi mở lòng. Đừng đóng cửa trái tim vĩnh viễn.",
  work: "Thiếu động lực, mất phương hướng dài hạn. Cảm thấy ước mơ xa vời. Hãy đặt mục tiêu nhỏ để lấy lại đà.",
  money: "Lo lắng tài chính khiến bạn tê liệt quyết định. Tình hình không tệ như bạn nghĩ. Nhìn vào con số thật.",
  health: "Mệt mỏi tinh thần, dễ buồn; cần nạp lại năng lượng tích cực. Ngủ đủ, ra ngoài. Tìm người tâm sự.",
  adv: "Nhìn lại những gì bạn đã vượt qua. Ánh sao chỉ bị mây che, không hề tắt."
});

defCard(18, -1, 0, {
  kw: "mơ hồ, ảo tưởng",
  g: "Mặt Trăng là sự mơ hồ, ảo tưởng và nỗi sợ vô hình. Mọi thứ không như vẻ ngoài; thông tin chưa rõ ràng, trực giác và lo lắng đan xen. Cần tỉnh táo phân biệt thật – giả trước khi quyết định.",
  love: "Mập mờ, không rõ ràng, có thể có điều che giấu. Người ấy chưa thể hiện rõ lòng mình, hoặc chính bạn đang tự tưởng tượng. Đừng tự suy diễn rồi tự tổn thương — hãy hỏi thẳng khi có thể.",
  work: "Thông tin thiếu, nội bộ khó đoán, có thể có người không minh bạch. Chưa nên quyết định lớn cho đến khi mọi thứ sáng tỏ. Kiểm chứng mọi nguồn tin.",
  money: "Rủi ro lừa đảo, thông tin mù mờ. Không đầu tư vào thứ bạn không hiểu. Cẩn thận với lời mời hấp dẫn bất thường.",
  health: "Lo âu, mất ngủ, mộng mị. Có thể có vấn đề chưa được chẩn đoán đúng — nên tìm thêm ý kiến bác sĩ. Hạn chế thức khuya.",
  adv: "Đi chậm trong sương mù. Kiểm chứng mọi thứ, đừng để nỗi sợ dẫn đường."
}, {
  kw: "sương mù tan dần",
  g: "Mặt Trăng ngược là sương mù đang tan. Sự thật dần lộ ra, nỗi sợ giảm bớt và bạn bắt đầu nhìn rõ hơn. Những lo lắng vô căn cứ sẽ tự biến mất.",
  love: "Hiểu lầm được giải toả, bí mật được nói ra. Bạn nhìn rõ hơn cảm xúc của mình và người kia. Mối quan hệ trở nên minh bạch.",
  work: "Thông tin rõ dần, bạn nhận ra điều bất ổn trước đó. Có thể đưa ra quyết định sáng suốt hơn. Người không trung thực bị lộ.",
  money: "Phát hiện ra khoản không minh bạch — kịp thời xử lý. Tình hình tài chính rõ ràng hơn. Tránh được rủi ro.",
  health: "Tinh thần ổn định hơn, giấc ngủ cải thiện. Chẩn đoán rõ ràng hơn. Lo âu giảm.",
  adv: "Tin vào điều bạn vừa nhìn rõ, và bước tiếp."
});

defCard(19, 2, 1, {
  kw: "thành công, niềm vui",
  g: "Mặt Trời là niềm vui, thành công và sự rõ ràng. Mọi thứ sáng sủa, tích cực, bạn được là chính mình và được ghi nhận. Đây là lá ‘CÓ’ rõ nhất trong bộ bài.",
  love: "Tình cảm hạnh phúc, cởi mở, vui vẻ. Rất tốt cho cưới hỏi, ra mắt, tin vui con cái. Người ấy có tình cảm chân thành và rõ ràng với bạn.",
  work: "Thành công, được công nhận, dự án toả sáng. Thi cử đạt kết quả tốt. Mọi nỗ lực đều được đền đáp.",
  money: "Tài chính thịnh vượng, mọi việc thuận lợi. Có thể có thưởng, tăng thu nhập. Đầu tư sinh lời.",
  health: "Sức khoẻ tốt, tràn đầy năng lượng. Hồi phục nhanh. Tinh thần lạc quan.",
  adv: "Tự tin toả sáng. Chia sẻ niềm vui, nó sẽ nhân lên."
}, {
  kw: "niềm vui đến chậm",
  g: "Mặt Trời ngược vẫn là lá tốt, chỉ là niềm vui bị giảm nhẹ hoặc đến chậm hơn. Có thể bạn đang lạc quan quá mức, hoặc quá mệt để tận hưởng. Kết quả vẫn tích cực nếu bạn kiên nhẫn.",
  love: "Vui nhưng chưa trọn, có chút kỳ vọng không thực tế. Tình cảm cần thêm thời gian để rõ ràng. Đừng so sánh với người khác.",
  work: "Thành công đến chậm hơn dự tính, hoặc chưa được ghi nhận xứng đáng. Cần kiên trì thêm. Tránh tự mãn.",
  money: "Ổn nhưng chưa bứt phá; đừng tiêu trước tiền chưa về. Kế hoạch cần thêm thời gian. Giữ kỷ luật chi tiêu.",
  health: "Hơi đuối sức; cần nghỉ ngơi và phơi nắng. Không có vấn đề nghiêm trọng. Chú ý năng lượng.",
  adv: "Kiên nhẫn một chút, mặt trời chỉ đang bị mây che tạm thời."
});

defCard(20, 1, -1, {
  kw: "thức tỉnh, cơ hội thứ hai",
  g: "Phán Xét là sự thức tỉnh, tái sinh và tiếng gọi bên trong. Bạn nhìn lại quá khứ, rút ra bài học và sẵn sàng cho một phiên bản mới của mình. Đây có thể là cơ hội thứ hai mà bạn chờ đợi.",
  love: "Hàn gắn, quay lại với người cũ nếu cả hai đã trưởng thành hơn — hoặc nhìn rõ và khép lại hẳn. Một cuộc nói chuyện thẳng thắn làm thay đổi mọi thứ. Tình cảm bước sang giai đoạn mới.",
  work: "Quyết định lớn về sự nghiệp, tiếng gọi nghề nghiệp. Được đánh giá, được gọi lại, được thăng chức. Kết quả thi cử, phỏng vấn tích cực.",
  money: "Thu hồi khoản cũ, đánh giá lại toàn bộ tài chính. Cơ hội sửa sai lầm tài chính trước đây. Lên kế hoạch mới.",
  health: "Hồi phục, lấy lại sức sống sau thời gian khó khăn. Thức tỉnh về lối sống lành mạnh. Khám tổng quát là ý hay.",
  adv: "Tha thứ cho quá khứ và trả lời tiếng gọi của chính mình."
}, {
  kw: "tự phán xét, lặp lại sai lầm",
  g: "Phán Xét ngược là tự phán xét quá khắt khe, nghi ngờ bản thân hoặc phớt lờ bài học cũ nên lặp lại sai lầm. Bạn đang né tránh một quyết định quan trọng. Tiếng gọi vẫn ở đó, chờ bạn trả lời.",
  love: "Lặp lại vết xe đổ, không chịu rút kinh nghiệm từ mối quan hệ trước. Quay lại với người cũ mà không có gì thay đổi. Tự trách quá nhiều.",
  work: "Do dự trước lựa chọn quan trọng, sợ bị đánh giá. Bỏ lỡ cơ hội vì thiếu tự tin. Kết quả chưa như ý.",
  money: "Lặp lại sai lầm tài chính cũ. Chưa học được bài học về tiền bạc. Xem lại thói quen chi tiêu.",
  health: "Tự trách, áp lực tinh thần ảnh hưởng sức khoẻ. Bỏ qua lời khuyên của bác sĩ. Cần chăm sóc bản thân hơn.",
  adv: "Học bài học rồi bước tiếp — đừng tự phạt mình mãi."
});

defCard(21, 2, -1, {
  kw: "hoàn thành, viên mãn",
  g: "Thế Giới là sự hoàn thành, viên mãn và một chu kỳ khép lại trọn vẹn. Bạn đã đi đến đích, đạt được điều mình hướng tới. Cánh cửa mới rộng lớn hơn đang mở ra phía trước.",
  love: "Mối quan hệ viên mãn, gắn kết sâu sắc; có thể tiến tới hôn nhân hoặc cùng nhau hoàn thành một mục tiêu lớn. Hai người như hai mảnh ghép hoàn hảo. Người độc thân cảm thấy trọn vẹn với chính mình.",
  work: "Hoàn thành dự án, tốt nghiệp, đạt mục tiêu. Có thể liên quan đến nước ngoài, mở rộng quốc tế. Thành quả được công nhận rộng rãi.",
  money: "Tài chính ổn định, đạt được mục tiêu đã đặt ra. Có thể đầu tư cho giai đoạn tiếp theo. Mọi thứ trọn vẹn.",
  health: "Sức khoẻ tốt, trạng thái cân bằng trọn vẹn. Hoàn thành liệu trình điều trị. Tinh thần an yên.",
  adv: "Ăn mừng thành quả, rồi mạnh dạn bước sang hành trình lớn hơn."
}, {
  kw: "còn thiếu mảnh ghép cuối",
  g: "Thế Giới ngược là chưa hoàn thành, còn thiếu một mảnh ghép cuối, hoặc trì hoãn việc khép lại. Bạn đang ở rất gần đích. Chỉ cần thêm một nỗ lực nữa.",
  love: "Mối quan hệ thiếu sự kết thúc rõ ràng hoặc chưa đi đến cam kết. Cảm giác còn điều gì dang dở. Cần nói chuyện rõ ràng về tương lai.",
  work: "Dự án dở dang, trì hoãn phần việc cuối. Mục tiêu gần đạt nhưng chưa xong. Đừng bỏ cuộc lúc này.",
  money: "Mục tiêu tài chính chưa đạt, còn thiếu một chút. Kiên trì thêm. Tránh tiêu trước.",
  health: "Cần hoàn tất liệu trình điều trị, đừng bỏ giữa chừng. Sức khoẻ cần thêm thời gian ổn định. Kiên nhẫn.",
  adv: "Tìm mảnh ghép còn thiếu và làm nốt. Chỉ còn một bước nữa thôi."
});
// ================= BỘ GẬY (Lửa · đam mê, hành động) — id 22–35 =================
defCard(22, 2, -1, {
  kw: "tia lửa khởi đầu",
  g: "Át Gậy là tia lửa đầu tiên của một khởi đầu đầy nhiệt huyết: một ý tưởng mới, một cảm hứng bất chợt hay một cơ hội vừa mở ra. Năng lượng lúc này rất mạnh và đang thúc bạn hành động. Điều bạn hỏi có một khởi đầu thuận lợi, miễn là bạn bắt tay vào làm khi lửa còn đang cháy.",
  love: "Một sức hút mới, mạnh mẽ và rất nhiều đam mê. Người độc thân dễ gặp ai đó khiến tim mình đập nhanh; người đang yêu thấy mối quan hệ được thổi thêm lửa. Nếu bạn hỏi có nên chủ động không, câu trả lời là có: hãy nhắn tin, hẹn gặp, bày tỏ ngay khi cảm xúc còn nóng.",
  work: "Thời điểm rất tốt để khởi động dự án, nộp hồ sơ, đề xuất ý tưởng hay bắt đầu một khoá học. Ý tưởng của bạn có tiềm năng thật và sẽ được chú ý nếu bạn trình bày nhanh. Đừng chờ kế hoạch hoàn hảo; hãy làm bản đầu tiên ngay trong tuần này.",
  money: "Có một nguồn thu hoặc cơ hội kiếm tiền mới đang mở ra, thường từ sáng kiến hay công việc riêng của bạn. Bỏ vốn nhỏ để thử là hợp lý vì tiềm năng lớn. Tiền đến nhờ bạn chủ động chứ không tự rơi vào tay.",
  health: "Năng lượng dồi dào, cơ thể sẵn sàng vận động. Đây là thời điểm tốt để bắt đầu tập luyện hay một chế độ sống mới. Chỉ cần chú ý đừng nóng vội mà tập quá sức ngay từ những buổi đầu.",
  adv: "Làm ngay bước đầu tiên khi cảm hứng còn nóng. Một hành động nhỏ hôm nay giá trị hơn một kế hoạch hoàn hảo tuần sau."
}, {
  kw: "lửa tắt, chần chừ",
  g: "Át Gậy ngược là ngọn lửa bị dập tắt: ý tưởng hay nhưng không được triển khai, hoặc hào hứng lúc đầu rồi nhanh chóng nguội. Có thể bạn đang thiếu động lực, bị trì hoãn hoặc bắt đầu sai thời điểm. Điều bạn hỏi chưa thể khởi động suôn sẻ cho tới khi tìm lại được lý do thật sự để làm.",
  love: "Cảm xúc thiếu lửa, một bên hào hứng còn bên kia hờ hững. Có thể là mối quan hệ nhen nhóm rồi tắt, tin nhắn thưa dần. Lúc này chưa nên đặt kỳ vọng lớn; hãy xem người kia có thực sự đáp lại bằng hành động hay không.",
  work: "Dự án bị hoãn, ý tưởng bị gác lại, hoặc bạn mất hứng với việc đang làm. Có thể thời điểm chưa chín hoặc nguồn lực chưa đủ. Chưa nên khởi động điều mới; hãy xác định lại vì sao mình muốn làm việc này.",
  money: "Cơ hội kiếm tiền bị lỡ hoặc chậm hơn dự kiến. Kế hoạch làm ăn mới chưa đủ cơ sở để bỏ vốn. Tạm giữ tiền, đừng đầu tư chỉ vì một phút hứng khởi.",
  health: "Uể oải, thiếu năng lượng, khó duy trì thói quen tập luyện. Có thể bạn đang kiệt sức mà không nhận ra. Hãy nghỉ ngơi đủ trước khi ép mình bắt đầu điều gì mới.",
  adv: "Đừng ép lửa cháy khi củi còn ướt. Nghỉ một chút, tìm lại lý do thật sự của mình rồi hãy bắt đầu lại."
});

defCard(23, 1, -1, {
  kw: "lên kế hoạch, tầm nhìn",
  g: "Hai Gậy là lúc đứng trên cao nhìn ra xa và lên kế hoạch cho bước tiếp theo. Bạn đã có một nền tảng nhất định và đang cân nhắc có nên mở rộng hay không. Điều bạn hỏi có triển vọng, nhưng cần bạn quyết định hướng đi rõ ràng thay vì chỉ đứng nhìn.",
  love: "Bạn đang cân nhắc tương lai của mối quan hệ: tiến xa hơn hay giữ nguyên, ở lại hay đi. Có thể có chuyện yêu xa hoặc một trong hai người đang có kế hoạch riêng. Câu trả lời nghiêng về tích cực nếu hai người cùng nói rõ mình muốn gì trong 6–12 tháng tới.",
  work: "Thời điểm lập kế hoạch dài hạn, tính chuyện mở rộng, học thêm hoặc làm việc với đối tác ở xa. Cơ hội nằm ngoài vùng quen thuộc của bạn. Hãy viết kế hoạch cụ thể rồi chọn một hướng để bắt đầu.",
  money: "Tài chính đủ ổn để tính bước tiếp theo, nhưng cần kế hoạch rõ ràng. Hợp để lập ngân sách dài hạn và nghiên cứu cơ hội đầu tư. Chưa cần xuống tiền ngay, nhưng cũng đừng chần chừ quá lâu.",
  health: "Thể trạng ổn định. Tốt để đặt mục tiêu sức khoẻ dài hạn như giảm cân, chạy bộ hay khám tổng quát. Kiên trì với kế hoạch sẽ thấy hiệu quả.",
  adv: "Nhìn xa nhưng đừng đứng mãi trên tường thành. Chọn một hướng và đặt hạn chót để bắt đầu."
}, {
  kw: "sợ bước ra, kế hoạch mơ hồ",
  g: "Hai Gậy ngược là sợ rời vùng an toàn hoặc kế hoạch còn mơ hồ. Bạn muốn thay đổi nhưng không dám bước ra, hoặc lên kế hoạch mãi mà không hành động. Điều bạn hỏi đang bị kẹt vì chính sự do dự của bạn.",
  love: "Một bên chưa sẵn sàng cho tương lai chung, hoặc hai người có kế hoạch sống khác nhau. Yêu xa có thể gặp khó. Chưa nên kỳ vọng tiến triển lớn cho tới khi cả hai thống nhất được hướng đi.",
  work: "Kế hoạch thiếu cụ thể, sợ rủi ro nên bỏ lỡ cơ hội. Có thể bạn đang ở lại một vị trí đã chật chội chỉ vì quen. Cần đánh giá lại xem điều gì thực sự giữ chân bạn.",
  money: "Tính toán sai hoặc kế hoạch tài chính thiếu cơ sở. Đầu tư vào nơi mình không hiểu rõ sẽ rủi ro. Nên giữ tiền và nghiên cứu thêm.",
  health: "Lo lắng về tương lai khiến bạn căng thẳng. Có kế hoạch chăm sóc sức khoẻ nhưng không làm. Bắt đầu từ việc nhỏ nhất.",
  adv: "Hỏi mình điều tệ nhất có thể xảy ra là gì — thường nó không đáng sợ như bạn nghĩ. Rồi bước một bước nhỏ."
});

defCard(24, 2, -1, {
  kw: "mở rộng, chờ thuyền về",
  g: "Ba Gậy là lúc thành quả bắt đầu hiện ra từ những gì bạn đã gieo. Bạn đứng nhìn con thuyền của mình đang về bến, và cơ hội mở rộng đang ở phía trước. Điều bạn hỏi có triển vọng tốt; kết quả đang tới, bạn cần kiên nhẫn và sẵn sàng đón nó.",
  love: "Mối quan hệ tiến triển tốt, có tương lai. Có thể liên quan tới yêu xa, người ở nơi khác hoặc một chuyến đi cùng nhau. Nếu bạn đang chờ tin từ ai đó, lá này nghiêng về có: tin tốt đang trên đường tới.",
  work: "Dự án phát triển, mở rộng thị trường, có đối tác mới hoặc cơ hội ở nơi xa. Những gì bạn đã chuẩn bị đang bắt đầu sinh lời. Rất thuận cho kinh doanh, xuất nhập khẩu, du học và công tác.",
  money: "Tiền từ những khoản đã đầu tư bắt đầu về. Có thể có thu nhập từ xa hoặc từ việc mở rộng kinh doanh. Tình hình tài chính đang đi lên.",
  health: "Sức khoẻ tiến triển tốt, hồi phục đều. Hợp để đi du lịch, đổi không khí. Kế hoạch sức khoẻ dài hạn đang có kết quả.",
  adv: "Tiếp tục nhìn xa và chuẩn bị cho bước mở rộng tiếp theo. Thuyền đang về, hãy sẵn sàng đón."
}, {
  kw: "chậm trễ, kỳ vọng hụt",
  g: "Ba Gậy ngược là chậm trễ, kỳ vọng không đạt hoặc kế hoạch mở rộng gặp trở ngại. Thuyền về trễ, thậm chí về không như bạn mong. Điều bạn hỏi cần thêm thời gian và một kế hoạch dự phòng.",
  love: "Chờ đợi mà không thấy hồi âm, hoặc yêu xa gặp khó. Kỳ vọng của bạn có thể cao hơn những gì người kia muốn cho đi. Đừng đặt hết hy vọng vào một người chưa thể hiện rõ ràng.",
  work: "Dự án trễ tiến độ, đối tác không như kỳ vọng, kế hoạch mở rộng bị hoãn. Cần kiểm tra lại các khâu và chuẩn bị phương án B. Chưa phải lúc đầu tư thêm.",
  money: "Tiền về chậm, khoản đầu tư chưa sinh lời. Đừng tiêu trước khoản chưa nhận được. Giữ quỹ dự phòng.",
  health: "Hồi phục chậm hơn mong đợi. Kiên nhẫn với liệu trình. Tránh đi lại quá nhiều khi cơ thể còn mệt.",
  adv: "Chuẩn bị phương án dự phòng và điều chỉnh kỳ vọng. Chậm không có nghĩa là không đến."
});

defCard(25, 2, 0, {
  kw: "ăn mừng, mái ấm",
  g: "Bốn Gậy là niềm vui, sự ăn mừng và cảm giác được thuộc về. Đây là lá của những cột mốc hạnh phúc: về nhà mới, đám cưới, hoàn thành một chặng đường. Điều bạn hỏi đang có nền tảng vững và kết quả tốt đẹp.",
  love: "Rất thuận cho tình cảm: ra mắt gia đình, đính hôn, cưới hỏi, dọn về sống chung. Mối quan hệ ổn định, ấm áp và được mọi người ủng hộ. Nếu bạn hỏi có nên tiến xa hơn không, câu trả lời là có.",
  work: "Hoàn thành một giai đoạn, dự án được nghiệm thu, nhóm làm việc gắn kết. Có thể có tiệc mừng, khen thưởng. Môi trường làm việc vui vẻ, bạn được tôn trọng.",
  money: "Tài chính ổn định đủ để ăn mừng hoặc đầu tư cho nhà cửa. Hợp để mua sắm cho gia đình, sửa nhà, tổ chức sự kiện. Tiền bạc đủ đầy.",
  health: "Sức khoẻ tốt, tinh thần vui vẻ. Hồi phục và cảm thấy an toàn. Dành thời gian với gia đình giúp bạn khoẻ hơn.",
  adv: "Ăn mừng những gì bạn đã đạt được và chia sẻ niềm vui với người thân. Nền móng vững thì mới xây cao được."
}, {
  kw: "niềm vui chưa trọn",
  g: "Bốn Gậy ngược vẫn mang năng lượng tích cực nhưng chưa trọn vẹn. Có thể có trục trặc nhỏ trong gia đình, kế hoạch ăn mừng bị hoãn, hoặc bạn chưa thật sự thấy mình thuộc về một nơi. Điều bạn hỏi ở mức lưng chừng: không xấu, nhưng cần vun thêm.",
  love: "Mối quan hệ ổn nhưng có chút bất an: chưa được gia đình ủng hộ, kế hoạch cưới bị lùi lại hoặc chưa tìm được tiếng nói chung về tổ ấm. Cần kiên nhẫn và nói chuyện rõ ràng. Kết quả vẫn có thể tốt nếu cả hai cùng vun vén.",
  work: "Làm việc nhóm chưa hoà hợp, dự án xong nhưng chưa được ghi nhận xứng đáng. Có thể thiếu cảm giác gắn bó với nơi làm việc. Cần xây lại kết nối.",
  money: "Chi phí liên quan tới nhà cửa, gia đình phát sinh. Tài chính không tệ nhưng cần sắp xếp lại. Hoãn các khoản chi mừng lớn.",
  health: "Căng thẳng từ chuyện nhà ảnh hưởng tinh thần. Cần không gian nghỉ ngơi thật sự. Sức khoẻ ổn nếu giảm áp lực.",
  adv: "Vun lại cảm giác thuộc về: gọi cho gia đình, dọn lại góc nhà. Niềm vui nhỏ cũng đáng được ăn mừng."
});

defCard(26, -1, 1, {
  kw: "va chạm, cạnh tranh",
  g: "Năm Gậy là sự va chạm, tranh cãi và cạnh tranh. Nhiều người, nhiều ý kiến, ai cũng muốn phần mình đúng, khiến mọi thứ rối loạn. Điều bạn hỏi đang gặp trở ngại do xung đột; muốn đạt được, bạn phải cạnh tranh hoặc hoà giải.",
  love: "Cãi vã, bất đồng nhỏ nhưng liên tục, hoặc có người khác cũng đang để ý đối tượng của bạn. Mâu thuẫn thường xuất phát từ cái tôi hơn là vấn đề thật. Chưa nên ép quyết định lớn; hãy giảm căng thẳng trước.",
  work: "Cạnh tranh gay gắt, đồng nghiệp bất đồng, cuộc họp nhiều tranh cãi. Bạn cần bảo vệ ý tưởng của mình nhưng đừng biến nó thành cuộc chiến cá nhân. Kết quả còn khó đoán cho tới khi mọi người thống nhất được.",
  money: "Tranh chấp tiền bạc, cạnh tranh về giá, thị trường nhiều biến động. Tránh góp vốn hoặc hợp tác lúc này. Giữ tiền an toàn.",
  health: "Căng thẳng, dễ nóng nảy; có thể có chấn thương nhỏ khi vận động mạnh. Hợp với thể thao đối kháng để xả năng lượng. Để ý huyết áp và giấc ngủ.",
  adv: "Chọn trận đáng đánh. Nói rõ quan điểm một lần, rồi tìm điểm chung thay vì cố thắng mọi cuộc tranh luận."
}, {
  kw: "hoà giải, hết tranh cãi",
  g: "Năm Gậy ngược là xung đột lắng xuống. Mọi người bắt đầu tìm được tiếng nói chung, hoặc bạn chọn rút khỏi những cuộc tranh cãi vô ích. Điều bạn hỏi đang dần thuận lợi hơn khi căng thẳng giảm.",
  love: "Hai người làm hoà, hiểu nhau hơn sau mâu thuẫn. Tình địch rút lui hoặc không còn là mối lo. Câu trả lời nghiêng về tích cực nếu bạn giữ thái độ mềm mỏng.",
  work: "Nội bộ ổn định lại, tìm được thoả thuận, cạnh tranh bớt gay gắt. Bạn làm việc hiệu quả hơn khi không phải phòng thủ. Thời điểm tốt để hợp tác lại.",
  money: "Tranh chấp tiền bạc được giải quyết. Tình hình ổn định dần. Có thể đàm phán lại các điều khoản có lợi.",
  health: "Căng thẳng giảm, tinh thần dễ chịu hơn. Ngủ ngon hơn. Tiếp tục giữ thói quen thư giãn.",
  adv: "Giữ hoà khí vừa có được. Lắng nghe trước, nói sau."
});

defCard(27, 2, -1, {
  kw: "chiến thắng, được công nhận",
  g: "Sáu Gậy là chiến thắng và sự công nhận của mọi người. Bạn vượt qua thử thách và được tung hô vì nỗ lực của mình. Điều bạn hỏi có kết quả tốt, và thành công này sẽ được người khác nhìn thấy.",
  love: "Bạn được người ấy ngưỡng mộ và chọn lựa. Tỏ tình, cầu hôn hay ra mắt đều thuận lợi. Nếu hỏi có được đáp lại không, câu trả lời nghiêng mạnh về có.",
  work: "Thăng chức, thắng thầu, đỗ phỏng vấn, được khen thưởng. Công sức của bạn được ghi nhận công khai. Đây là lúc tự tin đề xuất điều mình muốn.",
  money: "Có thưởng, tăng lương hoặc lợi nhuận từ một thành công. Tài chính cải thiện rõ. Hãy giữ lại một phần thay vì tiêu hết để ăn mừng.",
  health: "Hồi phục tốt, vượt qua bệnh. Tinh thần tự tin, phấn chấn. Đạt được mục tiêu tập luyện.",
  adv: "Tự tin đón nhận thành công và cảm ơn người đã giúp mình. Khiêm tốn giữ cho chiến thắng bền lâu."
}, {
  kw: "chưa được ghi nhận, tự ti",
  g: "Sáu Gậy ngược là thành công chưa đến hoặc chưa được ghi nhận. Có thể người khác nhận công của bạn, hoặc bạn đang quá cần sự công nhận từ bên ngoài. Điều bạn hỏi chưa đạt được kết quả như mong đợi ở thời điểm này.",
  love: "Cảm giác không được trân trọng, hoặc lo mình không đủ tốt với người ấy. Có thể người kia chưa thể hiện sự tự hào về bạn. Chưa nên tỏ tình khi bạn còn thiếu tự tin.",
  work: "Bị bỏ qua khi xét thăng chức, dự án thất bại hoặc bị người khác nhận công. Hãy lưu giữ bằng chứng về đóng góp của mình. Kết quả phỏng vấn, thi cử có thể chưa như ý.",
  money: "Kỳ vọng thưởng hoặc tăng lương chưa thành. Đừng chi tiêu để thể hiện với người khác. Tập trung vào sự ổn định.",
  health: "Tinh thần sa sút vì cảm giác thất bại. Đừng so sánh mình với người khác. Nghỉ ngơi và làm lại từ việc nhỏ.",
  adv: "Giá trị của bạn không phụ thuộc vào tràng pháo tay. Ghi lại thành quả của mình và tiếp tục."
});

defCard(28, 1, -1, {
  kw: "giữ vững lập trường",
  g: "Bảy Gậy là giữ vững vị trí trước áp lực. Bạn đang ở thế cao hơn nhưng phải liên tục bảo vệ những gì mình có. Điều bạn hỏi có thể thành công nếu bạn kiên định và không lùi bước.",
  love: "Bạn phải bảo vệ mối quan hệ trước sự phản đối của gia đình, bạn bè hoặc tình địch. Tình cảm đáng để đấu tranh nếu cả hai cùng kiên định. Nghiêng về có, nhưng cần sự bản lĩnh của bạn.",
  work: "Cạnh tranh cao, bạn cần bảo vệ ý tưởng, vị trí hoặc thị phần. Bạn có lợi thế, nhưng không được lơ là. Chuẩn bị kỹ lý lẽ và số liệu để thuyết phục.",
  money: "Giữ vững tài chính trước áp lực chi tiêu, vay mượn từ người khác. Biết nói không với những khoản không cần thiết. Tình hình ổn nếu bạn kiên quyết.",
  health: "Sức đề kháng tốt nhưng đang chịu áp lực. Giữ kỷ luật sinh hoạt để không bị quật ngã. Đừng gồng mình quá lâu.",
  adv: "Đứng vững với điều bạn tin là đúng. Bảo vệ ranh giới của mình một cách bình tĩnh."
}, {
  kw: "đuối sức, bỏ cuộc",
  g: "Bảy Gậy ngược là đuối sức trước áp lực, muốn bỏ cuộc hoặc bị lấn át. Bạn có thể đang phòng thủ quá mức hoặc đã kiệt sức vì chiến đấu một mình. Điều bạn hỏi đang gặp trở ngại; cần chọn lọc lại điều đáng giữ.",
  love: "Mệt mỏi vì phải bảo vệ mối quan hệ một mình, hoặc để áp lực từ người ngoài chen vào. Có thể bạn đang phòng thủ quá mức với người ấy. Cần tự hỏi: người kia có đang cùng mình giữ không?",
  work: "Bị lấn át, mất vị trí hoặc quá tải vì phải xử lý nhiều sức ép. Hãy tìm đồng minh thay vì chiến đấu một mình. Có thể cần lùi một bước để giữ sức.",
  money: "Áp lực tài chính lớn, dễ nhượng bộ trước yêu cầu vay mượn. Cẩn thận bị ép giá hoặc ký điều khoản bất lợi. Đừng quyết định khi đang mệt.",
  health: "Kiệt sức, căng thẳng kéo dài. Cơ thể cần được nghỉ. Đừng cố gắng vượt giới hạn.",
  adv: "Không phải trận nào cũng cần đánh. Giữ lại điều quan trọng nhất, buông phần còn lại."
});

defCard(29, 2, -1, {
  kw: "tin nhanh, tiến triển nhanh",
  g: "Tám Gậy là tốc độ: mọi thứ chuyển động nhanh, tin tức đến dồn dập, trở ngại được dọn sạch. Những gì bị trì hoãn lâu nay bỗng được khơi thông, và bạn cần sẵn sàng hành động ngay khi cơ hội tới. Điều bạn hỏi đang tiến triển nhanh theo hướng tốt; kết quả có thể đến sớm hơn bạn nghĩ.",
  love: "Tin nhắn, cuộc gọi hoặc lời tỏ tình đến bất ngờ. Tình cảm tiến triển rất nhanh, có thể là yêu từ cái nhìn đầu tiên. Nếu bạn hỏi người ấy có liên lạc không, câu trả lời nghiêng mạnh về có và sớm.",
  work: "Tiến độ nhanh, có phản hồi, có email mời phỏng vấn, dự án được duyệt. Có thể có công tác, di chuyển. Hãy phản hồi nhanh để không bỏ lỡ.",
  money: "Tiền về nhanh, giao dịch thuận lợi. Cơ hội đến và đi nhanh, cần quyết đoán. Tránh vội vàng tới mức không kiểm tra kỹ.",
  health: "Hồi phục nhanh, năng lượng tốt. Hợp với vận động nhanh như chạy bộ, đạp xe. Để ý an toàn khi đi lại.",
  adv: "Bắt kịp nhịp: trả lời nhanh, quyết nhanh. Cơ hội đang bay tới, đừng để nó vụt qua."
}, {
  kw: "chậm trễ, vội vàng",
  g: "Tám Gậy ngược là chậm trễ, trục trặc thông tin hoặc vội vàng dẫn đến sai sót. Mọi thứ không đi theo tốc độ bạn muốn. Điều bạn hỏi cần thêm thời gian; hành động vội lúc này dễ hỏng việc.",
  love: "Tin nhắn không được hồi âm, hiểu lầm vì giao tiếp vội. Tình cảm tiến quá nhanh rồi hụt hẫng. Chưa nên ép người kia trả lời ngay.",
  work: "Kế hoạch trễ, email thất lạc, phản hồi chậm. Hoặc bạn làm quá vội nên phải sửa lại. Kiểm tra kỹ trước khi gửi đi.",
  money: "Tiền về chậm, giao dịch bị trì hoãn. Tránh quyết định tài chính vội vàng. Kiểm tra các khoản thanh toán.",
  health: "Căng thẳng vì nhịp sống quá gấp. Cẩn thận tai nạn khi di chuyển vội. Chậm lại để hồi phục.",
  adv: "Chậm lại một nhịp để làm đúng. Sự chậm trễ này có thể đang bảo vệ bạn."
});

defCard(30, 1, -1, {
  kw: "kiên cường, gần tới đích",
  g: "Chín Gậy là sự kiên cường sau nhiều thử thách. Bạn mệt, có vết thương, nhưng vẫn đứng vững và đã rất gần đích. Điều bạn hỏi có thể thành công nếu bạn cố thêm một chút nữa.",
  love: "Bạn đã trải qua tổn thương và giờ dè dặt khi mở lòng. Mối quan hệ vượt qua nhiều thử thách và vẫn còn đó. Nghiêng về có, nhưng cần buông bớt sự phòng thủ để tình cảm tiến thêm.",
  work: "Dự án ở chặng cuối, áp lực nhiều nhưng bạn đủ bản lĩnh. Đừng bỏ cuộc lúc này. Kinh nghiệm từ những lần vấp trước giúp bạn tránh sai lầm.",
  money: "Tài chính từng khó khăn nhưng đang dần vững. Kiên trì với kế hoạch tiết kiệm. Tránh rủi ro mới khi vừa ổn định.",
  health: "Cơ thể mệt nhưng sức bền tốt. Đang trong giai đoạn cuối của hồi phục. Nghỉ ngơi hợp lý để về đích.",
  adv: "Cố thêm một chút nữa, bạn đã đi gần hết đường. Nhưng nhớ nghỉ đủ để còn sức cho bước cuối."
}, {
  kw: "kiệt sức, đa nghi",
  g: "Chín Gậy ngược là kiệt sức, muốn buông xuôi hoặc đa nghi quá mức. Những tổn thương cũ khiến bạn phòng thủ trước mọi thứ. Điều bạn hỏi đang bị cản trở bởi sự mệt mỏi và nỗi sợ của chính bạn.",
  love: "Sợ bị tổn thương lần nữa nên đẩy người khác ra xa. Hoặc bạn đã quá mệt với mối quan hệ nhiều sóng gió. Cần tự hỏi: mình đang bảo vệ hay đang tự cô lập?",
  work: "Quá tải, kiệt sức, muốn bỏ việc. Có thể bạn đang nghi ngờ cả những người muốn giúp mình. Cần nghỉ và xin hỗ trợ.",
  money: "Lo lắng tiền bạc thường trực, phòng thủ đến mức bỏ lỡ cơ hội tốt. Hoặc kiệt quệ vì phải gánh quá nhiều khoản. Xem lại ưu tiên.",
  health: "Mệt mỏi kéo dài, căng thẳng mãn tính. Cơ thể đã chạm giới hạn. Cần nghỉ ngơi và có thể đi khám.",
  adv: "Bạn không cần chiến đấu một mình. Nghỉ ngơi và cho phép người khác giúp."
});

defCard(31, -1, 0, {
  kw: "quá tải, gánh nặng",
  g: "Mười Gậy là gánh nặng quá sức: quá nhiều trách nhiệm, quá nhiều việc dồn lên vai. Thành công có thể đã đến nhưng đi kèm áp lực lớn. Điều bạn hỏi gặp trở ngại chính vì bạn đang ôm quá nhiều.",
  love: "Một bên gánh hết trách nhiệm, mối quan hệ trở thành nghĩa vụ hơn là niềm vui. Áp lực công việc hoặc gia đình lấn át thời gian cho nhau. Chưa nên tiến thêm khi chưa san sẻ được gánh nặng.",
  work: "Quá tải, ôm việc của người khác, deadline chồng chất. Hiệu quả giảm vì bạn không thể làm tốt mọi thứ cùng lúc. Cần giao bớt việc hoặc nói không.",
  money: "Gánh nặng tài chính: nợ, chi phí gia đình, nhiều khoản phải lo. Cần cắt giảm và sắp xếp lại ưu tiên. Không nhận thêm khoản vay mới.",
  health: "Mệt mỏi, đau lưng vai gáy, căng thẳng mãn tính. Cơ thể đang báo động vì quá sức. Giảm tải ngay.",
  adv: "Đặt bớt gánh xuống. Liệt kê việc gì thật sự của mình, việc gì có thể giao hoặc bỏ."
}, {
  kw: "buông bớt gánh nặng",
  g: "Mười Gậy ngược là bắt đầu buông bớt gánh nặng, hoặc gục ngã vì không chịu buông. Bạn nhận ra mình không thể ôm mãi mọi thứ. Điều bạn hỏi sẽ thuận hơn khi bạn chịu chia sẻ và bỏ bớt những gì không cần thiết.",
  love: "Hai người bắt đầu san sẻ trách nhiệm, hoặc bạn nhận ra mình đang gánh cả mối quan hệ. Nói chuyện thẳng thắn về việc chia đều công sức. Kết quả lưng chừng, tuỳ vào việc cả hai có thay đổi không.",
  work: "Giao bớt việc, từ chối trách nhiệm không phải của mình. Hoặc bạn đã đến giới hạn và cần nghỉ. Tái cơ cấu công việc sẽ giúp bạn hiệu quả hơn.",
  money: "Bắt đầu thoát khỏi gánh nợ, cắt bớt chi phí. Tài chính nhẹ nhõm dần. Tiếp tục giảm các khoản không cần thiết.",
  health: "Cơ thể được nghỉ, căng thẳng giảm. Nếu vẫn cố gồng thì sẽ đổ bệnh. Chọn nghỉ ngơi.",
  adv: "Buông không phải là thua. Hãy để người khác gánh cùng bạn."
});

defCard(32, 1, -1, {
  kw: "tin mới, khám phá",
  g: "Tiểu Đồng Gậy là tin tức mới, cảm hứng mới và tinh thần khám phá. Có thể là một lời mời, một cơ hội học hỏi hoặc một người trẻ đầy nhiệt huyết. Điều bạn hỏi đang có tín hiệu tích cực ở giai đoạn đầu.",
  love: "Một người vui vẻ, nhiệt tình để ý bạn, hoặc có tin nhắn thú vị. Tình cảm mới nhen nhóm, nhiều hứng khởi. Nghiêng về có, nhưng mối quan hệ còn non nên hãy để nó phát triển tự nhiên.",
  work: "Cơ hội học hỏi, thực tập, dự án mới hoặc tin tốt về công việc. Thích hợp để thử một hướng đi sáng tạo. Hãy chủ động hỏi và xung phong.",
  money: "Có ý tưởng kiếm tiền mới, có thể từ sở thích. Thu nhập nhỏ nhưng triển vọng. Thử nghiệm với số vốn nhỏ.",
  health: "Tinh thần phấn chấn, muốn thử môn thể thao mới. Năng lượng trẻ trung. Vận động ngoài trời rất tốt.",
  adv: "Tò mò và dám thử. Đón nhận tin mới với tinh thần mở."
}, {
  kw: "hứng nhất thời, tin xấu",
  g: "Tiểu Đồng Gậy ngược là hứng khởi nhất thời, thiếu định hướng hoặc tin tức không như mong đợi. Bạn có nhiều ý tưởng nhưng không theo đuổi đến cùng. Điều bạn hỏi chưa có tín hiệu rõ ràng.",
  love: "Người ấy nhiệt tình lúc đầu rồi nguội nhanh, hoặc thiếu nghiêm túc. Tin nhắn thất thường. Chưa nên đặt nhiều kỳ vọng.",
  work: "Ý tưởng hay nhưng không làm đến nơi, dễ bỏ ngang. Có thể nhận tin trì hoãn hoặc từ chối. Cần tập trung vào một việc.",
  money: "Chi tiêu bốc đồng cho những thú vui nhất thời. Ý tưởng kiếm tiền thiếu cơ sở. Cân nhắc kỹ trước khi bỏ tiền.",
  health: "Thiếu kiên trì, tập được vài buổi rồi bỏ. Năng lượng thất thường. Bắt đầu lại với mục tiêu nhỏ.",
  adv: "Chọn một ý tưởng và làm đến cùng trước khi chạy theo cái tiếp theo."
});

defCard(33, 1, -1, {
  kw: "hành động táo bạo, di chuyển",
  g: "Hiệp Sĩ Gậy là hành động táo bạo, nhiệt huyết và di chuyển. Mọi thứ tiến nhanh, có thể có chuyến đi hoặc thay đổi đột ngột. Điều bạn hỏi có đà tốt nếu bạn dám hành động, nhưng cần tránh bốc đồng.",
  love: "Một người cuốn hút, sôi nổi, theo đuổi nồng nhiệt. Tình cảm đến nhanh và mãnh liệt. Nghiêng về có trong ngắn hạn, nhưng hãy xem người ấy có kiên trì không.",
  work: "Hành động quyết đoán, chuyển việc, đi công tác, khởi động dự án mới. Tinh thần dám nghĩ dám làm mang lại kết quả. Chỉ cần đừng bỏ qua khâu chuẩn bị.",
  money: "Tiền đến nhanh nhờ hành động, nhưng cũng dễ tiêu nhanh. Cẩn thận đầu tư theo cảm hứng. Giữ lại một phần.",
  health: "Năng lượng cao, thích vận động mạnh. Cẩn thận chấn thương do vội. Hợp với thể thao cường độ cao nếu khởi động kỹ.",
  adv: "Tiến lên với lửa nhiệt huyết, nhưng nhớ nhìn đường trước khi phi ngựa."
}, {
  kw: "bốc đồng, dở dang",
  g: "Hiệp Sĩ Gậy ngược là bốc đồng, nóng nảy hoặc bỏ dở giữa chừng. Bạn lao vào mọi thứ quá nhanh rồi mất hứng, hoặc bị trì hoãn khiến sốt ruột. Điều bạn hỏi dễ hỏng vì hành động thiếu suy nghĩ.",
  love: "Người ấy đến nhanh đi cũng nhanh, thiếu cam kết. Cãi nhau vì nóng tính. Chưa nên tin vào những lời hứa quá bốc đồng.",
  work: "Làm vội, bỏ dở, xung đột vì thiếu kiên nhẫn. Kế hoạch đi xa bị hoãn. Cần kiềm chế và làm có trình tự.",
  money: "Chi tiêu bốc đồng, đầu tư liều lĩnh. Nguy cơ mất tiền vì quyết định nóng. Dừng lại trước mỗi khoản chi lớn.",
  health: "Nóng nảy, căng thẳng, dễ chấn thương. Cẩn thận khi lái xe. Cần giải toả năng lượng đúng cách.",
  adv: "Hít một hơi sâu trước khi hành động. Nhiệt huyết cần có hướng đi."
});

defCard(34, 2, -1, {
  kw: "tự tin, cuốn hút",
  g: "Nữ Hoàng Gậy là sự tự tin, ấm áp và sức cuốn hút tự nhiên. Bạn đang toả sáng, được yêu mến và có khả năng truyền cảm hứng cho người khác. Điều bạn hỏi rất thuận nếu bạn giữ sự tự tin này.",
  love: "Bạn rất có sức hút lúc này, người ấy bị bạn thu hút. Tình cảm nồng nàn, vui vẻ và chân thành. Nghiêng mạnh về có; hãy chủ động và là chính mình.",
  work: "Lãnh đạo bằng sự nhiệt tình, được đồng nghiệp tin tưởng. Rất tốt cho công việc cần giao tiếp, bán hàng, sáng tạo. Hãy tự tin thể hiện năng lực.",
  money: "Tài chính khá nhờ sự năng động và mối quan hệ rộng. Kinh doanh, bán hàng thuận lợi. Biết cách vừa kiếm vừa tận hưởng.",
  health: "Sức sống tràn đầy, tinh thần lạc quan. Cơ thể khoẻ mạnh. Duy trì vận động đều đặn.",
  adv: "Tự tin toả sáng và dám thể hiện mình. Sự ấm áp của bạn là sức mạnh."
}, {
  kw: "ghen tị, thiếu tự tin",
  g: "Nữ Hoàng Gậy ngược là thiếu tự tin, ghen tị hoặc nóng nảy. Bạn có thể đang cảm thấy bị lu mờ hoặc tự đòi hỏi quá cao ở bản thân. Điều bạn hỏi gặp trở ngại khi bạn không tin vào chính mình.",
  love: "Ghen tuông, kiểm soát hoặc cảm thấy mình không đủ hấp dẫn. Cảm xúc thất thường gây căng thẳng. Cần xây lại sự tự tin trước khi đòi hỏi người kia.",
  work: "Quá tải vì ôm quá nhiều việc, dễ cáu gắt. Có thể có người đố kỵ với bạn. Tập trung vào việc của mình.",
  money: "Chi tiêu để khẳng định bản thân. Tài chính mất cân bằng. Cần kiểm soát lại.",
  health: "Mệt mỏi, cáu gắt, căng thẳng. Năng lượng bị rút cạn. Cần thời gian cho riêng mình.",
  adv: "Đừng so sánh mình với ai. Nạp lại năng lượng rồi toả sáng theo cách của bạn."
});

defCard(35, 2, -1, {
  kw: "tầm nhìn, dẫn dắt",
  g: "Vua Gậy là người lãnh đạo có tầm nhìn, dám nghĩ lớn và biến ý tưởng thành hiện thực. Bạn có đủ năng lực và uy tín để dẫn dắt. Điều bạn hỏi rất thuận nếu bạn chủ động nắm quyền quyết định.",
  love: "Người ấy (hoặc bạn) mạnh mẽ, chủ động, rõ ràng về điều mình muốn. Mối quan hệ có người dẫn dắt và định hướng tương lai. Nghiêng về có; tình cảm nghiêm túc, được bảo vệ.",
  work: "Rất thuận cho khởi nghiệp, lãnh đạo, thăng chức, đàm phán lớn. Tầm nhìn của bạn được công nhận. Hãy đứng ra dẫn dắt.",
  money: "Tài chính tốt nhờ quyết định táo bạo mà có tính toán. Có khả năng đầu tư lớn. Tiền đến từ kinh doanh.",
  health: "Sức khoẻ tốt, ý chí mạnh. Để ý căng thẳng do làm việc quá nhiều. Cân bằng nghỉ ngơi.",
  adv: "Nghĩ lớn, quyết đoán và dẫn dắt bằng tấm gương của chính mình."
}, {
  kw: "độc đoán, nóng vội",
  g: "Vua Gậy ngược là độc đoán, nóng vội hoặc tham vọng vượt quá khả năng. Bạn có thể đang áp đặt người khác hoặc đặt kỳ vọng phi thực tế. Điều bạn hỏi gặp trở ngại vì cách làm quá cứng rắn.",
  love: "Kiểm soát, gia trưởng hoặc cái tôi quá lớn. Người ấy có thể thiếu kiên nhẫn và ít lắng nghe. Chưa thuận cho tiến tới cho tới khi hai bên tôn trọng nhau hơn.",
  work: "Lãnh đạo độc đoán, kế hoạch quá tham vọng, xung đột với cấp dưới. Cần lắng nghe người khác. Tránh quyết định vội.",
  money: "Đầu tư liều lĩnh, tham vọng quá mức. Nguy cơ thua lỗ. Cần kế hoạch thực tế.",
  health: "Căng thẳng, nóng tính, huyết áp. Làm việc quá sức. Cần nghỉ ngơi.",
  adv: "Lãnh đạo thật sự là lắng nghe. Bớt áp đặt, thêm kiên nhẫn."
});
// ================= BỘ CỐC (Nước · cảm xúc, tình cảm) — id 36–49 =================
defCard(36, 2, -1, {
  kw: "tình cảm mới, trái tim rộng mở",
  g: "Át Cốc là chiếc cốc tràn đầy: khởi đầu của một dòng cảm xúc mới, của yêu thương, lòng trắc ẩn và sự rộng mở. Trái tim bạn đang sẵn sàng cho đi và đón nhận, và cuộc sống đang đáp lại điều đó. Điều bạn hỏi có một khởi đầu rất đẹp, đặc biệt nếu nó liên quan tới cảm xúc, các mối quan hệ hay một điều bạn thật lòng yêu thích.",
  love: "Đây là một trong những lá tình cảm đẹp nhất: tình yêu mới chớm, một lời tỏ tình, một sự kết nối chân thành từ cả hai phía. Người độc thân dễ gặp ai đó khiến mình rung động thật sự; người đang yêu thấy tình cảm được làm mới, ấm áp như thuở đầu. Nếu bạn hỏi người ấy có tình cảm không hay có nên mở lòng không, câu trả lời nghiêng mạnh về có.",
  work: "Công việc mang lại niềm vui và cảm hứng, đặc biệt trong các lĩnh vực sáng tạo, chăm sóc, giáo dục hay nghệ thuật. Bạn được đồng nghiệp quý mến và môi trường xung quanh khá thân thiện. Đây là thời điểm tốt để bắt đầu một dự án bạn thực sự yêu thích — câu trả lời cho việc có nên nhận hay bắt đầu là có.",
  money: "Tài chính ổn, có thể nhận được quà, tiền mừng hoặc sự giúp đỡ từ người thân và bạn bè. Tiền bạc đến cùng với niềm vui, và chi tiêu cho những điều làm bạn hạnh phúc lúc này là xứng đáng. Nghiêng về thuận, miễn bạn chi trong khả năng và không để cảm xúc dẫn tới tiêu quá tay.",
  health: "Tinh thần tươi mới, cảm xúc tích cực đang giúp cơ thể khoẻ lên rõ rệt. Đây là lá tốt cho việc hồi phục sau một thời gian mệt mỏi hay buồn bã. Hãy uống đủ nước, ngủ đủ giấc và chăm sóc cảm xúc của mình — sức khoẻ đang đi theo chiều hướng tốt.",
  adv: "Mở lòng đón nhận yêu thương và để cảm xúc chân thật dẫn đường. Hãy nói ra điều bạn cảm thấy thay vì giữ trong lòng."
}, {
  kw: "cảm xúc bị chặn, khép lòng",
  g: "Át Cốc ngược là chiếc cốc bị úp xuống: cảm xúc bị dồn nén, trái tim khép lại hoặc tình cảm trao đi mà không được đáp lại. Có thể bạn đang sợ tổn thương nên không dám mở lòng, hoặc đang cạn kiệt vì đã cho đi quá nhiều. Điều bạn hỏi chưa thể trọn vẹn khi cảm xúc còn bị chặn; trước hết cần chữa lành bên trong.",
  love: "Tình cảm một chiều, người ấy chưa sẵn sàng, hoặc chính bạn đang khép lòng vì tổn thương cũ. Mối quan hệ có thể lạnh nhạt, thiếu sự kết nối thật sự dù bề ngoài vẫn bình thường. Chưa nên tỏ tình hay đặt kỳ vọng lớn lúc này; câu trả lời nghiêng về chưa.",
  work: "Bạn mất cảm hứng, làm việc như một cái máy, không còn thấy niềm vui trong những gì mình làm. Môi trường thiếu sự ấm áp hoặc bạn thấy mình không được trân trọng. Chưa nên bắt đầu điều mới khi lòng còn trống rỗng; hãy tìm lại lý do mình từng yêu công việc này.",
  money: "Có xu hướng chi tiêu để lấp khoảng trống cảm xúc — mua sắm cho vui, tiêu tiền khi buồn. Tài chính đang bị ảnh hưởng bởi tâm trạng nhiều hơn bạn nghĩ. Chưa phải lúc cho quyết định tiền bạc lớn; hãy kiểm soát việc mua sắm theo cảm xúc.",
  health: "Buồn bã, trầm uất nhẹ, cảm xúc bị dồn nén có thể biểu hiện thành mệt mỏi, mất ngủ hay đau nhức không rõ lý do. Bạn cần được chia sẻ với người tin cậy. Hãy ưu tiên sức khoẻ tinh thần, và tìm tới chuyên gia nếu nỗi buồn kéo dài.",
  adv: "Cho phép mình cảm nhận, kể cả nỗi buồn. Viết ra hoặc nói ra những gì đang dồn nén, rồi trái tim sẽ tự mở lại."
});

defCard(37, 2, -1, {
  kw: "kết nối, đồng điệu",
  g: "Hai Cốc là sự kết nối giữa hai con người: tình yêu, tình bạn hay một mối hợp tác dựa trên sự tôn trọng và đồng điệu. Hai bên cho và nhận cân bằng, nhìn nhau bằng ánh mắt thấu hiểu. Điều bạn hỏi rất thuận, đặc biệt khi nó liên quan tới một người cụ thể hay một sự hợp tác.",
  love: "Đây là lá của tình yêu đôi lứa: hai người hợp nhau và cùng có tình cảm với nhau. Rất thuận cho tỏ tình, hẹn hò, làm hoà hay tiến thêm một bước trong mối quan hệ. Nếu bạn hỏi người ấy có thích mình không, câu trả lời là có — tình cảm đang được đáp lại.",
  work: "Hợp tác thuận lợi, bạn tìm được đối tác hay đồng nghiệp ăn ý, hoặc ký kết được một thoả thuận tốt. Làm việc theo cặp mang lại hiệu quả cao hơn làm một mình. Nếu bạn hỏi có nên hợp tác không, câu trả lời nghiêng về có, vì hai bên cùng có lợi.",
  money: "Tài chính thuận lợi nhờ hợp tác hoặc nhờ sự hỗ trợ từ người thân thiết. Các hợp đồng, thoả thuận lúc này thường đôi bên cùng có lợi. Tiền bạc chung của hai người được quản lý tốt; nghiêng về thuận nếu mọi thứ được thống nhất rõ ràng.",
  health: "Tinh thần tốt nhờ có người đồng hành, cảm xúc cân bằng hơn. Tập luyện cùng bạn bè hoặc người yêu giúp bạn kiên trì hơn nhiều. Sức khoẻ ổn định, đặc biệt khi bạn không phải gánh mọi thứ một mình.",
  adv: "Trân trọng sự kết nối đang có. Chân thành và cho đi ngang bằng với những gì bạn nhận."
}, {
  kw: "lệch nhịp, rạn nứt",
  g: "Hai Cốc ngược là sự mất cân bằng trong một mối quan hệ: hiểu lầm, rạn nứt, hoặc một bên cho đi nhiều hơn bên kia. Sự kết nối từng có đang bị lung lay vì thiếu giao tiếp hay thiếu tôn trọng. Điều bạn hỏi gặp trở ngại nếu hai bên không ngồi lại nói chuyện thẳng thắn.",
  love: "Hiểu lầm, cãi vã, tình cảm lệch nhịp, thậm chí chia tay. Một người không còn cùng mong muốn như trước, hoặc cảm thấy không được đối xử công bằng. Chưa thuận để tiến tới; câu trả lời lúc này nghiêng về chưa, cần hàn gắn trước đã.",
  work: "Hợp tác trục trặc, đối tác không giữ lời hoặc có mâu thuẫn với đồng nghiệp thân thiết. Thoả thuận có thể bị đổ vỡ vì những điều không được nói rõ từ đầu. Chưa nên ký kết; hãy xem lại các điều khoản và làm rõ trách nhiệm từng bên.",
  money: "Có thể phát sinh tranh chấp tiền bạc với người thân hoặc đối tác, chia tiền không công bằng. Tài chính chung trở thành nguồn căng thẳng. Chưa thuận cho góp vốn; hãy tách bạch tài chính rõ ràng và ghi chép mọi khoản.",
  health: "Căng thẳng vì chuyện tình cảm ảnh hưởng tới giấc ngủ và tâm trạng. Cảm xúc bất ổn dễ khiến bạn ăn uống thất thường. Hãy chăm sóc bản thân và đừng để một mối quan hệ lấy hết năng lượng của mình.",
  adv: "Nói chuyện thẳng thắn về điều mỗi người cần. Một mối quan hệ phải có hai người cùng vun, không phải chỉ mình bạn."
});

defCard(38, 2, -1, {
  kw: "niềm vui, bạn bè, ăn mừng",
  g: "Ba Cốc là niềm vui chung, tình bạn và những dịp ăn mừng. Bạn đang được bao quanh bởi những người yêu quý mình, và có điều gì đó đáng để nâng ly. Điều bạn hỏi có kết quả vui vẻ, rất có thể sẽ là một tin mừng để bạn chia sẻ cùng người thân.",
  love: "Tình cảm vui vẻ, nhẹ nhàng và được bạn bè, gia đình ủng hộ. Bạn có thể gặp người ấy qua một buổi tiệc, một cuộc hẹn nhóm hay qua bạn chung. Câu trả lời nghiêng về có — mối quan hệ đang mang lại niềm vui, hãy tận hưởng nó.",
  work: "Làm việc nhóm vui vẻ, dự án thành công, có thể có tiệc mừng hay thưởng. Mạng lưới quan hệ giúp bạn rất nhiều lúc này, cơ hội tới từ những buổi gặp gỡ. Nghiêng về thuận: hãy kết nối nhiều hơn và đừng ngại nhờ đồng đội hỗ trợ.",
  money: "Có tin vui tài chính, nhưng cũng có nhiều khoản chi cho các dịp gặp gỡ, tiệc tùng, quà cáp. Có thể có lộc hoặc cơ hội kiếm tiền đến từ bạn bè. Nhìn chung thuận, chỉ cần đừng để vui quá mà tiêu quá tay.",
  health: "Tinh thần phấn chấn, cảm giác được yêu thương giúp cơ thể khoẻ khoắn. Chú ý đừng ăn uống, rượu bia quá đà trong những buổi tiệc liên miên. Cười nhiều và gặp gỡ bạn bè lúc này chính là liều thuốc tốt.",
  adv: "Kết nối với những người bạn thương và ăn mừng những điều tốt đẹp, dù nhỏ. Niềm vui được chia sẻ là niềm vui nhân đôi."
}, {
  kw: "tiệc tàn, người thứ ba",
  g: "Ba Cốc ngược là niềm vui quá đà, sự xa cách bạn bè, hoặc có người thứ ba chen vào. Có thể bạn đang ăn chơi quá mức để trốn tránh điều gì đó, hoặc cảm thấy bị gạt ra khỏi nhóm. Điều bạn hỏi gặp trở ngại từ các mối quan hệ xung quanh, từ tin đồn hay sự can thiệp của người khác.",
  love: "Có thể có người thứ ba, tin đồn, hoặc bạn bè can thiệp quá sâu vào chuyện tình cảm. Mối quan hệ thiếu sự riêng tư và dễ bị ảnh hưởng bởi ý kiến bên ngoài. Câu trả lời nghiêng về chưa thuận; hãy cảnh giác và nói chuyện rõ ràng với người ấy.",
  work: "Nội bộ chia bè phái, tin đồn nơi công sở, hoặc bạn bị loại khỏi nhóm. Vui chơi quá nhiều đang làm ảnh hưởng tới hiệu suất. Chưa thuận lúc này; hãy tập trung lại và tránh xa những cuộc buôn chuyện.",
  money: "Chi tiêu quá tay cho tiệc tùng, giải trí, quà cáp để giữ hình ảnh. Tài chính hụt dần vì những khoản vui chơi không cần thiết. Chưa nên chi thêm; cắt giảm ngay các khoản giải trí.",
  health: "Ăn uống, rượu bia quá đà, thức khuya liên tục khiến cơ thể mệt mỏi. Gan, dạ dày và giấc ngủ cần được chú ý. Hãy điều độ lại trước khi cơ thể lên tiếng.",
  adv: "Chọn lọc bạn bè và điều độ trong vui chơi. Giữ chuyện riêng cho riêng mình."
});

defCard(39, -1, 1, {
  kw: "chán nản, bỏ lỡ",
  g: "Bốn Cốc là sự chán nản, thờ ơ và không hài lòng với những gì đang có. Bạn quá chú tâm vào điều mình thiếu mà không thấy có một cơ hội đang được đưa tới ngay trước mặt. Điều bạn hỏi đang bị cản trở bởi chính sự khép kín và thiếu động lực của bạn, chứ không hẳn do hoàn cảnh.",
  love: "Mối quan hệ trở nên nhạt nhẽo, bạn thấy chán mà không rõ vì sao. Hoặc có một người đang âm thầm quan tâm bạn mà bạn không để ý. Câu trả lời lúc này nghiêng về chưa — cho tới khi bạn chịu mở lòng nhìn lại những gì đang có.",
  work: "Bạn mất hứng, thấy công việc nhàm chán và có thể đang từ chối những lời mời hay cơ hội tốt. Tâm trạng khiến bạn đánh giá thấp mọi thứ. Chưa nên quyết định bỏ việc hay đổi hướng lúc này; hãy nhìn quanh kỹ hơn vì cơ hội đang ở gần.",
  money: "Không hài lòng với thu nhập nhưng chưa hành động gì để thay đổi. Bạn có thể đang bỏ lỡ cơ hội kiếm thêm vì thờ ơ. Chưa thuận; hãy liệt kê lại các lựa chọn đang có trước khi than phiền.",
  health: "Uể oải, thiếu động lực, dễ rơi vào trạng thái trầm uất nhẹ. Cơ thể ì ạch vì tinh thần không muốn vận động. Hãy thay đổi không khí, ra ngoài, gặp gỡ người khác và vận động nhẹ mỗi ngày.",
  adv: "Ngẩng lên và nhìn quanh — có một cơ hội đang được đưa tới ngay trước mặt bạn. Đừng từ chối chỉ vì đang chán."
}, {
  kw: "tỉnh lại, đón cơ hội",
  g: "Bốn Cốc ngược là tỉnh lại sau thời gian dài chán nản. Bạn bắt đầu nhận ra những cơ hội từng bỏ qua và sẵn sàng đón nhận điều mới. Điều bạn hỏi đang chuyển biến tích cực, vì bạn đã chịu mở lòng và hành động.",
  love: "Bạn mở lòng trở lại, nhận ra người đang quan tâm mình hoặc tìm lại sự hứng thú trong mối quan hệ. Tình cảm có sức sống mới. Câu trả lời nghiêng về có, nếu bạn chủ động đáp lại.",
  work: "Bạn lấy lại động lực và sẵn sàng chấp nhận một cơ hội mới hay tham gia dự án thú vị. Năng lượng làm việc quay trở lại. Đây là lúc thuận để nói có với những lời mời phù hợp.",
  money: "Bạn nắm bắt được cơ hội tài chính trước đây bỏ qua, tình hình bắt đầu khởi sắc. Chủ động tìm nguồn thu mới sẽ có kết quả. Nghiêng về thuận.",
  health: "Tinh thần cải thiện, năng lượng quay lại, bạn thấy muốn vận động và chăm sóc bản thân. Tốt để bắt đầu thói quen lành mạnh. Sức khoẻ đang đi lên.",
  adv: "Nắm lấy cơ hội vừa nhận ra, đừng để sự thờ ơ quay lại. Nói có với điều mới ngay tuần này."
});

defCard(40, -1, 1, {
  kw: "mất mát, tiếc nuối",
  g: "Năm Cốc là nỗi buồn, sự mất mát và tiếc nuối. Bạn đang nhìn vào những chiếc cốc đã đổ mà quên rằng vẫn còn hai chiếc đứng vững phía sau lưng. Điều bạn hỏi đang gặp trở ngại vì bạn còn mắc kẹt trong nỗi buồn cũ, nhưng không phải mọi thứ đã mất.",
  love: "Chia tay, thất vọng, hoặc tiếc nuối một người cũ; nỗi buồn còn nặng nề. Có thể bạn đang tự trách mình hoặc người kia quá nhiều. Câu trả lời lúc này nghiêng về chưa cho một khởi đầu mới hay việc quay lại — cần chữa lành trước, dù vẫn còn điều đáng trân trọng.",
  work: "Thất bại, mất cơ hội, dự án không như mong đợi. Buồn là tự nhiên, nhưng những gì còn lại vẫn đủ để bạn làm lại. Chưa thuận để đẩy mạnh ngay; hãy rút kinh nghiệm rồi mới bắt đầu tiếp.",
  money: "Mất tiền, đầu tư lỗ, hoặc tiếc nuối một quyết định tài chính sai lầm. Đừng cố gỡ lại bằng những quyết định vội vàng. Chưa nên xuống tiền thêm; hãy tập trung giữ những gì còn lại.",
  health: "Nỗi buồn ảnh hưởng tới sức khoẻ: mất ngủ, chán ăn, mệt mỏi kéo dài. Bạn cần chia sẻ với người thân hoặc chuyên gia. Cho phép mình buồn, nhưng đừng chìm trong đó quá lâu.",
  adv: "Khóc cho những gì đã mất, rồi quay lại nhìn những gì vẫn còn. Bạn còn nhiều hơn bạn nghĩ."
}, {
  kw: "chấp nhận, vượt qua",
  g: "Năm Cốc ngược là chấp nhận mất mát và bắt đầu bước tiếp. Nỗi buồn dịu đi, bạn quay lại nhìn thấy những gì vẫn còn nguyên vẹn. Điều bạn hỏi dần thuận lợi hơn khi bạn buông được quá khứ.",
  love: "Bạn vượt qua chia tay, tha thứ và mở lòng trở lại. Có thể là làm hoà, hoặc là chuẩn bị cho một mối quan hệ mới lành mạnh hơn. Câu trả lời nghiêng về tích cực.",
  work: "Rút được kinh nghiệm từ thất bại và bắt đầu lại với tinh thần mới. Cơ hội tiếp theo đang đến gần. Nghiêng về thuận nếu bạn dám thử lại.",
  money: "Gỡ lại dần sau tổn thất, bài học tài chính trở nên rõ ràng. Tình hình đang cải thiện từng bước. Thuận để lập lại kế hoạch chi tiêu, tiết kiệm.",
  health: "Tinh thần hồi phục, nỗi buồn giảm bớt, bạn cảm thấy nhẹ nhõm hơn. Bắt đầu chăm sóc bản thân trở lại. Sức khoẻ đang đi lên.",
  adv: "Cảm ơn bài học và bước tiếp. Những chiếc cốc còn đứng vẫn đang chờ bạn."
});

defCard(41, 1, -1, {
  kw: "hoài niệm, ký ức đẹp",
  g: "Sáu Cốc là hoài niệm, ký ức tuổi thơ và sự ngây thơ trong sáng. Một người cũ, một người bạn cũ hay một kỷ niệm đẹp có thể quay trở lại. Điều bạn hỏi mang năng lượng dịu dàng và tích cực, đặc biệt nếu nó liên quan tới quá khứ, gia đình hay những mối quan hệ lâu năm.",
  love: "Người cũ quay lại, hoặc gặp lại bạn cũ rồi nảy sinh tình cảm. Mối quan hệ ngọt ngào, trong sáng, dựa trên sự quen thuộc và tin cậy. Nếu bạn hỏi người cũ có quay lại không, lá này nghiêng về có.",
  work: "Có thể quay lại công việc cũ, gặp lại đồng nghiệp cũ, hoặc làm việc liên quan tới trẻ em, giáo dục, gia đình. Kinh nghiệm và mối quan hệ cũ trở nên hữu ích. Nghiêng về thuận nếu bạn tận dụng những gì mình đã có.",
  money: "Có thể nhận quà, tiền từ gia đình hoặc thu lại một khoản cũ. Tài chính ổn định, không có biến động lớn. Thuận cho việc chi cho gia đình và những người thân yêu.",
  health: "Tinh thần dễ chịu và bình yên. Về quê, gặp gia đình hay làm lại những điều từng khiến bạn vui sẽ giúp bạn khoẻ hơn. Đây cũng là lúc tốt để chữa lành những tổn thương cũ.",
  adv: "Trân trọng những gì đẹp đẽ trong quá khứ, nhưng hãy sống cho hiện tại."
}, {
  kw: "mắc kẹt trong quá khứ",
  g: "Sáu Cốc ngược là mắc kẹt trong quá khứ, lý tưởng hoá những gì đã qua. Bạn không thể tiến lên vì cứ ngoái lại phía sau, so sánh hiện tại với ngày xưa. Điều bạn hỏi gặp trở ngại khi bạn chưa buông được chuyện cũ.",
  love: "Níu kéo người cũ, hoặc so sánh người mới với người cũ. Có thể bạn muốn quay lại chỉ vì quen chứ không phải vì thật sự hợp. Câu trả lời nghiêng về chưa; hãy sống cho hiện tại trước.",
  work: "Bám vào cách làm cũ, không chịu đổi mới, hoặc tiếc nuối công việc cũ. Thế giới đã thay đổi còn bạn thì chưa. Chưa thuận; bạn cần thích nghi và học thêm điều mới.",
  money: "Chi tiêu theo cảm xúc hoài niệm, hoặc giữ những thói quen tài chính không còn phù hợp. Có thể bị lợi dụng bởi người quen cũ. Chưa thuận; cần điều chỉnh lại cách quản lý tiền.",
  health: "Tổn thương từ quá khứ vẫn ảnh hưởng tới hiện tại, gây lo âu hay buồn bã. Bạn cần chữa lành thật sự, không chỉ quên đi. Tìm hỗ trợ tâm lý nếu cần.",
  adv: "Quá khứ là nơi để học, không phải nơi để sống. Hãy bước tiếp."
});

defCard(42, -1, 1, {
  kw: "ảo tưởng, nhiều lựa chọn",
  g: "Bảy Cốc là ảo tưởng, mơ mộng và quá nhiều lựa chọn khiến bạn rối. Không phải mọi thứ lấp lánh đều là vàng — một số lựa chọn chỉ là ảo ảnh. Điều bạn hỏi đang bị che mờ bởi những kỳ vọng phi thực tế; bạn cần tỉnh táo trước khi chọn.",
  love: "Bạn mơ mộng về người ấy nhiều hơn thực tế, hoặc có nhiều đối tượng khiến bạn phân vân. Người kia có thể không giống như bạn tưởng tượng. Câu trả lời lúc này nghiêng về chưa — đừng quyết định khi mọi thứ còn mơ hồ.",
  work: "Nhiều ý tưởng, nhiều lựa chọn nhưng không tập trung được vào cái nào. Kế hoạch đẹp trên giấy nhưng thiếu thực tế. Chưa nên quyết định lớn; hãy chọn một hướng và kiểm chứng nó trước.",
  money: "Cám dỗ làm giàu nhanh, những khoản đầu tư mơ hồ hứa hẹn lợi nhuận cao. Rủi ro bị lừa đảo khá lớn. Câu trả lời là chưa nên xuống tiền; đừng tin những lời hứa quá hấp dẫn.",
  health: "Mơ màng, thiếu tập trung, dễ lạm dụng chất kích thích hay điện thoại để trốn tránh thực tại. Giấc ngủ có thể bị xáo trộn. Hãy tỉnh táo lại, ngủ đủ và hạn chế những thói quen gây nghiện.",
  adv: "Tách giấc mơ khỏi thực tế. Chọn một điều và kiểm tra xem nó có thật không trước khi dồn sức."
}, {
  kw: "tỉnh táo, rõ lựa chọn",
  g: "Bảy Cốc ngược là tỉnh táo trở lại và nhìn rõ đâu là lựa chọn thật sự. Ảo tưởng tan đi, bạn biết mình muốn gì và cái gì chỉ là ảo ảnh. Điều bạn hỏi thuận lợi hơn khi bạn quyết định dựa trên thực tế.",
  love: "Bạn nhìn rõ người ấy và cảm xúc thật của mình, đưa ra lựa chọn rõ ràng thay vì mập mờ. Mối quan hệ bớt ảo tưởng và trở nên thật hơn. Câu trả lời nghiêng về tích cực nếu bạn chọn người thật sự đáp lại mình.",
  work: "Tập trung vào một mục tiêu, loại bỏ những phương án không khả thi. Kế hoạch trở nên thực tế và làm được. Thuận để hành động ngay.",
  money: "Tránh được cám dỗ, đưa ra quyết định tài chính sáng suốt. Tình hình rõ ràng hơn, có kế hoạch cụ thể. Nghiêng về thuận.",
  health: "Tinh thần minh mẫn, thoát khỏi thói quen trốn tránh. Tập trung tốt hơn, giấc ngủ cải thiện. Sức khoẻ đi lên.",
  adv: "Tin vào lựa chọn thực tế bạn vừa đưa ra và bắt tay làm ngay."
});

defCard(43, 0, -1, {
  kw: "rời đi, tìm ý nghĩa",
  g: "Tám Cốc là quyết định rời bỏ điều không còn làm bạn hạnh phúc để đi tìm một ý nghĩa sâu hơn. Dù bề ngoài mọi thứ vẫn ổn, trái tim bạn biết mình cần nhiều hơn thế. Điều bạn hỏi đang ở một ngã rẽ: kết quả phụ thuộc vào việc bạn có dám bước đi hay không.",
  love: "Rời bỏ một mối quan hệ không còn đủ đầy, hoặc cần khoảng cách để suy nghĩ. Có thể một bên đang dần rút lui trong im lặng. Nếu bạn hỏi có nên ở lại không, lá này nghiêng về cần thay đổi — hãy thành thật với cảm xúc của mình.",
  work: "Bỏ việc hoặc chuyển hướng dù công việc hiện tại vẫn ổn định, vì bạn muốn làm điều có ý nghĩa hơn. Câu trả lời cho việc có nên đi không là có, nếu bạn đã cân nhắc kỹ. Hãy chuẩn bị trước khi rời đi để không phải hối tiếc.",
  money: "Từ bỏ nguồn thu cũ để theo đuổi điều mới, nên thu nhập có thể tạm giảm. Đây là cái giá của sự thay đổi. Lưng chừng: hãy chuẩn bị quỹ dự phòng ít nhất vài tháng trước khi bước đi.",
  health: "Bạn cần nghỉ ngơi, đi xa, tách khỏi môi trường đang làm mình mệt mỏi. Chăm sóc tinh thần là ưu tiên. Một chuyến đi hay một khoảng lặng sẽ giúp bạn cân bằng lại.",
  adv: "Nếu trái tim đã rời đi, hãy dũng cảm bước theo. Nhưng chuẩn bị hành lý trước khi lên đường."
}, {
  kw: "sợ rời đi, lưỡng lự",
  g: "Tám Cốc ngược là sợ rời đi, lưỡng lự giữa ở và đi, hoặc bỏ đi quá vội rồi hối hận. Bạn biết có điều không ổn nhưng chưa dám thay đổi. Điều bạn hỏi đang bị kẹt lại vì chính sự do dự của bạn.",
  love: "Ở lại trong một mối quan hệ không hạnh phúc vì sợ cô đơn, hoặc bỏ đi rồi lại quay về nhiều lần. Vòng lặp này làm cả hai mệt mỏi. Chưa thuận lúc này; bạn cần quyết định rõ ràng thay vì để mọi thứ trôi.",
  work: "Muốn nghỉ việc nhưng không dám, hoặc nhảy việc liên tục mà không tìm được chỗ phù hợp. Chưa nên quyết định vì cảm xúc nhất thời. Hãy xác định rõ điều mình thật sự muốn trước khi đi.",
  money: "Giữ mãi một khoản đầu tư lỗ vì tiếc, hoặc từ bỏ quá sớm một kế hoạch tốt. Cảm xúc đang lấn át con số. Chưa thuận; hãy nhìn vào số liệu thật thay vì cảm giác.",
  health: "Mệt mỏi vì không dám thay đổi, tâm trạng bất ổn kéo dài. Cơ thể đang báo hiệu bạn cần một quyết định. Hãy nghỉ ngơi và suy nghĩ rõ ràng.",
  adv: "Viết ra điều bạn được và mất nếu ở lại, nếu rời đi. Rồi chọn và đi đến cùng."
});

defCard(44, 2, -1, {
  kw: "ước nguyện thành, mãn nguyện",
  g: "Chín Cốc là lá của điều ước: sự mãn nguyện, thoả mãn và hạnh phúc cá nhân. Những gì bạn mong muốn đang dần thành hiện thực, và bạn có quyền tận hưởng nó. Điều bạn hỏi nghiêng mạnh về có — đây được gọi là lá ‘ước gì được nấy’.",
  love: "Tình cảm như ý, người ấy đáp lại, mối quan hệ khiến bạn hài lòng. Nếu bạn đang ước điều gì trong tình yêu, lá này nói nó có thể thành. Câu trả lời là có, rất thuận để tiến tới.",
  work: "Đạt được mục tiêu, được công nhận, hài lòng với thành quả của mình. Dự án thành công, bạn có thể nhận thưởng hay lời khen. Câu trả lời là có — hãy tận hưởng thành quả và tự tin đi tiếp.",
  money: "Tài chính dư dả, thoải mái, có thể nhận được một khoản lộc bất ngờ. Bạn được phép tận hưởng những gì mình làm ra. Nghiêng mạnh về thuận.",
  health: "Sức khoẻ tốt, tinh thần mãn nguyện. Chỉ cần chú ý đừng ăn uống, hưởng thụ quá đà. Tận hưởng cuộc sống một cách điều độ là chìa khoá.",
  adv: "Hãy ước thật rõ ràng và tin vào điều mình ước. Rồi tận hưởng khi nó đến."
}, {
  kw: "không thoả mãn, tham lam",
  g: "Chín Cốc ngược là cảm giác không thoả mãn dù đã có nhiều, hoặc điều ước chưa thành. Có thể bạn đang theo đuổi điều không thật sự làm mình hạnh phúc. Điều bạn hỏi chưa như ý ở thời điểm này.",
  love: "Tình cảm không như mong đợi, hoặc bạn đòi hỏi ở người kia quá nhiều. Bạn chưa thấy đủ đầy dù mọi thứ có vẻ ổn. Câu trả lời nghiêng về chưa; hãy xem lại kỳ vọng của mình.",
  work: "Thành công nhưng không vui, hoặc chưa đạt được mục tiêu như mong muốn. Có thể có sự tự mãn khiến bạn chững lại. Chưa thuận; cần tìm lại ý nghĩa thật sự trong công việc.",
  money: "Chi tiêu quá tay để thoả mãn bản thân, hoặc tham lam dẫn đến rủi ro. Tài chính có thể hụt vì hưởng thụ. Chưa nên chi thêm; kiểm soát lại ngay.",
  health: "Ăn uống, hưởng thụ quá mức ảnh hưởng tới sức khoẻ, đặc biệt là cân nặng và tiêu hoá. Cần điều độ lại. Chăm sóc bản thân đúng cách chứ không phải chiều chuộng.",
  adv: "Hạnh phúc không nằm ở việc có thêm, mà ở việc biết thấy đủ."
});

defCard(45, 2, -1, {
  kw: "hạnh phúc trọn vẹn, gia đình",
  g: "Mười Cốc là hạnh phúc trọn vẹn, gia đình êm ấm và sự viên mãn về cảm xúc. Đây là cái kết đẹp như cầu vồng sau mưa. Điều bạn hỏi có kết quả rất tốt, đặc biệt nếu nó liên quan tới gia đình, tình cảm lâu dài hay sự bình yên trong lòng.",
  love: "Tình yêu viên mãn, hướng tới hôn nhân và một gia đình hạnh phúc. Hai người có chung giá trị sống và nhìn về cùng một hướng. Câu trả lời nghiêng mạnh về có cho mọi câu hỏi về tương lai chung.",
  work: "Môi trường làm việc như một gia đình, cân bằng tốt giữa công việc và cuộc sống. Bạn hài lòng với con đường mình chọn. Nghiêng về có — công việc đang mang lại niềm vui cho bạn và những người xung quanh.",
  money: "Tài chính gia đình ổn định, đủ đầy. Thuận để mua nhà, đầu tư cho gia đình hay lên kế hoạch dài hạn. Mọi thứ khá an toàn.",
  health: "Sức khoẻ tốt, tinh thần hạnh phúc, gia đình khoẻ mạnh. Cuộc sống cân bằng giúp cơ thể tràn đầy năng lượng. Tiếp tục duy trì nhịp sống lành mạnh này.",
  adv: "Trân trọng những người thân yêu. Hạnh phúc đang ở ngay trong nhà bạn."
}, {
  kw: "bất hoà gia đình",
  g: "Mười Cốc ngược là bất hoà trong gia đình, hạnh phúc chưa trọn vẹn, hoặc kỳ vọng về một tổ ấm lý tưởng không thành. Có khoảng cách giữa hình ảnh bên ngoài và thực tế bên trong. Điều bạn hỏi cần vun vén thêm mới được như ý.",
  love: "Mâu thuẫn về giá trị sống, gia đình phản đối, hoặc tổ ấm thiếu sự gắn kết. Câu trả lời nghiêng về chưa thuận để tiến tới hôn nhân lúc này. Hãy nói chuyện thật lòng về tương lai trước.",
  work: "Mất cân bằng giữa công việc và gia đình, hoặc môi trường làm việc thiếu gắn kết. Bạn có thể đang hy sinh quá nhiều cho một bên. Chưa thuận; bạn cần sắp xếp lại ưu tiên.",
  money: "Căng thẳng tài chính trong gia đình, chi phí tăng hoặc bất đồng về cách tiêu tiền. Tiền bạc dễ trở thành nguyên nhân cãi vã. Chưa thuận cho khoản chi lớn; cần bàn bạc cùng nhau.",
  health: "Căng thẳng từ chuyện nhà ảnh hưởng giấc ngủ và tinh thần. Bạn cần không gian riêng để hồi phục. Đừng ôm hết mọi việc một mình.",
  adv: "Gia đình hoàn hảo không tồn tại — chỉ có những gia đình biết sửa sai cùng nhau."
});

defCard(46, 1, -1, {
  kw: "tin vui tình cảm, nhạy cảm",
  g: "Tiểu Đồng Cốc là tin vui về tình cảm, sự nhạy cảm và trí tưởng tượng phong phú. Có thể là một lời tỏ tình dễ thương, một ý tưởng sáng tạo bất ngờ hay một linh cảm mách bảo. Điều bạn hỏi có tín hiệu dịu dàng và tích cực.",
  love: "Một tin nhắn dễ thương, một lời tỏ tình hoặc một người trẻ tuổi có tình cảm với bạn. Mối quan hệ ngọt ngào, trong sáng. Câu trả lời nghiêng về có, nhưng tình cảm cần thời gian để lớn lên.",
  work: "Ý tưởng sáng tạo mới, rất tốt cho nghệ thuật, thiết kế, viết lách hay những công việc cần trực giác. Có thể có tin tốt nhỏ về công việc. Nghiêng về thuận; hãy mạnh dạn chia sẻ ý tưởng của mình.",
  money: "Tin vui nhỏ về tiền bạc hoặc một ý tưởng kiếm tiền sáng tạo. Không có biến động lớn. Nghiêng về thuận, chỉ cần chi tiêu nhẹ nhàng, có kế hoạch.",
  health: "Tinh thần nhạy cảm, cần được chăm sóc cảm xúc. Nghệ thuật, âm nhạc, viết nhật ký giúp chữa lành. Sức khoẻ ổn nếu bạn nghỉ ngơi đủ.",
  adv: "Lắng nghe trực giác và đón nhận sự ngọt ngào. Đừng ngại thể hiện cảm xúc thật."
}, {
  kw: "cảm xúc non nớt, tin buồn",
  g: "Tiểu Đồng Cốc ngược là cảm xúc non nớt, dễ tổn thương, hoặc một tin buồn về tình cảm. Có thể bạn đang mơ mộng quá nhiều hoặc phản ứng thái quá với chuyện nhỏ. Điều bạn hỏi chưa có tín hiệu tốt.",
  love: "Thất vọng, người ấy thiếu trưởng thành hoặc tình cảm chưa được đáp lại như mong đợi. Bạn dễ tổn thương vì kỳ vọng quá cao. Câu trả lời nghiêng về chưa; đừng đặt nặng quá.",
  work: "Thiếu tập trung, mơ mộng nhiều hơn làm, hoặc ý tưởng bị từ chối. Có thể bạn phản ứng quá nhạy cảm với góp ý. Chưa thuận lúc này; hãy hoàn thiện ý tưởng trước khi trình bày.",
  money: "Chi tiêu theo cảm xúc, kế hoạch tài chính thiếu thực tế. Những món đồ mua vì hứng thú nhất thời đang làm hụt ví. Chưa thuận; hãy cân nhắc lại trước mỗi khoản chi.",
  health: "Nhạy cảm, dễ buồn, cảm xúc thất thường. Cần chăm sóc tinh thần nhiều hơn. Hãy tránh xa những nguồn gây căng thẳng.",
  adv: "Cảm xúc là thật, nhưng đừng để chúng quyết định thay bạn."
});

defCard(47, 1, -1, {
  kw: "lãng mạn, lời mời",
  g: "Hiệp Sĩ Cốc là sự lãng mạn, một lời mời, một người mang theo cảm xúc chân thành tiến về phía bạn. Có thể là lời tỏ tình, lời cầu hôn hay một đề nghị hấp dẫn. Điều bạn hỏi có tín hiệu tốt: ai đó hoặc điều gì đó đang đến với tấm lòng.",
  love: "Một người lãng mạn đang theo đuổi bạn, có thể có lời tỏ tình hoặc cầu hôn. Rất thuận cho chuyện tình cảm. Câu trả lời nghiêng về có — người ấy đang tiến về phía bạn.",
  work: "Nhận được lời mời hay một đề nghị công việc hấp dẫn, đặc biệt trong lĩnh vực sáng tạo, nghệ thuật. Nghiêng về có nếu đó là điều bạn đam mê. Hãy đọc kỹ điều khoản trước khi nhận.",
  money: "Có đề nghị tài chính hấp dẫn, nhưng cần kiểm tra kỹ. Tiền có thể đến từ công việc sáng tạo. Nghiêng về thuận nếu bạn giữ sự tỉnh táo.",
  health: "Tinh thần lãng mạn, dễ chịu. Tốt cho nghệ thuật trị liệu, âm nhạc, đi dạo. Cảm xúc cân bằng giúp cơ thể khoẻ hơn.",
  adv: "Theo đuổi trái tim, nhưng giữ đôi chân trên mặt đất."
}, {
  kw: "hứa suông, thất thường",
  g: "Hiệp Sĩ Cốc ngược là lời hứa suông, cảm xúc thất thường hoặc sự lãng mạn thiếu thực tế. Người đến với lời ngọt ngào nhưng không có hành động đi kèm. Điều bạn hỏi cần cảnh giác với những gì nghe quá hay.",
  love: "Người ấy nói hay nhưng không làm, dễ thay lòng, thậm chí có thể là lừa dối tình cảm. Sự lãng mạn chỉ có ở lời nói. Câu trả lời nghiêng về chưa; đừng tin vội cho tới khi thấy hành động.",
  work: "Đề nghị không thành, kế hoạch mơ hồ, bạn mất hứng thú giữa chừng. Lời hứa về thăng tiến hay dự án có thể không được thực hiện. Chưa thuận; hãy kiểm chứng mọi lời hứa bằng văn bản.",
  money: "Lời hứa tài chính không được thực hiện, cẩn thận lừa đảo. Chưa nên đầu tư theo cảm xúc hay lời mời gọi. Giữ tiền lại.",
  health: "Tâm trạng thất thường, dễ buồn vô cớ. Cần ổn định cảm xúc và tránh trốn tránh bằng những thói quen xấu. Nghỉ ngơi và vận động nhẹ.",
  adv: "Nhìn vào hành động, không phải lời hứa."
});

defCard(48, 2, -1, {
  kw: "thấu cảm, dịu dàng",
  g: "Nữ Hoàng Cốc là sự thấu cảm, dịu dàng và trực giác sâu sắc. Bạn hiểu cảm xúc của mình và của người khác, biết cách chăm sóc và chữa lành. Điều bạn hỏi rất thuận nếu bạn lắng nghe trái tim và tin vào trực giác.",
  love: "Tình cảm sâu sắc, chân thành, đầy yêu thương. Người ấy (hoặc chính bạn) tận tâm và thấu hiểu. Câu trả lời nghiêng mạnh về có — mối quan hệ đang được nuôi dưỡng bằng sự dịu dàng.",
  work: "Rất thuận cho các công việc chăm sóc, tư vấn, y tế, giáo dục, nghệ thuật. Bạn được tin tưởng nhờ sự thấu hiểu người khác. Nghiêng về có; trực giác sẽ giúp bạn quyết định đúng.",
  money: "Tài chính ổn định, bạn biết cách chăm lo cho gia đình và chi tiêu có tâm. Chỉ cần tránh cho vay vì cả nể. Nhìn chung thuận.",
  health: "Sức khoẻ tốt, tinh thần bình an. Chăm sóc cảm xúc là chìa khoá cho sức khoẻ lúc này. Thiền, nghệ thuật, nước (bơi, tắm) giúp bạn cân bằng.",
  adv: "Tin vào trực giác và đối xử dịu dàng với chính mình như cách bạn đối xử với người khác."
}, {
  kw: "quá nhạy cảm, phụ thuộc",
  g: "Nữ Hoàng Cốc ngược là quá nhạy cảm, phụ thuộc cảm xúc hoặc hy sinh bản thân vì người khác đến kiệt sức. Cảm xúc đang lấn át lý trí. Điều bạn hỏi gặp trở ngại vì sự mất cân bằng cảm xúc này.",
  love: "Phụ thuộc, ghen tuông hoặc hy sinh quá mức trong mối quan hệ. Tình cảm khiến bạn kiệt sức thay vì được nuôi dưỡng. Câu trả lời nghiêng về chưa; cần đặt ranh giới trước.",
  work: "Để cảm xúc chi phối công việc, dễ tổn thương vì lời nói của người khác, hoặc gánh vác cảm xúc của cả nhóm. Sự nhạy cảm vốn là điểm mạnh của bạn đang khiến bạn khó đưa ra quyết định dứt khoát. Chưa thuận; cần tách bạch cảm xúc và công việc.",
  money: "Chi tiêu vì cảm xúc, cho vay vì cả nể. Tài chính bị ảnh hưởng bởi lòng tốt đặt sai chỗ. Chưa thuận; học cách từ chối.",
  health: "Kiệt sức cảm xúc, dễ buồn, dễ lo âu. Cần chăm sóc bản thân nhiều hơn. Tìm hỗ trợ tâm lý nếu cần.",
  adv: "Lo cho mình trước rồi mới lo cho người khác được."
});

defCard(49, 2, -1, {
  kw: "điềm tĩnh, bao dung",
  g: "Vua Cốc là sự điềm tĩnh, chín chắn và khả năng làm chủ cảm xúc. Bạn cân bằng được giữa trái tim và lý trí, giữa bao dung và nguyên tắc. Điều bạn hỏi rất thuận nếu bạn giữ được sự bình tĩnh và độ lượng.",
  love: "Người ấy trưởng thành, chín chắn, yêu thương bằng sự bao dung và trách nhiệm. Mối quan hệ ổn định, đáng tin cậy. Câu trả lời nghiêng về có — tình cảm nghiêm túc và vững vàng.",
  work: "Lãnh đạo bằng sự thấu hiểu, xử lý tình huống khó một cách bình tĩnh. Rất thuận cho tư vấn, y tế, giáo dục, quản lý con người. Nghiêng về có; bạn được tin tưởng và tôn trọng.",
  money: "Tài chính vững vàng nhờ quản lý khôn ngoan, không chi theo cảm xúc. Các quyết định tiền bạc lúc này thường sáng suốt. Nghiêng về thuận.",
  health: "Tinh thần ổn định, sức khoẻ tốt, kiểm soát căng thẳng hiệu quả. Duy trì sự cân bằng giữa làm và nghỉ. Sức khoẻ đang ở trạng thái vững.",
  adv: "Giữ bình tĩnh như mặt biển sâu. Bao dung nhưng có nguyên tắc."
}, {
  kw: "kìm nén, thao túng cảm xúc",
  g: "Vua Cốc ngược là kìm nén cảm xúc, lạnh lùng, hoặc thao túng cảm xúc người khác. Bề ngoài bình tĩnh nhưng bên trong đầy sóng gió. Điều bạn hỏi gặp trở ngại khi cảm xúc thật không được bày tỏ.",
  love: "Người ấy khó đoán, lạnh nhạt hoặc thao túng cảm xúc. Mối quan hệ thiếu sự chân thành và minh bạch. Câu trả lời nghiêng về chưa; bạn cần sự rõ ràng trước khi tiến tới.",
  work: "Lãnh đạo thiếu minh bạch, mất bình tĩnh khi áp lực, hoặc có người đang thao túng tình hình. Những lời hứa miệng lúc này rất dễ bị thay đổi khi có lợi cho người khác. Chưa thuận; hãy cẩn thận và giữ mọi thứ bằng văn bản.",
  money: "Quyết định tài chính theo cảm xúc, hoặc có người lợi dụng lòng tốt của bạn. Những lời nhờ vả, vay mượn mang màu sắc tình cảm cần được xem xét tỉnh táo. Chưa thuận; cân nhắc kỹ trước mỗi khoản chi.",
  health: "Cảm xúc dồn nén gây căng thẳng, mất ngủ, huyết áp thất thường. Cần giải toả lành mạnh. Tránh dùng rượu bia để quên.",
  adv: "Cảm xúc cần được nói ra, không phải bị giấu đi."
});
// ================= BỘ KIẾM (Khí · lý trí, giao tiếp, thử thách) — id 50–63 =================
defCard(50, 1, -1, {
  kw: "sáng tỏ, sự thật, đột phá",
  g: "Át Kiếm là thanh gươm của sự thật: một ý tưởng sắc bén, một khoảnh khắc sáng tỏ, một quyết định dứt khoát cắt xuyên mọi mơ hồ. Bạn nhìn thấy vấn đề rõ hơn bao giờ hết. Điều bạn hỏi có lợi thế nếu bạn dùng lý trí, nói thẳng sự thật và hành động dứt khoát.",
  love: "Đây là lúc nói chuyện thẳng thắn và rõ ràng: bày tỏ, làm rõ mối quan hệ hay nói ra điều bấy lâu giữ trong lòng. Sự thật có thể không lãng mạn nhưng giúp hai người hiểu nhau hơn. Câu trả lời nghiêng về có nếu bạn dám hỏi thẳng và chấp nhận câu trả lời thật.",
  work: "Ý tưởng đột phá, tư duy sắc bén, bạn tìm ra lời giải cho vấn đề đang vướng. Rất thuận cho thi cử, phỏng vấn, đàm phán, viết lách, nghiên cứu. Nghiêng về có — hãy trình bày quan điểm rõ ràng và tự tin.",
  money: "Bạn nhìn rõ tình hình tài chính và đưa ra quyết định sáng suốt. Tốt cho việc ký hợp đồng, thương lượng giá, cắt bỏ khoản chi thừa. Nghiêng về thuận nếu bạn dựa trên số liệu chứ không phải cảm giác.",
  health: "Đầu óc minh mẫn, chẩn đoán rõ ràng, tìm đúng nguyên nhân vấn đề sức khoẻ. Nếu cần phẫu thuật hay điều trị dứt điểm, đây là lá thuận. Hãy chủ động đi khám để có câu trả lời chính xác.",
  adv: "Nói thật, nghĩ rõ, quyết dứt khoát. Sự rõ ràng hôm nay tránh được rất nhiều rắc rối ngày mai."
}, {
  kw: "rối trí, lời nói gây tổn thương",
  g: "Át Kiếm ngược là thanh gươm quay sai hướng: đầu óc rối rắm, thông tin sai lệch, hoặc lời nói sắc bén làm tổn thương người khác. Bạn có thể đang quyết định vội hoặc bị che mắt bởi định kiến. Điều bạn hỏi chưa thuận khi mọi thứ còn chưa sáng tỏ.",
  love: "Hiểu lầm, lời nói nặng nề, cãi vã vì không hiểu ý nhau. Có thể có sự thật bị che giấu. Câu trả lời nghiêng về chưa; hãy bình tĩnh trước khi nói, và tìm hiểu kỹ trước khi kết luận.",
  work: "Ý tưởng bị bác bỏ, kế hoạch thiếu logic, giao tiếp kém gây hiểu lầm. Thi cử, phỏng vấn dễ gặp trục trặc nếu chuẩn bị không kỹ. Chưa thuận; hãy kiểm tra lại thông tin và ôn tập kỹ hơn.",
  money: "Quyết định tài chính vội vàng hoặc dựa trên thông tin sai. Đọc không kỹ hợp đồng dễ thiệt. Chưa nên ký kết hay xuống tiền; hãy đọc lại mọi điều khoản.",
  health: "Căng thẳng đầu óc, đau đầu, mất ngủ vì suy nghĩ quá nhiều. Chẩn đoán có thể chưa chính xác. Nên hỏi thêm ý kiến bác sĩ thứ hai nếu còn băn khoăn.",
  adv: "Dừng lại trước khi nói hoặc quyết. Kiểm tra lại sự thật một lần nữa."
});

defCard(51, -1, 0, {
  kw: "bế tắc, né tránh quyết định",
  g: "Hai Kiếm là người bịt mắt cầm hai thanh gươm bắt chéo: bế tắc, né tránh, không muốn đối diện với một lựa chọn khó. Bạn đang giữ thế cân bằng mong manh bằng cách không nhìn vào sự thật. Điều bạn hỏi đang bị kẹt lại cho tới khi bạn chịu tháo khăn bịt mắt và quyết định.",
  love: "Phân vân giữa hai người, hoặc né tránh một cuộc nói chuyện quan trọng. Mối quan hệ đang ở thế ‘không tiến không lùi’, cả hai đều giữ khoảng cách. Câu trả lời nghiêng về chưa — sẽ không có gì thay đổi cho tới khi một người lên tiếng.",
  work: "Đứng giữa hai lựa chọn công việc, hoặc kẹt giữa hai phe trong công ty. Trì hoãn quyết định chỉ làm tình hình kéo dài. Chưa thuận; hãy thu thập thêm thông tin rồi chọn một hướng.",
  money: "Tài chính đang ở thế giằng co, bạn chần chừ không dám quyết. Có thể đang né tránh việc xem lại khoản nợ hay chi tiêu. Chưa nên quyết định lớn, nhưng cũng đừng trốn tránh con số thật.",
  health: "Căng thẳng vì kìm nén, cổ vai gáy cứng, khó ngủ. Có thể bạn đang né tránh việc đi khám. Hãy đối diện với vấn đề sớm để yên tâm.",
  adv: "Tháo khăn bịt mắt. Không quyết định cũng là một quyết định — và thường là tệ nhất."
}, {
  kw: "vỡ thế bế tắc, quá tải thông tin",
  g: "Hai Kiếm ngược là thế bế tắc bị phá vỡ: sự thật lộ ra, bạn buộc phải chọn. Có thể bạn đang bị quá tải thông tin hoặc bị ép quyết định khi chưa sẵn sàng. Điều bạn hỏi ở trạng thái lưng chừng: đã có chuyển động, nhưng kết quả phụ thuộc vào lựa chọn của bạn.",
  love: "Sự thật được nói ra, mối quan hệ buộc phải đi tới một kết luận. Có thể bạn cảm thấy bị dồn ép. Lưng chừng: hãy chọn điều trái tim thật sự muốn thay điều an toàn.",
  work: "Buộc phải chọn phe hoặc chọn hướng, thông tin dồn dập khiến bạn rối. Kết quả tuỳ vào việc bạn chọn kỹ hay chọn vội. Hãy ưu tiên những gì quan trọng nhất và bỏ qua nhiễu.",
  money: "Không thể né các vấn đề tài chính được nữa, phải đối diện. Có thể đau lúc đầu nhưng giúp bạn làm chủ lại tình hình. Lưng chừng: hành động sớm sẽ thuận hơn.",
  health: "Căng thẳng được giải toả khi bạn đối diện vấn đề, nhưng dễ bị quá tải. Cần nghỉ ngơi hợp lý. Đi khám để rõ ràng tình trạng.",
  adv: "Chọn điều ít tệ hơn nếu không có điều hoàn hảo, rồi bước tiếp."
});

defCard(52, -2, -1, {
  kw: "đau lòng, tổn thương, chia ly",
  g: "Ba Kiếm là trái tim bị ba thanh gươm xuyên qua: đau lòng, tổn thương, thất vọng hoặc chia ly. Đây là nỗi đau thật, không thể lảng tránh. Điều bạn hỏi đang gặp trở ngại lớn hoặc sẽ mang lại tổn thương; câu trả lời lúc này là chưa, nhưng nỗi đau này sẽ qua.",
  love: "Chia tay, phản bội, người thứ ba, hoặc một sự thật làm bạn đau. Tình cảm đang bị tổn thương sâu sắc. Nếu bạn hỏi có quay lại hay tiến tới được không, câu trả lời nghiêng về không — ít nhất là lúc này.",
  work: "Thất vọng lớn, bị từ chối, bị chỉ trích, hoặc mâu thuẫn gay gắt. Dự án có thể thất bại hoặc bạn bị tổn thương bởi lời nói của người khác. Chưa thuận; hãy tách cảm xúc ra khỏi công việc và rút kinh nghiệm.",
  money: "Mất mát tài chính gây đau lòng, có thể do bị lừa hoặc tin nhầm người. Chưa nên đầu tư hay cho vay lúc này. Hãy chấp nhận tổn thất và cắt lỗ.",
  health: "Nỗi đau tinh thần ảnh hưởng tới tim mạch, giấc ngủ và hệ miễn dịch. Có thể liên quan tới phẫu thuật hay vấn đề về tim. Hãy chăm sóc tinh thần và đi khám nếu có dấu hiệu bất thường.",
  adv: "Cho phép mình đau và khóc. Nỗi đau được thừa nhận sẽ lành nhanh hơn nỗi đau bị chôn giấu."
}, {
  kw: "chữa lành, buông bỏ nỗi đau",
  g: "Ba Kiếm ngược là bắt đầu chữa lành sau tổn thương, dù vết thương vẫn còn. Có thể bạn đang tha thứ và buông bỏ, hoặc vẫn còn níu giữ nỗi đau cũ. Điều bạn hỏi còn trở ngại, nhưng tình hình đang dần dịu lại.",
  love: "Dần vượt qua chia tay, tha thứ cho người kia và cho chính mình. Nhưng nếu chưa thật sự chữa lành, đừng vội tiến tới hay quay lại. Câu trả lời nghiêng về chưa, cần thêm thời gian.",
  work: "Hồi phục sau thất bại, rút ra bài học. Vết thương cũ vẫn ảnh hưởng tới sự tự tin. Chưa thuận để đẩy mạnh; hãy lấy lại tinh thần từng bước.",
  money: "Bắt đầu gỡ lại sau tổn thất nhưng còn chậm. Đừng để nỗi sợ thua lỗ cũ khiến bạn bỏ lỡ hết mọi cơ hội. Chưa thuận cho rủi ro lớn; hãy đi từng bước nhỏ.",
  health: "Tinh thần hồi phục chậm, cần thêm thời gian. Tiếp tục chăm sóc bản thân và tìm hỗ trợ tâm lý nếu cần. Đừng ép mình ‘ổn’ quá sớm.",
  adv: "Tha thứ không phải để quên, mà để bạn không phải mang nỗi đau đi tiếp."
});

defCard(53, 0, -1, {
  kw: "nghỉ ngơi, hồi phục, tạm dừng",
  g: "Bốn Kiếm là lúc hạ gươm xuống và nghỉ ngơi. Sau những căng thẳng vừa qua, bạn cần thời gian để hồi phục thể chất lẫn tinh thần. Điều bạn hỏi đang ở giai đoạn tạm dừng — chưa phải lúc hành động, nhưng cũng không có gì xấu nếu bạn biết chờ.",
  love: "Mối quan hệ cần một khoảng lặng: tạm xa nhau để suy nghĩ, hoặc bạn cần thời gian một mình trước khi yêu tiếp. Đừng ép buộc hay đòi câu trả lời ngay. Câu trả lời lúc này là hãy chờ — mọi thứ sẽ rõ hơn sau khi cả hai bình tĩnh.",
  work: "Cần nghỉ ngơi, lên kế hoạch lại, hoặc dự án đang tạm hoãn. Đây không phải lúc đẩy mạnh mà là lúc chuẩn bị. Lưng chừng: chưa nên hành động lớn, hãy dùng thời gian này để suy nghĩ chiến lược.",
  money: "Tài chính tạm ổn, chưa có biến động. Chưa nên đầu tư hay ra quyết định lớn. Hãy dùng thời gian này để xem xét lại ngân sách.",
  health: "Cơ thể đòi hỏi nghỉ ngơi thật sự. Tốt cho hồi phục sau ốm, sau phẫu thuật, hoặc sau thời gian làm việc quá sức. Ngủ đủ, thiền, tránh vận động mạnh.",
  adv: "Nghỉ ngơi không phải là lười biếng. Hãy cho mình một khoảng lặng để nạp lại năng lượng."
}, {
  kw: "kiệt sức, không chịu nghỉ",
  g: "Bốn Kiếm ngược là không chịu nghỉ dù đã kiệt sức, hoặc bị buộc phải quay lại trước khi hồi phục. Cũng có thể là trì trệ kéo dài vì nghỉ quá lâu. Điều bạn hỏi gặp trở ngại vì năng lượng của bạn đang cạn.",
  love: "Mệt mỏi trong mối quan hệ nhưng không dám nói ra, hoặc quay lại quá vội sau chia tay. Sự im lặng kéo dài chỉ khiến khoảng cách giữa hai người thêm lớn. Chưa thuận; bạn cần thời gian thật sự để hồi phục trước.",
  work: "Làm việc quá sức, kiệt sức, hiệu suất giảm. Hoặc trì trệ quá lâu, mất đà. Chưa thuận; hãy cân bằng lại nhịp làm và nghỉ.",
  money: "Căng thẳng tài chính khiến bạn không thể nghỉ ngơi. Có thể phải làm thêm quá sức. Chưa thuận cho quyết định lớn khi đầu óc mệt mỏi.",
  health: "Kiệt sức, mất ngủ, hệ miễn dịch yếu, dễ ốm. Cơ thể đang báo động. Hãy nghỉ ngơi ngay trước khi phải nghỉ bắt buộc.",
  adv: "Dừng lại trước khi cơ thể bắt bạn dừng."
});

defCard(54, -2, 0, {
  kw: "xung đột, thắng mà mất",
  g: "Năm Kiếm là cuộc xung đột mà người thắng cũng mất nhiều: tranh cãi, hơn thua, chiến thắng bằng mọi giá. Có thể bạn hoặc ai đó đang dùng thủ đoạn để giành phần hơn. Điều bạn hỏi đang gặp trở ngại nghiêm trọng; câu trả lời là chưa, và cần tự hỏi cuộc chiến này có đáng không.",
  love: "Cãi vã, hơn thua, lời nói làm tổn thương nhau, có thể có sự lừa dối. Dù bạn ‘thắng’ trong cuộc tranh luận, mối quan hệ vẫn bị tổn hại. Câu trả lời nghiêng về không — lúc này nên lùi lại thay vì tiếp tục đối đầu.",
  work: "Cạnh tranh không lành mạnh, đồng nghiệp chơi xấu, mâu thuẫn với sếp. Có thể bạn bị lấy mất công lao. Chưa thuận; hãy chọn trận đáng đánh và bảo vệ bản thân bằng bằng chứng.",
  money: "Tranh chấp tiền bạc, bị lừa, hoặc thắng một khoản nhưng mất quan hệ. Chưa nên đầu tư hay hợp tác lúc này. Cẩn thận với người muốn lợi dụng bạn.",
  health: "Căng thẳng vì xung đột ảnh hưởng tới huyết áp, giấc ngủ. Có thể bị chấn thương do va chạm. Tránh xa những môi trường độc hại.",
  adv: "Không phải trận nào cũng đáng thắng. Đôi khi rút lui là chiến thắng khôn ngoan nhất."
}, {
  kw: "hoà giải, rút khỏi xung đột",
  g: "Năm Kiếm ngược là kết thúc xung đột, hoà giải hoặc rút lui khỏi cuộc chiến vô nghĩa. Bạn nhận ra cái giá của việc hơn thua. Điều bạn hỏi đang ở trạng thái lưng chừng: xung đột dịu đi, nhưng cần thời gian để hàn gắn.",
  love: "Làm hoà sau cãi vã, cả hai hạ cái tôi xuống. Hoặc bạn chọn rời khỏi mối quan hệ độc hại. Lưng chừng — kết quả tuỳ vào việc cả hai có thật lòng muốn sửa hay không.",
  work: "Mâu thuẫn được giải quyết, hoặc bạn rời khỏi môi trường độc hại. Có thể vẫn còn dư âm. Hãy bắt đầu lại bằng sự minh bạch.",
  money: "Tranh chấp được giải quyết, dù có thể phải chịu thiệt một chút. Cố giành phần hơn lúc này chỉ khiến bạn tốn thêm thời gian và tiền bạc. Lưng chừng: chấp nhận kết thúc để bước tiếp.",
  health: "Căng thẳng giảm bớt khi xung đột kết thúc. Tinh thần dần ổn định. Tiếp tục tránh xa những nguồn gây áp lực.",
  adv: "Hạ vũ khí xuống. Bình yên quan trọng hơn việc mình đúng."
});

defCard(55, 1, -1, {
  kw: "chuyển tiếp, rời sóng gió",
  g: "Sáu Kiếm là chiếc thuyền đưa bạn rời khỏi vùng nước dữ để tới nơi yên bình hơn. Đây là giai đoạn chuyển tiếp: tình hình đang dần tốt lên, dù bạn vẫn mang theo chút buồn. Điều bạn hỏi đang đi đúng hướng, câu trả lời nghiêng về có, dù cần thêm thời gian.",
  love: "Mối quan hệ vượt qua giai đoạn khó khăn và đang dần êm ả trở lại. Hoặc bạn rời bỏ một mối quan hệ cũ để hướng tới điều tốt hơn. Nghiêng về tích cực — sóng gió đang lùi lại phía sau.",
  work: "Chuyển việc, chuyển nơi làm, hoặc thoát khỏi một giai đoạn căng thẳng. Có thể có chuyến công tác hay di chuyển xa. Nghiêng về có — thay đổi này sẽ đưa bạn tới chỗ tốt hơn.",
  money: "Tài chính dần ổn định sau thời gian khó khăn. Chưa dư dả nhưng đang đi lên. Thuận cho việc sắp xếp lại, trả nợ, lập kế hoạch mới.",
  health: "Sức khoẻ đang hồi phục, tinh thần nhẹ nhàng hơn. Một chuyến đi, nhất là gần sông nước, sẽ giúp bạn khoẻ lên. Tiếp tục kiên trì điều trị.",
  adv: "Cứ tiếp tục chèo. Bờ bên kia yên bình hơn bạn nghĩ."
}, {
  kw: "không thể rời đi, mắc kẹt",
  g: "Sáu Kiếm ngược là không thể rời đi, hoặc cứ mang theo gánh nặng cũ vào hành trình mới. Sự chuyển tiếp bị trì hoãn, bạn vẫn kẹt trong sóng gió. Điều bạn hỏi gặp trở ngại cho tới khi bạn buông được những gì đang níu mình lại.",
  love: "Muốn thoát khỏi mối quan hệ nhưng không thể, hoặc mang tổn thương cũ vào mối quan hệ mới. Bạn đã rời đi về mặt vật lý nhưng trái tim vẫn còn kẹt lại ở bờ bên kia. Chưa thuận; hãy giải quyết chuyện cũ cho dứt điểm.",
  work: "Kế hoạch chuyển việc bị hoãn, bạn vẫn kẹt ở môi trường không phù hợp. Có thể do thiếu kế hoạch dự phòng hoặc do nỗi sợ thay đổi níu chân. Chưa thuận lúc này; hãy chuẩn bị kỹ hơn cho lần đi tới.",
  money: "Tài chính chưa thoát khỏi khó khăn, nợ cũ vẫn đeo bám. Những khoản bạn tưởng đã xong có thể quay lại đòi hỏi sự chú ý. Chưa thuận; ưu tiên xử lý các khoản cũ trước.",
  health: "Hồi phục chậm, vấn đề cũ tái phát. Cần kiên nhẫn và kiên trì điều trị. Tránh bỏ dở giữa chừng.",
  adv: "Bạn không thể lên thuyền mới khi tay vẫn còn nắm chặt bến cũ."
});

defCard(56, -1, 0, {
  kw: "lén lút, mưu mẹo, thiếu trung thực",
  g: "Bảy Kiếm là người lén mang đi những thanh gươm: mưu mẹo, gian dối, hoặc hành động một mình để né tránh hậu quả. Có ai đó (có thể chính bạn) không hoàn toàn trung thực. Điều bạn hỏi cần cảnh giác; câu trả lời nghiêng về chưa cho tới khi mọi thứ được minh bạch.",
  love: "Có điều bị che giấu: nói dối, lén lút, hoặc người ấy không hoàn toàn thành thật. Cũng có thể bạn đang giấu cảm xúc thật. Câu trả lời nghiêng về chưa — hãy tìm hiểu kỹ trước khi tin tưởng.",
  work: "Đồng nghiệp chơi xấu, bị lấy cắp ý tưởng, hoặc có người đi đường tắt. Bạn cần bảo vệ công sức của mình. Chưa thuận; hãy lưu lại bằng chứng và cẩn trọng với những gì bạn chia sẻ.",
  money: "Nguy cơ bị lừa, mất cắp, hoặc có người không minh bạch về tiền bạc. Chưa nên đầu tư hay cho vay. Kiểm tra kỹ mọi giao dịch.",
  health: "Có thể có vấn đề sức khoẻ bị bỏ qua hoặc bạn đang giấu triệu chứng. Đừng tự chữa. Hãy đi khám và nói thật với bác sĩ.",
  adv: "Minh bạch là cách bảo vệ tốt nhất. Kiểm chứng trước khi tin."
}, {
  kw: "lộ diện, thú nhận",
  g: "Bảy Kiếm ngược là sự thật bị lộ ra, lương tâm lên tiếng, hoặc người lén lút bị phát hiện. Bạn có thể đang chọn thành thật sau một thời gian che giấu. Điều bạn hỏi ở thế lưng chừng: sự thật đã sáng tỏ, kết quả tuỳ vào cách mọi người đối diện.",
  love: "Lời nói dối bị phát hiện, hoặc ai đó thú nhận. Đau nhưng giúp làm rõ mối quan hệ. Lưng chừng — nếu cả hai thành thật từ đây, vẫn có thể hàn gắn.",
  work: "Kẻ chơi xấu bị lộ, sự thật được đưa ra ánh sáng. Bạn lấy lại được những gì thuộc về mình. Hãy giữ sự minh bạch để tiến lên.",
  money: "Phát hiện gian lận hoặc lấy lại được khoản bị mất. Tình hình tài chính trở nên rõ ràng hơn. Lưng chừng: cần kiểm soát chặt hơn.",
  health: "Tìm ra nguyên nhân thật của vấn đề sức khoẻ. Thành thật với bản thân về thói quen xấu. Bắt đầu điều trị đúng hướng.",
  adv: "Sự thật luôn lộ ra. Hãy là người chủ động nói trước."
});

defCard(57, -1, 1, {
  kw: "tự trói buộc, cảm giác bế tắc",
  g: "Tám Kiếm là người bị bịt mắt, trói tay giữa những thanh gươm — nhưng những thanh gươm không chặn hết lối đi. Cảm giác bế tắc phần lớn đến từ nỗi sợ và suy nghĩ của chính bạn. Điều bạn hỏi đang bị cản trở, nhưng lối ra có thật nếu bạn dám bước.",
  love: "Cảm thấy mắc kẹt trong mối quan hệ, không dám nói, không dám đi. Hoặc bạn tự giới hạn mình vì sợ bị từ chối. Câu trả lời lúc này nghiêng về chưa — nhưng chính bạn có chìa khoá để thay đổi.",
  work: "Cảm thấy không có lối thoát trong công việc, bị ràng buộc bởi hoàn cảnh. Nhưng thật ra bạn có nhiều lựa chọn hơn bạn nghĩ. Chưa thuận lúc này; hãy liệt kê mọi phương án, kể cả những cái bạn từng gạt đi.",
  money: "Cảm giác bị kẹt về tài chính, nợ nần, không biết bắt đầu từ đâu. Nỗi sợ khiến bạn không dám nhìn vào con số. Chưa thuận; hãy bắt đầu từ việc liệt kê rõ ràng mọi khoản.",
  health: "Lo âu, suy nghĩ tiêu cực, cảm giác bất lực. Sức khoẻ tinh thần cần được ưu tiên. Hãy tìm đến chuyên gia tâm lý nếu cần.",
  adv: "Tháo khăn bịt mắt và nhìn lại — lối ra luôn ở đó. Bước ra từng bước nhỏ."
}, {
  kw: "giải thoát, lấy lại tự do",
  g: "Tám Kiếm ngược là tự giải thoát: bạn tháo bỏ nỗi sợ, nhìn thấy lối ra và bước ra khỏi hoàn cảnh bế tắc. Sức mạnh quay trở lại với bạn. Điều bạn hỏi đang chuyển biến tích cực, câu trả lời nghiêng về có.",
  love: "Thoát khỏi mối quan hệ độc hại, hoặc vượt qua nỗi sợ để bày tỏ. Bạn lấy lại quyền quyết định trong tình cảm. Nghiêng về có.",
  work: "Tìm ra lối thoát, dám thay đổi công việc hay cách làm. Tự tin trở lại. Nghiêng về thuận.",
  money: "Bắt đầu thoát khỏi khó khăn tài chính, có kế hoạch rõ ràng để trả nợ. Tình hình cải thiện. Nghiêng về thuận.",
  health: "Tinh thần được giải toả, lo âu giảm. Sức khoẻ cải thiện khi bạn thoát khỏi căng thẳng. Tiếp tục chăm sóc bản thân.",
  adv: "Bạn tự do hơn bạn nghĩ. Hãy tiếp tục bước."
});

defCard(58, -2, 0, {
  kw: "lo âu, mất ngủ, ác mộng",
  g: "Chín Kiếm là người ngồi bật dậy giữa đêm vì lo âu: suy nghĩ tiêu cực, mất ngủ, sợ hãi những điều có thể xảy ra. Phần lớn nỗi sợ này lớn hơn thực tế rất nhiều. Điều bạn hỏi đang bị bao trùm bởi lo lắng; câu trả lời lúc này là chưa, nhưng đừng để nỗi sợ quyết định thay bạn.",
  love: "Lo lắng, ghen tuông, suy diễn về người ấy; mất ngủ vì chuyện tình cảm. Có thể bạn đang tự tưởng tượng ra những điều tồi tệ nhất. Câu trả lời nghiêng về chưa thuận — hãy nói chuyện thẳng thay vì nghĩ một mình trong đêm.",
  work: "Áp lực công việc, lo âu về thi cử, sợ thất bại. Bạn đang tự tạo ra áp lực lớn hơn thực tế. Chưa thuận khi tinh thần như vậy; hãy chia nhỏ vấn đề và giải quyết từng phần.",
  money: "Lo lắng về tiền bạc, nợ nần khiến bạn mất ngủ. Nỗi sợ có thể lớn hơn thực tế. Chưa nên quyết định lớn; hãy ngồi xuống xem con số thật và tìm người tư vấn.",
  health: "Mất ngủ, lo âu, trầm cảm, căng thẳng thần kinh. Đây là tín hiệu cần chăm sóc sức khoẻ tinh thần nghiêm túc. Hãy tìm đến chuyên gia nếu tình trạng kéo dài.",
  adv: "Viết nỗi sợ ra giấy vào ban đêm, đọc lại vào buổi sáng. Hầu hết chúng không đáng sợ như bạn nghĩ."
}, {
  kw: "vượt qua lo âu, thấy ánh sáng",
  g: "Chín Kiếm ngược là dần thoát khỏi lo âu, bắt đầu thấy ánh sáng sau đêm dài. Nhưng cũng có thể là nỗi sợ bị đẩy tới đỉnh điểm nếu không được giải quyết. Điều bạn hỏi ở trạng thái lưng chừng: nếu bạn tìm sự giúp đỡ, mọi thứ sẽ khá hơn.",
  love: "Dần bớt lo lắng, bắt đầu tin tưởng lại. Hoặc nỗi lo đạt đỉnh và cần được nói ra ngay. Lưng chừng — nói chuyện thật lòng sẽ giúp mọi thứ nhẹ đi.",
  work: "Áp lực giảm bớt, bạn tìm ra cách xử lý vấn đề. Tự tin dần quay lại. Hãy tiếp tục từng bước.",
  money: "Bắt đầu nhìn thẳng vào vấn đề tài chính và tìm được giải pháp. Nỗi sợ giảm đi. Lưng chừng: hành động sớm sẽ thuận hơn.",
  health: "Giấc ngủ cải thiện, lo âu giảm. Nếu vẫn còn nặng nề, đừng ngại tìm chuyên gia. Sức khoẻ tinh thần đang dần hồi phục.",
  adv: "Bạn không phải một mình vượt qua đêm dài. Hãy nhờ giúp đỡ."
});

defCard(59, -2, 0, {
  kw: "kết thúc đau đớn, chạm đáy",
  g: "Mười Kiếm là điểm chạm đáy: một kết thúc đau đớn, một thất bại không thể cứu vãn. Nhưng hãy nhìn phía chân trời — bình minh đang lên. Điều bạn hỏi, ở dạng hiện tại, đã đi tới hồi kết; câu trả lời là không, nhưng từ đây mọi thứ chỉ có thể đi lên.",
  love: "Mối quan hệ kết thúc, có thể trong đau đớn hoặc phản bội. Không còn gì để níu giữ. Nếu bạn hỏi có quay lại được không, câu trả lời là không — hãy để nó kết thúc và bắt đầu chữa lành.",
  work: "Dự án thất bại, mất việc, hoặc bị đâm sau lưng. Đây là điểm thấp nhất. Chưa thuận để tiếp tục con đường này; hãy chấp nhận kết thúc và chuẩn bị cho khởi đầu mới.",
  money: "Tổn thất tài chính nặng, phá sản, hoặc mất trắng một khoản đầu tư. Không nên cố gỡ. Cắt lỗ ngay và lập lại kế hoạch từ đầu.",
  health: "Kiệt sức hoàn toàn, có thể là bệnh nặng hoặc chấn thương. Cần nghỉ ngơi và điều trị nghiêm túc. Hãy đi khám ngay nếu có dấu hiệu bất thường.",
  adv: "Chấp nhận rằng điều này đã kết thúc. Đáy là nơi duy nhất mà mọi hướng đi đều là đi lên."
}, {
  kw: "hồi sinh, đứng dậy",
  g: "Mười Kiếm ngược là bắt đầu đứng dậy sau khi chạm đáy. Điều tồi tệ nhất đã qua, bạn đang hồi phục từng chút một. Điều bạn hỏi ở thế lưng chừng: không còn tệ hơn được nữa, và hướng đi lên đã mở ra.",
  love: "Hồi phục sau chia tay đau đớn, dần tìm lại chính mình. Nỗi đau vẫn còn nhưng không còn chi phối mọi suy nghĩ của bạn nữa. Lưng chừng — chưa nên vội vã yêu tiếp, nhưng trái tim đang lành lại.",
  work: "Đứng dậy sau thất bại, tìm được hướng đi mới. Bài học đắt giá trở thành nền tảng. Hãy bắt đầu lại từ những bước nhỏ.",
  money: "Bắt đầu phục hồi sau tổn thất. Chậm nhưng chắc. Lưng chừng: cẩn trọng và kiên nhẫn.",
  health: "Sức khoẻ hồi phục dần sau giai đoạn tồi tệ. Tiếp tục điều trị và nghỉ ngơi. Đừng bỏ cuộc.",
  adv: "Bạn đã sống sót qua điều tồi tệ nhất. Giờ là lúc đứng dậy."
});

defCard(60, 1, -1, {
  kw: "tò mò, học hỏi, tin tức",
  g: "Tiểu Đồng Kiếm là sự tò mò, ham học hỏi và tinh thần cảnh giác. Có thể bạn sắp nhận được tin tức, hoặc cần thu thập thêm thông tin trước khi hành động. Điều bạn hỏi có tín hiệu tích cực, câu trả lời nghiêng về có nếu bạn tìm hiểu kỹ.",
  love: "Muốn tìm hiểu thêm về người ấy, nhắn tin, trò chuyện nhiều. Mối quan hệ đang ở giai đoạn làm quen, thăm dò. Nghiêng về có, nhưng hãy quan sát kỹ trước khi đặt trọn niềm tin.",
  work: "Học điều mới, nghiên cứu, thu thập dữ liệu. Tốt cho thi cử, học tập, viết lách, công nghệ. Nghiêng về có — hãy chuẩn bị kỹ và đặt nhiều câu hỏi.",
  money: "Tìm hiểu cơ hội tài chính mới, nghiên cứu trước khi đầu tư. Có thể có tin tức về tiền bạc. Nghiêng về thuận nếu bạn làm bài tập kỹ trước khi xuống tiền.",
  health: "Tìm hiểu về sức khoẻ, đi khám để có thông tin chính xác. Đầu óc tỉnh táo. Tốt cho việc bắt đầu thói quen mới có kế hoạch.",
  adv: "Hỏi nhiều, học nhiều, quan sát kỹ trước khi hành động."
}, {
  kw: "buôn chuyện, thông tin sai",
  g: "Tiểu Đồng Kiếm ngược là buôn chuyện, tin đồn, thông tin sai lệch hoặc nói mà không nghĩ. Có thể bạn đang bị theo dõi, hoặc chính bạn đang dò xét người khác quá mức. Điều bạn hỏi chưa thuận khi thông tin còn chưa chính xác.",
  love: "Tin đồn, hiểu lầm vì lời nói, hoặc người ấy nói một đằng làm một nẻo. Những tin nhắn, lời kể qua trung gian đang khiến bạn nghi ngờ thay vì hiểu nhau hơn. Chưa thuận; đừng tin những gì nghe qua người khác.",
  work: "Tin đồn nơi công sở, nói năng thiếu suy nghĩ gây rắc rối, thông tin sai. Một câu nói vội có thể bị lan truyền và hiểu sai theo hướng bất lợi cho bạn. Chưa thuận; hãy kiểm chứng trước khi nói hoặc làm.",
  money: "Tin tức tài chính sai lệch, lời khuyên đầu tư không đáng tin. Chưa nên xuống tiền theo tin đồn. Tự nghiên cứu kỹ.",
  health: "Tự chẩn đoán qua mạng dễ gây lo lắng thái quá. Đầu óc căng thẳng. Hãy hỏi ý kiến chuyên gia.",
  adv: "Nghĩ trước khi nói. Kiểm chứng trước khi tin."
});

defCard(61, 1, -1, {
  kw: "hành động nhanh, quyết liệt",
  g: "Hiệp Sĩ Kiếm là người lao về phía trước với thanh gươm tuốt trần: nhanh, quyết liệt, thẳng thắn. Mọi thứ đang diễn ra với tốc độ cao. Điều bạn hỏi có tiến triển nhanh, câu trả lời nghiêng về có — miễn là bạn không lao đi mà quên nhìn đường.",
  love: "Một người thẳng thắn, chủ động theo đuổi, hoặc mối quan hệ tiến triển rất nhanh. Có thể có những cuộc tranh luận nảy lửa. Nghiêng về có, nhưng hãy chú ý lời nói để không làm tổn thương nhau.",
  work: "Hành động nhanh, tranh luận sắc bén, bảo vệ quan điểm mạnh mẽ. Tốt cho việc cần tốc độ và sự quyết đoán. Nghiêng về có; chỉ cần kiểm tra lại chi tiết trước khi nộp.",
  money: "Quyết định tài chính nhanh, nắm bắt cơ hội kịp thời. Có thể có lợi nếu bạn đã nghiên cứu trước. Nghiêng về thuận, nhưng tránh vội vàng khi chưa nắm rõ rủi ro.",
  health: "Năng lượng cao, nhưng dễ chấn thương do vội vàng. Cẩn thận khi di chuyển, lái xe. Đừng tập luyện quá sức.",
  adv: "Hành động nhanh nhưng không hấp tấp. Tốc độ chỉ có ích khi đi đúng hướng."
}, {
  kw: "hấp tấp, nóng nảy",
  g: "Hiệp Sĩ Kiếm ngược là hấp tấp, nóng nảy, nói trước nghĩ sau. Bạn có thể đang lao vào mà chưa suy nghĩ kỹ, hoặc gây xung đột không cần thiết. Điều bạn hỏi chưa thuận vì sự vội vàng.",
  love: "Lời nói nóng nảy làm tổn thương, quyết định vội trong tình cảm. Một bên đang muốn đẩy nhanh mọi thứ trong khi bên kia chưa sẵn sàng. Chưa thuận; bình tĩnh lại trước khi nói hay làm gì.",
  work: "Làm ẩu, xung đột với đồng nghiệp, kế hoạch thiếu chuẩn bị. Tốc độ đang được đặt lên trên chất lượng và cái giá là những lỗi phải làm lại. Chưa thuận; chậm lại và kiểm tra kỹ.",
  money: "Đầu tư vội vàng, chi tiêu bốc đồng. Rủi ro mất tiền cao. Chưa nên quyết định lúc này.",
  health: "Dễ tai nạn, chấn thương do bất cẩn. Căng thẳng, nóng giận ảnh hưởng huyết áp. Cẩn thận khi di chuyển.",
  adv: "Chậm lại. Hít thở sâu trước khi nói hay làm."
});

defCard(62, 1, -1, {
  kw: "sắc sảo, độc lập, thẳng thắn",
  g: "Nữ Hoàng Kiếm là trí tuệ sắc sảo, sự độc lập và thẳng thắn. Bạn nhìn thấu vấn đề, không để cảm xúc che mắt. Điều bạn hỏi thuận nếu bạn dùng lý trí, đặt ranh giới rõ ràng và nói thật.",
  love: "Mối quan hệ cần sự thẳng thắn và rõ ràng. Có thể bạn đang độc thân, độc lập và không vội vàng. Nghiêng về có nếu người kia tôn trọng ranh giới của bạn; nếu không, đừng ngại nói không.",
  work: "Tư duy sắc bén, quyết định khách quan, giao tiếp rõ ràng. Tốt cho quản lý, phân tích, pháp lý, viết lách. Nghiêng về có — bạn được tôn trọng nhờ năng lực.",
  money: "Quản lý tài chính thông minh, không bị cảm xúc chi phối. Đưa ra quyết định dựa trên số liệu. Nghiêng về thuận.",
  health: "Đầu óc minh mẫn, biết cách chăm sóc bản thân có kỷ luật. Chú ý căng thẳng do suy nghĩ nhiều. Tìm hiểu kỹ trước mỗi quyết định điều trị.",
  adv: "Nói thật, đặt ranh giới rõ ràng, và tin vào phán đoán của mình."
}, {
  kw: "lạnh lùng, cay nghiệt",
  g: "Nữ Hoàng Kiếm ngược là lạnh lùng, cay nghiệt hoặc dùng lời nói làm tổn thương. Có thể bạn đang dựng tường cao để bảo vệ mình sau tổn thương cũ. Điều bạn hỏi gặp trở ngại vì sự khép kín hoặc lời nói thiếu tế nhị.",
  love: "Lạnh lùng, chỉ trích, hoặc khép lòng vì sợ tổn thương. Mối quan hệ thiếu sự ấm áp. Chưa thuận; hãy mềm mỏng hơn.",
  work: "Chỉ trích gay gắt, thiếu tế nhị, gây mâu thuẫn. Có thể bạn hoặc cấp trên đang dùng sự thẳng thắn để che giấu sự khó chịu cá nhân. Chưa thuận; cần cân bằng giữa thẳng thắn và tôn trọng.",
  money: "Quá khắt khe hoặc quyết định tài chính vì tự ái. Việc cắt đứt hay từ chối một khoản hợp tác chỉ để chứng minh mình đúng có thể khiến bạn thiệt. Chưa thuận; cân nhắc lại một cách khách quan.",
  health: "Căng thẳng tích tụ, cảm xúc bị dồn nén. Cần giải toả. Hãy chia sẻ với người tin cậy.",
  adv: "Sự thẳng thắn không cần phải sắc nhọn. Hãy nói thật bằng sự tử tế."
});

defCard(63, 1, -1, {
  kw: "lý trí, công bằng, quyền lực trí tuệ",
  g: "Vua Kiếm là lý trí, sự công bằng và quyền lực đến từ trí tuệ. Bạn đưa ra quyết định dựa trên logic và nguyên tắc, không để cảm xúc chi phối. Điều bạn hỏi thuận nếu bạn giữ sự khách quan và làm mọi thứ rõ ràng, minh bạch.",
  love: "Người ấy chín chắn, lý trí, có thể hơi nghiêm khắc nhưng đáng tin cậy. Mối quan hệ cần sự rõ ràng và cam kết cụ thể. Nghiêng về có nếu hai người cùng nói chuyện thẳng thắn về tương lai.",
  work: "Quyết định sáng suốt, lãnh đạo bằng trí tuệ. Rất tốt cho pháp lý, hợp đồng, quản lý, tư vấn chuyên môn. Nghiêng về có — bạn có đủ năng lực để xử lý.",
  money: "Tài chính được quản lý bằng lý trí và kế hoạch rõ ràng. Tốt cho việc ký hợp đồng, tham khảo chuyên gia. Nghiêng về thuận.",
  health: "Tìm đến chuyên gia, bác sĩ giỏi, chẩn đoán chính xác. Đầu óc minh mẫn. Tuân thủ điều trị có kỷ luật.",
  adv: "Quyết định bằng lý trí, hành động bằng nguyên tắc. Minh bạch với mọi người."
}, {
  kw: "độc đoán, lạm dụng quyền lực",
  g: "Vua Kiếm ngược là độc đoán, lạnh lùng, hoặc dùng trí tuệ để thao túng. Có thể có người đang lạm dụng quyền lực, hoặc bạn đang quá cứng nhắc. Điều bạn hỏi gặp trở ngại vì sự thiếu công bằng hoặc thiếu linh hoạt.",
  love: "Người ấy kiểm soát, lạnh lùng, áp đặt quan điểm. Mối quan hệ thiếu sự đồng cảm. Chưa thuận; cần sự tôn trọng hai chiều.",
  work: "Sếp độc đoán, quyết định bất công, hoặc tranh chấp pháp lý. Quyền lực đang bị dùng sai cách và bạn dễ rơi vào thế yếu nếu không có chứng cứ. Chưa thuận; hãy lưu lại bằng chứng và tìm tư vấn.",
  money: "Bị ép giá, hợp đồng bất lợi, hoặc tranh chấp pháp lý về tiền. Chưa nên ký kết. Đọc kỹ mọi điều khoản.",
  health: "Căng thẳng vì áp lực, đau đầu. Có thể chẩn đoán chưa chính xác. Hỏi ý kiến thứ hai nếu cần.",
  adv: "Lý trí cần đi kèm lòng trắc ẩn. Đừng để quyền lực làm mất sự công bằng."
});
// ================= BỘ TIỀN (Đất · tiền bạc, công việc, vật chất) — id 64–77 =================
defCard(64, 2, -1, {
  kw: "cơ hội vật chất, hạt giống thịnh vượng",
  g: "Át Tiền là đồng tiền vàng được trao tận tay: một cơ hội cụ thể, hữu hình về tiền bạc, công việc hay sự ổn định. Đây là hạt giống của thịnh vượng lâu dài nếu bạn biết gieo đúng chỗ. Điều bạn hỏi có nền tảng rất vững, câu trả lời nghiêng mạnh về có.",
  love: "Mối quan hệ có nền tảng thực tế và bền vững, hướng tới sự ổn định lâu dài. Người ấy nghiêm túc, thể hiện tình cảm bằng hành động cụ thể hơn là lời nói. Nghiêng về có — đặc biệt nếu bạn hỏi về một mối quan hệ nghiêm túc, có tương lai.",
  work: "Một lời mời làm việc, một hợp đồng, một cơ hội kinh doanh hay thăng tiến cụ thể đang xuất hiện. Đây là thời điểm vàng để bắt đầu dự án có tiềm năng sinh lời. Câu trả lời là có — hãy nắm lấy và đầu tư công sức nghiêm túc.",
  money: "Tiền về, thu nhập mới, cơ hội đầu tư tốt hoặc một khoản lợi bất ngờ. Rất thuận cho tiết kiệm, mua tài sản, khởi đầu một kế hoạch tài chính dài hạn. Nghiêng mạnh về có, miễn là bạn gieo tiền vào nơi có giá trị thật.",
  health: "Sức khoẻ tốt, thể chất vững vàng. Đây là lúc tốt để bắt đầu chế độ ăn uống lành mạnh, tập luyện đều đặn hay khám tổng quát. Đầu tư cho sức khoẻ lúc này sẽ mang lại lợi ích lâu dài.",
  adv: "Nắm lấy cơ hội cụ thể trước mắt và gieo hạt cho tương lai. Bắt đầu nhỏ, nhưng bắt đầu ngay."
}, {
  kw: "lỡ cơ hội, kế hoạch hụt",
  g: "Át Tiền ngược là cơ hội vật chất bị bỏ lỡ, kế hoạch tài chính thiếu cơ sở, hoặc tiền đến rồi đi rất nhanh. Nền móng chưa đủ chắc để xây tiếp. Điều bạn hỏi chưa thuận ở thời điểm này; bạn cần chuẩn bị kỹ hơn trước khi bước tới.",
  love: "Mối quan hệ thiếu nền tảng thực tế, hoặc có vấn đề về tiền bạc chen vào giữa hai người. Người ấy có thể chưa thật sự nghiêm túc hay chưa sẵn sàng cam kết. Câu trả lời nghiêng về chưa; hãy quan sát hành động thay vì lời hứa.",
  work: "Lời mời làm việc không thành, dự án bị huỷ, hoặc một cơ hội tốt bị lỡ vì chậm chân. Bạn có thể chưa chuẩn bị đủ hồ sơ, kỹ năng hay kế hoạch. Chưa thuận lúc này; hãy chuẩn bị kỹ hơn để sẵn sàng cho cơ hội tiếp theo.",
  money: "Mất tiền, đầu tư sai, chi tiêu không kiểm soát, hoặc một khoản thu dự kiến bị trễ. Kế hoạch tài chính đang thiếu cơ sở thực tế. Chưa nên xuống tiền; hãy xem lại ngân sách ngay.",
  health: "Sức khoẻ bị xem nhẹ, thói quen sinh hoạt thiếu lành mạnh đang âm thầm tích tụ. Cơ thể cần được quan tâm trước khi có vấn đề lớn. Hãy chú ý ăn uống, nghỉ ngơi và đi khám định kỳ.",
  adv: "Đừng xây nhà trên cát. Củng cố nền móng trước khi mở rộng."
});

defCard(65, 0, -1, {
  kw: "cân bằng, xoay xở",
  g: "Hai Tiền là người tung hứng hai đồng xu: cân bằng giữa nhiều trách nhiệm, xoay xở linh hoạt trong hoàn cảnh luôn thay đổi. Bạn đang làm được, nhưng cần khéo léo để không đánh rơi thứ gì. Điều bạn hỏi ở thế lưng chừng: kết quả phụ thuộc vào khả năng sắp xếp ưu tiên của bạn.",
  love: "Bạn đang cân bằng giữa tình cảm và công việc, hoặc phân vân giữa hai lựa chọn. Mối quan hệ cần thời gian và sự quan tâm đều đặn chứ không chỉ lúc rảnh. Lưng chừng — nếu bạn thật sự dành chỗ cho người ấy, mọi thứ sẽ ổn.",
  work: "Làm nhiều việc cùng lúc, xoay xở giữa các dự án hoặc giữa việc chính và việc phụ. Linh hoạt là điểm mạnh của bạn lúc này. Lưng chừng: hãy sắp xếp ưu tiên rõ ràng để không bị quá tải.",
  money: "Tài chính cần cân đối khéo léo, thu chi sát nút. Có thể phải xoay tiền giữa các khoản hoặc chờ một khoản thu để trả khoản chi. Lưng chừng: lập ngân sách chi tiết và tránh phát sinh chi tiêu mới.",
  health: "Bạn đang cân bằng giữa làm việc và nghỉ ngơi, nhưng khá mong manh. Cơ thể ổn nhưng dễ mệt nếu ôm quá nhiều việc. Hãy giữ nhịp sống đều đặn và ngủ đúng giờ.",
  adv: "Sắp xếp ưu tiên. Bạn không cần làm mọi thứ cùng lúc."
}, {
  kw: "mất cân bằng, quá tải",
  g: "Hai Tiền ngược là mất cân bằng, quá tải và đánh rơi những thứ quan trọng. Bạn đang ôm quá nhiều việc mà không kiểm soát được. Điều bạn hỏi gặp trở ngại vì sự rối loạn trong cách sắp xếp thời gian và nguồn lực.",
  love: "Bạn không dành đủ thời gian cho mối quan hệ, bỏ bê người ấy vì công việc hay những lo toan khác. Người kia có thể cảm thấy mình là lựa chọn thứ yếu. Chưa thuận; hãy sắp xếp lại ưu tiên trước khi mất điều quan trọng.",
  work: "Quá tải, trễ hạn, làm nhiều mà không hiệu quả. Bạn đang cố giữ mọi quả bóng trên không và bắt đầu đánh rơi vài quả. Chưa thuận; hãy cắt bớt việc và tập trung vào điều quan trọng nhất.",
  money: "Chi tiêu vượt thu, nợ nần chồng chất, tài chính rối loạn vì không có kế hoạch. Việc lấy khoản này bù khoản kia không còn bền. Chưa thuận; ngồi xuống lập lại ngân sách ngay.",
  health: "Kiệt sức vì ôm đồm, stress kéo dài ảnh hưởng tới giấc ngủ và tiêu hoá. Cơ thể đang báo hiệu cần giảm tải. Hãy nghỉ ngơi và chăm sóc bản thân trước khi đổ bệnh.",
  adv: "Buông bớt vài quả bóng. Tập trung vào những gì thật sự quan trọng."
});

defCard(66, 2, -1, {
  kw: "hợp tác, tay nghề, được công nhận",
  g: "Ba Tiền là tay nghề được công nhận và sự hợp tác hiệu quả. Công sức và kỹ năng của bạn đang được đánh giá cao, và làm việc nhóm mang lại kết quả tốt. Điều bạn hỏi rất thuận, đặc biệt nếu nó liên quan tới công việc, học tập hay một dự án chung.",
  love: "Mối quan hệ được xây dựng trên sự hợp tác và cùng nhau cố gắng. Hai người cùng vun đắp cho tương lai, từ những kế hoạch nhỏ tới những dự định lớn. Nghiêng về có — tình cảm đang lớn lên từ những việc làm chung.",
  work: "Được công nhận năng lực, làm việc nhóm hiệu quả, dự án tiến triển tốt. Rất thuận cho thi cử, phỏng vấn, học nghề hay trình bày sản phẩm. Câu trả lời là có — hãy tiếp tục trau dồi và phối hợp.",
  money: "Thu nhập tăng nhờ kỹ năng, hợp tác kinh doanh thuận lợi. Đầu tư vào học tập hay nâng cao tay nghề lúc này rất đáng. Nghiêng mạnh về thuận.",
  health: "Sức khoẻ tốt khi có kế hoạch rõ ràng và đội ngũ hỗ trợ như bác sĩ, huấn luyện viên. Kiên trì sẽ thấy kết quả. Rất thuận cho việc điều trị theo phác đồ.",
  adv: "Làm việc chăm chỉ, học hỏi từ người giỏi và phối hợp với đồng đội."
}, {
  kw: "thiếu phối hợp, làm ẩu",
  g: "Ba Tiền ngược là thiếu phối hợp, làm việc cẩu thả hoặc không được công nhận. Có thể nhóm đang mâu thuẫn, hoặc công sức của bạn bị bỏ qua. Điều bạn hỏi gặp trở ngại vì chất lượng hoặc sự hợp tác chưa tốt.",
  love: "Hai người không cùng hướng, một bên cố gắng nhiều hơn còn bên kia thờ ơ. Những kế hoạch chung thường bị bỏ dở. Chưa thuận; cần ngồi lại để cùng nhau vun đắp.",
  work: "Làm nhóm kém, mâu thuẫn, sản phẩm chất lượng thấp hoặc công sức không được ghi nhận. Có thể bạn bị người khác nhận công. Chưa thuận; cần cải thiện kỹ năng, giao tiếp và lưu lại bằng chứng đóng góp.",
  money: "Hợp tác kinh doanh trục trặc, thu nhập không tương xứng với công sức. Chi phí phát sinh vì làm đi làm lại. Chưa thuận; hãy xem lại cách làm và điều khoản hợp tác.",
  health: "Điều trị không theo kế hoạch, bỏ dở giữa chừng hoặc thiếu sự phối hợp với bác sĩ. Kết quả vì thế chậm hơn mong đợi. Cần kiên trì hơn và tìm chuyên gia phù hợp.",
  adv: "Làm tốt từng việc nhỏ. Chất lượng quan trọng hơn tốc độ."
});

defCard(67, 0, -1, {
  kw: "giữ chặt, an toàn, kiểm soát",
  g: "Bốn Tiền là người ôm chặt đồng tiền: tiết kiệm, giữ gìn, muốn kiểm soát và an toàn. Bạn đã có những thứ quý giá và sợ mất chúng. Điều bạn hỏi ở thế lưng chừng: ổn định nhưng khó tiến xa nếu bạn cứ giữ chặt mọi thứ.",
  love: "Mối quan hệ ổn định nhưng thiếu sự cởi mở, có thể có sự chiếm hữu hay ghen tuông. Bạn sợ mất nên giữ chặt, vô tình làm người kia ngột ngạt. Lưng chừng — cần tin tưởng và cho nhau không gian để tình cảm thở.",
  work: "Công việc ổn định, an toàn, nhưng bạn ngại thay đổi hay chấp nhận rủi ro. Bạn giữ được vị trí nhưng khó bứt phá. Lưng chừng: nếu muốn tiến xa, bạn cần dám thử điều mới.",
  money: "Tiết kiệm tốt, tài chính an toàn. Nhưng quá chặt chẽ có thể làm bạn bỏ lỡ cơ hội sinh lời. Lưng chừng: giữ quỹ dự phòng và cân nhắc những kênh đầu tư an toàn.",
  health: "Sức khoẻ ổn định, nhưng dễ căng thẳng do lo lắng, sợ mất mát. Cơ thể có thể cứng nhắc, đau vai gáy vì kìm nén. Hãy thư giãn và vận động nhiều hơn.",
  adv: "An toàn là tốt, nhưng đừng để nỗi sợ mất mát khiến bạn đóng cửa với mọi cơ hội."
}, {
  kw: "tham lam hoặc tiêu hoang",
  g: "Bốn Tiền ngược là hai thái cực: quá keo kiệt, tham lam, hoặc buông lỏng tiêu hoang. Sự kiểm soát bị mất cân bằng. Điều bạn hỏi gặp trở ngại vì cách bạn giữ hoặc buông tài sản, cảm xúc và các mối quan hệ.",
  love: "Chiếm hữu, kiểm soát, hoặc mối quan hệ bị ảnh hưởng nặng bởi chuyện tiền bạc. Một bên có thể tính toán quá kỹ với bên kia. Chưa thuận; cần xây dựng lại sự tin tưởng.",
  work: "Bám víu vị trí vì sợ mất, hoặc mất vị trí vì không chịu linh hoạt. Có thể bạn đang giữ thông tin, không chia sẻ với đồng đội. Chưa thuận; cần cởi mở hơn.",
  money: "Tiêu hoang sau thời gian dài nhịn nhục, hoặc keo kiệt đến mức bỏ lỡ cơ hội. Có thể có mất mát do giữ sai chỗ. Chưa thuận; cân bằng lại thu chi.",
  health: "Căng thẳng vì tiền, lo âu, khó ngủ. Cơ thể mệt mỏi vì đầu óc không lúc nào thư giãn. Hãy buông bớt lo lắng và chăm sóc tinh thần.",
  adv: "Tìm điểm cân bằng giữa giữ và cho. Tiền phải được lưu thông mới sinh lời."
});

defCard(68, -2, 1, {
  kw: "khó khăn, thiếu thốn, bị bỏ rơi",
  g: "Năm Tiền là hai người đi trong bão tuyết bên ngoài ô cửa nhà thờ sáng đèn: khó khăn, thiếu thốn, cảm giác bị bỏ rơi. Nhưng sự giúp đỡ đang ở rất gần nếu bạn chịu nhìn lên và lên tiếng. Điều bạn hỏi đang gặp trở ngại lớn; câu trả lời lúc này là chưa.",
  love: "Cảm giác cô đơn, bị bỏ rơi, hoặc mối quan hệ gặp khó khăn về tài chính. Có thể hai người đang cùng vượt khó. Câu trả lời nghiêng về chưa thuận — nhưng nếu hai người nắm tay nhau, bão rồi sẽ qua.",
  work: "Mất việc, thiếu cơ hội, bị gạt ra ngoài. Đây là giai đoạn khó khăn về sự nghiệp. Chưa thuận; hãy chủ động tìm sự giúp đỡ và mạng lưới hỗ trợ.",
  money: "Thiếu tiền, nợ nần, khó khăn tài chính nghiêm trọng. Chưa nên đầu tư hay chi tiêu lớn. Hãy tìm sự hỗ trợ và cắt giảm mọi khoản không cần thiết.",
  health: "Sức khoẻ yếu, có thể bệnh kéo dài hoặc thiếu chăm sóc. Hãy đi khám và đừng ngại nhờ giúp đỡ. Chăm sóc bản thân là ưu tiên số một.",
  adv: "Đừng chịu đựng một mình. Sự giúp đỡ luôn ở gần — hãy lên tiếng."
}, {
  kw: "vượt khó, hồi phục",
  g: "Năm Tiền ngược là vượt qua giai đoạn khó khăn, tìm được sự giúp đỡ và bắt đầu hồi phục. Bão tuyết đã dịu, ánh sáng đang ở phía trước. Điều bạn hỏi đang chuyển biến tích cực, câu trả lời nghiêng về có.",
  love: "Hai người vượt qua khó khăn cùng nhau, hoặc bạn thoát khỏi cảm giác cô đơn. Sự gắn kết được củng cố sau thử thách. Câu trả lời nghiêng về có.",
  work: "Tìm được việc mới, cơ hội quay trở lại sau thời gian chật vật. Bạn được ai đó giúp đỡ hoặc giới thiệu. Nghiêng về thuận — hãy nắm lấy cơ hội này.",
  money: "Tài chính hồi phục, trả được nợ hoặc nhận được hỗ trợ đúng lúc. Tình hình dần ổn định. Nghiêng về thuận, nhưng vẫn nên chi tiêu tiết kiệm.",
  health: "Sức khoẻ hồi phục, được chăm sóc tốt hơn. Tinh thần khá lên rõ rệt. Tiếp tục kiên trì điều trị.",
  adv: "Đón nhận sự giúp đỡ và tiếp tục bước. Điều tồi tệ nhất đã qua."
});

defCard(69, 1, -1, {
  kw: "cho và nhận, hào phóng",
  g: "Sáu Tiền là sự cân bằng giữa cho và nhận: hào phóng, chia sẻ, giúp đỡ và được giúp đỡ. Bạn có thể đang ở vị trí người cho hoặc người nhận. Điều bạn hỏi thuận, câu trả lời nghiêng về có — đặc biệt khi có sự giúp đỡ từ người khác.",
  love: "Mối quan hệ có sự cho và nhận công bằng, hai người quan tâm lẫn nhau. Người ấy thể hiện tình cảm bằng sự chăm sóc cụ thể. Nghiêng về có — tình cảm đang được đáp lại.",
  work: "Nhận được hỗ trợ, tăng lương, thưởng, hoặc có người đỡ đầu dẫn dắt. Đây cũng là lúc bạn nên giúp đỡ người mới. Nghiêng về có; hãy biết ơn và lan toả sự hỗ trợ.",
  money: "Nhận được tiền, được trả nợ, hoặc có khoản hỗ trợ đúng lúc. Thuận cho việc từ thiện hay giúp đỡ người thân trong khả năng. Nghiêng về có.",
  health: "Nhận được sự chăm sóc tốt, tìm được bác sĩ phù hợp. Sức khoẻ cải thiện. Giúp đỡ người khác cũng giúp tinh thần bạn tốt hơn.",
  adv: "Cho đi khi có thể, nhận lấy khi cần. Dòng chảy công bằng giữ mọi thứ cân bằng."
}, {
  kw: "cho nhận bất công, nợ nần",
  g: "Sáu Tiền ngược là sự cho và nhận mất cân bằng: bị lợi dụng, cho đi có điều kiện, hoặc nợ nần. Có thể có người đang kiểm soát bạn bằng tiền hay bằng ơn nghĩa. Điều bạn hỏi gặp trở ngại vì sự thiếu công bằng.",
  love: "Một bên cho quá nhiều, bên kia chỉ nhận. Hoặc tình cảm đi kèm điều kiện, tính toán. Chưa thuận; cần xem lại sự công bằng trong mối quan hệ.",
  work: "Không được trả công xứng đáng, bị lợi dụng hoặc bị ép làm thêm không công. Sự hỗ trợ bạn nhận có thể đi kèm ràng buộc. Chưa thuận; hãy lên tiếng bảo vệ quyền lợi.",
  money: "Nợ nần, cho vay không đòi được, hoặc bị lừa. Khoản hỗ trợ có thể không như hứa hẹn. Chưa thuận; không cho vay lúc này.",
  health: "Chăm sóc người khác quá sức mà quên bản thân. Cơ thể mệt mỏi, dễ ốm. Cần cân bằng lại và nghỉ ngơi đủ.",
  adv: "Cho đi không có nghĩa là để bị lợi dụng. Đặt ranh giới rõ ràng."
});

defCard(70, 1, -1, {
  kw: "kiên nhẫn, chờ thu hoạch",
  g: "Bảy Tiền là người nông dân đứng nhìn vườn cây đang lớn: kiên nhẫn, đầu tư dài hạn, đánh giá lại những gì mình đã gieo. Kết quả đang tới nhưng chưa phải ngay bây giờ. Điều bạn hỏi nghiêng về có, nhưng cần thêm thời gian và sự kiên trì.",
  love: "Mối quan hệ cần thời gian để lớn lên, và bạn đang đánh giá xem có đáng đầu tư tiếp không. Những gì bạn vun đắp đang dần có kết quả. Nghiêng về có nếu bạn thấy tình cảm phát triển, dù chậm.",
  work: "Dự án đang tiến triển, cần kiên nhẫn chờ kết quả. Đây cũng là lúc đánh giá lại để điều chỉnh cho hiệu quả hơn. Nghiêng về có — thành quả sẽ đến nếu bạn tiếp tục chăm sóc.",
  money: "Đầu tư dài hạn đang sinh lời chậm. Đừng rút vốn chỉ vì nóng ruột. Nghiêng về thuận nếu bạn kiên nhẫn và định kỳ xem lại danh mục.",
  health: "Kết quả điều trị hay tập luyện đến chậm nhưng chắc. Tiếp tục kiên trì. Đánh giá lại phương pháp nếu sau một thời gian vẫn chưa thấy tiến triển.",
  adv: "Cây cần thời gian để ra quả. Kiên nhẫn và tiếp tục chăm sóc."
}, {
  kw: "nóng vội, đầu tư sai",
  g: "Bảy Tiền ngược là nóng vội muốn có kết quả ngay, hoặc nhận ra mình đã đầu tư sai chỗ. Công sức bỏ ra không tương xứng với thành quả. Điều bạn hỏi chưa thuận; bạn cần xem lại hướng đi.",
  love: "Đầu tư tình cảm mà không được đáp lại, hoặc nóng vội đòi kết quả khi mối quan hệ còn non. Bạn có thể đang tự hỏi mình có phí thời gian không. Chưa thuận; hãy nhìn thẳng vào những gì thật sự đang có.",
  work: "Làm nhiều mà không thấy kết quả, dự án đi sai hướng hoặc bạn muốn bỏ ngang. Có thể mục tiêu ban đầu không còn phù hợp mà bạn chưa chịu thừa nhận. Chưa thuận; cần đánh giá lại trước khi dồn thêm sức.",
  money: "Đầu tư thua lỗ, rút vốn quá sớm, hoặc bỏ tiền vào nơi không sinh lời. Sự nóng ruột muốn thấy lãi nhanh đang khiến bạn ra quyết định thiếu tính toán. Chưa thuận; hãy xem lại chiến lược và cắt những khoản không hiệu quả.",
  health: "Nóng vội muốn thấy kết quả nhanh dẫn tới bỏ cuộc hoặc tập quá sức. Cơ thể cần thời gian. Hãy kiên nhẫn hơn và đổi phương pháp nếu cần.",
  adv: "Nếu vườn không ra quả, hãy xem lại đất chứ đừng chỉ trách trời."
});

defCard(71, 1, -1, {
  kw: "chăm chỉ, rèn luyện tay nghề",
  g: "Tám Tiền là người thợ tỉ mỉ đục từng đồng xu: chăm chỉ, tập trung, rèn luyện tay nghề. Mỗi nỗ lực nhỏ đang tích luỹ thành thành quả lớn. Điều bạn hỏi nghiêng về có, nhờ sự cần cù và chuyên tâm của bạn.",
  love: "Bạn đang nỗ lực vun đắp mối quan hệ, từng chút một. Tình cảm được xây dựng bằng sự chăm sóc đều đặn chứ không phải những khoảnh khắc bốc đồng. Nghiêng về có.",
  work: "Học nghề, rèn luyện kỹ năng, làm việc chăm chỉ và tỉ mỉ. Rất tốt cho học tập, thi cử, công việc chuyên môn. Câu trả lời là có — chăm chỉ sẽ được đền đáp.",
  money: "Thu nhập tăng dần nhờ tay nghề và sự chăm chỉ. Tiền đến từ công sức thật chứ không phải may mắn. Nghiêng về thuận.",
  health: "Kỷ luật trong ăn uống và tập luyện mang lại kết quả rõ ràng. Kiên trì từng ngày. Sức khoẻ cải thiện đều.",
  adv: "Làm tốt việc trước mắt, mỗi ngày một chút. Sự thành thạo đến từ lặp lại."
}, {
  kw: "cầu toàn, làm qua loa",
  g: "Tám Tiền ngược là làm việc qua loa, thiếu tập trung, hoặc cầu toàn quá mức đến kiệt sức. Kỹ năng chưa đủ hoặc bạn đang làm việc không có mục tiêu. Điều bạn hỏi chưa thuận khi chất lượng chưa đạt.",
  love: "Thiếu nỗ lực vun đắp, hoặc quá khắt khe, đòi hỏi người ấy phải hoàn hảo. Mối quan hệ trở nên đơn điệu hoặc căng thẳng. Chưa thuận; hãy đầu tư thời gian thật sự.",
  work: "Làm ẩu, thiếu kỹ năng, hoặc cày quá sức mà không hiệu quả. Công việc lặp lại khiến bạn chán. Chưa thuận; cần học thêm và làm có kế hoạch.",
  money: "Thu nhập không tăng dù làm nhiều giờ. Có thể bạn đang định giá công sức của mình quá thấp. Chưa thuận; hãy xem lại giá trị công việc và cách kiếm tiền.",
  health: "Kiệt sức vì làm việc quá nhiều, hoặc lười vận động vì bận rộn. Cơ thể mất cân bằng. Hãy dành thời gian nghỉ ngơi và vận động nhẹ mỗi ngày.",
  adv: "Làm ít nhưng làm kỹ. Nghỉ ngơi cũng là một phần của rèn luyện."
});

defCard(72, 2, -1, {
  kw: "tự chủ, sung túc, thành quả",
  g: "Chín Tiền là người phụ nữ thanh lịch đứng giữa khu vườn sung túc: tự chủ, độc lập và tận hưởng thành quả của chính mình. Bạn đã làm việc chăm chỉ và giờ là lúc thu hoạch. Điều bạn hỏi rất thuận, câu trả lời nghiêng mạnh về có.",
  love: "Bạn độc lập, tự tin và biết giá trị của mình. Mối quan hệ lành mạnh, không phụ thuộc, hai người tôn trọng không gian riêng của nhau. Nghiêng về có — tình yêu đến khi bạn đã đủ đầy với chính mình.",
  work: "Thành công nhờ nỗ lực bản thân, tự chủ trong công việc. Rất tốt cho kinh doanh riêng, làm tự do hay vị trí cần sự độc lập. Câu trả lời là có.",
  money: "Tài chính dư dả, độc lập về tiền bạc. Bạn được hưởng thụ thành quả mà không lo lắng. Nghiêng mạnh về có.",
  health: "Sức khoẻ tốt, cuộc sống cân bằng và biết tận hưởng. Bạn chăm sóc bản thân chu đáo. Tiếp tục duy trì nhịp sống này.",
  adv: "Tận hưởng những gì bạn đã xây dựng. Bạn xứng đáng với nó."
}, {
  kw: "phụ thuộc, hưởng thụ quá mức",
  g: "Chín Tiền ngược là phụ thuộc tài chính, hưởng thụ vượt khả năng, hoặc thành công bề ngoài nhưng trống rỗng bên trong. Có thể bạn đang sống cho hình ảnh hơn là cho chính mình. Điều bạn hỏi chưa thuận vì nền tảng tự chủ còn yếu.",
  love: "Phụ thuộc vào người ấy về tài chính hay cảm xúc, hoặc cô đơn dù có đủ vật chất. Mối quan hệ thiếu sự cân bằng. Chưa thuận; hãy xây dựng lại sự tự chủ của mình trước.",
  work: "Thành công nhưng không bền, hoặc phụ thuộc quá nhiều vào người khác. Có thể bạn đang dựa vào may mắn thay vì năng lực. Chưa thuận; cần xây dựng năng lực tự chủ.",
  money: "Chi tiêu vượt khả năng, sống ảo, nợ nần để giữ hình ảnh. Tài chính bề ngoài đẹp nhưng bên trong yếu. Chưa thuận; cắt giảm hưởng thụ ngay.",
  health: "Hưởng thụ quá mức ảnh hưởng sức khoẻ: ăn uống, thức khuya, thiếu vận động. Cần điều độ lại. Chăm sóc bản thân thật sự chứ không chỉ chiều chuộng.",
  adv: "Sự sung túc thật đến từ bên trong, không phải từ những gì người khác thấy."
});

defCard(73, 2, -1, {
  kw: "gia sản, bền vững, di sản",
  g: "Mười Tiền là sự giàu có bền vững qua nhiều thế hệ: gia đình, tài sản, di sản và sự ổn định lâu dài. Đây là đỉnh cao của thành tựu vật chất. Điều bạn hỏi rất thuận, câu trả lời nghiêng mạnh về có, với kết quả lâu bền.",
  love: "Mối quan hệ hướng tới hôn nhân, gia đình, sự gắn kết lâu dài. Được gia đình hai bên ủng hộ. Nghiêng mạnh về có.",
  work: "Sự nghiệp vững chắc, gắn bó với công ty lớn hoặc doanh nghiệp gia đình. Thành công mang tính lâu dài. Câu trả lời là có.",
  money: "Tài sản lớn, thừa kế, đầu tư bất động sản, tài chính gia đình vững mạnh. Rất thuận cho các kế hoạch dài hạn như mua nhà, quỹ hưu trí. Nghiêng mạnh về có.",
  health: "Sức khoẻ tốt, gia đình khoẻ mạnh. Nền tảng sức khoẻ vững. Tiếp tục duy trì lối sống lành mạnh.",
  adv: "Xây dựng cho lâu dài. Những gì bạn làm hôm nay sẽ là di sản cho mai sau."
}, {
  kw: "tranh chấp gia sản, bất ổn",
  g: "Mười Tiền ngược là tranh chấp tài sản, bất hoà gia đình vì tiền, hoặc sự ổn định bị lung lay. Nền tảng tưởng vững chắc đang có vết nứt. Điều bạn hỏi gặp trở ngại từ các vấn đề gia đình hoặc tài chính lâu dài.",
  love: "Gia đình phản đối, mâu thuẫn về tiền bạc trong hôn nhân, hoặc khác biệt về giá trị sống. Những chuyện nhà, chuyện tiền tưởng nhỏ đang dần trở thành rào cản lớn giữa hai người. Chưa thuận; hãy giải quyết những vấn đề nền tảng trước.",
  work: "Doanh nghiệp gặp khó, mất ổn định, hoặc mâu thuẫn trong công ty gia đình. Nền tảng tưởng vững chắc đang có vết nứt từ bên trong. Chưa thuận; cần củng cố lại nền tảng.",
  money: "Tranh chấp tài sản, thừa kế, hoặc mất mát tài chính lớn. Giấy tờ, pháp lý cần được xem kỹ. Chưa thuận; cẩn trọng với mọi cam kết tiền bạc.",
  health: "Vấn đề sức khoẻ di truyền, hoặc căng thẳng gia đình ảnh hưởng tới sức khoẻ. Nên đi khám tổng quát. Chăm sóc cả thể chất lẫn tinh thần.",
  adv: "Tiền bạc không đáng để đánh đổi tình thân. Giải quyết mọi thứ minh bạch."
});

defCard(74, 1, -1, {
  kw: "học hỏi, cơ hội mới, chăm chỉ",
  g: "Tiểu Đồng Tiền là người học trò chăm chỉ ngắm nhìn đồng xu trong tay: ham học hỏi, đón một cơ hội mới về công việc hay tiền bạc, bắt đầu từ những bước nhỏ. Tiềm năng lớn nằm ở sự kiên trì. Điều bạn hỏi có tín hiệu tốt, câu trả lời nghiêng về có nếu bạn chịu học và làm từng bước.",
  love: "Mối quan hệ mới chớm, tiến triển chậm mà chắc và khá nghiêm túc. Người ấy có thể trẻ, chân thành, thể hiện tình cảm bằng những việc nhỏ. Nghiêng về có, nhưng cần thời gian để tình cảm lớn lên.",
  work: "Cơ hội học tập, một khoá học mới, một công việc mới bắt đầu hay một vị trí thực tập. Rất tốt cho thi cử, du học, học thêm kỹ năng. Câu trả lời là có — hãy chuẩn bị kỹ và chăm chỉ.",
  money: "Tin tốt nhỏ về tiền bạc, thời điểm tốt để bắt đầu tiết kiệm hay đầu tư nhỏ. Học cách quản lý tài chính sẽ có lợi lâu dài. Nghiêng về thuận.",
  health: "Tốt để bắt đầu thói quen lành mạnh và học cách chăm sóc bản thân đúng cách. Tìm hiểu kỹ về chế độ ăn, tập luyện phù hợp. Kiên trì sẽ có kết quả.",
  adv: "Học từ những điều nhỏ và kiên trì từng bước. Hạt giống hôm nay là mùa màng ngày mai."
}, {
  kw: "lười biếng, thiếu tập trung",
  g: "Tiểu Đồng Tiền ngược là thiếu tập trung, lười biếng, hoặc bỏ lỡ cơ hội vì không chuẩn bị. Bạn có thể có nhiều dự định nhưng không bắt tay làm. Điều bạn hỏi chưa thuận khi nỗ lực còn chưa đủ.",
  love: "Thiếu nghiêm túc, mối quan hệ không tiến triển vì không ai chịu đầu tư. Người ấy có thể còn non nớt hoặc chưa sẵn sàng. Chưa thuận; hãy xem hành động thay vì lời nói.",
  work: "Học hành sa sút, lỡ cơ hội, thiếu kỹ năng cần thiết. Có thể bạn đang trì hoãn quá lâu. Chưa thuận; cần chăm chỉ hơn và bắt đầu từ việc nhỏ.",
  money: "Chi tiêu thiếu kế hoạch, bỏ lỡ cơ hội tiết kiệm hay học hỏi về tài chính. Những khoản chi nhỏ lặt vặt đang cộng dồn thành con số đáng kể. Chưa thuận; hãy lập ngân sách đơn giản và làm theo.",
  health: "Lười vận động, duy trì thói quen xấu, bỏ qua lời khuyên sức khoẻ. Cơ thể dần yếu đi. Cần kỷ luật hơn với bản thân.",
  adv: "Hãy bắt đầu việc nhỏ nhất ngay hôm nay thay vì chờ đợi."
});

defCard(75, 1, -1, {
  kw: "kiên trì, đáng tin cậy",
  g: "Hiệp Sĩ Tiền là người cưỡi ngựa chậm rãi mà vững vàng: kiên trì, trách nhiệm, đáng tin cậy. Tiến bộ chậm nhưng chắc chắn, không có bước nào thừa. Điều bạn hỏi nghiêng về có, nhưng sẽ cần thời gian và sự bền bỉ.",
  love: "Người ấy nghiêm túc, chung thuỷ, thể hiện tình cảm bằng hành động và trách nhiệm. Mối quan hệ không màu mè nhưng rất đáng tin. Nghiêng về có — đây là mối quan hệ bền vững.",
  work: "Làm việc có trách nhiệm, kiên trì hoàn thành mục tiêu từng bước. Bạn được cấp trên tin tưởng nhờ sự đáng tin cậy. Nghiêng về có; thành công đến từ sự bền bỉ.",
  money: "Tài chính tăng trưởng đều, tiết kiệm có kỷ luật, đầu tư an toàn. Không có đột phá nhưng rất chắc chắn. Nghiêng về thuận.",
  health: "Sức khoẻ ổn định nhờ thói quen đều đặn. Kiên trì tập luyện và ăn uống lành mạnh sẽ thấy kết quả. Tránh thay đổi đột ngột.",
  adv: "Chậm mà chắc. Từng bước vững vàng sẽ đưa bạn tới đích."
}, {
  kw: "trì trệ, cứng nhắc",
  g: "Hiệp Sĩ Tiền ngược là trì trệ, quá cứng nhắc hoặc làm việc máy móc thiếu sáng tạo. Mọi thứ đứng yên, bạn cảm thấy mắc kẹt trong thói quen. Điều bạn hỏi chưa thuận vì thiếu động lực tiến lên.",
  love: "Mối quan hệ nhàm chán, thiếu sự đổi mới, hoặc người ấy quá thụ động. Hai người sống cạnh nhau nhưng ít kết nối. Chưa thuận; hãy tạo ra điều mới mẻ cùng nhau.",
  work: "Công việc đình trệ, làm việc máy móc, không có tiến triển. Bạn có thể đang quá cầu toàn hoặc quá bảo thủ. Chưa thuận; cần đổi mới cách làm.",
  money: "Tài chính không tăng trưởng vì quá bảo thủ hoặc thiếu kế hoạch. Tiền nằm yên, không sinh lời. Chưa thuận; hãy xem lại chiến lược.",
  health: "Lười vận động, trì trệ, cơ thể nặng nề. Thói quen cũ không còn phù hợp. Cần thay đổi nhịp sống.",
  adv: "Kiên trì không có nghĩa là đứng yên. Hãy tiến lên, dù chậm."
});

defCard(76, 2, -1, {
  kw: "chăm lo, thực tế, sung túc",
  g: "Nữ Hoàng Tiền là người biết chăm lo và quản lý cuộc sống thực tế một cách khéo léo. Bạn tạo ra sự sung túc và ấm áp cho những người xung quanh, vừa thực tế vừa đầy yêu thương. Điều bạn hỏi rất thuận, câu trả lời nghiêng mạnh về có.",
  love: "Mối quan hệ ấm áp, được chăm sóc chu đáo, hướng tới xây dựng gia đình. Người ấy (hoặc bạn) thể hiện tình yêu bằng sự quan tâm thiết thực. Nghiêng mạnh về có.",
  work: "Quản lý giỏi, cân bằng tốt giữa công việc và gia đình. Rất thuận cho kinh doanh, quản lý tài chính, nghề chăm sóc. Nghiêng về có — sự khéo léo của bạn được đánh giá cao.",
  money: "Tài chính ổn định, quản lý chi tiêu khéo léo, biết tích luỹ. Thuận để đầu tư cho nhà cửa, gia đình. Nghiêng mạnh về có.",
  health: "Sức khoẻ tốt, bạn chăm sóc bản thân chu đáo. Ăn uống lành mạnh và gần gũi thiên nhiên giúp bạn khoẻ hơn. Tiếp tục duy trì.",
  adv: "Chăm lo cho bản thân và người thân bằng sự thực tế và ấm áp."
}, {
  kw: "bỏ bê bản thân, lo lắng vật chất",
  g: "Nữ Hoàng Tiền ngược là bỏ bê bản thân vì lo cho người khác, hoặc quá lo lắng về vật chất. Bạn có thể đang gánh quá nhiều trách nhiệm. Điều bạn hỏi gặp trở ngại vì sự mất cân bằng giữa cho đi và chăm sóc chính mình.",
  love: "Chăm lo quá mức cho người ấy mà quên mình, hoặc mối quan hệ xoay quanh chuyện vật chất. Có thể có sự ghen tuông hay kiểm soát. Chưa thuận; cần cân bằng lại.",
  work: "Mất cân bằng công việc – gia đình, bạn kiệt sức vì gánh vác. Bạn lo cho mọi người nhưng lại không ai lo cho sức lực của bạn. Chưa thuận; hãy phân chia trách nhiệm hợp lý hơn.",
  money: "Lo lắng tiền bạc, chi tiêu sai chỗ hoặc quá chắt bóp. Tài chính gia đình căng thẳng. Chưa thuận; lập lại kế hoạch chi tiêu.",
  health: "Bỏ bê sức khoẻ bản thân vì lo cho người khác. Cơ thể mệt mỏi, dễ ốm. Cần chăm sóc mình trước.",
  adv: "Bạn cũng cần được chăm sóc. Hãy dành thời gian cho mình."
});

defCard(77, 2, -1, {
  kw: "thành công, giàu có, vững vàng",
  g: "Vua Tiền là đỉnh cao của thành công vật chất: giàu có, vững vàng, có tầm ảnh hưởng. Bạn đã xây dựng được nền tảng lớn bằng sự chăm chỉ và khôn ngoan. Điều bạn hỏi rất thuận, câu trả lời nghiêng mạnh về có.",
  love: "Người ấy trưởng thành, vững vàng, có khả năng lo cho gia đình. Mối quan hệ an toàn và đáng tin cậy. Nghiêng mạnh về có.",
  work: "Thành công lớn, vị trí lãnh đạo, kinh doanh phát đạt. Quyết định của bạn lúc này có sức nặng. Câu trả lời là có.",
  money: "Tài chính dồi dào, đầu tư thành công, tài sản tăng trưởng. Rất thuận cho các quyết định tài chính lớn. Nghiêng mạnh về có.",
  health: "Sức khoẻ vững vàng, cuộc sống ổn định. Chỉ cần chú ý đừng ăn uống quá đà. Tiếp tục duy trì.",
  adv: "Dùng sự vững vàng của mình để xây dựng và giúp đỡ người khác."
}, {
  kw: "tham lam, thất bại tài chính",
  g: "Vua Tiền ngược là tham lam, vật chất hoá, hoặc thất bại tài chính do quản lý kém. Có thể có người dùng tiền để kiểm soát. Điều bạn hỏi gặp trở ngại vì sự tham lam hoặc cứng nhắc.",
  love: "Người ấy coi trọng vật chất, kiểm soát hoặc lạnh lùng. Tình cảm bị đo đếm bằng tiền. Chưa thuận; cần xem lại giá trị của mối quan hệ.",
  work: "Kinh doanh thua lỗ, lãnh đạo độc đoán, hoặc tham vọng vượt năng lực. Quyết định dựa trên cái tôi thay vì số liệu đang đẩy mọi thứ đi sai hướng. Chưa thuận; cần điều chỉnh chiến lược.",
  money: "Thua lỗ, đầu tư sai, tham lam dẫn tới rủi ro. Việc cố gỡ gạc bằng những khoản đầu tư mạo hiểm hơn chỉ làm lỗ thêm sâu. Chưa thuận; cắt lỗ và bảo toàn vốn.",
  health: "Căng thẳng vì công việc, ăn uống quá đà, huyết áp cao. Cần điều độ lại. Đi khám định kỳ.",
  adv: "Tiền là công cụ, không phải mục đích. Đừng để nó điều khiển bạn."
});
// ================= LUẬN GIẢI & KẾT LUẬN =================
const TOPIC_INFO = {
  love:   { label: "Tình cảm", words: ["yêu", "người yêu", "crush", "người ấy", "người cũ", "tình cảm", "tình yêu", "cưới", "kết hôn", "chồng", "vợ", "bạn trai", "bạn gái", "hẹn hò", "nhắn tin", "tỏ tình", "chia tay", "quay lại", "thích", "ny", "ex", "độc thân", "duyên", "hôn nhân", "anh ấy", "cô ấy", "người thương"] },
  work:   { label: "Công việc & học tập", words: ["việc", "công việc", "công ty", "sếp", "dự án", "học", "thi", "thi cử", "nghề", "phỏng vấn", "kinh doanh", "sự nghiệp", "thăng chức", "đồng nghiệp", "khởi nghiệp", "trường", "chuyển việc", "nghỉ việc", "job", "deadline", "đi làm", "du học", "tốt nghiệp", "khách hàng", "hợp đồng"] },
  money:  { label: "Tài chính", words: ["tiền", "ví", "lương", "đầu tư", "mua", "chốt đơn", "nợ", "vay", "tài chính", "chứng khoán", "coin", "crypto", "thu nhập", "giàu", "tiết kiệm", "lãi", "lỗ", "buôn bán", "bán hàng"] },
  health: { label: "Sức khoẻ", words: ["sức khoẻ", "sức khỏe", "bệnh", "ốm", "ngủ", "mất ngủ", "giảm cân", "tăng cân", "mệt", "khám", "gym", "tập luyện", "ăn uống", "stress", "căng thẳng", "phẫu thuật", "chữa", "trầm cảm"] }
};
const TOPIC_RE = Object.fromEntries(Object.entries(TOPIC_INFO).map(([k, t]) =>
  [k, new RegExp(`(^|[^\\p{L}])(${t.words.join("|")})(?=$|[^\\p{L}])`, "giu")]));

// Từ khoá tự học: { "từ": "love"|"work"|"money"|"health" }
const LEARNED_TOPIC_WORDS = Object.create(null);

// Đoán chủ đề câu hỏi: đếm từ khoá mỗi mảng, mảng nhiều nhất thắng; không khớp → "general"
function detectTopic(q) {
  const text = (q || "").normalize("NFC").toLowerCase();
  const votes = { love: 0, money: 0, work: 0, health: 0 };
  for (const k in votes) votes[k] = (text.match(TOPIC_RE[k]) || []).length;
  // Từ khoá người dùng đã "dạy" qua nút sửa chủ đề (app.js nạp vào LEARNED_TOPIC_WORDS) — cộng phiếu thêm
  for (const w of text.split(/[^\p{L}]+/u)) {
    const t = LEARNED_TOPIC_WORDS[w];
    if (t in votes) votes[t] += 1;
  }
  let best = "general", bestN = 0;
  for (const k of ["love", "money", "work", "health"]) if (votes[k] > bestN) { best = k; bestN = votes[k]; }
  return best;
}

// Câu hỏi dạng Có/Không?
function isYesNoQuestion(q) {
  const t = (q || "").normalize("NFC").toLowerCase().trim();
  return /(không|ko|hông|chưa|chăng)\s*[?!.]*$|có nên|nên .* hay|được không|liệu|phải không|có .* không/.test(t);
}

function cardDetail(card, reversed) {
  const d = CARD_DETAIL[card.id];
  return reversed ? d.rev : d.up;
}

// Nhịp thời gian gợi ý theo nguyên tố của lá then chốt
function timingHint(card) {
  if (card.id < 22) return "khi một giai đoạn lớn chín muồi — thường tính bằng tháng, không phải ngày";
  return [
    "nhanh — trong vài ngày đến vài tuần tới (Lửa)",
    "theo nhịp cảm xúc — khoảng vài tuần (Nước)",
    "đến nhanh nhưng còn biến động — vài ngày tới cần theo dõi sát (Khí)",
    "chậm mà chắc — tính bằng tháng, cần kiên trì (Đất)"
  ][Math.floor((card.id - 22) / 14)];
}

const firstSentence = s => (s.match(/^.*?[.!?](\s|$)/) || [s])[0].trim();

const VERDICTS = [
  { min: 1.2,  cls: "yes",  title: "Rất thuận lợi",           yn: "CÓ — khả năng cao",
    text: "Năng lượng các lá bài đồng thuận và tích cực. Điều bạn hỏi đang có nền tảng tốt để thành hiện thực." },
  { min: 0.4,  cls: "yes",  title: "Thuận lợi, kèm điều kiện", yn: "Nghiêng về CÓ",
    text: "Xu hướng chung tích cực, nhưng kết quả phụ thuộc vào việc bạn xử lý tốt điểm vướng được chỉ ra bên dưới." },
  { min: -0.4, cls: "half", title: "Lưng chừng — nằm trong tay bạn", yn: "Chưa rõ — tuỳ vào lựa chọn của bạn",
    text: "Các lá bài cân bằng giữa thuận và nghịch. Chưa có gì được định sẵn: hành động của bạn trong thời gian tới sẽ quyết định kết quả." },
  { min: -1.2, cls: "no",   title: "Còn trở ngại",             yn: "Nghiêng về CHƯA",
    text: "Có những vướng mắc cần giải quyết trước. Nếu cố đẩy ngay lúc này, kết quả khó như ý." },
  { min: -Infinity, cls: "no", title: "Chưa thuận lợi",        yn: "CHƯA — chưa phải lúc",
    text: "Các lá bài cùng cảnh báo. Đây là lúc lùi lại, bảo vệ mình và chuẩn bị, chưa phải lúc tiến." }
];
const verdictFor = score => VERDICTS.find(v => score >= v.min);

// Mảng nội dung ứng với vị trí trong trải 5 lá
const POSITION_TOPIC = { "Tình cảm": "love", "Tài lộc": "money", "Sự nghiệp": "work", "Sức khoẻ": "health", "Lời khuyên": "adv" };
const POSITION_HINT = {
  "Quá khứ": "Gốc rễ — điều đã xảy ra và đang ảnh hưởng tới chuyện này.",
  "Hiện tại": "Tình hình lúc này — năng lượng bạn đang ở trong đó.",
  "Tương lai": "Hướng đi — điều nhiều khả năng xảy ra nếu giữ nguyên nhịp hiện tại."
};

// entries: [{card, reversed, pos}] · q: câu hỏi · topicOverride: chủ đề người dùng sửa → {topic, verdict, score, parts, scored}
function buildConclusion(entries, q, topicOverride) {
  const topic = topicOverride || detectTopic(q);
  const n = entries.length;
  const weightOf = (e, i) => {
    if (n === 3) return [0.5, 1, 1.5][i];
    if (n === 5) {
      const pt = POSITION_TOPIC[e.pos];
      if (pt === "adv") return 0.5;
      return topic !== "general" && pt === topic ? 2.5 : 1;
    }
    return 1;
  };
  let sum = 0, wsum = 0;
  const scored = entries.map((e, i) => {
    const d = cardDetail(e.card, e.reversed);
    const w = weightOf(e, i);
    sum += d.score * w; wsum += w;
    return { ...e, d, w };
  });
  const score = sum / wsum;
  const verdict = verdictFor(score);
  const yn = isYesNoQuestion(q);
  const tKey = topic === "general" ? "g" : topic;
  const name = e => `<b>${e.card.vi}</b>${e.reversed ? " (ngược)" : ""}`;

  const parts = [];
  // 1. Trả lời thẳng câu hỏi
  if (q && yn) parts.push(`Với câu hỏi “${esc(q)}”, câu trả lời của bài là: <b>${verdict.yn}</b>. ${verdict.text}`);
  else if (q) parts.push(`Về câu hỏi “${esc(q)}”${topic !== "general" ? ` (mảng <b>${TOPIC_INFO[topic].label.toLowerCase()}</b>)` : ""}: <b>${verdict.title.toLowerCase()}</b>. ${verdict.text}`);
  else parts.push(`Tổng thể trải bài: <b>${verdict.title.toLowerCase()}</b>. ${verdict.text}`);

  // 2. Mạch câu chuyện
  if (n === 3) {
    const [p, c, f] = scored;
    parts.push(`Mạch chuyện đi từ <b>${p.card.keywords[0]}</b> ở quá khứ (${name(p)}), qua <b>${c.card.keywords[0]}</b> ở hiện tại (${name(c)}), và đang hướng tới <b>${f.card.keywords[0]}</b> (${name(f)}). ` +
      (f.d.score > c.d.score ? "Tình hình đang đi lên — phía trước sáng sủa hơn bây giờ."
        : f.d.score < c.d.score ? "Phía trước có chỗ trũng — cần chuẩn bị từ bây giờ để không bị bất ngờ."
        : "Nhịp độ khá ổn định — tương lai là sự nối dài của những gì bạn đang làm."));
  } else if (n === 5) {
    const good = scored.filter(e => POSITION_TOPIC[e.pos] !== "adv" && e.d.score > 0).map(e => e.pos.toLowerCase());
    const bad = scored.filter(e => POSITION_TOPIC[e.pos] !== "adv" && e.d.score < 0).map(e => e.pos.toLowerCase());
    if (good.length) parts.push(`Mảng đang thuận: <b>${good.join(", ")}</b>.`);
    if (bad.length) parts.push(`Mảng cần để tâm: <b>${bad.join(", ")}</b>.`);
    const focus = topic !== "general" && scored.find(e => POSITION_TOPIC[e.pos] === topic);
    if (focus) parts.push(`Riêng mảng bạn đang hỏi, lá ${name(focus)} nói: ${focus.d[topic]}`);
  } else {
    const e = scored[0];
    parts.push(`Lá ${name(e)} ${topic !== "general" ? `nói về ${TOPIC_INFO[topic].label.toLowerCase()}: ${e.d[topic]}` : `nhắn: ${firstSentence(e.d.g)}`}`);
  }

  // 3. Điểm tựa & điểm vướng (bỏ lá Lời khuyên)
  if (n > 1) {
    // Trải 5 lá: mỗi vị trí đã là một mảng riêng → đọc nghĩa theo mảng đó
    const say = e => firstSentence(e.d[n === 5 ? POSITION_TOPIC[e.pos] : tKey]);
    const pool = scored.filter(e => POSITION_TOPIC[e.pos] !== "adv");
    const best = pool.reduce((a, b) => (b.d.score * b.w > a.d.score * a.w ? b : a));
    const worst = pool.reduce((a, b) => (b.d.score * b.w < a.d.score * a.w ? b : a));
    const focusShown = n === 5 && topic !== "general" && POSITION_TOPIC[best.pos] === topic;
    if (best.d.score > 0 && !focusShown) parts.push(`<b>Điểm tựa:</b> ${name(best)} ở vị trí ${best.pos.toLowerCase()} — ${say(best)}`);
    if (worst.d.score < 0 && worst !== best) parts.push(`<b>Điểm vướng:</b> ${name(worst)} ở vị trí ${worst.pos.toLowerCase()} — ${say(worst)}`);
  }

  // 4. Việc nên làm + nhịp thời gian
  const advCard = scored.find(e => POSITION_TOPIC[e.pos] === "adv") || scored[scored.length - 1];
  parts.push(`<b>Nên làm ngay:</b> ${advCard.d.adv}`);
  const key = n === 5 ? (scored.find(e => POSITION_TOPIC[e.pos] === topic) || advCard) : scored[scored.length - 1];
  if (verdict.cls !== "no") parts.push(`<b>Nhịp thời gian gợi ý:</b> ${timingHint(key.card)}.`);
  else parts.push(`<b>Khi nào nên hỏi lại:</b> sau khi bạn đã xử lý điểm vướng ở trên — thường là sau ${key.card.id < 22 ? "một chu kỳ trăng (khoảng 1 tháng)" : "1–2 tuần"}.`);

  return { topic, score, verdict, parts, scored };
}

// ================= THÔNG ĐIỆP VŨ TRỤ — mỗi lá một lời nhắn [xuôi, ngược] =================
const CARD_MSG = {
  0:  ["Cánh cửa mới chỉ mở ra với người dám bước qua mà không đòi biết trước mọi thứ.", "Tự do thật sự không phải là chạy trốn, mà là dám chịu trách nhiệm cho bước đi của mình."],
  1:  ["Bạn đã có đủ công cụ trong tay — điều còn thiếu chỉ là quyết tâm dùng chúng.", "Tài năng dùng sai chỗ còn nguy hiểm hơn không có tài năng; hãy hành động bằng sự chân thành."],
  2:  ["Câu trả lời bạn tìm đã nằm sẵn trong trực giác, chỉ cần bạn đủ tĩnh lặng để nghe thấy.", "Khi bạn phớt lờ tiếng nói bên trong, thế giới bên ngoài sẽ càng trở nên khó hiểu."],
  3:  ["Điều gì được nuôi dưỡng bằng tình yêu và sự kiên nhẫn đều sẽ đơm hoa kết trái.", "Bạn không thể rót nước từ một chiếc bình rỗng — hãy chăm sóc bản thân trước."],
  4:  ["Trật tự và kỷ luật chính là nền móng cho mọi thành công bền lâu.", "Sức mạnh thật không nằm ở việc kiểm soát người khác mà ở việc làm chủ chính mình."],
  5:  ["Những giá trị đã được thời gian kiểm chứng đang là điểm tựa vững chắc cho bạn.", "Đừng sống theo khuôn mẫu chỉ vì sợ khác biệt; niềm tin phải xuất phát từ bên trong."],
  6:  ["Lựa chọn xuất phát từ trái tim và giá trị thật của bạn sẽ không bao giờ khiến bạn hối tiếc.", "Một lựa chọn nửa vời còn gây tổn thương hơn một lời từ chối rõ ràng."],
  7:  ["Ý chí đã được xác định thì không trở ngại nào có thể ngăn bước bạn.", "Khi bạn kéo mọi thứ về nhiều phía cùng lúc, cỗ xe sẽ chỉ đứng yên."],
  8:  ["Con sư tử hung dữ nhất cũng chịu nằm yên dưới một bàn tay đủ bình tĩnh.", "Bạn mạnh mẽ hơn bạn nghĩ — nỗi sợ chỉ lớn khi bạn cho nó ăn."],
  9:  ["Đôi khi phải lùi lại một bước và ở một mình để thấy rõ con đường.", "Cô lập không phải là tĩnh tâm; hãy mở cửa cho ánh sáng và người thương bước vào."],
  10: ["Vòng quay đang chuyển về phía bạn — hãy sẵn sàng đón lấy vận may.", "Không có gì đứng yên mãi, kể cả những ngày khó khăn này."],
  11: ["Mọi điều bạn gieo đều sẽ trở về với bạn theo đúng giá trị của nó.", "Sự trung thực với chính mình là bước đầu tiên để mọi thứ trở lại công bằng."],
  12: ["Buông tay đúng lúc không phải là thua cuộc, mà là cách nhìn thế giới từ một góc mới.", "Chờ đợi mãi không làm tình hình khác đi; đã đến lúc bạn phải chọn."],
  13: ["Mọi kết thúc đều dọn chỗ cho một khởi đầu xứng đáng hơn.", "Điều bạn cố níu giữ đang ngăn điều tốt đẹp hơn đi vào đời bạn."],
  14: ["Sự hài hoà đến từ việc pha trộn đúng liều lượng, không thái quá, không thiếu hụt.", "Khi một phần cuộc sống bị đẩy quá đà, mọi phần còn lại đều chịu ảnh hưởng."],
  15: ["Nhận ra sợi xích chính là bước đầu tiên để tháo nó ra.", "Bạn đang dần lấy lại tự do — đừng quay đầu nhìn lại cám dỗ cũ."],
  16: ["Điều gì xây trên nền móng sai sẽ sụp đổ, để thứ vững chắc hơn được dựng lên.", "Sự thay đổi bạn né tránh vẫn sẽ đến; chủ động đón nhận thì ít đau hơn."],
  17: ["Hy vọng là ánh sao dẫn đường — đêm dù dài đến đâu cũng sẽ có sáng.", "Niềm tin vào bản thân không mất đi, nó chỉ đang chờ bạn thắp lại."],
  18: ["Không phải điều gì bạn sợ cũng là sự thật; hãy đi chậm và tin vào trực giác.", "Sương mù đang tan dần — sự thật sắp được phơi bày rõ ràng."],
  19: ["Niềm vui, sự rõ ràng và thành công đang chiếu sáng con đường bạn đi.", "Mặt trời vẫn ở đó sau đám mây; đừng để một chút u ám che mất niềm vui của bạn."],
  20: ["Đây là lúc thức tỉnh và đáp lại tiếng gọi đích thực của cuộc đời bạn.", "Bạn không thể bước tiếp khi vẫn đang tự phán xét mình vì quá khứ."],
  21: ["Một chu kỳ đang khép lại trọn vẹn — bạn xứng đáng tận hưởng thành quả này.", "Chỉ còn một bước nữa thôi; đừng bỏ dở khi đích đến đã rất gần."],
  22: ["Tia lửa cảm hứng đã được trao, việc của bạn là biến nó thành hành động ngay.", "Ngọn lửa cần được che chắn trước khi thổi bùng; hãy chuẩn bị kỹ rồi hãy bắt đầu."],
  23: ["Thế giới rộng lớn hơn tầm nhìn hiện tại của bạn — hãy dám lên kế hoạch xa hơn.", "Nỗi sợ điều chưa biết đang giữ bạn trong vùng an toàn quá lâu."],
  24: ["Người đứng trên vách đá nhìn ra biển xa là người thấy được con đường mà kẻ khác chưa thấy.", "Kết quả chậm không có nghĩa là thất bại; hãy xem lại tấm bản đồ của mình."],
  25: ["Hãy dừng lại ăn mừng những cột mốc đã đạt được, niềm vui cũng là nhiên liệu cho hành trình.", "Sự ổn định thật đến từ bên trong chứ không từ vẻ ngoài yên ổn."],
  26: ["Va chạm giúp bạn mài giũa ý tưởng; đừng sợ khác biệt.", "Không phải trận chiến nào cũng đáng để bạn tham gia."],
  27: ["Vòng nguyệt quế đội lên đầu người đã đi qua trận chiến mà không đánh mất chính mình.", "Ánh hào quang bên ngoài rồi sẽ tắt, chỉ ngọn lửa bên trong mới theo bạn suốt đường dài."],
  28: ["Hãy giữ vững lập trường — bạn đang ở vị trí cao hơn bạn nghĩ.", "Không phải cuộc chiến nào cũng cần bạn phải thắng; hãy chọn điều đáng bảo vệ."],
  29: ["Mọi thứ đang chuyển động nhanh — hãy sẵn sàng và nắm bắt đúng thời điểm.", "Khi mọi thứ chững lại, đó là lúc sắp xếp trước khi tăng tốc lần nữa."],
  30: ["Người lính mang vết thương vẫn đứng gác là người hiểu giá trị của những gì mình bảo vệ.", "Kiên cường là tốt, nhưng bạn không cần phải gồng mình một mình."],
  31: ["Không phải gánh nặng nào cũng là của bạn để mang.", "Đặt bớt gánh xuống, bạn sẽ thấy đường đi nhẹ hơn nhiều."],
  32: ["Sự tò mò và nhiệt huyết tuổi trẻ đang mở ra một cánh cửa mới cho bạn.", "Ý tưởng hay chỉ có giá trị khi được theo đuổi đến cùng."],
  33: ["Đam mê là con ngựa tốt, miễn là bạn biết cầm cương.", "Tốc độ không có hướng chỉ đưa bạn đến chỗ kiệt sức."],
  34: ["Hoa hướng dương không cần ai cho phép mới quay về phía mặt trời.", "Ngọn lửa của bạn cần được nuôi dưỡng, không phải để người khác thổi tắt."],
  35: ["Tầm nhìn xa và lòng can đảm sẽ biến bạn thành người dẫn đường.", "Ngọn lửa dẫn đường sẽ thành đám cháy nếu không có ai giữ lửa bằng sự tỉnh táo."],
  36: ["Chiếc cốc tràn đầy nhất là chiếc cốc được rót bằng sự chân thành.", "Hãy lấp đầy chiếc cốc của chính mình trước khi trao cho người khác."],
  37: ["Sự kết nối chân thành giữa hai tâm hồn là món quà quý giá nhất.", "Một mối quan hệ lành mạnh cần sự cân bằng từ cả hai phía."],
  38: ["Những điệu nhảy đẹp nhất luôn cần có bạn cùng nhảy.", "Hãy chọn những người bạn nâng đỡ bạn chứ không kéo bạn xuống."],
  39: ["Đôi khi món quà nằm ngay trước mặt mà bạn chưa nhìn thấy.", "Người ngồi dưới gốc cây cuối cùng cũng ngẩng đầu và thấy chiếc cốc được trao tới."],
  40: ["Hai chiếc cốc còn đứng vững sau lưng bạn vẫn đang chờ bạn quay lại nhìn thấy.", "Nỗi buồn đã làm tròn vai của nó; đến lúc bạn bước tiếp."],
  41: ["Những ký ức đẹp là hành trang, không phải là nơi để ở lại.", "Quá khứ chỉ dạy bạn, nó không quyết định tương lai của bạn."],
  42: ["Giữa muôn vàn lựa chọn, hãy chọn điều có thật chứ không phải điều lấp lánh.", "Sương mù ảo tưởng đang tan, bạn bắt đầu nhìn rõ điều mình thật sự muốn."],
  43: ["Dám rời bỏ điều không còn nuôi dưỡng tâm hồn là một hành động can đảm.", "Đừng chạy trốn mãi; có những điều cần đối mặt trước khi ra đi."],
  44: ["Vũ trụ đã nghe thấy lời ước của bạn; giờ là lúc mở lòng để nhận.", "Chín chiếc cốc cũng chẳng thể lấp đầy một tâm hồn chưa biết đủ."],
  45: ["Hạnh phúc trọn vẹn đến từ những kết nối chân thành và bình yên.", "Hạnh phúc không cần hoàn hảo, chỉ cần thật lòng."],
  46: ["Hãy để trái tim trẻ thơ và trí tưởng tượng dẫn đường cho bạn.", "Cảm xúc cần được lắng nghe, không phải để điều khiển bạn."],
  47: ["Lãng mạn là đẹp khi đi cùng sự chân thành và hành động.", "Đừng để những lời hứa ngọt ngào che mắt bạn."],
  48: ["Lòng trắc ẩn và trực giác là sức mạnh lớn nhất của bạn lúc này.", "Hãy chăm sóc thế giới cảm xúc của chính mình trước."],
  49: ["Bình thản giữa sóng gió là dấu hiệu của sự trưởng thành thật sự.", "Kìm nén cảm xúc không phải là kiểm soát chúng."],
  50: ["Sự thật rõ ràng như một lưỡi kiếm sắc — hãy dùng nó để cắt đứt mớ rối.", "Hãy làm rõ suy nghĩ trước khi nói hay hành động."],
  51: ["Tránh né lựa chọn cũng chính là một lựa chọn.", "Tháo tấm băng che mắt, bạn sẽ thấy câu trả lời rõ hơn."],
  52: ["Nỗi đau là một phần của quá trình chữa lành.", "Bạn đang dần buông bỏ nỗi đau; hãy kiên nhẫn với trái tim mình."],
  53: ["Thanh kiếm được tra vào vỏ không phải để bỏ quên, mà để sẵn sàng cho trận tới.", "Đã đến lúc tỉnh dậy và quay lại với cuộc sống."],
  54: ["Thắng bằng mọi giá có thể khiến bạn mất đi những điều quý giá hơn.", "Hãy biết khi nào nên dừng lại và làm hoà."],
  55: ["Bạn đang rời xa sóng gió để hướng tới vùng nước lặng hơn.", "Đừng mang theo hành lý cũ vào hành trình mới."],
  56: ["Hãy thông minh và cẩn trọng, nhưng đừng đánh mất sự chính trực.", "Sự thật rồi sẽ lộ diện; hãy chọn sự minh bạch."],
  57: ["Những sợi dây trói bạn lỏng hơn bạn nghĩ.", "Tấm băng đã lỏng dần, và ánh sáng đang len qua khe mắt bạn."],
  58: ["Phần lớn nỗi sợ chỉ tồn tại trong tâm trí bạn.", "Bóng tối đang lùi dần; hãy tìm người để chia sẻ."],
  59: ["Bình minh luôn ló dạng đúng ở nơi màn đêm tưởng chừng dày đặc nhất.", "Những lưỡi kiếm đang rơi xuống từng chiếc, trả lại cho bạn khả năng đứng dậy."],
  60: ["Sự tò mò và sắc sảo sẽ giúp bạn nhìn thấu vấn đề.", "Lời nói có sức mạnh; hãy dùng nó cẩn trọng."],
  61: ["Hãy tiến lên với tốc độ và sự quyết đoán, nhưng đừng quên mục tiêu.", "Vội vàng thường đi kèm hối tiếc."],
  62: ["Sự rõ ràng và thẳng thắn là món quà khi đi cùng lòng tốt.", "Đừng để nỗi đau cũ biến bạn thành người lạnh lùng."],
  63: ["Quyết định dựa trên sự thật và lý trí sẽ không đưa bạn đi sai.", "Chiếc cân lệch về một phía sẽ khiến cả vương quốc nghiêng theo."],
  64: ["Hạt giống của sự thịnh vượng đã ở trong tay bạn — hãy gieo nó xuống đất màu mỡ.", "Cơ hội sẽ quay lại với người đã chuẩn bị sẵn sàng."],
  65: ["Cuộc sống là điệu nhảy của sự cân bằng; hãy nhảy thật nhẹ nhàng.", "Bạn không cần giữ mọi quả bóng trên không cùng lúc."],
  66: ["Mỗi viên gạch bạn đặt bằng tâm huyết đều góp phần xây nên công trình lớn.", "Nhà thờ vững chãi được dựng lên từ những viên đá đặt đúng chỗ, không từ những viên đá đặt vội."],
  67: ["Chiếc rương khoá quá chặt cũng không cho ánh sáng lọt vào.", "Giữ quá chặt thì đánh mất; buông quá lỏng thì trôi đi."],
  68: ["Ngay cả trong đêm đông lạnh giá, ánh đèn giúp đỡ vẫn luôn sáng ở gần bạn.", "Cánh cửa nhà thờ đã mở, và hơi ấm bên trong đang chờ bạn bước vào."],
  69: ["Cho và nhận là dòng chảy tự nhiên của vũ trụ.", "Chiếc cân của người cho cũng cần được giữ thăng bằng như của người nhận."],
  70: ["Những gì bạn gieo đang âm thầm lớn lên; hãy kiên nhẫn chờ mùa thu hoạch.", "Hãy xem lại mảnh vườn — có thể bạn đang tưới sai chỗ."],
  71: ["Sự thành thạo được xây dựng từ từng giờ luyện tập miệt mài.", "Làm việc chăm chỉ cần đi cùng làm việc thông minh."],
  72: ["Con chim ưng đậu trên tay bạn là minh chứng cho một đời rèn luyện kỷ luật.", "Khu vườn đẹp nhất là khu vườn bạn tự tay vun trồng."],
  73: ["Cây cổ thụ che bóng cho nhiều thế hệ đều bắt đầu từ một hạt giống kiên nhẫn.", "Ngôi nhà vững không nhờ tường cao mà nhờ những người trong đó còn thương nhau."],
  74: ["Đồng xu trong tay người học trò hôm nay có thể là kho báu của người thầy ngày mai.", "Bắt đầu nhỏ vẫn tốt hơn không bao giờ bắt đầu."],
  75: ["Con rùa bền bỉ luôn về đích trước con thỏ ngủ quên bên đường.", "Con ngựa đứng yên quá lâu sẽ quên mất con đường phía trước."],
  76: ["Sự chăm sóc chân thành biến mọi nơi bạn ở thành nhà.", "Ngọn đèn muốn soi sáng cho người khác thì trước hết phải còn dầu."],
  77: ["Khu vườn của vị vua thịnh vượng nhất khi mọi người trong vương quốc đều được hái quả.", "Kho báu lớn nhất của một vị vua là lòng tin của những người quanh mình."]
};

// Bài học & cảnh báo theo nguyên tố (Ẩn Chính · Lửa · Nước · Khí · Đất) × chiều bài
const ELEMENT_LESSON = [
  ["Là một lá Ẩn Chính, lá bài cho thấy đây không chỉ là chuyện nhất thời mà là một bài học lớn của cả giai đoạn đời bạn. Khi bạn đón nhận đúng tinh thần của nó, những thay đổi sẽ đi sâu và bền hơn bạn nghĩ.",
   "Là một lá Ẩn Chính ở chiều ngược, lá bài cho thấy một bài học lớn đang bị né tránh hoặc chưa được hiểu trọn. Nếu cứ lặp lại cách cũ, cùng một tình huống sẽ quay lại dưới hình thức khác cho đến khi bạn chịu nhìn thẳng vào nó."],
  ["Năng lượng Lửa của bộ Gậy cho thấy hành động và nhiệt huyết là chìa khoá: điều bạn chủ động bắt tay làm sẽ nhanh chóng có kết quả. Bài học ở đây là giữ cho ngọn lửa cháy bền, đừng để nó bùng lên rồi tắt vội.",
   "Ngọn Lửa của bộ Gậy đang bị dồn nén hoặc cháy sai hướng: nhiệt huyết vẫn còn nhưng thiếu định hướng hoặc bị cản trở. Nếu cứ nóng vội hay buông xuôi, bạn sẽ tiêu hao sức lực mà không tiến thêm được bước nào."],
  ["Năng lượng Nước của bộ Cốc nhắc rằng cảm xúc và sự kết nối là nền tảng của chuyện này. Khi bạn lắng nghe trái tim và thành thật với người khác, mọi thứ sẽ trôi chảy một cách tự nhiên.",
   "Dòng Nước của bộ Cốc đang bị tắc: cảm xúc bị kìm nén, ảo tưởng hoặc tổn thương cũ đang chi phối cách bạn nhìn nhận. Nếu không chịu gọi tên cảm xúc thật, bạn sẽ tiếp tục phản ứng theo nỗi đau thay vì theo sự thật."],
  ["Năng lượng Khí của bộ Kiếm đòi hỏi sự tỉnh táo, lý trí và lời nói rõ ràng. Bài học ở đây là nhìn thẳng vào sự thật, kể cả khi nó không dễ chịu, vì chỉ có sự rõ ràng mới cắt được mớ rối.",
   "Lưỡi Kiếm của nguyên tố Khí đang quay vào chính bạn: suy nghĩ quá nhiều, lo âu hoặc lời nói thiếu cân nhắc đang gây hại. Nếu cứ để nỗi sợ dẫn dắt tâm trí, bạn sẽ tự dựng thêm những trận chiến không cần thiết."],
  ["Năng lượng Đất của bộ Tiền cho thấy kết quả sẽ đến từ sự kiên trì, thực tế và những bước đi cụ thể. Bài học là tin vào công sức tích luỹ từng ngày, vì những gì xây chậm thường đứng vững lâu.",
   "Nền Đất của bộ Tiền đang lung lay: thói quen, kế hoạch hoặc cách quản lý nguồn lực của bạn cần được xem lại. Nếu tiếp tục phớt lờ những chi tiết thực tế, vấn đề nhỏ hôm nay sẽ thành gánh nặng lớn ngày mai."]
];

// Hành động cụ thể theo mảng × xu hướng (thuận / lưng chừng / nghịch)
const TOPIC_ACTION = {
  love: ["Hãy chủ động bày tỏ và vun đắp bằng những hành động nhỏ mỗi ngày, vì tình cảm cần được nuôi dưỡng mới lớn lên.",
         "Hãy quan sát hành động thay vì lời nói, và thẳng thắn chia sẻ mong muốn của mình để hai người hiểu nhau hơn.",
         "Trước khi đòi hỏi ở người kia, hãy thành thật với cảm xúc của chính mình và nói chuyện thẳng thắn, bình tĩnh."],
  work: ["Hãy lên kế hoạch cụ thể, nắm lấy cơ hội và thể hiện năng lực của bạn một cách rõ ràng.",
         "Hãy sắp xếp lại ưu tiên, làm chắc từng phần việc và giữ mọi thoả thuận bằng văn bản.",
         "Hãy rà soát lại cách làm, bổ sung kỹ năng còn thiếu và chuẩn bị phương án dự phòng trước khi bước tiếp."],
  money: ["Hãy tận dụng thời điểm thuận lợi nhưng vẫn giữ kỷ luật: ghi chép thu chi và dành một phần cho quỹ dự phòng.",
          "Hãy giữ nguyên các khoản an toàn, chỉ xuống tiền khi đã tính kỹ và có con số rõ ràng.",
          "Hãy tạm hoãn các khoản chi lớn, rà lại ngân sách và tránh mọi quyết định tiền bạc khi đang nóng vội."],
  health: ["Hãy duy trì những thói quen tốt đang có và lắng nghe cơ thể để giữ vững nguồn năng lượng này.",
           "Hãy điều chỉnh nhịp sinh hoạt cho đều đặn hơn: ngủ đủ, ăn đúng bữa và vận động nhẹ mỗi ngày.",
           "Hãy ưu tiên nghỉ ngơi, đi khám nếu có dấu hiệu bất thường và giảm tải những gì đang làm bạn kiệt sức."],
  general: ["Hãy mạnh dạn bước tới, vì năng lượng lúc này đang đứng về phía bạn.",
            "Hãy cân nhắc từng bước, giữ sự linh hoạt và để hành động của bạn quyết định kết quả.",
            "Hãy chậm lại, chăm sóc bản thân và giải quyết gốc rễ vấn đề trước khi tiến xa hơn."]
};

const POSITION_CONTEXT = {
  "Quá khứ": "Nằm ở vị trí Quá khứ, năng lượng này đã hình thành từ trước và vẫn đang âm thầm ảnh hưởng tới cách mọi chuyện diễn ra hôm nay.",
  "Hiện tại": "Nằm ở vị trí Hiện tại, đây chính là năng lượng bạn đang sống trong đó — và cũng là nơi bạn có nhiều quyền thay đổi nhất.",
  "Tương lai": "Nằm ở vị trí Tương lai, đây là hướng đi nhiều khả năng xảy ra nếu bạn giữ nguyên nhịp hiện tại"
};

// Luận giải dài 3 đoạn cho một lá: ý nghĩa theo mảng → bài học & cảnh báo → thông điệp vũ trụ & lời khuyên
// topic: love|work|money|health|general · pos: tên vị trí trong trải bài (tuỳ chọn)
function longReading(card, reversed, topic, pos) {
  const d = cardDetail(card, reversed);
  const name = `<b>${card.vi}${reversed ? " ngược" : ""}</b>`;
  const tone = d.score > 0 ? 0 : d.score < 0 ? 2 : 1;
  const group = card.id < 22 ? 0 : 1 + Math.floor((card.id - 22) / 14);
  const lesson = ELEMENT_LESSON[group][d.score > 0 ? 0 : d.score < 0 ? 1 : reversed ? 1 : 0];
  const ctx = pos === "Tương lai"
    ? `${POSITION_CONTEXT[pos]} — ${timingHint(card)}.`
    : POSITION_CONTEXT[pos] || `Nhịp thời gian để thấy rõ chuyển biến: ${timingHint(card)}.`;
  const paras = [];
  if (topic && topic !== "general" && topic !== "adv") {
    paras.push(`${name} trong chuyện ${TOPIC_INFO[topic].label.toLowerCase()}: ${d[topic]}`);
    paras.push(`Ở tầng sâu hơn, ${d.g} ${lesson} ${ctx}`);
  } else {
    paras.push(`${name}: ${d.g} ${lesson}`);
    paras.push(`Soi vào từng mảng — <b>tình cảm:</b> ${firstSentence(d.love)} <b>Công việc:</b> ${firstSentence(d.work)} <b>Tài chính:</b> ${firstSentence(d.money)} <b>Sức khoẻ:</b> ${firstSentence(d.health)} ${ctx}`);
  }
  const act = TOPIC_ACTION[topic in TOPIC_ACTION ? topic : "general"][tone];
  paras.push(`<b>Thông điệp vũ trụ:</b> ${CARD_MSG[card.id][reversed ? 1 : 0]} <b>Lời khuyên:</b> ${d.adv} ${act}`);
  return paras;
}

// ================= KẾT LUẬN CUỐI CÙNG — đọc theo DẠNG câu hỏi, đa dạng lời, nhớ lịch sử =================
// Dạng câu hỏi: why · when · choice · feelings · how · yesno · open
function detectQType(q) {
  const t = (q || "").normalize("NFC").toLowerCase();
  if (!t.trim()) return "open";
  if (/^sao |tại sao|vì sao|lý do|lí do|sao lại|nguyên nhân|do đâu/.test(t)) return "why";
  if (/khi nào|bao giờ|lúc nào|bao lâu|thời điểm|tháng nào|năm nào|ngày nào|mấy tháng|mấy năm/.test(t)) return "when";
  if (splitChoice(q)) return "choice";
  if (/nghĩ gì|nghĩ sao|nghĩ về (tôi|mình|em|anh|tớ)|cảm (thấy|xúc|giác)|thật lòng|còn (yêu|thương|nhớ|thích)|có (yêu|thương|thích|nhớ) (tôi|mình|em|anh|tớ)|tình cảm .*(với|dành cho) (tôi|mình|em|anh|tớ)|trong lòng/.test(t)) return "feelings";
  if (/làm sao|làm thế nào|thế nào để|cách nào|bằng cách nào|nên làm gì|phải làm gì|cần làm gì|làm gì để|nên làm thế nào/.test(t)) return "how";
  if (isYesNoQuestion(q)) return "yesno";
  return "open";
}

// "Nên ở lại công ty cũ hay chuyển sang chỗ mới?" → ["ở lại công ty cũ", "chuyển sang chỗ mới"]
function splitChoice(q) {
  const t = (q || "").normalize("NFC").replace(/[?!.…]+\s*$/, "").trim();
  if (/(hay|hoặc) (không|chưa|ko)\s*$/i.test(t)) return null;
  const m = t.match(/^(.*?)\s+(?:hay là|hay|hoặc là|hoặc)\s+(.+)$/i);
  // "tôi hay bị…", "người ấy hay…" — "hay" là trạng từ (thường xuyên), không phải lựa chọn
  if (!m || /(^|\s)(tôi|mình|em|anh|chị|tớ|con|nó|họ|ấy|ta)$/i.test(m[1])) return null;
  const strip = s => s.replace(/^((tôi|mình|em|anh|chị|tớ|con)\s+)?((có\s+)?(nên|sẽ|chọn|lựa chọn|giữa)\s+)+/i, "").trim();
  const a = strip(m[1]), b = strip(m[2]);
  if (!a || !b || a.length > 90 || b.length > 90) return null;
  return [a, b];
}

// Thời gian theo lá: Gậy = ngày, Cốc/Kiếm = tuần, Tiền = tháng; số của lá (Át = 1 … 10) là số đơn vị
function cardTiming(card, reversed) {
  if (card.id < 22) return reversed ? "một chu kỳ dài hơn dự tính — ít nhất 2–3 tháng" : "khoảng 1–3 tháng, khi một giai đoạn lớn khép lại";
  const suit = Math.floor((card.id - 22) / 14), rank = (card.id - 22) % 14;
  const unit = ["ngày", "tuần", "tuần", "tháng"][suit];
  const span = rank < 10 ? `khoảng ${rank + 1} ${unit}` : `vài ${unit} — khi có một người đứng ra thúc đẩy`;
  return reversed ? `${span}, nhưng dễ bị lùi lại — nên tính dư ra gấp đôi` : span;
}

const DEEP_OPEN = {
  good: ["Nếu phải gói cả trải bài vào một câu thì đó là:", "Lời chốt của Cú Nguyệt cho lần trải này:", "Gom tất cả những gì các lá vừa nói lại, bức tranh rõ ràng thế này:"],
  mid:  ["Bài không đưa đáp án trắng đen, nhưng chỉ rất rõ chỗ quyết định:", "Nói thẳng, không vòng vo:", "Điều cốt lõi nằm dưới tất cả các lá là:"],
  bad:  ["Bài nói thật, dù có thể không phải điều bạn muốn nghe:", "Lời chốt hơi khó nghe nhưng cần thiết:", "Cú Nguyệt sẽ không tô hồng — các lá đang nói:"]
};
const DEEP_CLOSE = {
  good: ["Cánh cửa đang mở — việc còn lại là bạn có bước qua hay không.", "Gió đang thuận; hãy giương buồm trước khi gió đổi chiều.", "Điều bạn mong có nền móng thật — xây tiếp đi, đừng chỉ ngắm."],
  mid:  ["Kết quả chưa viết sẵn — nó sẽ được viết bằng lựa chọn tuần này của bạn.", "Cán cân đang đứng giữa; một hành động nhỏ đúng lúc đủ làm nó nghiêng.", "Đừng hỏi bài thêm — hãy làm một việc, rồi nhìn xem thế trận đổi thế nào."],
  bad:  ["Lùi một bước lúc này không phải thua — là lấy đà.", "Chưa phải lúc, không có nghĩa là không bao giờ.", "Bảo vệ mình trước đã; cơ hội đúng sẽ không bỏ đi chỉ vì bạn chờ thêm một chút."]
};
const toneOf = s => s >= 0.4 ? "good" : s > -0.4 ? "mid" : "bad";
const kw1 = e => e.d.kw.split(",")[0].trim();

// info: kết quả buildConclusion · ctx: { history: [{q, topic, score, ts}], profile: {length, specificity}, seed }
function deepConclusion(info, q, ctx = {}) {
  const { scored, score, verdict, topic } = info;
  const n = scored.length;
  const qtype = detectQType(q);
  const prof = ctx.profile || {};
  const rng = mulberry32(hashStr((q || "") + scored.map(e => e.card.id + (e.reversed ? "r" : "")).join(",") + (ctx.seed || "")));
  const tone = toneOf(score);
  const name = e => `<b>${e.card.vi}${e.reversed ? " ngược" : ""}</b>`;
  const tKey = topic === "general" ? "g" : topic;
  const fieldOf = e => n === 5 && POSITION_TOPIC[e.pos] && POSITION_TOPIC[e.pos] !== "adv" ? POSITION_TOPIC[e.pos] : tKey;
  const detail = e => prof.specificity === "high" ? e.d[fieldOf(e)] : firstSentence(e.d[fieldOf(e)]);
  const pool = scored.filter(e => POSITION_TOPIC[e.pos] !== "adv");
  const best = pool.reduce((a, b) => (b.d.score * b.w > a.d.score * a.w ? b : a));
  const worst = pool.reduce((a, b) => (b.d.score * b.w < a.d.score * a.w ? b : a));
  const last = n === 5 ? (scored.find(e => POSITION_TOPIC[e.pos] === topic) || best) : scored[n - 1];
  const advE = scored.find(e => POSITION_TOPIC[e.pos] === "adv") || last;
  const qq = q ? `“${esc(q)}”` : "";
  const paras = [];

  // 1. Câu trả lời thẳng theo dạng câu hỏi
  let answer;
  if (qtype === "yesno") {
    answer = `${qq ? `Hỏi ${qq} — ` : ""}<b>${verdict.yn}</b>. ${tone === "good" ? `Lá ${name(best)} là bảo chứng mạnh nhất cho chữ “có” này.` : tone === "mid" ? `Chữ “có” chỉ thành khi bạn gỡ được nút thắt mà ${name(worst)} chỉ ra.` : `${name(worst)} là lý do chính khiến câu trả lời lúc này nghiêng về “chưa”.`}`;
  } else if (qtype === "when") {
    answer = tone === "bad"
      ? `${qq ? `Về ${qq}: ` : ""}<b>chưa nằm trong nhịp gần</b>. Trước khi xử lý xong điều ${name(worst)} cảnh báo, mọi mốc thời gian đều dễ trôi — sớm nhất là ${cardTiming(last.card, true)}.`
      : `${qq ? `Về ${qq}: ` : ""}mốc gợi ý là <b>${cardTiming(last.card, last.reversed)}</b> (theo ${name(last)}). Dấu hiệu đã tới lúc: khi <b>${esc(last.d.kw)}</b> hiện rõ trong đời sống của bạn — thấy điều đó thì đừng chần chừ.`;
  } else if (qtype === "choice") {
    const [a, b] = splitChoice(q);
    let sa, sb, ea, eb;
    if (n === 1) {
      // Một lá: Gậy/Kiếm/Ẩn Chính xuôi → phương án mới, chủ động (vế sau); Cốc/Tiền/lá xấu → phương án giữ nền (vế đầu)
      const e = scored[0], suit = e.card.id < 22 ? -1 : Math.floor((e.card.id - 22) / 14);
      const bold = suit === 0 || suit === 2 || (suit === -1 && e.d.score > 0);
      sa = bold ? -1 : 1; sb = -sa; ea = eb = e;
    } else {
      const k = n === 5 ? 2 : Math.ceil(n / 2);
      const src = n === 5 ? pool : scored;
      const half = [src.slice(0, k), src.slice(k)];
      const avg = arr => arr.reduce((s, e) => s + e.d.score, 0) / arr.length;
      sa = avg(half[0]); sb = avg(half[1]); ea = half[0][half[0].length - 1]; eb = half[1][half[1].length - 1];
    }
    const winA = sa > sb, tie = Math.abs(sa - sb) < 0.3;
    const lose = winA ? eb : ea;
    answer = tie
      ? `Giữa <b>“${esc(a)}”</b> và <b>“${esc(b)}”</b>, bài cho hai bên gần ngang nhau — yếu tố quyết định không nằm ở phương án mà ở cách bạn thực hiện. Chọn bên nào bạn sẵn sàng chịu trách nhiệm trọn vẹn hơn.`
      : `Bài nghiêng rõ về <b>“${esc(winA ? a : b)}”</b>. ${n === 1 ? `${name(ea)} mang năng lượng ${winA ? "vững, giữ nền" : "chủ động, mở đường mới"} — hợp với phương án này hơn.` : `Phía phương án này có ${name(winA ? ea : eb)}, còn phía “${esc(winA ? b : a)}” là ${name(lose)} (${esc(lose.d.kw)}) — ${firstSentence(lose.d[fieldOf(lose)])}`}`;
  } else if (qtype === "feelings") {
    const now = n === 3 ? scored[1] : n === 5 ? (scored.find(e => e.pos === "Tình cảm") || scored[0]) : scored[0];
    answer = `${qq ? `Với ${qq}: ` : ""}trong lòng người ấy lúc này mang màu <b>${esc(now.d.kw)}</b> (${name(now)}). ${firstSentence(now.d.love)} ${last !== now ? (last.d.score > 0 ? `Và ${name(last)} cho thấy cảm xúc đó có xu hướng được thể hiện ra.` : `Nhưng ${name(last)} cho thấy họ chưa sẵn sàng nói ra hay hành động.`) : ""}`;
  } else if (qtype === "how") {
    const goal = (q || "").replace(/[?]+$/, "").replace(/^.*?(làm sao|làm thế nào|thế nào|cách nào|bằng cách nào|nên làm gì|phải làm gì|cần làm gì|làm gì)\s*(để)?\s*/i, "").trim();
    answer = `${goal ? `Để ${esc(goal)}, ` : ""}chìa khoá là <b>${kw1(advE)}</b> (${name(advE)}). ${advE.d.adv}`;
  } else if (qtype === "why") {
    const root = n === 3 ? scored[0] : worst;
    answer = `Gốc rễ nằm ở ${name(root)}${n === 3 ? " (quá khứ)" : ""}: ${firstSentence(root.d[fieldOf(root)])} ${n > 1 && worst !== root ? `Điều đang giữ vấn đề tồn tại là ${name(worst)} (${esc(worst.d.kw)}) — ${firstSentence(worst.d[fieldOf(worst)])}` : ""}`;
  } else {
    answer = `${qq ? `Với ${qq}, ` : ""}hướng đi đang là <b>${verdict.title.toLowerCase()}</b>: ${firstSentence(last.d[fieldOf(last)])}`;
  }
  paras.push(`${pick(rng, DEEP_OPEN[tone])} ${answer}`);

  // 2. Tổng hợp chuyên sâu — các lá tương tác với nhau thế nào
  if (prof.length !== "short") {
    const majors = scored.filter(e => e.card.id < 22).length;
    const revs = scored.filter(e => e.reversed).length;
    const bits = [];
    if (n > 1 && best !== worst && best.d.score > 0 && worst.d.score < 0)
      bits.push(`${name(best)} và ${name(worst)} kéo về hai phía: một bên là <i>${kw1(best)}</i>, một bên là <i>${kw1(worst)}</i>. Bên nào thắng phụ thuộc vào việc bạn nuôi dưỡng điều gì mỗi ngày.`);
    else if (n > 1 && worst.d.score >= 0) bits.push(`Không lá nào kéo ngược chiều — các lá cùng nói một điều: ${detail(best)}`);
    else if (n > 1) bits.push(`Các lá cùng nghiêng về phía khó — không phải để doạ, mà để bạn biết cần củng cố ở đâu: ${detail(worst)}`);
    else bits.push(`Ở tầng sâu hơn: ${detail(scored[0])}`);
    if (n > 1 && majors >= Math.ceil(n / 2)) bits.push("Nhiều lá Ẩn Chính cho thấy chuyện này lớn hơn một quyết định thường ngày — nó chạm tới hướng đi của cả một giai đoạn.");
    if (n > 1 && revs > n / 2) bits.push("Phần lớn lá ngược: năng lượng không mất đi mà đang bị chặn — thường bởi nỗi sợ, sự chần chừ hoặc một điều chưa được nói ra.");
    if (n === 3) {
      const [p, c, f] = scored;
      bits.push(f.d.score > p.d.score ? `Từ ${name(p)} đến ${name(f)} là một đường đi lên: bạn đang thoát dần khỏi điều cũ.` : f.d.score < p.d.score && f.d.score >= 0 ? `Từ ${name(p)} tới ${name(f)} năng lượng dịu dần — vẫn tốt, nhưng đừng ngủ quên trên đà thuận của ${name(c)}.` : f.d.score < p.d.score ? `Từ ${name(p)} tới ${name(f)} là đường dốc xuống — nếu giữ nguyên cách làm hiện tại (${name(c)}), kết quả sẽ kém hơn điểm xuất phát.` : `Quá khứ và tương lai cùng một mức năng lượng — lá ${name(c)} ở hiện tại chính là chỗ bạn có thể bẻ lái.`);
    }
    paras.push(bits.join(" "));
  }

  // 3. Lịch sử — tự nhận ra khi bạn hỏi lại cùng chuyện
  const hist = (ctx.history || []).filter(h => h.q && ((h.topic === topic && topic !== "general") || similarQ(h.q, q)));
  if (hist.length) {
    const h = hist[0];
    const days = Math.max(0, Math.round((Date.now() - h.ts) / 86400000));
    const when = days === 0 ? "hôm nay" : days === 1 ? "hôm qua" : `${days} ngày trước`;
    const same = similarQ(h.q, q);
    let trend = "";
    if (typeof h.score === "number") {
      const diff = score - h.score;
      trend = diff > 0.4 ? "Năng lượng đã sáng hơn lần trước — những gì bạn làm từ đó tới nay đang có tác dụng." : diff < -0.4 ? "Năng lượng trầm hơn lần trước — có điều gì đó đã thay đổi, đáng để bạn nhìn lại." : "Năng lượng gần như giữ nguyên so với lần trước — bài đang nhắc lại cùng một thông điệp.";
    }
    const repeat = same && hist.filter(x => similarQ(x.q, q)).length >= 2 ? " Bạn đã hỏi điều này vài lần — khi một câu hỏi cứ quay lại, thường câu trả lời bạn đã biết, chỉ chưa sẵn sàng làm theo." : "";
    const lead = same ? `Bạn từng hỏi điều tương tự ${when} (“${esc(h.q)}”).`
      : `${when[0].toUpperCase() + when.slice(1)} bạn cũng hỏi về ${TOPIC_INFO[topic].label.toLowerCase()} (“${esc(h.q)}”).`;
    paras.push(`${lead} ${trend}${repeat}`);
  }

  // 4. Lộ trình + câu chốt
  const steps = [];
  if (worst.d.score < 0) steps.push(`<b>Gỡ trước</b> — ${firstSentence(worst.d.adv)}`);
  steps.push(`<b>Làm ngay trong 7 ngày</b> — ${firstSentence(advE.d.adv)}`);
  if (best.d.score > 0 && best !== advE && prof.length !== "short") steps.push(`<b>Tựa vào</b> ${kw1(best)} — ${firstSentence(best.d.adv)}`);
  paras.push(`<b>Lộ trình:</b> ${steps.map((s, i) => `${i + 1}) ${s}`).join(" ")}`);
  paras.push(`<b>Chốt lại:</b> ${pick(rng, DEEP_CLOSE[tone])}`);
  return { qtype, paras };
}

// Hai câu hỏi có giống nhau không (trùng ≥ 60% từ)
function similarQ(a, b) {
  const w = s => new Set((s || "").normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(x => x.length > 1));
  const A = w(a), B = w(b);
  if (!A.size || !B.size) return false;
  let inter = 0;
  A.forEach(x => { if (B.has(x)) inter++; });
  return inter / Math.min(A.size, B.size) >= 0.6;
}
