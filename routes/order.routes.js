const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/order.controller");

// POST request to create a new order
router.post("/api/order", createOrder);
module.exports = router;
