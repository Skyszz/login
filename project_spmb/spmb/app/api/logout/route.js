import { NextResponse } from "next/server";

export async function GET(request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.headers.append(
    "Set-Cookie",
    "spmb_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0"
  );
  return response;
}