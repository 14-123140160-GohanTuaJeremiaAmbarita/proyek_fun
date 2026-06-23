export const company = {
  name: "PT Voksel Electric Tbk",
  ticker: "VOKS",
  sector: "Industrials",
  industry: "Electrical",
  business:
    "Produsen kabel Indonesia untuk kebutuhan tenaga listrik, telekomunikasi, fiber optic, konduktor, dan kabel khusus.",
  founded: "19 April 1971",
  ipo: "20 Desember 1990",
  website: "https://www.voksel.co.id",
  phone: "(+62 21) 57944622",
  fax: "(+62 21) 57944649",
  email: "corsecve@voksel.com, masrana@voksel.co.id",
};

export const addresses = [
  {
    label: "Kantor Pusat Jakarta",
    value:
      "Menara Karya, 3rd Floor, Suite D, Jl. H.R. Rasuna Said Blok X-5 Kav. 1-2, Jakarta Selatan, DKI Jakarta 12950",
    status: "Publik",
  },
  {
    label: "Area Bogor / Cileungsi",
    value:
      "Jl. Raya Narogong Km. 16, Cileungsi, Kabupaten Bogor, Jawa Barat 16820",
    status: "Data sementara, perlu konfirmasi pembimbing",
  },
];

export const products = [
  {
    icon: "P",
    title: "Power Cable",
    image: "/assets/products/power-cable.svg",
    description:
      "Kabel untuk distribusi dan transmisi listrik pada proyek infrastruktur, industri, dan utilitas.",
    tags: ["Energi", "Infrastruktur", "Distribusi"],
  },
  {
    icon: "T",
    title: "Telecommunication Cable",
    image: "/assets/products/telecommunication-cable.svg",
    description:
      "Kabel telekomunikasi untuk mendukung konektivitas suara, data, dan jaringan komunikasi.",
    tags: ["Telekomunikasi", "Data", "Jaringan"],
  },
  {
    icon: "F",
    title: "Fiber Optic Cable",
    image: "/assets/products/fiber-optic-cable.svg",
    description:
      "Kabel serat optik untuk kebutuhan koneksi cepat, stabil, dan berkapasitas besar.",
    tags: ["Fiber Optic", "Broadband", "High Speed"],
  },
  {
    icon: "B",
    title: "Bare Conductor",
    image: "/assets/products/bare-conductor.svg",
    description:
      "Konduktor tanpa isolasi untuk kebutuhan jaringan transmisi dan distribusi tenaga listrik.",
    tags: ["Konduktor", "Transmisi", "Distribusi"],
  },
  {
    icon: "S",
    title: "Special Cable",
    image: "/assets/products/special-cable.svg",
    description:
      "Kabel khusus untuk kebutuhan proyek tertentu, termasuk aplikasi industri dan instalasi spesifik.",
    tags: ["Industri", "Proyek", "Kustom"],
  },
];

export const profilePhotos = [
  {
    title: "Profil Perusahaan",
    image: "/assets/profile/company-profile.svg",
    note: "Ganti dengan foto gedung, kantor, atau area perusahaan yang sudah diizinkan.",
  },
  {
    title: "Area Produksi",
    image: "/assets/profile/production-area.svg",
    note: "Ganti dengan foto area produksi atau dokumentasi magang yang boleh dipublikasikan.",
  },
  {
    title: "Produk Kabel",
    image: "/assets/profile/cable-products.svg",
    note: "Ganti dengan foto produk kabel Voksel dari perusahaan.",
  },
];

export const marketData = {
  lastUpdate: "19 Juni 2026, 16:56",
  stockPrice: "IDR 200",
  change: "+6 (+3,00%)",
  open: "IDR 200",
  previousClose: "IDR 200",
  dayLow: "IDR 200",
  dayHigh: "IDR 210",
  volume: "815 saham",
  value: "IDR 4.155.602.595",
  frequency: "47 kali",
  eps: "IDR -16,51",
  peRatio: "-12 kali",
  marketCap: "IDR 831.121 juta",
  sourceNote:
    "Data pasar bersifat berubah dan tertunda. Gunakan sebagai contoh data publik, bukan acuan transaksi.",
};

export const financialReview = {
  summary:
    "Dataset sementara ini memuat data publik yang berhasil dihimpun untuk kebutuhan frontend. Angka laporan keuangan rinci seperti penjualan bersih, laba rugi, aset, liabilitas, ekuitas, arus kas, dan jumlah karyawan perlu diisi dari laporan resmi perusahaan jika tersedia.",
  availableTopics: [
    "Profil emiten VOKS",
    "Harga saham publik",
    "Kapitalisasi pasar",
    "EPS dan PER",
    "Sektor dan industri",
    "Tanggal berdiri dan IPO",
    "Alamat kantor pusat",
    "Konteks Bogor/Cileungsi",
  ],
  missingTopics: [
    "Penjualan bersih",
    "Laba tahun berjalan",
    "Total aset",
    "Total liabilitas",
    "Total ekuitas",
    "Arus kas",
    "Jumlah karyawan",
    "Volume produksi",
  ],
};

export const internalDatasetTemplate = [
  {
    label: "Penjualan",
    status: "locked",
    fields: ["periode", "segmen", "nilai", "catatan"],
  },
  {
    label: "Karyawan",
    status: "locked",
    fields: ["periode", "departemen", "jumlah", "catatan"],
  },
  {
    label: "Produksi",
    status: "locked",
    fields: ["periode", "produk", "volume", "satuan", "catatan"],
  },
  {
    label: "Data Pasar Publik",
    status: "tersedia",
    fields: ["harga", "marketCap", "eps", "peRatio"],
  },
];
