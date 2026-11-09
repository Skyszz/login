"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./siswa.css";

// Halaman tujuan setelah menekan tombol Keluar. Ubah jika route login berbeda.
const LOGIN_PATH = "/login";

const student = {
  name: "Alfaro Rafif Khoir",
  initials: "AR",
  firstName: "Alfaro",
  regNumber: "CN-270001",
  program: "SMK · Pengembangan Perangkat Lunak Dan Gim",
  documents: "6 / 6",
  paymentStatus: "Lunas",
  paymentNote: "Rp250.000 · diverifikasi 18 Mei",
};

const navItems = [
  ["Dasbor", "⊞", "dashboard"],
  ["Biodata", "♙", "biodata"],
  ["Dokumen", "▤", "documents"],
  ["Pembayaran", "▭", "payment"],
  ["Jadwal dan kartu tes", "▦", "schedule"],
  ["Hasil seleksi", "♖", "result"],
  ["Daftar ulang", "⟳", "reregister"],
  ["Bukti penerimaan", "▣", "proof"],
];

const journey = [
  ["Biodata", "Lengkap", "15 Mei 2027"],
  ["Dokumen", "Terverifikasi", "17 Mei 2027"],
  ["Pembayaran", "Lunas", "18 Mei 2027"],
  ["Tes TPA / TPS", "Selesai", "24 Mei 2027"],
  ["Hasil akhir", "Diterima", "28 Mei 2027"],
];

const biodata = {
  fullName: "Alfaro Rafif Khoir",
  nisn: "0012345678",
  birthPlace: "Kota Contoh",
  birthDate: "06 April 2010",
  gender: "Laki-laki",
  school: "SMP Harapan Contoh",
  address: "Jl. Contoh No. 12, Kota Contoh",
  guardian: "Ratna Putri",
  guardianPhone: "08xx-xxxx-0011",
  email: "alfaro@gmail.com",
  phone: "08xx-xxxx-0001",
  level: "SMK",
  program: "Pengembangan Perangkat Lunak Dan Gim",
};

const registrationSteps = [
  ["Biodata", "biodata"],
  ["Dokumen", "documents"],
  ["Pembayaran", "payment"],
  ["Seleksi", "result"],
];

function Field({ label, value, full }) {
  return (
    <label className={`sw-field ${full ? "full" : ""}`}>
      {label} <i>*</i>
      <input value={value} readOnly />
    </label>
  );
}

const documents = [
  { id: "kk", name: "Kartu keluarga", file: "kk_nadia.pdf", size: "420 KB" },
  { id: "akta", name: "Akta kelahiran", file: "akta_nadia.pdf", size: "310 KB" },
  { id: "foto", name: "Pasfoto", file: "foto_nadia.jpg", size: "180 KB" },
  { id: "rapor", name: "Rapor", file: "rapor_nadia.pdf", size: "1,4 MB" },
  { id: "skl", name: "Ijazah / SKL", file: "skl_nadia.pdf", size: "520 KB" },
  { id: "nisn", name: "Identitas NISN", file: "nisn_nadia.pdf", size: "210 KB" },
];

function Stepper({ activeKey, onGo }) {
  return (
    <div className="sw-card sw-steps">
      {registrationSteps.map(([label, key], index) => (
        <button
          key={key}
          className={`sw-step ${key === activeKey ? "active" : ""}`}
          onClick={() => onGo(key)}
        >
          <span>{index + 1}</span>
          {label}
        </button>
      ))}
    </div>
  );
}

const payment = {
  invoice: "INV-CN-270001",
  amount: 250000,
  components: [["Administrasi seleksi", 250000]],
  sender: "Ratna Putri",
  date: "18 Mei 2027",
  method: "Transfer bank",
  verifiedAt: "18 Mei 2027",
  proof: { name: "Bukti pembayaran", file: "bukti_nadia.pdf", size: "240 KB" },
};

const rupiah = (n) => "Rp" + Number(n).toLocaleString("id-ID");

