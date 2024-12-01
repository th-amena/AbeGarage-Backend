const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const serviceController = require("../controllers/service.controller");

// Admin and Manager route for adding service
router.post(
   "/api/service",
   authMiddleware.verifyToken,
   authMiddleware.isAdminOrManagerForService, // Combined check for Admin or Manager
   serviceController.addService
);

// Admin and Manager route for updating service
router.put(
   "/api/service/:id",
   authMiddleware.verifyToken,
   authMiddleware.isAdminOrManagerForService, // Combined check for Admin or Manager
   serviceController.updateService
);

module.exports = router;
