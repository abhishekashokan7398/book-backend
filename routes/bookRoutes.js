const express = require("express");
const routes = express.Router();

const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

// Add book (protected)
routes.post("/", authMiddleware, bookController.addBook);

// Get all books (public)
routes.get("/", bookController.getAllBooks);

// Get book by ID (public)
routes.get("/:id", bookController.getBookById);

// Update book by ID (protected)
routes.put("/:id", authMiddleware, bookController.updateBookById);

// Delete book by ID (protected)
routes.delete("/:id", authMiddleware, bookController.deleteBookById);

module.exports = routes;
