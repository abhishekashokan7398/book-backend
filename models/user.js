const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: (v) => v.replace(/\s+/g, " ").trim(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    trim: true,
    set: (v) => v.replace(/\s+/g, " ").trim(),
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters or more"],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", user);
