import React from "react";
import "./Footer.css"; // You'll create this CSS file
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>© 2025 All rights reserved.</p>
      </div>
      <div className="footer-icons">
        <a href="https://facebook.com/HUTNoni" target="_blank" rel="noreferrer"><FaFacebook /></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
        <a href="https://x.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href="https://linkedin.com/in/anubhavsharma9/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
      </div>
      <div className="footer-blog">
        <Link to="/write-blog">Write Blog</Link>
      </div>
    </footer>
  );
}

export default Footer;
