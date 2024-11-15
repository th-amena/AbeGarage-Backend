// Import mysql module
const mysql = require("mysql2/promise");

// Create a connection to the database
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // socketPath: process.env.DB_SOCKET, // Uncomment this if using a socket
});

// Check the connection
connection
  .getConnection()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

// Export the connection
module.exports = connection;
