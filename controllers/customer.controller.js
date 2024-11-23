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
//Controller function to handle getting all customers
const getSingleCustomerByHash = async (req,res)=>{
  try {
    const { hash } = req.params;

    // Validate hash
    if (!hash || typeof hash !== 'string' || hash.trim().length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The customer hash provided is invalid or missing.',
        });
    }

    // Fetch customer data
    const customer = await customerService.getCustomerByHash(hash);

    if (!customer) {
        return res.status(404).json({
            error: 'Customer not found',
            message: 'The customer hash provided does not exist.',
        });
    }

    // Return customer data
    res.status(200).json(customer);
} catch (error) {
    console.error('Error fetching customer:', error.message);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred while fetching customer data.',
    });
}
}
module.exports = { addCustomer,getSingleCustomerByHash };
