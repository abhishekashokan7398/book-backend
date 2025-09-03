// models/Book.js
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({

  title: { type: String, required: true ,uppercase: true, trim: true,set: (v) => v.replace(/\s+/g, " ").trim()},
  author: { type: String, required: true ,uppercase: true, trim: true,set: (v) => v.replace(/\s+/g, " ").trim()},
  genre: { type: String, required: true ,uppercase: true, trim: true,set: (v) => v.replace(/\s+/g, " ").trim()},
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔑 link to user
});

module.exports = mongoose.model("Book", BookSchema);
