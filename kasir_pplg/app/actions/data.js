"use server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";

export async function tambahProduk(fd) {
  await requireRole("admin");
  await db.query("INSERT INTO products (kode,nama,harga,stok,kategori) VALUES (?,?,?,?,?)",
    [fd.get("kode"), fd.get("nama"), +fd.get("harga"), +fd.get("stok"), fd.get("kategori")]);
  revalidatePath("/produk");
}
export async function updateStok(fd) {
  await requireRole("admin");
  await db.query("UPDATE products SET stok=? WHERE id=?", [+fd.get("stok"), +fd.get("id")]);
  revalidatePath("/produk");
}
export async function tambahMember(fd) {
  await requireRole();
  await db.query("INSERT INTO members (nama,telp,email,alamat) VALUES (?,?,?,?)",
    [fd.get("nama"), fd.get("telp"), fd.get("email"), fd.get("alamat")]);
  revalidatePath("/member");
}
export async function tambahUser(fd) {
  await requireRole("admin");
  await db.query("INSERT INTO users (nama,username,password,role) VALUES (?,?,?,?)",
    [fd.get("nama"), fd.get("username"), await bcrypt.hash(fd.get("password"), 10), fd.get("role")]);
  revalidatePath("/user");
}
export async function bayar({ items, memberId, uang }) {
  const s = await requireRole();
  if (!items.length) return { error: "Keranjang kosong" };
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    let total = 0; const rows = [];
    for (const it of items) {
      const [[p]] = await conn.query("SELECT * FROM products WHERE id=? FOR UPDATE", [it.id]);
      if (!p || p.stok < it.qty) throw new Error(`Stok ${p?.nama ?? "barang"} tidak cukup`);
      total += p.harga * it.qty; rows.push([p, it.qty]);
    }
    if (uang < total) throw new Error("Uang bayar kurang");
    const kode = "TRX" + Date.now();
    const [r] = await conn.query(
      "INSERT INTO transaksi (kode,user_id,member_id,total,bayar,kembali) VALUES (?,?,?,?,?,?)",
      [kode, s.id, memberId || null, total, uang, uang - total]);
    for (const [p, q] of rows) {
      await conn.query("INSERT INTO transaksi_detail (transaksi_id,product_id,qty,harga,subtotal) VALUES (?,?,?,?,?)",
        [r.insertId, p.id, q, p.harga, p.harga * q]);
      await conn.query("UPDATE products SET stok=stok-? WHERE id=?", [q, p.id]);
    }
    await conn.commit();
    revalidatePath("/produk");
    return { ok: true, kode, total, kembali: uang - total };
  } catch (e) { await conn.rollback(); return { error: e.message }; }
  finally { conn.release(); }
}
