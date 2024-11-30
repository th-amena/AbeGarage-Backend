// service.service.js
const connection = require("../config/db.config");

const getServiceById = async (id) => {
  try {
    const query = "SELECT * FROM common_services WHERE service_id = ?";
    const [rows] = await connection.query(query, [id]);

    if (rows.length === 0) {
      return null; // Service not found
    }

    return rows[0]; // Return the first service in the result set
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { getServiceById };
