//Import the express module
const express = require('express');
//Import the dotenv module and call the config method
require('dotenv').config();
//Import the cors module
const cors = require('cors');
// Import the router module
const router = require('./routes');
//Create a variable to store the port number
const PORT = process.env.PORT;

// Create the web server
const app = express();
// Use the cors middleware
app.use(cors());

// Use the express.json middleware to parse JSON requests
app.use(express.json());
//Import the routes
const routes = require('./routes');
//Use the routes
app.use(routes);
//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`database connected`);
});
module.exports = app;

// *************************************************************
// app.js
// const express = require('express');
// require('dotenv').config();  // Load environment variables from .env
// const cors = require('cors');
// const customerRoutes = require('./routes/customerRoutes');  // Import customer routes

// const app = express();

// // Middleware
// app.use(cors());  // Enable CORS
// app.use(express.json());  // Parse JSON request bodies

// // Use the customer routes
// app.use('/api/customers', customerRoutes);  // Mount customer routes at /api/customers

// // Start the server
// const PORT = process.env.PORT || 8000;  // Use PORT from .env or default to 8000
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// module.exports = app;
