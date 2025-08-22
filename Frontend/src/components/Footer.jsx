import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookMessenger, FaWhatsapp, FaTwitter, FaSkype } from 'react-icons/fa';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <Link to="/">
          <img src={logo} alt="Mitchell Grand Logo" />
        </Link>
      </div>

      <div className="footer-info">
        <ul>
          <li>No: 107/E2, Arangapolawatta Weliwita, Kaduwela 10640</li>
          <li>0112 579 900</li>
          <li>mitchellgrandhotels@gmail.com</li>
          <li className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://m.me/" target="_blank" rel="noopener noreferrer"><FaFacebookMessenger /></a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://skype.com" target="_blank" rel="noopener noreferrer"><FaSkype /></a>
          </li>
          <li className="rights">© 2025 Outing Aura LK. All Rights Reserved</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
