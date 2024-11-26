const conn = require("../config/db.config"); // Import the connection pool
const crypto = require("crypto"); // Import crypto for generating a hash

// Service function to add a new customer
const addCustomer = async (customerData) => {
  const {
    customer_email,
    customer_phone_number,
    customer_first_name,
    customer_last_name,
    active_customer_status,
  } = customerData; // Extract fields

  // Check if the customer email or phone number already exists
  const [existingCustomer] = await conn.query(
    "SELECT * FROM customer_identifier WHERE customer_email = ? OR customer_phone_number = ?",
    [customer_email, customer_phone_number]
  );

  if (existingCustomer.length > 0) {
    throw new Error("Email or Phone number already registered.");
  }

  try {
    // Step 1: Generate customer_hash
    const customerHash = crypto
      .createHash("sha256")
      .update(customer_email + customer_phone_number)
      .digest("hex");

    // Step 2: Insert into customer_identifier
    const insertCustomerIdentifierQuery = `
      INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) 
      VALUES (?, ?, ?)
    `;
    const [customerIdentifierResult] = await conn.query(
      insertCustomerIdentifierQuery,
      [
        customer_email,
        customer_phone_number,
        customerHash, // Store the generated hash
      ]
    );

    const customerId = customerIdentifierResult.insertId; // Get the generated customer_id

    // Step 3: Insert into customer_info (now with the correct customer_id)
    const insertCustomerInfoQuery = `
      INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) 
      VALUES (?, ?, ?, ?)
    `;
    const [customerInfoResult] = await conn.query(insertCustomerInfoQuery, [
      customerId, // Pass the customer_id from the previous insert
      customer_first_name,
      customer_last_name,
      active_customer_status, // This should be passed in the request data
    ]);

    // Check if the insert was successful
    if (customerInfoResult.affectedRows !== 1) {
      console.error("Failed to insert into customer_info table");
      return null;
    }

    // Return success message
    return {
      message: "Customer created successfully.",
      customerId,
    };
  } catch (error) {
    console.error("Error in addCustomer:", error);
    return null; // Return null on failure, or handle it differently
  }
};
const getCustomerId = async (hash)=> {
  try {
    const query = `
      SELECT customer_id 
      FROM customer_identifier 
      WHERE customer_hash = ?
    `;
    const [result] = await conn.execute(query, [hash]);
    return result;
  } catch (error) {
    console.error("Error in getCustomerId:", error.message);
    throw new Error("Failed to fetch customer ID");
  }
}
// Update customer details by hash
const updateCustomer = async (hash, updatedData) => {
  try {
    const errors = []; // Array to track any update failures.

    // Step 1: Retrieve the customer_id using the hash
    const result = await getCustomerId(hash);
    if (!result || result.length === 0) {
      return "not_found"; // Return if the customer does not exist.
    }
    const customer_id = result[0].customer_id;

    // Step 2: Update the customer_identifier table (if applicable)
    if (updatedData.customer_phone_number) {
      const queryIdentifier = `
        UPDATE customer_identifier 
        SET customer_phone_number = COALESCE(?, customer_phone_number)
        WHERE customer_id = ?
      `;
      const [resultIdentifier] = await conn.execute(queryIdentifier, [
        updatedData.customer_phone_number,
        customer_id,
      ]);

      if (resultIdentifier.affectedRows === 0) {
        errors.push("Failed to update customer_identifier table");
      }
    }

    // Step 3: Update the customer_info table (first name, last name)
    if (updatedData.customer_first_name || updatedData.customer_last_name) {
      const queryInfo = `
        UPDATE customer_info 
        SET customer_first_name = COALESCE(?, customer_first_name),
            customer_last_name = COALESCE(?, customer_last_name)
        WHERE customer_id = ?
      `;
      const [resultInfo] = await conn.execute(queryInfo, [
        updatedData.customer_first_name,
        updatedData.customer_last_name,
        customer_id,
      ]);

      if (resultInfo.affectedRows === 0) {
        errors.push("Failed to update customer_info table");
      }
    }

    // Step 4: Return Results
    if (errors.length > 0) {
      return { success: false, message: "Some updates failed", errors };
    } else {
      return { success: true, message: "Customer updated successfully" };
    }
  } catch (error) {
    console.error("Error in updateCustomer:", error.message);
    throw new Error("Unexpected server error");
  }
};

module.exports = { addCustomer, updateCustomer };
