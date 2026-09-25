import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheck,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const { signup, error } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(form.username, form.email, form.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="auth-shell auth-page">
      <div className="auth-panel auth-panel-visual signup-visual">
        <Link to="/" className="brand-mark">
          <span className="brand-icon">
            <FiArrowUpRight />
          </span>
          <span>Cliently</span>
        </Link>
        <div className="auth-quote">
          <span>“</span>
          <h1>
            Your best work
            <br />
            <em>starts together.</em>
          </h1>
          <p>Bring your whole client story into focus.</p>
          <div className="auth-benefits">
            <span>
              <FiCheck /> Set up your workspace in minutes
            </span>
            <span>
              <FiCheck /> Keep every follow-up visible
            </span>
          </div>
        </div>
        <div className="auth-page-number">
          02 <span>/ 03</span>
        </div>
      </div>
      <div className="auth-panel auth-form-panel">
        <Link to="/" className="back-link">
          <FiArrowLeft /> Back to home
        </Link>
        <div className="form-wrap">
          <p className="eyebrow">START FRESH</p>
          <h2>Create your workspace</h2>
          <p className="form-intro">
            Everything you need to build better relationships.
          </p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <p
              className={` ${error ? "opacity-100" : "opacity-0"} transition-opacity duration-300 text-md my-5 text-red-500 text-center `}
            >
              {error}
            </p>
            <label>
              Full name
              <div className="input-wrap">
                <FiUser />
                <input
                  type="text"
                  placeholder="Your name"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
            <label>
              Work email
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
              Create password
              <div className="input-wrap">
                <FiLock />
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>
            <button type="submit" className="button button-dark form-submit">
              Create account <FiArrowUpRight />
            </button>
          </form>
          <p className="terms">
            <FiCheck /> By continuing, you agree to our Terms and Privacy
            Policy.
          </p>
          <p className="form-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
