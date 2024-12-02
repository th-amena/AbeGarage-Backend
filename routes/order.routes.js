const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// import the authMiddleware
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

// Route to update an order
router.put("/api/order/:order_hash", orderController.updateOrder);
//

module.exports = router;
