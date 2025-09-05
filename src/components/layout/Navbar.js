import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/users") {
      return location.pathname === "/users" || location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/users" className="navbar-brand">
          <span className="brand-icon">👥</span>
          <span className="brand-text"> User Management Dashboard</span>
        </Link>

        <div className="navbar-nav">
          <Link
            to="/users"
            className={`nav-link ${isActive("/users") ? "active" : ""}`}
          >
            All Users
          </Link>
          <Link
            to="/users/create"
            className={`nav-link ${isActive("/users/create") ? "active" : ""}`}
          >
            Create User
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
