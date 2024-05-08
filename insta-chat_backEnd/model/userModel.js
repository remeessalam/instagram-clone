const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    image: {
        type: String,
    },
    mobile: {
        type: String
    },
    dateofbirth: {
        type: Date
    },
    bio: {
        type: String
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    requests: {
        type: Array,
        default: [],
    }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)