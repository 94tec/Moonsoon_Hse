import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import './App.css'
import NavigationBar from './components/layout/NavigationBar'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import Properties from './pages/Properties';
import AllProperties from './pages/AllProperties';
import Tenants from './pages/Tenants';
import InvoiceList from './pages/InvoiceList';
import { checkTokenValidity } from './components/auth/authService'; // Import token validation function
// import Footer from './components/layout/Footer'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await checkTokenValidity(); // Function to check token validity
      setIsLoggedIn(isAuthenticated);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <Router>
      <NavigationBar />
      <ToastContainer />
      <Routes>
        {/* admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* users routes */}
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/invoices" element={<InvoiceList />} />
      </Routes>
    </Router>
  );
}

export default App
