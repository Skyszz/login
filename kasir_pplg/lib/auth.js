import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const key = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function createSession(u) {
  const t = await new SignJWT({ id: u.id, nama: u.nama, role: u.role })
    .setProtectedHeader({ alg: "HS256" }).setExpirationTime("8h").sign(key);
  (await cookies()).set("session", t, { httpOnly: true, path: "/" });
}
export async function getSession() {
  const t = (await cookies()).get("session")?.value;
  if (!t) return null;
  try { return (await jwtVerify(t, key)).payload; } catch { return null; }
}
export async function requireRole(...roles) {
  const s = await getSession();
  if (!s) redirect("/login");
  if (roles.length && !roles.includes(s.role)) redirect("/dashboard");
  return s;
}
export const rp = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");
