"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // "login" | "signup"

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/biodata");
      } else {
        setLoginError(data.message || "Username atau password salah.");
      }
    } catch {
      setLoginError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setSignupError("");
    setSignupSuccess("");
    setSignupLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (data.success) {
        setSignupSuccess("Akun berhasil dibuat. Silakan login.");
        setSignupData({ fullname: "", email: "", password: "" });
        setTimeout(() => setMode("login"), 1200);
      } else {
        setSignupError(data.message || "Pendaftaran gagal.");
      }
    } catch {
      setSignupError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setSignupLoading(false);
    }
  }

  return (
    <>
      <div className="page-bg">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`container ${mode === "signup" ? "signup-mode" : ""}`}>
        <div className="animated-bg">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* LOGIN */}
        <div className="form-container login-form">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>

            <input
              type="text"
              placeholder="Username"
              required
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            {loginError && <p className="form-error">{loginError}</p>}

            <button type="submit" disabled={loginLoading}>
              {loginLoading ? "MEMPROSES..." : "LOGIN"}
            </button>

            <p>
              Belum punya akun?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMode("signup");
                }}
              >
                SIGN UP
              </a>
            </p>
          </form>
        </div>

        {/* SIGN UP */}
        <div className="form-container signup-form">
          <form onSubmit={handleSignup}>
            <h1>Sign Up</h1>

            <input
              type="text"
              placeholder="Full Name"
              required
              value={signupData.fullname}
              onChange={(e) =>
                setSignupData({ ...signupData, fullname: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />

            {signupError && <p className="form-error">{signupError}</p>}
            {signupSuccess && <p className="form-success">{signupSuccess}</p>}

            <button type="submit" disabled={signupLoading}>
              {signupLoading ? "MEMPROSES..." : "SIGN UP"}
            </button>

            <p>
              Sudah punya akun?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMode("login");
                }}
              >
                LOGIN
              </a>
            </p>
          </form>
        </div>

        {/* PANEL GESER */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back</h1>
              <p>Login untuk melanjutkan.</p>
              <button
                type="button"
                className="ghost"
                onClick={() => setMode("login")}
              >
                LOGIN
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello There</h1>
              <p>Belum punya akun?</p>
              <button
                type="button"
                className="ghost"
                onClick={() => setMode("signup")}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
