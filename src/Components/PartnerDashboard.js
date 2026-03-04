import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PartnerDashboard.css";

/* ─── DATA ─── */
const INITIAL_ASSIGNED = [
  { id: "JOB-44021", lotId: "LOT-12031", pickup: "Donor Hub A",    drop: "Shelter 12",      city: "Mumbai", status: "Assigned",   eta: "Today 3:00 PM",     updated: "Just now"  },
  { id: "JOB-44007", lotId: "LOT-12018", pickup: "Warehouse B",    drop: "Feed Producer 3", city: "Mumbai", status: "Assigned",   eta: "Tomorrow 10:00 AM", updated: "Today"     },
  { id: "JOB-44003", lotId: "LOT-12005", pickup: "Retail Chain D", drop: "Shelter 22",      city: "Pune",   status: "Assigned",   eta: "Today 6:00 PM",     updated: "2 hrs ago" },
];
const INITIAL_IN_TRANSIT = [
  { id: "JOB-43980", lotId: "LOT-11880", pickup: "Retail Chain D", drop: "Shelter 8", city: "Mumbai", status: "In Transit", eta: "2 hrs", updated: "Today" },
];
const INITIAL_COMPLETED = [
  { id: "JOB-43810", lotId: "LOT-11612", pickup: "Store X",     drop: "Shelter 4", city: "Mumbai", status: "Delivered", eta: "-", updated: "Last week"  },
  { id: "JOB-43750", lotId: "LOT-11502", pickup: "Donor Hub B", drop: "Shelter 9", city: "Mumbai", status: "Delivered", eta: "-", updated: "2 days ago" },
];

const STEPS = [
  {
    id: 0, step: "01", label: "New Order",
    title: "Job assigned to you",
    desc: "The moment a new food lot needs moving, you get an instant notification with full details — pickup location, drop address, lot contents, and your delivery window. One tap to accept, and you're on your way.",
  },
  {
    id: 1, step: "02", label: "En Route",
    title: "Navigate to destination",
    desc: "Live turn-by-turn guidance gets you from pickup to drop without a hitch. Your progress is tracked in real time so shelter staff know exactly when to expect you — no calls needed.",
  },
  {
    id: 2, step: "03", label: "Delivered",
    title: "Confirm and earn",
    desc: "At drop-off, scan the QR code on the lot to confirm receipt. Your delivery is logged instantly, the shelter gets notified, and your earnings are credited — all before you pull away.",
  },
];

/* ─── SVG ICONS (no emojis anywhere) ─── */
const IcDrop = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M12 2C8.5 6.5 5 10.5 5 14a7 7 0 0014 0C19 10.5 15.5 6.5 12 2z"/>
  </svg>
);
const IcMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IcX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IcTruck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IcPackage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IcCheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IcMoney = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 010 4H8"/>
    <line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/>
  </svg>
);
const IcSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IcPin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IcFlag = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);
const IcClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IcRefresh = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
  </svg>
);
const IcCity = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IcQR = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/>
    <rect x="3" y="16" width="5" height="5"/>
    <line x1="14" y1="9" x2="14" y2="9"/><line x1="19" y1="9" x2="19" y2="9"/>
    <line x1="14" y1="14" x2="21" y2="14"/><line x1="14" y1="19" x2="14" y2="19"/>
    <line x1="19" y1="19" x2="21" y2="19"/>
  </svg>
);
const IcArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IcCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IcMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IcPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 011 1.22 2 2 0 013 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IcLocation = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IcFb = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);
const IcTw = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);
const IcLi = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

