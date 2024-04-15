import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock, faTimes,faPhone, faIdCardAlt } 
from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './SignUpForm.css'; // Import your CSS file for styling

const SignUpForm = ({ onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isVisible, setIsVisible] = useState(true); // State variable to control visibility

  useEffect(() => {
    // Reset the form to its default values when the component mounts
    reset();
  }, [reset]);

  const handleClose = () => {
    setIsVisible(false); // Set visibility to false
    onClose(); // Call onClose function
  };

  const signUpUser = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
      passwordMismatch();
      throw new Error('Passwords do not match');
    }
    try {
      const response = await axios.post('http://localhost:8000/auth/register', userData);
      console.log(response.data);
      onSuccess();
      reset(); // Reset the form
      notifySuccess();
    } catch (error) {
      console.error('Error:', error);
      notifyError();
    }
  };

  const onSubmit = async (userData) => {
    await signUpUser(userData);
  };
  const renderPasswordErrorMessages = () => {
    if (errors.password && errors.confirmPassword) {
      return (
        <span className="error-message">Passwords must be at least 8 characters long!!!!</span>
      );
    } else {
      return (
        <div>
          {errors.password && <span className="error-message">Password must be at least 8 characters long!!!</span>}
          {errors.confirmPassword && <span className="error-message">Confirm Password must be at least 8 characters long!!!</span>}
        </div>
      );
    }
  };
  
  const renderErrorMessages = (fieldName) => {
    if (errors[fieldName]) {
      return <span className="error-message">{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required</span>;
    }
    return null;
  };

  const notifySuccess = () => {
    toast.success('User created successfully! Please Sign in to use our features', {
      position: 'top-center',
      draggable: true,
    });
  };

  const notifyError = () => {
    toast.error('An error occurred! Failed to create a user. Please try again.', {
      position: 'top-center',
      draggable: true,
    });
  };
  const passwordMismatch = () => {
    toast.warning('Password do not match! Please confirm your Provided Passwords.', {
      position: 'bottom-center',
      draggable: true,
    });
  };
  return isVisible ? ( // Render form only if isVisible is true
    <div className="signup-form-container">
      <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleClose} />
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className='column'>
        {/* First Name */}
            <div className="form-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input type="text" placeholder="First Name"
                className='input-field'
                {...register('firstname', { required: true })} 
                autoComplete="off" // Disable autocomplete
                defaultValue="" 
            />
            {renderErrorMessages('firstname')}
            </div>

            {/* Middle Name */}
            <div className="form-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input type="text" placeholder="Middle Name"
                className='input-field'
                {...register('middlename')} 
                autoComplete="off" // Disable autocomplete
                defaultValue="" 
            />
            </div>
            {/* Last Name */}
            <div className="form-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input type="text" placeholder="Last Name"
                className='input-field'
                {...register('lastname', { required: true })} 
                autoComplete="off" // Disable autocomplete
                defaultValue="" 
            />
            {renderErrorMessages('lastname')}
            </div>
        </div>
        <div className='column'>
           {/*User Name */}
           <div className="form-group">
              <FontAwesomeIcon icon={faIdCardAlt} className="input-icon" />
            <input type="text" placeholder="User Name"
                className='input-field'
                {...register('username')} 
                autoComplete="off" // Disable autocomplete
                defaultValue="" 
            />
            {renderErrorMessages('username')}
            </div>
            {/* Phone Number */}
            <div className="form-group">
              <FontAwesomeIcon icon={faPhone} className="input-icon" />
              <input type="number" placeholder="Phone Number"
                className='input-field'
                {...register('phonenumber')} 
                autoComplete="off" // Disable autocomplete
                defaultValue="" 
              />
            </div>
              {/* ID */}
              <div className="form-group">
                <FontAwesomeIcon icon={faIdCardAlt} className="input-icon" />
                <input type="number" placeholder="ID"
                  className='input-field'
                  {...register('id')} 
                 autoComplete="off" // Disable autocomplete
                  defaultValue="" 
                />
            </div>
        </div>
        <div className="form-group">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input type="email" placeholder="Email"
            className='input-field'
            {...register('email', { required: true })} 
            autoComplete="off" // Disable autocomplete
            defaultValue="" 
        />
        {renderErrorMessages('email')}
        </div>
        {/* password */}
        <div className="form-group">
        <FontAwesomeIcon icon={ faLock} className="input-icon" />
        <input type="password" placeholder="Password" className='input-field' 
            {...register('password', { required: true, minLength: 8})}
            autoComplete="off" // Disable autocomplete
            defaultValue="" 
        />
        {renderPasswordErrorMessages()}
        </div>
        {/* confirm password */}
        <div className="form-group">
        <FontAwesomeIcon icon={ faLock} className="input-icon" />
        <input type="password" placeholder="Confirm Password" className='input-field' 
            {...register('confirmPassword', { required: true, minLength: 8})}
            autoComplete="off" // Disable autocomplete
            defaultValue="" 
        />
        {renderPasswordErrorMessages()}
        </div>
        {/* Submit Button */}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  ) : null; // Return null if isVisible is false
};

export default SignUpForm;
