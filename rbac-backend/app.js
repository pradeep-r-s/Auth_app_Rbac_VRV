// const express = require('express');
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Initialize the express app
// const app = express();

// // Enable CORS
// app.use(cors());

// // Middleware to parse incoming JSON data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // MySQL Database Connection
// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root', // Replace with your MySQL username
//   password: 'root', // Replace with your MySQL password
//   database: 'rbac_db', // Your database name
//   port: 3308 // Replace with your MySQL port (if it's different from the default)
// });

// // Establish the MySQL connection
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL Database:', err);
//     return;
//   }
//   console.log('Connected to MySQL Database.');
// });

// // User Registration Route
// // User Registration Route
// // app.post('/register', (req, res) => {
// //   const { username, email, password, role } = req.body;

// //   // Check if all fields are provided
// //   if (!username || !email || !password || !role) {
// //     return res.status(400).json({ message: 'All fields are required.' });
// //   }

// //   // Check if username already exists in the database
// //   const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
// //   db.query(checkUsernameQuery, [username], (err, result) => {
// //     if (err) {
// //       console.error('Error checking username:', err);
// //       return res.status(500).json({ message: 'Error checking username' });
// //     }

// //     if (result.length > 0) {
// //       return res.status(400).json({ message: 'Username already exists.' });
// //     }

// //     // Hash the password before saving it to the database
// //     bcryptjs.hash(password, 10, (err, hashedPassword) => {
// //       if (err) {
// //         console.error('Error hashing password:', err);
// //         return res.status(500).json({ message: 'Error hashing password.' });
// //       }

// //       // Check if email already exists in the database
// //       const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
// //       db.query(checkEmailQuery, [email], (err, result) => {
// //         if (err) {
// //           console.error('Error checking email:', err);
// //           return res.status(500).json({ message: 'Error checking email' });
// //         }

// //         if (result.length > 0) {
// //           return res.status(400).json({ message: 'Email already exists.' });
// //         }

// //         // Insert new user into the database
// //         const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
// //         db.query(query, [username, email, hashedPassword, role], (err, result) => {
// //           if (err) {
// //             console.error('Error inserting user:', err);
// //             return res.status(500).json({ message: 'Error saving user to database.' });
// //           }

// //           // Send success response
// //           return res.status(200).json({ message: 'User registered successfully' });
// //         });
// //       });
// //     });
// //   });
// // });
// // User Registration Route
// app.post('/register', (req, res) => {
//   const { username, email, password } = req.body;

//   // Set default role to 'user'
//   const role = 'user'; // This will automatically assign 'user' role to all registrations

//   // Check if all fields are provided
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'Username, email, and password are required.' });
//   }

//   // Check if username already exists in the database
//   const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
//   db.query(checkUsernameQuery, [username], (err, result) => {
//     if (err) {
//       console.error('Error checking username:', err);
//       return res.status(500).json({ message: 'Error checking username' });
//     }

//     if (result.length > 0) {
//       return res.status(400).json({ message: 'Username already exists.' });
//     }

//     // Hash the password before saving it to the database
//     bcryptjs.hash(password, 10, (err, hashedPassword) => {
//       if (err) {
//         console.error('Error hashing password:', err);
//         return res.status(500).json({ message: 'Error hashing password.' });
//       }

//       // Check if email already exists in the database
//       const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
//       db.query(checkEmailQuery, [email], (err, result) => {
//         if (err) {
//           console.error('Error checking email:', err);
//           return res.status(500).json({ message: 'Error checking email' });
//         }

//         if (result.length > 0) {
//           return res.status(400).json({ message: 'Email already exists.' });
//         }

//         // Insert new user into the database with the default 'user' role
//         const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
//         db.query(query, [username, email, hashedPassword, role], (err, result) => {
//           if (err) {
//             console.error('Error inserting user:', err);
//             return res.status(500).json({ message: 'Error saving user to database.' });
//           }

//           // Send success response
//           return res.status(200).json({ message: 'User registered successfully' });
//         });
//       });
//     });
//   });
// });



// // User Login Route
// // app.post('/login', async (req, res) => {
// //   const { username, password } = req.body;

// //   if (!username || !password) {
// //     return res.status(400).json({ message: 'Username and password are required' });
// //   }

// //   // Check if user exists in the database
// //   const query = 'SELECT * FROM users WHERE username = ?';
// //   db.query(query, [username], async (err, results) => {
// //     if (err) {
// //       console.error(err);
// //       return res.status(500).json({ message: 'Error checking user in database' });
// //     }

// //     if (results.length === 0) {
// //       return res.status(400).json({ message: 'User not found' });
// //     }

// //     const user = results[0];

// //     // Compare the password with the stored hashed password
// //     const isPasswordValid = await bcryptjs.compare(password, user.password);
// //     if (!isPasswordValid) {
// //       return res.status(400).json({ message: 'Invalid credentials' });
// //     }

// //     // Generate JWT token
// //     const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

