import {
  addresses,
  company,
  financialReview,
  marketData,
  products,
} from "./vokselData.js";

const productList = products.map((product) => product.title).join(", ");

const includesAny = (text, keywords) =>
  keywords.some((keyword) => text.includes(keyword));

const missingData = (label) =>
  `Data ${label} tidak ditemukan di dataset frontend saat ini. Tempat dataset sudah disiapkan, tetapi data tersebut perlu diisi dari perusahaan karena sifatnya internal atau terkunci.`;

export const mainQuestions = [
  "Apa itu Voksel?",
  "Apa saja produk Voksel?",
  "Kapan Voksel berdiri dan IPO?",
  "Di mana alamat Voksel?",
];

export function answerQuestion(question) {
  const text = question.toLowerCase();

  if (includesAny(text, ["penjualan", "sales", "omzet", "omset"])) {
    return missingData("penjualan");
  }

  if (includesAny(text, ["karyawan", "pegawai", "sdm", "employee", "employees"])) {
    return missingData("karyawan");
  }

  if (
    includesAny(text, [
      "data keuangan",
      "laporan keuangan",
      "tinjauan keuangan",
      "financial",
      "aset",
      "liabilitas",
      "ekuitas",
      "laba",
      "rugi",
      "arus kas",
      "pendapatan",
    ])
  ) {
    return `${financialReview.summary} Data tersedia sementara: ${financialReview.availableTopics.join(
      ", ",
    )}. Data belum ditemukan: ${financialReview.missingTopics.join(", ")}.`;
  }

  if (includesAny(text, ["market cap", "kapitalisasi", "eps", "per", "harga saham"])) {
    return `Data pasar VOKS terakhir di dataset: harga ${marketData.stockPrice}, perubahan ${marketData.change}, EPS ${marketData.eps}, PER ${marketData.peRatio}, kapitalisasi pasar ${marketData.marketCap}. ${marketData.sourceNote}`;
  }

  if (includesAny(text, ["alamat", "bogor", "cileungsi", "jakarta", "lokasi"])) {
    return `Alamat yang tersedia: ${addresses
      .map((address) => `${address.label}: ${address.value}`)
      .join(" | ")}`;
  }

  if (includesAny(text, ["produk", "kabel", "jual", "membuat"])) {
    return `Produk utama yang ditampilkan di proyek ini meliputi ${productList}. Produk ini digunakan untuk kebutuhan energi, infrastruktur, industri, dan konektivitas.`;
  }

  if (includesAny(text, ["berdiri", "sejarah", "ipo", "kapan", "tahun"])) {
    return `${company.name} berdiri pada ${company.founded}. Perusahaan IPO pada ${company.ipo} dengan kode saham ${company.ticker}.`;
  }

  if (includesAny(text, ["investor", "saham", "ticker", "kode", "bursa", "emiten"])) {
    return `Informasi investor: kode saham ${company.ticker}, sektor ${company.sector}, industri ${company.industry}, IPO ${company.ipo}. Data pasar sementara: harga ${marketData.stockPrice}, market cap ${marketData.marketCap}.`;
  }

  if (includesAny(text, ["dataset", "database", "data internal", "terkunci", "locked"])) {
    return "Tempat dataset sudah disiapkan di src/data/vokselData.js. Untuk data perusahaan yang terjaga, isi bagian template setelah mendapat izin dari perusahaan.";
  }

  if (includesAny(text, ["apa", "profil", "tentang", "voksel", "perusahaan"])) {
    return `${company.name} adalah produsen kabel Indonesia dengan kode saham ${company.ticker}. Fokus bisnisnya meliputi kabel listrik, telekomunikasi, fiber optic, konduktor, dan kabel khusus.`;
  }

  return "Saya belum menemukan jawaban spesifik. Coba tanya tentang profil, produk, sejarah, IPO, alamat, Bogor, data keuangan, penjualan, karyawan, investor, atau dataset.";
}
