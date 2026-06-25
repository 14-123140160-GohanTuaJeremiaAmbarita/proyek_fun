const express = require('express');
const router  = express.Router();
const { executeQuery, sql } = require('../config/database');
const { successResponse, errorResponse, paginatedResponse } = require('../middleware/responseHelper');

// ============================================================
// DATASET PENJUALAN
// ============================================================

/**
 * GET /api/dataset/sales
 * Data penjualan per produk / per periode
 * 
 * Tabel: sales_data
 * Kolom: id, tanggal, produk_id, produk_nama, kategori,
 *        qty, satuan, harga_satuan, total_penjualan, wilayah, channel
 * 
 * Query params:
 *   ?tahun=2024
 *   ?bulan=1 (1-12)
 *   ?kategori=power_cable
 *   ?wilayah=Jakarta
 *   ?page=1&limit=50
 */
router.get('/sales', async (req, res) => {
  try {
    const { tahun, bulan, kategori, wilayah, page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const params = {};

    let whereClause = `WHERE 1=1`;

    if (tahun) {
      whereClause += ` AND YEAR(tanggal) = @tahun`;
      params.tahun = { type: sql.Int, value: parseInt(tahun) };
    }
    if (bulan) {
      whereClause += ` AND MONTH(tanggal) = @bulan`;
      params.bulan = { type: sql.Int, value: parseInt(bulan) };
    }
    if (kategori) {
      whereClause += ` AND kategori = @kategori`;
      params.kategori = { type: sql.VarChar(100), value: kategori };
    }
    if (wilayah) {
      whereClause += ` AND wilayah LIKE @wilayah`;
      params.wilayah = { type: sql.VarChar(100), value: `%${wilayah}%` };
    }

    // Count total rows
    const countResult = await executeQuery(
      `SELECT COUNT(*) AS total FROM sales_data ${whereClause}`,
      params
    );
    const total = countResult.recordset[0].total;

    // Ambil data dengan pagination
    params.limit  = { type: sql.Int, value: parseInt(limit) };
    params.offset = { type: sql.Int, value: offset };

    const result = await executeQuery(`
      SELECT
        id, tanggal, produk_id, produk_nama, kategori,
        qty, satuan, harga_satuan, total_penjualan, wilayah, channel
      FROM sales_data
      ${whereClause}
      ORDER BY tanggal DESC
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    `, params);

    return paginatedResponse(res, result.recordset, total, page, limit, 'Data penjualan berhasil diambil.');
  } catch (err) {
    console.error('[dataset/sales] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil data penjualan.', 500, err.message);
  }
});

/**
 * GET /api/dataset/sales/summary
 * Ringkasan penjualan per tahun (total & per kategori)
 */
router.get('/sales/summary', async (req, res) => {
  try {
    const { tahun } = req.query;
    const params = {};

    let whereClause = `WHERE 1=1`;
    if (tahun) {
      whereClause += ` AND YEAR(tanggal) = @tahun`;
      params.tahun = { type: sql.Int, value: parseInt(tahun) };
    }

    const result = await executeQuery(`
      SELECT
        YEAR(tanggal) AS tahun,
        kategori,
        COUNT(*) AS jumlah_transaksi,
        SUM(qty) AS total_qty,
        SUM(total_penjualan) AS total_revenue
      FROM sales_data
      ${whereClause}
      GROUP BY YEAR(tanggal), kategori
      ORDER BY tahun DESC, total_revenue DESC
    `, params);

    return successResponse(res, result.recordset, 'Ringkasan penjualan berhasil diambil.');
  } catch (err) {
    console.error('[dataset/sales/summary] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil ringkasan penjualan.', 500, err.message);
  }
});

// ============================================================
// DATASET KARYAWAN
// ============================================================

/**
 * GET /api/dataset/employees
 * Data karyawan
 * 
 * Tabel: employees
 * Kolom: id, nama, departemen, jabatan, lokasi (Jakarta/Cileungsi),
 *        status (Tetap/Kontrak), tanggal_bergabung, gender
 * 
 * Query params:
 *   ?departemen=Produksi
 *   ?lokasi=Cileungsi
 *   ?status=Tetap
 */
router.get('/employees', async (req, res) => {
  try {
    const { departemen, lokasi, status } = req.query;
    const params = {};

    let whereClause = `WHERE 1=1`;

    if (departemen) {
      whereClause += ` AND departemen = @departemen`;
      params.departemen = { type: sql.VarChar(100), value: departemen };
    }
    if (lokasi) {
      whereClause += ` AND lokasi = @lokasi`;
      params.lokasi = { type: sql.VarChar(100), value: lokasi };
    }
    if (status) {
      whereClause += ` AND status = @status`;
      params.status = { type: sql.VarChar(50), value: status };
    }

    const result = await executeQuery(`
      SELECT
        id, nama, departemen, jabatan,
        lokasi, status, tanggal_bergabung, gender
      FROM employees
      ${whereClause}
      ORDER BY departemen ASC, nama ASC
    `, params);

    return successResponse(res, result.recordset, `${result.recordset.length} karyawan ditemukan.`);
  } catch (err) {
    console.error('[dataset/employees] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil data karyawan.', 500, err.message);
  }
});

/**
 * GET /api/dataset/employees/summary
 * Statistik karyawan (per departemen, per lokasi, gender)
 */
router.get('/employees/summary', async (_req, res) => {
  try {
    const byDept = await executeQuery(`
      SELECT departemen, COUNT(*) AS jumlah
      FROM employees
      GROUP BY departemen
      ORDER BY jumlah DESC
    `);

    const byLocation = await executeQuery(`
      SELECT lokasi, COUNT(*) AS jumlah
      FROM employees
      GROUP BY lokasi
    `);

    const byGender = await executeQuery(`
      SELECT gender, COUNT(*) AS jumlah
      FROM employees
      GROUP BY gender
    `);

    const totalResult = await executeQuery(`SELECT COUNT(*) AS total FROM employees`);

    return successResponse(res, {
      total: totalResult.recordset[0].total,
      by_departemen: byDept.recordset,
      by_lokasi: byLocation.recordset,
      by_gender: byGender.recordset,
    }, 'Statistik karyawan berhasil diambil.');
  } catch (err) {
    console.error('[dataset/employees/summary] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil statistik karyawan.', 500, err.message);
  }
});

// ============================================================
// DATASET PRODUKSI
// ============================================================

/**
 * GET /api/dataset/production
 * Data produksi pabrik
 * 
 * Tabel: production_data
 * Kolom: id, tanggal, produk_kategori, target_produksi,
 *        realisasi_produksi, satuan, lokasi_pabrik, shift, keterangan
 * 
 * Query params:
 *   ?tahun=2024
 *   ?bulan=3
 *   ?kategori=fiber_optic
 *   ?lokasi=Cileungsi
 */
router.get('/production', async (req, res) => {
  try {
    const { tahun, bulan, kategori, lokasi } = req.query;
    const params = {};

    let whereClause = `WHERE 1=1`;

    if (tahun) {
      whereClause += ` AND YEAR(tanggal) = @tahun`;
      params.tahun = { type: sql.Int, value: parseInt(tahun) };
    }
    if (bulan) {
      whereClause += ` AND MONTH(tanggal) = @bulan`;
      params.bulan = { type: sql.Int, value: parseInt(bulan) };
    }
    if (kategori) {
      whereClause += ` AND produk_kategori = @kategori`;
      params.kategori = { type: sql.VarChar(100), value: kategori };
    }
    if (lokasi) {
      whereClause += ` AND lokasi_pabrik = @lokasi`;
      params.lokasi = { type: sql.VarChar(100), value: lokasi };
    }

    const result = await executeQuery(`
      SELECT
        id, tanggal, produk_kategori, target_produksi,
        realisasi_produksi, satuan, lokasi_pabrik, shift, keterangan,
        CASE
          WHEN target_produksi > 0
          THEN CAST(realisasi_produksi * 100.0 / target_produksi AS DECIMAL(5,2))
          ELSE 0
        END AS persen_pencapaian
      FROM production_data
      ${whereClause}
      ORDER BY tanggal DESC
    `, params);

    return successResponse(res, result.recordset, `${result.recordset.length} data produksi ditemukan.`);
  } catch (err) {
    console.error('[dataset/production] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil data produksi.', 500, err.message);
  }
});

/**
 * GET /api/dataset/production/summary
 * Ringkasan produksi (target vs realisasi per kategori per tahun)
 */
router.get('/production/summary', async (req, res) => {
  try {
    const { tahun } = req.query;
    const params = {};

    let whereClause = `WHERE 1=1`;
    if (tahun) {
      whereClause += ` AND YEAR(tanggal) = @tahun`;
      params.tahun = { type: sql.Int, value: parseInt(tahun) };
    }

    const result = await executeQuery(`
      SELECT
        YEAR(tanggal) AS tahun,
        produk_kategori,
        SUM(target_produksi) AS total_target,
        SUM(realisasi_produksi) AS total_realisasi,
        CAST(SUM(realisasi_produksi) * 100.0 / NULLIF(SUM(target_produksi), 0) AS DECIMAL(5,2)) AS persen_pencapaian
      FROM production_data
      ${whereClause}
      GROUP BY YEAR(tanggal), produk_kategori
      ORDER BY tahun DESC, persen_pencapaian DESC
    `, params);

    return successResponse(res, result.recordset, 'Ringkasan produksi berhasil diambil.');
  } catch (err) {
    console.error('[dataset/production/summary] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil ringkasan produksi.', 500, err.message);
  }
});

module.exports = router;
