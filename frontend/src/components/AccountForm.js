// src/components/AccountForm.js
import React, { useState } from 'react';

const AccountForm = ({ addAccount }) => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      addAccount(name);
      setName('');
    }
  };

  return (
    <div>
      <h2>Add Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Account Name"
          value={name}
          onChange={handleNameChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AccountForm;
