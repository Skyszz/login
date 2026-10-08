import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import Kasir from "./Kasir";
export default async function Page() {
  await requireRole();
  const [products] = await db.query("SELECT id,kode,nama,harga,stok FROM products WHERE stok>0 ORDER BY nama");
  const [members] = await db.query("SELECT id,nama FROM members ORDER BY nama");
  return <Kasir products={products} members={members} />;
}
