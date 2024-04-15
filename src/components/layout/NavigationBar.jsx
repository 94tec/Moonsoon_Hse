import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import Logo from '../BrandLogo';
import axios from 'axios';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile();
    }
  }, []);
  const handleLoginClick = () => {
    setIsLoginFormVisible(true);
    setIsSignUpFormVisible(false);
  };

  const handleSignOut = () => {
    // Clear local storage and log out the user
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false); // Set login status to false
    notifySuccess();
    setIsLoginFormVisible(true);
  };

  const notifySuccess = () => {
    toast.success('User logged out successfully!', {
      position: 'top-center',
    });
  };

  const notifyError = () => {
    toast.error('An error occurred! Failed to log out. Please try again.', {
      position: 'top-center',
    });
  };

  const handleSignUpClick = () => {
    setIsSignUpFormVisible(true);
    setIsLoginFormVisible(false);
  };

  const handleSignUpSuccess = () => {
    setIsSignUpFormVisible(false);
    setIsLoginFormVisible(true);
  };

  const handleLoginSuccess = (token) => {
    setIsLoginFormVisible(false);
    setIsLoggedIn(true); // Set login status to true when login is successful
  };

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case 'profile':
        // Handle profile option
        break;
      case 'settings':
        // Handle settings option
        break;
      case 'signout':
        handleSignOut();
        break;
      default:
        break;
    }
  };
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.get('http://localhost:8000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { firstname, lastname } = response.data;
      setFullName(`${firstname} ${lastname}`);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  return (
    <div className="navbar">
      <div className="logo">
        <Logo />
        <h4>Cribaap</h4>
      </div>
      {isLoggedIn && (
        <div className="nav-links">
        <NavLink to="/" className="nav-link">
          <span className="indicator" />
          <span className="nav-text">Home</span>
        </NavLink>
        <NavLink to="/properties" className="nav-link">
          <span className="indicator" />
          <span className="nav-text">Properties</span>
        </NavLink>
        <NavLink to="/tenants" className="nav-link">
          <span className="indicator" />
          <span className="nav-text">Tenants</span>
        </NavLink>
        <NavLink to="/invoices" className="nav-link">
          <span className="indicator" />
          <span className="nav-text">Invoices</span>
        </NavLink>
        <NavLink to="/reports" className="nav-link">
          <span className="indicator" />
          <span className="nav-text">Reports</span>
        </NavLink>
        <NavLink to="/payments" className="nav-link">
          <span className="indicator" />
          <span className="nav-text">Payments</span>
        </NavLink>
        <NavLink to="/maintenance" className="nav-link">
          <span className="indicator" />
          <span className="nav-text">Maintenance Requests</span>
        </NavLink>
        <NavLink to="/documents" className="nav-link">
          <span className="indicator" />
          <span className="nav-text">Documents</span>
        </NavLink>
        {/* Add more navigation links for logged-in users here */}
      </div>
      )}
      <div className="profile-area">
        {!isLoggedIn ? (
          <>
            <button className="button" onClick={handleLoginClick}>
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Login</span>
            </button>
            <button className="button" onClick={handleSignUpClick}>
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Sign Up</span>
            </button>
          </>
        ) : (
          <>
            <button className="button" onClick={handleSignOut}>
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Sign Out</span>
            </button>
            <div className="user-profile-area">
              <select className="dropdown" onChange={handleOptionChange}>
                <option value="profile">{fullName ? fullName : 'Profile'}</option>
                <option value="settings">Settings</option>
                <option value="signout">Sign Out</option>
              </select>
            </div>
          </>
        )}
      </div>
      {isLoginFormVisible && (
        <LoginForm onClose={() => setIsLoginFormVisible(false)} onSuccessLogin={handleLoginSuccess} />
      )}
      {isSignUpFormVisible && (
        <SignUpForm onClose={() => setIsSignUpFormVisible(false)} onSuccess={handleSignUpSuccess} />
      )}
    </div>
  );
};

export default NavigationBar;
