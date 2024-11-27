// Import the module
const express = require("express");

// calling the router method from express to create the router
const router = express.Router();

// import the authMiddleware
const { verifyToken, isAdmin } = require("../middlewares/auth.Middleware");

// import the services controller
const serviceController = require("../controllers/service.controller.js");

// create a route to handel the get all services request
router.get(
  "/api/services",
  // [verifyToken, isAdmin],
  serviceController.getAllServices
);

// export the router
module.exports = router;
