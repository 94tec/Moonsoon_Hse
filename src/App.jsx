import React from 'react';
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
import Tenants from './pages/Tenants';
// import Footer from './components/layout/Footer'

function App() {

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
      </Routes>
    </Router>
  );
}

export default App
