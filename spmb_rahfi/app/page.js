import Link from "next/link";
import "./landing.css";

const stats = [
  { angka: "+1.000", label: "Peserta Didik" },
  { angka: "6", label: "Program Keahlian" },
  { angka: "10+", label: "Tahun Berdiri" },
  { angka: "100%", label: "Lulusan Siap Kerja" },
];

const program = [
  { kode: "PPLG", icon: "💻", desc: "Pengembangan Perangkat Lunak dan Gim" },
  { kode: "TKJ", icon: "🖧", desc: "Teknik Komputer dan Jaringan" },
  { kode: "DKV", icon: "🎨", desc: "Desain Komunikasi Visual" },
  { kode: "MPLB", icon: "📊", desc: "Manajemen Perkantoran dan Layanan Bisnis" },
  { kode: "BDP", icon: "📈", desc: "Bisnis Digital dan Pemasaran" },
  { kode: "PH", icon: "🏨", desc: "Perhotelan" },
];

const alur = [
  { judul: "Pendaftaran Online", desc: "Isi formulir pendaftaran secara online" },
  { judul: "Verifikasi Berkas", desc: "Unggah dokumen yang diperlukan" },
  { judul: "Pengumuman", desc: "Cek hasil seleksi melalui portal" },
  { judul: "Daftar Ulang", desc: "Lengkapi administrasi dan pembayaran" },
];

export default function LandingPage() {
  return (
    <div className="landing">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="brand">
          <span className="brand-logo">CN</span>
          <strong>SMK Citra Negara</strong>
        </div>
        <nav className="nav-links">
          <a href="#" className="active">Beranda</a>
          <a href="#">Tentang</a>
          <a href="#program">Program Keahlian</a>
          <a href="#alur">Informasi</a>
          <a href="#">Kontak</a>
        </nav>
        <Link href="/register" className="btn-primary small">Daftar Sekarang →</Link>
      </header>

      {/* HERO */}
      <section className="hero container">
        <div className="hero-text">
          <span className="badge">SPMB 2025/2026</span>
          <h1>
            Wujudkan Masa Depan
            <br />
            Bersama <span className="accent">SMK Citra Negara</span>
          </h1>
          <p>
            Pilih jurusanmu, kembangkan potensimu, siapkan diri untuk dunia kerja
            dan masa depan yang lebih baik.
          </p>
          <div className="hero-buttons">
            <Link href="/register" className="btn-primary">Daftar Sekarang →</Link>
            <a href="#program" className="btn-outline">Lihat Program Keahlian →</a>
          </div>
        </div>
        <img src="/asset/hero-sekolah.png" alt="SMK Citra Negara" className="hero-img" />
      </section>

      {/* STATISTIK */}
      <section className="container">
        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <strong>{s.angka}</strong>
              <small>{s.label}</small>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAM KEAHLIAN */}
      <section className="program container" id="program">
        <div className="program-text">
          <small className="eyebrow">PROGRAM KEAHLIAN</small>
          <h2>Temukan Jurusan yang Sesuai dengan Minatmu</h2>
          <p>
            Kami menyediakan berbagai program keahlian unggulan yang disesuaikan
            dengan kebutuhan industri.
          </p>
          <a href="#" className="btn-outline">Lihat Semua Program</a>
        </div>
        <div className="program-grid">
          {program.map((p) => (
            <div className="program-card" key={p.kode}>
              <span className="program-icon">{p.icon}</span>
              <strong>{p.kode}</strong>
              <small>{p.desc}</small>
              <span className="arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ALUR PENDAFTARAN */}
      <section className="alur-wrap" id="alur">
        <div className="alur container">
          <div className="alur-text">
            <small className="eyebrow">ALUR PENDAFTARAN</small>
            <h2>Mudah, Cepat, dan Jelas</h2>
            <p>Ikuti langkah-langkah berikut untuk mendaftar di SMK Citra Negara.</p>
            <a href="#" className="btn-outline">Lihat Detail →</a>
          </div>
          <div className="alur-steps">
            {alur.map((a, i) => (
              <div className="alur-step" key={a.judul}>
                <span className="alur-no">{i + 1}</span>
                <strong>{a.judul}</strong>
                <small>{a.desc}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Siap Menjadi Bagian dari SMK Citra Negara?</h2>
        <p>Daftarkan dirimu sekarang dan mulai perjalanan menuju masa depan cerah.</p>
        <Link href="/register" className="btn-white">Daftar Sekarang →</Link>
      </section>
    </div>
  );
}