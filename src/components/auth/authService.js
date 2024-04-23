// authService.js

// Assume this function checks the validity of the user's authentication token
export const checkTokenValidity = async () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (!token) {
      return false; // If token is not found, user is not authenticated
    }
  
    try {
      // Perform a request to your server to validate the token
      const response = await fetch('http://localhost:8000/api/auth/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
  
      if (response.ok) {
        return true; // Token is valid
      } else {
        return false; // Token is invalid
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return false; // Error occurred while verifying token
    }
  };
  