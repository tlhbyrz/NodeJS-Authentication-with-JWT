const route = require("express").Router();
const { registerValidation, loginValidation } = require("../validation");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

route.post("/register", async (req, res) => {
  //validate the data before creating new user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check if user already exist
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).send("email already exist");
    }
  } catch (error) {
    console.log(error);
  }

  //hash the password before saving to the db
  try {
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(req.body.password, salt);
  } catch (error) {
    console.log(error);
  }

  //create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    return res.status(400).send("user is not saved");
  }
});

route.post("/login", async (req, res) => {
  //check for validation
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check if user exist
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Email not found!");
      console.log("Email not found!" + error);
    }
  } catch (error) {
    console.log("user olustruma" + error);
  }

  //check password is correct
  try {
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) {
      return res.status(400).send("Invalid password!");
    }
  } catch (error) {
    console.log("password check " + error);
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res.header("auth-token", token).send(token);
});

module.exports = route;
