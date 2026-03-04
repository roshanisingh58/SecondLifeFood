import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const ROLE_TO_LABEL = {
  ADMIN: "Admin",
  DONOR: "Donor",
  PARTNER: "Delivery Partner",
  RECEIVER: "Receiver",
};

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("DONOR");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const roleLabel = ROLE_TO_LABEL[role] || role;

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const cleanEmail = email.trim();

    if (!cleanEmail) return setErr("Email is required.");
    if (!password) return setErr("Password is required.");

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Invalid credentials.");
      }

      // ✅ Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Role-based redirect (FINAL)
      const r = data?.user?.role;

      if (r === "ADMIN") {
        navigate("/admin", { replace: true });
      } else if (r === "DONOR") {
        navigate("/dash", { replace: true });
      } else if (r === "PARTNER") {
        navigate("/partner", { replace: true });
      } else if (r === "RECEIVER") {
        navigate("/receiver", { replace: true });
      } else {
        // fallback
        navigate("/home", { replace: true });
      }
    } catch (ex) {
      setErr(ex?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2>Login</h2>

        {err && <div className="error">{err}</div>}

        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              {Object.keys(ROLE_TO_LABEL).map((r) => (
                <option key={r} value={r}>
                  {ROLE_TO_LABEL[r]}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : `Sign in as ${roleLabel}`}
          </button>
        </form>
      </div>
    </div>
  );
}