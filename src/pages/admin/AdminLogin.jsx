import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../assets/AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/admin/login', data);
      localStorage.setItem('token', response.data.token);
      console.log(response.data.token);
      // Redirect to dashboard upon successful login
      navigate('/admin/dashboard');
      // Reset the form
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="adminLoginContainer">
      <FontAwesomeIcon icon={faTimes} className="close-icon"/>
      <h2>Administrator Login</h2>
      <form className = "loginForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email<FontAwesomeIcon icon={faEnvelope} className="input-icon" /></label> {/* Include Font Awesome icon */}
          <input type="email" placeholder = "Enter Email"
          {...register('email', { required: 'Email is required' })} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label>Password<FontAwesomeIcon icon={faLock} className="input-icon" /></label> {/* Include Font Awesome icon */}
          <input type="password" placeholder = "Enter Password"
           {...register('password', { required: 'Password is required' })} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        {error && <div>{error}</div>}
        <button type="submit" className ="adminLoginbtn">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
