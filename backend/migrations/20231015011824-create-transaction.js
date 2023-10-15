'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
      },
      debitAmount: {
        type: Sequelize.DECIMAL,
      },
      creditAmount: {
        type: Sequelize.DECIMAL,
      },
      category: {
        type: Sequelize.STRING,
      },
      debitAccountId: {
        type: Sequelize.INTEGER, // Reference to debit account
        references: {
          model: 'Accounts', // Make sure 'Accounts' matches your actual account model name
          key: 'id', // Assuming 'id' is the primary key of the 'Accounts' table
        },
        allowNull: false,
      },
      creditAccountId: {
        type: Sequelize.INTEGER, // Reference to credit account
        references: {
          model: 'Accounts', // Make sure 'Accounts' matches your actual account model name
          key: 'id', // Assuming 'id' is the primary key of the 'Accounts' table
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  },
};
