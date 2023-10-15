// backend/controllers/transactionController.js
const db = require('../models');
const Transaction = db.Transaction;
const TransactionAccount = db.TransactionAccount;

// Create a new transaction
exports.create = async (req, res) => {
  const { description, accounts, transactionDate } = req.body;

  try {
    // Calculate debit and credit amounts
    let debitTotal = 0;
    let creditTotal = 0;

    for (const account of accounts) {
      if (account.accountType === 'debit') {
        debitTotal += account.amount;
      } else if (account.accountType === 'credit') {
        creditTotal += account.amount;
      }
    }

    // Create the transaction with debit and credit amounts
    const transaction = await Transaction.create({
      description,
      debitAmount: debitTotal,
      creditAmount: creditTotal,
      transactionDate,
    });

    // Create records in the junction table for each account
    for (const account of accounts) {
      await TransactionAccount.create({
        transactionId: transaction.id,
        accountId: account.accountId,
        amount: account.amount,
        accountType: account.accountType,
      });
    }

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating transaction' });
  }
};

// Get all transactions
exports.findAll = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

// Get a single transaction by ID
exports.findOne = async (req, res) => {
  const transactionId = req.params.id;

  try {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching transaction' });
  }
};

// Update a transaction by ID
exports.update = async (req, res) => {
  const transactionId = req.params.id;
  const { description, accounts, transactionDate } = req.body;

  try {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Calculate debit and credit amounts
    let debitTotal = 0;
    let creditTotal = 0;

    for (const account of accounts) {
      if (account.accountType === 'debit') {
        debitTotal += account.amount;
      } else if (account.accountType === 'credit') {
        creditTotal += account.amount;
      }
    }

    // Update the transaction with debit and credit amounts
    transaction.description = description;
    transaction.debitAmount = debitTotal;
    transaction.creditAmount = creditTotal;
    transaction.transactionDate = transactionDate;
    await transaction.save();

    // Update records in the junction table for each account
    for (const account of accounts) {
      await TransactionAccount.update(
        {
          amount: account.amount,
          accountType: account.accountType,
        },
        {
          where: {
            transactionId,
            accountId: account.accountId,
          },
        }
      );
    }

    res.status(200).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating transaction' });
  }
};

// Delete a transaction by ID
exports.delete = async (req, res) => {
  const transactionId = req.params.id;

  try {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Delete the transaction
    await transaction.destroy();

    res.status(204).send(); // No content response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting transaction' });
  }
};
