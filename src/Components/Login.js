import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const ROLE_TO_LABEL = {
  ADMIN: "Admin",
  DONOR: "Donor",
  PARTNER: "Delivery Partner",
  RECEIVER: "Receiver",
};

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("DONOR");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const roleLabel = ROLE_TO_LABEL[role] || role;

  function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setErr("Email is required.");
      return;
    }

    if (!password) {
      setErr("Password is required.");
      return;
    }

    // ✅ Fake user object (frontend only)
    const user = {
      email: cleanEmail,
      role: role,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", "demo-token");

    // ✅ Role based redirect
    if (role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else if (role === "DONOR") {
      navigate("/dash", { replace: true });
    } else if (role === "PARTNER") {
      navigate("/partner", { replace: true });
    } else if (role === "RECEIVER") {
      navigate("/receiver", { replace: true });
    } else {
      navigate("/home", { replace: true });
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
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">
            Sign in as {roleLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
