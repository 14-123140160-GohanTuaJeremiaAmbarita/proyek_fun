const sql = require('mssql');
require('dotenv').config();

// Konfigurasi koneksi SQL Server
const dbConfig = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT) || 1433,
  database: process.env.DB_DATABASE || 'VokselDB',
  options: {
    encrypt: false,              // true jika pakai Azure SQL
    trustServerCertificate: true, // untuk SQL Server lokal/self-signed
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Tambahkan auth sesuai konfigurasi
if (process.env.DB_WINDOWS_AUTH === 'true') {
  // Windows Authentication (domain / trusted connection)
  dbConfig.options.trustedConnection = true;
} else {
  // SQL Server Authentication
  dbConfig.user = process.env.DB_USER || 'sa';
  dbConfig.password = process.env.DB_PASSWORD || '';
}

// Pool koneksi singleton
let pool = null;

/**
 * Mendapatkan koneksi pool ke SQL Server.
 * Dibuat sekali lalu di-reuse.
 */
async function getConnection() {
  if (pool && pool.connected) {
    return pool;
  }
  try {
    pool = await sql.connect(dbConfig);
    console.log(`✅ Terhubung ke SQL Server: ${dbConfig.server} / ${dbConfig.database}`);
    return pool;
  } catch (err) {
    console.error('❌ Gagal terhubung ke SQL Server:', err.message);
    throw err;
  }
}

/**
 * Menjalankan query dengan parameter (mencegah SQL Injection).
 * @param {string} query - Query SQL
 * @param {Object} params - { namaParam: { type: sql.VarChar, value: '...' } }
 */
async function executeQuery(query, params = {}) {
  const connection = await getConnection();
  const request = connection.request();

  // Bind semua parameter
  for (const [key, { type, value }] of Object.entries(params)) {
    request.input(key, type, value);
  }

  return await request.query(query);
}

/**
 * Menutup semua koneksi pool (dipanggil saat shutdown).
 */
async function closePool() {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('🔌 Koneksi SQL Server ditutup.');
  }
}

module.exports = { sql, getConnection, executeQuery, closePool, dbConfig };
