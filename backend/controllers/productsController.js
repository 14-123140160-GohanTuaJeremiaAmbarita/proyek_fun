// controllers/productsController.js
// Endpoint untuk data produk Voksel

const { sql, getPool } = require('../config/db');

// GET /api/products
// Ambil semua produk dari database
const getAllProducts = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT
        id,
        nama_produk,
        kategori,
        deskripsi,
        spesifikasi,
        satuan,
        foto_url,
        created_at
      FROM products
      ORDER BY kategori, nama_produk
    `);
    res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error('getAllProducts error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil data produk', error: err.message });
  }
};

// GET /api/products/:id
// Ambil detail satu produk
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT
          id,
          nama_produk,
          kategori,
          deskripsi,
          spesifikasi,
          satuan,
          foto_url,
          created_at
        FROM products
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }
    res.json({ success: true, data: result.recordset[0] });
  } catch (err) {
    console.error('getProductById error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil produk', error: err.message });
  }
};

// GET /api/products/kategori/:kategori
// Filter produk berdasarkan kategori
// Contoh kategori: power_cable, telecom_cable, fiber_optic, bare_conductor, special_cable
const getProductsByKategori = async (req, res) => {
  const { kategori } = req.params;
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('kategori', sql.NVarChar, kategori)
      .query(`
        SELECT
          id,
          nama_produk,
          kategori,
          deskripsi,
          spesifikasi,
          satuan,
          foto_url
        FROM products
        WHERE kategori = @kategori
        ORDER BY nama_produk
      `);
    res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error('getProductsByKategori error:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil produk', error: err.message });
  }
};

module.exports = { getAllProducts, getProductById, getProductsByKategori };
