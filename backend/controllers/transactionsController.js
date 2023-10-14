// controllers/transactionsController.js
const sequelize = require('../config/database')
const { Transaction, Account } = require('../models');

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.send(transactions);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching transactions', error: error.message });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (transaction) {
            res.send(transaction);
        } else {
            res.status(404).send({ message: 'Transaction not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error fetching transaction', error: error.message });
    }
};

// Create Transaction
exports.createTransaction = async (req, res) => {
    const t = await sequelize.transaction();
    
    try {
        const { description, date, debit, credit } = req.body;

        if (debit.amount !== credit.amount) {
            throw new Error('Debit and Credit amounts must match');
        }

        const debitAccount = await Account.findByPk(debit.accountId, { transaction: t });
        const creditAccount = await Account.findByPk(credit.accountId, { transaction: t });

        debitAccount.balance -= debit.amount;
        creditAccount.balance += credit.amount;

        await debitAccount.save({ transaction: t });
        await creditAccount.save({ transaction: t });

        const transaction = await Transaction.create({
            description,
            date,
            debitAccountId: debit.accountId,
            creditAccountId: credit.accountId,
            amount: debit.amount
        }, { transaction: t });

        await t.commit();

        res.status(201).send(transaction);
    } catch (error) {
        await t.rollback();
        res.status(500).send({ message: 'Error creating transaction', error: error.message });
    }
};

// Update Transaction
exports.updateTransaction = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const transaction = await Transaction.findByPk(req.params.id, { transaction: t });
        if (!transaction) {
            return res.status(404).send({ message: 'Transaction not found' });
        }

        // Reverse the original transaction
        const originalDebitAccount = await Account.findByPk(transaction.debitAccountId, { transaction: t });
        const originalCreditAccount = await Account.findByPk(transaction.creditAccountId, { transaction: t });

        originalDebitAccount.balance += transaction.amount;
        originalCreditAccount.balance -= transaction.amount;

        await originalDebitAccount.save({ transaction: t });
        await originalCreditAccount.save({ transaction: t });

        // Apply the updated transaction
        const { debit, credit } = req.body;
        const updatedDebitAccount = await Account.findByPk(debit.accountId, { transaction: t });
        const updatedCreditAccount = await Account.findByPk(credit.accountId, { transaction: t });

        updatedDebitAccount.balance -= debit.amount;
        updatedCreditAccount.balance += credit.amount;

        await updatedDebitAccount.save({ transaction: t });
        await updatedCreditAccount.save({ transaction: t });

        await transaction.update({
            description: req.body.description,
            date: req.body.date,
            debitAccountId: debit.accountId,
            creditAccountId: credit.accountId,
            amount: debit.amount
        }, { transaction: t });

        await t.commit();
        res.send(transaction);
    } catch (error) {
        await t.rollback();
        res.status(500).send({ message: 'Error updating transaction', error: error.message });
    }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const transaction = await Transaction.findByPk(req.params.id, { transaction: t });
        if (!transaction) {
            return res.status(404).send({ message: 'Transaction not found' });
        }

        // Reverse the original transaction
        const debitAccount = await Account.findByPk(transaction.debitAccountId, { transaction: t });
        const creditAccount = await Account.findByPk(transaction.creditAccountId, { transaction: t });

        debitAccount.balance += transaction.amount;
        creditAccount.balance -= transaction.amount;

        await debitAccount.save({ transaction: t });
        await creditAccount.save({ transaction: t });

        await transaction.destroy({ transaction: t });

        await t.commit();
        res.status(204).send();
    } catch (error) {
        await t.rollback();
        res.status(500).send({ message: 'Error deleting transaction', error: error.message });
    }
};
