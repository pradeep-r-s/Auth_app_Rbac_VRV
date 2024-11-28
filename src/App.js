import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Check if a user is logged in by checking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setIsAuthenticated(true);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error('Token decoding failed:', error);
        logout();
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={isAuthenticated ? <Navigate to={userRole === 'admin' ? "/admin" : "/profile"} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
