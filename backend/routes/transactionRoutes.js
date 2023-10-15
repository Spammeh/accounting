// backend/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Create a new transaction
router.post('/transactions', transactionController.create);

// Get all transactions
router.get('/transactions', transactionController.findAll);

// Get a single transaction by ID
router.get('/transactions/:id', transactionController.findOne);

// Update a transaction by ID
router.put('/transactions/:id', transactionController.update);

// Delete a transaction by ID
router.delete('/transactions/:id', transactionController.delete);

module.exports = router;
