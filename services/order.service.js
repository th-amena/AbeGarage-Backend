//GET single order
async function getsingleOrderr(order_hash) {
  try {
    const query =
      "SELECT orders.order_id, orders.order_hash,orders.order_date, customer_info.customer_first_name, customer_info.customer_last_name, customer_info.active_customer_status, customer_identifier.customer_email, customer_identifier.customer_phone_number, customer_vehicle_info.vehicle_make, customer_vehicle_info.vehicle_color,customer_vehicle_info.vehicle_tag,customer_vehicle_info.vehicle_year,customer_vehicle_info.vehicle_mileage,customer_vehicle_info.vehicle_serial, employee_info.employee_first_name, employee_info.employee_last_name, order_status.order_status, order_info.additional_request, order_info.order_total_price, order_info.additional_requests_completed FROM orders INNER JOIN customer_info ON orders.customer_id = customer_info.customer_id INNER JOIN  customer_identifier ON orders.customer_id = customer_identifier.customer_id INNER JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id INNER JOIN employee_info ON orders.employee_id = employee_info.employee_id INNER JOIN order_status ON orders.order_id = order_status.order_id INNER JOIN order_info ON orders.order_id = order_info.order_id WHERE orders.order_hash = ?";

    const [rows] = await connection.query(query, [order_hash]);

    if (rows.length < 1) {
      return;
    }

    const query2 =
      "SELECT orders.order_hash, order_services.service_id, order_services.order_service_id, common_services.service_name, common_services.service_description, order_services.service_completed FROM order_services INNER JOIN orders ON order_services.order_id = orders.order_id INNER JOIN common_services ON order_services.service_id = common_services.service_id WHERE orders.order_hash = ?";

    const [rows2] = await connection.query(query2, [order_hash]);

    return [{ ...rows[0], order_services: rows2 }];
  } catch (error) {
    // console.log(error);
  }
}
