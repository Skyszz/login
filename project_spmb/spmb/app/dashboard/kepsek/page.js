"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./kepsek.css";

// Halaman tujuan setelah menekan tombol Keluar. Ubah jika route login berbeda.
const LOGIN_PATH = "/login";

const FEE = 250000;

const navItems = [
  ["Ringkasan laporan", "▤", "summary"],
  ["Detail per jenjang", "▦", "levels"],
  ["Detail pendaftar", "♙", "applicants"],
];

const emptyRows = ["SMP", "SMA", "SMK"].map((level) => ({
  level,
  applicants: 0,
  accepted: 0,
  process: 0,
  rejected: 0,
  paid: 0,
}));

// Data simulasi per gelombang. Belum terhubung ke database.
const reportData = {
  "Gelombang 1": [
    { level: "SMP", applicants: 72, accepted: 50, process: 16, rejected: 6, paid: 54 },
    { level: "SMA", applicants: 84, accepted: 60, process: 16, rejected: 8, paid: 63 },
    { level: "SMK", applicants: 84, accepted: 58, process: 16, rejected: 10, paid: 63 },
  ],
  "Gelombang 2": emptyRows,
};

// Rincian program (ilustratif). Jumlah per jenjang sama dengan rekap di atas.
const programRows = (items) =>
  items.map(([name, applicants, accepted, process, rejected]) => ({
    name,
    applicants,
    accepted,
    process,
    rejected,
  }));

const programData = {
  "Gelombang 1": {
    SMP: programRows([["Reguler", 72, 50, 16, 6]]),
    SMA: programRows([
      ["IPA", 44, 33, 6, 5],
      ["IPS", 40, 27, 10, 3],
    ]),
    SMK: programRows([
      ["PPLG", 32, 24, 5, 3],
      ["TKJ", 28, 20, 5, 3],
      ["MPLB", 24, 14, 6, 4],
    ]),
  },
  "Gelombang 2": {
    SMP: programRows([["Reguler", 0, 0, 0, 0]]),
    SMA: programRows([
      ["IPA", 0, 0, 0, 0],
      ["IPS", 0, 0, 0, 0],
    ]),
    SMK: programRows([
      ["PPLG", 0, 0, 0, 0],
      ["TKJ", 0, 0, 0, 0],
      ["MPLB", 0, 0, 0, 0],
    ]),
  },
};

// Contoh baris pendaftar: [nama, nomor, program, seleksi, TPA / TPS, pembayaran]
const sampleApplicants = {
  "Gelombang 1": {
    SMK: [
      ["Alfaro Rafif Khoir", "CN-270001", "PPLG", "Diterima", "82 / 86", "Lunas"],
      ["Citra Lestari", "CN-270004", "TKJ", "Diterima", "—", "Lunas"],
      ["Indra Wijaya", "CN-270169", "PPLG", "Dalam proses", "—", "Menunggu"],
    ],
    SMP: [
      ["Arya Pratama", "CN-270002", "Reguler", "Dalam proses", "—", "Lunas"],
      ["Dinda Aulia", "CN-270005", "Reguler", "Dalam proses", "—", "Lunas"],
      ["Rafi Maulana", "CN-270021", "Reguler", "Diterima", "80 / 78", "Lunas"],
    ],
    SMA: [
      ["Dinda Safira", "CN-270003", "IPA", "Dalam proses", "—", "Menunggu"],
      ["Farhan Akbar", "CN-270006", "IPS", "Tidak diterima", "52 / 58", "Menunggu"],
      ["Salsa Rahma", "CN-270044", "IPA", "Diterima", "85 / 88", "Lunas"],
    ],
  },
  "Gelombang 2": { SMK: [], SMP: [], SMA: [] },
};

const documentNames = [
  "Kartu keluarga",
  "Akta kelahiran",
  "Pasfoto",
  "Rapor",
  "Ijazah / SKL",
  "Identitas NISN",
];

