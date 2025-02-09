const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');  // Correct path to authRoutes

// Middleware to parse incoming JSON requests
app.use(express.json());  // This is essential to parse the body for POST requests

// Mount the auth routes at the /api/auth endpoint
app.use('/api/auth', authRoutes);  // This ensures '/api/auth/signup' is accessible

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
