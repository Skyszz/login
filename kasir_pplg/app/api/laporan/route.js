import * as XLSX from "xlsx";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
export async function GET() {
  if (!(await getSession())) return new Response("Unauthorized", { status: 401 });
  const [rows] = await db.query(`SELECT t.kode Kode, t.created_at Tanggal, u.nama Petugas,
    COALESCE(m.nama,'-') Member, t.total Total FROM transaksi t
    JOIN users u ON u.id=t.user_id LEFT JOIN members m ON m.id=t.member_id ORDER BY t.id DESC`);
  const ws = XLSX.utils.json_to_sheet(rows.map((r) => ({ ...r, Tanggal: new Date(r.Tanggal).toLocaleString("id-ID") })));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Laporan");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  return new Response(buf, { headers: {
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": 'attachment; filename="laporan.xlsx"' } });
}
