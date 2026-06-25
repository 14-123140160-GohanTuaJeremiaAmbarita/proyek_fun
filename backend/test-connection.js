/**
 * test-connection.js
 * Jalankan: node test-connection.js
 * Untuk memverifikasi koneksi SQL Server sebelum start server.
 */
require('dotenv').config();
const { getConnection, closePool, dbConfig } = require('./config/database');

async function testConnection() {
  console.log('\n🔍 Menguji koneksi ke SQL Server...');
  console.log(`   Server   : ${dbConfig.server}:${dbConfig.port}`);
  console.log(`   Database : ${dbConfig.database}`);
  console.log(`   Auth     : ${process.env.DB_WINDOWS_AUTH === 'true' ? 'Windows Auth' : `SQL Auth (${dbConfig.user})`}`);
  console.log('');

  try {
    const pool = await getConnection();

    // Cek versi SQL Server
    const versionResult = await pool.request().query(`SELECT @@VERSION AS version`);
    const version = versionResult.recordset[0].version.split('\n')[0];
    console.log(`✅ Koneksi berhasil!`);
    console.log(`   SQL Server: ${version}`);

    // Cek tabel yang sudah ada
    const tablesResult = await pool.request().query(`
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `);
    const tables = tablesResult.recordset.map(r => r.TABLE_NAME);

    if (tables.length === 0) {
      console.log('\n⚠️  Belum ada tabel. Jalankan data/setup_database.sql terlebih dahulu.');
    } else {
      console.log(`\n📋 Tabel yang ditemukan (${tables.length}):`);
      tables.forEach(t => console.log(`   - ${t}`));

      // Cek tabel yang dibutuhkan backend
      const required = [
        'company_profile', 'company_addresses', 'products',
        'finance_summary', 'investors',
        'sales_data', 'employees', 'production_data'
      ];
      const missing = required.filter(t => !tables.includes(t));

      if (missing.length > 0) {
        console.log(`\n⚠️  Tabel belum ada (jalankan setup_database.sql):`);
        missing.forEach(t => console.log(`   - ${t}`));
      } else {
        console.log('\n✅ Semua tabel backend sudah tersedia!');
      }
    }

    await closePool();
    console.log('\n✅ Test selesai. Backend siap dijalankan dengan: npm run dev\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Koneksi GAGAL:', err.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Pastikan SQL Server berjalan (SQL Server Configuration Manager)');
    console.log('   2. Pastikan TCP/IP diaktifkan di SQL Server Configuration Manager');
    console.log('   3. Cek kredensial di file .env (copy dari .env.example)');
    console.log('   4. Pastikan port 1433 tidak diblokir firewall');
    console.log('   5. Coba: telnet ' + dbConfig.server + ' 1433\n');
    process.exit(1);
  }
}

testConnection();
