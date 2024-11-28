import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated (e.g., check for a token in localStorage)
  const token = localStorage.getItem('token'); // or get token from context/store

  if (!token) {
    // Redirect to login page if no token is found
    return <Navigate to="/login" replace />;
  }

  // Render the children (the protected component)
  return children;
};

export default PrivateRoute;
