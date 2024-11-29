const express = require("express");
const router = express.Router();
const {
  updateOrder,
  findOrderById,
} = require("../controllers/order.controller"); // Import controller functions

// Insert Orders into the Database
router.post("/api/order", async (req, res) => {
  const { order_description, estimated_completion_date } = req.body;

  try {
    const newOrder = await db.Order.create({
      order_description,
      estimated_completion_date,
    });
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// PUT endpoint for updating orders
router.put("/api/order/:id", async (req, res) => {
  const orderId = req.params.id;
  const orderData = req.body;

  try {
    // Validate request body
    if (!orderData || !orderId) {
      return res
        .status(400)
        .json({ error: "Invalid or missing request body or order_id" });
    }

    // Check if the order exists
    const existingOrder = await findOrderById(orderId);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the order
    await updateOrder(orderId, orderData);

    // Success response
    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
