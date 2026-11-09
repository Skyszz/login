
"use client";

import { useState } from "react";
import "./landing.css";

const programs = [
  {
    name: "SMP",
    icon: "▤",
    description: "Langkah awal setelah lulus SD / MI.",
    href: "/register?jenjang=SMP",
    action: "Daftar SMP",
  },
  {
    name: "SMA",
    icon: "♧",
    description: "Lanjutkan pendidikan setelah SMP / MTs.",
    href: "/register?jenjang=SMA",
    action: "Daftar SMA",
  },
  {
    name: "SMK",
    icon: "▱",
    description: "Pilihan: RPL, TKJ, MPLB, DKV, BDR, PH.",
    href: "/register?jenjang=SMK",
    action: "Daftar SMK",
  },
];

const steps = [
  {
    number: "01",
    title: "Buat akun",
    description: "Buat akun calon siswa.",
  },
  {
    number: "02",
    title: "Lengkapi data & berkas",
    description: "Isi formulir dan unggah dokumen.",
  },
  {
    number: "03",
    title: "Bayar & ikuti TPA/TPS",
    description: "Selesaikan pembayaran dan tes.",
  },
  {
    number: "04",
    title: "Lihat hasil seleksi",
    description: "Pantau hasil melalui akun.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="landing-page">
      {/* NAVBAR */}
      <header className="landing-header">
        <a className="landing-brand" href="/">
          <span className="landing-logo">
            <img src="/icon/logo.png" alt="Logo Citra Negara" />
          </span>

          <span>
            <strong>Citra Negara</strong>
            <small>SISTEM PENERIMAAN MURID BARU</small>
          </span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Buka menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <nav className={menuOpen ? "landing-nav open" : "landing-nav"}>
          <a href="#beranda" onClick={() => setMenuOpen(false)}>
            Beranda
          </a>

          <a href="#informasi" onClick={() => setMenuOpen(false)}>
            Informasi SPMB
          </a>

          <a href="#panduan" onClick={() => setMenuOpen(false)}>
            Panduan pendaftaran
          </a>

          <a
            className="login-button"
            href="/login"
            onClick={() => setMenuOpen(false)}
          >
            Masuk
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero-section" id="beranda">
        <div className="hero-copy">
          <span className="hero-badge">
            SPMB 2027/2028 · Gelombang 1
          </span>

          <h1>
            Langkah baru,
            <br />
            masa depan baru.
          </h1>

          <p>
            Mulai perjalanan belajarmu di Sekolah Citra Negara.
            Satu portal pendaftaran untuk SMP, SMA, dan SMK.
          </p>

          <div className="hero-actions">
            <a className="button-primary" href="#jenjang">
              → Buat akun pendaftaran
            </a>

            <a className="button-secondary" href="#panduan">
              Lihat peraturan
            </a>
          </div>

          <small className="hero-note">
            Pendaftaran, dokumen, dan status seleksi dalam satu tempat.
          </small>
        </div>

        <div className="hero-visual">
          <img
            src="/asset/hero-sekolah.png"
            alt="Lingkungan Sekolah Citra Negara"
          />
        </div>
      </section>

      {/* PILIH JENJANG */}
      <section className="level-section" id="jenjang">
        <div className="section-heading">
          <h2>Pilih jenjang pendidikanmu</h2>
          <p>Temukan jalur pendidikan yang sesuai untukmu.</p>
        </div>

        <div className="level-grid">
          {programs.map((program) => (
            <article className="level-card" key={program.name}>
              <div className="level-card-heading">
                <span className="level-icon">{program.icon}</span>
                <h3>{program.name}</h3>
                <span className="card-arrow">↗</span>
              </div>

              <p>{program.description}</p>

              <a href={program.href}>
                {program.action} <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* LANGKAH PENDAFTARAN */}
      <section className="steps-section" id="panduan">
        <div className="steps-intro">
          <h2>Pendaftaran lebih terarah</h2>
          <p>Alur singkat dari akun hingga hasil.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-item" key={step.number}>
              <span className="step-number">{step.number}</span>
              <strong>{step.title}</strong>
              <small>{step.description}</small>
            </div>
          ))}
        </div>
      </section>

      {/* FOTO GEDUNG SEKOLAH */}
      <section className="school-section" id="informasi">
        <img
          src="/asset/gedung-sekolah.png"
          alt="Gedung Sekolah Citra Negara"
        />

        <div className="school-overlay">
          <span>SEKOLAH CITRA NEGARA</span>

          <h2>Belajar hari ini, berkarya esok hari.</h2>

          <p>
            Siapkan langkahmu untuk meraih masa depan
            bersama Citra Negara.
          </p>

          <a href="#jenjang">Mulai pendaftaran →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <span>
          © 2027 Sekolah Citra Negara · SPMB SMP / SMA / SMK
        </span>

        <div>
          <a href="#panduan">Panduan</a>
          <a href="/login">Masuk</a>
          <a href="#informasi">Informasi</a>
        </div>
      </footer>
    </main>
  );
}