/* ─── PHONE SCREEN CONTENTS ─── */
function ScreenAssigned() {
  return (
    <div className="psc">
      <div className="psc-bar">
        <span className="psc-time">9:41</span>
        <div className="psc-bar-right">
          <span className="psc-signal"><b/><b/><b/><b/></span>
          <span className="psc-battery"/>
        </div>
      </div>
      <div className="psc-notif">
        <div className="psc-notif-led"/>
        <div className="psc-notif-body">
          <div className="psc-notif-title">New job assigned</div>
          <div className="psc-notif-sub">JOB-44021 · Donor Hub A</div>
        </div>
        <span className="psc-notif-time">Now</span>
      </div>
      <div className="psc-card">
        <div className="psc-card-head">
          <div>
            <div className="psc-jid">JOB-44021</div>
            <div className="psc-lid">LOT-12031</div>
          </div>
          <span className="psc-chip psc-chip-assigned">Assigned</span>
        </div>
        <div className="psc-route">
          <div className="psc-rnode">
            <div className="psc-rdot psc-rdot-green"/>
            <div><div className="psc-rl">Pickup</div><div className="psc-rv">Donor Hub A</div></div>
          </div>
          <div className="psc-rdash"/>
          <div className="psc-rnode">
            <div className="psc-rdot psc-rdot-orange"/>
            <div><div className="psc-rl">Drop</div><div className="psc-rv">Shelter 12</div></div>
          </div>
        </div>
        <div className="psc-tags">
          <span className="psc-tag">Mumbai</span>
          <span className="psc-tag">3:00 PM</span>
          <span className="psc-tag">3 boxes</span>
        </div>
      </div>
      <div className="psc-actions">
        <button className="psc-btn psc-btn-ghost">Decline</button>
        <button className="psc-btn psc-btn-solid">Accept Job</button>
      </div>
    </div>
  );
}

function ScreenEnRoute() {
  return (
    <div className="psc">
      <div className="psc-bar">
        <span className="psc-time">9:41</span>
        <div className="psc-bar-right">
          <span className="psc-signal"><b/><b/><b/><b/></span>
          <span className="psc-battery"/>
        </div>
      </div>
      <div className="psc-map">
        <div className="psc-map-bg"/>
        <svg className="psc-map-svg" viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Road grid */}
          <line x1="0" y1="70" x2="200" y2="70" stroke="#d4d4d4" strokeWidth="8"/>
          <line x1="100" y1="0" x2="100" y2="110" stroke="#d4d4d4" strokeWidth="8"/>
          {/* Dashed route */}
          <path d="M 30 70 Q 60 40 100 55 Q 140 68 165 30" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" opacity="0.9"/>
          {/* Pins */}
          <circle cx="30" cy="70" r="6" fill="#27AE60"/>
          <circle cx="30" cy="70" r="3" fill="white"/>
          <circle cx="165" cy="30" r="6" fill="#F4821A"/>
          <circle cx="165" cy="30" r="3" fill="white"/>
          {/* Truck icon rough */}
          <rect x="88" y="49" width="16" height="10" rx="1.5" fill="#1b4332"/>
          <rect x="96" y="51" width="8" height="8" rx="1" fill="#1b4332"/>
          <circle cx="91" cy="60" r="2" fill="#52B788"/>
          <circle cx="101" cy="60" r="2" fill="#52B788"/>
        </svg>
        <div className="psc-eta-badge">ETA: <strong>2 hrs</strong></div>
      </div>
      <div className="psc-transit-body">
        <div className="psc-transit-title">JOB-43980 · In Transit</div>
        <div className="psc-prog-wrap">
          <div className="psc-prog-bar"><div className="psc-prog-fill" style={{width:"55%"}}/></div>
          <span className="psc-prog-label">55%</span>
        </div>
        <div className="psc-transit-route">
          <span>Retail Chain D</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#52B788" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
          <span>Shelter 8</span>
        </div>
      </div>
    </div>
  );
}

