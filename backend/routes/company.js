const express = require('express');
const router  = express.Router();
const { executeQuery, sql } = require('../config/database');
const { successResponse, errorResponse } = require('../middleware/responseHelper');

/**
 * GET /api/company
 * Informasi umum PT Voksel Electric Tbk
 * 
 * Tabel yang dibutuhkan: company_profile
 * Kolom: id, nama, ticker, berdiri, kantor_pusat, pabrik,
 *        deskripsi, website, telepon, email
 */
router.get('/', async (_req, res) => {
  try {
    const result = await executeQuery(`
      SELECT
        id,
        nama,
        ticker,
        tahun_berdiri,
        kantor_pusat,
        alamat_pabrik,
        deskripsi,
        website,
        telepon,
        email
      FROM company_profile
      WHERE id = 1
    `);

    if (!result.recordset.length) {
      return errorResponse(res, 'Data perusahaan tidak ditemukan.', 404);
    }

    return successResponse(res, result.recordset[0], 'Data perusahaan berhasil diambil.');
  } catch (err) {
    console.error('[company] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil data perusahaan.', 500, err.message);
  }
});

/**
 * GET /api/company/addresses
 * Daftar alamat kantor & pabrik
 * 
 * Tabel: company_addresses
 * Kolom: id, tipe (Kantor/Pabrik), kota, alamat_lengkap, telepon
 */
router.get('/addresses', async (_req, res) => {
  try {
    const result = await executeQuery(`
      SELECT id, tipe, kota, alamat_lengkap, telepon
      FROM company_addresses
      ORDER BY tipe ASC
    `);
    return successResponse(res, result.recordset, 'Data alamat berhasil diambil.');
  } catch (err) {
    console.error('[company/addresses] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil data alamat.', 500, err.message);
  }
});

module.exports = router;
