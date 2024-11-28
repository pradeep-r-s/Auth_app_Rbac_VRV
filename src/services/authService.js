import axios from 'axios';

const apiUrl = 'http://localhost:5000'; // Adjust based on your backend

// Generic function to handle API requests
const axiosRequest = async (method, url, data = null, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios({
      method,
      url: `${apiUrl}${url}`,
      data,
      headers,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred',
    };
  }
};

// Register User
export const registerUser = async ({ username, email, password, role }) => {
  return axiosRequest('post', '/register', { username, email, password, role });
};

// Login User
export const loginUser = async ({ username, password }) => {
  const result = await axiosRequest('post', '/login', { username, password });
  if (result.success) {
    // Store the token in localStorage or context
    localStorage.setItem('token', result.data.token);
  }
  return result;
};

// Fetch User Profile
export const fetchUserProfile = async (token) => {
  return axiosRequest('get', '/profile', null, token);
};
