import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import "./ReceiverDashboard.css";

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const initialLots = [
  { id: "LOT-2024-001", donor: "Green Valley Farm", category: "Vegetables", qty: "120 kg", date: "24 Aug 2024", status: "Received" },
  { id: "LOT-2024-002", donor: "Fresh Harvest NGO", category: "Fruits", qty: "80 kg", date: "23 Aug 2024", status: "In Transit" },
  { id: "LOT-2024-003", donor: "City Bakery", category: "Bread", qty: "200 pcs", date: "23 Aug 2024", status: "Pending" },
  { id: "LOT-2024-004", donor: "Sunrise Dairy", category: "Dairy", qty: "60 L", date: "22 Aug 2024", status: "Confirmed" },
  { id: "LOT-2024-005", donor: "Community Kitchen", category: "Cooked Food", qty: "150 pcs", date: "22 Aug 2024", status: "Received" },
];

const weeklyData = [
  { week: "W27", received: 18, pending: 8 },
  { week: "W28", received: 27, pending: 8 },
  { week: "W29", received: 30, pending: 8 },
  { week: "W30", received: 24, pending: 7 },
  { week: "W31", received: 44, pending: 8 },
  { week: "W32", received: 54, pending: 8 },
  { week: "W33", received: 36, pending: 6 },
];

const categoryData = [
  { name: "Vegetables", value: 2, color: "#2D6A4F" },
  { name: "Fruits",     value: 1, color: "#40916C" },
  { name: "Bread",      value: 1, color: "#52B788" },
  { name: "Dairy",      value: 1, color: "#74C69D" },
  { name: "Other",      value: 0, color: "#B7E4C7" },
];

const trendData = [
  { month: "Mar", lots: 12 },
  { month: "Apr", lots: 18 },
  { month: "May", lots: 22 },
  { month: "Jun", lots: 28 },
  { month: "Jul", lots: 35 },
  { month: "Aug", lots: 44 },
];

const feedbackHistory = [
  { id: 1, lotId: "LOT-2024-001", subject: "Excellent vegetable quality", date: "24 Aug 2024", status: "Reviewed", rating: 5 },
  { id: 2, lotId: "LOT-2024-003", subject: "Packaging damage on bread lot", date: "23 Aug 2024", status: "Pending", rating: 2 },
  { id: 3, lotId: "LOT-2024-004", subject: "Dairy arrived fresh", date: "22 Aug 2024", status: "Reviewed", rating: 4 },
];

const historyLots = [
  { id: "LOT-2024-001", donor: "Green Valley Farm", category: "Vegetables", qty: "120 kg", date: "24 Aug 2024", status: "Received", completedOn: "24 Aug 2024" },
  { id: "LOT-2023-089", donor: "Fresh Harvest NGO", category: "Fruits", qty: "95 kg", date: "10 Dec 2023", status: "Received", completedOn: "11 Dec 2023" },
  { id: "LOT-2023-072", donor: "City Bakery", category: "Bread", qty: "300 pcs", date: "05 Nov 2023", status: "Received", completedOn: "05 Nov 2023" },
  { id: "LOT-2023-058", donor: "Sunrise Dairy", category: "Dairy", qty: "80 L", date: "14 Oct 2023", status: "Rejected", completedOn: "14 Oct 2023" },
  { id: "LOT-2023-041", donor: "GreenRoot Co.", category: "Vegetables", qty: "200 kg", date: "20 Sep 2023", status: "Received", completedOn: "21 Sep 2023" },
];

const initialReviews = [
  { id: 1, type: "positive", author: "Dr. Anita Sharma", role: "Hospital Administrator", date: "22 Aug 2024", rating: 5, text: "The quality of food lots received has been consistently excellent. The tracking system makes it easy to monitor deliveries in real time.", avatar: "AS", lotId: "LOT-2024-001" },
  { id: 2, type: "positive", author: "Rahul Mehta", role: "Shelter Manager", date: "20 Aug 2024", rating: 5, text: "Exceptional service! The bread and dairy lots arrived on time and in perfect condition. The QR scan on arrival saved us so much paperwork.", avatar: "RM", lotId: "LOT-2024-004" },
  { id: 3, type: "negative", author: "Suresh Patil", role: "Canteen Coordinator", date: "19 Aug 2024", rating: 2, text: "The lot arrived two days late with no prior notification. The bread items had some packaging damage. We had to reject a portion.", avatar: "SP", lotId: "LOT-2024-003" },
];

