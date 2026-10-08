import { db } from "@/lib/db";
import { requireRole, rp } from "@/lib/auth";
import PrintButton from "./PrintButton";
export default async function Laporan() {
  await requireRole();
  const [rows] = await db.query(`SELECT t.*, u.nama petugas, m.nama member FROM transaksi t
    JOIN users u ON u.id=t.user_id LEFT JOIN members m ON m.id=t.member_id ORDER BY t.id DESC LIMIT 200`);
  const sum = rows.reduce((a, r) => a + r.total, 0);
  return (
    <div className="card">
      <h3>Laporan Transaksi</h3>
      <div className="noprint" style={{ marginBottom: 12 }}>
        <a className="btn" href="/api/laporan">Download Excel</a> <PrintButton />
      </div>
      <table>
        <thead><tr><th>Kode</th><th>Tanggal</th><th>Petugas</th><th>Member</th><th>Total</th></tr></thead>
        <tbody>{rows.map((r) => (
          <tr key={r.id}><td>{r.kode}</td><td>{new Date(r.created_at).toLocaleString("id-ID")}</td>
            <td>{r.petugas}</td><td>{r.member ?? "-"}</td><td>{rp(r.total)}</td></tr>))}</tbody>
      </table>
      <h3>Total pendapatan: {rp(sum)}</h3>
    </div>
  );
}
