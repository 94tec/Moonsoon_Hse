import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import googleLogo from './google-logo.png';
import './LoginForm.css'; // Import your CSS file for styling

const LoginForm = ({ onClose, onSuccessLogin }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    reset();
  }, [reset]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const renderErrorMessages = () => {
    if (errors.username && errors.password) {
      return (
        <span className="error-message">Please fill in all fields!</span>
      );
    } else {
      return (
        <div>
          {errors.username && <span className="error-message">User Name is required!!!</span>}
          {errors.password && <span className="error-message">Password is required!!!</span>}
        </div>
      );
    }
  };

  const loginUser = async (userData) => {
    let toastId = null;
    try {
      toastId = toast.loading('Logging in...', {
        position: 'top-center',
        draggable: true,
    }); // Show loading toast
      const response = await axios.post('http://localhost:8000/api/auth/login', userData);
      const { token, refreshToken } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      console.log(token);
      setIsLoggedIn(true); // Set login status to true
      onSuccessLogin();
      navigate('/');
      reset();
      toast.dismiss(toastId); // Dismiss loading toast
      toast.success('User logged in successfully!', {
        position: 'top-center',
        draggable: true,
      });
    } catch (error) {
      console.error('Error:', error);
      toast.dismiss(toastId); // Dismiss loading toast
      toast.error('An error occurred! Failed to log in. Please try again.', {
        position: 'top-center',
        draggable: true,
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const onSubmit = async (userData) => {
    await loginUser(userData);
  };

  return (
    <div>
      {/* Blurred background */}
      {isLoading && <div className="blur-background"></div>}

      {/* Loading toast */}
      {isLoading && (
        <div className="loading-toast">
          Logging in...
        </div>
      )}

      {/* Login form */}
      {isVisible && (
        <div className="login-form-container">
          <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleClose} />
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="form-group">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input type="text" placeholder="Enter your User Name"
                className='input-field'
                {...register('username', { required: true })}
                autoComplete="off"
                defaultValue=""
              />
              {renderErrorMessages()}
            </div>
            <div className="form-group">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input type="password" placeholder="Enter your Password"
                className='input-field'
                {...register('password', { required: true })}
                autoComplete="off"
                defaultValue=""
              />
              {renderErrorMessages()}
            </div>
            <button type="submit" className="login-button">Login</button>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="button" className="login-via-google">
              Login via
              <img src={googleLogo} className="google-logo"/>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
