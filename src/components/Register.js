// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Import Link for routing
// import './styles/Register.css';  // Import the CSS file

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Validate if passwords match
//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/register', { username, email, password });
//       setSuccessMessage('User registered successfully');
//       setUsername('');
//       setEmail('');
//       setPassword('');
//       setConfirmPassword('');
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <div className="register-link">
//         <p>Already have an account? <Link to="/login">Sign In</Link></p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing
import './styles/Register.css';  // Import the CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordFeedback, setPasswordFeedback] = useState('');

  const validatePassword = (password) => {
    // Password constraints: minimum 8 characters, at least one number, one special character
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      setPasswordValid(false);
      setPasswordFeedback('Password must be at least 8 characters long.');
    } else if (!hasNumber.test(password)) {
      setPasswordValid(false);
      setPasswordFeedback('Password must contain at least one number.');
    } else if (!hasSpecialChar.test(password)) {
      setPasswordValid(false);
      setPasswordFeedback('Password must contain at least one special character.');
    } else {
      setPasswordValid(true);
      setPasswordFeedback('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Validate password before registration
    if (!passwordValid) {
      setErrorMessage('Please fix the password issues.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', { username, email, password });
      setSuccessMessage('User registered successfully');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          required
        />
        {/* Display password validation feedback */}
        <p className={`password-feedback ${passwordValid ? 'valid' : 'invalid'}`}>
          {passwordFeedback}
        </p>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={!passwordValid}>Register</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="register-link">
        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;
