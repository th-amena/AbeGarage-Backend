const orderService = require("../services/order.service");
const conn = require("../config/db.config");

// Update an order
async function updateOrder(req, res) {
  try {
    const { order_hash } = req.params; // Ensure order_id is obtained from params
    const orderData = req.body;

    const requiredFields = [
      "order_description",
      "estimated_completion_date",
      "completion_date",
      "order_services",
    ];

    for (const field of requiredFields) {
      if (orderData[field] === undefined) {
        return res.status(400).json({ error: `Field ${field} is required` });
      }
    }

    if (
      !Array.isArray(orderData.order_services) ||
      orderData.order_services.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Field 'order_services' must be a non-empty array" });
    }
    console.log("orderData:", orderData);
    console.log("order_hash:", order_hash);
    
    const result = await orderService.updateOrder(orderData,order_hash );
    res.status(200).json(result);
    
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
}

module.exports = {updateOrder};