// //     // Send the token back to the user
// //     res.status(200).json({ message: 'Login successful', token });
// //   });
// // });
// // User Login Route
// app.post('/login', async (req, res) => {
//   console.log('Request body:', req.body); // Log the incoming request

//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   const query = 'SELECT * FROM users WHERE username = ?';
//   db.query(query, [username], async (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Error checking user in database' });
//     }

//     if (results.length === 0) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const user = results[0];

//     const isPasswordValid = await bcryptjs.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user.id, username: user.username }, '1234', { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });
//   });
// });


// // Profile Route
// app.get('/profile', authenticateToken, (req, res) => {
//   // If the user is an admin, return all users
//   if (req.user.role === 'admin') {
//     const query = 'SELECT id, username, email, role FROM users';
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error fetching users' });
//       }
//       res.status(200).json(results);
//     });
//   } else {
//     // If the user is not an admin, return their profile
//     const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
//     db.query(query, [req.user.id], (err, results) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error fetching user profile' });
//       }
//       res.status(200).json(results[0]);
//     });
//   }
// });

// // Middleware to authenticate tokens
// function authenticateToken(req, res, next) {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }
//   jwt.verify(token, '1234', (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     req.user = decoded;
//     next();
//   });
// }
// // Fetch all users
// app.get('/users', authenticateToken, (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Forbidden' });
//   }

//   const query = 'SELECT id, username, email, role FROM users';
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Error fetching users' });
//     }
//     res.status(200).json(results);
//   });
// });


// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// // Importing required modules
// const express = require('express');
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Initialize the Express application
// const app = express();

// // Middleware setup
// app.use(cors()); // Enable CORS for cross-origin requests
// app.use(bodyParser.json()); // Parse JSON data
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// // MySQL Database Connection
// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root', // Replace with your MySQL username
//   password: 'root', // Replace with your MySQL password
//   database: 'rbac_db', // Replace with your database name
//   port: 3308 // Replace with your MySQL port if needed
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL Database:', err);
//     return;
//   }
//   console.log('Connected to MySQL Database.');
// });

// // Middleware to authenticate tokens
// function authenticateToken(req, res, next) {
//   const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }
//   jwt.verify(token, '1234', (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     req.user = decoded; // Attach decoded user data to the request object
//     next();
//   });
// }

// // Routes

// // User Registration Route
// app.post('/register', (req, res) => {
//   const { username, email, password } = req.body;
//   const role = 'user'; // Default role is 'user'

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'Username, email, and password are required.' });
//   }

//   // Check if username already exists
//   const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
//   db.query(checkUsernameQuery, [username], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Error checking username' });

//     if (result.length > 0) {
//       return res.status(400).json({ message: 'Username already exists.' });
//     }

//     bcryptjs.hash(password, 10, (err, hashedPassword) => {
//       if (err) return res.status(500).json({ message: 'Error hashing password.' });

//       const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
//       db.query(checkEmailQuery, [email], (err, result) => {
//         if (err) return res.status(500).json({ message: 'Error checking email' });

//         if (result.length > 0) {
//           return res.status(400).json({ message: 'Email already exists.' });
//         }

//         const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
//         db.query(query, [username, email, hashedPassword, role], (err, result) => {
//           if (err) return res.status(500).json({ message: 'Error saving user to database.' });

//           res.status(200).json({ message: 'User registered successfully' });
//         });
//       });
//     });
//   });
// });

// // User Login Route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   const query = 'SELECT * FROM users WHERE username = ?';
//   db.query(query, [username], async (err, results) => {
//     if (err) return res.status(500).json({ message: 'Error checking user in database' });

//     if (results.length === 0) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const user = results[0];
//     const isPasswordValid = await bcryptjs.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, '1234', { expiresIn: '1h' });
//     res.status(200).json({ message: 'Login successful', token });
//   });
// });

// // Profile Route
// app.get('/profile', authenticateToken, (req, res) => {
//   if (req.user.role === 'admin') {
//     const query = 'SELECT id, username, email, role FROM users';
//     db.query(query, (err, results) => {
//       if (err) return res.status(500).json({ message: 'Error fetching users' });
//       res.status(200).json(results);
//     });
//   } else {
//     const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
//     db.query(query, [req.user.id], (err, results) => {
//       if (err) return res.status(500).json({ message: 'Error fetching user profile' });
//       res.status(200).json(results[0]);
//     });
//   }
// });

// // Fetch all users (Admin-only)
// app.get('/users', authenticateToken, (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Forbidden' });
//   }

//   const query = 'SELECT id, username, email, role FROM users';
//   db.query(query, (err, results) => {
//     if (err) return res.status(500).json({ message: 'Error fetching users' });
//     res.status(200).json(results);
//   });
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Importing required modules
// const express = require('express');
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Initialize the Express application
// const app = express();

