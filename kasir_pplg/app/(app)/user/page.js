import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { tambahUser } from "@/app/actions/data";
export default async function User() {
  await requireRole("admin");
  const [rows] = await db.query("SELECT id,nama,username,role FROM users");
  return (
    <>
      <form action={tambahUser} className="card">
        <h3>Registrasi User</h3>
        <input name="nama" placeholder="Nama" required />
        <input name="username" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <select name="role"><option value="petugas">Petugas</option><option value="admin">Admin</option></select>
        <button>Daftarkan</button>
      </form>
      <div className="card">
        <table>
          <thead><tr><th>Nama</th><th>Username</th><th>Role</th></tr></thead>
          <tbody>{rows.map((u) => <tr key={u.id}><td>{u.nama}</td><td>{u.username}</td><td>{u.role}</td></tr>)}</tbody>
        </table>
      </div>
    </>
  );
}
