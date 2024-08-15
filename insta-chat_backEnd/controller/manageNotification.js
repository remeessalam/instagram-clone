const { asyncwrappe } = require("../middleware/asyncwrapper");
const notificationSchema = require("../model/notificationModel");

module.exports = {
  getnotification: asyncwrappe((req, res) => {
    let user = req.userId;
    return new Promise((resolve, reject) => {
      notificationSchema
        .findOne({ user })
        .populate("posts.posteduser")
        .populate("posts.post")
        .sort()
        .then((data) => {
          res.json({ data });
        });
    });
  }),
};
