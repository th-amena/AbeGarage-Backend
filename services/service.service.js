// import the query function from db.config.js file
const connection = require("../config/db.config");

// Controller to get all services
const getAllService = async () => {
  try {
    const query = "SELECT * FROM common_services";

    const response = await connection.query(query);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { getAllService };
