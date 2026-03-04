import { useMemo, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ROLE_TO_LABEL = {
  DONOR: "Donor",
  PARTNER: "Delivery Partner",
  RECEIVER: "Receiver",
  ADMIN: "Admin",
};

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("DONOR");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  const roleLabel = useMemo(() => ROLE_TO_LABEL[role] || role, [role]);

  function pickRole(nextRole) {
    setErr("");
    setOk("");
    setRole(nextRole);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");

    const cleanEmail = String(email || "").trim();
    const cleanPass = String(password || "");

    if (!cleanEmail) return setErr("Email is required.");
    if (!cleanPass) return setErr("Password is required.");
    if (cleanPass.length < 6) return setErr("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: cleanPass, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Registration failed");

      setOk("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 800);
    } catch (ex) {
      setErr(ex?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reg-wrap">
      <div className="reg-bg" />
      <div className="reg-card">
        <div className="reg-brand">
          <div className="reg-badge">SLF</div>
          <div className="reg-brandtext">
            <div className="reg-title">Create your account</div>
            <div className="reg-sub">Join the SecondLife Foods ecosystem</div>
          </div>
        </div>

        <div className="reg-roles">
          {Object.keys(ROLE_TO_LABEL).map((r) => (
            <button
              key={r}
              type="button"
              className={role === r ? "reg-role active" : "reg-role"}
              onClick={() => pickRole(r)}
              disabled={loading}
              title={ROLE_TO_LABEL[r]}
            >
              {ROLE_TO_LABEL[r]}
            </button>
          ))}
        </div>

        {err ? <div className="reg-alert error">{err}</div> : null}
        {ok ? <div className="reg-alert success">{ok}</div> : null}

        <form onSubmit={handleSubmit} className="reg-form">
          <div className="reg-field">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@slf.com"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="reg-field">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              type="password"
              autoComplete="new-password"
              disabled={loading}
            />
            <div className="reg-hint">Minimum 6 characters.</div>
          </div>

          <button className="reg-btn" type="submit" disabled={loading}>
            {loading ? "Creating account..." : `Register as ${roleLabel}`}
          </button>

          <div className="reg-foot">
            Already have an account?{" "}
            <button
              type="button"
              className="reg-link"
              onClick={() => navigate("/login")}
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>

        <div className="reg-note">
          By continuing, you agree to platform safety rules and responsible lot handling.
        </div>
      </div>
    </div>
  );
}