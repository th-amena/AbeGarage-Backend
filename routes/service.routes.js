
const express = require("express");
const router = express.Router();
//const { verifyToken, isAdmin } = require("../middlewares/auth.Middleware");
const { getSingleService } = require("../controllers/service.controller.js");

// Route for getting a single service by ID
router.get(
  "/api/service/:id", // URL parameter for service ID
 //[verifyToken], // Token validation middleware
  getSingleService // Call the controller to fetch the service
);

module.exports = router;
