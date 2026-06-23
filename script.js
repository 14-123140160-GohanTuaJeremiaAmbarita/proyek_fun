const company = {
  name: "PT Voksel Electric Tbk",
  ticker: "VOKS",
  sector: "Industrials",
  industry: "Electrical",
  founded: "19 April 1971",
  ipo: "20 Desember 1990",
  business:
    "Produsen kabel, terutama kabel telekomunikasi, kabel listrik, dan kabel fiber optic.",
  address:
    "Menara Karya, 3rd Floor, Suite D, Jl. H.R. Rasuna Said Blok X-5 Kav. 1-2, Jakarta Selatan, DKI Jakarta 12950",
  phone: "(+62 21) 57944622",
  fax: "(+62 21) 57944649",
  email: "corsecve@voksel.com, masrana@voksel.co.id",
  website: "https://www.voksel.co.id",
  marketNote:
    "Data pasar saham dapat berubah. Pada sumber publik IDNFinancials, VOKS tercatat di sektor Industrials dan industri Electrical.",
};

const protectedDataset = window.VOKSEL_DATASET || {};

const bogorInfo = {
  title: "Konteks Magang Bogor",
  summary:
    "Bagian ini dibuat untuk menyesuaikan proyek dengan kebutuhan magang di Bogor. Gunakan sebagai ruang informasi lokal tentang kegiatan produksi, kunjungan, atau unit kerja yang kamu pelajari.",
  confirmation:
    "Alamat unit Bogor perlu dikonfirmasi dari pembimbing atau dokumen internal sebelum dipublikasikan.",
  focus: [
    ["Kegiatan", "Produksi dan pengenalan proses kabel"],
    ["Kebutuhan Web", "Profil lokal, data perusahaan, dan chatbot informasi"],
    ["Status Data", "Siap diisi dengan data resmi dari pembimbing"],
    ["Catatan", "Hindari menampilkan data internal tanpa izin"],
  ],
};

const products = [
  {
    icon: "P",
    title: "Power Cable",
    image: "assets/products/power-cable.svg",
    description:
      "Kabel untuk distribusi dan transmisi listrik pada proyek infrastruktur, industri, dan utilitas.",
    tags: ["Energi", "Infrastruktur", "Distribusi"],
  },
  {
    icon: "T",
    title: "Telecommunication Cable",
    image: "assets/products/telecommunication-cable.svg",
    description:
      "Kabel telekomunikasi untuk mendukung konektivitas suara, data, dan jaringan komunikasi.",
    tags: ["Telekomunikasi", "Data", "Jaringan"],
  },
  {
    icon: "F",
    title: "Fiber Optic Cable",
    image: "assets/products/fiber-optic-cable.svg",
    description:
      "Kabel serat optik untuk kebutuhan koneksi cepat, stabil, dan berkapasitas besar.",
    tags: ["Fiber Optic", "Broadband", "High Speed"],
  },
  {
    icon: "B",
    title: "Bare Conductor",
    image: "assets/products/bare-conductor.svg",
    description:
      "Konduktor tanpa isolasi untuk kebutuhan jaringan transmisi dan distribusi tenaga listrik.",
    tags: ["Konduktor", "Transmisi", "Distribusi"],
  },
  {
    icon: "S",
    title: "Special Cable",
    image: "assets/products/special-cable.svg",
    description:
      "Kabel khusus untuk kebutuhan proyek tertentu, termasuk aplikasi industri dan instalasi spesifik.",
    tags: ["Industri", "Proyek", "Kustom"],
  },
];

const profilePhotos = [
  {
    title: "Profil Perusahaan",
    image: "assets/profile/company-profile.svg",
    note: "Ganti dengan foto gedung, kantor, atau area perusahaan yang sudah diizinkan.",
  },
  {
    title: "Area Produksi",
    image: "assets/profile/production-area.svg",
    note: "Ganti dengan foto area produksi atau dokumentasi magang yang boleh dipublikasikan.",
  },
  {
    title: "Produk Kabel",
    image: "assets/profile/cable-products.svg",
    note: "Ganti dengan foto produk kabel Voksel dari perusahaan.",
  },
];

