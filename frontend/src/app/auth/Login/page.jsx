"use client";
import { useState } from "react";
import { useAuth } from "../../Context/auth/authContext";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser } = useAuth();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div
          className={`row w-100 rounded shadow-lg overflow-hidden`}
          style={{ maxWidth: "900px" }}
        >
          {/* Image column */}
          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src="/login-image.jpg"
              alt="Login illustration"
              className="img-fluid h-100 w-100"
              style={{
                objectFit: "cover",
                borderTopLeftRadius: "0.375rem",
                borderBottomLeftRadius: "0.375rem",
               
              }}
            />
          </div>

          {/* Form column */}
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center p-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold">Login to Bootega9</h3>
            </div>

            <form onSubmit={handleLogin} noValidate>
              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <p className="text-danger text-center mb-3" style={{ fontWeight: "600" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn w-100 fw-bold btn-dark"
                style={{ letterSpacing: "0.05em", fontSize: "1.1rem" }}
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center" style={{ fontWeight: "500" }}>
              Don’t have an account?{" "}
              <Link href="/auth/Register" className="text-decoration-none text-primary">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