function ScreenDelivered() {
  return (
    <div className="psc psc-delivered">
      <div className="psc-bar psc-bar-dark">
        <span className="psc-time">9:41</span>
        <div className="psc-bar-right">
          <span className="psc-signal psc-signal-dark"><b/><b/><b/><b/></span>
          <span className="psc-battery psc-battery-dark"/>
        </div>
      </div>
      <div className="psc-done-hero">
        <div className="psc-check-ring">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div className="psc-done-label">Delivered</div>
        <div className="psc-done-sub">Confirmed by recipient</div>
      </div>
      <div className="psc-summary">
        {[
          { l: "Job",          v: "JOB-43810"          },
          { l: "Delivered to", v: "Shelter 4, Mumbai"  },
          { l: "Contents",     v: "4 boxes · food lot" },
          { l: "Earned",       v: "+₹420", green: true },
        ].map(r => (
          <div key={r.l} className="psc-sum-row">
            <span className="psc-sum-l">{r.l}</span>
            <span className={`psc-sum-v${r.green ? " psc-earn" : ""}`}>{r.v}</span>
          </div>
        ))}
      </div>
      <button className="psc-btn psc-btn-solid psc-next-btn">Next Job</button>
    </div>
  );
}

const SCREENS = [ScreenAssigned, ScreenEnRoute, ScreenDelivered];

