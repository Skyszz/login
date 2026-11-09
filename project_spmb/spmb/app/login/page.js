"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";

const peran = [
  { key: "calon_siswa", label: "Calon siswa", tombol: "calon siswa" },
  { key: "admin", label: "Admin", tombol: "admin" },
  { key: "kepsek", label: "Kepala sekolah", tombol: "kepala sekolah" },
];

const tujuan = {
  calon_siswa: "/dashboard/calon-siswa",
  admin: "/dashboard/admin",
  kepsek: "/dashboard/kepsek",
};

export default function LoginPage() {
  const router = useRouter();
  const [pilihan, setPilihan] = useState("calon_siswa");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ingat, setIngat] = useState(true);
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  const aktif = peran.find((p) => p.key === pilihan);

  async function handleSubmit(e) {
    e.preventDefault();
    setPesan("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setPesan(data.message || "Login gagal.");
        return;
      }

      // Role yang dipercaya adalah role dari database, bukan dari tab.
      if (data.user.role !== pilihan) {
        setPesan(`Akun ini bukan akun ${aktif.tombol}. Pilih peran yang sesuai.`);
        return;
      }

      router.push(tujuan[data.user.role]);
      router.refresh();
    } catch {
      setPesan("Tidak bisa terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="log-page">
      {/* NAVBAR */}
      <header className="log-navbar">
        <div className="log-brand">
          <span className="log-logo">🎓</span>
          <div className="log-brand-text">
            <strong>Citra Negara</strong>
            <small>SISTEM PENERIMAAN MURID BARU</small>
          </div>
        </div>
        <nav className="log-nav">
          <Link href="/">Beranda</Link>
          <a href="#">Informasi SPMB</a>
          <a href="#">Panduan pendaftaran</a>
          <Link href="/login" className="log-btn-masuk">Masuk</Link>
        </nav>
      </header>

      {/* ISI */}
      <main className="log-main">
        <section className="log-left">
          <span className="log-badge">PORTAL SPMB CITRA NEGARA</span>
          <h1>Selamat datang kembali.</h1>
          <p>
            Akses ruang yang sesuai dengan peranmu. Semua proses penerimaan
            terkelola dalam satu portal.
          </p>
          <div className="log-info">
            <strong>Tiga peran, satu sistem</strong>
            <span>Calon siswa · Pendaftaran dan hasil seleksi</span>
            <span>Admin · Kelola data, dokumen, nilai & pembayaran</span>
            <span>Kepala sekolah · Baca ringkasan dan laporan</span>
          </div>
        </section>

        <section className="log-card">
          <h2>Masuk ke akun</h2>
          <small className="log-sub">Pilih peran sebelum memasukkan akun.</small>

          <div className="log-tabs">
            {peran.map((p) => (
              <button
                type="button"
                key={p.key}
                className={pilihan === p.key ? "log-tab aktif" : "log-tab"}
                onClick={() => setPilihan(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Kata sandi</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="log-row">
              <label className="log-check">
                <input type="checkbox" checked={ingat} onChange={(e) => setIngat(e.target.checked)} />
                <span>Ingat saya</span>
              </label>
              <a href="#" className="log-lupa">Lupa kata sandi?</a>
            </div>

            <button type="submit" className="log-submit" disabled={loading}>
              {loading ? "Memproses..." : `→ Masuk sebagai ${aktif.tombol}`}
            </button>

            {pesan && <p className="log-pesan">{pesan}</p>}

            {pilihan === "calon_siswa" && (
              <Link href="/register" className="log-daftar">
                Belum punya akun? Buat akun calon siswa →
              </Link>
            )}
            <small className="log-note">
              Akun admin dan kepala sekolah disediakan pengelola.
            </small>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="log-footer">
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