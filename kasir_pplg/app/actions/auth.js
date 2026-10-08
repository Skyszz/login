"use server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function login(prev, fd) {
  const [r] = await db.query("SELECT * FROM users WHERE username=?", [fd.get("username")]);
  const u = r[0];
  if (!u || !(await bcrypt.compare(fd.get("password"), u.password)))
    return { error: "Username atau password salah" };
  await createSession(u);
  redirect("/dashboard");
}
export async function logout() {
  (await cookies()).delete("session");
  redirect("/login");
}
