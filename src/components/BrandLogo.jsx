// Logo.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons'
import '../assets/Logo.css'; // Importing our CSS for styling
import imgLogo from '../assets/icons8-94-64.png'

const BrandLogo = () => {
  return (
    <div className="logo-container">
      <span><FontAwesomeIcon icon={faCode} style={{width: '16px', height: '16px', color: '#000'}}/></span>
      <img src = {imgLogo}  className = "imgLogo"/>
    </div>
  );
};

export default BrandLogo;
