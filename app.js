// Import the express module
const express = require("express");
// Import the dotenv module and call the config method
const dotenv = require("dotenv");
dotenv.config();
// Import the cors module
const cors = require("cors");
// Import the routes
const customerRoutes = require("./routes/customer.routes");
const orderRoutes = require("./routes/order.routes");

// Create the web server
const app = express();

// Use the cors middleware
app.use(cors());

// Use the express.json middleware to parse JSON requests
app.use(express.json());

// Route Definitions
app.use("/api/customers", customerRoutes); // Customer routes
app.use("/api/orders", orderRoutes); // Order routes

// Start the server
const PORT = process.env.PORT; // Default to port 3000 if not defined
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