/* ─────────────────────────────────────────────
   STATUS BADGE
───────────────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    Received: "badge--received",
    "In Transit": "badge--transit",
    Pending: "badge--pending",
    Confirmed: "badge--confirmed",
    Rejected: "badge--rejected",
  };
  return <span className={`status-badge ${map[status] || ""}`}>{status}</span>;
}

/* ─────────────────────────────────────────────
   NAVBAR  — matches screenshot exactly
───────────────────────────────────────────── */
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="site-navbar">
      <div className="site-navbar-inner">
        {/* Logo */}
        <Link to="/home" className="site-nav-logo">
          <div className="site-nav-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2v1l2 2s-4.67 1.33-5 5c0 0-1.5-3 2-5-3 0-5 2-5 2s.5-3.5 3-5z" fill="#52B788"/>
            </svg>
          </div>
          <span className="site-nav-logo-text">SecondLife <strong>Foods</strong></span>
        </Link>

        {/* Nav Links */}
        <div className="site-nav-links">
          <Link to="/home" className="site-nav-link">Home</Link>
          <Link to="/dash" className="site-nav-link">Donor Dashboard</Link>
          <Link to="/create-lot" className="site-nav-link">Create Lot</Link>
          <Link to="/qr" className="site-nav-link">QR Scanner</Link>
          <Link to="/admin" className="site-nav-link">Admin Panel</Link>
          <Link to="/testing" className="site-nav-link">Testing Screen</Link>
        </div>

        {/* User avatar */}
        <div className="site-nav-right">
          <div className="site-nav-avatar">RK</div>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   FOOTER — matches screenshot exactly
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        {/* Brand */}
        <div className="site-footer-brand">
          <div className="site-footer-logo">
            <div className="site-footer-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2v1l2 2s-4.67 1.33-5 5c0 0-1.5-3 2-5-3 0-5 2-5 2s.5-3.5 3-5z" fill="#52B788"/>
              </svg>
            </div>
            <span className="site-footer-logo-text">SecondLife <strong>Foods</strong></span>
          </div>
          <p className="site-footer-tagline">Transforming expired, packaged goods into valuable resources to reduce food waste and nourish animals.</p>
          <div className="site-footer-socials">
            <a href="#" className="site-social-btn" aria-label="facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="site-social-btn" aria-label="twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="#" className="site-social-btn" aria-label="linkedin">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="site-footer-col">
          <h4 className="site-footer-col-title">Contact</h4>
          <ul className="site-footer-contact-list">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:contact@secondlifefoods.org">contact@secondlifefoods.org</a>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.37 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.83-1.83a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+1 (123) 456-7890</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>123 Green St., Cityname, ST 12345</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="site-footer-col">
          <h4 className="site-footer-col-title">Quick Links</h4>
          <ul className="site-footer-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/create-lot">Donate Food Lot</Link></li>
            <li><Link to="/create">Create Lot</Link></li>
            <li><Link to="/track">Track Lot</Link></li>
            <li><Link to="/admin">Admin Panel</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="site-footer-col">
          <h4 className="site-footer-col-title">Resources</h4>
          <ul className="site-footer-links">
            <li><a href="#">Knowledge Pocket</a></li>
            <li><Link to="/qr">QR Scanner</Link></li>
            <li><Link to="/admin">Admin Panel</Link></li>
            <li><Link to="/testing">Testing Screen</Link></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="site-footer-col site-footer-newsletter">
          <h4 className="site-footer-col-title">Newsletter</h4>
          <p className="site-footer-newsletter-desc">Subscribe to our newsletter for the latest updates.</p>
          <div className="site-footer-newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>© 2024 <strong>SecondLife Foods.</strong> All rights reserved.</p>
        <div className="site-footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   REQUEST LOT MODAL
