const customerService = require("../services/customer.service");

// Controller function to handle adding a new customer
const addCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const result = await customerService.addCustomer(customerData);
    res
      .status(201)
      .json({ message: "Customer created successfully!", data: result });
  } catch (error) {
    // When an error occurs in your application (such as a database query failure or any other exception), this line helps you trace it by printing out the error object.
    console.error("Error in addCustomer:", error);

    // The 409 Conflict HTTP status code indicates that the request could not be completed due to a conflict, such as a duplicate resource.
    if (error.status === 409) {
      // Handle conflict error
      return res.status(409).json({
        message: error.message,
      });
    }

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
//Update customer information by hash

const updateCustomer = async (req, res) => {
  try {
    const { hash } = req.params; // Customer hash from the URL
    const { customer_phone_number, customer_first_name, customer_last_name } =
      req.body;
    // Validate hash
    if (!hash) {
      return res.status(400).json({
        error: "Bad Request",
        message: "The customer hash provided is invalid or missing.",
      });
    }

    // Check if at least one field is provided for update
    if (!customer_phone_number && !customer_first_name && !customer_last_name) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "At least one field (phone number, first name, or last name) is required to update.",
      });
    }

    // Call service to update customer details
    const updateResult = await customerService.updateCustomer(hash, {
      customer_phone_number,
      customer_first_name,
      customer_last_name,
    });

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        error: "Customer not found",
        message: "The customer hash provided does not exist.",
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
    });
  } catch (error) {
    console.error("Error updating customer:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while updating customer data.",
    });
  }
};


module.exports = { addCustomer, updateCustomer };

