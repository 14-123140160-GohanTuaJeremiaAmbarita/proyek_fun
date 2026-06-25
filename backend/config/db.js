// config/db.js
// Konfigurasi koneksi ke SQL Server menggunakan package mssql

const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  server: process.env.DB_SERVER || '127.0.0.1', // Menggunakan IP lokal 127.0.0.1 agar lebih cepat resolve dibanding 'localhost'
  database: process.env.DB_DATABASE || 'VokselDB',
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,              // true jika pakai Azure SQL
    trustServerCertificate: true, // true untuk local/dev
    enableArithAbort: true,
  },
};

// Pilih auth: Windows Authentication atau SQL Auth
if (process.env.DB_WINDOWS_AUTH === 'true') {
  dbConfig.options.trustedConnection = true;
} else {
  dbConfig.user = process.env.DB_USER || 'sa';
  dbConfig.password = process.env.DB_PASSWORD || '';
}

// Pool koneksi (singleton)
let pool = null;

// Fungsi Utama untuk Mengambil Koneksi (Sesuai dengan nama di server.js)
const getConnection = async () => {
  if (pool) return pool;
  try {
    pool = await sql.connect(dbConfig);
    console.log('✅ Terhubung ke SQL Server:', dbConfig.server, '/', dbConfig.database);
    return pool;
  } catch (err) {
    console.error('❌ Gagal konek ke SQL Server:', err.message);
    throw err;
  }
};

// Fungsi untuk Menutup Pool saat server dimatikan (Graceful Shutdown)
const closePool = async () => {
  if (pool) {
    try {
      await pool.close();
      console.log('🔌 Koneksi database SQL Server berhasil diputus dengan aman.');
    } catch (err) {
      console.error('❌ Gagal menutup pool koneksi database:', err.message);
    }
  }
};

module.exports = { sql, getConnection, closePool };