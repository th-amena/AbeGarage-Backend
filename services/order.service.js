// import the query function from the db.config.js file
const connection = require("../config/db.config");

// import the crypto module to generate random id
const crypto = require("crypto");
// create order sevice
async function createOrderr(order) {
  try {
    const hash_id = crypto.randomUUID();

    ////////////////////////////////////////////////////////////////
    // insert the orders data in to the orders table
    const query =
      "INSERT INTO orders (employee_id, customer_id, vehicle_id, order_date, active_order, order_hash) VALUES (?,?,?,CURRENT_TIMESTAMP,1,?)";

    const [rows] = await connection.query(query, [
      order.employee_id,
      order.customer_id,
      order.vehicle_id,
      hash_id,
    ]);
    if (rows.affectedRows !== 1) {
      return false;
    }

    const order_id = rows.insertId;

    ////////////////////////////////////////////////////////////
    // insert the orders data in to the orders info table
    const query2 =
      "INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) VALUES (?,?,?,?,?,?,0)";

    const [rows2] = await connection.query(query2, [
      order_id,
      order.order_total_price,
      order.estimated_completion_date,
      order.additional_request,
      order.notes_for_internal_use,
      order.notes_for_customer,
    ]);

    if (rows2.affectedRows !== 1) {
      return false;
    }

    /////////////////////////////////////////////////////////////////
    // insert the order data in to the order service table
    const query3 =
      "INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)";

    let afeectedRows3 = 0;

    for (let i = 0; i < order.order_services.length; i++) {
      const values = [order_id, order.order_services[i].service_id, 0];
      const rows3 = await connection.query(query3, values);

      afeectedRows3 = rows3.affectedRows + afeectedRows3;
    }

    if (afeectedRows3 < 1) {
      return false;
    }

    /////////////////////////////////////////////////////////////////
    // insert the order data in to the order status table

    const query4 =
      "INSERT INTO order_status (order_id, order_status) VALUES (?,?)";

    const [row4] = await connection.query(query4, [order_id, 0]);

    if (row4.affectedRows !== 1) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createOrderr,
};
