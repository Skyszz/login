"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./admin.css";

const initialApplicants = [
  { id: "CN-270001", name: "Alfaro Rafif Khoir", email: "alfaro@gmail.com", level: "SMK", program: "PPLG", status: "Diterima", payment: "Lunas", date: "28 Mei 2027", score: 84 },
  { id: "CN-270002", name: "Arya Pratama", email: "arya@example.com", level: "SMP", program: "-", status: "Verifikasi", payment: "Lunas", date: "28 Mei 2027", score: 78 },
  { id: "CN-270003", name: "Dinda Safira", email: "dinda@example.com", level: "SMA", program: "-", status: "Draft", payment: "Belum bayar", date: "28 Mei 2027", score: 0 },
  { id: "CN-270004", name: "Citra Lestari", email: "citra@example.com", level: "SMK", program: "TJKT", status: "Diterima", payment: "Lunas", date: "28 Mei 2027", score: 86 },
  { id: "CN-270005", name: "Dinda Aulia", email: "aulia@example.com", level: "SMP", program: "-", status: "Tes terjadwal", payment: "Lunas", date: "28 Mei 2027", score: 73 },
  { id: "CN-270006", name: "Farhan Akbar", email: "farhan@example.com", level: "SMA", program: "-", status: "Tidak diterima", payment: "Belum bayar", date: "28 Mei 2027", score: 55 },
];

const initialPrograms = [
  { id: 1, code: "PPLG", name: "Pengembangan Perangkat Lunak dan Gim", applicants: 32, status: "Aktif", level: "SMK", fee: 250000, description: "Pengembangan aplikasi, basis data, website, dan pemrograman." },
  { id: 2, code: "TJKT", name: "Teknik Komputer dan Jaringan", applicants: 28, status: "Aktif", level: "SMK", fee: 250000, description: "Jaringan komputer, instalasi, konfigurasi, dan keamanan jaringan." },
  { id: 3, code: "MPLB", name: "Manajemen Perkantoran dan Layanan Bisnis", applicants: 24, status: "Aktif", level: "SMK", fee: 250000, description: "Administrasi, pengelolaan dokumen, kearsipan, dan layanan bisnis." },
  { id: 4, code: "DKV", name: "Desain Komunikasi Visual", applicants: 20, status: "Aktif", level: "SMK", fee: 250000, description: "Desain grafis, ilustrasi, fotografi, dan media visual." },
  { id: 5, code: "BDR", name: "Bisnis Daring dan Ritel", applicants: 24, status: "Aktif", level: "SMK", fee: 250000, description: "Bisnis, pemasaran, penjualan, dan pelayanan pelanggan." },
  { id: 6, code: "PH", name: "Perhotelan", applicants: 18, status: "Aktif", level: "SMK", fee: 250000, description: "Pelayanan hotel, tata graha, dan layanan perhotelan." },
];

const navItems = [
  ["Dasbor", "⌂", "dashboard"],
  ["Data pendaftar", "♙", "applicants"],
  ["Laporan pembayaran", "▤", "payments"],
  ["Verifikasi pembayaran", "✓", "verify"],
  ["Kelola tes TPA/TPS", "▦", "tests"],
  ["Jenjang dan program", "▤", "programs"],
  ["Jadwal penerimaan", "▦", "schedule"],
  ["Akun dan hak akses", "♙", "accounts"],
  ["Pengumuman", "♧", "announcements"],
];

const PAYMENT_AMOUNT = 250000;

// Halaman tujuan setelah menekan tombol Keluar. Ubah jika route login berbeda.
const LOGIN_PATH = "/login";

/* =====================================================
   HAK AKSES
   ===================================================== */

const PERMISSION_LIST = [
  { id: "dashboard", label: "Melihat dasbor" },
  { id: "applicants", label: "Melihat dan mengelola data pendaftar" },
  { id: "payments", label: "Melihat laporan pembayaran" },
  { id: "verify", label: "Memverifikasi pembayaran" },
  { id: "tests", label: "Mengelola tes dan nilai" },
  { id: "programs", label: "Mengelola jenjang dan program" },
  { id: "schedule", label: "Mengelola jadwal penerimaan" },
  { id: "accounts", label: "Mengelola akun dan hak akses" },
  { id: "announcements", label: "Mengelola pengumuman" },
  { id: "student_registration", label: "Calon siswa: melihat pendaftaran sendiri" },
  { id: "student_payment", label: "Calon siswa: melihat pembayaran sendiri" },
  { id: "student_schedule", label: "Calon siswa: melihat jadwal tes sendiri" },
  { id: "student_results", label: "Calon siswa: melihat hasil seleksi sendiri" },
  { id: "student_announcements", label: "Calon siswa: melihat pengumuman" },
];

const ADMIN_PERMISSIONS = [
  "dashboard",
  "applicants",
  "payments",
  "verify",
  "tests",
  "programs",
  "schedule",
  "accounts",
  "announcements",
];

const PRINCIPAL_PERMISSIONS = [
  "dashboard",
  "applicants",
  "payments",
  "tests",
  "schedule",
  "announcements",
];

const STUDENT_PERMISSIONS = [
  "student_registration",
  "student_payment",
  "student_schedule",
  "student_results",
  "student_announcements",
];

const ROLE_PERMISSIONS = {
  Administrator: ADMIN_PERMISSIONS,
  "Kepala Sekolah": PRINCIPAL_PERMISSIONS,
  "Calon Siswa": STUDENT_PERMISSIONS,
};

const initialAccounts = [
  {
    id: 1,
    name: "Admin",
    email: "admin@citranegara.sch.id",
    role: "Administrator",
    status: "Aktif",
    permissions: [...ADMIN_PERMISSIONS],
  },
  {
    id: 2,
    name: "Kepala Sekolah",
    email: "kepalasekolah@citranegara.sch.id",
    role: "Kepala Sekolah",
    status: "Aktif",
    permissions: [...PRINCIPAL_PERMISSIONS],
  },
  {
    id: 3,
    name: "Alfaro Rafif Khoir",
    email: "alfaro@gmail.com",
    role: "Calon Siswa",
    status: "Aktif",
    permissions: [...STUDENT_PERMISSIONS],
  },
];

const makeWave = (id) => ({
  id,
  name: `Gelombang ${id}`,
  year: "2027/2028",
  level: "SMP / SMA / SMK",
  open: "2027-06-06T00:00",
  close: "2027-06-20T23:59",
  test: "2027-06-24",
  testTime: "08:00–10:00 WIB",
  announcement: "2027-06-28T09:00",
  reRegister: "2027-06-29T00:00",
  reRegisterEnd: "2027-07-05T15:00",
  status: "Draf",
  note: "",
});

const initialWaves = [
  {
    ...makeWave(1),
    name: "Gelombang 1",
    status: "Aktif",
    open: "2027-06-01T00:00",
  },
  makeWave(2),
];

const emptyProgram = {
  code: "",
  name: "",
  applicants: 0,
  status: "Aktif",
  level: "SMK",
  fee: 250000,
  description: "",
};

const emptyAccount = {
  name: "",
  email: "",
  role: "Kepala Sekolah",
  status: "Aktif",
  permissions: [...PRINCIPAL_PERMISSIONS],
};

/* =====================================================
   PENGUMUMAN
   ===================================================== */

const ANN_LEVELS = ["Semua jenjang", "SMP", "SMA", "SMK"];

const ANN_AUDIENCES = [
  "Publik",
  "Semua calon siswa",
  "Peserta tes terjadwal",
  "Siswa diterima",
];

const initialAnnouncements = [
  {
    id: 1,
    title: "Panduan unggah berkas",
    body: "Unggah berkas dalam format PDF atau JPG maksimal 2 MB. Pastikan seluruh tulisan pada dokumen terbaca jelas sebelum dikirim.",
    level: "Semua jenjang",
    audience: "Publik",
    status: "Terbit",
    publishAt: "2027-05-20T08:00",
    updatedAt: "20 Mei 2027 · 08:00",
  },
  {
    id: 2,
    title: "Persiapan tes TPA / TPS",
    body: "Unduh kartu peserta melalui portal. Hadir 30 menit sebelum sesi tes, bawa kartu peserta dan identitas. Ikuti tanggal, sesi, dan ruang yang tercantum pada kartu masing-masing.",
    level: "SMP",
    audience: "Peserta tes terjadwal",
    status: "Draf",
    publishAt: "2027-05-22T09:00",
    updatedAt: "21 Mei 2027 · 14:00",
  },
  {
    id: 3,
    title: "Informasi daftar ulang",
    body: "Siswa yang diterima wajib melakukan daftar ulang pada periode yang ditentukan. Lengkapi berkas asli dan bukti pembayaran saat daftar ulang.",
    level: "Semua jenjang",
    audience: "Siswa diterima",
    status: "Terbit",
    publishAt: "2027-05-18T10:00",
    updatedAt: "18 Mei 2027 · 10:00",
  },
  {
    id: 4,
    title: "Mengenal program SMK",
    body: "Pelajari program keahlian PPLG, TJKT, MPLB, DKV, BDR, dan Perhotelan sebelum menentukan pilihan program.",
    level: "SMK",
    audience: "Publik",
    status: "Draf",
    publishAt: "2027-05-25T09:00",
    updatedAt: "19 Mei 2027 · 11:30",
  },
];

const emptyAnnouncement = {
  title: "",
  body: "",
  level: "Semua jenjang",
  audience: "Publik",
  status: "Draf",
  publishAt: "2027-05-22T09:00",
};

