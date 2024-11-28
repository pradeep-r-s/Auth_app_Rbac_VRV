// const bcrypt = require('bcryptjs');
// const db = require('../config/db');

// const registerUser = async (username, email, password, role) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
//   db.query(query, [username, email, hashedPassword, role], (err, result) => {
//     if (err) throw err;
//     console.log('User registered:', result);
//   });
// };

// const authenticateUser = async (email, password) => {
//   return new Promise((resolve, reject) => {
//     db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
//       if (err) reject(err);
//       if (result.length === 0) reject('User not found');

//       const isPasswordValid = await bcrypt.compare(password, result[0].password);
//       if (!isPasswordValid) reject('Invalid password');

//       resolve(result[0]);
//     });
//   });
// };

// const getUserById = (userId) => {
//   return new Promise((resolve, reject) => {
//     db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
//       if (err) reject(err);
//       resolve(result[0]);
//     });
//   });
// };

// module.exports = { registerUser, authenticateUser, getUserById };
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user', // Default role is 'user'
  },
});

module.exports = User;
