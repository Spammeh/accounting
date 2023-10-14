'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      debitAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Accounts',
          key: 'id'
        }
      },
      creditAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Accounts',
          key: 'id'
        }
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  
    Transaction.associate = (models) => {
      Transaction.belongsTo(models.Account, { as: 'debitAccount', foreignKey: 'debitAccountId'})
      Transaction.belongsTo(models.Account, { as: 'creditAccount', foreignKey: 'creditAccountId'})
    }
  
    return Transaction
  }
  