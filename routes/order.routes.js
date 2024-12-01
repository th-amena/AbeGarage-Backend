const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.get(
  "/api/orders",
//   authMiddleware.verifyToken, // Ensures the user is authenticated
//   authMiddleware.isAdmin, // Ensures the user has admin privileges
  orderController.getAllOrders
);

module.exports = router;