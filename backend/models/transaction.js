'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // Associate with the Account model for debit and credit accounts
      Transaction.belongsTo(models.Account, {
        as: 'debitAccount',
        foreignKey: 'debitAccountId',
      });
      Transaction.belongsTo(models.Account, {
        as: 'creditAccount',
        foreignKey: 'creditAccountId',
      });
    }
  }
  Transaction.init(
    {
      date: DataTypes.DATE,
      description: DataTypes.STRING,
      debitAmount: DataTypes.DECIMAL,
      creditAmount: DataTypes.DECIMAL,
      category: DataTypes.STRING,
      debitAccountId: DataTypes.INTEGER, // Reference to debit account
      creditAccountId: DataTypes.INTEGER, // Reference to credit account
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
