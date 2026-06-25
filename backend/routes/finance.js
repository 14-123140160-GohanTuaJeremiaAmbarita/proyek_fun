const express = require('express');
const router  = express.Router();
const { executeQuery, sql } = require('../config/database');
const { successResponse, errorResponse } = require('../middleware/responseHelper');

/**
 * GET /api/finance/summary
 * Ringkasan keuangan terbaru (1 baris terakhir)
 * 
 * Tabel: finance_summary
 * Kolom: id, tahun, total_aset, total_liabilitas, ekuitas,
 *        pendapatan, laba_bersih, laba_per_saham, updated_at
 */
router.get('/summary', async (_req, res) => {
  try {
    const result = await executeQuery(`
      SELECT TOP 1
        id, tahun, total_aset, total_liabilitas, ekuitas,
        pendapatan, laba_bersih, laba_per_saham, updated_at
      FROM finance_summary
      ORDER BY tahun DESC
    `);

    if (!result.recordset.length) {
      return errorResponse(res, 'Data keuangan tidak ditemukan.', 404);
    }

    return successResponse(res, result.recordset[0], 'Ringkasan keuangan berhasil diambil.');
  } catch (err) {
    console.error('[finance/summary] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil ringkasan keuangan.', 500, err.message);
  }
});

/**
 * GET /api/finance/annual
 * Data keuangan tahunan (semua tahun, untuk grafik)
 * 
 * Query params:
 *   ?dari=2019&sampai=2024  → filter rentang tahun
 */
router.get('/annual', async (req, res) => {
  try {
    const { dari, sampai } = req.query;
    const params = {};

    let query = `
      SELECT
        id, tahun, total_aset, total_liabilitas, ekuitas,
        pendapatan, laba_bersih, laba_per_saham
      FROM finance_summary
      WHERE 1=1
    `;

    if (dari) {
      query += ` AND tahun >= @dari`;
      params.dari = { type: sql.Int, value: parseInt(dari) };
    }
    if (sampai) {
      query += ` AND tahun <= @sampai`;
      params.sampai = { type: sql.Int, value: parseInt(sampai) };
    }

    query += ` ORDER BY tahun ASC`;

    const result = await executeQuery(query, params);
    return successResponse(res, result.recordset, `${result.recordset.length} tahun data keuangan.`);
  } catch (err) {
    console.error('[finance/annual] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil data keuangan tahunan.', 500, err.message);
  }
});

/**
 * GET /api/finance/investors
 * Data pemegang saham / investor
 * 
 * Tabel: investors
 * Kolom: id, nama, jenis (Institusi/Individu/Publik), persentase, jumlah_saham
 */
router.get('/investors', async (_req, res) => {
  try {
    const result = await executeQuery(`
      SELECT id, nama, jenis, persentase, jumlah_saham
      FROM investors
      ORDER BY persentase DESC
    `);
    return successResponse(res, result.recordset, 'Data investor berhasil diambil.');
  } catch (err) {
    console.error('[finance/investors] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil data investor.', 500, err.message);
  }
});

/**
 * GET /api/finance/quarterly
 * Data keuangan per kuartal (opsional, jika tersedia di DB)
 * 
 * Tabel: finance_quarterly
 * Kolom: id, tahun, kuartal (Q1/Q2/Q3/Q4), pendapatan, laba_bersih
 * 
 * Query params: ?tahun=2024
 */
router.get('/quarterly', async (req, res) => {
  try {
    const { tahun } = req.query;
    const params = {};

    let query = `
      SELECT id, tahun, kuartal, pendapatan, laba_bersih
      FROM finance_quarterly
      WHERE 1=1
    `;

    if (tahun) {
      query += ` AND tahun = @tahun`;
      params.tahun = { type: sql.Int, value: parseInt(tahun) };
    }

    query += ` ORDER BY tahun DESC, kuartal ASC`;

    const result = await executeQuery(query, params);
    return successResponse(res, result.recordset, 'Data keuangan kuartalan berhasil diambil.');
  } catch (err) {
    console.error('[finance/quarterly] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil data keuangan kuartalan.', 500, err.message);
  }
});

module.exports = router;
