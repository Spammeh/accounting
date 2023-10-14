// routes/accounts.js

const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

// Create an account
router.post('/', accountsController.createAccount);

// Get all accounts
router.get('/', accountsController.getAllAccounts);

// Get a single account by ID
router.get('/:id', accountsController.getAccountById);

// Update an account
router.put('/:id', accountsController.updateAccount);

// Delete an account
router.delete('/:id', accountsController.deleteAccount);

module.exports = router;
