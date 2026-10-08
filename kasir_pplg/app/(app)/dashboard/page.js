import { db } from "@/lib/db";
import { requireRole, rp } from "@/lib/auth";
export default async function Dashboard() {
  await requireRole();
  const [[a]] = await db.query("SELECT COUNT(*) n FROM products");
  const [[b]] = await db.query("SELECT COUNT(*) n FROM products WHERE stok<=10");
  const [[c]] = await db.query("SELECT COUNT(*) n, COALESCE(SUM(total),0) t FROM transaksi WHERE DATE(created_at)=CURDATE()");
  return (
    <div className="grid">
      <div className="card"><div>Jenis barang</div><div className="big">{a.n}</div></div>
      <div className="card"><div>Stok menipis (≤10)</div><div className="big">{b.n}</div></div>
      <div className="card"><div>Transaksi hari ini ({c.n})</div><div className="big">{rp(c.t)}</div></div>
    </div>
  );
}
