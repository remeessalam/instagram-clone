const express = require('express')
const routes = express.Router()
const { upload, getPost, userPost, getfriendpost, Like, addCommnent, popcomment } = require('../controller/managePost')
const verify = require('../middleware/token')

routes.route('/uploadPost').post(verify, upload)
routes.route('/allpost').get(verify, getPost)
routes.route('/getpost').post(verify, userPost)
routes.route('/clicklike').post(verify, Like)
routes.route('/sendcomment').post(verify, addCommnent)
routes.route('/popcomment').post(verify, popcomment)
routes.route('/getfriendpost').post(verify, getfriendpost)



module.exports = routes   