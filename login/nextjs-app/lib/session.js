import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "ganti-secret-ini";
export const SESSION_COOKIE_NAME = "session";

export function createSessionCookie(user) {
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    SECRET,
    { expiresIn: "7d" }
  );

  return {
    name: SESSION_COOKIE_NAME,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    },
  };
}

export function getSessionUser() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
