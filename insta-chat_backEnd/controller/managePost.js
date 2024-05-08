const { asyncwrappe } = require('../middleware/asyncwrapper')
const postSchema = require('../model/postModel')
const notificationSchema = require('../model/notificationModel')
const userSchema = require('../model/userModel')


module.exports = {

    upload: asyncwrappe((req, res) => {
        console.log(req.body.caption, 'arrray')
        postSchema.create({
            user: req.userId,
            image: req.body.post,
            caption: req.body.caption
        }).then(data => {
            res.json({ msg: 'post added in database' })
            const postes = data
            userSchema.findById(data.user).then((data) => {
                const followers = data.followers
                const noty = {
                    post: postes._id,
                    posteduser: req.userId,
                    time: new Date()
                }
                console.log(followers, noty, 'followers ==========')
                notificationSchema.updateMany({ user: { $in: [...followers] } }, { $push: { posts: { $each: [noty], $position: 0 } } })
                    .then((data) => {
                        console.log(data, 'notification added')
                    })
            })
        })
    }),

    getPost: asyncwrappe((req, res) => {
        return new Promise((resolve, reject) => {
            postSchema.find().sort({ createdAt: '-1' }).populate('user').populate('comments.commentBy').then((post) => {
                res.json({ status: true, post })
            })
        })
    }),
    getfriendpost: asyncwrappe((req, res) => {
        const user = req.body.id
        return new Promise((resolve, reject) => {
            console.log(user, 'user id reached')
            postSchema.find({ user }).sort({ createdAt: '-1' }).populate('user').populate('comments.commentBy').then((post) => {
                console.log(post, 'post================')
                res.json({ status: true, post })
            })
        })
    }),

    userPost: asyncwrappe((req, res) => {
        return new Promise((resolve, reject) => {
            user = req.userId
            postSchema.find({ user: user }).sort({ createdAt: '-1' }).then((data) => {
                res.json({ status: true, data })
            })
        })
    }),

    Like: asyncwrappe((req, res) => {
        return new Promise(async (resolve, reject) => {
            let user = req.userId
            let postId = req.body.postId
            try {
                let likes = await postSchema.findOne({ _id: postId, Likes: user })

                if (likes) {
                    let data = await postSchema.findByIdAndUpdate(postId, { $pull: { Likes: user } })
                    res.json({ msg: 'Unliked', count: data.Likes.length })
                } else {
                    let data = await postSchema.findByIdAndUpdate(postId, { $push: { Likes: user } })
                    res.json({ msg: 'Liked', count: data.Likes.length })
                }
            } catch (err) {
                reject(err)
            }

        })
    }),

    addCommnent: asyncwrappe((req, res) => {
        return new Promise(async (resolve, reject) => {
            let userId = req.userId
            let postId = req.body.postId
            let text = req.body.text
            try {
                let userCommnent = {
                    comment: text,
                    commentBy: userId,
                    commentAt: new Date()
                }
                let data = await postSchema.findByIdAndUpdate(postId, { $push: { comments: { $each: [userCommnent], $position: 0 } } })
                resolve({ msg: 'comment added' })
                res.json({ status: true, resolve })
            } catch (err) {
                reject(err)
            }

        })
    }),

    popcomment: asyncwrappe((req, res) => {
        return new Promise((resolve, reject) => {
            try {
                const commentId = req.body.commentid
                const postId = req.body.postid
                postSchema.findByIdAndUpdate(postId, { $pull: { comments: { _id: commentId } } })
                    .then((data) => {
                        resolve({ msg: 'comment removed' })
                        res.json({ status: true, resolve })
                    })
            } catch (err) {
                reject(err)
            }

        })
    }),
}