function annNowLabel() {
  const d = new Date();

  const date = d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${date} · ${time.replace(".", ":")}`;
}

export default function Home() {
  const router = useRouter();
  const [tab, setTab] = useState("dashboard");

  const [applicants, setApplicants] = useState(initialApplicants);
  const [programs, setPrograms] = useState(initialPrograms);
  const [waves, setWaves] = useState(initialWaves);
  const [testSchedules, setTestSchedules] = useState([]);
  const [proofNotes, setProofNotes] = useState({});
  const [notice, setNotice] = useState("");

  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("Semua jenjang");
  const [status, setStatus] = useState("Semua status");

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    level: "SMK",
    program: "PPLG",
    status: "Verifikasi",
    payment: "Belum bayar",
  });

  const [programModal, setProgramModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [programForm, setProgramForm] = useState(emptyProgram);
  const [programQuery, setProgramQuery] = useState("");
  const [programLevel, setProgramLevel] = useState("Semua jenjang");

  const [selectedId, setSelectedId] = useState("CN-270003");
  const [selectedTestId, setSelectedTestId] = useState("CN-270001");

  const [testForm, setTestForm] = useState({
    date: "2027-05-30",
    time: "08:00–10:00 WIB",
    room: "Ruang B",
    type: "Tes utama",
  });

  const [testScores, setTestScores] = useState({
    tpa: "78",
    tps: "80",
    status: "Draf",
    note: "",
  });

  const [selectedWaveId, setSelectedWaveId] = useState(2);
  const [waveForm, setWaveForm] = useState(makeWave(2));
  const [wavePreview, setWavePreview] = useState(false);

  /* STATE AKUN DAN HAK AKSES */

  const [accounts, setAccounts] = useState(initialAccounts);
  const [accountQuery, setAccountQuery] = useState("");
  const [accountRoleFilter, setAccountRoleFilter] = useState("Semua role");
  const [accountStatusFilter, setAccountStatusFilter] = useState("Semua status");
  const [accountModal, setAccountModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [accountForm, setAccountForm] = useState(emptyAccount);

  /* STATE PENGUMUMAN */

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [annSelectedId, setAnnSelectedId] = useState(2);
  const [annEditingId, setAnnEditingId] = useState(2);
  const [annForm, setAnnForm] = useState(() => {
    const { id, updatedAt, ...rest } = initialAnnouncements[1];
    return rest;
  });
  const [annQuery, setAnnQuery] = useState("");
  const [annStatusFilter, setAnnStatusFilter] = useState("Semua status");
  const [annLevelFilter, setAnnLevelFilter] = useState("Semua jenjang");

  // Penyimpanan baru boleh jalan setelah data tersimpan selesai dibaca.
  const [hydrated, setHydrated] = useState(false);

  /* MEMBACA DATA TERSIMPAN */

  useEffect(() => {
    try {
      const savedApplicants = localStorage.getItem("spmb-applicants");
      const savedPrograms = localStorage.getItem("spmb-programs");
      const savedNotes = localStorage.getItem("spmb-proof-notes");
      const savedTests = localStorage.getItem("spmb-test-schedules");
      const savedWaves = localStorage.getItem("spmb-waves");
      const savedAccounts = localStorage.getItem("spmb-accounts");

      if (savedApplicants) setApplicants(JSON.parse(savedApplicants));
      if (savedPrograms) setPrograms(JSON.parse(savedPrograms));
      if (savedNotes) setProofNotes(JSON.parse(savedNotes));
      if (savedTests) setTestSchedules(JSON.parse(savedTests));
      if (savedWaves) setWaves(JSON.parse(savedWaves));

      const savedAnnouncements = localStorage.getItem("spmb-announcements");

      if (savedAnnouncements) {
        const parsedAnnouncements = JSON.parse(savedAnnouncements);

        if (
          Array.isArray(parsedAnnouncements) &&
          parsedAnnouncements.length > 0
        ) {
          setAnnouncements(parsedAnnouncements);
          setAnnSelectedId(parsedAnnouncements[0].id);
          annLoadIntoForm(parsedAnnouncements[0]);
        }
      }

      if (savedAccounts) {
        const parsedAccounts = JSON.parse(savedAccounts);

        // Data lama disesuaikan dengan tiga role terbaru.
        const normalizedAccounts = parsedAccounts
          .filter((account) =>
            ["Administrator", "Kepala Sekolah", "Calon Siswa"].includes(
              account.role
            )
          )
          .map((account) => ({
            ...account,
            permissions: [
              ...(ROLE_PERMISSIONS[account.role] || []),
            ],
          }));

        setAccounts(
          normalizedAccounts.length > 0
            ? normalizedAccounts
            : initialAccounts
        );
      }
    } catch (error) {
      console.error("Gagal membaca data tersimpan:", error);
    }

    setHydrated(true);
  }, []);

  /* MENYIMPAN DATA KE BROWSER */

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-applicants",
        JSON.stringify(applicants)
      );
    } catch {}
  }, [applicants, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-programs",
        JSON.stringify(programs)
      );
    } catch {}
  }, [programs, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-proof-notes",
        JSON.stringify(proofNotes)
      );
    } catch {}
  }, [proofNotes, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-test-schedules",
        JSON.stringify(testSchedules)
      );
    } catch {}
  }, [testSchedules, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-waves",
        JSON.stringify(waves)
      );
    } catch {}
  }, [waves, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-accounts",
        JSON.stringify(accounts)
      );
    } catch {}
  }, [accounts, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        "spmb-announcements",
        JSON.stringify(announcements)
      );
    } catch {}
  }, [announcements, hydrated]);

  /* FILTER DATA PENDAFTAR */

  const filtered = useMemo(
    () =>
      applicants.filter((a) => {
        const matchesQuery =
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.id.toLowerCase().includes(query.toLowerCase());

        const matchesLevel =
          level === "Semua jenjang" || a.level === level;

        let matchesStatus = true;

        if (status !== "Semua status") {
          if (tab === "payments") {
            matchesStatus = a.payment === status;
          } else if (tab === "verify") {
            matchesStatus = proofStatus(a) === status;
          } else if (tab === "tests") {
            matchesStatus =
              (testSchedules.find((t) => t.id === a.id)?.status ||
                "Draf") === status;
          } else {
            matchesStatus = a.status === status;
          }
        }

        return matchesQuery && matchesLevel && matchesStatus;
      }),
    [
      applicants,
      query,
      level,
      status,
      tab,
      proofNotes,
      testSchedules,
    ]
  );

  const filteredPrograms = useMemo(
    () =>
      programs.filter((p) => {
        const matchesQuery =
          p.code.toLowerCase().includes(programQuery.toLowerCase()) ||
          p.name.toLowerCase().includes(programQuery.toLowerCase());

        const matchesLevel =
          programLevel === "Semua jenjang" ||
          p.level === programLevel;

        return matchesQuery && matchesLevel;
      }),
    [programs, programQuery, programLevel]
  );

  const filteredAccounts = useMemo(
    () =>
      accounts.filter((a) => {
        const text = accountQuery.toLowerCase();

        const matchesQuery =
          a.name.toLowerCase().includes(text) ||
          a.email.toLowerCase().includes(text) ||
          a.role.toLowerCase().includes(text);

        const matchesRole =
          accountRoleFilter === "Semua role" ||
          a.role === accountRoleFilter;

        const matchesStatus =
          accountStatusFilter === "Semua status" ||
          a.status === accountStatusFilter;

        return matchesQuery && matchesRole && matchesStatus;
      }),
    [
      accounts,
      accountQuery,
      accountRoleFilter,
      accountStatusFilter,
    ]
  );

  /* STATISTIK */

  const total = applicants.length;

  const accepted = applicants.filter(
    (a) => a.status === "Diterima"
  ).length;

  const process = applicants.filter((a) =>
    ["Verifikasi", "Draft", "Tes terjadwal"].includes(a.status)
  ).length;

  const paid = applicants.filter(
    (a) => a.payment === "Lunas"
  ).length;

  const waitingProofs = applicants.filter(
    (a) => proofStatus(a) === "Menunggu verifikasi"
  ).length;

  const revisionProofs = applicants.filter(
    (a) => proofStatus(a) === "Perlu revisi"
  ).length;

  const selectedApplicant =
    applicants.find((a) => a.id === selectedId) || applicants[0];

  function proofStatus(a) {
    return (
      proofNotes[a.id]?.status ||
      (a.payment === "Lunas"
        ? "Terverifikasi"
        : "Menunggu verifikasi")
    );
  }

  function navClick(key) {
    setTab(key);
    setNotice("");
    setQuery("");
    setLevel("Semua jenjang");
    setStatus("Semua status");
    setWavePreview(false);
  }

  /* DATA PENDAFTAR */

  function openAdd() {
    setEditing(null);
    setForm({
      name: "",
      email: "",
      level: "SMK",
      program: "PPLG",
      status: "Verifikasi",
      payment: "Belum bayar",
    });
    setModal(true);
  }

  function openEdit(a) {
    setEditing(a.id);
    setForm({
      name: a.name,
      email: a.email,
      level: a.level,
      program: a.program === "-" ? "PPLG" : a.program,
      status: a.status,
      payment: a.payment,
    });
    setModal(true);
  }

  function saveApplicant(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      setNotice("Nama pendaftar wajib diisi.");
      return;
    }

    if (editing) {
      setApplicants((old) =>
        old.map((a) =>
          a.id === editing ? { ...a, ...form } : a
        )
      );
      setNotice("Data pendaftar berhasil diperbarui.");
    } else {
      const id = `CN-${String(Date.now()).slice(-6)}`;

      setApplicants((old) => [
        {
          ...form,
          id,
          date: new Date().toLocaleDateString("id-ID"),
          score: 0,
        },
        ...old,
      ]);

      setSelectedId(id);
      setSelectedTestId(id);
      setNotice("Pendaftar baru berhasil ditambahkan.");
    }

    setModal(false);
  }

  function removeApplicant(id) {
    if (!confirm("Yakin ingin menghapus pendaftar ini?")) return;

    setApplicants((old) => old.filter((a) => a.id !== id));
    setTestSchedules((old) => old.filter((t) => t.id !== id));

    setNotice("Data pendaftar dihapus.");
  }

  function changeStatus(id, next) {
    setApplicants((old) =>
      old.map((a) =>
        a.id === id ? { ...a, status: next } : a
      )
    );

    setNotice(`Status pendaftar diubah menjadi ${next}.`);
  }

  /* PEMBAYARAN */

  function updatePayment(id, payment) {
    setApplicants((old) =>
      old.map((a) =>
        a.id === id ? { ...a, payment } : a
      )
    );

    setProofNotes((old) => ({
      ...old,
      [id]: {
        ...old[id],
        status:
          payment === "Lunas"
            ? "Terverifikasi"
            : "Menunggu verifikasi",
      },
    }));

    setNotice(`Status pembayaran diperbarui menjadi ${payment}.`);
  }

  function verifyPayment(id, nextStatus, message) {
    setProofNotes((old) => ({
      ...old,
      [id]: {
        ...old[id],
        status: nextStatus,
      },
    }));

    if (
      nextStatus === "Terverifikasi" ||
      nextStatus === "Perlu revisi"
    ) {
      const payment =
        nextStatus === "Terverifikasi"
          ? "Lunas"
          : "Belum bayar";

      setApplicants((old) =>
        old.map((a) =>
          a.id === id ? { ...a, payment } : a
        )
      );
    }

    setNotice(message);
  }

  function exportCsv() {
    const csv = [
      [
        "No. pendaftaran",
        "Nama",
        "Email",
        "Jenjang",
        "Program",
        "Status",
        "Pembayaran",
      ],
      ...filtered.map((a) => [
        a.id,
        a.name,
        a.email,
        a.level,
        a.program,
        a.status,
        a.payment,
      ]),
    ]
      .map((row) =>
        row
          .map((v) =>
            `"${String(v ?? "").replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\ufeff" + csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "data-pendaftar-spmb.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  /* TES TPA/TPS */

  function selectTest(id) {
    const test = testSchedules.find((t) => t.id === id);

    setSelectedTestId(id);
    setSelectedId(id);

    setTestScores({
      tpa: test?.tpa != null ? String(test.tpa) : "",
      tps: test?.tps != null ? String(test.tps) : "",
      status: test?.status || "Draf",
      note: test?.note || "",
    });

    setTestForm({
      date: test?.date || "2027-05-30",
      time: test?.time || "08:00–10:00 WIB",
      room: test?.room || "Ruang B",
      type: test?.type || "Tes utama",
    });
  }

  function saveTestScores() {
    if (!applicants.some((a) => a.id === selectedTestId)) {
      setNotice("Pilih peserta terlebih dahulu.");
      return;
    }

    const tpa = Number(testScores.tpa);
    const tps = Number(testScores.tps);

    if (
      testScores.tpa === "" ||
      testScores.tps === "" ||
      !Number.isFinite(tpa) ||
      !Number.isFinite(tps) ||
      tpa < 0 ||
      tpa > 100 ||
      tps < 0 ||
      tps > 100
    ) {
      setNotice("Nilai TPA dan TPS harus diisi antara 0 sampai 100.");
      return;
    }

    setApplicants((old) =>
      old.map((a) =>
        a.id === selectedTestId
          ? { ...a, score: Math.round((tpa + tps) / 2) }
          : a
      )
    );

    const updated = {
      id: selectedTestId,
      ...testForm,
      tpa,
      tps,
      status: testScores.status,
      note: testScores.note,
    };

    setTestSchedules((old) =>
      old.some((t) => t.id === selectedTestId)
        ? old.map((t) =>
            t.id === selectedTestId ? updated : t
          )
        : [...old, updated]
    );

    setNotice("Jadwal dan nilai tes berhasil disimpan.");
  }

  function addTestSchedule() {
    if (!selectedTestId) {
      setNotice("Pilih peserta terlebih dahulu.");
      return;
    }

    if (testSchedules.some((t) => t.id === selectedTestId)) {
      setNotice("Peserta ini sudah memiliki jadwal.");
      return;
    }

    setTestSchedules((old) => [
      ...old,
      {
        id: selectedTestId,
        ...testForm,
        tpa: null,
        tps: null,
        status: "Terjadwal",
        note: "",
      },
    ]);

    setTestScores({
      tpa: "",
      tps: "",
      status: "Terjadwal",
      note: "",
    });

    setNotice("Jadwal tes berhasil ditambahkan.");
  }

  /* PROGRAM */

  function openAddProgram() {
    setEditingProgram(null);
    setProgramForm({ ...emptyProgram });
    setProgramModal(true);
  }

  function openEditProgram(program) {
    setEditingProgram(program.id);
    setProgramForm({ ...program });
    setProgramModal(true);
  }

  function saveProgram(e) {
    e.preventDefault();

    const code = programForm.code.trim().toUpperCase();
    const name = programForm.name.trim();

    if (!code || !name) {
      setNotice("Kode dan nama program wajib diisi.");
      return;
    }

    if (
      programs.some(
        (p) =>
          p.code.toLowerCase() === code.toLowerCase() &&
          p.id !== editingProgram
      )
    ) {
      setNotice("Kode program sudah digunakan.");
      return;
    }

    if (editingProgram !== null) {
      setPrograms((old) =>
        old.map((p) =>
          p.id === editingProgram
            ? {
                ...programForm,
                id: editingProgram,
                code,
                name,
              }
            : p
        )
      );

      setNotice("Program berhasil diperbarui.");
    } else {
      setPrograms((old) => [
        ...old,
        {
          ...programForm,
          id: Date.now(),
          code,
          name,
          applicants: 0,
        },
      ]);

      setNotice("Program baru berhasil ditambahkan.");
    }

    setProgramModal(false);
  }

  function deleteProgram(id) {
    const program = programs.find((p) => p.id === id);

    if (
      !program ||
      !confirm(`Yakin ingin menghapus program ${program.code}?`)
    ) {
      return;
    }

    setPrograms((old) => old.filter((p) => p.id !== id));
    setNotice(`Program ${program.code} berhasil dihapus.`);
  }

  /* JADWAL DAN GELOMBANG */

  function selectWave(id) {
    const wave = waves.find((w) => w.id === id);

    if (!wave) return;

    setSelectedWaveId(id);
    setWaveForm({ ...wave });
    setWavePreview(false);
  }

  function openAddWave() {
    const nextId = Math.max(0, ...waves.map((w) => w.id)) + 1;
    const wave = makeWave(nextId);

    setSelectedWaveId(nextId);
    setWaveForm(wave);
    setWavePreview(false);
    setWaves((old) => [...old, wave]);

    setNotice(
      "Gelombang baru dibuat. Lengkapi formulir lalu simpan jadwal."
    );
  }

  function saveWave(e) {
    e.preventDefault();

    if (!waveForm.name.trim()) {
      setNotice("Nama gelombang wajib diisi.");
      return;
    }

    if (
      !waveForm.open ||
      !waveForm.close ||
      !waveForm.test ||
      !waveForm.announcement ||
      !waveForm.reRegister ||
      !waveForm.reRegisterEnd
    ) {
      setNotice("Semua tanggal penerimaan wajib diisi.");
      return;
    }

    if (new Date(waveForm.close) < new Date(waveForm.open)) {
      setNotice("Tanggal penutupan harus setelah tanggal pembukaan.");
      return;
    }

    const updated = {
      ...waveForm,
      id: selectedWaveId,
    };

    setWaves((old) =>
      old.some((w) => w.id === selectedWaveId)
        ? old.map((w) =>
            w.id === selectedWaveId ? updated : w
          )
        : [...old, updated]
    );

    setWaveForm(updated);
    setNotice("Jadwal gelombang berhasil disimpan.");
  }

  function deleteWave(id) {
    const wave = waves.find((w) => w.id === id);

    if (!wave) return;
    if (!confirm(`Yakin ingin menghapus ${wave.name}?`)) return;

    const remaining = waves.filter((w) => w.id !== id);
    setWaves(remaining);

    if (remaining.length) {
      setSelectedWaveId(remaining[0].id);
      setWaveForm({ ...remaining[0] });
    } else {
      const next = makeWave(1);
      setSelectedWaveId(next.id);
      setWaveForm(next);
    }

    setWavePreview(false);
    setNotice(`${wave.name} berhasil dihapus.`);
  }

  function publishWave() {
    const updated = {
      ...waveForm,
      status: "Dipublikasikan",
    };

    setWaveForm(updated);

    setWaves((old) =>
      old.some((w) => w.id === updated.id)
        ? old.map((w) =>
            w.id === updated.id ? updated : w
          )
        : [...old, updated]
    );

    setNotice("Gelombang berhasil dipublikasikan.");
  }

  /* AKUN DAN HAK AKSES */

  function openAddAccount() {
    setEditingAccount(null);
    setAccountForm({
      ...emptyAccount,
      permissions: [...PRINCIPAL_PERMISSIONS],
    });
    setAccountModal(true);
  }

  function openEditAccount(account) {
    setEditingAccount(account.id);

    setAccountForm({
      ...account,
      permissions: [
        ...(account.permissions ||
          ROLE_PERMISSIONS[account.role] ||
          []),
      ],
    });

    setAccountModal(true);
  }

  function changeAccountRole(role) {
    setAccountForm((old) => ({
      ...old,
      role,
      permissions: [...(ROLE_PERMISSIONS[role] || [])],
    }));
  }

  function togglePermission(permissionId) {
    setAccountForm((old) => {
      const permissions = old.permissions || [];

      return {
        ...old,
        permissions: permissions.includes(permissionId)
          ? permissions.filter((p) => p !== permissionId)
          : [...permissions, permissionId],
      };
    });
  }

  function saveAccount(e) {
    e.preventDefault();

    const name = accountForm.name.trim();
    const email = accountForm.email.trim().toLowerCase();

    if (!name || !email) {
      setNotice("Nama dan email akun wajib diisi.");
      return;
    }

    const duplicateEmail = accounts.some(
      (a) =>
        a.email.toLowerCase() === email &&
        a.id !== editingAccount
    );

    if (duplicateEmail) {
      setNotice("Email tersebut sudah digunakan oleh akun lain.");
      return;
    }

    const updatedAccount = {
      ...accountForm,
      name,
      email,
      permissions: [
        ...(ROLE_PERMISSIONS[accountForm.role] || []),
      ],
    };

    if (editingAccount !== null) {
      setAccounts((old) =>
        old.map((a) =>
          a.id === editingAccount
            ? {
                ...updatedAccount,
                id: editingAccount,
              }
            : a
        )
      );

      setNotice("Akun berhasil diperbarui.");
    } else {
      setAccounts((old) => [
        {
          ...updatedAccount,
          id: Date.now(),
        },
        ...old,
      ]);

      setNotice("Akun baru berhasil ditambahkan.");
    }

    setAccountModal(false);
  }

  function deleteAccount(id) {
    const account = accounts.find((a) => a.id === id);

    if (!account) return;

    if (!confirm(`Yakin ingin menghapus akun "${account.name}"?`)) {
      return;
    }

    setAccounts((old) => old.filter((a) => a.id !== id));
    setNotice(`Akun ${account.name} berhasil dihapus.`);
  }

  function toggleAccountStatus(id) {
    setAccounts((old) =>
      old.map((a) => {
        if (a.id !== id) return a;

        return {
          ...a,
          status: a.status === "Aktif" ? "Nonaktif" : "Aktif",
        };
      })
    );

    setNotice("Status akun berhasil diperbarui.");
  }

  function resetAccountFilters() {
    setAccountQuery("");
    setAccountRoleFilter("Semua role");
    setAccountStatusFilter("Semua status");
  }

  /* PENGUMUMAN */

  const filteredAnnouncements = announcements.filter((a) => {
    const text = annQuery.toLowerCase();

    const matchesQuery =
      a.title.toLowerCase().includes(text) ||
      a.body.toLowerCase().includes(text);

    const matchesStatus =
      annStatusFilter === "Semua status" || a.status === annStatusFilter;

    const matchesLevel =
      annLevelFilter === "Semua jenjang" || a.level === annLevelFilter;

    return matchesQuery && matchesStatus && matchesLevel;
  });

  const annPublished = announcements.filter(
    (a) => a.status === "Terbit"
  ).length;

  const annDrafts = announcements.filter(
    (a) => a.status === "Draf"
  ).length;

  const annSelected = announcements.find((a) => a.id === annSelectedId);

  function annLoadIntoForm(a) {
    const { id, updatedAt, ...rest } = a;
    setAnnForm(rest);
    setAnnEditingId(id);
  }

  function annOpenEdit(a) {
    setAnnSelectedId(a.id);
    annLoadIntoForm(a);
    setNotice("");
  }

  function annOpenNew() {
    setAnnEditingId(null);
    setAnnForm({ ...emptyAnnouncement });
    setNotice(
      "Pengumuman baru dibuat. Lengkapi formulir di sebelah kanan."
    );
  }

  function annCancel() {
    if (annEditingId !== null) {
      const current = announcements.find((a) => a.id === annEditingId);

      if (current) {
        annLoadIntoForm(current);
        setNotice("Perubahan dibatalkan.");
        return;
      }
    }

    setAnnForm({ ...emptyAnnouncement });
    setAnnEditingId(null);
    setNotice("Perubahan dibatalkan.");
  }

  function annSave(nextStatus) {
    const title = annForm.title.trim();
    const body = annForm.body.trim();

    if (!title || !body) {
      setNotice("Judul dan isi pengumuman wajib diisi.");
      return;
    }

    const data = {
      ...annForm,
      title,
      body,
      status: nextStatus,
      updatedAt: annNowLabel(),
    };

    if (annEditingId !== null) {
      setAnnouncements((old) =>
        old.map((a) =>
          a.id === annEditingId ? { ...data, id: annEditingId } : a
        )
      );

      setAnnSelectedId(annEditingId);
    } else {
      const id = Date.now();

      setAnnouncements((old) => [{ ...data, id }, ...old]);
      setAnnEditingId(id);
      setAnnSelectedId(id);
    }

    setAnnForm((old) => ({ ...old, status: nextStatus }));

    setNotice(
      nextStatus === "Terbit"
        ? "Pengumuman berhasil diterbitkan."
        : "Draf pengumuman berhasil disimpan."
    );
  }

  function annRemove(a) {
    if (!confirm(`Yakin ingin menghapus pengumuman "${a.title}"?`)) {
      return;
    }

    const remaining = announcements.filter((x) => x.id !== a.id);
    setAnnouncements(remaining);

    if (annSelectedId === a.id) {
      setAnnSelectedId(remaining[0]?.id ?? null);
    }

    if (annEditingId === a.id) {
      if (remaining[0]) {
        annLoadIntoForm(remaining[0]);
      } else {
        setAnnEditingId(null);
        setAnnForm({ ...emptyAnnouncement });
      }
    }

    setNotice(`Pengumuman "${a.title}" berhasil dihapus.`);
  }

  function annAudienceText() {
    const who =
      annForm.audience === "Publik"
        ? "pengunjung portal"
        : annForm.audience.charAt(0).toLowerCase() +
          annForm.audience.slice(1);

    const lvl =
      annForm.level === "Semua jenjang" ? "semua jenjang" : annForm.level;

    return `Hanya ${who} (${lvl}) yang melihat pesan ini. Draf tidak tampil di portal.`;
  }

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      ...(value.includes("T")
        ? {
            hour: "2-digit",
            minute: "2-digit",
          }
        : {}),
    });
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <Link
          className="brand"
          href="/"
          onClick={() => navClick("dashboard")}
        >
          <span className="brand-mark">✧</span>
          <span>
            <b>Citra Negara</b>
            <small>SISTEM PENERIMAAN MURID BARU</small>
          </span>
        </Link>

        <p className="side-label">RUANG ADMINISTRASI</p>

        {navItems.map(([label, icon, key]) => (
          <button
            key={key}
            className={`nav-item ${tab === key ? "active" : ""}`}
            onClick={() => navClick(key)}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}

        <div className="intake-box">
          <b>SPMB 2027/2028</b>
          <p>
            Gelombang 1 · Simulasi. Seluruh data bersifat fiktif.
          </p>
          <button
            onClick={() =>
              setNotice("Portal aktif dalam mode demo.")
            }
          >
            Portal aktif
          </button>
        </div>

        <button
          className="nav-item logout"
          onClick={() => {
            if (confirm("Keluar dari halaman admin?")) {
              router.push(LOGIN_PATH);
            }
          }}
        >
          ↪　Keluar
        </button>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="school-symbol">✧</div>

          <div className="topbrand">
            <b>Citra Negara</b>
            <small>SISTEM PENERIMAAN MURID BARU</small>
          </div>

          <div className="top-spacer" />

          <span className="year">Tahun ajaran 2027/2028</span>
          <span className="avatar">AD</span>

          <button
            className="profile-button"
            onClick={() =>
              setNotice(
                "Masuk sebagai Admin · administrator."
              )
            }
          >
            Admin⌄
          </button>
        </header>

        <div className="content">
          {notice && (
            <div className="notice">
              <span>{notice}</span>
              <button onClick={() => setNotice("")}>×</button>
            </div>
          )}

          {/* DASHBOARD */}

          {tab === "dashboard" && (
            <>
              <div className="breadcrumb">SPMB / Dasbor</div>

              <div className="page-heading">
                <div>
                  <h1>Ringkasan penerimaan</h1>
                  <p>
                    Gelombang 1 · Data simulasi per 28 Mei 2027
                  </p>
                </div>

                <button className="primary" onClick={openAdd}>
                  ＋ Tambah pendaftar
                </button>
              </div>

              <div className="stats-grid">
                <Stat
                  label="Total pendaftar"
                  value={total}
                  foot="SMP · SMA · SMK"
                />
                <Stat
                  label="Dalam proses"
                  value={process}
                  foot="Menunggu verifikasi / seleksi"
                />
                <Stat
                  label="Diterima"
                  value={accepted}
                  foot={`${total ? Math.round((accepted / total) * 100) : 0}% dari seluruh pendaftar`}
                />
                <Stat
                  label="Pembayaran lunas"
                  value={paid}
                  foot="Terverifikasi"
                />
              </div>

              <div className="dashboard-grid">
                <section className="panel">
                  <h3>Pendaftar per jenjang</h3>

                  {["SMP", "SMA", "SMK"].map((l) => {
                    const count = applicants.filter(
                      (a) => a.level === l
                    ).length;

                    return (
                      <div className="level-row" key={l}>
                        <div>
                          <b>{l}</b>
                          <span>{count} pendaftar</span>
                        </div>

                        <div className="progress">
                          <i
                            style={{
                              width: `${total ? (count / total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}

                  <p className="muted tiny">
                    Total {total} pendaftar · data lokal browser
                  </p>
                </section>

                <section className="panel">
                  <h3>Prioritas hari ini</h3>

                  <Priority
                    label="Dokumen perlu ditinjau"
                    count={
                      applicants.filter(
                        (a) => a.status === "Verifikasi"
                      ).length
                    }
                    action="Buka verifikasi"
                    onClick={() => navClick("verify")}
                  />

                  <Priority
                    label="Bukti bayar menunggu"
                    count={waitingProofs}
                    action="Periksa bukti"
                    onClick={() => navClick("verify")}
                  />

                  <Priority
                    label="Nilai tes belum lengkap"
                    count={
                      applicants.filter((a) => a.score === 0).length
                    }
                    action="Input nilai"
                    onClick={() => navClick("tests")}
                  />
                </section>
              </div>

              <section className="panel">
                <h3>Aktivitas terbaru</h3>

                <Table>
                  <thead>
                    <tr>
                      <th>Pendaftar</th>
                      <th>Aktivitas</th>
                      <th>Waktu</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applicants.slice(0, 4).map((a) => (
                      <tr key={a.id}>
                        <td>
                          {a.name} · {a.id}
                        </td>
                        <td>Status pendaftaran: {a.status}</td>
                        <td>{a.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </section>
            </>
          )}

          {/* JADWAL PENERIMAAN */}

          {tab === "schedule" && (
            <>
              <div className="breadcrumb">
                SPMB / Jadwal dan gelombang penerimaan
              </div>

              <div className="page-heading">
                <div>
                  <h1>Jadwal dan gelombang penerimaan</h1>
                  <p>
                    Atur periode pendaftaran, tes, pengumuman, dan
                    daftar ulang untuk setiap gelombang.
                  </p>
                </div>

                <button className="primary" onClick={openAddWave}>
                  ＋ Tambah gelombang
                </button>
              </div>

              <section className="panel">
                <h3>Daftar gelombang</h3>
                <p className="muted tiny">
                  Tahun ajaran 2027/2028 · Semua jadwal ilustratif,
                  zona waktu WIB.
                </p>

                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Gelombang / jenjang</th>
                        <th>Pendaftaran</th>
                        <th>Tes TPA/TPS</th>
                        <th>Pengumuman</th>
                        <th>Daftar ulang</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {waves.map((w) => (
                        <tr key={w.id}>
                          <td>
                            <b>{w.name}</b>
                            <small className="cell-sub">{w.level}</small>
                          </td>
                          <td>
                            {formatDate(w.open)} – {formatDate(w.close)}
                          </td>
                          <td>
                            {formatDate(w.test)}
                            <small className="cell-sub">
                              {w.testTime}
                            </small>
                          </td>
                          <td>{formatDate(w.announcement)}</td>
                          <td>
                            {formatDate(w.reRegister)} –{" "}
                            {formatDate(w.reRegisterEnd)}
                          </td>
                          <td>
                            <StatusPill value={w.status} />
                          </td>
                          <td className="actions">
                            <button onClick={() => selectWave(w.id)}>
                              Lihat
                            </button>
                            <button onClick={() => selectWave(w.id)}>
                              Edit
                            </button>
                            <button
                              className="danger-link"
                              onClick={() => deleteWave(w.id)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}

                      {!waves.length && (
                        <tr>
                          <td colSpan="7" className="empty">
                            Belum ada gelombang penerimaan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <p className="muted tiny">
                  Total {waves.length} gelombang. Pilih Lihat atau Edit
                  untuk mengatur jadwal.
                </p>
              </section>

              {wavePreview ? (
                <section className="panel">
                  <div className="section-heading">
                    <div>
                      <h3>Pratinjau {waveForm.name}</h3>
                      <p className="muted tiny">
                        Pratinjau informasi jadwal penerimaan.
                      </p>
                    </div>

                    <button
                      className="secondary"
                      onClick={() => setWavePreview(false)}
                    >
                      Kembali ke editor
                    </button>
                  </div>

                  <div className="chips">
                    <span>Tahun ajaran {waveForm.year}</span>
                    <span>{waveForm.level}</span>
                    <StatusPill value={waveForm.status} />
                  </div>

                  <div className="schedule-timeline">
                    {[
                      ["Pendaftaran dibuka", waveForm.open],
                      ["Pendaftaran ditutup", waveForm.close],
                      [
                        "Tes TPA/TPS",
                        `${waveForm.test} · ${waveForm.testTime}`,
                      ],
                      ["Pengumuman hasil", waveForm.announcement],
                      ["Daftar ulang dimulai", waveForm.reRegister],
                      [
                        "Daftar ulang ditutup",
                        waveForm.reRegisterEnd,
                      ],
                    ].map(([label, value]) => (
                      <div className="level-row" key={label}>
                        <div>
                          <b>{label}</b>
                          <span>{formatDate(value)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p>
                    {waveForm.note ||
                      "Informasi lebih lanjut dapat diperoleh melalui panitia SPMB."}
                  </p>
                </section>
              ) : (
                <div className="schedule-editor-grid">
                  <form className="panel" onSubmit={saveWave}>
                    <h3>
                      {waves.some((w) => w.id === selectedWaveId)
                        ? `Edit ${waveForm.name}`
                        : "Gelombang baru"}
                    </h3>

                    <p className="muted tiny">
                      Perubahan disimpan di browser ini. Gunakan tombol
                      Simpan jadwal setelah mengubah data.
                    </p>

                    <label>
                      Nama gelombang
                      <input
                        required
                        value={waveForm.name}
                        onChange={(e) =>
                          setWaveForm({
                            ...waveForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Contoh: Gelombang 2"
                      />
                    </label>

                    <div className="form-row">
                      <label>
                        Tahun ajaran
                        <input
                          required
                          value={waveForm.year}
                          onChange={(e) =>
                            setWaveForm({
                              ...waveForm,
                              year: e.target.value,
                            })
                          }
                        />
                      </label>

                      <label>
                        Jenjang
                        <select
                          value={waveForm.level}
                          onChange={(e) =>
                            setWaveForm({
                              ...waveForm,
                              level: e.target.value,
                            })
                          }
                        >
                          <option>SMP / SMA / SMK</option>
                          <option>SMP</option>
                          <option>SMA</option>
                          <option>SMK</option>
                        </select>
                      </label>
                    </div>

                    <div className="form-row">
                      <label>
                        Pendaftaran dibuka
                        <input
                          required
                          type="datetime-local"
                          value={waveForm.open}
                          onChange={(e) =>
                            setWaveForm({
                              ...waveForm,
                              open: e.target.value,
                            })
                          }
                        />
                      </label>

                      <label>
                        Pendaftaran ditutup
                        <input
                          required
                          type="datetime-local"
                          value={waveForm.close}
                          onChange={(e) =>
                            setWaveForm({
                              ...waveForm,
                              close: e.target.value,
                            })
                          }
                        />
                      </label>
                    </div>

                    <div className="form-row">
                      <label>
                        Tanggal tes TPA/TPS
                        <input
                          required
                          type="date"
                          value={waveForm.test}
                          onChange={(e) =>
                            setWaveForm({
                              ...waveForm,
                              test: e.target.value,
                            })
                          }
                        />
                      </label>

                      <label>
                        Jam tes
                        <select
                          value={waveForm.testTime}
                          onChange={(e) =>
                            setWaveForm({
                              ...waveForm,
                              testTime: e.target.value,
                            })
                          }
                        >
                          <option>08:00–10:00 WIB</option>
                          <option>10:00–12:00 WIB</option>
                          <option>13:00–15:00 WIB</option>
                        </select>
                      </label>
                    </div>

                    <label>
                      Pengumuman hasil
                      <input
                        required
                        type="datetime-local"
                        value={waveForm.announcement}
                        onChange={(e) =>
                          setWaveForm({
                            ...waveForm,
                            announcement: e.target.value,
                          })
                        }
                      />
                    </label>

                    <div className="form-row">
                      <label>
                        Daftar ulang dibuka
                        <input
                          required
                          type="datetime-local"
                          value={waveForm.reRegister}
                          onChange={(e) =>
                            setWaveForm({
                              ...waveForm,
                              reRegister: e.target.value,
                            })
                          }
                        />
                      </label>

                      <label>
                        Daftar ulang ditutup
                        <input
                          required
                          type="datetime-local"
                          value={waveForm.reRegisterEnd}
                          onChange={(e) =>
                            setWaveForm({
                              ...waveForm,
                              reRegisterEnd: e.target.value,
                            })
                          }
                        />
                      </label>
                    </div>

                    <label>
                      Status publikasi
                      <select
                        value={waveForm.status}
                        onChange={(e) =>
                          setWaveForm({
                            ...waveForm,
                            status: e.target.value,
                          })
                        }
                      >
                        <option>Draf</option>
                        <option>Aktif</option>
                        <option>Dipublikasikan</option>
                        <option>Ditutup</option>
                      </select>
                    </label>

                    <label>
                      Catatan untuk calon siswa
                      <textarea
                        rows="3"
                        value={waveForm.note}
                        onChange={(e) =>
                          setWaveForm({
                            ...waveForm,
                            note: e.target.value,
                          })
                        }
                        placeholder="Informasi tambahan mengenai jadwal penerimaan..."
                      />
                    </label>

                    <div className="form-row">
                      <button
                        type="button"
                        className="secondary"
                        onClick={() =>
                          selectWave(
                            waves.find(
                              (w) => w.id === selectedWaveId
                            )?.id || selectedWaveId
                          )
                        }
                      >
                        Batal
                      </button>

                      <button
                        type="button"
                        className="secondary"
                        onClick={() => setWavePreview(true)}
                      >
                        Lihat pratinjau
                      </button>
                    </div>

                    <div className="schedule-actions">
                      <button type="submit" className="primary">
                        Simpan jadwal
                      </button>

                      <button
                        type="button"
                        className="primary"
                        onClick={publishWave}
                      >
                        Publikasikan gelombang
                      </button>
                    </div>
                  </form>

                  <div className="schedule-side">
                    <section className="panel">
                      <h3>Urutan jadwal</h3>
                      <ol className="schedule-steps">
                        <li>Pendaftaran dibuka sebelum tes.</li>
                        <li>Tes seleksi sesuai jadwal.</li>
                        <li>
                          Daftar ulang dimulai setelah pengumuman.
                        </li>
                        <li>Periode jangan saling bertabrakan.</li>
                      </ol>
                    </section>

                    <section className="panel notice-soft">
                      <b>✓ Draf belum tampil di publik</b>
                      <p>
                        Periksa kembali tanggal sebelum mengubah status
                        menjadi Aktif atau Dipublikasikan.
                      </p>
                    </section>

                    <section className="panel notice-soft">
                      <b>ⓘ Hapus gelombang</b>
                      <p>
                        Penghapusan gelombang tidak dapat dibatalkan.
                        Periksa nama dan tanggal sebelum menghapus.
                      </p>
                    </section>
                  </div>
                </div>
              )}
            </>
          )}

          {/* JENJANG DAN PROGRAM */}

          {tab === "programs" && (
            <>
              <div className="breadcrumb">
                SPMB / Pengaturan jenjang dan program
              </div>

              <div className="page-heading">
                <div>
                  <h1>Pengaturan jenjang dan program</h1>
                  <p>
                    Kelola pilihan pendidikan dan program keahlian.
                  </p>
                </div>

                <button className="primary" onClick={openAddProgram}>
                  ＋ Tambah program
                </button>
              </div>

              <div className="level-cards">
                {["SMP", "SMA", "SMK"].map((l) => (
                  <section className="level-card" key={l}>
                    <div className="level-card-head">
                      <h3>{l}</h3>
                      <span className="pill green">Aktif</span>
                    </div>

                    <p className="muted">
                      {l === "SMP"
                        ? "Lulusan SD / MI"
                        : "Lulusan SMP / MTs"}
                    </p>

                    <div className="level-card-stat">
                      <span>
                        {
                          applicants.filter((a) => a.level === l)
                            .length
                        }{" "}
                        pendaftar
                      </span>
                      <span>
                        Biaya Rp
                        {PAYMENT_AMOUNT.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <p className="muted tiny">
                      {programs.filter((p) => p.level === l).length}{" "}
                      program terdaftar
                    </p>

                    <button
                      className="text-button"
                      onClick={() => setProgramLevel(l)}
                    >
                      Lihat program →
                    </button>
                  </section>
                ))}
              </div>

              <section className="panel">
                <div className="section-heading">
                  <div>
                    <h3>Daftar program keahlian</h3>
                  </div>

                  <button
                    className="primary"
                    onClick={openAddProgram}
                  >
                    ＋ Tambah program
                  </button>
                </div>

                <div className="filters">
                  <input
                    value={programQuery}
                    onChange={(e) => setProgramQuery(e.target.value)}
                    placeholder="Cari kode atau nama program"
                  />

                  <select
                    value={programLevel}
                    onChange={(e) => setProgramLevel(e.target.value)}
                  >
                    <option>Semua jenjang</option>
                    <option>SMP</option>
                    <option>SMA</option>
                    <option>SMK</option>
                  </select>
                </div>

                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Kode</th>
                        <th>Nama program</th>
                        <th>Pendaftar</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredPrograms.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <b>{p.code}</b>
                          </td>

                          <td>
                            <b>{p.name}</b>
                            <small className="cell-sub">
                              {p.level} · Rp
                              {Number(p.fee).toLocaleString("id-ID")}
                            </small>
                          </td>

                          <td>{p.applicants}</td>

                          <td>
                            <StatusPill value={p.status} />
                          </td>

                          <td className="actions">
                            <button onClick={() => openEditProgram(p)}>
                              Edit
                            </button>
                            <button
                              className="danger-link"
                              onClick={() => deleteProgram(p.id)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}

                      {!filteredPrograms.length && (
                        <tr>
                          <td colSpan="5" className="empty">
                            Tidak ada program yang cocok.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* DATA PENDAFTAR */}

          {tab === "applicants" && (
            <>
              <div className="breadcrumb">SPMB / Data pendaftar</div>

              <div className="page-heading">
                <div>
                  <h1>Data pendaftar</h1>
                  <p>
                    Kelola identitas, status seleksi, dan pembayaran
                    pendaftar.
                  </p>
                </div>

                <button className="primary" onClick={openAdd}>
                  ＋ Tambah pendaftar
                </button>
              </div>

              <div className="chips">
                <span>{total} pendaftar</span>
                <span>{accepted} diterima</span>
                <span>{process} dalam proses</span>
                <span>{total - paid} belum lunas</span>
              </div>

              <section className="panel table-panel">
                <Filters
                  query={query}
                  setQuery={setQuery}
                  level={level}
                  setLevel={setLevel}
                  status={status}
                  setStatus={setStatus}
                  statuses={[
                    "Draft",
                    "Verifikasi",
                    "Tes terjadwal",
                    "Diterima",
                    "Tidak diterima",
                  ]}
                />

                <div className="table-tools">
                  <b>Daftar pendaftar ({filtered.length})</b>
                  <button
                    className="secondary"
                    onClick={exportCsv}
                  >
                    ⇩ Ekspor data
                  </button>
                </div>

                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>No. pendaftaran</th>
                        <th>Nama calon siswa</th>
                        <th>Jenjang / program</th>
                        <th>Status</th>
                        <th>Pembayaran</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((a) => (
                        <tr key={a.id}>
                          <td>{a.id}</td>

                          <td>
                            <b>{a.name}</b>
                            <small className="cell-sub">
                              {a.email}
                            </small>
                          </td>

                          <td>
                            {a.level} · {a.program}
                          </td>

                          <td>
                            <StatusPill value={a.status} />
                          </td>

                          <td>
                            <StatusPill value={a.payment} />
                          </td>

                          <td className="actions">
                            <button onClick={() => openEdit(a)}>
                              Edit
                            </button>

                            <button
                              className="danger-link"
                              onClick={() => removeApplicant(a.id)}
                            >
                              Hapus
                            </button>

                            <select
                              aria-label={`Status ${a.name}`}
                              value={a.status}
                              onChange={(e) =>
                                changeStatus(a.id, e.target.value)
                              }
                            >
                              {[
                                "Draft",
                                "Verifikasi",
                                "Tes terjadwal",
                                "Diterima",
                                "Tidak diterima",
                              ].map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}

                      {!filtered.length && (
                        <tr>
                          <td colSpan="6" className="empty">
                            Tidak ada data yang cocok.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* LAPORAN PEMBAYARAN */}

          {tab === "payments" && (
            <>
              <div className="breadcrumb">
                SPMB / Laporan pembayaran
              </div>

              <div className="page-heading">
                <div>
                  <h1>Laporan pembayaran</h1>
                  <p>Pantau status pembayaran seluruh pendaftar.</p>
                </div>

                <button className="primary" onClick={exportCsv}>
                  ⇩ Ekspor laporan
                </button>
              </div>

              <div className="chips">
                <span>{total} total pendaftar</span>
                <span>{paid} lunas</span>
                <span>{total - paid} belum bayar</span>
                <span>
                  {total ? Math.round((paid / total) * 100) : 0}%
                  sudah lunas
                </span>
              </div>

              <section className="panel table-panel">
                <Filters
                  query={query}
                  setQuery={setQuery}
                  level={level}
                  setLevel={setLevel}
                  status={status}
                  setStatus={setStatus}
                  statuses={["Lunas", "Belum bayar"]}
                />

                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>No. pendaftaran</th>
                        <th>Nama</th>
                        <th>Jenjang / program</th>
                        <th>Tanggal daftar</th>
                        <th>Pembayaran</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((a) => (
                        <tr key={a.id}>
                          <td>{a.id}</td>

                          <td>
                            <b>{a.name}</b>
                            <small className="cell-sub">
                              {a.email}
                            </small>
                          </td>

                          <td>
                            {a.level} · {a.program}
                          </td>

                          <td>{a.date}</td>

                          <td>
                            <StatusPill value={a.payment} />
                          </td>

                          <td className="actions">
                            <button onClick={() => openEdit(a)}>
                              Edit
                            </button>

                            <select
                              value={a.payment}
                              onChange={(e) =>
                                updatePayment(a.id, e.target.value)
                              }
                            >
                              <option>Belum bayar</option>
                              <option>Lunas</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* VERIFIKASI PEMBAYARAN */}

          {tab === "verify" && (
            <>
              <div className="breadcrumb">
                SPMB / Laporan pembayaran / Verifikasi
              </div>

              <div className="page-heading">
                <div>
                  <h1>Verifikasi bukti pembayaran</h1>
                  <p>
                    Periksa bukti transfer sebelum menetapkan
                    pembayaran lunas.
                  </p>
                </div>

                <button
                  className="secondary"
                  onClick={() => navClick("payments")}
                >
                  Kembali ke laporan
                </button>
              </div>

              <div className="chips">
                <span>{waitingProofs} bukti menunggu</span>
                <span>{paid} lunas</span>
                <span>{revisionProofs} perlu revisi</span>
                <span>
                  Total tagihan Rp
                  {(total * PAYMENT_AMOUNT).toLocaleString("id-ID")}
                </span>
              </div>

              <section className="panel table-panel">
                <Filters
                  query={query}
                  setQuery={setQuery}
                  level={level}
                  setLevel={setLevel}
                  status={status}
                  setStatus={setStatus}
                  statuses={[
                    "Menunggu verifikasi",
                    "Terverifikasi",
                    "Perlu revisi",
                  ]}
                />

                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Pendaftar</th>
                        <th>Jenjang</th>
                        <th>Jumlah</th>
                        <th>Tanggal</th>
                        <th>Status bukti</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((a) => (
                        <tr
                          key={a.id}
                          className={
                            selectedId === a.id ? "selected-row" : ""
                          }
                        >
                          <td>
                            <b>{a.name}</b>
                            <small className="cell-sub">
                              {a.id}
                            </small>
                          </td>

                          <td>{a.level}</td>

                          <td>
                            Rp{PAYMENT_AMOUNT.toLocaleString("id-ID")}
                          </td>

                          <td>{a.date}</td>

                          <td>
                            <StatusPill value={proofStatus(a)} />
                          </td>

                          <td>
                            <button onClick={() => setSelectedId(a.id)}>
                              Periksa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {selectedApplicant && (
                <section className="panel verification-panel">
                  <h3>Data & keputusan verifikasi</h3>

                  <p>
                    {selectedApplicant.name} · {selectedApplicant.id}
                  </p>

                  <p>
                    Tagihan: Rp
                    {PAYMENT_AMOUNT.toLocaleString("id-ID")} · Status:{" "}
                    {proofStatus(selectedApplicant)}
                  </p>

                  <label>
                    Catatan verifikasi
                    <textarea
                      rows="3"
                      value={
                        proofNotes[selectedApplicant.id]?.note || ""
                      }
                      onChange={(e) =>
                        setProofNotes((old) => ({
                          ...old,
                          [selectedApplicant.id]: {
                            ...old[selectedApplicant.id],
                            note: e.target.value,
                          },
                        }))
                      }
                      placeholder="Alasan revisi atau catatan pemeriksaan"
                    />
                  </label>

                  <div className="form-row">
                    <button
                      className="secondary"
                      onClick={() =>
                        verifyPayment(
                          selectedApplicant.id,
                          "Perlu revisi",
                          "Bukti pembayaran perlu diperbaiki."
                        )
                      }
                    >
                      Minta revisi
                    </button>

                    <button
                      className="primary"
                      onClick={() =>
                        verifyPayment(
                          selectedApplicant.id,
                          "Terverifikasi",
                          "Pembayaran berhasil diverifikasi."
                        )
                      }
                    >
                      ✓ Terima pembayaran
                    </button>
                  </div>

                  <p className="muted tiny">
                    Pratinjau bukti asli belum tersedia pada demo ini.
                  </p>
                </section>
              )}
            </>
          )}

          {/* TES TPA/TPS */}

          {tab === "tests" && (
            <>
              <div className="breadcrumb">
                SPMB / Kelola tes TPA/TPS
              </div>

              <div className="page-heading">
                <div>
                  <h1>Kelola tes TPA/TPS</h1>
                  <p>
                    Jadwalkan tes dan kelola nilai calon siswa.
                  </p>
                </div>

                <button
                  className="secondary"
                  onClick={exportCsv}
                >
                  ⇩ Ekspor peserta
                </button>
              </div>

              <div className="chips">
                <span>{total} peserta</span>
                <span>{testSchedules.length} jadwal tersimpan</span>
                <span>
                  {
                    applicants.filter((a) => a.score === 0).length
                  }{" "}
                  nilai belum lengkap
                </span>
              </div>

              <section className="panel table-panel">
                <h3>Peserta & hasil tes</h3>

                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Peserta</th>
                        <th>Jenjang</th>
                        <th>Jadwal</th>
                        <th>Status</th>
                        <th>TPA</th>
                        <th>TPS</th>
                        <th>Rerata</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((a) => {
                        const t = testSchedules.find(
                          (x) => x.id === a.id
                        );

                        return (
                          <tr key={a.id}>
                            <td>
                              <b>{a.name}</b>
                              <small className="cell-sub">
                                {a.id}
                              </small>
                            </td>

                            <td>{a.level}</td>
                            <td>{t?.date || "Belum dijadwalkan"}</td>

                            <td>
                              <StatusPill value={t?.status || "Draf"} />
                            </td>

                            <td>{t?.tpa ?? "—"}</td>
                            <td>{t?.tps ?? "—"}</td>

                            <td>
                              {t?.tpa != null && t?.tps != null
                                ? Math.round((t.tpa + t.tps) / 2)
                                : "—"}
                            </td>

                            <td>
                              <button onClick={() => selectTest(a.id)}>
                                Edit nilai
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="dashboard-grid">
                <section className="panel">
                  <h3>Atur jadwal peserta</h3>

                  <label>
                    Peserta
                    <select
                      value={selectedTestId}
                      onChange={(e) => selectTest(e.target.value)}
                    >
                      {applicants.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} - {a.id}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Tanggal tes
                    <input
                      type="date"
                      value={testForm.date}
                      onChange={(e) =>
                        setTestForm({
                          ...testForm,
                          date: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Sesi
                    <select
                      value={testForm.time}
                      onChange={(e) =>
                        setTestForm({
                          ...testForm,
                          time: e.target.value,
                        })
                      }
                    >
                      <option>08:00–10:00 WIB</option>
                      <option>10:00–12:00 WIB</option>
                      <option>13:00–15:00 WIB</option>
                    </select>
                  </label>

                  <label>
                    Ruang
                    <select
                      value={testForm.room}
                      onChange={(e) =>
                        setTestForm({
                          ...testForm,
                          room: e.target.value,
                        })
                      }
                    >
                      {[
                        "Ruang A",
                        "Ruang B",
                        "Ruang C",
                        "Laboratorium Komputer",
                      ].map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Jenis jadwal
                    <select
                      value={testForm.type}
                      onChange={(e) =>
                        setTestForm({
                          ...testForm,
                          type: e.target.value,
                        })
                      }
                    >
                      <option>Tes utama</option>
                      <option>Tes susulan</option>
                      <option>Ujian ulang</option>
                    </select>
                  </label>

                  <button
                    className="secondary"
                    onClick={addTestSchedule}
                  >
                    ＋ Tambah jadwal
                  </button>

                  <button
                    className="primary"
                    onClick={() => {
                      const updated = {
                        id: selectedTestId,
                        ...testForm,
                        tpa: null,
                        tps: null,
                        status: "Terjadwal",
                        note: "",
                      };

                      setTestSchedules((old) =>
                        old.some((t) => t.id === selectedTestId)
                          ? old.map((t) =>
                              t.id === selectedTestId
                                ? { ...t, ...testForm }
                                : t
                            )
                          : [...old, updated]
                      );

                      setNotice("Jadwal berhasil disimpan.");
                    }}
                  >
                    Simpan jadwal
                  </button>
                </section>

                <section className="panel">
                  <h3>Input / edit nilai</h3>

                  <div className="form-row">
                    <label>
                      Nilai TPA
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={testScores.tpa}
                        onChange={(e) =>
                          setTestScores({
                            ...testScores,
                            tpa: e.target.value,
                          })
                        }
                      />
                    </label>

                    <label>
                      Nilai TPS
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={testScores.tps}
                        onChange={(e) =>
                          setTestScores({
                            ...testScores,
                            tps: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <p className="muted">
                    Rata-rata:{" "}
                    {testScores.tpa !== "" &&
                    testScores.tps !== ""
                      ? Math.round(
                          (Number(testScores.tpa) +
                            Number(testScores.tps)) /
                            2
                        )
                      : "—"}{" "}
                    / 100
                  </p>

                  <label>
                    Status nilai
                    <select
                      value={testScores.status}
                      onChange={(e) =>
                        setTestScores({
                          ...testScores,
                          status: e.target.value,
                        })
                      }
                    >
                      <option>Draf</option>
                      <option>Terjadwal</option>
                      <option>Hasil terbit</option>
                    </select>
                  </label>

                  <label>
                    Catatan
                    <textarea
                      rows="3"
                      value={testScores.note}
                      onChange={(e) =>
                        setTestScores({
                          ...testScores,
                          note: e.target.value,
                        })
                      }
                    />
                  </label>

                  <button
                    className="primary"
                    onClick={saveTestScores}
                  >
                    Simpan jadwal dan nilai
                  </button>
                </section>
              </div>
            </>
          )}

          {/* AKUN DAN HAK AKSES */}

          {tab === "accounts" && (
            <>
              <div className="breadcrumb">
                SPMB / Akun dan hak akses
              </div>

              <div className="page-heading">
                <div>
                  <h1>Akun dan hak akses</h1>
                  <p>
                    Kelola tiga jenis akun: Admin, Kepala Sekolah, dan
                    Putri Nadia sebagai calon siswa.
                  </p>
                </div>

                <button
                  className="primary"
                  onClick={openAddAccount}
                >
                  ＋ Tambah akun
                </button>
              </div>

              <div className="stats-grid">
                <Stat
                  label="Total akun"
                  value={accounts.length}
                  foot="Semua akun terdaftar"
                />

                <Stat
                  label="Akun aktif"
                  value={
                    accounts.filter((a) => a.status === "Aktif")
                      .length
                  }
                  foot="Akun berstatus aktif"
                />

                <Stat
                  label="Akun nonaktif"
                  value={
                    accounts.filter((a) => a.status === "Nonaktif")
                      .length
                  }
                  foot="Akun berstatus nonaktif"
                />

                <Stat
                  label="Jenis role"
                  value={new Set(accounts.map((a) => a.role)).size}
                  foot="Admin, Kepala Sekolah, Calon Siswa"
                />
              </div>

              <section className="panel">
                <div className="section-heading">
                  <div>
                    <h3>Daftar akun</h3>
                    <p className="muted tiny">
                      Daftar akun sesuai pembagian peran di sistem SPMB.
                    </p>
                  </div>
                </div>

                <div className="filters">
                  <input
                    value={accountQuery}
                    onChange={(e) => setAccountQuery(e.target.value)}
                    placeholder="Cari nama, email, atau role..."
                  />

                  <select
                    value={accountRoleFilter}
                    onChange={(e) =>
                      setAccountRoleFilter(e.target.value)
                    }
                  >
                    <option>Semua role</option>
                    <option>Administrator</option>
                    <option>Kepala Sekolah</option>
                    <option>Calon Siswa</option>
                  </select>

                  <select
                    value={accountStatusFilter}
                    onChange={(e) =>
                      setAccountStatusFilter(e.target.value)
                    }
                  >
                    <option>Semua status</option>
                    <option>Aktif</option>
                    <option>Nonaktif</option>
                  </select>

                  <button
                    className="secondary"
                    type="button"
                    onClick={resetAccountFilters}
                  >
                    Reset filter
                  </button>
                </div>

                <div className="table-tools">
                  <b>Daftar akun ({filteredAccounts.length})</b>
                </div>

                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Nama akun</th>
                        <th>Role</th>
                        <th>Hak akses</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredAccounts.map((account) => (
                        <tr key={account.id}>
                          <td>
                            <div className="account-identity">
                              <span className="account-avatar">
                                {account.name
                                  .trim()
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>

                              <span>
                                <b>{account.name}</b>
                                <small className="cell-sub">
                                  {account.email}
                                </small>
                              </span>
                            </div>
                          </td>

                          <td>
                            <span className="pill blue">
                              {account.role}
                            </span>
                          </td>

                          <td>
                            <b>
                              {(account.permissions || []).length}
                            </b>
                            <small className="cell-sub">
                              dari {PERMISSION_LIST.length} izin
                            </small>
                          </td>

                          <td>
                            <StatusPill value={account.status} />
                          </td>

                          <td className="actions">
                            <button
                              onClick={() =>
                                openEditAccount(account)
                              }
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                toggleAccountStatus(account.id)
                              }
                            >
                              {account.status === "Aktif"
                                ? "Nonaktifkan"
                                : "Aktifkan"}
                            </button>

                            <button
                              className="danger-link"
                              onClick={() =>
                                deleteAccount(account.id)
                              }
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}

                      {!filteredAccounts.length && (
                        <tr>
                          <td colSpan="5" className="empty">
                            Tidak ada akun yang cocok dengan pencarian.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="dashboard-grid">
                <section className="panel">
                  <h3>Daftar role</h3>

                  <div className="role-info-list">
                    <div className="role-info-item">
                      <span className="role-info-icon">♛</span>
                      <div>
                        <b>Admin</b>
                        <p className="muted tiny">
                          Administrator memiliki akses untuk mengelola
                          seluruh menu, data pendaftar, pembayaran,
                          tes, program, jadwal, dan akun.
                        </p>
                      </div>
                    </div>

                    <div className="role-info-item">
                      <span className="role-info-icon">▤</span>
                      <div>
                        <b>Kepala Sekolah</b>
                        <p className="muted tiny">
                          Dapat melihat dasbor, data pendaftar, laporan
                          pembayaran, hasil tes, jadwal, dan pengumuman.
                        </p>
                      </div>
                    </div>

                    <div className="role-info-item">
                      <span className="role-info-icon">♙</span>
                      <div>
                        <b>Putri Nadia — Calon Siswa</b>
                        <p className="muted tiny">
                          Hak akses calon siswa meliputi informasi
                          pendaftaran miliknya, pembayaran, jadwal tes,
                          hasil seleksi, dan pengumuman.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="panel notice-soft">
                  <h3>Informasi hak akses</h3>

                  <p>
                    Setiap role memiliki daftar izin awal yang berbeda.
                    Admin mengelola sistem, Kepala Sekolah memantau
                    informasi penerimaan, sedangkan Putri Nadia
                    merupakan akun calon siswa.
                  </p>

                  <p className="muted tiny">
                    Catatan: halaman ini masih berupa prototype demo.
                    Data tersimpan di browser menggunakan localStorage.
                    Pengaturan role pada tampilan ini belum menjadi
                    autentikasi atau pembatasan akses server yang
                    sesungguhnya.
                  </p>
                </section>
              </div>
            </>
          )}

          {/* PENGUMUMAN */}

          {tab === "announcements" && (
            <>
              <div className="breadcrumb">SPMB / Kelola pengumuman</div>

              <div className="page-heading">
                <div>
                  <h1>Kelola pengumuman</h1>
                  <p>
                    Siapkan informasi publik dan pesan untuk calon siswa
                    sesuai jenjang.
                  </p>
                </div>

                <button className="primary" onClick={annOpenNew}>
                  ＋ Tambah pengumuman
                </button>
              </div>

              <div className="announce-grid">
                {/* KOLOM KIRI */}

                <div className="announce-left">
                  <section className="panel">
                    <h3>Daftar pengumuman</h3>

                    <p className="muted tiny announce-count">
                      {announcements.length} pengumuman contoh ·{" "}
                      {annPublished} diterbitkan, {annDrafts} draf
                    </p>

                    <label>
                      Cari pengumuman
                      <input
                        value={annQuery}
                        onChange={(e) => setAnnQuery(e.target.value)}
                        placeholder="Judul atau kata kunci"
                      />
                    </label>

                    <div className="form-row">
                      <label>
                        Status
                        <select
                          value={annStatusFilter}
                          onChange={(e) =>
                            setAnnStatusFilter(e.target.value)
                          }
                        >
                          <option>Semua status</option>
                          <option>Terbit</option>
                          <option>Draf</option>
                        </select>
                      </label>

                      <label>
                        Jenjang
                        <select
                          value={annLevelFilter}
                          onChange={(e) =>
                            setAnnLevelFilter(e.target.value)
                          }
                        >
                          {ANN_LEVELS.map((l) => (
                            <option key={l}>{l}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="table-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>Judul / target</th>
                            <th>Status</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredAnnouncements.map((a) => (
                            <tr
                              key={a.id}
                              className={
                                annSelectedId === a.id
                                  ? "selected-row"
                                  : ""
                              }
                            >
                              <td>
                                <b>{a.title}</b>
                                <small className="cell-sub">
                                  {a.level} · {a.audience}
                                </small>
                              </td>

                              <td>
                                <span
                                  className={`pill ${
                                    a.status === "Terbit"
                                      ? "green"
                                      : "amber"
                                  }`}
                                >
                                  {a.status}
                                </span>
                              </td>

                              <td className="actions">
                                <button
                                  onClick={() => setAnnSelectedId(a.id)}
                                >
                                  Detail
                                </button>

                                <button onClick={() => annOpenEdit(a)}>
                                  Edit
                                </button>

                                <button
                                  className="danger-link"
                                  onClick={() => annRemove(a)}
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          ))}

                          {!filteredAnnouncements.length && (
                            <tr>
                              <td colSpan="3" className="empty">
                                Tidak ada pengumuman yang cocok.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="panel">
                    <h3>Detail pengumuman terpilih</h3>

                    {annSelected ? (
                      <>
                        <p className="muted tiny announce-count">
                          Pratinjau isi · Belum terlihat oleh calon siswa
                        </p>

                        <b className="detail-title">
                          {annSelected.title}
                        </b>

                        <p className="detail-body">{annSelected.body}</p>

                        <p className="muted tiny">
                          Diperbarui Admin SPMB · {annSelected.updatedAt}
                        </p>
                      </>
                    ) : (
                      <p className="muted">
                        Belum ada pengumuman yang dipilih.
                      </p>
                    )}
                  </section>

                  <section className="panel notice-soft announce-confirm">
                    <span className="announce-check">✓</span>

                    <div>
                      <b>Hapus memerlukan konfirmasi</b>
                      <p>
                        Pengumuman yang dihapus tidak tampil di portal.
                        Catatan tindakan tetap disimpan dalam audit,
                        periksa target sebelum menerbitkan.
                      </p>
                    </div>
                  </section>
                </div>

                {/* KOLOM KANAN */}

                <form
                  className="panel announce-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    annSave(annForm.status);
                  }}
                >
                  <h3>
                    {annEditingId !== null
                      ? "Edit pengumuman"
                      : "Pengumuman baru"}
                  </h3>

                  <p className="muted tiny announce-count">
                    {annForm.status === "Terbit" ? "Terbit" : "Draf"} ·
                    Perubahan belum disimpan
                  </p>

                  <label>
                    Judul *
                    <input
                      value={annForm.title}
                      onChange={(e) =>
                        setAnnForm({ ...annForm, title: e.target.value })
                      }
                      placeholder="Judul pengumuman"
                    />
                  </label>

                  <label>
                    Isi pengumuman *
                    <textarea
                      rows="4"
                      value={annForm.body}
                      onChange={(e) =>
                        setAnnForm({ ...annForm, body: e.target.value })
                      }
                      placeholder="Tulis isi pengumuman untuk calon siswa"
                    />
                  </label>

                  <label>
                    Target jenjang *
                    <select
                      value={annForm.level}
                      onChange={(e) =>
                        setAnnForm({ ...annForm, level: e.target.value })
                      }
                    >
                      {ANN_LEVELS.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Audiens *
                    <select
                      value={annForm.audience}
                      onChange={(e) =>
                        setAnnForm({
                          ...annForm,
                          audience: e.target.value,
                        })
                      }
                    >
                      {ANN_AUDIENCES.map((a) => (
                        <option key={a}>{a}</option>
                      ))}
                    </select>
                  </label>

                  <p className="muted tiny audience-hint">
                    Pilihan audiens: Publik / Semua calon siswa / Peserta
                    tes terjadwal / Siswa diterima. Target jenjang: Semua /
                    SMP / SMA / SMK.
                  </p>

                  <div className="form-row">
                    <label>
                      Status *
                      <select
                        value={annForm.status}
                        onChange={(e) =>
                          setAnnForm({
                            ...annForm,
                            status: e.target.value,
                          })
                        }
                      >
                        <option>Draf</option>
                        <option>Terbit</option>
                      </select>
                    </label>

                    <label>
                      Tanggal publikasi
                      <input
                        type="datetime-local"
                        value={annForm.publishAt}
                        onChange={(e) =>
                          setAnnForm({
                            ...annForm,
                            publishAt: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <div className="notice-soft announce-target">
                    <span className="announce-check">✓</span>

                    <div>
                      <b>Target publikasi</b>
                      <p>{annAudienceText()}</p>
                      <p className="muted tiny">
                        Jadwal tampil: {formatDate(annForm.publishAt)}
                      </p>
                    </div>
                  </div>

                  <div className="announce-actions">
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => annSave("Draf")}
                    >
                      Simpan draf
                    </button>

                    <button
                      type="button"
                      className="primary"
                      onClick={() => annSave("Terbit")}
                    >
                      Terbitkan
                    </button>

                    <button
                      type="button"
                      className="secondary"
                      onClick={annCancel}
                    >
                      Batal
                    </button>
                  </div>

                  <p className="muted tiny">
                    Terbitkan membuka konfirmasi target dan isi. Jadwal dan
                    isi pengumuman bersifat ilustratif.
                  </p>
                </form>
              </div>
            </>
          )}
        </div>

        <footer>
          © 2027 Sekolah Citra Negara · SPMB SMP / SMA / SMK
          <span>
            Prototype · Data & jadwal ilustratif　 |　 Panduan　 |　
            Privasi
          </span>
        </footer>
      </section>

      {/* MODAL PENDAFTAR */}

      {modal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModal(false);
          }}
        >
          <form className="modal" onSubmit={saveApplicant}>
            <div className="modal-head">
              <div>
                <h2>
                  {editing ? "Edit data pendaftar" : "Tambah pendaftar"}
                </h2>
                <p>Isi atau ubah informasi di bawah ini.</p>
              </div>

              <button
                type="button"
                className="close"
                onClick={() => setModal(false)}
              >
                ×
              </button>
            </div>

            <label>
              Nama lengkap
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Nama calon siswa"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="nama@email.com"
              />
            </label>

            <div className="form-row">
              <label>
                Jenjang
                <select
                  value={form.level}
                  onChange={(e) =>
                    setForm({ ...form, level: e.target.value })
                  }
                >
                  <option>SMP</option>
                  <option>SMA</option>
                  <option>SMK</option>
                </select>
              </label>

              <label>
                Program
                <select
                  value={form.program}
                  onChange={(e) =>
                    setForm({ ...form, program: e.target.value })
                  }
                >
                  {[
                    "PPLG",
                    "TJKT",
                    "MPLB",
                    "DKV",
                    "BDR",
                    "Perhotelan",
                    "-",
                  ].map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-row">
              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  {[
                    "Draft",
                    "Verifikasi",
                    "Tes terjadwal",
                    "Diterima",
                    "Tidak diterima",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>

              <label>
                Pembayaran
                <select
                  value={form.payment}
                  onChange={(e) =>
                    setForm({ ...form, payment: e.target.value })
                  }
                >
                  <option>Belum bayar</option>
                  <option>Lunas</option>
                </select>
              </label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => setModal(false)}
              >
                Batal
              </button>

              <button type="submit" className="primary">
                Simpan data
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL PROGRAM */}

      {programModal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setProgramModal(false);
            }
          }}
        >
          <form className="modal" onSubmit={saveProgram}>
            <div className="modal-head">
              <div>
                <h2>
                  {editingProgram !== null
                    ? "Edit program"
                    : "Tambah program"}
                </h2>
                <p>Atur jenjang dan informasi program.</p>
              </div>

              <button
                type="button"
                className="close"
                onClick={() => setProgramModal(false)}
              >
                ×
              </button>
            </div>

            <div className="form-row">
              <label>
                Jenjang
                <select
                  value={programForm.level}
                  onChange={(e) =>
                    setProgramForm({
                      ...programForm,
                      level: e.target.value,
                    })
                  }
                >
                  <option>SMP</option>
                  <option>SMA</option>
                  <option>SMK</option>
                </select>
              </label>

              <label>
                Kode program
                <input
                  required
                  value={programForm.code}
                  onChange={(e) =>
                    setProgramForm({
                      ...programForm,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="Contoh: PPLG"
                />
              </label>
            </div>

            <label>
              Nama program
              <input
                required
                value={programForm.name}
                onChange={(e) =>
                  setProgramForm({
                    ...programForm,
                    name: e.target.value,
                  })
                }
                placeholder="Nama lengkap program"
              />
            </label>

            <label>
              Deskripsi
              <textarea
                rows="3"
                value={programForm.description}
                onChange={(e) =>
                  setProgramForm({
                    ...programForm,
                    description: e.target.value,
                  })
                }
                placeholder="Deskripsi program keahlian"
              />
            </label>

            <div className="form-row">
              <label>
                Biaya pendaftaran (Rp)
                <input
                  type="number"
                  min="0"
                  value={programForm.fee}
                  onChange={(e) =>
                    setProgramForm({
                      ...programForm,
                      fee: Number(e.target.value),
                    })
                  }
                />
              </label>

              <label>
                Status
                <select
                  value={programForm.status}
                  onChange={(e) =>
                    setProgramForm({
                      ...programForm,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Aktif</option>
                  <option>Nonaktif</option>
                </select>
              </label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => setProgramModal(false)}
              >
                Batal
              </button>

              <button type="submit" className="primary">
                Simpan program
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL TAMBAH / EDIT AKUN */}

      {accountModal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setAccountModal(false);
            }
          }}
        >
          <form
            className="modal account-modal"
            onSubmit={saveAccount}
          >
            <div className="modal-head">
              <div>
                <h2>
                  {editingAccount !== null
                    ? "Edit akun"
                    : "Tambah akun"}
                </h2>
                <p>
                  Isi identitas, role, status, dan izin akses akun.
                </p>
              </div>

              <button
                type="button"
                className="close"
                onClick={() => setAccountModal(false)}
              >
                ×
              </button>
            </div>

            <label>
              Nama lengkap
              <input
                required
                value={accountForm.name}
                onChange={(e) =>
                  setAccountForm({
                    ...accountForm,
                    name: e.target.value,
                  })
                }
                placeholder="Nama akun"
              />
            </label>

            <label>
              Email
              <input
                required
                type="email"
                value={accountForm.email}
                onChange={(e) =>
                  setAccountForm({
                    ...accountForm,
                    email: e.target.value,
                  })
                }
                placeholder="nama@citranegara.sch.id"
              />
            </label>

            <div className="form-row">
              <label>
                Role akun
                <select
                  value={accountForm.role}
                  onChange={(e) =>
                    changeAccountRole(e.target.value)
                  }
                >
                  <option>Administrator</option>
                  <option>Kepala Sekolah</option>
                  <option>Calon Siswa</option>
                </select>
              </label>

              <label>
                Status akun
                <select
                  value={accountForm.status}
                  onChange={(e) =>
                    setAccountForm({
                      ...accountForm,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Aktif</option>
                  <option>Nonaktif</option>
                </select>
              </label>
            </div>

            <div className="permission-editor">
              <div className="permission-editor-head">
                <div>
                  <h3>Hak akses menu</h3>
                  <p className="muted tiny">
                    Hak akses mengikuti role yang dipilih.
                  </p>
                </div>

                <span className="pill green">
                  {(accountForm.permissions || []).length} dipilih
                </span>
              </div>

              <div className="permission-list">
                {PERMISSION_LIST.filter((permission) =>
                  (ROLE_PERMISSIONS[accountForm.role] || []).includes(
                    permission.id
                  )
                ).map((permission) => (
                  <label
                    className="permission-option"
                    key={permission.id}
                  >
                    <input
                      type="checkbox"
                      checked={(
                        accountForm.permissions || []
                      ).includes(permission.id)}
                      onChange={() =>
                        togglePermission(permission.id)
                      }
                    />

                    <span>{permission.label}</span>
                  </label>
                ))}
              </div>

              <p className="muted tiny">
                Daftar izin menyesuaikan role. Hak akses calon siswa
                ditujukan untuk data miliknya sendiri.
              </p>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => setAccountModal(false)}
              >
                Batal
              </button>

              <button type="submit" className="primary">
                Simpan akun
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

/* KOMPONEN BANTUAN */

function Table({ children }) {
  return (
    <div className="table-scroll">
      <table>{children}</table>
    </div>
  );
}

function Stat({ label, value, foot }) {
  return (
    <section className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{foot}</small>
    </section>
  );
}

function Priority({ label, count, action, onClick }) {
  return (
    <div className="priority-row">
      <span>{label}</span>
      <b>{count}</b>
      <button onClick={onClick}>{action} →</button>
    </div>
  );
}

function StatusPill({ value }) {
  const cls = [
    "Diterima",
    "Lunas",
    "Aktif",
    "Terverifikasi",
    "Hasil terbit",
    "Dipublikasikan",
  ].includes(value)
    ? "green"
    : [
        "Tidak diterima",
        "Perlu revisi",
        "Ditutup",
        "Nonaktif",
      ].includes(value)
      ? "red"
      : ["Draft", "Draf", "Belum bayar"].includes(value)
        ? "amber"
        : "blue";

  return <span className={`pill ${cls}`}>{value}</span>;
}

function Filters({
  query,
  setQuery,
  level,
  setLevel,
  status,
  setStatus,
  statuses,
}) {
  return (
    <div className="filters">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nama atau nomor pendaftaran"
      />

      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option>Semua jenjang</option>
        <option>SMP</option>
        <option>SMA</option>
        <option>SMK</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Semua status</option>
        {statuses.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}