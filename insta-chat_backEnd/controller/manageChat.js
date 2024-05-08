const { asyncwrappe } = require('../middleware/asyncwrapper')
const chatSchema = require('../model/chatModel')


module.exports = {
    getchat: asyncwrappe(async (req, res) => {
        return new Promise(async (resolve, reject) => {
            let user = req.userId
            let friendId = req.body.id
            try {
                let chat = await chatSchema.findOne({ users: { $all: [friendId, user] } }).populate('users', '_id name image ');
                chatdetail = chat ? chat : await (await chatSchema.create({ users: [friendId, user] })).populate('users', '_id name image');
                res.json({ chatdetail })
            } catch (err) {
                reject(err)
            }
        });

    }),
    addmessage: asyncwrappe((req, res) => {
        return new Promise(async (resolve, reject) => {
            let chat = req.body.chat
            try {
                let message = await chatSchema.findByIdAndUpdate(chat.roomId,
                    {
                        $push: {
                            messages: {
                                $each: [chat],
                                $position: 0
                            }
                        }
                    })
                console.log(message, 'messagasfg')
                res.json(message)
            } catch (err) {
                reject(err)
            }
        })
    })

}