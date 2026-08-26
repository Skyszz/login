import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();

  const fullname = (body.fullname || "").trim();
  const email = (body.email || "").trim();
  const password = (body.password || "").trim();

  if (!fullname || !email || !password) {
    return NextResponse.json(
      { success: false, message: "Data dari form tidak lengkap." },
      { status: 400 }
    );
  }

  const pool = getPool();

  const [existing] = await pool.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existing.length > 0) {
    return NextResponse.json(
      { success: false, message: "Email sudah terdaftar. Silakan gunakan email lain." },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [fullname, email, hashed]
  );

  return NextResponse.json({ success: true });
}
