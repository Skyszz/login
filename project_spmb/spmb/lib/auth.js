import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession(token) {
  const secret = process.env.SESSION_SECRET;

  if (!token || !secret || secret.length < 32) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { algorithms: ["HS256"] }
    );
    return payload;
  } catch {
    return null;
  }
}

const dashboardPerRole = {
  calon_siswa: "/dashboard/calon-siswa",
  admin: "/dashboard/admin",
  kepsek: "/dashboard/kepsek",
};

// Dipanggil di setiap halaman dashboard.
export async function requireRole(role) {
  const cookieStore = await cookies();
  const token = cookieStore.get("spmb_session")?.value;
  const session = await getSession(token);

  if (!session) {
    redirect("/login");
  }

  if (session.role !== role) {
    redirect(dashboardPerRole[session.role] || "/login");
  }

  return session;
}