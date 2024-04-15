import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/Home.css'; // Make sure to import the CSS file correctly

const UserDetails = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile();
    }
  }, []);

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
  
      const { firstname, lastname, email } = response.data;
      setFullName(`${firstname} ${lastname}`);
      setEmail(`${email}`);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  

  return (
    <div className="introductionArea">
      <h2>Welcome to My App</h2>
      <p className="intro-text">This is a fantastic application designed to make your life easier with managing tenants easily.</p>
      {isLoggedIn ? (
        <div className="user-details">
          <p>{fullName}</p>
          <p>{email}</p>
        </div>
      ) : (
        <p>Please log in to view your user details.</p>
      )}
    </div>
  );
};

export default UserDetails;
