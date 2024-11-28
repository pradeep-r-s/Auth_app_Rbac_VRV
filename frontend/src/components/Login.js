import React, { useState } from 'react';
import axios from 'axios';
import './styles/Login.css';  // Import the CSS file

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0); // Track failed attempts
  const [lockoutTime, setLockoutTime] = useState(null); // Store lockout time

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if the account is locked due to multiple failed attempts
    if (lockoutTime && new Date().getTime() < lockoutTime) {
      const remainingTime = Math.ceil((lockoutTime - new Date().getTime()) / 1000);
      setErrorMessage(`Account locked. Try again in ${remainingTime} seconds.`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const { token } = response.data;

      // Reset failed attempts on successful login
      setFailedAttempts(0);
      setLockoutTime(null);

      // Check if the token exists before proceeding
      if (token) {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);

        // Decode JWT token to get user role
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode payload
          setUserRole(decodedToken.role); // Set user role
        } catch (err) {
          console.error('Error decoding token:', err);
          setErrorMessage('Invalid token format');
        }
      } else {
        setErrorMessage('Authentication failed');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);

      // Increment failed attempts counter
      setFailedAttempts(prevAttempts => prevAttempts + 1);

      // Lock account after 5 failed attempts for 5 minutes
      if (failedAttempts + 1 >= 5) {
        setLockoutTime(new Date().getTime() + 5 * 60 * 1000); // Lock for 5 minutes
        setErrorMessage('Too many failed attempts. Please try again in 5 minutes.');
      } else {
        setErrorMessage('Invalid credentials');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={lockoutTime && new Date().getTime() < lockoutTime}>
          Login
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="register-link">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
