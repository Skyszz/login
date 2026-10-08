import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { tambahMember } from "@/app/actions/data";
export default async function Member() {
  await requireRole();
  const [rows] = await db.query("SELECT * FROM members ORDER BY id DESC");
  return (
    <>
      <form action={tambahMember} className="card">
        <h3>Tambah Member</h3>
        <input name="nama" placeholder="Nama" required />
        <input name="telp" placeholder="No. telp" />
        <input name="email" placeholder="Email" />
        <input name="alamat" placeholder="Alamat" />
        <button>Simpan</button>
      </form>
      <div className="card">
        <table>
          <thead><tr><th>ID</th><th>Nama</th><th>Telp</th><th>Email</th><th>Alamat</th></tr></thead>
          <tbody>{rows.map((m) => <tr key={m.id}><td>{m.id}</td><td>{m.nama}</td><td>{m.telp}</td><td>{m.email}</td><td>{m.alamat}</td></tr>)}</tbody>
        </table>
      </div>
    </>
  );
}
