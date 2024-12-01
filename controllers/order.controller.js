// Import the order service
const employeeService = require("../services/order.service");

async function getAllOrders(req, res, next) {
  // Call the getAllOrders method from the order service
  const employees = await orderService.getAllOrders();
  // console.log(orders);
  if (!orders) {
    res.status(400).json({
      error: "Failed to get all orders! No orders!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: orders,
    });
  }
}
module.exports = { getAllOrders };
