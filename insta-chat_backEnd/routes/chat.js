const express = require('express')
const routes = express.Router()
const { getchat ,addmessage } = require('../controller/manageChat')
const verify = require('../middleware/token')

routes.route('/getchat').post(verify, getchat)
routes.route('/addmessage').post(verify, addmessage)



module.exports = routes  