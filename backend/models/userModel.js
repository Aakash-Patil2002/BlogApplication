const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String, 
  password: String, 
  role: {
    type: String,
    default: "reader",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("bloguser", userSchema);

module.exports = User;
