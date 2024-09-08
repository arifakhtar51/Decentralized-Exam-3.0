// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 ExamPortal. All rights reserved.</p>
        <p>
          <a href="/terms" className="footer-link">Terms of Service</a> | 
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
