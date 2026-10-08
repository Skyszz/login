import { db } from "@/lib/db";
import { requireRole, rp } from "@/lib/auth";
import { tambahProduk, updateStok } from "@/app/actions/data";
export default async function Produk() {
  const s = await requireRole();
  const admin = s.role === "admin";
  const [rows] = await db.query("SELECT * FROM products ORDER BY nama");
  return (
    <>
      {admin && (
        <form action={tambahProduk} className="card">
          <h3>Tambah Barang</h3>
          <input name="kode" placeholder="Kode/Barcode" required />
          <input name="nama" placeholder="Nama barang" required />
          <input name="harga" type="number" placeholder="Harga" required />
          <input name="stok" type="number" placeholder="Stok" required />
          <input name="kategori" placeholder="Tipe/Kategori" />
          <button>Simpan</button>
        </form>
      )}
      <div className="card">
        <h3>Data Barang</h3>
        <table>
          <thead><tr><th>Kode</th><th>Nama</th><th>Kategori</th><th>Harga</th><th>Stok</th></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{p.kode}</td><td>{p.nama}</td><td>{p.kategori}</td><td>{rp(p.harga)}</td>
                <td>{admin ? (
                  <form action={updateStok}>
                    <input type="hidden" name="id" value={p.id} />
                    <input name="stok" type="number" defaultValue={p.stok} style={{ width: 80 }} />
                    <button>Update</button>
                  </form>) : p.stok}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
