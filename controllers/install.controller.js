//Import installservice
const installService = require('../services/install.service');
//Create a function to handle install route
async function install(req, res, next) {
//Call the install service to create the database tables
const installMessage = await installService.install();
//Check if the install was successful or not to send a response to the client
if(installMessage === 200){
    res.status(200).json({message:installMessage});;
}else{
    res.status(500).json({message:installMessage});
}
}
//Export the install function
module.exports = {install};