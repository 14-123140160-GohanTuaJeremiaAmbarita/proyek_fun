require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { getConnection, closePool } = require('./config/db');

// Import routes
const productRoutes    = require('./routes/products');
const financeRoutes    = require('./routes/finance');
const datasetRoutes    = require('./routes/dataset');
const chatbotRoutes    = require('./routes/chatbot');
const companyRoutes    = require('./routes/company');

const app  = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// MIDDLEWARE
// ============================================================

// CORS — Mengizinkan request dari frontend React port 5173 atau 127.0.0.1
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON & URL-Encoded body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting — Cegah spam request
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 200,
  message: { success: false, message: 'Terlalu banyak request, coba lagi nanti.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Logger Sederhana di Terminal
app.use((req, _res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

// ============================================================
// JEMBATAN UJI COBA (TEST BRIDGE)
// ============================================================
app.get('/api/test-bridge', (_req, res) => {
  res.json({
    success: true,
    message: "Halo Gohan! Jalur dari Backend (Port 5000) menuju Frontend SUKSES BERSARIKAT!",
    databaseStatus: "Connected via sa account"
  });
});

// ============================================================
// ROUTES UTAMA APLIKASI
// ============================================================
app.use('/api/company',  companyRoutes);
app.use('/api/products', productRoutes);
app.use('/api/finance',  financeRoutes);
app.use('/api/dataset',  datasetRoutes);
app.use('/api/chat',     chatbotRoutes);

// Health check endpoint
app.get('/api/health', async (_req, res) => {
  try {
    await getConnection();
    res.json({
      success: true,
      message: 'Server dan database berjalan normal (MSSQLSERVER).',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (err) {
    res.status(503).json({
      success: false,
      message: 'Server berjalan tapi database tidak terhubung.',
      error: err.message,
    });
  }
});

// Root Info
app.get('/', (_req, res) => {
  res.json({
    name: 'Voksel Electric API',
    version: '1.0.0',
    endpoints: ['GET /api/health', 'GET /api/test-bridge'],
  });
});

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
});

// Global Error Handler
app.use((err, _req, res, _next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server.',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
});

// ============================================================
// START SERVER UTAMA
// ============================================================
async function start() {
  try {
    // Memastikan koneksi database SQL Server aman sebelum listen port
    await getConnection();
    console.log('✅ Database terhubung ke SQL Server dengan akun sa.');

    app.listen(PORT, () => {
      console.log('');
      console.log('🚀 Voksel Backend API berjalan lancar');
      console.log(`   Local:   http://localhost:${PORT}`);
      console.log(`   Health:  http://localhost:${PORT}/api/health`);
      console.log(`   Bridge:  http://localhost:${PORT}/api/test-bridge`);
      console.log('');
    });
  } catch (err) {
    console.error('❌ Gagal start server:', err.message);
    process.exit(1);
  }
}

// Graceful Shutdown Handler
process.on('SIGTERM', async () => {
  await closePool();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});

start();