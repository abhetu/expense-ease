
const express = require('express');
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const router = express.Router();

router.post('/add', addTransaction);
router.get('/:userId', getTransactions);

module.exports = router;
