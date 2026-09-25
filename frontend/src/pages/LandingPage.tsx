import { Link } from "react-router-dom";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheck,
  FiChevronRight,
  FiGrid,
  FiUsers,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();
  return (
    <main className="auth-shell landing-page">
      <div className="landing-grid" />
      <nav className="landing-nav">
        <Link to="/" className="brand-mark">
          <span className="brand-icon">
            <FiUsers />
          </span>
          <span>Cliently</span>
        </Link>
        <div className="nav-actions">
          {user ? (
            <Link to="/dashboard" className="button button-dark button-small">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-login">
                Log in
              </Link>
              <Link to="/signup" className="button button-dark button-small">
                Get started <FiArrowUpRight />
              </Link>
            </>
          )}
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> CUSTOMER OPERATIONS, SIMPLIFIED
          </p>
          <h1>
            Know your clients.
            <br />
            <em>Grow with confidence.</em>
          </h1>
          <p className="hero-description">
            One calm, clear workspace for every relationship that moves your
            business forward.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="button button-primary">
                Enter dashboard <FiArrowUpRight />
              </Link>
            ) : (
              <Link to="/signup" className="button button-primary">
                Create an account
              </Link>
            )}
          </div>
          <div className="trust-note">
            <FiCheck /> Built for teams that care about every detail
          </div>
        </div>

        <div className="hero-visual" aria-label="Customer overview preview">
          <div className="dashboard-preview">
            <div className="preview-sidebar">
              <div className="preview-sidebar-logo">
                <span className="preview-logo-icon">
                  <FiGrid />
                </span>
                <strong>Cliently</strong>
              </div>
              <span className="preview-sidebar-label">Workspace</span>
              <span className="preview-nav-item active">
                <FiActivity /> Overview
              </span>
              <span className="preview-nav-item">
                <FiUsers /> Customers
              </span>
              <span className="preview-nav-item">
                <FiCheck /> Tasks
              </span>
            </div>
            <div className="preview-content">
              <div className="preview-topline">
                <span className="preview-kicker">OVERVIEW / JUNE 24</span>
                <span className="live-dot">Live</span>
              </div>
              <div className="preview-heading">
                <strong>Good morning, Bader</strong>
                <span>Tuesday, 24 Jun</span>
              </div>
              <div className="metric-row">
                <div className="metric-card">
                  <span>Total clients</span>
                  <strong>1,284</strong>
                  <small>
                    +12.8% <i>this month</i>
                  </small>
                </div>
                <div className="metric-card accent">
                  <span>Active reach</span>
                  <strong>86.4%</strong>
                  <small>
                    +4.2% <i>this month</i>
                  </small>
                </div>
              </div>
              <div className="preview-chart">
                <div className="list-title">
                  <span>Client activity</span>
                  <span>Last 7 days</span>
                </div>
                <div className="chart-bars" aria-hidden="true">
                  <i style={{ height: "42%" }} />
                  <i style={{ height: "64%" }} />
                  <i style={{ height: "52%" }} />
                  <i style={{ height: "78%" }} />
                  <i style={{ height: "58%" }} />
                  <i style={{ height: "88%" }} />
                  <i style={{ height: "70%" }} />
                </div>
              </div>
              <div className="preview-list">
                <div className="list-title">
                  <span>Recent clients</span>
                  <span>
                    View all <FiChevronRight />
                  </span>
                </div>
                <div className="client-line">
                  <b>AM</b>
                  <span>
                    <strong>Amelia Morgan</strong>
                    <small>Updated 2 min ago</small>
                  </span>
                  <i>Active</i>
                </div>
                <div className="client-line">
                  <b className="lavender">KO</b>
                  <span>
                    <strong>Khaled Omar</strong>
                    <small>Updated 18 min ago</small>
                  </span>
                  <i>Active</i>
                </div>
              </div>
            </div>
          </div>
          <div className="floating-stat">
            <span className="stat-check">
              <FiCheck />
            </span>
            <span>
              <strong>+24%</strong>
              <small>client growth</small>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
