import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { getPool } from "@/lib/db";

export default async function BiodataPage() {
  const session = getSessionUser();

  if (!session) {
    redirect("/");
  }

  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT username, email FROM users WHERE id = ?",
    [session.id]
  );

  const user = rows[0];

  if (!user) {
    redirect("/");
  }

  return (
    <div className="biodata-page">
      <div className="biodata-card">
        <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>

        <h1>Selamat datang, {user.username}</h1>

        <div className="biodata-list">
          <div className="row">
            <span className="label">Nama</span>
            <span className="value">{user.username}</span>
          </div>

          <div className="row">
            <span className="label">Email</span>
            <span className="value">{user.email}</span>
          </div>
        </div>

        <form action="/api/logout" method="POST">
          <button type="submit" className="logout-button">
            LOGOUT
          </button>
        </form>
      </div>
    </div>
  );
}
