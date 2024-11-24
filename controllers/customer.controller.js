const customerService = require("../services/customer.service"); // Import customer service

// Controller to handle adding a customer
const addCustomer = async (req, res) => {
   try {
      const customerData = req.body; // Get customer data from the request body
      const result = await customerService.addCustomer(customerData); // Call the service to add the customer
      res.status(201).json(result); // Send success response with customer info
   } catch (error) {
      console.error("Error in addCustomer:", error);
      if (error.status) {
         res.status(error.status).json({ message: error.message }); // Handle specific error status
      } else {
         res.status(500).json({ message: "Internal server error" }); // Generic server error
      }
   }
};

// Controller to handle getting all customers
const getAllCustomers = async (req, res) => {
   try {
      const customers = await customerService.getAllCustomers(); // Call the service to fetch all customers
      if (customers.length === 0) {
         return res.status(404).json({ message: "No customers found." }); // If no customers found
      }
      res.status(200).json(customers); // Send the list of customers
   } catch (error) {
      console.error("Error in getAllCustomers:", error);
      res.status(500).json({ message: "Internal server error" }); // Handle errors
   }
};

// Controller to handle searching customers by search term
const searchCustomers = async (req, res) => {
   const { searchTerm } = req.query; // Get search term from query parameters
   try {
      if (!searchTerm) {
         return res.status(400).json({ message: "Search term is required." });
      }

      const customers = await customerService.searchCustomers(searchTerm); // Call service to search customers
      if (customers.length === 0) {
         return res
            .status(404)
            .json({ message: "No matching customers found." });
      }
      res.status(200).json(customers); // Send the search results
   } catch (error) {
      console.error("Error in searchCustomers:", error);
      res.status(500).json({ message: "Internal server error" }); // Handle errors
   }
};

// Controller to handle getting a customer by ID
const getCustomerById = async (req, res) => {
   const { id } = req.params; // Get the customer ID from the route parameter
   try {
      const customer = await customerService.getCustomerById(id); // Call the service to fetch the customer by ID
      if (!customer) {
         return res.status(404).json({ message: "Customer not found." }); // If customer not found
      }
      res.status(200).json(customer); // Send customer data
   } catch (error) {
      console.error("Error in getCustomerById:", error);
      res.status(500).json({ message: "Internal server error" }); // Handle errors
   }
};

module.exports = {
   addCustomer,
   getAllCustomers,
   searchCustomers,
   getCustomerById,
};
