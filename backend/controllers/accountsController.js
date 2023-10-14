// controllers/accountsController.js

const { Account } = require('../models');

exports.createAccount = async (req, res) => {
    try {
        const account = await Account.create(req.body);
        res.status(201).send(account);
    } catch (error) {
        res.status(500).send({ message: 'Error creating account', error: error.message });
    }
};

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll();
        res.send(accounts);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching accounts', error: error.message });
    }
};

exports.getAccountById = async (req, res) => {
    try {
        const account = await Account.findByPk(req.params.id);
        if (account) {
            res.send(account);
        } else {
            res.status(404).send({ message: 'Account not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error fetching account', error: error.message });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const account = await Account.findByPk(req.params.id);
        if (!account) {
            return res.status(404).send({ message: 'Account not found' });
        }

        await account.update(req.body);
        res.send(account);
    } catch (error) {
        res.status(500).send({ message: 'Error updating account', error: error.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByPk(req.params.id);
        if (!account) {
            return res.status(404).send({ message: 'Account not found' });
        }

        await account.destroy();
        res.status(204).send();  // 204 No Content - Successfully processed but no content to send
    } catch (error) {
        res.status(500).send({ message: 'Error deleting account', error: error.message });
    }
};
