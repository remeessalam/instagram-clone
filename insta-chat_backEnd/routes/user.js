// const { Router } = require('express')
const express = require('express');
const verify = require('../middleware/token');
const { register, login, updateProfile, getuser, getfriend, users, follow, unfollow, finduser, getfollowing, addprofilepicture } = require('../controller/authentication')
const routes = express.Router()
cons = require('../middleware/token')

routes.route('/signup').post(register)
routes.route('/login').post(login)
routes.route('/profile').post(verify, updateProfile)
routes.route('/getuser').post(verify, getuser)
routes.route('/getfriend').post(verify, getfriend)
routes.route('/users').get(verify, users)
routes.route('/follow').post(verify, follow)
routes.route('/unfollow').post(verify, unfollow)
routes.route('/finduser').post(verify, finduser)
routes.route('/getfollowing').get(verify, getfollowing)
routes.route('/setprofilepicture').post(verify, addprofilepicture)
module.exports = routes 