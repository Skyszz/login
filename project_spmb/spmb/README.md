# SPMB Citra Negara — Next.js

## Cara memasang
1. Buka folder proyek Next.js kamu.
2. Ganti isi `app/page.js`, `app/globals.css`, dan `app/layout.js` dengan file dari folder ini.
3. Pastikan `package.json` memiliki script `"dev": "next dev"` serta dependensi `next`, `react`, dan `react-dom`.
4. Di terminal VS Code jalankan:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:3000`.

## Fitur
- Tampilan dasbor dan tabel data pendaftar mengikuti referensi.
- Menu sidebar dapat diklik.
- Tambah, edit, dan hapus pendaftar.
- Cari pendaftar, filter jenjang/status, ubah status langsung di tabel.
- Ekspor data pendaftar ke CSV.
- Data tersimpan di `localStorage` browser.

Catatan: ini prototipe front-end. Data disimpan pada browser yang digunakan, belum ke database server dan belum memiliki login/otorisasi sungguhan. Untuk proyek lama, buat salinan file sebelum mengganti.
