const userSchema = require('../model/userModel')
const notificationSchema = require('../model/notificationModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createToken = require('../middleware/jwt')
const { asyncwrappe } = require('../middleware/asyncwrapper')

const maxAge = 60 * 60 * 24;

module.exports = {

   register: asyncwrappe(async (req, res) => {
      console.log(req.body)
      const { fullName, email, password } = req.body
      const pass = await bcrypt.hash(password, 10)
      const sameEmail = await userSchema.findOne({ email: email })
      if (sameEmail) {
         throw Error('Sorry, this email already exists. try something different')
      }
      else {
         const user = await userSchema.create({ name: fullName, email: email, password: pass })
         const token = createToken({ user: user, userId: user.id })
         res.status(201).json({ userid: user._id, status: true, user: user, token })
         const notification = await notificationSchema.findById(user._id)
         if (!notification) {
            notificationSchema.create({ user: user._id })
         }
      }
   }
   ),

   login: asyncwrappe(async (req, res) => {
      if (req.body.email_verified) {
         const googledata = req.body
         const guser = await userSchema.findOne({ email: googledata.email })
         if (guser) {
            const token = createToken({ user: guser, userId: guser.id })
            res.status(201).json({ userid: guser._id, status: true, user: guser, token })
            const notification = await notificationSchema.findOne({ user: guser._id })
            if (!notification) {
               notificationSchema.create({ user: guser._id })
            }
         }
         else {
            const user = await userSchema.create({ name: googledata.name, email: googledata.email, password: null, image: googledata.picture })
            const token = createToken({ user: user, userId: user.id })
            res.status(201).json({ userid: user._id, status: true, user: user, token })
            const notification = await notificationSchema.findOne({ user: user._id })
            if (!notification) {
               notificationSchema.create({ user: user._id })
            }
         }
         
      }
      else {
         const { email, password } = req.body
         const user = await userSchema.findOne({ email: email })
         if (user) {
            const use = await bcrypt.compare(password, user.password)
            if (use) {
               const token = createToken({ user: user, userId: user.id })
               res.status(201).json({ userid: user._id, status: true, user: user, token })
               const notification = await notificationSchema.findOne({ user: user._id })
               if (!notification) {
                  notificationSchema.create({ user: user._id })
               }
            }
            else {
               throw Error('Sorry, your password was incorrect. Please double-check your password.')
            }
         }
         else {
            throw Error('Sorry, your email was incorrect. Please double-check your email.')
         }
      }
   }
   ),

   updateProfile: asyncwrappe(async (req, res) => {
      const { form, user } = req.body
      const useid = user.userId
      const use = await userSchema.findByIdAndUpdate(useid, {
         name: form.name, mobile: form.mobile, dateofbirth: form.dateofbirth, bio: form.bio
      })
      res.json({ status: true, user: use })
   }
   ),

   getuser: asyncwrappe(async (req, res) => {
      const user = req.userId
      const userdetails = await userSchema.findOne({ _id: user }).populate('followers').populate('following')
      res.json({ status: true, user: userdetails })
   }),

   getfriend: asyncwrappe(async (req, res) => {
      const user = req.body.id
      console.log(user,'user id reached in get friend request')
      const frienddetails = await userSchema.findOne({ _id: user }).populate('followers').populate('following')
      res.json({ status: true,  frienddetails })
      console.log(frienddetails,'=============frienddetails============')
   }),

   users: asyncwrappe(async (req, res) => {
      const userid = req.userId
      var user = await userSchema.findById(userid)
      userSchema.find({ _id: { $nin: [...user.following, userid] } }, { password: 0 }).sort({ createdAt: '-1' }).limit(7)
         .then(data => {
            res.json({ status: true, user: data })
         }).catch(err => reject(err))
   }),

   follow: asyncwrappe((req, res) => {
      return new Promise((resolve, reject) => {
         const frndId = req.body.frndid
         const userid = req.userId
         userSchema.findByIdAndUpdate(userid, { $addToSet: { following: frndId } }).then(data => {
            userSchema.findByIdAndUpdate(frndId, { $addToSet: { followers: userid } }).then(data => {
               resolve(data)
               console.log('follow')
               res.json({ status: true, resolve })
            }).catch(err => reject(err))
         }).catch(err => reject(err))
      })
   }),

   unfollow: asyncwrappe((req, res) => {
      return new Promise((resolve, reject) => {
         const frndId = req.body.frndid
         const userid = req.userId
         userSchema.findByIdAndUpdate(userid, { $pull: { following: frndId } }).then(data => {
            userSchema.findByIdAndUpdate(frndId, { $pull: { followers: userid } }).then(data => {
               resolve(data)
               console.log('unfollow')
               res.json({ status: true, resolve })
            }).catch(err => reject(err))
         }).catch(err => reject(err))
      })

   }),

   finduser: asyncwrappe((req, res) => {
      return new Promise(async (resolve, reject) => {
         const name = `(?i)${req.body.name}`
         const userid = req.userId
         let result = await userSchema.find({ name: { $regex: name } })
         res.json({ result })
      })
   }),

   getfollowing: asyncwrappe((req, res) => {
      return new Promise(async (resolve, reject) => {
         const userid = req.userId
         let user = await userSchema.find({ _id: userid }).populate('following')
         console.log(user)
         res.json({ user })
      })
   }),

   addprofilepicture: asyncwrappe((req, res) => {
      return new Promise((resolve, reject) => {
         const userid = req.userId
         const image = req.body.image
         console.log(image, 'image in req')
         userSchema.findByIdAndUpdate(userid, { $set: { image: image } })
            .then((data) => {
               userSchema.findById(userid).then((data) => {

                  console.log(data, 'image changed')
                  res.json({ status: true, user: data })
               })
            })
      })
   })
}





