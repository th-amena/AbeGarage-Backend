// Importing express module
const express = require("express");

// Importing all services
const { getAllService } = require("../services/service.service");

// Creating a function that returns all services
const getAllServices = async (req, res) => {
  try {
    const services = await getAllService();

    if (!services) {
      return res.status(400).json({ message: "Failed to get all services!" });
    } else {
      return res.status(200).json({
        services,
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    // Check if the error indicates a 401 Unauthorized status
    if (error.status === 401) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Exporting the function as a module
module.exports = { getAllServices };
