const express = require("express");
const routes = express.Router();
const { getnotification } = require("../controller/manageNotification");
const verify = require("../middleware/token");

routes.route("/getnotification").get(verify, getnotification);

module.exports = routes;
