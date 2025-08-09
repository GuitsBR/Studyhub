const express = require('express');
const { createUser, authenticate } = require('../models/user');

const router = express.Router();

// POST /auth/register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    const id = createUser(username, password);
    return res.json({ id, username });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(400).json({ message: 'Username already exists' });
    }
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const token = authenticate(username, password);
  if (!token) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.json({ token });
});

module.exports = router;