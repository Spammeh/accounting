// backend/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Create a new account
router.post('/accounts', accountController.create);

// Get all accounts
router.get('/accounts', accountController.findAll);

// Get a single account by ID
router.get('/accounts/:id', accountController.findOne);

// Update an account by ID
router.put('/accounts/:id', accountController.update);

// Delete an account by ID
router.delete('/accounts/:id', accountController.delete);

module.exports = router;
