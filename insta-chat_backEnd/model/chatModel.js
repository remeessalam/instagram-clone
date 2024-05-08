const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
        messages: [{
            roomId: String,
            author: String,
            text: String,
            time: String,

        }]

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Chat', chatSchema);