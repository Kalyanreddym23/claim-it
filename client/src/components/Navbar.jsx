import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const close = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar container">
        <Link className="brand" to="/" onClick={close}>
          <span className="brand-mark">CI</span>
          <span className="brand-copy">
            <strong>Claim-It</strong>
            <small>Campus Lost &amp; Found</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <div className={`nav-links ${isOpen ? "nav-open" : ""}`}>
          <div className="nav-browse">
            <NavLink to="/" end onClick={close}>Home</NavLink>
            <NavLink to="/lost" onClick={close}>Lost items</NavLink>
            <NavLink to="/found" onClick={close}>Found items</NavLink>
          </div>

          <div className="nav-account">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" onClick={close}>Dashboard</NavLink>
                <Link className="nav-cta" to="/report/lost" onClick={close}>Report item</Link>
                <button className="link-button" type="button" onClick={() => { logout(); close(); }}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={close}>Log in</NavLink>
                <Link className="nav-cta" to="/register" onClick={close}>Get started</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
