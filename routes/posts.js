const route = require("express").Router();
const User = require("../model/User");
const verify = require("../verifyToken");

route.get("/", verify, (req, res) => {
  res.send("Successfuly get all posts!");
  console.log(req.user._id);

  //user.find({_id:req.user}) diyince nedense calismiyo amk.
  //circular json falan oluyomus ama neden oyle oluyo onu da anlamadim.
});

module.exports = route;