const faq = [
  {
    keywords: ["apa", "profil", "tentang", "voksel", "perusahaan"],
    answer:
      "PT Voksel Electric Tbk adalah produsen kabel Indonesia dengan kode saham VOKS. Fokus bisnisnya meliputi kabel telekomunikasi, kabel listrik, dan kabel fiber optic.",
  },
  {
    keywords: ["produk", "kabel", "jual", "membuat"],
    answer:
      "Produk utama yang ditampilkan di proyek ini meliputi power cable, telecommunication cable, fiber optic cable, bare conductor, dan special cable. Produk ini digunakan untuk kebutuhan energi, infrastruktur, industri, dan konektivitas.",
  },
  {
    keywords: ["berdiri", "sejarah", "ipo", "kapan", "tahun"],
    answer:
      "Voksel berdiri pada 19 April 1971. Pada 1989 perusahaan menjadi penanaman modal asing melalui joint venture dengan Showa Electric Wire & Cable, lalu IPO pada 20 Desember 1990.",
  },
  {
    keywords: ["bogor", "cileungsi", "pabrik", "magang", "lokal", "unit"],
    answer:
      "Untuk konteks Bogor, web ini disiapkan sebagai profil magang yang menyorot kegiatan kabel, produksi, dan informasi lokal. Alamat detail unit Bogor sebaiknya dikonfirmasi dulu dari pembimbing perusahaan sebelum dipublikasikan.",
  },
  {
    keywords: ["alamat", "kantor", "lokasi", "dimana", "di mana"],
    answer:
      "Alamat Voksel yang tersedia: Kantor Pusat Jakarta di Menara Karya, Jl. H.R. Rasuna Said, Jakarta Selatan. Untuk konteks Bogor, gunakan area Cileungsi, Kabupaten Bogor, tetapi detail alamat operasional perlu dikonfirmasi dari pembimbing atau dokumen resmi perusahaan sebelum dipublikasikan.",
  },
  {
    keywords: ["kontak", "telepon", "email", "fax"],
    answer: `Kontak Voksel: telepon ${company.phone}, fax ${company.fax}, email ${company.email}.`,
  },
  {
    keywords: ["saham", "ticker", "kode", "bursa", "emiten"],
    answer:
      "Kode saham Voksel adalah VOKS. Perusahaan tercatat sebagai emiten sektor Industrials dengan industri Electrical.",
  },
];

const metrics = [
  ["Kode Saham", company.ticker],
  ["Berdiri", "1971"],
  ["IPO", "1990"],
  ["Produk Inti", "5 Lini"],
];

function hasAnyKeyword(question, keywords) {
  return keywords.some((keyword) => question.includes(keyword));
}

function formatMissingData(label) {
  return `Data ${label} tidak ditemukan di dataset frontend saat ini. Tempat dataset sudah disiapkan di file data/voksel-dataset.js, tetapi data tersebut perlu diisi dari perusahaan karena sifatnya internal atau terkunci.`;
}

