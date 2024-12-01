
const conn = require("../config/db.config");

//A functoin to get all orders
async function getAllOrders() {
  const query =
    "SELECT * FROM order_info INNER JOIN order_info ON order.order_id = order_info.order_id INNER JOIN employee_info ON order.employee_id = employee_info.employee_id INNER JOIN customer_identifier ON order.customer_id = customer_identifier.customer_id INNER JOIN customer_vehicle_info ON order.vehicle_id = customer_vehicle_info.vehicle_id ORDER BY order.order_id DESC limit 10";
  const [rows] = await conn.query(query);
  return rows;
}

module.exports = { getAllOrders };

