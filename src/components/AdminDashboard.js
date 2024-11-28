import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [adminData, setAdminData] = useState(null); // Store admin data
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if no token (not logged in)
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch current admin data
    const fetchAdminData = async () => {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
        setAdminData({ username: decodedToken.username, email: decodedToken.email });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    // Fetch users list
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData(); // Fetch admin data
    fetchUsers(); // Fetch users list
  }, [token, navigate]);

  const handleRoleChange = async (userId, role) => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${userId}/role`, { role }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        alert('Role updated successfully');
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? { ...user, role } : user))
        );
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  const handleRoleSelect = (event, userId) => {
    setSelectedRole((prevSelectedRole) => ({
      ...prevSelectedRole,
      [userId]: event.target.value,
    }));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null); // Set token state to null to trigger re-render
    navigate('/login');
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Admin Info and Logout */}
      <div className="admin-info">
        <h2>Welcome, {adminData?.username}</h2>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>

      {/* Admin Dashboard Table */}
      <h1>Manage Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={selectedRole[user.id] || user.role}
                  onChange={(event) => handleRoleSelect(event, user.id)}
                  className="role-select"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => handleRoleChange(user.id, selectedRole[user.id] || user.role)}
                  className="update-button"
                >
                  Update Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
