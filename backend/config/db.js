// config/db.js
// Konfigurasi koneksi ke SQL Server menggunakan package mssql

const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  server: process.env.DB_SERVER || 'localhost',
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

const getPool = async () => {
  if (pool) return pool;
  try {
    pool = await sql.connect(dbConfig);
    console.log('✅ Terhubung ke SQL Server:', process.env.DB_SERVER, '/', process.env.DB_DATABASE);
    return pool;
  } catch (err) {
    console.error('❌ Gagal konek ke SQL Server:', err.message);
    throw err;
  }
};

module.exports = { sql, getPool };
