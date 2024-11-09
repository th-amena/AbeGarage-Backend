<<<<<<< HEAD
//Import the express module
const express = require('express');
//Import express router
const router = express.Router();
//Import the install routes
const installRouter = require('./install.routes');
//Add the install routes
router.use(installRouter)
//Export the routes
module.exports = router
=======
// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee routes
const employeeRoutes = require("./employee.routes");
// Import the login routes
const loginRoutes = require("./login.routes");
// Add the employee routes to the main router
router.use(employeeRoutes);
// Add the login routes to the main router
router.use(loginRoutes);
// Export the router
module.exports = router;
>>>>>>> 2c98c8cbf3a0c4c5862ebef736947bb68094c7f0
