const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image: {
        type: Array
    },
    Likes: {
        type: Array,
        default: [],
    },
    caption:{
        type:String
    },
    comments: [
        {
            comment: {
                type: String,
            },
            commentBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            commentAt: {
                type: Date,
                default: new Date(),
            },
        },
    ]
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('post', postSchema)