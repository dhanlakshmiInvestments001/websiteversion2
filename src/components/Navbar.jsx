import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; // You'll create this CSS file

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src="logo-only.PNG" alt="DhanaLakshmi Investments Logo"></img>DhanaLakshmi Investments</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/about-us" className={location.pathname === "/about-us" ? "active" : ""}>About Us</Link>
        <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>Services</Link>
        <Link to="/contact-us" className={location.pathname === "/contact-us" ? "active" : ""}>Contact Us</Link>
      </div>
    </nav>
  );
}

export default Navbar;


///coo=mment to check my github