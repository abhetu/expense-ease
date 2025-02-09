
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const insertQuery = 'INSERT INTO users (email, password_hash) VALUES (?, ?)';

    db.query(insertQuery, [email, passwordHash], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error signing up' });

      const token = jwt.sign({ userId: results.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ message: 'User created successfully', token });
    });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, results[0].password_hash);
    if (!match) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
};

module.exports = { signUp, login };
