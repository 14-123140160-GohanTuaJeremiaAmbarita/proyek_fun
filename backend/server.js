require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { getConnection, closePool } = require('./config/database');

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

// CORS — izinkan request dari frontend React
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting — cegah spam request
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 200,
  message: { success: false, message: 'Terlalu banyak request, coba lagi nanti.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Logger sederhana
app.use((req, _res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

// ============================================================
// ROUTES
// ============================================================
app.use('/api/company',  companyRoutes);
app.use('/api/products', productRoutes);
app.use('/api/finance',  financeRoutes);
app.use('/api/dataset',  datasetRoutes);
app.use('/api/chat',     chatbotRoutes);

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    await getConnection();
    res.json({
      success: true,
      message: 'Server dan database berjalan normal.',
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

// Root
app.get('/', (_req, res) => {
  res.json({
    name: 'Voksel Electric API',
    version: '1.0.0',
    docs: 'Lihat README.md untuk daftar endpoint.',
    endpoints: [
      'GET  /api/health',
      'GET  /api/company',
      'GET  /api/products',
      'GET  /api/products/:id',
      'GET  /api/finance/summary',
      'GET  /api/finance/annual',
      'GET  /api/finance/investors',
      'GET  /api/dataset/sales',
      'GET  /api/dataset/employees',
      'GET  /api/dataset/production',
      'POST /api/chat',
    ],
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server.',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
});

// ============================================================
// START SERVER
// ============================================================
async function start() {
  try {
    // Coba koneksi DB saat startup
    await getConnection();
    app.listen(PORT, () => {
      console.log('');
      console.log('🚀 Voksel Backend API berjalan');
      console.log(`   Local:   http://localhost:${PORT}`);
      console.log(`   Health:  http://localhost:${PORT}/api/health`);
      console.log('');
    });
  } catch (err) {
    console.error('❌ Gagal start server:', err.message);
    console.log('⚠️  Pastikan SQL Server berjalan dan .env sudah dikonfigurasi.');
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutdown signal diterima...');
  await closePool();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n🛑 Ctrl+C diterima...');
  await closePool();
  process.exit(0);
});

start();
