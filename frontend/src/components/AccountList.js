import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // Import Modal component
import Button from 'react-bootstrap/Button'; // Import Button component
import Form from 'react-bootstrap/Form'; // Import Form component
import axios from 'axios'; // Import Axios for making HTTP requests

const AccountList = ({ accounts, onDeleteAccount, onEditSave, setAccounts }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedAccountName, setEditedAccountName] = useState('');
  const [editedAccountId, setEditedAccountId] = useState(null);
  const [error, setError] = useState('');

  const openEditModal = (account) => {
    if (account.id) {
      setEditedAccountName(account.name);
      setEditedAccountId(account.id);
      setShowEditModal(true);
      setError(''); // Clear any previous error messages
    } else {
      setError('No account selected for editing.'); // Display an error message
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditedAccountName('');
    setEditedAccountId(null);
    setError(''); // Clear any previous error messages
  };

  const editAccount = () => {
    if (editedAccountId === null) {
      setError('Please select an account to edit.');
      return;
    }

    // Send a PUT request to update the account name on the backend
    axios
      .put(`http://localhost:3001/api/accounts/${editedAccountId}`, {
        name: editedAccountName,
      })
      .then((response) => {
        // Update the account in the state with the edited data
        const updatedAccounts = accounts.map((account) => {
          if (account.id === editedAccountId) {
            return response.data;
          }
          return account;
        });
        setAccounts(updatedAccounts);
        setError(''); // Clear any previous error messages
        closeEditModal(); // Close the edit modal
      })
      .catch((error) => {
        console.error('Error updating account:', error);
        setError('Error updating account: ' + error.message);
      });
  };

  return (
    <div className="container my-4">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2 className="mb-4">Accounts</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm mr-2"
                  onClick={() => openEditModal(account)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteAccount(account)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Account Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              type="text"
              value={editedAccountName}
              onChange={(e) => setEditedAccountName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // Handle account name update here
              // You can call an API to update the account name
              // and update the state accordingly
              editAccount(); // Call the editAccount function
              closeEditModal();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountList;
