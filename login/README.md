# Login & Biodata (Next.js)

Versi Next.js dari project login/sign up PHP, dengan alur yang sama:
**Sign Up → Login → Biodata**.

## Struktur

- `app/page.js` — halaman login/signup (kartu geser, animasi sama seperti versi PHP)
- `app/biodata/page.js` — halaman biodata, hanya bisa diakses kalau sudah login
- `app/api/register/route.js` — proses sign up (hash password, cek email duplikat)
- `app/api/login/route.js` — proses login (verifikasi password, set session cookie)
- `app/api/logout/route.js` — hapus session
- `lib/db.js` — koneksi MySQL (pakai `mysql2`)
- `lib/session.js` — session berbasis JWT di httpOnly cookie
- `schema.sql` — struktur tabel `users`

## Cara menjalankan

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Siapkan database**

   Jalankan isi `schema.sql` di MySQL kamu (bisa pakai database `login_db` yang sudah ada dari versi PHP — struktur tabelnya kompatibel, tinggal pastikan kolom `password` bertipe `VARCHAR(255)`).

3. **Buat file environment**

   Copy `.env.local.example` jadi `.env.local`, lalu sesuaikan kredensial database dan ganti `JWT_SECRET` dengan string acak yang panjang.

   ```bash
   cp .env.local.example .env.local
   ```

4. **Jalankan development server**

   ```bash
   npm run dev
   ```

   Buka `http://localhost:3000`.

## Catatan

- Password di-hash pakai `bcryptjs` — kalau kamu punya akun lama dari versi PHP yang passwordnya masih plain text, akun itu tidak akan bisa login di sini sampai daftar ulang atau di-hash ulang manual.
- Session disimpan di cookie httpOnly (`session`), jadi tidak bisa diakses lewat JavaScript di browser — lebih aman dari XSS dibanding simpan token di localStorage.
- Halaman `/biodata` dicek di server (`app/biodata/page.js`) sebelum di-render, jadi kalau belum login langsung di-redirect ke `/`, tidak sempat nge-flash kontennya.