function answerFromDataset(question) {
  const financial = protectedDataset.publicFinancialData || {};
  const market = protectedDataset.publicMarketData || {};
  const investor = protectedDataset.investorInfo || [];
  const addresses = protectedDataset.addresses || [];

  if (hasAnyKeyword(question, ["penjualan", "sales", "omzet", "omset"])) {
    if (financial.sales || financial.revenue) {
      return `Data penjualan yang tersedia: ${financial.sales || financial.revenue}.`;
    }
    return formatMissingData("penjualan");
  }

  if (hasAnyKeyword(question, ["karyawan", "pegawai", "sdm", "employee", "employees"])) {
    if (financial.employees) {
      return `Data karyawan yang tersedia: ${financial.employees}.`;
    }
    return formatMissingData("karyawan");
  }

  if (hasAnyKeyword(question, ["data keuangan", "laporan keuangan", "tinjauan keuangan", "financial", "finance", "aset", "liabilitas", "ekuitas", "laba", "rugi", "arus kas", "pendapatan"])) {
    const review = protectedDataset.financialReview;
    if (review) {
      return `${review.summary} Data yang tersedia sementara: ${review.availableTopics.join(", ")}. Data yang belum ditemukan: ${review.missingTopics.join(", ")}.`;
    }
    return formatMissingData("laporan keuangan");
  }

  if (hasAnyKeyword(question, ["market cap", "kapitalisasi", "eps", "per", "harga saham"])) {
    if (market.stockPrice) {
      return `Data pasar VOKS terakhir di dataset: harga ${market.stockPrice}, perubahan ${market.change}, EPS ${market.eps}, PER ${market.peRatio}, kapitalisasi pasar ${market.marketCap}. ${market.sourceNote}`;
    }
    return formatMissingData("keuangan publik");
  }

  if (hasAnyKeyword(question, ["investor", "ipo", "bursa", "saham"])) {
    if (investor.length > 0) {
      return `Informasi investor: ${investor.join("; ")}.`;
    }
    return formatMissingData("investor");
  }

  if (hasAnyKeyword(question, ["dataset", "database", "data internal", "terkunci", "locked"])) {
    return "Tempat dataset sudah tersedia di data/voksel-dataset.js. File itu berisi template untuk sales, employees, dan production. Untuk data perusahaan yang terjaga, isi bagian rows setelah mendapat izin dari perusahaan.";
  }

  if (hasAnyKeyword(question, ["alamat", "bogor", "cileungsi", "jakarta"])) {
    if (addresses.length > 0) {
      return `Alamat yang tersedia: ${addresses
        .map((item) => `${item.label}: ${item.value}`)
        .join(" | ")}`;
    }
  }

  return "";
}

