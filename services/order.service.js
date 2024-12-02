const conn = require("../config/db.config");
// updating createOrder function

async function updateOrder(orderData, order_hash) {
  try {
    const {
      order_description,
      estimated_completion_date,
      completion_date,
      order_services,
      order_status,
    } = orderData;

    // Validate required fields
    if (!order_hash || !order_description) {
      throw new Error("Order ID and description are required");
    }

    // Validate order_services
    if (!Array.isArray(order_services) || order_services.length === 0) {
      throw new Error("Order services must be a non-empty array");
    }

    const updateOrderQuery = `
      UPDATE orders
      SET order_description = ?
      WHERE order_hash = ?
    `;
    const result = await conn.query(updateOrderQuery, [
      order_description,
      order_hash,
    ]);
    console.log("result for the first order service:", result);

    if (result.affectedRows === 0) {
      throw new Error(`Order with ID ${hash} not found`);
    }

    const orderInfoQuery = `
      UPDATE order_info
      SET estimated_completion_date = ?, 
          completion_date = ?
          WHERE order_hash = ?
    `;
    const resultTwo = await conn.query(orderInfoQuery, [
      estimated_completion_date || null, // Replace undefined with null
      completion_date || null, // Replace undefined with null
      order_hash,
    ]);
    // console.log("resultTwo:",resultTwo)

    const deleteOrderServicesQuery = `
      DELETE FROM order_services WHERE order_hash = ?
    `;
    await conn.query(deleteOrderServicesQuery, [order_hash]);
    console.log("deleteOrderServicesQuery:", deleteOrderServicesQuery);
    for (const service of order_services) {
      // Verify that service_id exists in common_services
      const serviceCheckQuery = `
          SELECT service_id FROM common_services WHERE service_id = ?
          
        `;
      const serviceCheckResult = await conn.query(serviceCheckQuery, [
        service.service_id,
      ]);

      if (
        !Array.isArray(serviceCheckResult) ||
        serviceCheckResult.length === 0
      ) {
        throw new Error(
          `Service with ID ${service.service_id} does not exist in common_services`
        );
      }

      const serviceCompletedValue = service.service_completed ? 1 : 0;
      // Insert or update order_service
      const orderServiceQuery = `
      INSERT INTO order_services (order_hash, service_id, service_completed)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
          service_completed = VALUES(service_completed)
    `;
      const orderServiceResult = await conn.query(orderServiceQuery, [
        order_hash,
        service.service_id,
        serviceCompletedValue,
      ]);

      console.log("OrderServiceResult:", orderServiceResult);
      if (orderServiceResult.affectedRows === 0) {
        throw new Error("Failed to create or update order service");
      }
    }

    // Update or insert order status
    const statusExistsQuery = `
      SELECT order_status_hash FROM order_status WHERE order_hash = ?
    `;
    const statusExistsResult = await conn.query(statusExistsQuery, [
      order_hash,
    ]);

    if (statusExistsResult.length > 0) {
      // If status exists, update it
      const updateStatusQuery = `
        UPDATE order_status
        SET order_status = ?
        WHERE order_hash = ?
      `;
      const updateStatusResult = await conn.query(updateStatusQuery, [
        order_status,
        order_hash,
      ]);
      if (updateStatusResult.affectedRows === 0) {
        throw new Error("Failed to update order status");
      }
    } else {
      // If status does not exist, insert it
      const insertStatusQuery = `
        INSERT INTO order_status (order_hash, order_status)
        VALUES (?, ?)
      `;
      const insertStatusResult = await conn.query(insertStatusQuery, [
        order_hash,
        order_status,
      ]);
      if (insertStatusResult.affectedRows === 0) {
        throw new Error("Failed to insert order status");
      }
    }

    return { message: "Order updated successfully" };
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { updateOrder };
