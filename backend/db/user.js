const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String },
  email: { type: String, unique: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
