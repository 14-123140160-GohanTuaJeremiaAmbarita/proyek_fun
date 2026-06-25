const express = require('express');
const router  = express.Router();
const { executeQuery, sql } = require('../config/database');
const { successResponse, errorResponse } = require('../middleware/responseHelper');

/**
 * POST /api/chat
 * Chatbot yang menjawab pertanyaan tentang Voksel berdasarkan data DB.
 * 
 * Body: { message: "berapa total karyawan?" }
 * Response: { success: true, data: { reply: "...", source: "employees" } }
 */
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return errorResponse(res, 'Pesan tidak boleh kosong.', 400);
    }

    const msg = message.toLowerCase().trim();
    let reply  = null;
    let source = 'general';

    // ── KARYAWAN ──────────────────────────────────────────────
    if (
      msg.includes('karyawan') || msg.includes('pegawai') ||
      msg.includes('sdm') || msg.includes('tenaga kerja')
    ) {
      source = 'employees';

      if (msg.includes('total') || msg.includes('berapa') || msg.includes('jumlah')) {
        const r = await executeQuery(`
          SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN lokasi = 'Jakarta' THEN 1 ELSE 0 END) AS jakarta,
            SUM(CASE WHEN lokasi = 'Cileungsi' THEN 1 ELSE 0 END) AS cileungsi,
            SUM(CASE WHEN status = 'Tetap' THEN 1 ELSE 0 END) AS tetap,
            SUM(CASE WHEN status = 'Kontrak' THEN 1 ELSE 0 END) AS kontrak
          FROM employees
        `);
        const d = r.recordset[0];
        reply = `PT Voksel Electric memiliki total ${d.total} karyawan. ` +
                `Terdiri dari ${d.tetap} karyawan tetap dan ${d.kontrak} karyawan kontrak. ` +
                `Lokasi Jakarta: ${d.jakarta} orang, Cileungsi: ${d.cileungsi} orang.`;

      } else if (msg.includes('departemen') || msg.includes('divisi')) {
        const r = await executeQuery(`
          SELECT TOP 5 departemen, COUNT(*) AS jumlah
          FROM employees
          GROUP BY departemen
          ORDER BY jumlah DESC
        `);
        const list = r.recordset.map(d => `${d.departemen} (${d.jumlah})`).join(', ');
        reply = `Departemen dengan karyawan terbanyak: ${list}.`;
      }
    }

    // ── PENJUALAN / SALES ─────────────────────────────────────
    else if (
      msg.includes('penjualan') || msg.includes('revenue') ||
      msg.includes('pendapatan') || msg.includes('omzet') || msg.includes('sales')
    ) {
      source = 'sales';
      const tahunMatch = msg.match(/\b(20\d{2})\b/);

      if (tahunMatch) {
        const tahun = parseInt(tahunMatch[1]);
        const r = await executeQuery(`
          SELECT
            SUM(total_penjualan) AS total_revenue,
            COUNT(*) AS jumlah_transaksi,
            TOP_KATEGORI = (
              SELECT TOP 1 kategori FROM sales_data
              WHERE YEAR(tanggal) = @tahun
              GROUP BY kategori ORDER BY SUM(total_penjualan) DESC
            )
          FROM sales_data
          WHERE YEAR(tanggal) = @tahun
        `, { tahun: { type: sql.Int, value: tahun } });

        const d = r.recordset[0];
        if (d.total_revenue) {
          const fmt = new Intl.NumberFormat('id-ID').format(d.total_revenue);
          reply = `Penjualan tahun ${tahun}: total Rp ${fmt} dari ${d.jumlah_transaksi} transaksi. ` +
                  `Kategori terlaris: ${d.TOP_KATEGORI || '-'}.`;
        } else {
          reply = `Belum ada data penjualan untuk tahun ${tahun}.`;
        }
      } else {
        const r = await executeQuery(`
          SELECT TOP 1
            YEAR(tanggal) AS tahun,
            SUM(total_penjualan) AS total_revenue
          FROM sales_data
          GROUP BY YEAR(tanggal)
          ORDER BY tahun DESC
        `);
        if (r.recordset.length) {
          const d = r.recordset[0];
          const fmt = new Intl.NumberFormat('id-ID').format(d.total_revenue);
          reply = `Penjualan terakhir (${d.tahun}): Rp ${fmt}. Sebutkan tahun spesifik untuk detail lebih lengkap.`;
        } else {
          reply = 'Data penjualan belum tersedia saat ini.';
        }
      }
    }

    // ── PRODUKSI ──────────────────────────────────────────────
    else if (
      msg.includes('produksi') || msg.includes('manufaktur') ||
      msg.includes('pabrik') || msg.includes('produk')
    ) {
      source = 'production';
      const tahunMatch = msg.match(/\b(20\d{2})\b/);
      const params = {};
      let whereYear = '';

      if (tahunMatch) {
        whereYear = ` AND YEAR(tanggal) = @tahun`;
        params.tahun = { type: sql.Int, value: parseInt(tahunMatch[1]) };
      }

      const r = await executeQuery(`
        SELECT TOP 1
          YEAR(tanggal) AS tahun,
          SUM(target_produksi) AS total_target,
          SUM(realisasi_produksi) AS total_realisasi,
          CAST(SUM(realisasi_produksi) * 100.0 / NULLIF(SUM(target_produksi),0) AS DECIMAL(5,2)) AS persen
        FROM production_data
        WHERE 1=1 ${whereYear}
        GROUP BY YEAR(tanggal)
        ORDER BY tahun DESC
      `, params);

      if (r.recordset.length) {
        const d = r.recordset[0];
        reply = `Produksi tahun ${d.tahun}: target ${d.total_target}, realisasi ${d.total_realisasi} ` +
                `(pencapaian ${d.persen}%).`;
      } else {
        reply = 'Data produksi belum tersedia saat ini.';
      }
    }

    // ── KEUANGAN / FINANSIAL ──────────────────────────────────
    else if (
      msg.includes('keuangan') || msg.includes('aset') ||
      msg.includes('laba') || msg.includes('liabilitas') || msg.includes('ekuitas')
    ) {
      source = 'finance';
      const r = await executeQuery(`
        SELECT TOP 1
          tahun, total_aset, total_liabilitas, ekuitas,
          pendapatan, laba_bersih, laba_per_saham
        FROM finance_summary
        ORDER BY tahun DESC
      `);

      if (r.recordset.length) {
        const d = r.recordset[0];
        const fmtAset     = new Intl.NumberFormat('id-ID').format(d.total_aset);
        const fmtPendapat = new Intl.NumberFormat('id-ID').format(d.pendapatan);
        const fmtLaba     = new Intl.NumberFormat('id-ID').format(d.laba_bersih);
        reply = `Keuangan PT Voksel Electric tahun ${d.tahun}: ` +
                `Total aset Rp ${fmtAset}, pendapatan Rp ${fmtPendapat}, ` +
                `laba bersih Rp ${fmtLaba}, laba per saham Rp ${d.laba_per_saham}.`;
      } else {
        reply = 'Data keuangan belum tersedia saat ini.';
      }
    }

    // ── INVESTOR / SAHAM ──────────────────────────────────────
    else if (
      msg.includes('investor') || msg.includes('saham') ||
      msg.includes('pemegang') || msg.includes('vksel')
    ) {
      source = 'investors';
      const r = await executeQuery(`
        SELECT TOP 5 nama, jenis, persentase
        FROM investors
        ORDER BY persentase DESC
      `);

      if (r.recordset.length) {
        const list = r.recordset.map(d => `${d.nama} (${d.persentase}%)`).join(', ');
        reply = `Pemegang saham terbesar PT Voksel Electric: ${list}. Ticker saham: VKSEL.`;
      } else {
        reply = 'Data investor belum tersedia.';
      }
    }

    // ── PRODUK PERUSAHAAN ─────────────────────────────────────
    else if (
      msg.includes('power cable') || msg.includes('fiber optic') ||
      msg.includes('kabel') || msg.includes('bare conductor') ||
      msg.includes('telecom') || msg.includes('kategori produk')
    ) {
      source = 'products';
      const r = await executeQuery(`
        SELECT nama, kategori, deskripsi
        FROM products
        WHERE aktif = 1
        ORDER BY kategori ASC
      `);
      if (r.recordset.length) {
        const list = r.recordset.map(d => d.nama).join(', ');
        reply = `Produk PT Voksel Electric: ${list}. Ketik nama produk untuk info lebih detail.`;
      } else {
        reply = 'Data produk belum tersedia.';
      }
    }

    // ── ALAMAT / LOKASI ───────────────────────────────────────
    else if (
      msg.includes('alamat') || msg.includes('lokasi') ||
      msg.includes('jakarta') || msg.includes('cileungsi') || msg.includes('bogor')
    ) {
      source = 'company';
      const r = await executeQuery(`
        SELECT tipe, kota, alamat_lengkap, telepon
        FROM company_addresses
        ORDER BY tipe ASC
      `);
      if (r.recordset.length) {
        const list = r.recordset.map(d => `${d.tipe} ${d.kota}: ${d.alamat_lengkap}`).join(' | ');
        reply = `Alamat PT Voksel Electric — ${list}.`;
      } else {
        reply = 'PT Voksel Electric berkantor di Jakarta (Wisma Indocement) dan pabrik di Cileungsi, Bogor.';
      }
    }

    // ── DEFAULT / TIDAK DIKENALI ──────────────────────────────
    if (!reply) {
      reply = 'Maaf, saya belum bisa menjawab pertanyaan itu. Anda bisa bertanya tentang: ' +
              'karyawan, penjualan, produksi, keuangan, investor, produk, atau alamat Voksel.';
      source = 'general';
    }

    return successResponse(res, { reply, source }, 'Chatbot menjawab.');
  } catch (err) {
    console.error('[chatbot] Error:', err.message);
    return errorResponse(res, 'Chatbot mengalami kesalahan.', 500, err.message);
  }
});

module.exports = router;
