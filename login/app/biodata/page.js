import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { getPool } from "@/lib/db";
import BiodataView from "./BiodataView";

export default async function BiodataPage() {
  const session = getSessionUser();

  if (!session) {
    redirect("/");
  }

  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT username, email, no_hp, alamat FROM users WHERE id = ?",
    [session.id]
  );

  const user = rows[0];

  if (!user) {
    redirect("/");
  }

  return <BiodataView initialUser={user} />;
}
