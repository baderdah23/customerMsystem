import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheck,
  FiLock,
  FiMail,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
const LoginPage = () => {
  const { login, error } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(form.email, form.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="auth-shell auth-page">
      <div className="auth-panel auth-panel-visual">
        <Link to="/" className="brand-mark">
          <span className="brand-icon">
            <FiArrowUpRight />
          </span>
          <span>Cliently</span>
        </Link>
        <div className="auth-quote">
          <span>“</span>
          <h1>
            Make every
            <br />
            <em>connection count.</em>
          </h1>
          <p>A clearer view of your clients starts here.</p>
          <div className="auth-benefits">
            <span>
              <FiCheck /> One place for every relationship
            </span>
            <span>
              <FiCheck /> Context that keeps your team moving
            </span>
          </div>
        </div>
        <div className="auth-page-number">
          01 <span>/ 03</span>
        </div>
      </div>
      <div className="auth-panel auth-form-panel">
        <Link to="/" className="back-link">
          <FiArrowLeft /> Back to home
        </Link>
        <div className="form-wrap">
          <p className="eyebrow">WELCOME BACK</p>
          <h2>Sign in to your workspace</h2>
          <p className="form-intro">Pick up exactly where you left off.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <p
              className={`${error ? "opacity-100" : "opacity-0"} transition-opacity duration-300 text-md my-5 text-red-500 text-center`}
            >
              {error}
            </p>

            <label>
              Email address
              <div className="input-wrap">
                <FiMail />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
            <label>
              Password
              <div className="input-wrap">
                <FiLock />
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
            <div className="form-meta">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" className="text-button">
                Forgot password?
              </button>
            </div>
            <button type="submit" className="button button-dark form-submit">
              Sign in <FiArrowUpRight />
            </button>
          </form>
          <p className="form-switch">
            New to Cliently? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
};
export default LoginPage;
