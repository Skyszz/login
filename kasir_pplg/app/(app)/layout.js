import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { logout } from "@/app/actions/auth";
export default async function AppLayout({ children }) {
  const s = await requireRole();
  return (
    <>
      <nav>
        <b>Kasir</b>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/kasir">Transaksi</Link>
        <Link href="/produk">Barang</Link>
        <Link href="/member">Member</Link>
        <Link href="/laporan">Laporan</Link>
        {s.role === "admin" && <Link href="/user">Registrasi User</Link>}
        <span className="sp" />
        <span>{s.nama} ({s.role})</span>
        <form action={logout}><button className="red">Logout</button></form>
      </nav>
      <main>{children}</main>
    </>
  );
}
