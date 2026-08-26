import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool } from "@/lib/db";
import { createSessionCookie } from "@/lib/session";

export async function POST(request) {
  const body = await request.json();

  const username = (body.username || "").trim();
  const password = (body.password || "").trim();

  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: "Data dari form tidak lengkap." },
      { status: 400 }
    );
  }

  const pool = getPool();

  const [rows] = await pool.query(
    "SELECT id, username, email, password FROM users WHERE username = ?",
    [username]
  );

  const user = rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { success: false, message: "Username atau password salah." },
      { status: 401 }
    );
  }

  const cookie = createSessionCookie(user);

  const response = NextResponse.json({ success: true });
  response.cookies.set(cookie.name, cookie.value, cookie.options);

  return response;
}
