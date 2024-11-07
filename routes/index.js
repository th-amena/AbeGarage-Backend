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