# Voksel Interactive Profile

Proyek ini adalah web profil interaktif PT Voksel Electric Tbk berbasis React. Aplikasi dibuat untuk kebutuhan magang/kuliah praktik dengan tampilan modern, animasi, data perusahaan, produk, foto, keuangan, dataset internal, dan chatbot lokal.

## Struktur Folder

- `src/components`: komponen tampilan React.
- `src/data`: data sementara perusahaan, produk, keuangan, investor, dan aturan chatbot.
- `src/hooks`: animasi canvas untuk hero.
- `src/styles`: styling utama aplikasi.
- `public/assets/products`: tempat foto produk.
- `public/assets/profile`: tempat foto profil perusahaan.
- `agents`: dokumentasi pendamping proyek.

## Fitur

- React single page app.
- Hero animatif dengan canvas jaringan kabel.
- Profil Voksel dan dua alamat: Jakarta serta Bogor/Cileungsi.
- 5 produk: power cable, telecommunication cable, fiber optic cable, bare conductor, dan special cable.
- Slot foto produk dan foto profil.
- Data ringkas perusahaan.
- Section Keuangan & Investor.
- Section Dataset Internal untuk data penjualan, karyawan, dan produksi yang bersifat terkunci.
- Chatbot lokal yang bisa menjawab pertanyaan tentang profil, produk, alamat, keuangan, investor, penjualan, karyawan, dan dataset.

## Cara Menjalankan

Install dependency:

```bash
npm install
```

Jalankan aplikasi:

```bash
npm run dev
```

Build produksi:

```bash
npm run build
```

## Mengganti Foto

Ganti file di folder berikut dengan nama file yang sama:

- `public/assets/products`
- `public/assets/profile`

Jika nama file tetap sama, komponen React akan otomatis memakai foto baru.

## Catatan Data

Data penjualan, karyawan, produksi, dan laporan keuangan rinci belum diisi karena biasanya bersifat internal. Tempatnya sudah disediakan di `src/data/vokselData.js` agar nanti mudah diganti dengan data resmi dari perusahaan.
# proyek_fun
