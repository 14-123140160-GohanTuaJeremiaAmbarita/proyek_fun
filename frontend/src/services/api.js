/**
 * api.js — Service layer terpusat untuk semua komunikasi ke backend.
 * Semua komponen WAJIB fetch data melalui file ini, bukan langsung fetch().
 *
 * Base URL dibaca dari environment variable Vite:
 *   VITE_API_URL=http://localhost:5000  (di file .env)
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Wrapper fetch internal dengan error handling standar.
 */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    const message = json?.message || `HTTP ${response.status}`;
    throw new Error(message);
  }

  return json; // { success, message, data, timestamp, pagination? }
}

// ─── COMPANY ────────────────────────────────────────────────────────────────

/** GET /api/company — profil perusahaan */
export const fetchCompany = () => request('/api/company');

/** GET /api/company/addresses — daftar alamat */
export const fetchAddresses = () => request('/api/company/addresses');

// ─── PRODUCTS ───────────────────────────────────────────────────────────────

/** GET /api/products — semua produk, opsional ?kategori= atau ?search= */
export const fetchProducts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/products${qs ? `?${qs}` : ''}`);
};

/** GET /api/products/:id — detail satu produk */
export const fetchProductById = (id) => request(`/api/products/${id}`);

/** GET /api/products/categories — daftar kategori */
export const fetchCategories = () => request('/api/products/categories');

// ─── FINANCE ────────────────────────────────────────────────────────────────

/** GET /api/finance/summary — ringkasan keuangan terbaru */
export const fetchFinanceSummary = () => request('/api/finance/summary');

/** GET /api/finance/annual — keuangan tahunan, opsional ?dari=2019&sampai=2024 */
export const fetchFinanceAnnual = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/finance/annual${qs ? `?${qs}` : ''}`);
};

/** GET /api/finance/investors — pemegang saham */
export const fetchInvestors = () => request('/api/finance/investors');

/** GET /api/finance/quarterly — data per kuartal */
export const fetchFinanceQuarterly = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/finance/quarterly${qs ? `?${qs}` : ''}`);
};

// ─── DATASET ────────────────────────────────────────────────────────────────

/** GET /api/dataset/sales — data penjualan dengan pagination & filter */
export const fetchSales = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/dataset/sales${qs ? `?${qs}` : ''}`);
};

/** GET /api/dataset/sales/summary — ringkasan penjualan */
export const fetchSalesSummary = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/dataset/sales/summary${qs ? `?${qs}` : ''}`);
};

/** GET /api/dataset/employees — data karyawan */
export const fetchEmployees = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/dataset/employees${qs ? `?${qs}` : ''}`);
};

/** GET /api/dataset/employees/summary — statistik karyawan */
export const fetchEmployeesSummary = () => request('/api/dataset/employees/summary');

/** GET /api/dataset/production — data produksi */
export const fetchProduction = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/dataset/production${qs ? `?${qs}` : ''}`);
};

/** GET /api/dataset/production/summary — ringkasan produksi */
export const fetchProductionSummary = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/dataset/production/summary${qs ? `?${qs}` : ''}`);
};

// ─── CHATBOT ────────────────────────────────────────────────────────────────

/**
 * POST /api/chat — kirim pesan ke chatbot backend
 * @param {string} message
 * @returns {{ reply: string, source: string }}
 */
export const sendChatMessage = (message) =>
  request('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });

// ─── HEALTH ─────────────────────────────────────────────────────────────────

/** GET /api/health — cek apakah backend berjalan */
export const checkHealth = () => request('/api/health');