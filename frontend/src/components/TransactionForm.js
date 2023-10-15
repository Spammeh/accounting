// src/components/TransactionForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const TransactionForm = ({ addTransaction }) => {
  const [entries, setEntries] = useState([
    {
      date: '',
      description: '',
      debitAccountId: '',
      creditAccountId: '',
      amount: '',
    },
  ]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Fetch accounts from your backend API and populate the accounts dropdown
    axios
      .get('http://localhost:3001/api/accounts')
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching accounts:', error);
      });
  }, []);

  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const handleAddEntry = () => {
    setEntries([...entries, { date: '', description: '', debitAccountId: '', creditAccountId: '', amount: '' }]);
  };

  const handleRemoveEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEntries = entries.filter(
      (entry) =>
        entry.date && entry.description && entry.debitAccountId && entry.creditAccountId && entry.amount
    );
  
    if (validEntries.length > 0) {
      // Update this line to pass an object with description and amount
      validEntries.forEach((entry) => {
        addTransaction({ description: entry.description, amount: entry.amount });
      });
  
      // Clear form inputs after submission
      setEntries([{ date: '', description: '', debitAccountId: '', creditAccountId: '', amount: '' }]);
    }
  }

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        {entries.map((entry, index) => (
          <div key={index}>
            <input
              type="date"
              placeholder="Date"
              value={entry.date}
              onChange={(e) => handleEntryChange(index, 'date', e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={entry.description}
              onChange={(e) => handleEntryChange(index, 'description', e.target.value)}
            />
            <select
              value={entry.debitAccountId}
              onChange={(e) => handleEntryChange(index, 'debitAccountId', e.target.value)}
              required
            >
              <option value="" disabled>Select Debit Account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            <select
              value={entry.creditAccountId}
              onChange={(e) => handleEntryChange(index, 'creditAccountId', e.target.value)}
              required
            >
              <option value="" disabled>Select Credit Account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={entry.amount}
              onChange={(e) => handleEntryChange(index, 'amount', e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveEntry(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddEntry}>
          Add Entry
        </button>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
