
const db = require('../config/db');

const addTransaction = async (req, res) => {
  const { user_id, category_id, amount, type, description, date } = req.body;

  const query = 'INSERT INTO transactions (user_id, category_id, amount, type, description, date) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [user_id, category_id, amount, type, description, date], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error adding transaction' });

    res.status(201).json({ message: 'Transaction added successfully' });
  });
};

const getTransactions = (req, res) => {
  const query = 'SELECT t.*, c.name AS category_name FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.user_id = ? ORDER BY t.date DESC';

  db.query(query, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching transactions' });

    res.json(results);
  });
};

module.exports = { addTransaction, getTransactions };
