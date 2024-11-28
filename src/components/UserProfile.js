import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/UserProfile.css';  // Import the CSS for styling

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    window.location.href = '/login';   // Redirect to the login page
  };

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <table className="profile-table">
        <tbody>
          <tr>
            <td rowSpan="4" className="profile-photo">
              {/* Placeholder for profile photo */}
              <img
                src={userProfile.profilePhoto || 'https://via.placeholder.com/100'} // Default image if no photo
                alt="Profile"
                className="profile-img"
              />
            </td>
            <th>Username:</th>
            <td>{userProfile.username}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{userProfile.email}</td>
          </tr>
          <tr>
            <th className="role-highlight">Role:</th> {/* Highlight the word 'Role' */}
            <td>{userProfile.role}</td>
          </tr>
        </tbody>
      </table>
      {/* Logout button inside the profile container */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
