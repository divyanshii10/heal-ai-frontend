import React from 'react';
import './Footer.css';
import healaiLogo from '../assets/healai_logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src={healaiLogo} alt="Heal.ai Logo" className="footer-logo" />
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Sorry yaar pls talk to me</p>
        <p>© {new Date().getFullYear()} Heal.ai. All rights reserved.</p>
        <p>R-73, Roshan Bagh, Dayal Bagh, Agra, UttarPradesh, India</p>
        <p>Email: divyanshikulshrestha3@gmail.com | Phone: +91 8439495593</p>
      </div>
    </footer>
  );
};

export default Footer;
