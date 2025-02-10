import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Assuming you place the CSS here

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">URL Shortener</div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
