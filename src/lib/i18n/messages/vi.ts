import type {
  Delivery,
  PriceUnit,
  ServiceCode,
  ServiceGroup,
} from "@/lib/catalog";
import type { BookingStatus } from "@/lib/appointments/types";

export const vi = {
  htmlLang: "vi",
  brandAria: "Reader Sarah — về trang chủ",
  nav: {
    home: "Trang chủ",
    services: "Dịch vụ",
    pricing: "Bảng giá",
    about: "Về Sarah",
    booking: "Đặt hẹn",
    explore: "Góc khám phá",
    cta: "Hẹn với Sarah",
    main: "Điều hướng chính",
    mobile: "Điều hướng di động",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    switchLabel: "Switch to English",
    switchShort: "EN",
  },
  meta: {
    home: {
      title: "Reader Sarah | Tarot, Lenormand & Chiêm tinh học",
      description:
        "Đôi khi, chỉ một câu hỏi cũng có thể mở ra một góc nhìn mới. Cùng Sarah khám phá Tarot, Lenormand, Chiêm tinh học, Matrix Destiny và Solar Return qua tư vấn online 1:1 — bảng giá rõ ràng, dành cho cả bạn ở Việt Nam và nước ngoài.",
      keywords: [
        "Reader Sarah",
        "sarahreader.com",
        "Tarot online",
        "xem Tarot online",
        "Lenormand",
        "chiêm tinh học",
        "Matrix Destiny",
        "Solar Return Chart",
        "thần số học",
        "xem bói cho Việt kiều",
      ],
      ogTitle: "Reader Sarah — Một câu hỏi, một góc nhìn mới",
      ogDescription:
        "Tarot · Lenormand · Chiêm tinh học · Matrix Destiny · Solar Return Chart. Tư vấn online tận tâm, riêng tư, dành cho bạn ở bất cứ đâu.",
      twitterDescription:
        "Guidance for a better you. Tarot, Lenormand và Chiêm tinh học cùng Sarah.",
      ogAlt: "Không gian Tarot xanh dịu của Reader Sarah",
    },
    pricing: {
      title: "Bảng giá dịch vụ Tarot, Lenormand, Chiêm tinh",
      description:
        "Bảng giá Reader Sarah: Tarot từ {from}/câu, Lenormand, Matrix Destiny, Thần số học, Solar Return, Chiêm tinh chuyên sâu. Tư vấn online, trả file nhanh, hỗ trợ khách Việt kiều và nước ngoài.",
      keywords: [
        "bảng giá Tarot",
        "giá xem Tarot online",
        "giá Matrix Destiny",
        "giá Solar Return",
        "giá thần số học",
        "xem bói online cho Việt kiều",
      ],
    },
    booking: {
      title: "Đặt lịch cùng Sarah",
      description:
        "Hẹn một cuộc trò chuyện online riêng tư cùng Sarah. Tarot, Lenormand, Chiêm tinh học, Matrix Destiny và Solar Return Chart.",
    },
  },
  jsonLd: {
    description:
      "Tư vấn online 1:1: Tarot, Lenormand, Chiêm tinh học, Matrix Destiny, Thần số học và Solar Return Chart cho khách ở Việt Nam và nước ngoài.",
    catalogName: "Bảng giá dịch vụ",
  },
  home: {
    eyebrow: "MỘT KẾT NỐI NHỎ, MỘT GÓC NHÌN MỚI",
    pretitle: "Đôi khi, chỉ một câu hỏi",
    titleA: "cũng có thể mở ra",
    titleB: "một",
    titleEm: "góc nhìn mới.",
    descA: "Dành cho những ai đang muốn tìm câu trả lời, định hướng",
    descB: "hoặc đơn giản là lắng nghe một thông điệp dành riêng cho mình.",
    ctaBook: "Đặt lịch cùng Sarah",
    ctaServices: "Khám phá dịch vụ",
    assurances: ["Tư vấn tận tâm", "Không gian riêng tư", "Kết nối online"],
    photoNoteA: "Guidance for",
    photoNoteB: "a better you",
    heroBottom: [
      "TAROT",
      "LENORMAND",
      "CHIÊM TINH HỌC",
      "MATRIX DESTINY",
      "SOLAR RETURN CHART",
    ],
    services: {
      eyebrow: "NHỮNG CÁCH ĐỂ LẮNG NGHE CHÍNH MÌNH",
      titleA: "Mỗi câu chuyện,",
      titleEm: "một lối mở.",
      intro:
        "Không có một câu trả lời cho tất cả. Chỉ có góc nhìn phù hợp với bạn, vào lúc này.",
      explore: "Khám phá",
      bookAria: "Đặt lịch {title}",
      from: "Từ",
      pricingCta: "Xem bảng giá đầy đủ",
      footnote: "Chưa biết nên chọn hình thức nào?",
      footnoteLink: "Để Sarah lắng nghe bạn",
    },
    cards: [
      {
        code: "tarot-one-question",
        title: "Tarot",
        description:
          "Tình cảm, công việc, quyết định, cảm xúc, những băn khoăn hiện tại…",
      },
      {
        code: "lenormand",
        title: "Lenormand",
        description: "Diễn biến sự việc, mối quan hệ, công việc, tài chính…",
      },
      {
        code: "astrology",
        title: "Chiêm tinh học",
        description:
          "Tình duyên, sự nghiệp, định hướng và những bài học cuộc sống.",
      },
      {
        code: "matrix-destiny",
        title: "Matrix Destiny",
        description:
          "Bài học linh hồn, định hướng cuộc sống, điểm mạnh – điểm yếu…",
      },
      {
        code: "solar-return",
        title: "Solar Return Chart",
        description: "Tổng quan năng lượng cá nhân, cơ hội và thử thách sắp tới…",
      },
    ] as { code: ServiceCode; title: string; description: string }[],
    connection: {
      eyebrow: "MỘT KHOẢNG THỜI GIAN DÀNH RIÊNG CHO BẠN",
      titleA: "Một cuộc hẹn",
      titleEm: "cùng Sarah",
      script: "Mình cùng lắng nghe",
      question: "câu chuyện của bạn",
      date: "CHỌN NGÀY VÀ KHUNG GIỜ PHÙ HỢP",
      status:
        "Chọn giờ Sarah đã mở hoặc đề xuất một thời gian khác. Mình sẽ liên hệ để xác nhận cuộc hẹn nhé.",
      link: "Xem lịch trống",
    },
    online: {
      eyebrow: "Ở ĐÂU CŨNG CÓ THỂ KẾT NỐI",
      titleA: "Một cuộc hẹn nhỏ.",
      titleEm: "Một khoảng lặng cho bạn.",
      text: "Không cần đi xa. Chỉ cần một nơi bạn thấy thoải mái, một chút thời gian, và sự cởi mở với chính mình.",
      brushPre: "Xem hình thức",
      brushStrong: "ONLINE",
      benefits: [
        "Tư vấn tận tâm, lắng nghe không phán xét",
        "Kết nối đúng nhu cầu của riêng bạn",
        "Bảo mật thông tin và câu chuyện cá nhân",
        "Linh hoạt thời gian, dễ dàng sắp xếp",
      ],
      cta: "Tìm một lịch hẹn phù hợp",
      note: "Nếu bạn cảm thấy có duyên, mình cùng trò chuyện nhé! ♡",
    },
    about: {
      eyebrow: "NGƯỜI LẮNG NGHE CÂU CHUYỆN CỦA BẠN",
      hi: "Chào bạn,",
      iam: "mình là",
      name: "Sarah.",
      p1: "Mình tin rằng, có những lúc điều chúng ta cần không phải một lời khẳng định về tương lai, mà là một người lắng nghe và một góc nhìn đủ dịu dàng để hiểu mình hơn.",
      p2: "Qua Tarot, Lenormand và những ngôn ngữ của vũ trụ, mình ở đây để cùng bạn nhìn lại câu chuyện, kết nối với bản thân và tìm hướng đi phù hợp.",
      quoteA: "“Better choices. Brighter future.",
      quoteB: "You deserve it.”",
      link: "Trò chuyện với Sarah",
      pictureAlt:
        "Hoa trắng, bài Tarot xanh và pha lê trong ánh sáng bên biển",
      captionA: "May the universe",
      captionB: "meet you where you are ♡",
    },
    explore: {
      eyebrow: "MỘT CHÚT TÒ MÒ, MỘT CHÚT CHIÊM NGHIỆM",
      titleA: "Góc nhỏ",
      titleEm: "khám phá.",
      intro:
        "Chậm lại một nhịp, thử lắng nghe điều vũ trụ muốn nhắn bạn hôm nay.",
      featureEyebrow: "MỘT LÁ BÀI DÀNH CHO HÔM NAY",
      featureA: "Bạn muốn nghe",
      featureB: "thông điệp gì?",
      featureCta: "Rút một lá bài",
      links: [
        {
          title: "Bản đồ sao cá nhân",
          description: "Một bầu trời mang dấu ấn của bạn",
          href: "/games/chiem-tinh.html",
        },
        {
          title: "Matrix Destiny",
          description: "Những bài học từ ngày bạn đến thế giới",
          href: "/games/ma-tran.html",
        },
        {
          title: "Solar Return",
          description: "Lắng nghe nhịp điệu năm tuổi mới",
          href: "/games/solar-return.html",
        },
        {
          title: "Thêm một chút khám phá",
          description: "Thần số học, trải bài và nhiều hơn thế",
          href: "/game.html",
        },
      ],
      note: "Các công cụ khám phá mang tính tham khảo và chiêm nghiệm. Lựa chọn luôn ở trong tay bạn.",
    },
    faq: {
      eyebrow: "CÓ THỂ BẠN ĐANG TỰ HỎI",
      titleA: "Một vài điều",
      titleEm: "trước cuộc hẹn.",
      introA: "Và nếu bạn còn điều gì muốn hỏi,",
      introB: "Sarah vẫn ở đây để lắng nghe.",
      link: "Nhắn Sarah nhé",
    },
    finalCta: {
      script: "Mọi cuộc gặp gỡ đều có một lý do.",
      titleA: "Biết đâu, đây là",
      titleEm: "chút hữu duyên của mình?",
      text: "Một câu hỏi nhỏ cũng có thể là khởi đầu của một hành trình mới.",
      cta: "Hẹn gặp bạn, cùng Sarah",
    },
  },
  footer: {
    tagline: "Guidance for a better you.",
    services: "Dịch vụ",
    pricing: "Bảng giá",
    about: "Về Sarah",
    faq: "Câu hỏi thường gặp",
    booking: "Đặt lịch",
    facebook: "Facebook",
    zalo: "Zalo",
    call: "Gọi Sarah",
    bottomA: "© 2026 sarahreader.com · Made with a little stardust",
    bottomB: "Lắng nghe tận tâm · Tôn trọng riêng tư",
  },
  pricing: {
    back: "Về góc nhỏ của Sarah",
    eyebrow: "BẢNG GIÁ DỊCH VỤ · READER SARAH",
    titleA: "Minh bạch,",
    titleEm: "để bạn yên tâm lựa chọn.",
    intro:
      "Tarot, Lenormand, Chiêm tinh, Matrix Destiny, Thần số học và Solar Return — mỗi dịch vụ đều có mức giá rõ ràng. Chọn điều bạn cần, Sarah sẽ đồng hành cùng bạn.",
    highlights: ["Trả file nhanh chóng", "Tư vấn tận tâm", "Đồng hành cùng bạn"],
    book: "Đặt dịch vụ này",
    currencyNote:
      "Giá tính bằng VNĐ. Số USD chỉ là ước tính (khoảng 26.000đ = 1 USD) dành cho khách ở nước ngoài. Sarah sẽ thống nhất số tiền và cách thanh toán trực tiếp với bạn trước buổi xem.",
    overseasTitle: "Bạn đang ở nước ngoài?",
    overseasText:
      "Mọi buổi tư vấn đều diễn ra online, và các dịch vụ trả file không phụ thuộc múi giờ. Khi đặt lịch, bạn sẽ thấy giờ Việt Nam (GMT+7) kèm giờ tại nơi bạn đang ở.",
    closingA: "Nếu bạn đang có điều băn khoăn…",
    closingB: "đừng ngần ngại nhắn tin cho mình nhé!",
    closingCta: "Đặt lịch cùng Sarah",
    unsure: "Chưa chắc nên chọn gì? Sarah sẽ gợi ý giúp bạn.",
  },
  booking: {
    back: "Về góc nhỏ của Sarah",
    eyebrow: "READER SARAH · MỘT CUỘC HẸN DÀNH RIÊNG CHO BẠN",
    titleA: "Mình cùng ngồi lại,",
    titleEm: "lắng nghe bạn nhé.",
    intro:
      "Chọn điều bạn muốn khám phá và để lại một chút thông tin. Sarah sẽ cùng bạn tìm thời gian, hình thức và góc nhìn phù hợp nhất.",
    highlights: ["Không gian riêng tư", "Lắng nghe tận tâm", "Kết nối online"],
    asideEyebrow: "TRƯỚC KHI MÌNH BẮT ĐẦU",
    asideTitleA: "Không cần có sẵn",
    asideTitleEm: "mọi câu trả lời.",
    asideP1:
      "Bạn chưa chắc nên chọn Tarot, Lenormand hay một phương pháp khác? Chọn “Chưa chắc — cần tư vấn”, Sarah sẽ giúp bạn tìm một lối mở phù hợp.",
    asideP2:
      "Chọn giờ trống Sarah đã mở trên lịch, hoặc đề xuất một thời gian khác phù hợp với bạn. Yêu cầu được gửi trực tiếp đến Sarah. Cuộc hẹn chính thức được xác nhận sau khi mình liên hệ thống nhất dịch vụ, thời gian và chi phí.",
    steps: [
      "Chọn giờ trống hoặc đề xuất lịch",
      "Điền thông tin và gửi yêu cầu",
      "Sarah liên hệ xác nhận cuộc hẹn",
    ],
    footerTags:
      "Tarot · Lenormand · Chiêm tinh · Matrix Destiny · Solar Return",
    form: {
      contactStrip: "Đặt hẹn trực tiếp cùng Sarah",
      zalo: "Zalo",
      facebook: "Facebook Sarah",
      call: "Gọi điện",
      modeLegend: "Bạn muốn hẹn lúc nào?",
      modeSlot: "Chọn giờ trống của Sarah",
      modeProposal: "Đề xuất thời gian khác",
      loadingSlots: "Đang tải lịch trống…",
      reload: "Tải lại lịch",
      slotsFailed: "Chưa tải được giờ trống.",
      noSlotsA: "Sarah chưa mở khung giờ trong 90 ngày tới. Bạn có thể",
      noSlotsButton: "đề xuất thời gian phù hợp với mình",
      proposalIntro:
        "Chưa tìm được giờ phù hợp? Sarah sẽ xem đề xuất và liên hệ để cùng sắp xếp.",
      date: "Ngày bạn muốn hẹn *",
      time: "Giờ đề xuất *",
      proposalNote:
        "Giờ Việt Nam (GMT+7) · Đề xuất chưa giữ chỗ cho đến khi Sarah xác nhận.",
      name: "Tên bạn muốn được gọi *",
      namePlaceholder: "Sarah nên gọi bạn là gì?",
      contact: "Số điện thoại / Zalo *",
      contactPlaceholder: "Để mình liên hệ xác nhận lịch",
      email: "Email (nếu có)",
      service: "Dịch vụ bạn quan tâm *",
      unsure: "Chưa chắc — cần tư vấn",
      note: "Một chút về câu chuyện của bạn",
      notePlaceholder:
        "Một câu hỏi, một băn khoăn, hay điều bạn muốn chia sẻ…",
      honeypot: "Để trống ô này",
      consent:
        "Mình đồng ý để Sarah lưu thông tin đặt hẹn và liên hệ xác nhận lịch. Nội dung tư vấn mang tính tham khảo, chiêm nghiệm.",
      submitSlot: "Gửi yêu cầu đặt hẹn",
      submitProposal: "Gửi đề xuất cho Sarah",
      busy: "Đang gửi yêu cầu…",
      formNote: "Tư vấn online · Chưa cần thanh toán · Sarah sẽ liên hệ xác nhận",
      pickSlot:
        "Bạn chọn một giờ trống hoặc chuyển sang đề xuất thời gian khác nhé.",
      sendFailed: "Chưa gửi được yêu cầu.",
      network:
        "Không thể kết nối. Thông tin của bạn vẫn được giữ; hãy thử gửi lại.",
      fileNotice:
        "Dịch vụ này được thực hiện dưới dạng file (hoặc call tùy lựa chọn). Thời gian bạn chọn là để Sarah liên hệ thống nhất thông tin và xác nhận yêu cầu.",
      yourTime: "Giờ của bạn ({tz})",
    },
    success: {
      eyebrow: "YÊU CẦU ĐÃ ĐƯỢC GỬI ĐẾN SARAH",
      titleProposed: "Sarah đã nhận đề xuất",
      titleBooked: "Đã nhận lịch hẹn",
      titleEm: "của bạn rồi nhé.",
      bodyProposed:
        "Thời gian bạn đề xuất đã được lưu để Sarah sắp xếp. Giờ này chưa được giữ chỗ.",
      bodySlot: "Khung giờ đã được giữ trong lúc Sarah xem yêu cầu của bạn.",
      bodyContact:
        "Sarah sẽ liên hệ qua số điện thoại hoặc Zalo bạn cung cấp để thống nhất và xác nhận.",
      reference: "Mã yêu cầu",
      service: "Dịch vụ",
      time: "Thời gian",
      status: "Trạng thái",
      tzNote: "Giờ Việt Nam (GMT+7) · Mỗi buổi dự kiến 60 phút",
      note: "Bạn lưu lại mã yêu cầu để tiện trao đổi với Sarah. Đây chưa phải xác nhận chính thức của cuộc hẹn.",
      home: "Về trang chủ",
      zalo: "Nhắn Sarah qua Zalo",
    },
    calendar: {
      locale: "vi-VN",
      prev: "Tháng trước",
      next: "Tháng sau",
      weekdays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      legend: "Ngày có khung giờ trống · Giờ Việt Nam (GMT+7)",
      hoursFor: "Khung giờ ngày",
      empty:
        "Chưa có giờ trống cho ngày này. Chọn một ngày có dấu chấm xanh, hoặc đề xuất thời gian khác bên dưới nhé.",
      dayAria: "{day}/{month}: {count} giờ trống",
    },
    status: {
      proposed: "Đề xuất thời gian",
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      completed: "Hoàn tất",
      cancelled: "Đã hủy",
    } as Record<BookingStatus, string>,
  },
  services: {
    "tarot-one-question": {
      title: "Tarot câu lẻ",
      description:
        "Một câu hỏi nhỏ, một thông điệp rõ ràng cho điều bạn đang băn khoăn.",
    },
    "tarot-spread": {
      title: "Trải bài Tarot",
      description: "Một trải bài Tarot dành riêng cho câu hỏi của bạn.",
    },
    lenormand: {
      title: "Lenormand",
      description:
        "Trải bài Lenormand riêng — góc nhìn thực tế về diễn biến và các mối quan hệ.",
    },
    "tarot-lenormand-topic": {
      title: "Tarot + Lenormand theo chủ đề",
      description:
        "5 câu hỏi trong cùng một chủ đề, kết hợp cả Tarot và Lenormand.",
    },
    "tarot-lenormand-session": {
      title: "Tarot + Lenormand theo thời gian",
      description:
        "Một buổi trò chuyện cùng Sarah, xem Tarot và Lenormand trong 30 hoặc 60 phút.",
    },
    "read-others": {
      title: "Đọc vị người khác + trải bài Tarot",
      description:
        "Tìm hiểu về một người khác trong câu chuyện của bạn, kèm một trải bài Tarot.",
    },
    "career-aptitude": {
      title: "Tính cách & nghề nghiệp phù hợp",
      description:
        "Tìm hiểu tính cách của bạn phù hợp với những nghề nghiệp nào.",
    },
    "self-discovery": {
      title: "Khai phá, khám phá bản thân",
      description: "Một buổi 60 phút để nhìn sâu hơn vào chính mình.",
    },
    numerology: {
      title: "Thần số học",
      description:
        "Những con số trong ngày sinh nói gì về tính cách và hành trình của bạn.",
    },
    "matrix-destiny": {
      title: "Matrix Destiny cá nhân",
      description:
        "Đọc ma trận từ ngày sinh: bài học linh hồn, điểm mạnh và điểm yếu.",
    },
    "matrix-couple": {
      title: "Matrix Destiny cặp đôi",
      description:
        "Hiểu hơn về năng lượng và bài học chung của hai người trong mối quan hệ.",
    },
    "past-life-basic": {
      title: "Duyên tiền kiếp cặp đôi (cơ bản)",
      description: "Một góc nhìn nhẹ nhàng về duyên phận giữa hai người.",
    },
    "past-life-deep": {
      title: "Duyên tiền kiếp cặp đôi (chuyên sâu)",
      description: "Phân tích sâu hơn về sợi dây duyên phận của hai người.",
    },
    "solar-return": {
      title: "Solar Return Chart",
      description: "Trong năm nay có thể xảy ra sự kiện gì?",
    },
    astrology: {
      title: "Chiêm tinh chuyên sâu — full bản đồ sao",
      description:
        "Phân tích toàn diện bản đồ sao: tính cách, tiềm năng, tình duyên và sự nghiệp.",
    },
  } as Record<ServiceCode, { title: string; description: string }>,
  units: {
    spread: "/ trải / câu",
    question: "/ câu",
    questions5: "5 câu",
    topic5: "5 câu / chủ đề",
    min30: "30 phút",
    min60: "60 phút",
    file: "/ file",
    fileOrCall: "/ file hoặc call 60'",
  } as Record<PriceUnit, string>,
  deliveries: {
    file5: "Trả file trong vòng 5 ngày",
    file7: "Trả file trong vòng 7 ngày",
    fileOrCall5: "Trả file trong vòng 5 ngày, hoặc call trực tiếp 60 phút",
    none: "",
  } as Record<Delivery, string>,
  groups: {
    cards: {
      title: "Tarot & Lenormand",
      description: "Giải đáp từng câu hỏi, hoặc trò chuyện theo thời gian.",
    },
    self: {
      title: "Khám phá bản thân & nghề nghiệp",
      description: "Hiểu mình hơn qua ngày sinh, con số và những cuộc trò chuyện.",
    },
    love: {
      title: "Cặp đôi & duyên phận",
      description: "Nhìn lại sợi dây kết nối giữa hai người.",
    },
    astro: {
      title: "Chiêm tinh",
      description: "Bản đồ sao và chu kỳ của năm tuổi mới.",
    },
  } as Record<ServiceGroup, { title: string; description: string }>,
  faqs: [
    [
      "Mình chưa biết nên chọn hình thức xem nào?",
      "Bạn cứ chia sẻ điều đang băn khoăn qua Zalo hoặc Facebook. Sarah sẽ lắng nghe và gợi ý Tarot, Lenormand, chiêm tinh hay phương pháp phù hợp trước khi bạn quyết định đặt lịch.",
    ],
    [
      "Buổi tư vấn online diễn ra như thế nào?",
      "Sau khi thống nhất dịch vụ và thời gian, mình sẽ kết nối qua Zalo, Google Meet hoặc Zoom. Bạn chỉ cần chuẩn bị một không gian yên tĩnh và những điều muốn chia sẻ.",
    ],
    [
      "Mình cần chuẩn bị thông tin gì?",
      "Với Tarot và Lenormand, hãy chuẩn bị câu hỏi và bối cảnh bạn muốn chia sẻ. Với chiêm tinh và Solar Return, mình sẽ cần ngày, giờ và nơi sinh; Matrix Destiny cần ngày sinh. Sarah sẽ hướng dẫn cụ thể khi xác nhận lịch.",
    ],
    [
      "Những điều mình chia sẻ có được giữ riêng tư không?",
      "Có. Thông tin liên hệ và nội dung buổi tư vấn chỉ được dùng để chuẩn bị, trao đổi và gửi kết quả cho bạn. Sarah không công khai câu chuyện cá nhân khi chưa có sự đồng ý.",
    ],
    [
      "Mình có thể thay đổi lịch hẹn không?",
      "Bạn hãy nhắn sớm qua kênh đã xác nhận lịch. Mình sẽ cùng bạn tìm một thời gian khác phù hợp cho cả hai.",
    ],
    [
      "Mình đặt lịch với Sarah như thế nào?",
      "Bạn có thể chọn một khung giờ còn trống trên trang đặt hẹn, hoặc đề xuất ngày giờ khác nếu chưa tìm được lịch phù hợp. Yêu cầu sẽ được gửi trực tiếp đến Sarah; cuộc hẹn chính thức được xác nhận sau khi mình liên hệ thống nhất với bạn.",
    ],
    [
      "Giá các dịch vụ là bao nhiêu?",
      "Giá bắt đầu từ {from} cho một câu Tarot; các dịch vụ trả file như Matrix Destiny, Thần số học hay Solar Return có giá cố định theo từng file. Bạn xem bảng giá đầy đủ ở trang Bảng giá. Sarah sẽ thống nhất số tiền và cách thanh toán với bạn trước buổi xem.",
    ],
    [
      "Mình đang sống ở nước ngoài thì đặt lịch được không?",
      "Được. Mọi buổi tư vấn đều diễn ra online. Trang đặt lịch hiển thị giờ Việt Nam (GMT+7) kèm giờ tại nơi bạn đang ở khi bạn chọn khung giờ. Các dịch vụ trả file không phụ thuộc múi giờ.",
    ],
    [
      "Dịch vụ trả file và dịch vụ call khác nhau thế nào?",
      "Dịch vụ trả file (Matrix Destiny, Thần số học, Duyên tiền kiếp, Solar Return, chiêm tinh chuyên sâu…) được gửi lại cho bạn dưới dạng file trong vòng 5 ngày, riêng chiêm tinh full bản đồ sao là 7 ngày. Một số dịch vụ có thể chọn call trực tiếp 60 phút thay cho file.",
    ],
  ] as [string, string][],
};

export type Dictionary = typeof vi;
