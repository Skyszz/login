"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BiodataView({ initialUser }) {
  const router = useRouter();

  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    username: initialUser.username || "",
    email: initialUser.email || "",
    no_hp: initialUser.no_hp || "",
    alamat: initialUser.alamat || "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function startEdit() {
    setForm({
      username: user.username || "",
      email: user.email || "",
      no_hp: user.no_hp || "",
      alamat: user.alamat || "",
    });
    setError("");
    setSuccess("");
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    setError("");
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/biodata", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        setEditing(false);
        setSuccess("Biodata berhasil diperbarui.");
        router.refresh();
      } else {
        setError(data.message || "Gagal menyimpan biodata.");
      }
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="biodata-page">
      <div className="biodata-card">
        <div className="avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>

        <h1>Selamat datang, {user.username}</h1>

        {success && !editing && <p className="form-success">{success}</p>}

        {!editing ? (
          <>
            <div className="biodata-list">
              <div className="row">
                <span className="label">Nama</span>
                <span className="value">{user.username}</span>
              </div>

              <div className="row">
                <span className="label">Email</span>
                <span className="value">{user.email}</span>
              </div>

              <div className="row">
                <span className="label">No. HP</span>
                <span className="value">{user.no_hp || "-"}</span>
              </div>

              <div className="row">
                <span className="label">Alamat</span>
                <span className="value">{user.alamat || "-"}</span>
              </div>
            </div>

            <button
              type="button"
              className="logout-button"
              onClick={startEdit}
            >
              EDIT BIODATA
            </button>

            <form action="/api/logout" method="POST" style={{ marginTop: 12 }}>
              <button type="submit" className="ghost-button">
                LOGOUT
              </button>
            </form>
          </>
        ) : (
          <form onSubmit={handleSave} className="biodata-form">
            <label>Nama</label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <label>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label>No. HP</label>
            <input
              type="text"
              placeholder="Opsional"
              value={form.no_hp}
              onChange={(e) => setForm({ ...form, no_hp: e.target.value })}
            />

            <label>Alamat</label>
            <input
              type="text"
              placeholder="Opsional"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            />

            {error && <p className="form-error">{error}</p>}

            <div className="biodata-form-actions">
              <button type="submit" className="logout-button" disabled={loading}>
                {loading ? "MENYIMPAN..." : "SIMPAN"}
              </button>

              <button
                type="button"
                className="ghost-button"
                onClick={cancelEdit}
                disabled={loading}
              >
                BATAL
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
