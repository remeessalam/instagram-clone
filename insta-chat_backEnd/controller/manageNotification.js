const { asyncwrappe } = require('../middleware/asyncwrapper')
const notificationSchema = require('../model/notificationModel')




module.exports = {
    getnotification: asyncwrappe((req, res) => {
        console.log('notification call reached in controller')
        let user = req.userId
        return new Promise((resolve, reject) => {
            console.log(user, 'user in get notification ')
            notificationSchema.findOne({ user }).populate('posts.posteduser').populate('posts.post').sort().then((data) => {
                console.log(data)
                res.json({ data })
            })
        })
    })
}