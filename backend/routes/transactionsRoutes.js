// routes/transactions.js

const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

// Create a transaction
router.post('/', transactionsController.createTransaction);

// Get all transactions
router.get('/', transactionsController.getAllTransactions);

// Get a single transaction by ID
router.get('/:id', transactionsController.getTransactionById);

// Update a transaction
router.put('/:id', transactionsController.updateTransaction);

// Delete a transaction
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;
