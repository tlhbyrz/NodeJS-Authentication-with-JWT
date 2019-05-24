const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50,
    min: 3
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    max: 1000,
    min: 3
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("User", userSchema);
