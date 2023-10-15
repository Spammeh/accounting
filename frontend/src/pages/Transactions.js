import React, { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from your backend API and set them in the state
    axios
      .get('http://localhost:3001/api/transactions')
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  const addTransaction = (description, amount) => {
    // Send a POST request to create a new transaction on your backend
    axios
      .post('http://localhost:3001/api/transactions', { description, amount })
      .then((response) => {
        setTransactions([...transactions, response.data]);
      })
      .catch((error) => {
        console.error('Error creating transaction:', error);
      });
  };

  return (
    <div>
      <h1>Transactions</h1>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Transactions;
