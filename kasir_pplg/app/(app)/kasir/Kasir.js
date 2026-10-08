"use client";
import { useState } from "react";
import { bayar } from "@/app/actions/data";
const rp = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");

export default function Kasir({ products, members }) {
  const [cart, setCart] = useState([]);
  const [kode, setKode] = useState("");
  const [member, setMember] = useState("");
  const [uang, setUang] = useState("");
  const [msg, setMsg] = useState(null);
  const total = cart.reduce((a, c) => a + c.harga * c.qty, 0);

  const add = (p) => setCart((c) => c.find((i) => i.id === p.id)
    ? c.map((i) => (i.id === p.id ? { ...i, qty: Math.min(i.qty + 1, p.stok) } : i))
    : [...c, { ...p, qty: 1 }]);
  const setQty = (id, q) => setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(+q || 1, i.stok)) } : i)));
  const del = (id) => setCart((c) => c.filter((i) => i.id !== id));

  function scan(e) {
    e.preventDefault();
    const p = products.find((p) => p.kode === kode.trim());
    if (p) { add(p); setMsg(null); } else setMsg({ error: "Kode barang tidak ditemukan" });
    setKode("");
  }
  async function submit() {
    const r = await bayar({ items: cart.map((c) => ({ id: c.id, qty: c.qty })), memberId: member, uang: +uang });
    setMsg(r);
    if (r.ok) { setCart([]); setUang(""); }
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <div className="card">
        <h3>Scan / Pilih Barang</h3>
        <form onSubmit={scan}>
          <input autoFocus value={kode} onChange={(e) => setKode(e.target.value)} placeholder="Scan kode barang lalu Enter" />
        </form>
        {products.map((p) => (
          <div key={p.id}><button onClick={() => add(p)} style={{ margin: 3 }}>+</button> {p.nama} — {rp(p.harga)} (stok {p.stok})</div>
        ))}
      </div>
      <div className="card">
        <h3>Keranjang</h3>
        <table><tbody>
          {cart.map((c) => (
            <tr key={c.id}>
              <td>{c.nama}</td>
              <td><input type="number" value={c.qty} onChange={(e) => setQty(c.id, e.target.value)} style={{ width: 60 }} /></td>
              <td>{rp(c.harga * c.qty)}</td>
              <td><button className="red" onClick={() => del(c.id)}>x</button></td>
            </tr>
          ))}
        </tbody></table>
        <h2>Total: {rp(total)}</h2>
        <select value={member} onChange={(e) => setMember(e.target.value)}>
          <option value="">Bukan member</option>
          {members.map((m) => <option key={m.id} value={m.id}>{m.nama}</option>)}
        </select><br />
        <input type="number" value={uang} onChange={(e) => setUang(e.target.value)} placeholder="Uang dibayar" />
        <button onClick={submit} disabled={!cart.length}>Payment</button>
        {msg?.error && <p className="err">{msg.error}</p>}
        {msg?.ok && <p className="ok">Berhasil! {msg.kode} — Kembalian {rp(msg.kembali)}</p>}
      </div>
    </div>
  );
}
