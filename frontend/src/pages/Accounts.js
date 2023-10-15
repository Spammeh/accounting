import React, { useState, useEffect } from 'react';
import AccountList from '../components/AccountList';
import AccountForm from '../components/AccountForm';
import axios from 'axios';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch accounts from your backend API and set them in the state
    axios
      .get('http://localhost:3001/api/accounts')
      .then((response) => {
        setAccounts(response.data);
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching accounts:', error);
        setError('Error fetching accounts: ' + error.message);
      });
  }, []);

  const addAccount = (name) => {
    axios
      .post('http://localhost:3001/api/accounts', { name })
      .then((response) => {
        setAccounts([...accounts, response.data]);
        setError('');
      })
      .catch((error) => {
        console.error('Error creating account:', error);
        setError('Error creating account: ' + error.message);
      });
  };

  const deleteAccount = (accountToDelete) => {
    axios
      .delete(`http://localhost:3001/api/accounts/${accountToDelete.id}`)
      .then(() => {
        const updatedAccounts = accounts.filter(
          (account) => account.id !== accountToDelete.id
        );
        setAccounts(updatedAccounts);
        setError('');
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
        setError('Error deleting account: ' + error.message);
      });
  };

  return (
    <div>
      <h1>Accounts</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AccountForm addAccount={addAccount} />
      <AccountList
        accounts={accounts}
        onDeleteAccount={deleteAccount}
        setAccounts={setAccounts}
      />
    </div>
  );
};

export default Accounts;
