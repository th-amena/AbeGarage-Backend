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
      throw {
         status: 409,
         message: "Email or Phone number already registered.",
      }; // Return conflict error if email/phone exists
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
      return { customerId, message: "Customer created successfully." };
   } catch (error) {
      console.error("Error in addCustomer:", error);
      throw error; // Re-throw the error for controller handling
   }
};

// Service function to get all customers
const getAllCustomers = async () => {
   try {
      const query = `
         SELECT 
            ci_info.customer_first_name,
            ci_info.customer_last_name,
            ci_info.active_customer_status,
            cid.customer_email,
            cid.customer_phone_number
         FROM 
            customer_info AS ci_info
         JOIN 
            customer_identifier AS cid
         ON 
            ci_info.customer_id = cid.customer_id
      `;

      const [customers] = await conn.query(query); // Execute the query
      return customers; // Return the customers array
   } catch (error) {
      console.error("Error in getAllCustomers:", error); // Log the error
      throw error; // Propagate the error
   }
};

// Service function to search customers by term
const searchCustomers = async (searchTerm) => {
   try {
      const query = `
         SELECT 
            ci_info.customer_first_name,
            ci_info.customer_last_name,
            ci_info.active_customer_status,
            cid.customer_email,
            cid.customer_phone_number
         FROM 
            customer_info AS ci_info
         JOIN 
            customer_identifier AS cid
         ON 
            ci_info.customer_id = cid.customer_id
         WHERE 
            ci_info.customer_first_name LIKE ? OR
            ci_info.customer_last_name LIKE ? OR
            cid.customer_email LIKE ? OR
            cid.customer_phone_number LIKE ?
      `;
      const searchPattern = `%${searchTerm}%`; // Add % for SQL LIKE search
      const [customers] = await conn.query(query, [
         searchPattern,
         searchPattern,
         searchPattern,
         searchPattern,
      ]);
      return customers;
   } catch (error) {
      console.error("Error in searchCustomers:", error);
      throw error;
   }
};

// Service function to get customer by ID
const getCustomerById = async (customerId) => {
   try {
      const query = `
      SELECT * 
      FROM customer_info 
      WHERE customer_id = ?
    `;
      const [customer] = await conn.query(query, [customerId]);
      return customer.length > 0 ? customer[0] : null; // Return customer or null if not found
   } catch (error) {
      console.error("Error in getCustomerById:", error);
      throw error;
   }
};

module.exports = {
   addCustomer,
   getAllCustomers,
   searchCustomers,
   getCustomerById,
};
