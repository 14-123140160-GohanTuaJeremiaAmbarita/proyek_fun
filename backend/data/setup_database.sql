-- ============================================================
-- VOKSEL ELECTRIC DATABASE SETUP
-- Jalankan script ini di SQL Server Management Studio (SSMS)
-- atau dengan sqlcmd sebelum menjalankan backend.
-- ============================================================

-- Buat database (jika belum ada)
-- Ganti 'VokselDB' sesuai nama yang dipakai di .env
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'VokselDB')
BEGIN
    CREATE DATABASE VokselDB;
END
GO

USE VokselDB;
GO

-- ============================================================
-- TABEL: company_profile
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='company_profile' AND xtype='U')
CREATE TABLE company_profile (
    id              INT             PRIMARY KEY IDENTITY(1,1),
    nama            NVARCHAR(200)   NOT NULL,
    ticker          NVARCHAR(20),
    tahun_berdiri   INT,
    kantor_pusat    NVARCHAR(200),
    alamat_pabrik   NVARCHAR(300),
    deskripsi       NVARCHAR(MAX),
    website         NVARCHAR(100),
    telepon         NVARCHAR(50),
    email           NVARCHAR(100),
    updated_at      DATETIME        DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABEL: company_addresses
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='company_addresses' AND xtype='U')
CREATE TABLE company_addresses (
    id              INT             PRIMARY KEY IDENTITY(1,1),
    tipe            NVARCHAR(50),   -- 'Kantor' atau 'Pabrik'
    kota            NVARCHAR(100),
    alamat_lengkap  NVARCHAR(500),
    telepon         NVARCHAR(50)
);
GO

-- ============================================================
-- TABEL: products
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='products' AND xtype='U')
CREATE TABLE products (
    id              INT             PRIMARY KEY IDENTITY(1,1),
    nama            NVARCHAR(200)   NOT NULL,
    kategori        NVARCHAR(100),  -- power_cable, telecom_cable, fiber_optic, bare_conductor, special_cable
    deskripsi       NVARCHAR(MAX),
    spesifikasi     NVARCHAR(MAX),
    gambar_url      NVARCHAR(300),
    aktif           BIT             DEFAULT 1,
    created_at      DATETIME        DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABEL: finance_summary (keuangan tahunan)
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='finance_summary' AND xtype='U')
CREATE TABLE finance_summary (
    id                  INT             PRIMARY KEY IDENTITY(1,1),
    tahun               INT             NOT NULL UNIQUE,
    total_aset          BIGINT,
    total_liabilitas    BIGINT,
    ekuitas             BIGINT,
    pendapatan          BIGINT,
    laba_bersih         BIGINT,
    laba_per_saham      DECIMAL(10,2),
    updated_at          DATETIME        DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABEL: finance_quarterly (keuangan per kuartal, opsional)
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='finance_quarterly' AND xtype='U')
CREATE TABLE finance_quarterly (
    id              INT             PRIMARY KEY IDENTITY(1,1),
    tahun           INT             NOT NULL,
    kuartal         NVARCHAR(5),    -- Q1, Q2, Q3, Q4
    pendapatan      BIGINT,
    laba_bersih     BIGINT,
    updated_at      DATETIME        DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABEL: investors (pemegang saham)
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='investors' AND xtype='U')
CREATE TABLE investors (
    id              INT             PRIMARY KEY IDENTITY(1,1),
    nama            NVARCHAR(200)   NOT NULL,
    jenis           NVARCHAR(50),   -- Institusi, Individu, Publik
    persentase      DECIMAL(5,2),
    jumlah_saham    BIGINT,
    updated_at      DATETIME        DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABEL: sales_data (dataset penjualan)
-- SESUAIKAN kolom ini dengan dataset asli dari perusahaan!
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='sales_data' AND xtype='U')
CREATE TABLE sales_data (
    id                  INT             PRIMARY KEY IDENTITY(1,1),
    tanggal             DATE            NOT NULL,
    produk_id           INT,
    produk_nama         NVARCHAR(200),
    kategori            NVARCHAR(100),
    qty                 DECIMAL(15,3),
    satuan              NVARCHAR(20),
    harga_satuan        DECIMAL(18,2),
    total_penjualan     DECIMAL(18,2),
    wilayah             NVARCHAR(100),
    channel             NVARCHAR(100),  -- Direct, Distributor, Export, dll
    created_at          DATETIME        DEFAULT GETDATE()
);
GO

