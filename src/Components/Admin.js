import React, { useState } from "react";
import "./Admin.css";

// ── NAVBAR ──────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="slf-nav">
      <a href="/home" className="slf-nav__brand">
        <div className="slf-nav__logo">
          <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
            <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 13H8v-1c0-2.67 5.33-4 8-4v5z" />
          </svg>
        </div>
        <span>SecondLife <strong>Foods</strong></span>
      </a>
      <div className={`slf-nav__links ${menuOpen ? "slf-nav__links--open" : ""}`}>
        <a href="/home" className="slf-nav__link">Home</a>
        <a href="/dash" className="slf-nav__link">Donor Dashboard</a>
        <a href="/create" className="slf-nav__link">Create Lot</a>
        <a href="/qr" className="slf-nav__link">QR Scanner</a>
        <a href="/admin" className="slf-nav__link slf-nav__link--active">Admin Panel</a>
        <a href="/testing" className="slf-nav__link">Testing Screen</a>
      </div>
      <div className="slf-nav__actions">
        <a href="/login" className="slf-nav__btn slf-nav__btn--outline">Login</a>
        <a href="/signup" className="slf-nav__btn slf-nav__btn--fill">Sign Up</a>
      </div>
      <button className="slf-nav__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </nav>
  );
};

// ── FOOTER ──────────────────────────────────────────────────
const Footer = () => (
  <footer className="slf-footer">
    <div className="slf-footer__inner">
      <div className="slf-footer__brand">
        <div className="slf-footer__logo-row">
          <div className="slf-footer__logo">
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 13H8v-1c0-2.67 5.33-4 8-4v5z" />
            </svg>
          </div>
          <span className="slf-footer__name">SecondLife <strong>Foods</strong></span>
        </div>
        <p className="slf-footer__tagline">
          Transforming expired, packaged goods into valuable resources to reduce food waste and nourish animals.
        </p>
        <div className="slf-footer__socials">
          <a href="#" className="slf-footer__social" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
          </a>
          <a href="#" className="slf-footer__social" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
          </a>
          <a href="#" className="slf-footer__social" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
        </div>
      </div>
      <div className="slf-footer__col">
        <h4 className="slf-footer__heading">CONTACT</h4>
        <ul className="slf-footer__list">
          <li className="slf-footer__contact-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
            contact@secondlifefoods.org
          </li>
          <li className="slf-footer__contact-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.07 3h3a2 2 0 012 1.72c.13 1 .37 2 .72 2.93a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.56 6.56l1.27-1.27a2 2 0 012.11-.45c.93.35 1.93.59 2.93.72A2 2 0 0122 16.92z"/></svg>
            +1 (123) 456-7890
          </li>
          <li className="slf-footer__contact-row slf-footer__contact-row--top">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>123 Green St.<br />Cityname, ST 12345</span>
          </li>
        </ul>
      </div>
      <div className="slf-footer__col">
        <h4 className="slf-footer__heading">QUICK LINKS</h4>
        <ul className="slf-footer__list">
          <li><a href="/home">Home</a></li>
          <li><a href="/donate">Donate Food Lot</a></li>
          <li><a href="/create-lot">Create Lot</a></li>
          <li><a href="/track-lot">Track Lot</a></li>
        </ul>
      </div>
      <div className="slf-footer__col">
        <h4 className="slf-footer__heading">RESOURCES</h4>
        <ul className="slf-footer__list">
          <li><a href="/knowledge">Knowledge Pocket</a></li>
          <li><a href="/qr-scanner">QR Scanner</a></li>
          <li><a href="/admin">Admin Panel</a></li>
          <li><a href="/testing">Testing Screen</a></li>
        </ul>
      </div>
      <div className="slf-footer__col">
        <h4 className="slf-footer__heading">NEWSLETTER</h4>
        <p className="slf-footer__newsletter-text">Subscribe to our newsletter</p>
        <div className="slf-footer__newsletter">
          <input type="email" placeholder="Enter your email" className="slf-footer__input" />
          <button className="slf-footer__subscribe">Subscribe</button>
        </div>
      </div>
    </div>
    <div className="slf-footer__bottom">
      <span>© 2024 <strong>SecondLife Foods.</strong> All rights reserved.</span>
      <div className="slf-footer__legal">
        <a href="/privacy">Privacy Policy</a>
        <span>|</span>
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// ── DATA ─────────────────────────────────────────────────────
const monthlyData = [
  { month: "Jan", lots: 62,  delivered: 48, pending: 14 },
  { month: "Feb", lots: 78,  delivered: 60, pending: 18 },
  { month: "Mar", lots: 55,  delivered: 40, pending: 15 },
  { month: "Apr", lots: 91,  delivered: 72, pending: 19 },
  { month: "May", lots: 84,  delivered: 65, pending: 19 },
  { month: "Jun", lots: 110, delivered: 88, pending: 22 },
  { month: "Jul", lots: 98,  delivered: 76, pending: 22 },
  { month: "Aug", lots: 125, delivered: 97, pending: 28 },
  { month: "Sep", lots: 107, delivered: 82, pending: 25 },
  { month: "Oct", lots: 138, delivered: 110, pending: 28 },
  { month: "Nov", lots: 118, delivered: 93, pending: 25 },
  { month: "Dec", lots: 174, delivered: 140, pending: 34 },
];

const donations = [
  { id: "#SLF1021", donor: "Ravi Kumar",   type: "Cooked Meals",  qty: "30 kg",  ngo: "Bark Park Sanctuary", date: "Mar 25", status: "delivered"  },
  { id: "#SLF1022", donor: "Anita Sharma", type: "Groceries",     qty: "15 kg",  ngo: "Tails & Whiskers",    date: "Mar 24", status: "pending"    },
  { id: "#SLF1023", donor: "Priya Mehta",  type: "Packaged Food", qty: "50 pcs", ngo: "Furry Friends Haven", date: "Mar 22", status: "screening"  },
  { id: "#SLF1024", donor: "Arjun Das",    type: "Baked Goods",   qty: "20 kg",  ngo: "Sheltered Paws",      date: "Mar 21", status: "delivered"  },
  { id: "#SLF1025", donor: "Meena Roy",    type: "Dairy",         qty: "10 L",   ngo: "Bark Park Sanctuary", date: "Mar 20", status: "processing" },
  { id: "#SLF1026", donor: "Suresh Nair",  type: "Canned Goods",  qty: "40 pcs", ngo: "Happy Paws NGO",      date: "Mar 19", status: "delivered"  },
];

const ngos = [
  { name: "Bark Park Sanctuary", city: "Bangalore", lots: 34, animals: 620, initials: "BP" },
  { name: "Tails & Whiskers",    city: "Mumbai",    lots: 28, animals: 480, initials: "TW" },
  { name: "Furry Friends Haven", city: "Delhi",     lots: 19, animals: 310, initials: "FF" },
  { name: "Sheltered Paws",      city: "Chennai",   lots: 41, animals: 790, initials: "SP" },
  { name: "Happy Paws NGO",      city: "Pune",      lots: 12, animals: 200, initials: "HP" },
];

const statusMeta = {
  delivered:  { label: "Delivered",  cls: "adm-badge--delivered"  },
  pending:    { label: "Pending",    cls: "adm-badge--pending"    },
  screening:  { label: "Screening",  cls: "adm-badge--screening"  },
  processing: { label: "Processing", cls: "adm-badge--processing" },
};

// ── LINE CHART (SVG) ─────────────────────────────────────────
const LineChart = ({ data, period }) => {
  const W = 600, H = 180, PAD = { top: 10, right: 10, bottom: 30, left: 36 };
  const iW = W - PAD.left - PAD.right;
  const iH = H - PAD.top - PAD.bottom;

  const slice = period === "week"
    ? data.slice(-4).map((d, i) => ({ ...d, month: ["Oct","Nov","Dec","Jan"][i] }))
    : period === "day"
    ? data.slice(-7).map((d, i) => ({ ...d, month: ["M","T","W","T","F","S","S"][i] }))
    : data;

  const maxVal = Math.max(...slice.map(d => d.lots)) * 1.15;
  const xStep = iW / (slice.length - 1);

  const toX = i => PAD.left + i * xStep;
  const toY = v => PAD.top + iH - (v / maxVal) * iH;

  const lotsPath = slice.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.lots)}`).join(" ");
  const delivPath = slice.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.delivered)}`).join(" ");

  const lotsArea = `${lotsPath} L${toX(slice.length-1)},${PAD.top+iH} L${PAD.left},${PAD.top+iH} Z`;
  const delivArea = `${delivPath} L${toX(slice.length-1)},${PAD.top+iH} L${PAD.left},${PAD.top+iH} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(maxVal * f));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="adm-chart-svg" style={{height: 180}}>
      <defs>
        <linearGradient id="gradLots" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#52b788" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#52b788" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gradDeliv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f7cf7" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#4f7cf7" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yTicks.map((v, i) => (
        <g key={i}>
          <line
            x1={PAD.left} y1={toY(v)}
            x2={W - PAD.right} y2={toY(v)}
            stroke="#eaf0f4" strokeWidth="1"
          />
          <text x={PAD.left - 6} y={toY(v) + 4} fontSize="9" fill="#b0bec5" textAnchor="end">{v}</text>
        </g>
      ))}

      {/* Areas */}
      <path d={lotsArea} fill="url(#gradLots)" />
      <path d={delivArea} fill="url(#gradDeliv)" />

      {/* Lines */}
      <path d={lotsPath} fill="none" stroke="#52b788" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={delivPath} fill="none" stroke="#4f7cf7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,3"/>

      {/* X labels */}
      {slice.map((d, i) => (
        <text key={i} x={toX(i)} y={H - 6} fontSize="9" fill="#b0bec5" textAnchor="middle">{d.month}</text>
      ))}

      {/* Dots on lots line */}
      {slice.map((d, i) => (
        <circle key={i} cx={toX(i)} cy={toY(d.lots)} r="3.5" fill="white" stroke="#52b788" strokeWidth="2"/>
      ))}
    </svg>
  );
};

// ── BAR CHART (SVG) ──────────────────────────────────────────
const BarChart = ({ data }) => {
  const W = 600, H = 180, PAD = { top: 10, right: 10, bottom: 30, left: 36 };
  const iW = W - PAD.left - PAD.right;
  const iH = H - PAD.top - PAD.bottom;
  const last6 = data.slice(-6);
  const maxVal = Math.max(...last6.map(d => d.lots)) * 1.2;
  const barW = iW / last6.length * 0.55;
  const gap = iW / last6.length;
  const toY = v => iH - (v / maxVal) * iH;
  const yTicks = [0, 0.5, 1].map(f => Math.round(maxVal * f));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="adm-chart-svg" style={{height: 180}}>
      {yTicks.map((v, i) => (
        <g key={i}>
          <line x1={PAD.left} y1={PAD.top + iH - (v/maxVal)*iH} x2={W-PAD.right} y2={PAD.top + iH - (v/maxVal)*iH} stroke="#eaf0f4" strokeWidth="1"/>
          <text x={PAD.left-6} y={PAD.top + iH - (v/maxVal)*iH + 4} fontSize="9" fill="#b0bec5" textAnchor="end">{v}</text>
        </g>
      ))}
      {last6.map((d, i) => {
        const x = PAD.left + i * gap + gap/2 - barW/2;
        const bh = (d.lots / maxVal) * iH;
        const dh = (d.delivered / maxVal) * iH;
        return (
          <g key={i}>
            <rect x={x} y={PAD.top + toY(d.lots)} width={barW} height={bh} rx="4" fill="#52b788" opacity="0.3"/>
            <rect x={x + barW*0.15} y={PAD.top + toY(d.delivered)} width={barW*0.7} height={dh} rx="3" fill="#52b788"/>
            <text x={x + barW/2} y={H-6} fontSize="9" fill="#b0bec5" textAnchor="middle">{d.month}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ── DONUT CHART (SVG) ────────────────────────────────────────
const DonutChart = () => {
  const segments = [
    { label: "Delivered",  val: 669, pct: 54, color: "#52b788" },
    { label: "Processing", val: 260, pct: 21, color: "#4f7cf7" },
    { label: "Screening",  val: 186, pct: 15, color: "#f5a623" },
    { label: "Pending",    val: 125, pct: 10, color: "#d0dde5" },
  ];
  const R = 58, r = 36, cx = 70, cy = 70;
  let cumAngle = -Math.PI / 2;
  const arcs = segments.map(s => {
    const angle = (s.pct / 100) * Math.PI * 2;
    const x1 = cx + R * Math.cos(cumAngle);
    const y1 = cy + R * Math.sin(cumAngle);
    cumAngle += angle;
    const x2 = cx + R * Math.cos(cumAngle);
    const y2 = cy + R * Math.sin(cumAngle);
    const xi1 = cx + r * Math.cos(cumAngle - angle);
    const yi1 = cy + r * Math.sin(cumAngle - angle);
    const xi2 = cx + r * Math.cos(cumAngle);
    const yi2 = cy + r * Math.sin(cumAngle);
    const large = angle > Math.PI ? 1 : 0;
    return { ...s, d: `M${x1},${y1} A${R},${R},0,${large},1,${x2},${y2} L${xi2},${yi2} A${r},${r},0,${large},0,${xi1},${yi1} Z` };
  });

  return (
    <div>
      <div className="adm-donut-wrap">
        <svg viewBox="0 0 140 140" width="140" height="140">
          {arcs.map((a, i) => (
            <path key={i} d={a.d} fill={a.color} opacity={i === 0 ? 1 : 0.85}/>
          ))}
          <circle cx={cx} cy={cy} r={r-2} fill="white"/>
        </svg>
        <div className="adm-donut-center">
          <div className="adm-donut-center__val">1,240</div>
          <div className="adm-donut-center__lbl">Total Lots</div>
        </div>
      </div>
      <div className="adm-donut-legend">
        {segments.map((s, i) => (
          <div key={i} className="adm-donut-legend__row">
            <div className="adm-donut-legend__left">
              <div className="adm-donut-legend__dot" style={{background: s.color}}/>
              <span className="adm-donut-legend__label">{s.label}</span>
            </div>
            <div className="adm-donut-legend__right">
              <span className="adm-donut-legend__val">{s.val}</span>
              <span className="adm-donut-legend__pct">{s.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── MINI BAR SPARKLINE ───────────────────────────────────────
const MiniBar = ({ values, colorClass }) => {
  const max = Math.max(...values);
  const last = values.length - 1;
  return (
    <div className="adm-mini-bar">
      {values.map((v, i) => (
        <div
          key={i}
          className={`adm-mini-bar__b adm-mini-bar__b--${colorClass}${i === last ? ` adm-mini-bar__b--active` : ""}`}
          style={{ height: `${Math.round((v / max) * 100)}%` }}
        />
      ))}
    </div>
  );
};

// ── SIDEBAR NAV ──────────────────────────────────────────────
const SideNav = ({ active, setActive }) => {
  const items = [
    { key: "overview",   label: "Overview" },
    { key: "donations",   label: "Donations",   badge: "84" ,   route: "/create-lot" },
    { key: "ngos",        label: "NGO Partners",   route: "/ngos" },
    { key: "lots",      label: "Lot Tracking",    route: "/track" },
    { key: "analytics",  label: "Analytics" },
    { key: "reports",     label: "Reports" },
  ];
  return (
    <aside className="adm-sidenav">
      <span className="adm-sidenav__label">Main</span>
      {items.slice(0,2).map(item => (
        <button
          key={item.key}
          className={`adm-sidenav__item${active === item.key ? " adm-sidenav__item--active" : ""}`}
          onClick={() => setActive(item.key)}
        >
          <div className="adm-sidenav__icon">{item.icon}</div>
          {item.label}
          {item.badge && <span className="adm-sidenav__badge">{item.badge}</span>}
        </button>
      ))}
      <span className="adm-sidenav__label">Management</span>
      {items.slice(2,4).map(item => (
        <button
          key={item.key}
          className={`adm-sidenav__item${active === item.key ? " adm-sidenav__item--active" : ""}`}
          onClick={() => setActive(item.key)}
        >
          <div className="adm-sidenav__icon">{item.icon}</div>
          {item.label}
        </button>
      ))}
      <span className="adm-sidenav__label">Insights</span>
      {items.slice(4).map(item => (
        <button
          key={item.key}
          className={`adm-sidenav__item${active === item.key ? " adm-sidenav__item--active" : ""}`}
          onClick={() => setActive(item.key)}
        >
          <div className="adm-sidenav__icon">{item.icon}</div>
          {item.label}
        </button>
      ))}
    </aside>
  );
};

// ── ADMIN PAGE ───────────────────────────────────────────────
const Admin = () => {
  const [sideActive, setSideActive] = useState("overview");
  const [tableTab, setTableTab] = useState("donations");
  const [chartPeriod, setChartPeriod] = useState("month");
  const [chartType, setChartType] = useState("line");

  return (
    <>
      <Navbar />

      <div className="adm-dashboard">
        <SideNav active={sideActive} setActive={setSideActive} />

        <div className="adm-content">

          {/* ── HEADER ── */}
          <div className="adm-header">
            <div className="adm-header__left">
              <div className="adm-header__greeting">Tuesday, March 25 — Admin Panel</div>
              <div className="adm-header__title">Dashboard Overview</div>
            </div>
            <div className="adm-header__right">
              <div className="adm-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input placeholder="Search lots, NGOs…" />
              </div>
              <div className="adm-icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
                <span className="adm-notif-dot"/>
              </div>
              <div className="adm-icon-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </div>
              <div className="adm-avatar">AD</div>
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="adm-stats">
            <div className="adm-stat">
              <div className="adm-stat__top">
                <div className="adm-stat__icon-wrap adm-stat__icon-wrap--green">📦</div>
                <span className="adm-stat__delta adm-stat__delta--up">↑ +7.3%</span>
              </div>
              <div className="adm-stat__value">1,240</div>
              <div className="adm-stat__label">Total Donations</div>
              <MiniBar values={[62,78,55,91,84,110,98,125,107,138,118,174]} colorClass="green"/>
            </div>
            <div className="adm-stat">
              <div className="adm-stat__top">
                <div className="adm-stat__icon-wrap adm-stat__icon-wrap--blue">🏢</div>
                <span className="adm-stat__delta adm-stat__delta--blue">↑ +3</span>
              </div>
              <div className="adm-stat__value">32</div>
              <div className="adm-stat__label">Active NGOs</div>
              <MiniBar values={[18,20,21,22,24,25,26,27,28,29,30,32]} colorClass="blue"/>
            </div>
            <div className="adm-stat">
              <div className="adm-stat__top">
                <div className="adm-stat__icon-wrap adm-stat__icon-wrap--teal">🍽️</div>
                <span className="adm-stat__delta adm-stat__delta--up">↑ +5.4%</span>
              </div>
              <div className="adm-stat__value">18,450</div>
              <div className="adm-stat__label">Meals Served</div>
              <MiniBar values={[800,1100,900,1400,1300,1700,1500,1900,1700,2200,1900,2850]} colorClass="teal"/>
            </div>
            <div className="adm-stat">
              <div className="adm-stat__top">
                <div className="adm-stat__icon-wrap adm-stat__icon-wrap--amber">🌿</div>
                <span className="adm-stat__delta adm-stat__delta--down">↓ −6.7%</span>
              </div>
              <div className="adm-stat__value">4.2 T</div>
              <div className="adm-stat__label">CO₂ Diverted</div>
              <MiniBar values={[0.3,0.4,0.3,0.5,0.4,0.6,0.5,0.6,0.5,0.7,0.6,0.4]} colorClass="amber"/>
            </div>
          </div>

          {/* ── MID ROW ── */}
          <div className="adm-mid-row">

            {/* CHART CARD */}
            <div className="adm-chart-card">
              <div className="adm-chart-card__header">
                <div>
                  <div className="adm-chart-card__title">Lot Donation Statistics</div>
                  <div className="adm-chart-card__sub">Total lots submitted vs delivered over time</div>
                </div>
                <div style={{display:"flex", gap:"8px", alignItems:"center"}}>
                  <div className="adm-tab-pills">
                    {["day","week","month"].map(p => (
                      <button key={p} className={`adm-tab-pill${chartPeriod===p?" adm-tab-pill--active":""}`} onClick={()=>setChartPeriod(p)}>
                        {p.charAt(0).toUpperCase()+p.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="adm-tab-pills">
                    <button className={`adm-tab-pill${chartType==="line"?" adm-tab-pill--active":""}`} onClick={()=>setChartType("line")}>Line</button>
                    <button className={`adm-tab-pill${chartType==="bar"?" adm-tab-pill--active":""}`} onClick={()=>setChartType("bar")}>Bar</button>
                  </div>
                </div>
              </div>
              <div className="adm-chart-legend">
                <div className="adm-chart-legend__item">
                  <div className="adm-chart-legend__dot" style={{background:"#52b788"}}/>
                  Total Lots Submitted
                </div>
                <div className="adm-chart-legend__item">
                  <div className="adm-chart-legend__dot" style={{background:"#4f7cf7", opacity:0.8}}/>
                  Delivered
                </div>
              </div>
              {chartType === "line"
                ? <LineChart data={monthlyData} period={chartPeriod}/>
                : <BarChart data={monthlyData}/>
              }
            </div>

            {/* DONUT CARD */}
            <div className="adm-donut-card">
              <div className="adm-donut-card__title">Lot Status Summary</div>
              <div className="adm-donut-card__sub">Distribution across all donation stages</div>
              <DonutChart />
            </div>
          </div>

          {/* ── BOTTOM ROW ── */}
          <div className="adm-bottom-row">

            {/* TABLE CARD */}
            <div className="adm-table-card">
              <div className="adm-table-card__header">
                <div>
                  <div className="adm-table-card__title">
                    {tableTab === "donations" ? "Recent Donations" : "NGO Partners"}
                  </div>
                  <div className="adm-table-card__sub">
                    {tableTab === "donations"
                      ? "Latest food lot submissions"
                      : "Registered shelters & rescue orgs"}
                  </div>
                </div>
                <div style={{display:"flex", gap:"8px", alignItems:"center"}}>
                  <div className="adm-table-card__tabs">
                    <button className={`adm-table-card__tab${tableTab==="donations"?" adm-table-card__tab--active":""}`} onClick={()=>setTableTab("donations")}>Donations</button>
                    <button className={`adm-table-card__tab${tableTab==="ngos"?" adm-table-card__tab--active":""}`} onClick={()=>setTableTab("ngos")}>NGOs</button>
                  </div>
                  <a href={tableTab==="donations"?"/create-lot":"/add-ngo"} className="adm-table-card__action">
                    + {tableTab==="donations"?"New Lot":"Add NGO"}
                  </a>
                </div>
              </div>

              {tableTab === "donations" ? (
                <>
                  <div style={{overflowX:"auto"}}>
                    <table className="adm-table">
                      <thead>
                        <tr><th>Lot ID</th><th>Donor</th><th>Food Type</th><th>Qty</th><th>NGO</th><th>Date</th><th>Status</th></tr>
                      </thead>
                      <tbody>
                        {donations.map(d => (
                          <tr key={d.id}>
                            <td className="adm-td--id">{d.id}</td>
                            <td>{d.donor}</td>
                            <td>{d.type}</td>
                            <td>{d.qty}</td>
                            <td>{d.ngo}</td>
                            <td className="adm-td--date">{d.date}</td>
                            <td><span className={`adm-badge ${statusMeta[d.status].cls}`}>{statusMeta[d.status].label}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="adm-table-card__footer">
                    <a href="/donations" className="adm-viewall">View all donations →</a>
                  </div>
                </>
              ) : (
                <div style={{overflowX:"auto"}}>
                  <table className="adm-table">
                    <thead>
                      <tr><th>Organisation</th><th>City</th><th>Lots</th><th>Animals Fed</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {ngos.map(n => (
                        <tr key={n.name}>
                          <td style={{display:"flex",alignItems:"center",gap:"10px",borderBottom:"none"}}>
                            <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#2d6a4f,#52b788)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:"0.7rem",flexShrink:0}}>{n.initials}</div>
                            {n.name}
                          </td>
                          <td>{n.city}</td>
                          <td>{n.lots}</td>
                          <td>{n.animals.toLocaleString()}</td>
                          <td><span className="adm-badge adm-badge--delivered">Verified</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* RIGHT COL */}
            <div className="adm-right-col">

              {/* Top NGOs */}
              <div className="adm-ngo-card">
                <div className="adm-ngo-card__title">Top NGO Partners</div>
                <div className="adm-ngo-list">
                  {ngos.slice(0,4).map(n => (
                    <div key={n.name} className="adm-ngo-item">
                      <div className="adm-ngo-item__avatar">{n.initials}</div>
                      <div className="adm-ngo-item__info">
                        <div className="adm-ngo-item__name">{n.name}</div>
                        <div className="adm-ngo-item__meta">{n.city} · {n.animals} animals</div>
                      </div>
                      <div className="adm-ngo-item__lots">{n.lots} lots</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="adm-quick-card">
                <div className="adm-quick-card__title">Quick Actions</div>
                <div className="adm-quick-grid">
                  <a href="/create-lot" className="adm-quick-btn">
                    <div className="adm-quick-btn__icon adm-quick-btn__icon--g">📦</div>
                    Create Lot
                  </a>
                  <a href="/qr-scanner" className="adm-quick-btn">
                    <div className="adm-quick-btn__icon adm-quick-btn__icon--b">📷</div>
                    Scan QR
                  </a>
                  <a href="/add-ngo" className="adm-quick-btn">
                    <div className="adm-quick-btn__icon adm-quick-btn__icon--t">🏢</div>
                    Add NGO
                  </a>
                  <a href="/reports" className="adm-quick-btn">
                    <div className="adm-quick-btn__icon adm-quick-btn__icon--a">📊</div>
                    Reports
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Admin;
