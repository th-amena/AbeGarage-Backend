// Import the Order model directly from order.service.js
const { Order } = require("../services/order.service"); // Correct model import

// Fetch the Order by order_id
const findOrderById = async (orderId) => {
  return await Order.findByPk(orderId);
};

// Update the Order:
const updateOrder = async (orderId, orderData) => {
  const {
    order_description,
    estimated_completion_date,
    completion_date,
    order_completed,
    order_services,
  } = orderData;

  // Update the main order details
  await Order.update(
    {
      order_description,
      estimated_completion_date,
      completion_date,
      order_completed,
    },
    { where: { id: orderId } }
  );

  // Update or manage order_services here
  // This part depends on your database structure. If `order_services` is a related table,
  // you might need to perform separate updates for that relationship.
};

// Export controller functions
module.exports = {
  findOrderById,
  updateOrder,
};