───────────────────────────────────────────── */
function RequestLotModal({ onClose, onSubmit, lots }) {
  const [form, setForm] = useState({ donor: "", category: "Vegetables", qty: "", unit: "kg", date: "", notes: "" });
  const handleSubmit = () => {
    if (!form.donor || !form.qty || !form.date) return;
    onSubmit({
      id: `LOT-2024-00${lots.length + 1}`,
      donor: form.donor,
      category: form.category,
      qty: `${form.qty} ${form.unit}`,
      date: form.date,
      status: "Pending",
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div>
              <h2 className="modal-title">Request New Lot</h2>
              <p className="modal-subtitle">Submit a food lot request to a registered donor</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-form-grid">
            <div className="modal-field">
              <label className="modal-label">Donor / Organisation</label>
              <input className="modal-input" placeholder="e.g. Green Valley Farm" value={form.donor} onChange={e => setForm(p => ({ ...p, donor: e.target.value }))} />
            </div>
            <div className="modal-field">
              <label className="modal-label">Food Category</label>
              <select className="modal-input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {["Vegetables","Fruits","Bread","Dairy","Cooked Food","Grains","Other"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label className="modal-label">Quantity</label>
              <div className="modal-input-row">
                <input className="modal-input modal-input--qty" placeholder="e.g. 120" value={form.qty} onChange={e => setForm(p => ({ ...p, qty: e.target.value }))} />
                <select className="modal-input modal-input--unit" value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))}>
                  {["kg","L","pcs","boxes","tonnes"].map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
            </div>
            <div className="modal-field">
              <label className="modal-label">Required By</label>
              <input className="modal-input" type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
            </div>
            <div className="modal-field modal-field--full">
              <label className="modal-label">Additional Notes <span className="modal-label-opt">(optional)</span></label>
              <textarea className="modal-input modal-textarea" rows={3} placeholder="Specific requirements, storage conditions..." value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-btn-submit" onClick={handleSubmit}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD PAGE
───────────────────────────────────────────── */
function DashboardPage({ lots, onNav, onAddLot }) {
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const received  = lots.filter(l => l.status === "Received").length;
  const inTransit = lots.filter(l => l.status === "In Transit").length;
  const pending   = lots.filter(l => l.status === "Pending").length;
  const confirmed = lots.filter(l => l.status === "Confirmed").length;
  const total     = lots.length;

  const filteredLots = statusFilter === "All" ? lots : lots.filter(l => l.status === statusFilter);

  const statCards = [
    { label: "Total Received", value: received, change: "+12%", up: true, color: "stat--green" },
    { label: "In Transit",     value: inTransit, change: "Live",     up: false, color: "stat--amber" },
    { label: "Pending",        value: pending,   change: "Awaiting", up: false, color: "stat--blue" },
    { label: "Confirmed",      value: confirmed, change: "Ready",    up: false, color: "stat--purple" },
  ];

  const COLORS = ["#2D6A4F","#40916C","#52B788","#74C69D","#B7E4C7"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip-label">{label}</p>
          {payload.map((p, i) => (
            <p key={i} style={{ color: p.color }}>
              {p.name}: <strong>{p.value}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {showModal && <RequestLotModal onClose={() => setShowModal(false)} onSubmit={onAddLot} lots={lots} />}

      <div className="page-content db-page">
        {/* Header */}
        <div className="db-header">
          <div className="db-header-left">
            <div className="db-header-eyebrow"><span className="db-live-dot" />Hospital_2 · Aug 2024</div>
            <h1 className="db-title">Receiver Dashboard</h1>
            <p className="db-subtitle">Monday, 26 August 2024 · Welcome back, Ravi</p>
          </div>
          <div className="db-header-actions">
            <select className="db-select"><option>Hospital_2, Hospital</option></select>
            <select className="db-select"><option>Aug 2024</option><option>Jul 2024</option></select>
            <button className="db-btn-primary" onClick={() => setShowModal(true)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Request Lot
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="db-kpi-strip">
          {statCards.map((s, i) => (
            <div key={i} className={`db-kpi-card ${s.color}`} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="db-kpi-top">
                <span className={`db-kpi-badge ${s.up ? "db-kpi-badge--up" : ""}`}>{s.change}</span>
              </div>
              <div className="db-kpi-value">{s.value}</div>
              <div className="db-kpi-label">{s.label}</div>
              <div className="db-kpi-bar">
                <div className="db-kpi-bar-fill" style={{ width: `${Math.round((s.value / Math.max(total, 1)) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="db-charts-row">
          {/* Bar Chart — Weekly Activity */}
          <div className="db-chart-card db-chart-card--main">
            <div className="db-chart-header">
              <div>
                <h3 className="db-chart-title">Weekly Lot Activity</h3>
                <p className="db-chart-sub">Received vs pending over last 7 weeks</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }} barSize={18} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8f2eb" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#6B8070" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6B8070" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#6B8070", paddingTop: 10 }} />
                <Bar dataKey="received" name="Received" fill="#2D6A4F" radius={[4,4,0,0]} />
                <Bar dataKey="pending"  name="Pending"  fill="#B7E4C7" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart — Category Breakdown */}
          <div className="db-chart-card db-chart-card--side">
            <div className="db-chart-header">
              <div>
                <h3 className="db-chart-title">Category Breakdown</h3>
                <p className="db-chart-sub">{total} total lots this month</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                  paddingAngle={3} dataKey="value"
                  label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ""}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart — Monthly Trend */}
        <div className="db-chart-card db-chart-card--full">
          <div className="db-chart-header">
            <div>
              <h3 className="db-chart-title">Monthly Lot Trend</h3>
              <p className="db-chart-sub">Total lots received per month (2024)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8f2eb" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B8070" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B8070" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="lots" name="Lots" stroke="#2D6A4F" strokeWidth={2.5}
                dot={{ fill: "#2D6A4F", r: 4 }} activeDot={{ r: 6, fill: "#40916C" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="db-table-card">
          <div className="db-table-header">
            <div className="db-table-header-left">
              <h3 className="db-table-title">Upcoming &amp; Active Lots</h3>
              <span className="db-table-count">{filteredLots.length} lots</span>
            </div>
            <div className="db-table-filters">
              {["All","Received","In Transit","Pending","Confirmed"].map(s => (
                <button key={s} className={`db-filter-pill ${statusFilter === s ? "db-filter-pill--active" : ""}`} onClick={() => setStatusFilter(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="table-wrap">
            <table className="rd-table">
              <thead>
                <tr><th>Lot ID</th><th>Donor</th><th>Category</th><th>Qty</th><th>Date</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filteredLots.map(lot => (
                  <tr key={lot.id}>
                    <td className="lot-id">{lot.id}</td>
                    <td>
                      <div className="td-donor">
                        <div className="td-donor-avatar">{lot.donor.charAt(0)}</div>
                        {lot.donor}
                      </div>
                    </td>
                    <td><span className="td-category">{lot.category}</span></td>
                    <td className="td-qty">{lot.qty}</td>
                    <td className="lot-date">{lot.date}</td>
                    <td><StatusBadge status={lot.status} /></td>
                    <td>
                      <button className="btn-track-slim" onClick={() => onNav("tracking")}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Track
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   MY LOTS PAGE
───────────────────────────────────────────── */
function MyLotsPage({ lots, onAddLot }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ donor: "", category: "Vegetables", qty: "", date: "" });

  const handleAdd = () => {
    if (!form.donor || !form.qty || !form.date) return;
    onAddLot({ id: `LOT-2024-00${lots.length + 1}`, ...form, status: "Pending" });
    setForm({ donor: "", category: "Vegetables", qty: "", date: "" });
    setShowForm(false);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div><h1 className="page-title">My Lots</h1><p className="page-subtitle">Manage and monitor all your assigned food lots</p></div>
        <button className="btn-request" onClick={() => setShowForm(!showForm)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New Lot
        </button>
      </div>
      {showForm && (
        <div className="form-card">
          <h3 className="form-card-title">Request / Add New Lot</h3>
          <div className="form-grid">
            <div className="form-field"><label>Donor Name</label><input className="rd-input" placeholder="e.g. Green Valley Farm" value={form.donor} onChange={e => setForm(p => ({ ...p, donor: e.target.value }))} /></div>
            <div className="form-field"><label>Category</label><select className="rd-input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>{["Vegetables","Fruits","Bread","Dairy","Cooked Food","Other"].map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="form-field"><label>Quantity</label><input className="rd-input" placeholder="e.g. 100 kg" value={form.qty} onChange={e => setForm(p => ({ ...p, qty: e.target.value }))} /></div>
            <div className="form-field"><label>Expected Date</label><input className="rd-input" type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></div>
          </div>
          <div className="form-actions">
            <button className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
            <button className="btn-request" onClick={handleAdd}>Add Lot</button>
          </div>
        </div>
      )}
      <div className="lots-cards-grid">
        {lots.map(lot => (
          <div key={lot.id} className="lot-card">
            <div className="lot-card-top"><span className="lot-card-id">{lot.id}</span><StatusBadge status={lot.status} /></div>
            <h4 className="lot-card-donor">{lot.donor}</h4>
            <div className="lot-card-meta"><span>🏷️ {lot.category}</span><span>📦 {lot.qty}</span><span>📅 {lot.date}</span></div>
            <div className="lot-card-actions"><button className="btn-outline-sm">View Details</button><button className="btn-track">📍 Track</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVIEWS PAGE
───────────────────────────────────────────── */
function ReviewsPage() {
  const [filter, setFilter] = useState("all");
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: "", text: "", rating: 5 });

  const filtered = filter === "all" ? reviews : reviews.filter(r => r.type === filter);
  const posCount = reviews.filter(r => r.type === "positive").length;
  const negCount = reviews.filter(r => r.type === "negative").length;
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  const addReview = () => {
    if (!newReview.author || !newReview.text) return;
    setReviews(prev => [{ id: Date.now(), type: newReview.rating >= 3 ? "positive" : "negative", author: newReview.author, role: "Receiver", date: new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}), rating: newReview.rating, text: newReview.text, avatar: newReview.author.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(), lotId: "LOT-2024-NEW" }, ...prev]);
    setShowForm(false); setNewReview({ author: "", text: "", rating: 5 });
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div><h1 className="page-title">Reviews</h1><p className="page-subtitle">Feedback and ratings from receivers across all lots</p></div>
        <button className="btn-request" onClick={() => setShowForm(!showForm)}>✏️ Write Review</button>
      </div>
      <div className="reviews-summary">
        <div className="review-stat-card review-stat-card--green"><span className="review-stat-emoji">😊</span><span className="review-stat-num">{posCount}</span><span className="review-stat-label">Positive Reviews</span></div>
        <div className="review-stat-card review-stat-card--red"><span className="review-stat-emoji">😞</span><span className="review-stat-num">{negCount}</span><span className="review-stat-label">Negative Reviews</span></div>
        <div className="review-stat-card review-stat-card--gold"><span className="review-stat-emoji">⭐</span><span className="review-stat-num">{avgRating}</span><span className="review-stat-label">Average Rating</span></div>
        <div className="review-stat-card review-stat-card--blue"><span className="review-stat-emoji">📋</span><span className="review-stat-num">{reviews.length}</span><span className="review-stat-label">Total Reviews</span></div>
      </div>
      {showForm && (
        <div className="form-card">
          <h3 className="form-card-title">Submit Your Review</h3>
          <div className="form-grid">
            <div className="form-field"><label>Your Name</label><input className="rd-input" placeholder="Full name" value={newReview.author} onChange={e => setNewReview(p=>({...p,author:e.target.value}))} /></div>
            <div className="form-field"><label>Rating</label><div className="star-input">{[1,2,3,4,5].map(n => <button key={n} className={`star-btn ${newReview.rating>=n?"star-btn--active":""}`} onClick={()=>setNewReview(p=>({...p,rating:n}))}>★</button>)}</div></div>
            <div className="form-field form-field--full"><label>Your Review</label><textarea className="rd-input rd-textarea" placeholder="Share your experience..." value={newReview.text} onChange={e=>setNewReview(p=>({...p,text:e.target.value}))} rows={4} /></div>
          </div>
          <div className="form-actions"><button className="btn-cancel" onClick={()=>setShowForm(false)}>Cancel</button><button className="btn-request" onClick={addReview}>Submit Review</button></div>
        </div>
      )}
      <div className="reviews-filter-tabs">
        {["all","positive","negative"].map(f=><button key={f} className={`filter-tab ${filter===f?"filter-tab--active":""}`} onClick={()=>setFilter(f)}>{f==="all"?"All Reviews":f==="positive"?"😊 Positive":"😞 Negative"}</button>)}
      </div>
      <div className="reviews-grid">
        {filtered.map(r => (
          <div key={r.id} className={`review-card ${r.type==="negative"?"review-card--neg":"review-card--pos"}`}>
            <div className="review-card-header">
              <div className="review-avatar">{r.avatar}</div>
              <div className="review-meta"><span className="review-author">{r.author}</span><span className="review-role">{r.role}</span></div>
              <span className={`review-badge ${r.type==="positive"?"review-badge--pos":"review-badge--neg"}`}>{r.type==="positive"?"Positive":"Negative"}</span>
            </div>
            <div className="review-stars">{"★".repeat(r.rating)}<span className="review-stars-empty">{"★".repeat(5-r.rating)}</span></div>
            <p className="review-text">{r.text}</p>
            <div className="review-footer"><span className="review-lot">{r.lotId}</span><span className="review-date">{r.date}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TRACKING PAGE
───────────────────────────────────────────── */
function TrackingPage({ lots }) {
  const [selectedLot, setSelectedLot] = useState(lots.find(l => l.status === "In Transit") || lots[0]);
  const steps = ["Lot Created","Quality Checked","Pickup Confirmed","In Transit","Arrived at Hub","Out for Delivery","Delivered"];
  const stepIdx = selectedLot.status === "In Transit" ? 3 : selectedLot.status === "Confirmed" ? 2 : selectedLot.status === "Received" ? 6 : 1;

  return (
    <div className="page-content">
      <div className="page-header">
        <div><h1 className="page-title">Live Tracking</h1><p className="page-subtitle">Real-time lot tracking and delivery status</p></div>
        <StatusBadge status={selectedLot.status} />
      </div>
      <div className="tracking-layout">
        <div className="tracking-sidebar">
          <h3 className="tracking-sidebar-title">Select Lot</h3>
          {lots.map(lot => (
            <button key={lot.id} className={`tracking-lot-item ${selectedLot.id===lot.id?"tracking-lot-item--active":""}`} onClick={()=>setSelectedLot(lot)}>
              <span className="tracking-lot-id">{lot.id}</span>
              <span className="tracking-lot-donor">{lot.donor}</span>
              <StatusBadge status={lot.status} />
            </button>
          ))}
        </div>
        <div className="tracking-main">
          <div className="tracking-map-card">
            <div className="tracking-map-header">
              <div><h3 className="tracking-map-title">{selectedLot.id} — {selectedLot.donor}</h3><p className="tracking-map-sub">{selectedLot.category} · {selectedLot.qty}</p></div>
              <span className={`tracking-status-pill ${selectedLot.status==="In Transit"?"tracking-status-pill--transit":""}`}>{selectedLot.status==="In Transit"?"🔴 En Route":selectedLot.status==="Received"?"✅ Delivered":"⏳ Awaiting"}</span>
            </div>
            <div className="tracking-map-placeholder">
              <div className="tracking-map-inner">
                <div className="tracking-pin"><span className="pin-label">Pune (Origin)</span></div>
                <div className="tracking-route-line"><div className="tracking-truck">🚚</div></div>
                <div className="tracking-pin tracking-pin--dest"><span className="pin-label">Mumbai Hub</span></div>
              </div>
              <p className="tracking-map-note">📍 Live map integration · Estimated arrival: 2h 30m</p>
            </div>
          </div>
          <div className="tracking-timeline-card">
            <h3 className="tracking-timeline-title">Delivery Timeline</h3>
            <div className="tracking-timeline">
              {steps.map((step, i) => (
                <div key={i} className={`timeline-step ${i<=stepIdx?"timeline-step--done":""} ${i===stepIdx?"timeline-step--current":""}`}>
                  <div className="timeline-dot">
                    {i<stepIdx?<svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polyline points="20 6 9 17 4 12"/></svg>:i===stepIdx?<div className="timeline-dot-pulse"/>:null}
                  </div>
                  {i<steps.length-1&&<div className={`timeline-line ${i<stepIdx?"timeline-line--done":""}`}/>}
                  <div className="timeline-content">
                    <span className="timeline-step-label">{step}</span>
                    {i<=stepIdx&&<span className="timeline-step-time">{i===0?"22 Aug · 09:00 AM":i===1?"22 Aug · 11:30 AM":i===2?"23 Aug · 08:00 AM":i===3?"23 Aug · 10:15 AM":""}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEEDBACK PAGE
───────────────────────────────────────────── */
function FeedbackPage({ lots }) {
  const [submitted, setSubmitted] = useState([...feedbackHistory]);
  const [form, setForm] = useState({ lotId: lots[0]?.id || "", subject: "", message: "", rating: 5, category: "Quality" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!form.subject || !form.message) return;
    setSubmitted(prev => [{ id: Date.now(), lotId: form.lotId, subject: form.subject, date: new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}), status: "Pending", rating: form.rating }, ...prev]);
    setSuccess(true);
    setForm({ lotId: lots[0]?.id||"", subject:"", message:"", rating:5, category:"Quality" });
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <div className="page-content">
      <div className="page-header"><div><h1 className="page-title">Feedback</h1><p className="page-subtitle">Submit feedback on lot quality, delivery, and platform experience</p></div></div>
      {success && <div className="success-banner">✅ Feedback submitted successfully! Our team will review it shortly.</div>}
      <div className="feedback-layout">
        <div className="feedback-form-card">
          <h3 className="form-card-title">Submit New Feedback</h3>
          <div className="form-grid">
            <div className="form-field"><label>Lot Reference</label><select className="rd-input" value={form.lotId} onChange={e=>setForm(p=>({...p,lotId:e.target.value}))}>{lots.map(l=><option key={l.id} value={l.id}>{l.id} — {l.donor}</option>)}</select></div>
            <div className="form-field"><label>Category</label><select className="rd-input" value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))}>{["Quality","Delivery","Packaging","Platform","Other"].map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="form-field"><label>Rating</label><div className="star-input">{[1,2,3,4,5].map(n=><button key={n} className={`star-btn ${form.rating>=n?"star-btn--active":""}`} onClick={()=>setForm(p=>({...p,rating:n}))}>★</button>)}<span className="star-label">{form.rating}/5</span></div></div>
            <div className="form-field"><label>Subject</label><input className="rd-input" placeholder="Brief subject" value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))} /></div>
            <div className="form-field form-field--full"><label>Detailed Message</label><textarea className="rd-input rd-textarea" placeholder="Describe your experience in detail..." rows={5} value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} /></div>
          </div>
          <div className="form-actions"><button className="btn-request" onClick={handleSubmit}>Submit Feedback</button></div>
        </div>
        <div className="feedback-history-card">
          <h3 className="form-card-title">Submission History</h3>
          <div className="feedback-history-list">
            {submitted.map((fb,i) => (
              <div key={i} className="feedback-history-item">
                <div className="feedback-history-top"><span className="feedback-history-lot">{fb.lotId}</span><span className={`feedback-status ${fb.status==="Reviewed"?"feedback-status--reviewed":"feedback-status--pending"}`}>{fb.status}</span></div>
                <p className="feedback-history-subject">{fb.subject}</p>
                <div className="feedback-history-meta"><span>{"★".repeat(fb.rating)}<span style={{opacity:0.25}}>{"★".repeat(5-fb.rating)}</span></span><span className="feedback-history-date">{fb.date}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HISTORY PAGE
───────────────────────────────────────────── */
function HistoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = historyLots.filter(l => {
    const ms = l.id.toLowerCase().includes(search.toLowerCase()) || l.donor.toLowerCase().includes(search.toLowerCase());
    return ms && (filter === "All" || l.status === filter);
  });

  return (
    <div className="page-content">
      <div className="page-header"><div><h1 className="page-title">Lot History</h1><p className="page-subtitle">Complete record of all past and completed lot transactions</p></div></div>
      <div className="history-summary">
        <div className="history-stat"><span className="history-stat-num">{historyLots.length}</span><span className="history-stat-label">Total Lots</span></div>
        <div className="history-stat"><span className="history-stat-num history-stat-num--green">{historyLots.filter(l=>l.status==="Received").length}</span><span className="history-stat-label">Successfully Received</span></div>
        <div className="history-stat"><span className="history-stat-num history-stat-num--red">{historyLots.filter(l=>l.status==="Rejected").length}</span><span className="history-stat-label">Rejected</span></div>
        <div className="history-stat"><span className="history-stat-num">775 kg</span><span className="history-stat-label">Total Volume</span></div>
      </div>
      <div className="history-controls">
        <input className="rd-input history-search" placeholder="🔍 Search by Lot ID or Donor..." value={search} onChange={e=>setSearch(e.target.value)} />
        <div className="history-filter-tabs">{["All","Received","Rejected"].map(f=><button key={f} className={`filter-tab ${filter===f?"filter-tab--active":""}`} onClick={()=>setFilter(f)}>{f}</button>)}</div>
      </div>
      <div className="lots-table-card">
        <div className="table-wrap">
          <table className="rd-table">
            <thead><tr><th>Lot ID</th><th>Donor</th><th>Category</th><th>Qty</th><th>Request Date</th><th>Completed On</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.length===0?<tr><td colSpan={7} className="table-empty">No records found.</td></tr>:filtered.map(lot=>(
                <tr key={lot.id}><td className="lot-id">{lot.id}</td><td>{lot.donor}</td><td>{lot.category}</td><td>{lot.qty}</td><td className="lot-date">{lot.date}</td><td className="lot-date">{lot.completedOn}</td><td><StatusBadge status={lot.status} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INNER NAV (Sidebar tabs)
───────────────────────────────────────────── */
function InnerNav({ activePage, onNav, notifications }) {
  const navItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "myLots",    label: "My Lots",  badge: 5 },
    { key: "reviews",   label: "Reviews" },
    { key: "tracking",  label: "Tracking" },
    { key: "feedback",  label: "Feedback", badge: notifications, badgeOrange: true },
    { key: "history",   label: "History" },
  ];
  return (
    <div className="rd-inner-nav">
      {navItems.map(item => (
        <button key={item.key} className={`rd-inner-nav-link ${activePage===item.key?"rd-inner-nav-link--active":""}`} onClick={()=>onNav(item.key)}>
          {item.label}
          {item.badge > 0 && <span className={`rd-nav-badge ${item.badgeOrange?"rd-nav-badge--orange":""}`}>{item.badge}</span>}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function ReceiverDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [lots, setLots] = useState(initialLots);
  const [notifCount] = useState(3);

  const handleAddLot = (newLot) => {
    setLots(prev => [...prev, newLot]);
  };

  const pages = {
    dashboard: <DashboardPage lots={lots} onNav={setActivePage} onAddLot={handleAddLot} />,
    myLots:    <MyLotsPage lots={lots} onAddLot={handleAddLot} />,
    reviews:   <ReviewsPage />,
    tracking:  <TrackingPage lots={lots} />,
    feedback:  <FeedbackPage lots={lots} />,
    history:   <HistoryPage />,
  };

  return (
    <div className="rd-app">
      <Navbar />
      <InnerNav activePage={activePage} onNav={setActivePage} notifications={notifCount} />
      <main className="rd-main">
        <div className="rd-content-wrap">
          {pages[activePage]}
        </div>
      </main>
      <Footer />
    </div>
  );
}