// Menyusun detail satu pendaftar dari baris contoh.
// Baris Nadia Putri memakai data lengkap sesuai desain.
function buildDetail(row, level) {
  const [name, number, program, selection, scores, payment] = row;

  const hasScores = scores !== "—";
  const [tpa, tps] = hasScores ? scores.split(" / ").map(Number) : [null, null];

  const docsValid = selection === "Dalam proses" && payment === "Menunggu" ? 5 : 6;

  const firstName = name.split(" ")[0].toLowerCase();

  const base = {
    name,
    number,
    registeredAt: "15 Mei 2027",
    level,
    program,
    programShort: program,
    programLong: `${level} · ${program}`,
    nisn: `00${number.replace(/\D/g, "").padStart(8, "0")}`,
    email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    school: "Sekolah asal contoh",
    cohort: "2027/2028 / Gelombang 1",
    docs: documentNames.map((d, i) => [
      d,
      i === documentNames.length - 1 && docsValid < 6 ? "Menunggu" : "Valid",
    ]),
    docsValid,
    selection,
    tpa,
    tps,
    average: hasScores ? Math.round((tpa + tps) / 2) : null,
    payment,
    proofFile: `bukti_${firstName}.pdf`,
    receiptNumber: `KWT/${number}`,
  };

  const d =
    number === "CN-270001"
      ? {
          ...base,
          programShort: "PPLG",
          programLong: "SMK · Pengembangan Perangkat Lunak Dan Gim (PPLG)",
          nisn: "0012345678",
          email: "alfaro@gmail.com",
          school: "SMP Harapan Contoh",
        }
      : base;

  const audit = [
    [
      d.registeredAt,
      d.name,
      `Pendaftaran ${d.number} dan biodata ${d.level} / ${d.programShort} disimpan.`,
    ],
  ];

  if (d.docsValid === 6) {
    audit.push(["17 Mei 2027", "Admin SPMB", "Seluruh 6 dokumen dinyatakan valid."]);
  }

  if (d.payment === "Lunas") {
    audit.push([
      "18 Mei 2027",
      "Admin SPMB",
      "Bukti pembayaran Rp250.000 diverifikasi.",
    ]);
  }

  if (d.selection === "Diterima" || d.selection === "Tidak diterima") {
    audit.push([
      "28 Mei 2027 · 08.00",
      "Admin SPMB",
      d.selection === "Diterima"
        ? `Hasil diterima diterbitkan${
            d.tpa !== null
              ? ` · TPA ${d.tpa}, TPS ${d.tps}, rata-rata ${d.average}.`
              : "."
          }`
        : "Hasil seleksi diterbitkan.",
    ]);
  }

  return { ...d, audit };
}

const selectionTone = {
  Diterima: "green",
  "Dalam proses": "amber",
  "Tidak diterima": "red",
};

const paymentTone = { Lunas: "green", Menunggu: "amber" };

const rupiah = (n) => "Rp" + Number(n).toLocaleString("id-ID");

const percent = (n, total) => (total ? Math.round((n / total) * 100) : 0);

const percentDecimal = (n, total) =>
  (total ? ((n / total) * 100).toFixed(1).replace(".", ",") : "0,0") + "%";

function juta(value) {
  if (value < 1000000) return rupiah(value);

  return `Rp${(value / 1000000).toLocaleString("id-ID", {
    maximumFractionDigits: 2,
  })} juta`;
}

const sum = (rows, key) => rows.reduce((total, r) => total + r[key], 0);

