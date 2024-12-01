const express = require("express");
const router = express.Router();
const { createOrder , getsingleOrder } = require("../controllers/order.controller");

// POST request to create a new order
router.post("/api/order", createOrder);

//GET request to get single order
router.get("/api/order/:order_hash", getsingleOrder);


module.exports = router;



