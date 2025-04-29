const User = require("../models/User");
const Chat = require("../models/Chat");
module.exports.showDashboard = async (req, res) => {
  let USER = req.session.user;
  console.log(USER);
  let ChatsByUser = await Chat.find({
    $or: [{ sender: USER }, { receiver: USER }],
  }).populate(["sender", "receiver"]);
  console.log(ChatsByUser);
  res.render("pages/index", { USER, Chats: ChatsByUser });
};
