// File: src/pages/Home.jsx

import React from 'react';
import '../assets/Home.css'; // Make sure to import the CSS file correctly
import UserDetails from '../components/layout/UserDetails';

const Home = () => {
  return (
    <div className="home-container">
      <div className="topnav">
        <UserDetails />
      </div>
      <div className="sidenav">Side Navigation</div>
      <div className="main">
        {/* You can further divide this area or populate it with other components */}
      </div>
    </div>
  );
};

export default Home;
