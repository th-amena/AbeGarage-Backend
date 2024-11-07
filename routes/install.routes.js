//Import express router
const express = require("express");
//Import install controller
const installController = require("../controllers/install.controller");
//Create router
const router = express.Router();
//Install route
router.get("/install", installController.install);
//Export router
module.exports = router;