function renderProducts() {
  const grid = document.querySelector("#productGrid");
  grid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <img class="product-image" src="${product.image}" alt="Ilustrasi ${product.title}" />
          <div>
            <div class="product-icon">${product.icon}</div>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
          </div>
          <div class="product-tags">
            ${product.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderProfileGallery() {
  document.querySelector("#profileGallery").innerHTML = profilePhotos
    .map(
      (photo) => `
        <article class="gallery-card">
          <img src="${photo.image}" alt="${photo.title}" />
          <div>
            <h3>${photo.title}</h3>
            <p>${photo.note}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderCompanyData() {
  const rows = [
    ["Nama", company.name],
    ["Kode Saham", company.ticker],
    ["Sektor", company.sector],
    ["Industri", company.industry],
    ["Berdiri", company.founded],
    ["IPO", company.ipo],
    ["Bisnis", company.business],
    ["Alamat Jakarta", company.address],
    [
      "Alamat Bogor",
      "Jl. Raya Narogong Km. 16, Cileungsi, Kabupaten Bogor, Jawa Barat 16820. Data sementara, konfirmasi kembali dari pembimbing atau dokumen resmi.",
    ],
    ["Kontak", `${company.phone} / ${company.email}`],
  ];

  document.querySelector("#companyTable").innerHTML = rows
    .map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`)
    .join("");

  document.querySelector("#metricBoard").innerHTML = metrics
    .map(
      ([label, value]) => `
        <article class="metric-card">
          <span>${label}</span>
          <strong>${value}</strong>
        </article>
      `,
    )
    .join("");
}

function renderDatasetStatus() {
  const internal = protectedDataset.internalDatasetTemplate || {};
  const statuses = [
    ["Penjualan", internal.sales?.status || "belum tersedia"],
    ["Karyawan", internal.employees?.status || "belum tersedia"],
    ["Produksi", internal.production?.status || "belum tersedia"],
    ["Data Pasar Publik", protectedDataset.publicMarketData?.stockPrice ? "tersedia" : "belum tersedia"],
  ];

  document.querySelector("#datasetStatus").innerHTML = statuses
    .map(
      ([label, status]) => `
        <article class="dataset-status-card">
          <span>${label}</span>
          <strong>${status}</strong>
        </article>
      `,
    )
    .join("");
}

function renderFinancialReview() {
  const review = protectedDataset.financialReview || {};
  const reports = protectedDataset.reportPlaceholders || [];
  const available = review.availableTopics || [];
  const missing = review.missingTopics || [];

  document.querySelector("#financialReview").innerHTML = `
    <article class="finance-summary">
      <h3>Tinjauan keuangan sementara</h3>
      <p>${review.summary || "Ringkasan tinjauan keuangan belum tersedia."}</p>
      <div class="finance-columns">
        <div>
          <h4>Data tersedia</h4>
          <ul>${available.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
        <div>
          <h4>Belum ditemukan</h4>
          <ul>${missing.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
    </article>
    <div class="report-grid">
      ${reports
        .map(
          (report) => `
            <article class="report-card">
              <span>${report.status}</span>
              <h3>${report.title}</h3>
              <p>${report.description}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderBogorInfo() {
  document.querySelector("#bogorFacts").innerHTML = bogorInfo.focus
    .map(
      ([label, value]) => `
        <article class="bogor-fact">
          <span>${label}</span>
          <strong>${value}</strong>
        </article>
      `,
    )
    .join("");
}

function addMessage(type, text) {
  const chatMessages = document.querySelector("#chatMessages");
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotAnswer(question) {
  const normalized = question.toLowerCase();
  const datasetAnswer = answerFromDataset(normalized);
  if (datasetAnswer) return datasetAnswer;

  const scored = faq
    .map((item) => ({
      item,
      score: item.keywords.reduce(
        (total, keyword) => total + (normalized.includes(keyword) ? 1 : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score);

  if (scored[0].score > 0) {
    return scored[0].item.answer;
  }

  return "Saya belum menemukan jawaban spesifik. Coba tanya tentang profil, produk, sejarah, IPO, alamat, kontak, atau kode saham Voksel.";
}

function setupChatbot() {
  const form = document.querySelector("#chatForm");
  const input = document.querySelector("#chatInput");
  const clearButton = document.querySelector("#clearChat");

  addMessage(
    "bot",
    "Halo, saya Voksel Bot. Silakan tanya tentang profil perusahaan, produk, sejarah, alamat, kontak, atau kode saham Voksel.",
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    addMessage("user", question);
    input.value = "";

    window.setTimeout(() => {
      addMessage("bot", getBotAnswer(question));
    }, 260);
  });

  clearButton.addEventListener("click", () => {
    document.querySelector("#chatMessages").innerHTML = "";
    addMessage("bot", "Chat sudah direset. Mau tanya apa tentang Voksel?");
  });

  document.querySelectorAll("[data-question]").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.dataset.question;
      form.requestSubmit();
    });
  });
}

function setupTimeline() {
  document.querySelectorAll(".timeline-item").forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelectorAll(".timeline-item")
        .forEach((button) => button.classList.remove("active"));
      item.classList.add("active");
    });
  });
}

function setupCanvas() {
  const canvas = document.querySelector("#networkCanvas");
  const context = canvas.getContext("2d");
  const points = Array.from({ length: 58 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0008,
    vy: (Math.random() - 0.5) * 0.0008,
  }));

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function drawCable(x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = "rgba(255,255,255,0.28)";
    context.stroke();
  }

  function tick() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);

    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0 || point.x > 1) point.vx *= -1;
      if (point.y < 0 || point.y > 1) point.vy *= -1;
    });

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const dx = (a.x - b.x) * width;
        const dy = (a.y - b.y) * height;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 145) {
          context.beginPath();
          context.moveTo(a.x * width, a.y * height);
          context.lineTo(b.x * width, b.y * height);
          context.strokeStyle = `rgba(104, 231, 222, ${1 - distance / 145})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }
    }

    points.forEach((point, index) => {
      const color = index % 3 === 0 ? "#68e7de" : index % 3 === 1 ? "#ffffff" : "#6aa8ff";
      drawCable(point.x * width, point.y * height, index % 3 === 0 ? 3.4 : 2.4, color);
    });

    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  resize();
  tick();
}

renderProducts();
renderProfileGallery();
renderCompanyData();
renderFinancialReview();
renderDatasetStatus();
renderBogorInfo();
setupTimeline();
setupChatbot();
setupCanvas();
