# Voksel Electric — Backend API

Backend untuk web profil interaktif **PT Voksel Electric Tbk**.  
Dibangun dengan **Node.js + Express**, terhubung ke **Microsoft SQL Server**.

---

## Struktur Folder

```
backend/
├── server.js               # Entry point
├── test-connection.js      # Script uji koneksi DB
├── .env.example            # Template konfigurasi (copy ke .env)
├── config/
│   └── database.js         # Koneksi & helper SQL Server
├── middleware/
│   └── responseHelper.js   # Format response API
├── routes/
│   ├── company.js          # /api/company
│   ├── products.js         # /api/products
│   ├── finance.js          # /api/finance
│   ├── dataset.js          # /api/dataset (sales, employees, production)
│   └── chatbot.js          # /api/chat
└── data/
    └── setup_database.sql  # Script buat semua tabel di SQL Server
```

---

## Cara Menjalankan

### 1. Install dependency

```bash
npm install
```

### 2. Konfigurasi .env

```bash
# Copy template
copy .env.example .env      # Windows
cp .env.example .env        # Mac/Linux

# Edit .env dengan kredensial SQL Server kamu
```

Isi file `.env`:

```env
PORT=5000
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=VokselDB
DB_USER=sa
DB_PASSWORD=password_kamu
DB_WINDOWS_AUTH=false
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

> Jika pakai **Windows Authentication** (login domain), set `DB_WINDOWS_AUTH=true`  
> dan kosongkan `DB_USER` / `DB_PASSWORD`.

### 3. Setup database

Buka **SQL Server Management Studio (SSMS)** dan jalankan:

```
data/setup_database.sql
```

Script ini akan membuat database `VokselDB` beserta semua tabel yang dibutuhkan.

### 4. Test koneksi

```bash
node test-connection.js
```

### 5. Jalankan server

```bash
# Development (auto-restart dengan nodemon)
npm run dev

# Production
npm start
```

Server berjalan di: `http://localhost:5000`

---

## Daftar Endpoint API

### Health Check
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/health` | Status server & koneksi DB |

### Company
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/company` | Profil perusahaan |
| GET | `/api/company/addresses` | Daftar alamat kantor & pabrik |

### Products
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/products` | Semua produk (`?kategori=&search=`) |
| GET | `/api/products/categories` | Daftar kategori |
| GET | `/api/products/:id` | Detail produk |

### Finance
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/finance/summary` | Ringkasan keuangan terbaru |
| GET | `/api/finance/annual` | Keuangan tahunan (`?dari=2019&sampai=2024`) |
| GET | `/api/finance/investors` | Data pemegang saham |
| GET | `/api/finance/quarterly` | Keuangan per kuartal (`?tahun=2024`) |

### Dataset Internal
| Method | Endpoint | Keterangan |
|--------|----------|------------|
| GET | `/api/dataset/sales` | Data penjualan (paginasi, filter) |
| GET | `/api/dataset/sales/summary` | Ringkasan penjualan per kategori/tahun |
| GET | `/api/dataset/employees` | Data karyawan (filter) |
| GET | `/api/dataset/employees/summary` | Statistik karyawan |
| GET | `/api/dataset/production` | Data produksi (filter) |
| GET | `/api/dataset/production/summary` | Target vs realisasi |

### Chatbot
| Method | Endpoint | Body | Keterangan |
|--------|----------|------|------------|
| POST | `/api/chat` | `{ "message": "..." }` | Jawab pertanyaan dari data DB |

---

## Menghubungkan ke Frontend (React)

Di frontend, ganti file `src/data/vokselData.js` dengan fetch ke API ini.

Contoh:

```js
// Ambil data karyawan
const res  = await fetch('http://localhost:5000/api/dataset/employees/summary');
const json = await res.json();
// json.data.total → total karyawan
```

Untuk chatbot:
```js
const res = await fetch('http://localhost:5000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'berapa total karyawan?' }),
});
const json = await res.json();
// json.data.reply → jawaban chatbot
```

---

## Menyesuaikan Dataset

Saat dataset dari perusahaan sudah diterima:

1. Buka `data/setup_database.sql`
2. Sesuaikan kolom tabel `sales_data`, `employees`, `production_data` dengan kolom asli dataset
3. Import data dengan SSMS (Import Wizard / BULK INSERT / OPENROWSET)
4. Update query di `routes/dataset.js` sesuai nama kolom baru

---

## Deploy (Nanti)

Untuk deploy ke VPS/cloud:

1. Set `NODE_ENV=production` di `.env`
2. Set `FRONTEND_URL` ke domain frontend
3. Gunakan **PM2** untuk menjalankan server:
   ```bash
   npm install -g pm2
   pm2 start server.js --name voksel-backend
   pm2 save
   ```
4. Gunakan **Nginx** sebagai reverse proxy ke port 5000

---

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express 4
- **Database**: Microsoft SQL Server
- **ORM/Driver**: `mssql` (tedious)
- **CORS**: cors
- **Rate Limiting**: express-rate-limit
- **Dev**: nodemon
