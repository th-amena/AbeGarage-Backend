// // controllers/customerController.js
// const { Customer } = require("../models");
// const { validateCustomerData } = require("../validators"); // Your Joi validator

// // Handle creating a new customer
// async function createCustomer(req, res) {
//   const { name, email, phone, address } = req.body;

//   // Validate input data using Joi or a similar validator
//   const { error } = validateCustomerData({ name, email, phone, address });
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   try {
//     // Check if the email already exists
//     const existingCustomer = await Customer.findOne({ where: { email } });
//     if (existingCustomer) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     // Create the new customer
//     const newCustomer = await Customer.create({ name, email, phone, address });
//     res.status(201).json({
//       message: "Customer created successfully",
//       customer: newCustomer,
//     });
//   } catch (err) {
//     console.error(err); // Log the error
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

// module.exports = { createCustomer };
