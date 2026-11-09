"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./register.css";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    email: "",
    nisn: "",
    password: "",
    konfirmasi: "",
  });
  const [setuju, setSetuju] = useState(false);
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setPesan("");

    if (form.password !== form.konfirmasi) {
      setPesan("Konfirmasi kata sandi tidak sama.");
      return;
    }
    if (!setuju) {
      setPesan("Centang persetujuan terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Role tidak dikirim: ditentukan server.
        body: JSON.stringify({
          nama: form.nama,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await response.json();
      setPesan(data.message);

      if (response.ok) {
        router.push("/login");
      }
    } catch {
      setPesan("Tidak bisa terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reg-page">
      {/* NAVBAR */}
      <header className="reg-navbar">
        <div className="reg-brand">
          <span className="reg-logo">🎓</span>
          <div className="reg-brand-text">
            <strong>Citra Negara</strong>
            <small>SISTEM PENERIMAAN MURID BARU</small>
          </div>
        </div>
        <nav className="reg-nav">
          <Link href="/">Beranda</Link>
          <a href="#">Informasi SPMB</a>
          <a href="#">Panduan pendaftaran</a>
          <Link href="/login" className="reg-btn-masuk">Masuk</Link>
        </nav>
      </header>

      {/* ISI */}
      <main className="reg-main">
        <section className="reg-left">
          <span className="reg-badge">MULAI PENDAFTARAN</span>
          <h1>Satu akun untuk seluruh perjalananmu.</h1>
          <p>
            Buat akun calon siswa, lalu pilih jenjang SMP, SMA, atau SMK saat
            melengkapi biodata.
          </p>
          <ul className="reg-list">
            <li><span>👤</span> Lengkapi identitas dengan mudah</li>
            <li><span>📄</span> Simpan dokumen dalam satu portal</li>
            <li><span>🔔</span> Pantau pembayaran dan hasil seleksi</li>
          </ul>
          <div className="reg-login-box">
            <strong>Sudah punya akun?</strong>
            <Link href="/login">Masuk ke portal calon siswa →</Link>
          </div>
        </section>

        <section className="reg-card">
          <h2>Buat akun calon siswa</h2>
          <small className="reg-sub">Gunakan email yang dapat kamu akses.</small>

          <form onSubmit={handleSubmit}>
            <label>Nama lengkap *</label>
            <input name="nama" placeholder="AAAAA" value={form.nama} onChange={handleChange} />

            <label>Email *</label>
            <input name="email" type="email" placeholder="@example.com" value={form.email} onChange={handleChange} />

            <label>NISN *</label>
            <input name="nisn" placeholder="0012345678" value={form.nisn} onChange={handleChange} />

            <div className="reg-row">
              <div>
                <label>Kata sandi *</label>
                <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
              </div>
              <div>
                <label>Konfirmasi kata sandi *</label>
                <input name="konfirmasi" type="password" placeholder="••••••••" value={form.konfirmasi} onChange={handleChange} />
              </div>
            </div>
            <small className="reg-hint">Minimal 8 karakter, kombinasi huruf dan angka.</small>

            <label className="reg-check">
              <input type="checkbox" checked={setuju} onChange={(e) => setSetuju(e.target.checked)} />
              <span>
                Saya menyetujui ketentuan pendaftaran dan penggunaan data untuk
                proses SPMB.
              </span>
            </label>

            <button type="submit" className="reg-submit" disabled={loading}>
              {loading ? "Memproses..." : "→ Buat akun"}
            </button>

            {pesan && <p className="reg-pesan">{pesan}</p>}
            <small className="reg-note">
              Data yang tampil adalah contoh fiktif. Akun baru terdaftar sebagai
              calon siswa.
            </small>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="reg-footer">
        <span>© 2027 Sekolah Citra Negara · SPMB SMP / SMA / SMK</span>
        <div>
          <span>Prototipe · Data & jadwal ilustratif</span>
          <a href="#">Panduan</a>
          <a href="#">Privasi</a>
        </div>
      </footer>
    </div>
  );
}