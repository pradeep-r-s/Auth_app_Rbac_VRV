const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await userModel.registerUser(username, email, password, role);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await userModel.authenticateUser(email, password);
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = { register, login };