/* ─── MAIN ─── */
export default function PartnerDashboard() {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); }
    catch { return {}; }
  }, []);
  const token = localStorage.getItem("token");

  const [tab,          setTab]          = useState("assigned");
  const [query,        setQuery]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [err,          setErr]          = useState("");
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activePhone,  setActivePhone]  = useState(0);
  const [emailVal,     setEmailVal]     = useState("");

  const [assigned,  setAssigned]  = useState(INITIAL_ASSIGNED);
  const [inTransit, setInTransit] = useState(INITIAL_IN_TRANSIT);
  const [completed, setCompleted] = useState(INITIAL_COMPLETED);
  const earnings = { today: "₹840", week: "₹5,240" };

  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, [token, navigate]);

  const stats = useMemo(() => ({
    assigned:  assigned.length,
    inTransit: inTransit.length,
    completed: completed.length,
  }), [assigned, inTransit, completed]);

  const list = useMemo(() => {
    const src = tab === "assigned" ? assigned : tab === "intransit" ? inTransit : completed;
    const q = query.trim().toLowerCase();
    if (!q) return src;
    return src.filter(x => [x.id, x.lotId, x.pickup, x.drop, x.city, x.status].some(v => String(v).toLowerCase().includes(q)));
  }, [tab, assigned, inTransit, completed, query]);

  function logout() {
    localStorage.removeItem("token"); localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }
  async function startJob(jobId) {
    setErr(""); setLoading(true);
    try {
      const job = assigned.find(x => x.id === jobId); if (!job) return;
      setAssigned(p => p.filter(x => x.id !== jobId));
      setInTransit(p => [{ ...job, status: "In Transit", updated: "Just now" }, ...p]);
      setTab("intransit");
    } catch { setErr("Could not start job."); } finally { setLoading(false); }
  }
  async function markDelivered(jobId) {
    setErr(""); setLoading(true);
    try {
      const job = inTransit.find(x => x.id === jobId); if (!job) return;
      setInTransit(p => p.filter(x => x.id !== jobId));
      setCompleted(p => [{ ...job, status: "Delivered", updated: "Just now", eta: "-" }, ...p]);
      setTab("completed");
    } catch { setErr("Could not mark delivered."); } finally { setLoading(false); }
  }

  const STATUS_META = {
    "Assigned":   { cls: "chip-assigned", label: "Assigned"   },
    "In Transit": { cls: "chip-transit",  label: "In Transit" },
    "Delivered":  { cls: "chip-done",     label: "Delivered"  },
  };

  const ActiveScreen = SCREENS[activePhone];

  return (
    <div className="pd-page">

      {/* ═══ NAVBAR ═══ */}
      <header className="pd-navbar">
        <div className="pd-nav-inner">
          <button className="pd-brand" onClick={() => navigate("/home")}>
            <span className="pd-brand-logo"><IcDrop color="white" size={18}/></span>
            <span className="pd-brand-name">SecondLife <strong>Foods</strong></span>
          </button>

          <nav className="pd-nav-links">
            {[
              { l: "Home",             p: "/home"       },
              { l: "Donor Dashboard",  p: "/donor"      },
              { l: "Create Lot",       p: "/create-lot" },
              { l: "QR Scanner",       p: "/qr"         },
              { l: "Admin Panel",      p: "/admin"      },
              { l: "Testing Screen",   p: "/testing"    },
            ].map(({ l, p }) => (
              <button key={l} className={`pd-nav-link${l === "Home" ? " pd-nav-active" : ""}`} onClick={() => navigate(p)}>{l}</button>
            ))}
          </nav>

          <div className="pd-nav-right">
            <button className="pd-avatar" onClick={logout} title="Logout">
              {(user?.email || "P").charAt(0).toUpperCase()}
            </button>
            <button className="pd-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              {menuOpen ? <IcX /> : <IcMenu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="pd-mobile-nav">
            {["Home","Donor Dashboard","Create Lot","QR Scanner","Admin Panel","Testing Screen"].map(l => (
              <button key={l} className="pd-mobile-link" onClick={() => setMenuOpen(false)}>{l}</button>
            ))}
          </div>
        )}
      </header>

      <main className="pd-body">

        {/* ═══ PHONE HERO SECTION ═══ */}
        <section className="pd-hero-section">
          <div className="pd-hero-left">
            <div className="pd-hero-eyebrow">How it works</div>
            <h2 className="pd-hero-title">{STEPS[activePhone].title}</h2>
            <p className="pd-hero-desc">{STEPS[activePhone].desc}</p>

            <div className="pd-step-tabs">
              {STEPS.map(s => (
                <button
                  key={s.id}
                  className={`pd-step-btn${activePhone === s.id ? " pd-step-active" : ""}`}
                  onClick={() => setActivePhone(s.id)}
                >
                  <span className="pd-step-num">{s.step}</span>
                  <span className="pd-step-lbl">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pd-phones-row">
            {STEPS.map(s => {
              const Scr = SCREENS[s.id];
              const isActive = activePhone === s.id;
              return (
                <div
                  key={s.id}
                  className={`pd-phone${isActive ? " pd-phone-active" : ""}`}
                  onClick={() => setActivePhone(s.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Step ${s.step}: ${s.label}`}
                  onKeyDown={e => e.key === "Enter" && setActivePhone(s.id)}
                >
                  <div className="pd-phone-frame">
                    <div className="pd-phone-notch"/>
                    <div className="pd-phone-screen">
                      <Scr />
                    </div>
                    <div className="pd-phone-chin"/>
                  </div>
                  <div className="pd-phone-label">
                    <span className={`pd-phone-badge${isActive ? " pb-active" : ""}`}>{s.step}</span>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ STATS ROW ═══ */}
        <div className="pd-stats">
          {[
            { icon: <IcPackage/>,    label: "Assigned",     value: stats.assigned,  sub: "pending pickup",  accent: "o", key: "assigned"  },
            { icon: <IcTruck/>,      label: "In Transit",   value: stats.inTransit, sub: "on the way",      accent: "b", key: "intransit" },
            { icon: <IcCheckCircle/>,label: "Delivered",    value: stats.completed, sub: "completed today", accent: "g", key: "completed" },
            { icon: <IcMoney/>,      label: "Today's Pay",  value: earnings.today,  sub: "+₹140 bonus",     accent: "r", key: null        },
          ].map(c => (
            <div
              key={c.label}
              className={`pd-stat pd-stat-${c.accent}${tab === c.key ? " pd-stat-on" : ""}`}
              onClick={() => c.key && setTab(c.key)}
              style={{ cursor: c.key ? "pointer" : "default" }}
            >
              <div className={`pd-stat-ico ico-${c.accent}`}>{c.icon}</div>
              <div className="pd-stat-lbl">{c.label}</div>
              <div className={`pd-stat-val sval-${c.accent}`}>{c.value}</div>
              <div className="pd-stat-sub">{c.sub}</div>
              <div className={`pd-stat-glow sglow-${c.accent}`}/>
            </div>
          ))}
        </div>

        {/* ═══ MAIN GRID ═══ */}
        <div className="pd-grid">

          {/* Jobs Panel */}
          <div className="pd-panel">
            <div className="pd-panel-head">
              <h3 className="pd-panel-title">Active Jobs</h3>
            </div>

            <div className="pd-tabs">
              {[
                { key: "assigned",  label: "Assigned",  count: stats.assigned  },
                { key: "intransit", label: "In Transit", count: stats.inTransit },
                { key: "completed", label: "Completed",  count: stats.completed },
              ].map(t => (
                <button key={t.key} className={`pd-tab${tab === t.key ? " pd-tab-on" : ""}`} onClick={() => setTab(t.key)}>
                  {t.label} <span className="pd-tab-count">{t.count}</span>
                </button>
              ))}
            </div>

            <label className="pd-search">
              <IcSearch />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by Job ID, Lot, Pickup, Drop…"
              />
            </label>

            {err     && <div className="pd-alert pd-alert-err">{err}</div>}
            {loading && <div className="pd-alert pd-alert-inf">Processing…</div>}

            <div className="pd-job-list">
              {list.length === 0 && (
                <div className="pd-empty">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  <span>No jobs match this filter.</span>
                </div>
              )}
              {list.map(job => {
                const sm = STATUS_META[job.status] || STATUS_META["Assigned"];
                return (
                  <article className="pd-job" key={job.id}>
                    <div className="pd-job-top">
                      <div className="pd-job-ids">
                        <span className="pd-jid">{job.id}</span>
                        <span className="pd-lid">{job.lotId}</span>
                      </div>
                      <span className={`pd-chip ${sm.cls}`}>
                        <span className="pd-chip-dot"/>
                        {sm.label}
                      </span>
                    </div>

                    <div className="pd-job-route">
                      <div className="pd-route-end">
                        <span className="pd-route-ico pd-ico-green"><IcPin /></span>
                        <div>
                          <div className="pd-rl">Pickup</div>
                          <div className="pd-rv">{job.pickup}</div>
                        </div>
                      </div>
                      <div className="pd-route-mid">
                        <div className="pd-route-line-seg"/>
                        <span className="pd-route-arrow"><IcArrow /></span>
                        <div className="pd-route-line-seg"/>
                      </div>
                      <div className="pd-route-end">
                        <span className="pd-route-ico pd-ico-orange"><IcFlag /></span>
                        <div>
                          <div className="pd-rl">Drop</div>
                          <div className="pd-rv">{job.drop}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pd-job-meta">
                      <span className="pd-meta-item"><IcCity /> {job.city}</span>
                      <span className="pd-meta-item"><IcClock /> {job.eta}</span>
                      <span className="pd-meta-item"><IcRefresh /> {job.updated}</span>
                    </div>

                    <div className="pd-job-btns">
                      <button className="pd-btn" onClick={() => navigate(`/lot/${encodeURIComponent(job.lotId)}`)}>View Lot</button>
                      <button className="pd-btn pd-btn-b" onClick={() => navigate("/track")}><IcPin /> Track</button>
                      <button className="pd-btn" onClick={() => navigate("/qr")}><IcQR /> QR</button>
                      {tab === "assigned" && (
                        <button className="pd-btn pd-btn-primary" onClick={() => startJob(job.id)} disabled={loading}>
                          <IcTruck /> Start Pickup
                        </button>
                      )}
                      {tab === "intransit" && (
                        <button className="pd-btn pd-btn-primary" onClick={() => markDelivered(job.id)} disabled={loading}>
                          <IcCheck /> Mark Delivered
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Side panel */}
          <aside className="pd-side">
            <div className="pd-side-card">
              <div className="pd-side-title">Quick Actions</div>
              {[
                { icon: <IcQR/>,      label: "QR Scan",    hint: "Verify custody at pickup or drop", path: "/qr",    bg: "rgba(0,180,110,.10)" },
                { icon: <IcPin/>,     label: "Track Lot",  hint: "Real-time movement view",          path: "/track", bg: "rgba(59,125,216,.11)" },
                { icon: <IcPackage/>, label: "My Jobs",    hint: "View all assigned tasks",          path: null,     bg: "rgba(244,130,26,.11)" },
              ].map(qa => (
                <button key={qa.label} className="pd-quick" onClick={() => qa.path ? navigate(qa.path) : setTab("assigned")}>
                  <span className="pd-quick-ico" style={{ background: qa.bg }}>{qa.icon}</span>
                  <span className="pd-quick-body">
                    <span className="pd-quick-lbl">{qa.label}</span>
                    <span className="pd-quick-hint">{qa.hint}</span>
                  </span>
                  <IcArrow />
                </button>
              ))}
            </div>

            <div className="pd-side-card">
              <div className="pd-side-title">Today's Summary</div>
              {[
                { label: "Deliveries done",  val: stats.completed,  green: true },
                { label: "In progress",      val: stats.inTransit              },
                { label: "Pending pickup",   val: stats.assigned               },
                { label: "Today's earnings", val: earnings.today,   green: true },
                { label: "Weekly earnings",  val: earnings.week                },
              ].map(r => (
                <div key={r.label} className="pd-sum-row">
                  <span className="pd-sum-lbl">{r.label}</span>
                  <span className={`pd-sum-val${r.green ? " pd-sum-green" : ""}`}>{r.val}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="pd-footer">
        <div className="pd-footer-grid">
          <div className="pd-ft-brand">
            <div className="pd-ft-logo-row">
              <span className="pd-ft-logo"><IcDrop color="white" size={16}/></span>
              <span className="pd-ft-name">SecondLife <strong>Foods</strong></span>
            </div>
            <p className="pd-ft-desc">Transforming expired, packaged goods into valuable resources to reduce food waste and nourish animals.</p>
            <div className="pd-ft-socials">
              <a className="pd-ft-social" href="#" aria-label="Facebook"><IcFb/></a>
              <a className="pd-ft-social" href="#" aria-label="Twitter"><IcTw/></a>
              <a className="pd-ft-social" href="#" aria-label="LinkedIn"><IcLi/></a>
            </div>
          </div>

          <div className="pd-ft-col">
            <div className="pd-ft-col-title">Contact</div>
            <div className="pd-ft-row"><IcMail/><span>contact@secondlifefoods.org</span></div>
            <div className="pd-ft-row"><IcPhone/><span>+1 (123) 456-7890</span></div>
            <div className="pd-ft-row"><IcLocation/><span>123 Green St., Cityname, ST 12345</span></div>
          </div>

          <div className="pd-ft-col">
            <div className="pd-ft-col-title">Quick Links</div>
            {["Home", "Donate Food Lot", "Create Lot", "Track Lot"].map(l => (
              <button key={l} className="pd-ft-link">{l}</button>
            ))}
          </div>

          <div className="pd-ft-col">
            <div className="pd-ft-col-title">Resources</div>
            {["Knowledge Pocket", "QR Scanner", "Admin Panel", "Testing Screen"].map(l => (
              <button key={l} className="pd-ft-link">{l}</button>
            ))}
          </div>

          <div className="pd-ft-col">
            <div className="pd-ft-col-title">Newsletter</div>
            <p className="pd-ft-nl-desc">Subscribe to our newsletter</p>
            <div className="pd-ft-nl-row">
              <input className="pd-ft-nl-input" type="email" placeholder="Enter your email" value={emailVal} onChange={e => setEmailVal(e.target.value)}/>
              <button className="pd-ft-nl-btn">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="pd-footer-base">
          <span>© 2024 <strong>SecondLife Foods.</strong> All rights reserved.</span>
          <div className="pd-ft-base-links">
            <a href="#">Privacy Policy</a><span>|</span><a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}