-- Index untuk performa query filter
CREATE INDEX IX_sales_tanggal   ON sales_data(tanggal);
CREATE INDEX IX_sales_kategori  ON sales_data(kategori);
GO

-- ============================================================
-- TABEL: employees (dataset karyawan)
-- SESUAIKAN kolom ini dengan dataset asli dari perusahaan!
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='employees' AND xtype='U')
CREATE TABLE employees (
    id                  INT             PRIMARY KEY IDENTITY(1,1),
    nama                NVARCHAR(200),
    departemen          NVARCHAR(100),
    jabatan             NVARCHAR(150),
    lokasi              NVARCHAR(100),  -- Jakarta, Cileungsi
    status              NVARCHAR(50),   -- Tetap, Kontrak
    tanggal_bergabung   DATE,
    gender              NVARCHAR(20),   -- Laki-laki, Perempuan
    created_at          DATETIME        DEFAULT GETDATE()
);
GO

-- ============================================================
-- TABEL: production_data (dataset produksi)
-- SESUAIKAN kolom ini dengan dataset asli dari perusahaan!
-- ============================================================
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='production_data' AND xtype='U')
CREATE TABLE production_data (
    id                  INT             PRIMARY KEY IDENTITY(1,1),
    tanggal             DATE            NOT NULL,
    produk_kategori     NVARCHAR(100),
    target_produksi     DECIMAL(15,3),
    realisasi_produksi  DECIMAL(15,3),
    satuan              NVARCHAR(20),
    lokasi_pabrik       NVARCHAR(100),  -- Jakarta, Cileungsi
    shift               NVARCHAR(20),   -- Pagi, Siang, Malam
    keterangan          NVARCHAR(300),
    created_at          DATETIME        DEFAULT GETDATE()
);
GO

CREATE INDEX IX_prod_tanggal    ON production_data(tanggal);
CREATE INDEX IX_prod_kategori   ON production_data(produk_kategori);
GO

-- ============================================================
-- DATA AWAL (seed) — isi yang sudah diketahui publik
-- Hapus/skip bagian ini jika data akan di-import dari file
-- ============================================================

-- Profil perusahaan
IF NOT EXISTS (SELECT 1 FROM company_profile WHERE id = 1)
INSERT INTO company_profile (nama, ticker, tahun_berdiri, kantor_pusat, alamat_pabrik, deskripsi, website, telepon, email)
VALUES (
    N'PT Voksel Electric Tbk',
    N'VKSEL',
    1971,
    N'Wisma Indocement Lantai 8, Jl. Jenderal Sudirman Kav. 70-71, Jakarta',
    N'Jl. Raya Narogong Km. 16, Cileungsi, Bogor, Jawa Barat',
    N'PT Voksel Electric Tbk adalah perusahaan manufaktur kabel listrik dan telekomunikasi terkemuka di Indonesia yang berdiri sejak 1971.',
    N'https://www.voksel.co.id',
    N'(021) 251-1000',
    N'info@voksel.co.id'
);
GO

-- Alamat
IF NOT EXISTS (SELECT 1 FROM company_addresses)
BEGIN
    INSERT INTO company_addresses (tipe, kota, alamat_lengkap, telepon) VALUES
    (N'Kantor', N'Jakarta', N'Wisma Indocement Lantai 8, Jl. Jenderal Sudirman Kav. 70-71, Jakarta Selatan 12910', N'(021) 251-1000'),
    (N'Pabrik',  N'Cileungsi, Bogor', N'Jl. Raya Narogong Km. 16, Cileungsi, Bogor, Jawa Barat 16820', N'(021) 823-0000');
END
GO

-- Produk
IF NOT EXISTS (SELECT 1 FROM products)
BEGIN
    INSERT INTO products (nama, kategori, deskripsi) VALUES
    (N'Power Cable', N'power_cable', N'Kabel daya untuk transmisi dan distribusi listrik tegangan rendah, menengah, dan tinggi.'),
    (N'Telecommunication Cable', N'telecom_cable', N'Kabel telekomunikasi untuk jaringan telepon dan data berbasis tembaga.'),
    (N'Fiber Optic Cable', N'fiber_optic', N'Kabel serat optik untuk transmisi data kecepatan tinggi.'),
    (N'Bare Conductor', N'bare_conductor', N'Konduktor telanjang untuk jaringan distribusi udara.'),
    (N'Special Cable', N'special_cable', N'Kabel khusus untuk aplikasi industri tertentu seperti pertambangan dan kapal.');
END
GO

PRINT 'Setup database VokselDB selesai.';
GO
