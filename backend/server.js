// backend/app.js
const express = require('express');
const cors = require('cors')
const app = express();
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
require('dotenv').config()

// Middleware and other setup code here
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Use the routes
app.use('/api', accountRoutes); // All account routes will start with /api/accounts
app.use('/api', transactionRoutes); // All transaction routes will start with /api/transactions

// Start your Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
