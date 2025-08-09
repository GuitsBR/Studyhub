const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT signing.  In production this should come from
// process.env.JWT_SECRET.
const JWT_SECRET = process.env.JWT_SECRET || 'development_secret';

/**
 * Create a new user.
 * @param {string} username
 * @param {string} password
 */
function createUser(username, password) {
  const passwordHash = bcrypt.hashSync(password, 10);
  const stmt = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
  const info = stmt.run(username, passwordHash);
  return info.lastInsertRowid;
}

/**
 * Authenticate a user and return a JWT if successful.
 * @param {string} username
 * @param {string} password
 */
function authenticate(username, password) {
  const user = db.prepare('SELECT id, username, password_hash FROM users WHERE username = ?').get(username);
  if (!user) return null;
  if (!bcrypt.compareSync(password, user.password_hash)) return null;
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
  return token;
}

/**
 * Middleware to validate JWT tokens on protected routes.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {
  createUser,
  authenticate,
  authMiddleware,
};