// // Middleware setup
// app.use(cors()); // Enable CORS for cross-origin requests
// app.use(bodyParser.json()); // Parse JSON data
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// // MySQL Database Connection
// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root', // Replace with your MySQL username
//   password: 'root', // Replace with your MySQL password
//   database: 'rbac_db', // Replace with your database name
//   port: 3308 // Replace with your MySQL port if needed
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL Database:', err);
//     return;
//   }
//   console.log('Connected to MySQL Database.');
// });

// // Middleware to authenticate tokens
// function authenticateToken(req, res, next) {
//   const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }
//   jwt.verify(token, '1234', (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     req.user = decoded; // Attach decoded user data to the request object
//     next();
//   });
// }

// // Routes

// // User Registration Route
// app.post('/register', (req, res) => {
//   const { username, email, password } = req.body;
//   const role = 'user'; // Default role is 'user'

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'Username, email, and password are required.' });
//   }

//   // Check if username already exists
//   const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
//   db.query(checkUsernameQuery, [username], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Error checking username' });

//     if (result.length > 0) {
//       return res.status(400).json({ message: 'Username already exists.' });
//     }

//     bcryptjs.hash(password, 10, (err, hashedPassword) => {
//       if (err) return res.status(500).json({ message: 'Error hashing password.' });

//       const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
//       db.query(checkEmailQuery, [email], (err, result) => {
//         if (err) return res.status(500).json({ message: 'Error checking email' });

//         if (result.length > 0) {
//           return res.status(400).json({ message: 'Email already exists.' });
//         }

//         const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
//         db.query(query, [username, email, hashedPassword, role], (err, result) => {
//           if (err) return res.status(500).json({ message: 'Error saving user to database.' });

//           res.status(200).json({ message: 'User registered successfully' });
//         });
//       });
//     });
//   });
// });

// // User Login Route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   const query = 'SELECT * FROM users WHERE username = ?';
//   db.query(query, [username], async (err, results) => {
//     if (err) return res.status(500).json({ message: 'Error checking user in database' });

//     if (results.length === 0) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const user = results[0];
//     const isPasswordValid = await bcryptjs.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, '1234', { expiresIn: '1h' });
//     res.status(200).json({ message: 'Login successful', token });
//   });
// });

// // Profile Route
// // app.get('/profile', authenticateToken, (req, res) => {
// //   if (req.user.role === 'admin') {
// //     const query = 'SELECT id, username, email, role FROM users';
// //     db.query(query, (err, results) => {
// //       if (err) return res.status(500).json({ message: 'Error fetching users' });
// //       res.status(200).json(results);
// //     });
// //   } else {
// //     const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
// //     db.query(query, [req.user.id], (err, results) => {
// //       if (err) return res.status(500).json({ message: 'Error fetching user profile' });
// //       res.status(200).json(results[0]);
// //     });
// //   }
// // });
// app.get('/profile', authenticateToken, (req, res) => {
//   const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
//   db.query(query, [req.user.id], (err, results) => {
//     if (err) return res.status(500).json({ message: 'Error fetching user profile' });
//     res.status(200).json(results[0]);
//   });
// });


// // Fetch all users (Admin-only)
// app.get('/users', authenticateToken, (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Forbidden' });
//   }

//   const query = 'SELECT id, username, email, role FROM users';
//   db.query(query, (err, results) => {
//     if (err) return res.status(500).json({ message: 'Error fetching users' });
//     res.status(200).json(results);
//   });
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// Importing required modules
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// MySQL Database Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'rbac_db', // Replace with your database name
  port: 3308 // Replace with your MySQL port if needed
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL Database:', err);
    return;
  }
  console.log('Connected to MySQL Database.');
});

// Middleware to authenticate tokens
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  jwt.verify(token, '1234', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach decoded user data to the request object
    next();
  });
}

// Routes

// User Registration Route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const role = 'user'; // Default role is 'user'

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  // Check if username already exists
  const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUsernameQuery, [username], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error checking username' });

    if (result.length > 0) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    bcryptjs.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error hashing password.' });

      const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
      db.query(checkEmailQuery, [email], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error checking email' });

        if (result.length > 0) {
          return res.status(400).json({ message: 'Email already exists.' });
        }

        const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(query, [username, email, hashedPassword, role], (err, result) => {
          if (err) return res.status(500).json({ message: 'Error saving user to database.' });

          res.status(200).json({ message: 'User registered successfully' });
        });
      });
    });
  });
});

// User Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error checking user in database' });

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, '1234', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  });
});

// Profile Route
app.get('/profile', authenticateToken, (req, res) => {
  const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
  db.query(query, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching user profile' });
    res.status(200).json(results[0]);
  });
});

// Fetch all users (Admin-only)
app.get('/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const query = 'SELECT id, username, email, role FROM users';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching users' });
    res.status(200).json(results);
  });
});

// Update user role (Admin-only)
app.put('/users/:id/role', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { role } = req.body;
  const { id } = req.params;

  if (!role || !['user', 'moderator', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const query = 'UPDATE users SET role = ? WHERE id = ?';
  db.query(query, [role, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating role' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Role updated successfully' });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
