const express = require('express');
const router  = express.Router();
const { executeQuery, sql } = require('../config/database');
const { successResponse, errorResponse } = require('../middleware/responseHelper');

/**
 * GET /api/products
 * Daftar semua produk Voksel
 * 
 * Tabel: products
 * Kolom: id, nama, kategori, deskripsi, spesifikasi, gambar_url, aktif
 * 
 * Query params:
 *   ?kategori=power_cable  → filter berdasarkan kategori
 *   ?search=fiber          → cari nama/deskripsi
 */
router.get('/', async (req, res) => {
  try {
    const { kategori, search } = req.query;

    let query = `
      SELECT
        id,
        nama,
        kategori,
        deskripsi,
        spesifikasi,
        gambar_url,
        aktif
      FROM products
      WHERE aktif = 1
    `;
    const params = {};

    if (kategori) {
      query += ` AND kategori = @kategori`;
      params.kategori = { type: sql.VarChar(100), value: kategori };
    }

    if (search) {
      query += ` AND (nama LIKE @search OR deskripsi LIKE @search)`;
      params.search = { type: sql.VarChar(200), value: `%${search}%` };
    }

    query += ` ORDER BY kategori ASC, nama ASC`;

    const result = await executeQuery(query, params);
    return successResponse(res, result.recordset, `${result.recordset.length} produk ditemukan.`);
  } catch (err) {
    console.error('[products] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil data produk.', 500, err.message);
  }
});

/**
 * GET /api/products/categories
 * Daftar kategori produk yang tersedia
 */
router.get('/categories', async (_req, res) => {
  try {
    const result = await executeQuery(`
      SELECT DISTINCT kategori
      FROM products
      WHERE aktif = 1
      ORDER BY kategori ASC
    `);
    const categories = result.recordset.map(r => r.kategori);
    return successResponse(res, categories, 'Kategori produk berhasil diambil.');
  } catch (err) {
    console.error('[products/categories] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil kategori produk.', 500, err.message);
  }
});

/**
 * GET /api/products/:id
 * Detail satu produk berdasarkan ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return errorResponse(res, 'ID produk tidak valid.', 400);
    }

    const result = await executeQuery(
      `SELECT id, nama, kategori, deskripsi, spesifikasi, gambar_url, aktif
       FROM products
       WHERE id = @id AND aktif = 1`,
      { id: { type: sql.Int, value: parseInt(id) } }
    );

    if (!result.recordset.length) {
      return errorResponse(res, 'Produk tidak ditemukan.', 404);
    }

    return successResponse(res, result.recordset[0], 'Data produk berhasil diambil.');
  } catch (err) {
    console.error('[products/:id] Error:', err.message);
    return errorResponse(res, 'Gagal mengambil data produk.', 500, err.message);
  }
});

module.exports = router;
