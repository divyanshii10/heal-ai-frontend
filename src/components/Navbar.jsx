import React, { useState } from 'react';
import './Navbar.css';

import healaiLogo from '../assets/healai_logo.png';//done
import chatIcon from '../assets/navbar_logo/chat.png';//done
import symptomsIcon from '../assets/navbar_logo/symptoms.png';//done
import imageUploadIcon from '../assets/navbar_logo/image_upload.png';//done
import featuresIcon from '../assets/navbar_logo/features.png'; //done
import faqIcon from '../assets/navbar_logo/faq.png';//done

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = [
    { label: 'Symptoms Analysis', icon: symptomsIcon, path: '/symptoms' },
    { label: 'Chatbot',          icon: chatIcon,       path: '/chatbot' },
    { label: 'Image Upload',     icon: imageUploadIcon,path: '/upload' },
    { label: 'Features',         icon: featuresIcon,   path: '/features' },
    { label: 'FAQ',              icon: faqIcon,        path: '/faq' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={healaiLogo} alt="Health Assistant" />
        <span className="navbar-title">
            Heal.<span className="highlight-ai">ai</span>
        </span>
        </div>

      <button
        className="navbar-toggle"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <span className={mobileOpen ? 'bar open' : 'bar'}></span>
        <span className={mobileOpen ? 'bar open' : 'bar'}></span>
        <span className={mobileOpen ? 'bar open' : 'bar'}></span>
      </button>

      <ul className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.path} onClick={() => setMobileOpen(false)}>
              <img src={item.icon} alt={`${item.label} icon`} />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
