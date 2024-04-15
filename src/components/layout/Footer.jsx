// Footer.jsx

import React from 'react';
import '../../assets/Footer.css'; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; 2024 94tec Tenants Mgt. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
