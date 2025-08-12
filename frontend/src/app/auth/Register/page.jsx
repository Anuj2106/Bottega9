"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;


export default function RegisterPage() {
  // Theme
  const [darkTheme, setDarkTheme] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const user_name = form.user_name.value.trim();
    const user_email = form.user_email.value.trim();
    const user_pass = form.user_pass.value;
    const confirm_pass = form.confirm_pass.value;

    if (!user_name || !user_email || !user_pass || !confirm_pass) {
      alert("All fields are required.");
      return;
    }
    if (user_pass !== confirm_pass) {
      alert("Passwords do not match.");
      return;
    }

    try {
     const res = await axios.post(`${apiUrl}/api/register`, {
  user_name,
  user_email,
  user_pass,
});


      if (res.data.success) {
        alert("Registration successful! You can now log in.");
        form.reset();
        window.location.href = "/auth/Login";
      } else {
        alert(res.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className={darkTheme ? "bg-dark text-light" : "bg-light text-dark"}
      style={{ minHeight: "100vh" }}
    >
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div
          className="row w-100 shadow-lg rounded overflow-hidden"
          style={{ maxWidth: "900px", background: darkTheme ? "#1e1e2f" : "#fff" }}
        >
          {/* Image Column */}
          <div className="col-md-6 d-none d-md-block p-0">
            <img
              src="/register-image.jpg" // ✅ Change to your own image
              alt="Register"
              className="img-fluid h-100 w-100"
              style={{
                objectFit: "cover",
                borderTopLeftRadius: "0.375rem",
                borderBottomLeftRadius: "0.375rem",
                filter: darkTheme ? "brightness(0.8)" : "none",
              }}
            />
          </div>

          {/* Form Column */}
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center p-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold">Create Your Account</h3>
            </div>

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="user_name" className="form-label fw-semibold">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  className={`form-control ${darkTheme ? "bg-secondary text-light border-0" : ""}`}
                  id="user_name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="user_email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  className={`form-control ${darkTheme ? "bg-secondary text-light border-0" : ""}`}
                  id="user_email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="user_pass" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  name="user_pass"
                  className={`form-control ${darkTheme ? "bg-secondary text-light border-0" : ""}`}
                  id="user_pass"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirm_pass" className="form-label fw-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_pass"
                  className={`form-control ${darkTheme ? "bg-secondary text-light border-0" : ""}`}
                  id="confirm_pass"
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn w-100 fw-bold ${darkTheme ? "btn-primary" : "btn-dark"}`}
                style={{ fontSize: "1.1rem" }}
              >
                Register
              </button>
            </form>

            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link
                href="/auth/Login"
                className={`text-decoration-none ${darkTheme ? "text-info" : "text-primary"}`}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
