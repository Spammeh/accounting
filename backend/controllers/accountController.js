// backend/controllers/accountController.js
const db = require('../models');
const Account = db.Account;

// Create a new account
exports.create = async (req, res) => {
  const { name, balance } = req.body;

  try {
    // Create the account
    const account = await Account.create({
      name,
      balance,
    });

    res.status(201).json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating account' });
  }
};

// Get all accounts
exports.findAll = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching accounts' });
  }
};

// Get a single account by ID
exports.findOne = async (req, res) => {
  const accountId = req.params.id;

  try {
    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching account' });
  }
};

// Update an account by ID
exports.update = async (req, res) => {
  const accountId = req.params.id;
  const { name, balance } = req.body;

  try {
    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    console.log('Existing Account:', account); // Add this line

    // Update the account
    account.name = name; // Make sure the 'name' property is correctly assigned
    account.balance = balance;
    await account.save();

    console.log('Updated Account:', account); // Add this line
    res.status(200).json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating account' });
  }
};


// Delete an account by ID
exports.delete = async (req, res) => {
  const accountId = req.params.id;

  try {
    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Delete the account
    await account.destroy();

    res.status(204).send(); // No content response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting account' });
  }
};
