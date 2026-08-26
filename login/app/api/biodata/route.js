import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { getSessionUser, createSessionCookie } from "@/lib/session";

export async function PUT(request) {
  const session = getSessionUser();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Kamu belum login." },
      { status: 401 }
    );
  }

  const body = await request.json();

  const username = (body.username || "").trim();
  const email = (body.email || "").trim();
  const no_hp = (body.no_hp || "").trim();
  const alamat = (body.alamat || "").trim();

  if (!username || !email) {
    return NextResponse.json(
      { success: false, message: "Nama dan email tidak boleh kosong." },
      { status: 400 }
    );
  }

  const pool = getPool();

  // Cek email sudah dipakai user lain apa belum
  const [existing] = await pool.query(
    "SELECT id FROM users WHERE email = ? AND id != ?",
    [email, session.id]
  );

  if (existing.length > 0) {
    return NextResponse.json(
      { success: false, message: "Email sudah dipakai akun lain." },
      { status: 409 }
    );
  }

  await pool.query(
    "UPDATE users SET username = ?, email = ?, no_hp = ?, alamat = ? WHERE id = ?",
    [username, email, no_hp || null, alamat || null, session.id]
  );

  // Update session cookie karena username/email bisa berubah
  const cookie = createSessionCookie({
    id: session.id,
    username,
    email,
  });

  const response = NextResponse.json({
    success: true,
    user: { username, email, no_hp, alamat },
  });

  response.cookies.set(cookie.name, cookie.value, cookie.options);

  return response;
}
