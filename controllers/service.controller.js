// service.controller.js
const { getServiceById } = require("../services/service.service");

const getSingleService = async (req, res) => {
  const { id } = req.params; // Extract the service ID from the request parameter

  try {
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid service ID provided!" });
    }

    const service = await getServiceById(id); // Fetch service by ID

    if (!service) {
      return res.status(404).json({ message: "Service not found!" });
    }
    // Return the service details in the response
    return res.status(200).json({
     service
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getSingleService };
