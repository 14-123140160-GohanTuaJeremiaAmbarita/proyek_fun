window.VOKSEL_DATASET = {
  company: {
    name: "PT Voksel Electric Tbk",
    ticker: "VOKS",
    sector: "Industrials",
    industry: "Electrical",
    business:
      "Produsen kabel, terutama kabel telekomunikasi, kabel listrik, dan kabel fiber optic.",
    founded: "19 April 1971",
    ipo: "20 Desember 1990",
    website: "https://www.voksel.co.id",
  },
  addresses: [
    {
      label: "Kantor Pusat Jakarta",
      value:
        "Menara Karya, 3rd Floor, Suite D, Jl. H.R. Rasuna Said Blok X-5 Kav. 1-2, Jakarta Selatan, DKI Jakarta 12950",
      status: "Publik",
    },
    {
      label: "Area Bogor / Cileungsi",
      value:
        "Jl. Raya Narogong Km. 16, Cileungsi, Kabupaten Bogor, Jawa Barat 16820. Gunakan sebagai data sementara dan konfirmasi kembali dari pembimbing atau dokumen resmi perusahaan sebelum publikasi final.",
      status: "Perlu Konfirmasi Internal",
    },
  ],
  publicMarketData: {
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
  },
  financialReview: {
    status: "temporary-public-dataset",
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
  },
  reportPlaceholders: [
    {
      title: "Laporan Keuangan",
      status: "Perlu file resmi",
      description:
        "Tempat untuk memasukkan angka laporan posisi keuangan, laba rugi, arus kas, dan catatan laporan keuangan dari dokumen resmi perusahaan.",
    },
    {
      title: "Tinjauan Keuangan",
      status: "Perlu file resmi",
      description:
        "Tempat untuk ringkasan analisis pendapatan, beban, laba/rugi, aset, liabilitas, ekuitas, dan arus kas.",
    },
    {
      title: "Informasi Investor",
      status: "Sebagian tersedia",
      description:
        "Data dasar investor tersedia: VOKS, sektor Industrials, industri Electrical, IPO 20 Desember 1990, dan data pasar publik sementara.",
    },
  ],
  publicFinancialData: {
    sales: null,
    revenue: null,
    netProfit: null,
    employees: null,
    note:
      "Dataset internal untuk penjualan, pendapatan, laba, dan karyawan belum tersedia di proyek frontend ini.",
  },
  investorInfo: [
    "Kode saham: VOKS",
    "Sektor: Industrials",
    "Industri: Electrical",
    "Tanggal IPO: 20 Desember 1990",
    "Website investor dan informasi publik dapat diarahkan ke situs resmi Voksel dan sumber data pasar publik.",
  ],
  internalDatasetTemplate: {
    sales: {
      status: "locked",
      rows: [],
      expectedFields: ["periode", "segmen", "nilai", "catatan"],
    },
    employees: {
      status: "locked",
      rows: [],
      expectedFields: ["periode", "departemen", "jumlah", "catatan"],
    },
    production: {
      status: "locked",
      rows: [],
      expectedFields: ["periode", "produk", "volume", "satuan", "catatan"],
    },
  },
};
