const mongoose = require('mongoose')


const notificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    posts: [{
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        },
        posteduser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        time: String
    }]
})

module.exports = mongoose.model('notification', notificationSchema)