function PreviewModal({ doc, onClose }) {
  if (!doc) return null;

  return (
    <div
      className="sw-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sw-modal">
        <div className="sw-modal-head">
          <div>
            <h3>{doc.name}</h3>
            <p className="sw-hint">
              {doc.file} · {doc.size}
            </p>
          </div>

          <button className="sw-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="sw-preview-box">
          <span>▤</span>
          <p>
            Pratinjau berkas hanya contoh pada demo ini. Berkas asli belum
            tersimpan di server.
          </p>
        </div>

        <div className="sw-correction-actions">
          <button className="sw-primary" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

const ticket = {
  testNumber: "TES-CN-270001",
  level: "SMK / Gelombang 1",
  type: "Tes susulan",
  date: "30 Mei 2027",
  time: "08.00–10.00 WIB",
  room: "Ruang B",
  arrive: "07.30 WIB · 30 menit sebelum tes",
};

const ticketInstructions = [
  "Cetak kartu ini dan bawa identitas yang sesuai.",
  "Hadir pukul 07.30 WIB untuk pemeriksaan peserta.",
  "Bawa alat tulis; ikuti arahan pengawas tes.",
  "Periksa nomor tes dan Ruang B sebelum masuk.",
  "Jika ada ketidaksesuaian, ajukan bantuan melalui portal.",
];

const result = {
  status: "Diterima",
  announcedAt: "28 Mei 2027",
  reRegisterPeriod: "29 Mei–5 Juni 2027",
  testNumber: "TES-CN-270001",
  testDate: "24 Mei 2027",
  testTime: "08.00–10.00",
  location: "Ruang komputer A",
  tpa: 82,
  tps: 86,
};

const resultChecklist = [
  "Biodata lengkap",
  "Dokumen terverifikasi",
  "Pembayaran lunas",
  "Tes TPA / TPS selesai",
];

const reregChecklist = [
  ["Bukti penerimaan", "Nadia Putri · CN-270001 · SMK RPL", "Siap"],
  ["Dokumen pendaftaran", "6 / 6 berkas telah terverifikasi", "Valid"],
  ["Pembayaran pendaftaran", "Rp250.000 · Lunas pada 18 Mei 2027", "Lunas"],
  [
    "Dokumen asli & salinan",
    "KK, akta, rapor, ijazah/SKL, NISN, dan pasfoto",
    "Siap dibawa",
  ],
];

const REREG_RELATIONS = ["Ayah", "Ibu", "Wali"];

const REREG_DATES = [
  "29 Mei 2027",
  "30 Mei 2027",
  "31 Mei 2027",
  "1 Juni 2027",
  "2 Juni 2027",
  "3 Juni 2027",
  "4 Juni 2027",
  "5 Juni 2027",
];

const REREG_TIMES = [
  "08.00–09.00 WIB",
  "09.00–10.00 WIB",
  "10.00–11.00 WIB",
  "13.00–14.00 WIB",
  "14.00–15.00 WIB",
];

const initialReregForm = {
  guardian: "Ratna Putri",
  relation: "Ibu",
  phone: "08xx-xxxx-0011",
  date: "31 Mei 2027",
  time: "09.00–10.00 WIB",
  note: "Hadir bersama ibu untuk pencocokan dokumen.",
  agree: true,
};

const letter = {
  docNumber: "SPMB/2027/CN-270001",
  receiptNumber: "KWT/CN-270001",
  issuedAt: "28 Mei 2027",
  announcedTime: "09.00 WIB",
};

const placeholders = {
};

export default function DasborSiswa() {
  const router = useRouter();

  const [tab, setTab] = useState("dashboard");
  const [notice, setNotice] = useState("");
  const [reRegistered, setReRegistered] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [correctionText, setCorrectionText] = useState("");
  const [correction, setCorrection] = useState(null);

  const [docCorrections, setDocCorrections] = useState([]);
  const [docCorrectionOpen, setDocCorrectionOpen] = useState(false);
  const [docCorrectionId, setDocCorrectionId] = useState("");
  const [docCorrectionText, setDocCorrectionText] = useState("");
  const [previewDoc, setPreviewDoc] = useState(null);

  const [proofFile, setProofFile] = useState(null);
  const [proofRequest, setProofRequest] = useState(null);
  const [proofRequestOpen, setProofRequestOpen] = useState(false);
  const [proofRequestText, setProofRequestText] = useState("");

  const [reregForm, setReregForm] = useState(initialReregForm);
  const [reregDraftSaved, setReregDraftSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("spmb-siswa-daftar-ulang");
      if (saved) setReRegistered(JSON.parse(saved));

      const savedCorrection = localStorage.getItem("spmb-siswa-koreksi");
      if (savedCorrection) setCorrection(JSON.parse(savedCorrection));

      const savedDocCorrections = localStorage.getItem(
        "spmb-siswa-koreksi-dokumen"
      );
      if (savedDocCorrections) {
        setDocCorrections(JSON.parse(savedDocCorrections));
      }

      const savedProofRequest = localStorage.getItem(
        "spmb-siswa-koreksi-bukti"
      );
      if (savedProofRequest) {
        setProofRequest(JSON.parse(savedProofRequest));
      }

      const savedRereg = localStorage.getItem("spmb-siswa-form-daftar-ulang");
      if (savedRereg) {
        const parsedRereg = JSON.parse(savedRereg);
        setReregForm({ ...initialReregForm, ...parsedRereg.form });
        setReregDraftSaved(Boolean(parsedRereg.draftSaved));
      }
    } catch (error) {
      console.error("Gagal membaca data tersimpan:", error);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-siswa-daftar-ulang",
        JSON.stringify(reRegistered)
      );
    } catch {}
  }, [reRegistered, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-siswa-koreksi",
        JSON.stringify(correction)
      );
    } catch {}
  }, [correction, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-siswa-koreksi-dokumen",
        JSON.stringify(docCorrections)
      );
    } catch {}
  }, [docCorrections, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-siswa-koreksi-bukti",
        JSON.stringify(proofRequest)
      );
    } catch {}
  }, [proofRequest, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-siswa-form-daftar-ulang",
        JSON.stringify({ form: reregForm, draftSaved: reregDraftSaved })
      );
    } catch {}
  }, [reregForm, reregDraftSaved, hydrated]);

  const pendingDocIds = docCorrections.map((c) => c.id);
  const verifiedCount = documents.filter(
    (d) => !pendingDocIds.includes(d.id)
  ).length;

  function navClick(key) {
    setTab(key);
    setNotice("");
    setCorrectionOpen(false);
    setDocCorrectionOpen(false);
    setPreviewDoc(null);
    setProofRequestOpen(false);
  }

  function openDocCorrection() {
    const firstFree = documents.find((d) => !pendingDocIds.includes(d.id));

    if (!firstFree) {
      setNotice("Semua dokumen sudah diajukan untuk dikoreksi.");
      return;
    }

    setDocCorrectionId(firstFree.id);
    setDocCorrectionText("");
    setDocCorrectionOpen(true);
  }

  function sendDocCorrection() {
    const text = docCorrectionText.trim();

    if (!docCorrectionId || !text) {
      setNotice("Pilih dokumen dan tulis alasan koreksi terlebih dahulu.");
      return;
    }

    setDocCorrections((old) => [
      ...old,
      {
        id: docCorrectionId,
        text,
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      },
    ]);

    setDocCorrectionOpen(false);
    setDocCorrectionText("");
    setNotice("Pengajuan koreksi dokumen berhasil dikirim ke admin.");
  }

  function cancelDocCorrection(id) {
    setDocCorrections((old) => old.filter((c) => c.id !== id));
    setNotice("Pengajuan koreksi dokumen dibatalkan.");
  }

  function pickProofFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();

    if (!["jpg", "jpeg", "png", "pdf"].includes(ext)) {
      setNotice("Format berkas harus JPG, PNG, atau PDF.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setNotice("Ukuran berkas maksimal 2 MB.");
      return;
    }

    setProofFile({
      name: file.name,
      size:
        file.size < 1024 * 1024
          ? `${Math.max(1, Math.round(file.size / 1024))} KB`
          : `${(file.size / 1024 / 1024).toFixed(1).replace(".", ",")} MB`,
    });

    setNotice(
      "Berkas dipilih. Klik Ajukan perubahan bukti untuk mengirim ke admin."
    );
  }

  function sendProofRequest() {
    const text = proofRequestText.trim();

    if (!text) {
      setNotice("Tulis alasan perubahan bukti pembayaran terlebih dahulu.");
      return;
    }

    setProofRequest({
      text,
      file: proofFile ? proofFile.name : null,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    setProofRequestText("");
    setProofRequestOpen(false);
    setProofFile(null);
    setNotice("Pengajuan perubahan bukti berhasil dikirim ke admin.");
  }

  function cancelProofRequest() {
    setProofRequest(null);
    setNotice("Pengajuan perubahan bukti dibatalkan.");
  }

  function downloadReceipt() {
    const text = [
      "KUITANSI PEMBAYARAN PENDAFTARAN (SIMULASI)",
      "Sekolah Citra Negara · SPMB 2027/2028",
      "",
      `No. tagihan     : ${payment.invoice}`,
      `No. pendaftaran : ${student.regNumber}`,
      `Nama            : ${student.name}`,
      `Tanggal bayar   : ${payment.date}`,
      `Metode          : ${payment.method}`,
      `Jumlah          : ${rupiah(payment.amount)}`,
      "Status          : Lunas",
      "",
      "Dokumen ini hanya contoh simulasi, bukan bukti pembayaran nyata.",
    ].join("\n");

    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = `kuitansi-${student.regNumber}.txt`;
    link.click();

    URL.revokeObjectURL(url);
    setNotice("Kuitansi berhasil diunduh.");
  }

  function sendCorrection() {
    const text = correctionText.trim();

    if (!text) {
      setNotice("Tulis dulu bagian biodata yang perlu dikoreksi.");
      return;
    }

    setCorrection({
      text,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    setCorrectionText("");
    setCorrectionOpen(false);
    setNotice("Pengajuan koreksi berhasil dikirim ke admin.");
  }

  function confirmReRegister() {
    // Tombol di dasbor membuka halaman Daftar ulang yang berisi formulir.
    navClick("reregister");
  }

  function setRereg(key, value) {
    setReregForm((old) => ({ ...old, [key]: value }));
  }

  function validateRereg() {
    if (!reregForm.guardian.trim() || !reregForm.phone.trim()) {
      setNotice("Nama orang tua / wali dan kontak wali wajib diisi.");
      return false;
    }

    if (!reregForm.date || !reregForm.time) {
      setNotice("Pilih tanggal dan jam kedatangan terlebih dahulu.");
      return false;
    }

    return true;
  }

  function saveReregDraft() {
    setReregDraftSaved(true);
    setNotice("Draf konfirmasi daftar ulang berhasil disimpan.");
  }

  function sendRereg() {
    if (!validateRereg()) return;

    if (!reregForm.agree) {
      setNotice("Centang pernyataan kesediaan sebelum mengirim konfirmasi.");
      return;
    }

    if (
      !confirm(
        `Kirim konfirmasi daftar ulang untuk ${reregForm.date}, ${reregForm.time}?`
      )
    ) {
      return;
    }

    setReRegistered(true);
    setNotice("Konfirmasi daftar ulang berhasil dikirim.");
  }

  function resetRereg() {
    if (!confirm("Batalkan konfirmasi daftar ulang yang sudah dikirim?")) {
      return;
    }

    setReRegistered(false);
    setNotice("Konfirmasi daftar ulang dibatalkan. Kamu bisa mengirim ulang.");
  }

  function logout() {
    if (confirm("Keluar dari portal calon siswa?")) {
      router.push(LOGIN_PATH);
    }
  }

  function downloadAcceptance() {
    const text = [
      "BUKTI PENERIMAAN (SIMULASI)",
      "Sekolah Citra Negara · SPMB 2027/2028",
      "",
      `No. pendaftaran : ${student.regNumber}`,
      `Nama            : ${student.name}`,
      `Program         : ${student.program}`,
      `Hasil seleksi   : ${result.status}`,
      `Diumumkan       : ${result.announcedAt}`,
      `Daftar ulang    : ${result.reRegisterPeriod}`,
      "",
      "Dokumen ini hanya contoh simulasi, bukan bukti penerimaan resmi.",
    ].join("\n");

    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = `bukti-penerimaan-${student.regNumber}.txt`;
    link.click();

    URL.revokeObjectURL(url);
    setNotice("Bukti penerimaan berhasil diunduh.");
  }

  function printLetter(asPdf) {
    if (asPdf) {
      setNotice(
        "Pada jendela cetak, pilih “Simpan sebagai PDF” sebagai printer untuk mengunduh dokumen."
      );
    }

    setTimeout(() => window.print(), 150);
  }

  function printTicket(asPdf) {
    if (asPdf) {
      setNotice(
        "Pada jendela cetak, pilih “Simpan sebagai PDF” sebagai printer untuk mengunduh kartu."
      );
    }

    setTimeout(() => window.print(), 150);
  }

  const activeLabel =
    navItems.find(([, , key]) => key === tab)?.[0] || "Dasbor";

  return (
    <main className="sw-shell">
      <aside className="sw-sidebar">
        <Link className="sw-brand" href="/" onClick={() => navClick("dashboard")}>
          <span className="sw-brand-mark">✧</span>
          <span>
            <b>Citra Negara</b>
            <small>SISTEM PENERIMAAN MURID BARU</small>
          </span>
        </Link>

        <p className="sw-side-label">PORTAL CALON SISWA</p>

        {navItems.map(([label, icon, key]) => (
          <button
            key={key}
            className={`sw-nav-item ${tab === key ? "active" : ""}`}
            onClick={() => navClick(key)}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}

        <div className="sw-intake-box">
          <b>SPMB 2027/2028</b>
          <p>Gelombang 1 · Simulasi. Seluruh data bersifat fiktif.</p>
          <button onClick={() => setNotice("Portal aktif dalam mode demo.")}>
            Portal aktif
          </button>
        </div>

        <button className="sw-nav-item sw-logout" onClick={logout}>
          <span>↪</span>
          Keluar
        </button>
      </aside>

      <section className="sw-main">
        <header className="sw-topbar">
          <div className="sw-school-symbol">✧</div>

          <div className="sw-topbrand">
            <b>Citra Negara</b>
            <small>SISTEM PENERIMAAN MURID BARU</small>
          </div>

          <div className="sw-spacer" />

          <span className="sw-year">Tahun ajaran 2027/2028</span>
          <span className="sw-avatar">{student.initials}</span>

          <button
            className="sw-profile-button"
            onClick={() =>
              setNotice(`Masuk sebagai ${student.name} · calon siswa.`)
            }
          >
            {student.name}⌄
          </button>
        </header>

        <div className="sw-content">
          {notice && (
            <div className="sw-notice">
              <span>{notice}</span>
              <button onClick={() => setNotice("")}>×</button>
            </div>
          )}

          <div className="sw-breadcrumb">
            SPMB /{" "}
            {tab === "schedule"
              ? "Seleksi / Kartu peserta tes"
              : tab === "proof"
              ? "Hasil seleksi / Bukti penerimaan"
              : activeLabel}
          </div>

          {tab === "dashboard" ? (
            <>
              <h1 className="sw-title">
                Halo, {student.firstName}. Selamat datang!
              </h1>
              <p className="sw-subtitle">
                Pantau seluruh perjalanan pendaftaranmu di sini.
              </p>

              <div className="sw-banner">
                <span className="sw-check">✓</span>
                <div>
                  <b>Selamat! Kamu diterima di SMK Citra Negara</b>
                  <p>
                    Hasil seleksi telah diumumkan pada 28 Mei 2027. Lihat
                    hasil dan siapkan proses daftar ulang.
                  </p>
                </div>
              </div>

              <div className="sw-stats">
                <section className="sw-card sw-stat">
                  <span>No. pendaftaran</span>
                  <strong>{student.regNumber}</strong>
                  <small>{student.program}</small>
                </section>

                <section className="sw-card sw-stat">
                  <span>Kelengkapan berkas</span>
                  <strong>{student.documents}</strong>
                  <small>Seluruh dokumen terverifikasi</small>
                </section>

                <section className="sw-card sw-stat">
                  <span>Pembayaran</span>
                  <strong>{student.paymentStatus}</strong>
                  <small>{student.paymentNote}</small>
                </section>
              </div>

              <div className="sw-grid">
                <section className="sw-card">
                  <h3>Perjalanan pendaftaran</h3>

                  <div className="sw-table-scroll">
                    <table className="sw-table">
                      <thead>
                        <tr>
                          <th>Tahap</th>
                          <th>Status</th>
                          <th>Tanggal</th>
                        </tr>
                      </thead>

                      <tbody>
                        {journey.map(([step, status, date]) => (
                          <tr key={step}>
                            <td>{step}</td>
                            <td>{status}</td>
                            <td>{date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    className="sw-text-button"
                    onClick={() => navClick("result")}
                  >
                    → Lihat hasil seleksi
                  </button>
                </section>

                <section className="sw-card sw-next">
                  <h3>Langkah berikutnya</h3>

                  <span
                    className={`sw-pill ${reRegistered ? "done" : ""}`}
                  >
                    {reRegistered ? "Terkonfirmasi" : "Daftar ulang"}
                  </span>

                  <strong className="sw-next-date">29 Mei–5 Juni 2027</strong>

                  <p>
                    Siapkan dokumen asli untuk pencocokan data. Ketentuan
                    daftar ulang akan ditampilkan melalui portal.
                  </p>

                  <button className="sw-primary" onClick={confirmReRegister}>
                    → Konfirmasi daftar ulang
                  </button>

                  <small>Jadwal dan ketentuan adalah contoh simulasi.</small>
                </section>
              </div>
            </>
          ) : tab === "biodata" ? (
            <>
              <h1 className="sw-title">Biodata pendaftaran</h1>
              <p className="sw-subtitle">
                {student.regNumber} · Data biodata dan pilihan pendidikanmu
                sudah terkunci setelah hasil seleksi final.
              </p>

              <Stepper activeKey="biodata" onGo={navClick} />

              <div className="sw-bio-grid">
                <section className="sw-card">
                  <h3>Identitas calon siswa</h3>
                  <p className="sw-hint sw-bio-intro">
                    Tanda * menunjukkan isian wajib. Pilihan pendidikan dan
                    biodata sudah terkunci setelah hasil seleksi final.
                  </p>

                  <div className="sw-form-grid">
                    <Field label="Nama lengkap" value={biodata.fullName} />
                    <Field label="NISN" value={biodata.nisn} />
                    <Field label="Tempat lahir" value={biodata.birthPlace} />
                    <Field label="Tanggal lahir" value={biodata.birthDate} />
                    <Field label="Jenis kelamin" value={biodata.gender} />
                    <Field label="Asal sekolah" value={biodata.school} />
                    <Field
                      label="Alamat tempat tinggal"
                      value={biodata.address}
                      full
                    />
                    <Field
                      label="Nama orang tua / wali"
                      value={biodata.guardian}
                    />
                    <Field
                      label="Kontak wali"
                      value={biodata.guardianPhone}
                    />
                    <Field label="Email calon siswa" value={biodata.email} />
                    <Field label="Kontak calon siswa" value={biodata.phone} />
                  </div>

                  {correctionOpen && (
                    <div className="sw-correction">
                      <label>
                        Bagian yang perlu dikoreksi
                        <textarea
                          rows="3"
                          value={correctionText}
                          onChange={(e) =>
                            setCorrectionText(e.target.value)
                          }
                          placeholder="Contoh: Tanggal lahir seharusnya 12 Agustus 2010"
                        />
                      </label>

                      <div className="sw-correction-actions">
                        <button
                          className="sw-secondary"
                          onClick={() => {
                            setCorrectionOpen(false);
                            setCorrectionText("");
                          }}
                        >
                          Batal
                        </button>

                        <button
                          className="sw-primary"
                          onClick={sendCorrection}
                        >
                          Kirim koreksi
                        </button>
                      </div>
                    </div>
                  )}

                  {correction && !correctionOpen && (
                    <p className="sw-correction-sent">
                      Koreksi diajukan {correction.date}: “{correction.text}”
                    </p>
                  )}

                  <div className="sw-bio-footer">
                    <span className="sw-chip">
                      Baca-saja · Hasil seleksi final
                    </span>

                    <button
                      className="sw-link-button"
                      onClick={() => setCorrectionOpen(true)}
                    >
                      Ajukan koreksi ke admin
                    </button>
                  </div>
                </section>

                <section className="sw-card sw-education">
                  <h3>Pilihan pendidikan</h3>

                  <label className="sw-field">
                    Jenjang tujuan <i>*</i>
                    <input value={biodata.level} readOnly />
                  </label>
                  <p className="sw-hint">Pilihan tersedia: SMP, SMA, SMK.</p>

                  <label className="sw-field">
                    Program keahlian <i>*</i>
                    <input value={biodata.program} readOnly />
                  </label>
                  <p className="sw-hint">
                    Khusus SMK: PPLG, TKJ, MPLB, DKV, Perhotelan.
                  </p>

                  <span className="sw-pill">Biodata lengkap</span>

                  <p className="sw-hint sw-education-note">
                    Pilihan pendidikan dan biodata sudah terkunci setelah
                    hasil seleksi final. Jika ada kesalahan, ajukan koreksi
                    kepada admin.
                  </p>
                </section>
              </div>
            </>
          ) : tab === "documents" ? (
            <>
              <div className="sw-title-row">
                <div>
                  <h1 className="sw-title">Dokumen pendaftaran</h1>
                  <p className="sw-subtitle">
                    {student.regNumber} · {student.name} · SMK / PPLG
                  </p>
                </div>

                <span className="sw-pill">
                  {verifiedCount} / {documents.length} terverifikasi
                </span>
              </div>

              <Stepper activeKey="documents" onGo={navClick} />

              <div className="sw-bio-grid">
                <section className="sw-card">
                  <h3>Berkas yang diunggah</h3>
                  <p className="sw-hint sw-bio-intro">
                    Admin telah memverifikasi semua dokumen pada 17 Mei
                    2027.
                  </p>

                  <div className="sw-table-scroll">
                    <table className="sw-table">
                      <thead>
                        <tr>
                          <th>Dokumen</th>
                          <th>Berkas / ukuran</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>

                      <tbody>
                        {documents.map((d) => {
                          const pending = pendingDocIds.includes(d.id);

                          return (
                            <tr key={d.id}>
                              <td>{d.name}</td>
                              <td>
                                {d.file} · {d.size}
                              </td>
                              <td>
                                <span
                                  className={`sw-pill ${
                                    pending ? "amber" : ""
                                  }`}
                                >
                                  {pending
                                    ? "Koreksi diajukan"
                                    : "Terverifikasi"}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="sw-table-link"
                                  onClick={() => setPreviewDoc(d)}
                                >
                                  Lihat berkas
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <button
                    className="sw-primary sw-doc-next"
                    onClick={() => navClick("payment")}
                  >
                    → Lihat pembayaran
                  </button>
                </section>

                <section className="sw-card sw-side-card">
                  <h3>Koreksi dokumen</h3>
                  <p className="sw-hint">
                    Semua dokumen sudah terverifikasi. Gunakan ajukan
                    koreksi untuk meminta perubahan.
                  </p>

                  <span className="sw-chip">
                    Baca-saja · Tidak bisa diganti langsung
                  </span>

                  <p className="sw-side-text">
                    Anda bisa melihat berkas yang sudah dikirim, tetapi
                    penggantian dokumen memerlukan persetujuan admin.
                  </p>

                  {docCorrectionOpen ? (
                    <div className="sw-correction">
                      <label>
                        Dokumen
                        <select
                          value={docCorrectionId}
                          onChange={(e) =>
                            setDocCorrectionId(e.target.value)
                          }
                        >
                          {documents
                            .filter((d) => !pendingDocIds.includes(d.id))
                            .map((d) => (
                              <option key={d.id} value={d.id}>
                                {d.name}
                              </option>
                            ))}
                        </select>
                      </label>

                      <label>
                        Alasan koreksi
                        <textarea
                          rows="3"
                          value={docCorrectionText}
                          onChange={(e) =>
                            setDocCorrectionText(e.target.value)
                          }
                          placeholder="Contoh: Foto pada pasfoto kurang jelas"
                        />
                      </label>

                      <div className="sw-correction-actions">
                        <button
                          className="sw-secondary"
                          onClick={() => setDocCorrectionOpen(false)}
                        >
                          Batal
                        </button>

                        <button
                          className="sw-primary"
                          onClick={sendDocCorrection}
                        >
                          Kirim
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="sw-secondary"
                      onClick={openDocCorrection}
                    >
                      Ajukan koreksi
                    </button>
                  )}

                  {docCorrections.length > 0 && (
                    <ul className="sw-correction-list">
                      {docCorrections.map((c) => (
                        <li key={c.id}>
                          <div>
                            <b>{documents.find((d) => d.id === c.id)?.name}</b>
                            <span>
                              {c.date} · “{c.text}”
                            </span>
                          </div>

                          <button onClick={() => cancelDocCorrection(c.id)}>
                            Batalkan
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="sw-hint sw-side-note">
                    Admin akan membuka kunci dokumen yang dipilih agar Anda
                    bisa mengunggah versi baru.
                  </p>
                </section>
              </div>

              <PreviewModal
                doc={previewDoc}
                onClose={() => setPreviewDoc(null)}
              />
            </>
          ) : tab === "payment" ? (
            <>
              <h1 className="sw-title">Pembayaran pendaftaran</h1>
              <p className="sw-subtitle">
                {student.regNumber} · SMK / Pengembangan Perangkat Lunak Dan
                Game
              </p>

              <Stepper activeKey="payment" onGo={navClick} />

              <div className="sw-pay-grid">
                <div className="sw-stack">
                  <section className="sw-card">
                    <h3>Rincian tagihan</h3>

                    <div className="sw-invoice-row">
                      <span className="sw-hint">{payment.invoice}</span>
                      <span className="sw-pill">Lunas</span>
                    </div>

                    <strong className="sw-amount">
                      {rupiah(payment.amount)}
                    </strong>

                    <p className="sw-hint sw-amount-note">
                      Biaya pendaftaran gelombang 1 · contoh
                    </p>

                    <div className="sw-table-scroll">
                      <table className="sw-table">
                        <thead>
                          <tr>
                            <th>Komponen</th>
                            <th>Jumlah</th>
                          </tr>
                        </thead>

                        <tbody>
                          {payment.components.map(([name, value]) => (
                            <tr key={name}>
                              <td>{name}</td>
                              <td>{rupiah(value)}</td>
                            </tr>
                          ))}

                          <tr>
                            <td>Total pembayaran</td>
                            <td>{rupiah(payment.amount)}</td>
                          </tr>

                          <tr>
                            <td>Sisa tagihan</td>
                            <td>{rupiah(0)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <button
                      className="sw-secondary sw-receipt"
                      onClick={downloadReceipt}
                    >
                      ⇩ Unduh kuitansi
                    </button>
                  </section>

                  <section className="sw-card">
                    <h3>Informasi pembayaran</h3>

                    <p className="sw-info-line">
                      Metode: {payment.method} (simulasi)
                    </p>
                    <p className="sw-info-line">
                      Bank Contoh · Rekening: DEMO-0001
                    </p>
                    <p className="sw-info-line">
                      <b>Penerima: Panitia SPMB Citra Negara</b>
                    </p>
                    <p className="sw-hint">
                      Jangan melakukan transfer. Informasi ini bukan
                      rekening pembayaran nyata.
                    </p>
                  </section>
                </div>

                <section className="sw-card">
                  <h3>Bukti pembayaran</h3>
                  <p className="sw-hint sw-bio-intro">
                    Bukti sudah diverifikasi pada {payment.verifiedAt}.
                  </p>

                  <div className="sw-banner">
                    <span className="sw-check">✓</span>
                    <div>
                      <b>Pembayaran terkonfirmasi</b>
                      <p>
                        {rupiah(payment.amount)} diterima dalam data
                        simulasi. Tidak ada tagihan tersisa.
                      </p>
                    </div>
                  </div>

                  <div className="sw-form-grid">
                    <label className="sw-field">
                      Nama pengirim
                      <input value={payment.sender} readOnly />
                    </label>

                    <label className="sw-field">
                      Tanggal transfer
                      <input value={payment.date} readOnly />
                    </label>

                    <label className="sw-field">
                      Nominal transfer
                      <input value={rupiah(payment.amount)} readOnly />
                    </label>

                    <label className="sw-field">
                      Metode pembayaran
                      <input value={payment.method} readOnly />
                    </label>
                  </div>

                  <div className="sw-file-row">
                    <span>
                      {payment.proof.file} · {payment.proof.size}
                    </span>

                    <button
                      className="sw-table-link"
                      onClick={() => setPreviewDoc(payment.proof)}
                    >
                      Lihat bukti
                    </button>
                  </div>

                  <div className="sw-dropzone">
                    <span className="sw-drop-icon">⇪</span>
                    <b>Unggah / ganti bukti transfer</b>
                    <small>JPG, PNG, PDF · Maksimal 2 MB</small>

                    {proofFile && (
                      <small className="sw-picked">
                        Dipilih: {proofFile.name} · {proofFile.size}
                      </small>
                    )}

                    <label className="sw-secondary sw-file-button">
                      Pilih berkas
                      <input
                        type="file"
                        hidden
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={pickProofFile}
                      />
                    </label>
                  </div>

                  <p className="sw-hint sw-proof-note">
                    Penggantian bukti terverifikasi memerlukan persetujuan
                    admin.
                  </p>

                  {proofRequestOpen && (
                    <div className="sw-correction">
                      <label>
                        Alasan perubahan bukti
                        <textarea
                          rows="3"
                          value={proofRequestText}
                          onChange={(e) =>
                            setProofRequestText(e.target.value)
                          }
                          placeholder="Contoh: Bukti transfer kurang jelas, ingin diganti"
                        />
                      </label>

                      <div className="sw-correction-actions">
                        <button
                          className="sw-secondary"
                          onClick={() => setProofRequestOpen(false)}
                        >
                          Batal
                        </button>

                        <button
                          className="sw-primary"
                          onClick={sendProofRequest}
                        >
                          Kirim pengajuan
                        </button>
                      </div>
                    </div>
                  )}

                  {proofRequest && !proofRequestOpen && (
                    <div className="sw-correction-sent sw-proof-pending">
                      <span>
                        Perubahan bukti diajukan {proofRequest.date}
                        {proofRequest.file
                          ? ` (${proofRequest.file})`
                          : ""}
                        : “{proofRequest.text}”
                      </span>

                      <button onClick={cancelProofRequest}>Batalkan</button>
                    </div>
                  )}

                  {!proofRequest && !proofRequestOpen && (
                    <button
                      className="sw-secondary"
                      onClick={() => setProofRequestOpen(true)}
                    >
                      Ajukan perubahan bukti
                    </button>
                  )}
                </section>
              </div>

              <PreviewModal
                doc={previewDoc}
                onClose={() => setPreviewDoc(null)}
              />
            </>
          ) : tab === "schedule" ? (
            <>
              <div className="sw-title-row">
                <div>
                  <h1 className="sw-title">Jadwal dan kartu peserta tes</h1>
                  <p className="sw-subtitle">
                    {student.name} · {student.regNumber} · SMK ·
                    Pengembangan Perangkat Lunak Dan Game
                  </p>
                </div>

                <div className="sw-title-actions">
                  <button
                    className="sw-secondary"
                    onClick={() => printTicket(false)}
                  >
                    ⎙ Cetak
                  </button>

                  <button
                    className="sw-primary"
                    onClick={() => printTicket(true)}
                  >
                    ⇩ Unduh PDF
                  </button>
                </div>
              </div>

              <div className="sw-banner warn">
                <span className="sw-check">!</span>
                <div>
                  <b>Tes susulan · Pengecualian jadwal utama</b>
                  <p>
                    Jadwal Anda adalah {ticket.date}, bukan tes utama 24
                    Mei. Hasil susulan menunggu penetapan admin dan tidak
                    mengubah hasil peserta lain yang sudah diumumkan 28
                    Mei.
                  </p>
                </div>
              </div>

              <div className="sw-bio-grid">
                <section className="sw-card">
                  <h3>Pratinjau kartu peserta</h3>
                  <p className="sw-hint sw-bio-intro">
                    Siap diunduh / dicetak · Dokumen simulasi
                  </p>

                  <div className="sw-ticket">
                    <div className="sw-ticket-head">
                      <div>
                        <b>SEKOLAH CITRA NEGARA</b>
                        <small>SISTEM PENERIMAAN MURID BARU</small>
                        <small>Tahun ajaran 2027/2028 · SMK</small>
                      </div>

                      <span className="sw-chip">SIMULASI</span>
                    </div>

                    <hr className="sw-ticket-line" />

                    <p className="sw-ticket-title">
                      KARTU PESERTA TES TPA / TPS
                    </p>

                    <div className="sw-ticket-person">
                      <div>
                        <strong>{student.name}</strong>
                        <span>{ticket.testNumber}</span>
                      </div>

                      <div className="sw-ticket-photo">♙</div>
                    </div>

                    <table className="sw-table">
                      <thead>
                        <tr>
                          <th>Identitas / jadwal</th>
                          <th>Keterangan</th>
                        </tr>
                      </thead>

                      <tbody>
                        {[
                          ["Nomor pendaftaran", student.regNumber],
                          ["Jenjang / gelombang", ticket.level],
                          ["Jenis jadwal", ticket.type],
                          ["Tanggal tes", ticket.date],
                          ["Waktu tes", ticket.time],
                          ["Ruang", ticket.room],
                          ["Waktu hadir", ticket.arrive],
                        ].map(([label, value]) => (
                          <tr key={label}>
                            <td>{label}</td>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="sw-hint sw-ticket-foot">
                      Kartu contoh untuk rancangan portal, bukan kartu
                      resmi. Nomor peserta dicocokkan dengan identitas pada
                      saat tes.
                    </p>
                  </div>
                </section>

                <div className="sw-stack">
                  <section className="sw-card">
                    <h3>Status kesiapan</h3>

                    <span className="sw-pill amber">
                      Terjadwal · Susulan
                    </span>

                    <p className="sw-info-line sw-status-text">
                      Berkas valid · Pembayaran valid
                      <br />
                      Nilai TPA / TPS belum tersedia.
                    </p>

                    <p className="sw-hint">
                      Kartu mengikuti jadwal yang sudah ditetapkan admin.
                    </p>
                  </section>

                  <section className="sw-card">
                    <h3>Petunjuk peserta</h3>

                    <ol className="sw-steps-list">
                      {ticketInstructions.map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ol>
                  </section>

                  <section className="sw-card">
                    <h3>Saran cetak</h3>

                    <p className="sw-hint sw-print-tip">
                      A4 · Orientasi potret · Skala sesuai halaman. Simpan
                      PDF sebagai cadangan; kartu tes bukan bukti
                      penerimaan.
                    </p>

                    <button
                      className="sw-secondary"
                      onClick={() => printTicket(true)}
                    >
                      ⇩ Unduh kartu PDF
                    </button>
                  </section>
                </div>
              </div>
            </>
          ) : tab === "result" ? (
            <>
              <h1 className="sw-title">Hasil seleksi</h1>
              <p className="sw-subtitle">
                {student.regNumber} · {student.name} · Gelombang 1
              </p>

              <Stepper activeKey="result" onGo={navClick} />

              <section className="sw-result-hero">
                <div className="sw-result-top">
                  <div className="sw-result-title">
                    <span className="sw-result-medal">✪</span>

                    <div>
                      <small>{result.status.toUpperCase()}</small>
                      <h2>Selamat, {student.firstName}!</h2>
                    </div>
                  </div>

                  <button className="sw-primary" onClick={downloadAcceptance}>
                    ⇩ Unduh bukti penerimaan
                  </button>
                </div>

                <p className="sw-result-text">
                  Kamu diterima di SMK Citra Negara · Pengembangan
                  Perangkat Lunak Dan Game.
                </p>

                <p className="sw-hint">
                  Diumumkan {result.announcedAt} · Lanjutkan daftar ulang
                  pada {result.reRegisterPeriod}.
                </p>
              </section>

              <div className="sw-bio-grid">
                <section className="sw-card">
                  <h3>Tes TPA / TPS</h3>
                  <p className="sw-hint sw-bio-intro">
                    Tes telah selesai · {result.testDate}
                  </p>

                  <div className="sw-table-scroll">
                    <table className="sw-table">
                      <thead>
                        <tr>
                          <th>Informasi tes</th>
                          <th>Detail</th>
                        </tr>
                      </thead>

                      <tbody>
                        {[
                          ["No. peserta", result.testNumber],
                          [
                            "Jadwal",
                            `${result.testDate} · ${result.testTime}`,
                          ],
                          ["Lokasi contoh", result.location],
                          ["TPA · Tes Potensi Akademik", `${result.tpa} / 100`],
                          ["TPS · Tes Potensi Skolastik", `${result.tps} / 100`],
                          [
                            "Rata-rata nilai",
                            `${Math.round((result.tpa + result.tps) / 2)} / 100`,
                          ],
                        ].map(([label, value]) => (
                          <tr key={label}>
                            <td>{label}</td>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="sw-card">
                  <h3>Ringkasan status</h3>

                  <ul className="sw-checklist">
                    {resultChecklist.map((item) => (
                      <li key={item}>
                        <span className="sw-check sm">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="sw-next-title">Berikutnya: daftar ulang</p>

                  <p className="sw-hint sw-result-next">
                    Bawa dokumen asli dan bukti penerimaan. Pantau
                    informasi daftar ulang di portal.
                  </p>

                  <button
                    className="sw-secondary"
                    onClick={() => navClick("dashboard")}
                  >
                    Kembali ke dasbor
                  </button>
                </section>
              </div>
            </>
          ) : tab === "reregister" ? (
            <>
              <div className="sw-title-row">
                <div>
                  <h1 className="sw-title">Daftar ulang</h1>
                  <p className="sw-subtitle">
                    {student.name} · {student.regNumber} · Diterima di SMK
                    Rekayasa Perangkat Lunak
                  </p>
                </div>

                <button
                  className="sw-secondary"
                  onClick={() => navClick("proof")}
                >
                  ▣ Lihat bukti penerimaan
                </button>
              </div>

              <div className="sw-banner">
                <span className="sw-check">✓</span>
                <div>
                  <b>Selamat! Lanjutkan konfirmasi tempat belajarmu</b>
                  <p>
                    Daftar ulang Gelombang 1: {result.reRegisterPeriod}.
                    Konfirmasi melalui portal, lalu bawa dokumen asli untuk
                    pencocokan di sekolah.
                  </p>
                </div>
              </div>

              <div className="sw-rereg-grid">
                <div className="sw-stack">
                  <section className="sw-card">
                    <h3>Checklist daftar ulang</h3>
                    <p className="sw-hint sw-bio-intro">
                      {reRegistered
                        ? "Konfirmasi daftar ulang sudah dikirim."
                        : "Tahap penerimaan selesai · Konfirmasi daftar ulang belum dikirim."}
                    </p>

                    <ul className="sw-todo-list">
                      {reregChecklist.map(([title, text, tag]) => (
                        <li key={title}>
                          <span className="sw-check sm">✓</span>

                          <div>
                            <b>{title}</b>
                            <span>{text}</span>
                          </div>

                          <span className="sw-pill">{tag}</span>
                        </li>
                      ))}

                      <li>
                        {reRegistered ? (
                          <span className="sw-check sm">✓</span>
                        ) : (
                          <span className="sw-circle-empty" />
                        )}

                        <div>
                          <b>Konfirmasi daftar ulang</b>
                          <span>
                            {reRegistered
                              ? "Menunggu pencocokan dokumen di sekolah."
                              : "Kirim formulir di samping untuk mencatat kesediaan."}
                          </span>
                        </div>

                        <span
                          className={`sw-pill ${reRegistered ? "" : "amber"}`}
                        >
                          {reRegistered ? "Terkirim" : "Belum dikirim"}
                        </span>
                      </li>
                    </ul>
                  </section>

                  <section className="sw-card">
                    <h3>Pencocokan dokumen di sekolah</h3>

                    <strong className="sw-next-date">
                      {result.reRegisterPeriod}
                    </strong>

                    <p className="sw-info-line">
                      08.00–15.00 WIB · Ruang layanan SPMB
                    </p>

                    <p className="sw-hint sw-side-text">
                      Calon siswa hadir bersama orang tua/wali. Bawa dokumen
                      asli, satu set fotokopi, dan cetakan bukti
                      penerimaan.
                    </p>

                    <p className="sw-hint">
                      Dokumen asli hanya diperiksa dan dikembalikan. Jadwal
                      dan lokasi ini bersifat ilustratif.
                    </p>
                  </section>

                  <div className="sw-banner">
                    <span className="sw-check">✓</span>
                    <div>
                      <b>Pembayaran pendaftaran sudah lunas</b>
                      <p>
                        Tidak perlu membayar ulang Rp250.000. Informasi
                        biaya pendidikan, jika ada, disampaikan secara
                        terpisah oleh sekolah.
                      </p>
                    </div>
                  </div>
                </div>

                <section className="sw-card">
                  <h3>Form konfirmasi daftar ulang</h3>
                  <p className="sw-hint sw-bio-intro">
                    {reRegistered
                      ? "Konfirmasi terkirim · Menunggu pencocokan."
                      : reregDraftSaved
                      ? "Contoh formulir terisi · Draf tersimpan."
                      : "Contoh formulir terisi · Belum diajukan."}
                  </p>

                  <div className="sw-form-grid">
                    <label className="sw-field">
                      Nama calon siswa
                      <input value={student.name} readOnly />
                    </label>

                    <label className="sw-field">
                      No. pendaftaran
                      <input value={student.regNumber} readOnly />
                    </label>

                    <label className="sw-field full">
                      Jenjang / program diterima
                      <input
                        value="SMK · Pengembangan Perangkat Lunak Dan Game"
                        readOnly
                      />
                    </label>

                    <label className="sw-field sw-editable">
                      Nama orang tua / wali <i>*</i>
                      <input
                        value={reregForm.guardian}
                        disabled={reRegistered}
                        onChange={(e) => setRereg("guardian", e.target.value)}
                      />
                    </label>

                    <label className="sw-field sw-editable">
                      Hubungan <i>*</i>
                      <select
                        value={reregForm.relation}
                        disabled={reRegistered}
                        onChange={(e) => setRereg("relation", e.target.value)}
                      >
                        {REREG_RELATIONS.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </label>

                    <label className="sw-field sw-editable full">
                      Kontak wali <i>*</i>
                      <input
                        value={reregForm.phone}
                        disabled={reRegistered}
                        onChange={(e) => setRereg("phone", e.target.value)}
                      />
                    </label>

                    <label className="sw-field sw-editable">
                      Tanggal kedatangan <i>*</i>
                      <select
                        value={reregForm.date}
                        disabled={reRegistered}
                        onChange={(e) => setRereg("date", e.target.value)}
                      >
                        {REREG_DATES.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </label>

                    <label className="sw-field sw-editable">
                      Jam kedatangan <i>*</i>
                      <select
                        value={reregForm.time}
                        disabled={reRegistered}
                        onChange={(e) => setRereg("time", e.target.value)}
                      >
                        {REREG_TIMES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </label>

                    <label className="sw-field sw-editable full">
                      Catatan tambahan
                      <input
                        value={reregForm.note}
                        disabled={reRegistered}
                        onChange={(e) => setRereg("note", e.target.value)}
                      />
                    </label>
                  </div>

                  <label className="sw-agree">
                    <input
                      type="checkbox"
                      checked={reregForm.agree}
                      disabled={reRegistered}
                      onChange={(e) => setRereg("agree", e.target.checked)}
                    />
                    <span>
                      Saya bersedia menjadi siswa Citra Negara, menyatakan
                      data benar, dan akan membawa dokumen asli sesuai
                      ketentuan.
                    </span>
                  </label>

                  <div className="sw-rereg-actions">
                    {reRegistered ? (
                      <button className="sw-secondary" onClick={resetRereg}>
                        Batalkan konfirmasi
                      </button>
                    ) : (
                      <>
                        <button
                          className="sw-secondary"
                          onClick={saveReregDraft}
                        >
                          Simpan draf
                        </button>

                        <button className="sw-primary" onClick={sendRereg}>
                          ✓ Kirim konfirmasi
                        </button>
                      </>
                    )}
                  </div>

                  <p className="sw-hint">
                    * Wajib diisi. Setelah dikirim, status menjadi Menunggu
                    pencocokan. Konfirmasi ini bukan bukti daftar ulang
                    selesai.
                  </p>
                </section>
              </div>
            </>
          ) : tab === "proof" ? (
            <>
              <div className="sw-title-row">
                <div>
                  <h1 className="sw-title">Bukti penerimaan</h1>
                  <p className="sw-subtitle">
                    Dokumen penerimaan dan kuitansi pendaftaran ·{" "}
                    {student.name} · {student.regNumber}
                  </p>
                </div>

                <div className="sw-title-actions">
                  <button
                    className="sw-secondary"
                    onClick={() => printLetter(false)}
                  >
                    ⎙ Cetak
                  </button>

                  <button
                    className="sw-primary"
                    onClick={() => printLetter(true)}
                  >
                    ⇩ Unduh PDF
                  </button>
                </div>
              </div>

              <div className="sw-bio-grid">
                <section className="sw-card sw-ticket sw-letter">
                  <div className="sw-ticket-head">
                    <div className="sw-letter-brand">
                      <span className="sw-letter-logo">✧</span>

                      <div>
                        <b>SEKOLAH CITRA NEGARA</b>
                        <small>
                          SISTEM PENERIMAAN MURID BARU · SMP / SMA / SMK
                        </small>
                        <small>Tahun ajaran 2027/2028 · Gelombang 1</small>
                      </div>
                    </div>

                    <span className="sw-chip">SIMULASI</span>
                  </div>

                  <hr className="sw-ticket-line" />

                  <p className="sw-letter-title">BUKTI PENERIMAAN MURID BARU</p>
                  <p className="sw-letter-number">
                    Nomor dokumen: {letter.docNumber}
                  </p>

                  <p className="sw-letter-text">
                    Berdasarkan hasil seleksi yang diumumkan pada{" "}
                    {result.announcedAt}, calon siswa berikut dinyatakan
                    diterima di Sekolah Citra Negara.
                  </p>

                  <table className="sw-table">
                    <thead>
                      <tr>
                        <th>Identitas calon siswa</th>
                        <th>Keterangan</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[
                        ["Nama lengkap", student.name],
                        [
                          "Nomor pendaftaran / NISN",
                          `${student.regNumber} / ${biodata.nisn}`,
                        ],
                        ["Asal sekolah", biodata.school],
                        ["Jenjang diterima", "SMK"],
                        ["Program keahlian", "Rekayasa Perangkat Lunak (RPL)"],
                        ["Tahun ajaran / gelombang", "2027/2028 / Gelombang 1"],
                      ].map(([label, value]) => (
                        <tr key={label}>
                          <td>{label}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="sw-accepted-box">
                    <div>
                      <b>DITERIMA · SMK RPL</b>
                      <span>
                        TPA {result.tpa} · TPS {result.tps} · Rata-rata{" "}
                        {Math.round((result.tpa + result.tps) / 2)} / 100
                      </span>
                    </div>

                    <span className="sw-result-medal">✪</span>
                  </div>

                  <h4 className="sw-letter-section">
                    Kuitansi biaya pendaftaran
                  </h4>

                  <div className="sw-invoice-row">
                    <span className="sw-letter-small">
                      No. kuitansi: {letter.receiptNumber}
                    </span>
                    <span className="sw-pill">Lunas</span>
                  </div>

                  <p className="sw-letter-text">
                    Telah diterima dari {student.name} sejumlah{" "}
                    {rupiah(payment.amount)} (dua ratus lima puluh ribu
                    rupiah) untuk biaya pendaftaran SPMB 2027/2028.
                  </p>

                  <p className="sw-hint">
                    Transfer terverifikasi {payment.verifiedAt} ·{" "}
                    {payment.proof.file}
                  </p>

                  <hr className="sw-letter-divider" />

                  <div className="sw-letter-foot">
                    <div>
                      <b>Daftar ulang: {result.reRegisterPeriod}</b>
                      <p className="sw-hint">
                        Bawa bukti ini dan dokumen asli untuk pencocokan.
                        Dokumen ini bukan bukti daftar ulang selesai.
                      </p>
                    </div>

                    <div className="sw-letter-sign">
                      <span>Diterbitkan {letter.issuedAt}</span>
                      <b>Panitia SPMB Citra Negara</b>
                      <small>Dokumen contoh · Tanpa tanda tangan resmi</small>
                    </div>
                  </div>

                  <p className="sw-hint sw-ticket-foot">
                    Pratinjau dokumen simulasi, bukan surat atau kuitansi
                    resmi. Identitas dan seluruh data bersifat fiktif.
                  </p>
                </section>

                <div className="sw-stack">
                  <section className="sw-card">
                    <h3>Ringkasan penerimaan</h3>

                    <span className="sw-pill">Diterima</span>

                    <strong className="sw-summary-name">{student.name}</strong>

                    <p className="sw-summary-line">{student.regNumber}</p>
                    <p className="sw-summary-line">SMK · PPLG</p>
                    <p className="sw-summary-line sw-muted-line">
                      Diumumkan {result.announcedAt} · {letter.announcedTime}
                    </p>
                    <p className="sw-summary-line sw-muted-line">
                      Dokumen 6 / 6 valid · Pembayaran lunas
                    </p>
                  </section>

                  <section className="sw-card">
                    <h3>Simpan dokumenmu</h3>

                    <p className="sw-hint sw-side-text">
                      Unduh PDF untuk arsip pribadi atau cetak satu salinan.
                      Kuitansi pendaftaran disertakan dalam dokumen yang
                      sama.
                    </p>

                    <p className="sw-hint sw-print-tip">
                      Saran cetak: A4, orientasi potret, skala sesuai
                      halaman.
                    </p>

                    <button
                      className="sw-secondary"
                      onClick={() => printLetter(true)}
                    >
                      ⇩ Unduh PDF
                    </button>
                  </section>

                  <div className="sw-banner">
                    <span className="sw-check">✓</span>
                    <div>
                      <b>Langkah berikutnya</b>
                      <p>
                        Konfirmasi daftar ulang melalui portal sebelum 5
                        Juni 2027, lalu hadir untuk pencocokan dokumen.
                      </p>
                    </div>
                  </div>

                  <button
                    className="sw-primary sw-next-button"
                    onClick={() => navClick("reregister")}
                  >
                    → Lanjut daftar ulang
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="sw-title">{activeLabel}</h1>

              <section className="sw-card sw-placeholder">
                <div className="sw-placeholder-icon">▤</div>
                <h3>{activeLabel}</h3>
                <p>{placeholders[tab]}</p>

                <button
                  className="sw-primary"
                  onClick={() => navClick("dashboard")}
                >
                  Kembali ke dasbor
                </button>
              </section>
            </>
          )}
        </div>

        <footer className="sw-footer">
          © 2027 Sekolah Citra Negara · SPMB SMP / SMA / SMK
          <span>
            Prototipe · Data &amp; jadwal ilustratif　 |　 Panduan　 |　 Privasi
          </span>
        </footer>
      </section>
    </main>
  );
}