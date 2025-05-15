import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import symptomsIcon from '../assets/navbar_logo/symptoms.png';
import chatIcon     from '../assets/navbar_logo/chat.png';
import uploadIcon   from '../assets/navbar_logo/image_upload.png';
import faqIcon      from '../assets/navbar_logo/faq.png';

import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>
            Your Personal <span className="highlight">Health AI</span>
          </h1>
          <p>
            Get instant access to AI-powered health insights, symptom checking, and more—all in one place.
          </p>
          <Link to="/symptoms" className="get-started-btn">
            Get Started
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <img src={chatIcon} alt="Chatbot" />
          <h3>Chatbot</h3>
          <p>Instant answers to your health questions.</p>
        </div>
        <div className="feature-card">
          <img src={symptomsIcon} alt="Symptoms Analysis" />
          <h3>Symptoms Analysis</h3>
          <p>Analyze your symptoms and get insights.</p>
        </div>
        <div className="feature-card">
          <img src={uploadIcon} alt="Image Upload" />
          <h3>Image Upload</h3>
          <p>Upload rashes, scans, and more for AI review.</p>
        </div>
        <div className="feature-card">
          <img src={faqIcon} alt="FAQ" />
          <h3>FAQ</h3>
          <p>Browse common health questions and answers.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
