// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql2');
// const jwt = require('jsonwebtoken');
// const app = express();
// const port = 3000;

// // Create a MySQL connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//   } else {
//     console.log('Database connected.');
//   }
// });

// // Middleware to verify JWT
// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) {
//     return res.status(403).json({ message: 'No token provided.' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Failed to authenticate token.' });
//     }
//     req.userId = decoded.id; // Save the decoded user info to the request
//     next();
//   });
// };

// // // Route to get user details
// // app.get('/user/details', verifyToken, (req, res) => {
// //   const userId = req.userId;

// //   // Query the database to get user details
// //   const query = 'SELECT * FROM users WHERE id = ?';
// //   db.execute(query, [userId], (err, results) => {
// //     if (err) {
// //       return res.status(500).json({ message: 'Error fetching user details.' });
// //     }
    
// //     if (results.length === 0) {
// //       return res.status(404).json({ message: 'User not found.' });
// //     }

// //     res.json({ user: results[0] });
// //   });
// // });

// app.get('/profile', (req, res) => {
//   const token = req.headers['authorization']?.split(' ')[1];

//   if (!token) {
//     return res.status(403).json({ message: 'No token provided.' });
//   }

//   console.log('Token:', token);

//   jwt.verify(token, '1234', (err, decoded) => {
//     if (err) {
//       console.error('Error verifying token:', err);
//       return res.status(401).json({ message: 'Failed to authenticate token.' });
//     }

//     console.log('Decoded token:', decoded);

//     const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
//     db.query(query, [decoded.id], (err, results) => {
//       if (err) {
//         console.error('Database query error:', err);
//         return res.status(500).json({ message: 'Error fetching profile.' });
//       }

//       if (results.length === 0) {
//         console.log('User not found for ID:', decoded.id);
//         return res.status(404).json({ message: 'User not found' });
//       }

//       res.status(200).json({ username: results[0].username, role: results[0].role });
//     });
//   });
// });


// app.post('/login', (req, res) => {
//   const username = 'testUser'; // Use a real username and password check in a real app
//   const userId = 1; // The user's ID from your DB
  
//   const token = jwt.sign({ id: userId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ message: 'Login successful', token });
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'rbac_db',
  port: 3308,
});

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Secret key for JWT
const secretKey = 'secrete_key';

// Dummy login credentials
const dummyUser = {
  username: 'm',
  password: 'm',
  role: 'admin', // for testing as admin
};

// Mock login API to issue JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate credentials (You'd check from DB in real-world)
  if (username === dummyUser.username && password === dummyUser.password) {
    const token = jwt.sign({ username, role: dummyUser.role }, secretKey, {
      expiresIn: '1h',
    });
    return res.json({ message: 'Login successful', token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
};

// Admin route to fetch all users
app.get('/users', verifyToken, (req, res) => {
  // Only allow access if the user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  // Fetch users from DB (for testing, I'm using static data)
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users', error: err });
    }

    return res.json({ users: results });
  });
});

// Server start
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
