"use client";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
export default function Login() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <main style={{ maxWidth: 360 }}>
      <form action={action} className="card">
        <h2>Login Kasir</h2>
        <input name="username" placeholder="Username" required /><br />
        <input name="password" type="password" placeholder="Password" required /><br />
        {state?.error && <p className="err">{state.error}</p>}
        <button disabled={pending}>{pending ? "Masuk..." : "Login"}</button>
      </form>
    </main>
  );
}