export default function DasborKepalaSekolah() {
  const router = useRouter();

  const [tab, setTab] = useState("summary");
  const [notice, setNotice] = useState("");

  const [year, setYear] = useState("2027/2028");
  const [wave, setWave] = useState("Gelombang 1");
  const [level, setLevel] = useState("Semua jenjang");

  const [detailLevel, setDetailLevel] = useState("SMK");
  const [viewApplicant, setViewApplicant] = useState({
    row: sampleApplicants["Gelombang 1"].SMK[0],
    level: "SMK",
  });

  const rows = reportData[wave].filter(
    (r) => level === "Semua jenjang" || r.level === level
  );

  const total = sum(rows, "applicants");
  const accepted = sum(rows, "accepted");
  const process = sum(rows, "process");
  const rejected = sum(rows, "rejected");
  const paid = sum(rows, "paid");
  const unpaid = total - paid;
  const funds = paid * FEE;

  const acceptedPercent = percent(accepted, total);

  // Halaman detail per jenjang
  const detailPrograms = programData[wave][detailLevel];
  const detailTotal = sum(detailPrograms, "applicants");
  const detailAccepted = sum(detailPrograms, "accepted");
  const detailProcess = sum(detailPrograms, "process");
  const detailRejected = sum(detailPrograms, "rejected");
  const detailPaid =
    reportData[wave].find((r) => r.level === detailLevel)?.paid ?? 0;
  const detailUnpaid = detailTotal - detailPaid;
  const detailApplicants = sampleApplicants[wave][detailLevel];

  // Halaman detail pendaftar
  const detail = buildDetail(viewApplicant.row, viewApplicant.level);

  const activeLabel =
    navItems.find(([, , key]) => key === tab)?.[0] || "Ringkasan laporan";

  function navClick(key) {
    setTab(key);
    setNotice("");
  }

  function exportPdf() {
    setNotice(
      "Pada jendela cetak, pilih “Simpan sebagai PDF” sebagai printer untuk mengunduh laporan."
    );

    setTimeout(() => window.print(), 150);
  }

  function exportCsv() {
    const lines = [
      ["Laporan detail per jenjang"],
      ["Tahun ajaran", year],
      ["Gelombang", wave],
      ["Jenjang", detailLevel],
      [],
      ["Program", "Pendaftar", "Diterima", "Proses", "Tidak diterima"],
      ...detailPrograms.map((p) => [
        p.name,
        p.applicants,
        p.accepted,
        p.process,
        p.rejected,
      ]),
      [
        `Total ${detailLevel}`,
        detailTotal,
        detailAccepted,
        detailProcess,
        detailRejected,
      ],
      [],
      ["Pembayaran", "Siswa", "Jumlah (Rp)"],
      ["Total tagihan", detailTotal, detailTotal * FEE],
      ["Terverifikasi", detailPaid, detailPaid * FEE],
      ["Belum lunas", detailUnpaid, detailUnpaid * FEE],
    ];

    const csv = lines
      .map((row) =>
        row
          .map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = `laporan-${detailLevel}-${wave.replace(" ", "-")}.csv`;
    link.click();

    URL.revokeObjectURL(url);
    setNotice("Laporan CSV berhasil diunduh.");
  }

  function openApplicant(row) {
    setViewApplicant({ row, level: detailLevel });
    setTab("applicants");
    setNotice("");
  }

  function logout() {
    if (confirm("Keluar dari portal kepala sekolah?")) {
      router.push(LOGIN_PATH);
    }
  }

  return (
    <main className="kp-shell">
      <aside className="kp-sidebar">
        <Link className="kp-brand" href="/" onClick={() => navClick("summary")}>
          <span className="kp-brand-mark">✧</span>
          <span>
            <b>Citra Negara</b>
            <small>SISTEM PENERIMAAN MURID BARU</small>
          </span>
        </Link>

        <p className="kp-side-label">RUANG KEPALA SEKOLAH</p>

        {navItems.map(([label, icon, key]) => (
          <button
            key={key}
            className={`kp-nav-item ${tab === key ? "active" : ""}`}
            onClick={() => navClick(key)}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}

        <div className="kp-intake-box">
          <b>SPMB 2027/2028</b>
          <p>Gelombang 1 · Simulasi. Seluruh data bersifat fiktif.</p>
          <span className="kp-tag">Akses baca saja</span>
        </div>

        <button className="kp-nav-item kp-logout" onClick={logout}>
          <span>↪</span>
          Keluar
        </button>
      </aside>

      <section className="kp-main">
        <header className="kp-topbar">
          <div className="kp-school-symbol">✧</div>

          <div className="kp-topbrand">
            <b>Citra Negara</b>
            <small>SISTEM PENERIMAAN MURID BARU</small>
          </div>

          <div className="kp-spacer" />

          <span className="kp-year">Tahun ajaran 2027/2028</span>
          <span className="kp-avatar">KS</span>

          <button
            className="kp-profile-button"
            onClick={() =>
              setNotice("Masuk sebagai Kepala sekolah · akses baca saja.")
            }
          >
            Kepala sekolah⌄
          </button>
        </header>

        <div className="kp-content">
          {notice && (
            <div className="kp-notice">
              <span>{notice}</span>
              <button onClick={() => setNotice("")}>×</button>
            </div>
          )}

          <div className="kp-breadcrumb">
            SPMB /{" "}
            {tab === "levels"
              ? "Ringkasan laporan / Detail per jenjang"
              : tab === "applicants"
              ? `Detail per jenjang / ${detail.name}`
              : activeLabel}
          </div>

          {tab === "summary" ? (
            <>
              <div className="kp-title-row">
                <div>
                  <h1 className="kp-title">Laporan penerimaan murid baru</h1>
                  <p className="kp-subtitle">
                    Ringkasan lintas jenjang · Data simulasi per 28 Mei 2027
                    · Laporan mengikuti filter tahun ajaran, gelombang, dan
                    jenjang.
                  </p>
                </div>

                <button className="kp-secondary kp-no-print" onClick={exportPdf}>
                  ⇩ Ekspor laporan PDF
                </button>
              </div>

              <div className="kp-filters">
                <label>
                  Tahun ajaran
                  <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option>2027/2028</option>
                  </select>
                </label>

                <label>
                  Gelombang
                  <select value={wave} onChange={(e) => setWave(e.target.value)}>
                    {Object.keys(reportData).map((w) => (
                      <option key={w}>{w}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Jenjang
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option>Semua jenjang</option>
                    <option>SMP</option>
                    <option>SMA</option>
                    <option>SMK</option>
                  </select>
                </label>

                <span className="kp-tag kp-filters-tag">Akses baca saja</span>
              </div>

              {total === 0 && (
                <div className="kp-empty-note">
                  Belum ada data pendaftar untuk {wave} tahun ajaran {year}.
                </div>
              )}

              <div className="kp-stats">
                <section className="kp-card kp-stat">
                  <span>Total pendaftar</span>
                  <strong>{total}</strong>
                  <small>
                    {rows.length} jenjang · {total} pendaftar
                  </small>
                </section>

                <section className="kp-card kp-stat">
                  <span>Diterima</span>
                  <strong>{accepted}</strong>
                  <small>
                    {accepted} diterima · {percent(accepted, total)}% dari
                    total
                  </small>
                </section>

                <section className="kp-card kp-stat">
                  <span>Dalam proses</span>
                  <strong>{process}</strong>
                  <small>
                    {process} siswa · {percent(process, total)}% dari total
                  </small>
                </section>

                <section className="kp-card kp-stat">
                  <span>Pembayaran</span>
                  <strong>{juta(funds)}</strong>
                  <small>
                    {paid} siswa · {percent(paid, total)}% lunas
                  </small>
                </section>
              </div>

              <div className="kp-grid">
                <section className="kp-card">
                  <h3>Rekap seleksi per jenjang</h3>
                  <p className="kp-hint kp-intro">
                    Angka status saling eksklusif untuk setiap pendaftar ·
                    Total {total} = {accepted} diterima + {process} proses +{" "}
                    {rejected} tidak diterima.
                  </p>

                  <div className="kp-table-scroll">
                    <table className="kp-table">
                      <thead>
                        <tr>
                          <th>Jenjang</th>
                          <th>Pendaftar</th>
                          <th>Diterima</th>
                          <th>Proses</th>
                          <th>Tidak diterima</th>
                        </tr>
                      </thead>

                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.level}>
                            <td>{r.level}</td>
                            <td>{r.applicants}</td>
                            <td>{r.accepted}</td>
                            <td>{r.process}</td>
                            <td>{r.rejected}</td>
                          </tr>
                        ))}

                        <tr className="kp-total-row">
                          <td>Total</td>
                          <td>{total}</td>
                          <td>{accepted}</td>
                          <td>{process}</td>
                          <td>{rejected}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="kp-card">
                  <h3>Statistik penerimaan</h3>

                  <div className="kp-donut-row">
                    <div
                      className="kp-donut"
                      style={{ "--p": acceptedPercent }}
                    >
                      <span>{acceptedPercent}%</span>
                    </div>

                    <ul className="kp-legend">
                      <li>
                        <i className="green" />
                        {accepted} diterima
                      </li>
                      <li>
                        <i className="amber" />
                        {process} dalam proses
                      </li>
                      <li>
                        <i className="gray" />
                        {rejected} tidak diterima
                      </li>
                    </ul>
                  </div>

                  <p className="kp-rate-title">Tingkat penerimaan per jenjang</p>

                  <ul className="kp-rates">
                    {rows.map((r) => (
                      <li key={r.level}>
                        <span>{r.level}</span>
                        <b>{percentDecimal(r.accepted, r.applicants)}</b>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="kp-card kp-payment">
                <h3>Rekap pembayaran pendaftaran</h3>

                <div className="kp-table-scroll">
                  <table className="kp-table">
                    <thead>
                      <tr>
                        <th>Jenjang</th>
                        <th>Lunas</th>
                        <th>Belum lunas</th>
                        <th>Dana terverifikasi</th>
                        <th>Sisa tagihan</th>
                      </tr>
                    </thead>

                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.level}>
                          <td>{r.level}</td>
                          <td>{r.paid} siswa</td>
                          <td>{r.applicants - r.paid} siswa</td>
                          <td>{rupiah(r.paid * FEE)}</td>
                          <td>{rupiah((r.applicants - r.paid) * FEE)}</td>
                        </tr>
                      ))}

                      <tr className="kp-total-row">
                        <td>Total</td>
                        <td>{paid} siswa</td>
                        <td>{unpaid} siswa</td>
                        <td>{rupiah(funds)}</td>
                        <td>{rupiah(unpaid * FEE)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : tab === "levels" ? (
            <>
              <div className="kp-title-row">
                <div>
                  <h1 className="kp-title">Detail laporan per jenjang</h1>
                  <p className="kp-subtitle">
                    Rekap {detailLevel} · {wave} · Data simulasi per 28 Mei
                    2027
                  </p>
                </div>

                <div className="kp-title-actions kp-no-print">
                  <button className="kp-secondary" onClick={exportCsv}>
                    ⇩ Ekspor CSV
                  </button>

                  <button className="kp-secondary" onClick={exportPdf}>
                    ⇩ Unduh PDF
                  </button>
                </div>
              </div>

              <div className="kp-filters">
                <label>
                  Tahun ajaran
                  <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option>2027/2028</option>
                  </select>
                </label>

                <label>
                  Gelombang
                  <select value={wave} onChange={(e) => setWave(e.target.value)}>
                    {Object.keys(reportData).map((w) => (
                      <option key={w}>{w}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Jenjang (SMP / SMA / SMK)
                  <select
                    value={detailLevel}
                    onChange={(e) => setDetailLevel(e.target.value)}
                  >
                    <option>SMP</option>
                    <option>SMA</option>
                    <option>SMK</option>
                  </select>
                </label>

                <span className="kp-tag kp-filters-tag">Akses baca saja</span>
              </div>

              {detailTotal === 0 && (
                <div className="kp-empty-note">
                  Belum ada data pendaftar untuk {wave} tahun ajaran {year}.
                </div>
              )}

              <div className="kp-stats">
                <section className="kp-card kp-stat">
                  <span>Pendaftar {detailLevel}</span>
                  <strong>{detailTotal}</strong>
                  <small>
                    {detailPrograms.length}{" "}
                    {detailLevel === "SMK"
                      ? "program keahlian"
                      : detailLevel === "SMA"
                      ? "peminatan"
                      : "program"}
                  </small>
                </section>

                <section className="kp-card kp-stat">
                  <span>Diterima</span>
                  <strong>{detailAccepted}</strong>
                  <small>
                    {percentDecimal(detailAccepted, detailTotal)} dari{" "}
                    {detailTotal} pendaftar
                  </small>
                </section>

                <section className="kp-card kp-stat">
                  <span>Dalam proses</span>
                  <strong>{detailProcess}</strong>
                  <small>{detailRejected} lainnya tidak diterima</small>
                </section>

                <section className="kp-card kp-stat">
                  <span>Pembayaran {detailLevel}</span>
                  <strong>{juta(detailPaid * FEE)}</strong>
                  <small>
                    {detailPaid} siswa · {percent(detailPaid, detailTotal)}%
                    lunas
                  </small>
                </section>
              </div>

              <div className="kp-grid">
                <section className="kp-card">
                  <h3>Rekap seleksi per program</h3>
                  <p className="kp-hint kp-intro">
                    Rincian program ilustratif, total sesuai rekap jenjang{" "}
                    {detailLevel}.
                  </p>

                  <div className="kp-table-scroll">
                    <table className="kp-table">
                      <thead>
                        <tr>
                          <th>Program</th>
                          <th>Pendaftar</th>
                          <th>Diterima</th>
                          <th>Proses</th>
                          <th>Tidak diterima</th>
                        </tr>
                      </thead>

                      <tbody>
                        {detailPrograms.map((p) => (
                          <tr key={p.name}>
                            <td>{p.name}</td>
                            <td>{p.applicants}</td>
                            <td>{p.accepted}</td>
                            <td>{p.process}</td>
                            <td>{p.rejected}</td>
                          </tr>
                        ))}

                        <tr className="kp-total-row">
                          <td>Total {detailLevel}</td>
                          <td>{detailTotal}</td>
                          <td>{detailAccepted}</td>
                          <td>{detailProcess}</td>
                          <td>{detailRejected}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="kp-hint kp-footnote">
                    Status seleksi saling eksklusif: {detailAccepted} +{" "}
                    {detailProcess} + {detailRejected} = {detailTotal}
                  </p>
                </section>

                <section className="kp-card">
                  <h3>Rekap pembayaran {detailLevel}</h3>
                  <p className="kp-hint kp-intro">
                    {rupiah(FEE)} per pendaftar
                  </p>

                  <table className="kp-table">
                    <thead>
                      <tr>
                        <th>Komponen</th>
                        <th>Jumlah</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Total tagihan · {detailTotal} siswa</td>
                        <td>{rupiah(detailTotal * FEE)}</td>
                      </tr>
                      <tr>
                        <td>Terverifikasi · {detailPaid} siswa</td>
                        <td>{rupiah(detailPaid * FEE)}</td>
                      </tr>
                      <tr>
                        <td>Belum lunas · {detailUnpaid} siswa</td>
                        <td>{rupiah(detailUnpaid * FEE)}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="kp-progress">
                    <i
                      style={{ width: `${percent(detailPaid, detailTotal)}%` }}
                    />
                  </div>

                  <p className="kp-hint">
                    {percent(detailPaid, detailTotal)}% lunas · Bukti
                    menunggu belum dihitung sebagai pembayaran
                    terverifikasi.
                  </p>
                </section>
              </div>

              <section className="kp-card kp-payment">
                <h3>Detail pendaftar {detailLevel}</h3>
                <p className="kp-hint kp-intro">
                  Baris terpilih dari {detailTotal} pendaftar {detailLevel};
                  Indra Wijaya merupakan contoh tambahan.
                </p>

                <div className="kp-table-scroll">
                  <table className="kp-table">
                    <thead>
                      <tr>
                        <th>Pendaftar / nomor</th>
                        <th>Program</th>
                        <th>Seleksi</th>
                        <th>TPA / TPS</th>
                        <th>Pembayaran</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {detailApplicants.map((a) => (
                        <tr key={a[1]}>
                          <td>
                            {a[0]} · {a[1]}
                          </td>
                          <td>{a[2]}</td>
                          <td>
                            <span className={`kp-pill ${selectionTone[a[3]]}`}>
                              {a[3]}
                            </span>
                          </td>
                          <td>{a[4]}</td>
                          <td>
                            <span className={`kp-pill ${paymentTone[a[5]]}`}>
                              {a[5]}
                            </span>
                          </td>
                          <td>
                            <button
                              className="kp-table-link"
                              onClick={() => openApplicant(a)}
                            >
                              Lihat
                            </button>
                          </td>
                        </tr>
                      ))}

                      {!detailApplicants.length && (
                        <tr>
                          <td colSpan="6" className="kp-empty-cell">
                            Belum ada pendaftar.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="kp-pager">
                  <span className="kp-hint">
                    Menampilkan{" "}
                    {detailApplicants.length
                      ? `1–${detailApplicants.length}`
                      : "0"}{" "}
                    dari {detailTotal} pendaftar {detailLevel}. Nilai —
                    tidak ditampilkan pada contoh.
                  </span>

                  <div className="kp-pager-buttons kp-no-print">
                    <button className="kp-secondary" disabled>
                      Sebelumnya
                    </button>

                    <span className="kp-page-number">1</span>

                    <button
                      className="kp-secondary"
                      onClick={() =>
                        setNotice(
                          "Contoh ini hanya menampilkan beberapa baris pendaftar."
                        )
                      }
                    >
                      Berikutnya
                    </button>
                  </div>
                </div>
              </section>

              <p className="kp-hint kp-scope-note">
                Lingkup laporan: {detailLevel} saja. Ekspor mengikuti filter
                tahun ajaran, gelombang, dan jenjang; kepala sekolah tidak
                dapat mengubah data.
              </p>

            </>
          ) : tab === "applicants" ? (
            <>
              <div className="kp-title-row">
                <div>
                  <h1 className="kp-title">Detail pendaftar</h1>
                  <p className="kp-subtitle">
                    {detail.name} · {detail.number} · Terdaftar{" "}
                    {detail.registeredAt} · {detail.level} /{" "}
                    {detail.programShort}
                  </p>
                </div>

                <button
                  className="kp-secondary kp-no-print"
                  onClick={() => navClick("levels")}
                >
                  Kembali ke laporan
                </button>
              </div>

              <div className="kp-banner">
                <span className="kp-check">✓</span>
                <div>
                  <b>Akses baca saja · Kepala sekolah</b>
                  <p>
                    Halaman ini hanya menampilkan data dan riwayat. Tidak
                    tersedia izin edit, verifikasi, atau hapus; perubahan
                    ditangani oleh administrator.
                  </p>
                </div>
              </div>

              <div className="kp-grid">
                <div className="kp-stack">
                  <section className="kp-card">
                    <h3>Biodata calon siswa</h3>

                    <table className="kp-table">
                      <thead>
                        <tr>
                          <th>Identitas</th>
                          <th>Keterangan</th>
                        </tr>
                      </thead>

                      <tbody>
                        {[
                          ["Nama lengkap / NISN", `${detail.name} / ${detail.nisn}`],
                          ["Email", detail.email],
                          ["Asal sekolah", detail.school],
                          ["Pilihan pendidikan", detail.programLong],
                          ["Tahun ajaran / gelombang", detail.cohort],
                        ].map(([label, value]) => (
                          <tr key={label}>
                            <td>{label}</td>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>

                  <section className="kp-card">
                    <h3>Ringkasan dokumen</h3>
                    <p className="kp-hint kp-intro">
                      {detail.docsValid} / 6{" "}
                      {detail.docsValid === 6
                        ? "terverifikasi oleh admin · 17 Mei 2027"
                        : "terverifikasi · sisanya menunggu verifikasi admin"}
                    </p>

                    <div className="kp-table-scroll">
                      <table className="kp-table">
                        <thead>
                          <tr>
                            <th>Berkas</th>
                            <th>Status</th>
                            <th>Berkas</th>
                            <th>Status</th>
                          </tr>
                        </thead>

                        <tbody>
                          {[0, 2, 4].map((i) => (
                            <tr key={i}>
                              {[detail.docs[i], detail.docs[i + 1]].map(
                                ([name, status]) => (
                                  <Fragment key={name}>
                                    <td>{name}</td>
                                    <td>
                                      <span
                                        className={`kp-doc-status ${
                                          status === "Valid" ? "ok" : "wait"
                                        }`}
                                      >
                                        {status}
                                      </span>
                                    </td>
                                  </Fragment>
                                )
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>

                <div className="kp-stack">
                  <section className="kp-card">
                    <h3>Hasil seleksi</h3>

                    <span
                      className={`kp-pill ${selectionTone[detail.selection]}`}
                    >
                      {detail.selection} · {detail.level} {detail.programShort}
                    </span>

                    <table className="kp-table kp-score-table">
                      <thead>
                        <tr>
                          <th>Komponen</th>
                          <th>Nilai</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>TPA</td>
                          <td>{detail.tpa ?? "—"}</td>
                        </tr>
                        <tr>
                          <td>TPS</td>
                          <td>{detail.tps ?? "—"}</td>
                        </tr>
                        <tr>
                          <td>Rata-rata</td>
                          <td>
                            {detail.average !== null
                              ? `${detail.average} / 100`
                              : "—"}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="kp-hint">
                      {detail.tpa !== null
                        ? "Tes selesai 24 Mei 2027. Hasil diterbitkan 28 Mei 2027 · 09.00 WIB."
                        : "Belum ada nilai tes TPA / TPS yang tercatat."}
                    </p>
                  </section>

                  <section className="kp-card">
                    <div className="kp-pay-head">
                      <h3>Pembayaran pendaftaran</h3>
                    </div>

                    <div className="kp-pay-amount">
                      <strong>{rupiah(FEE)}</strong>
                      <span className={`kp-pill ${paymentTone[detail.payment]}`}>
                        {detail.payment}
                      </span>
                    </div>

                    <p className="kp-hint">
                      {detail.payment === "Lunas"
                        ? detail.proofFile
                        : "Belum ada bukti terverifikasi."}
                    </p>

                    <p className="kp-hint kp-pay-note">
                      {detail.payment === "Lunas"
                        ? `Transfer terverifikasi 18 Mei 2027 · ${detail.receiptNumber}`
                        : "Bukti pembayaran menunggu verifikasi admin."}
                    </p>

                    <p className="kp-hint kp-pay-note">
                      Daftar ulang: 29 Mei–5 Juni 2027. Penerimaan bukan
                      bukti daftar ulang selesai.
                    </p>
                  </section>
                </div>
              </div>

              <section className="kp-card kp-payment">
                <h3>Jejak audit pendaftar</h3>

                <div className="kp-table-scroll">
                  <table className="kp-table">
                    <thead>
                      <tr>
                        <th>Waktu</th>
                        <th>Pelaku</th>
                        <th>Aktivitas</th>
                      </tr>
                    </thead>

                    <tbody>
                      {detail.audit.map(([time, actor, text]) => (
                        <tr key={`${time}-${text}`}>
                          <td>{time}</td>
                          <td>{actor}</td>
                          <td>{text}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : (
            <>
              <h1 className="kp-title">{activeLabel}</h1>

              <section className="kp-card kp-placeholder">
                <div className="kp-placeholder-icon">▤</div>
                <h3>{activeLabel}</h3>
                <p>
                  Halaman ini sudah disiapkan di menu dan akan dibuat
                  setelah desainnya tersedia.
                </p>

                <button
                  className="kp-primary"
                  onClick={() => navClick("summary")}
                >
                  Kembali ke ringkasan laporan
                </button>
              </section>
            </>
          )}
        </div>

        <footer className="kp-footer">
          © 2027 Sekolah Citra Negara · SPMB SMP / SMA / SMK
          <span>
            Prototipe · Data &amp; jadwal ilustratif　 |　 Panduan　 |　 Privasi
          </span>
        </footer>
      </section>
    </main>
  );
}