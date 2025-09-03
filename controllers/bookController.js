const mongoose = require("mongoose");
const Books = require("../models/Book");

// Add a new book
exports.addBook = async (req, res) => {
  
  const userId = req.user._id; // From authMiddleware
  

  const { title, author, genre, price, inStock } = req.body;

  try {
    const existingBook = await Books.findOne({ title});

    if (existingBook) {
      return res.status(409).json({ message: "Book already exists" });
    }

    const newBook = new Books(
      {
         title:title.trim().toUpperCase(),
         author:author.trim().toUpperCase(), 
         genre:genre.trim().toUpperCase(),  
         price,  
         inStock,  
         createdBy: userId,
         });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    res.status(500).json({ message: "Book adding failed", error: err.message });
  }
};

// Get all books (with creator info)
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Books.find().populate("createdBy", "name email");
    if (!books || books.length === 0) {
      return res.status(200).json({ message: "No books found" });
    }
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books", error: err.message });
  }
};

// Get book by ID (with creator info)
exports.getBookById = async (req, res) => {
  const bookId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(404).json({ message: "Book not found" });
  }
  try {
    const book = await Books.findById(bookId).populate("createdBy", "name email");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book", error: err.message });
  }
};

// Update book by ID (only creator)
exports.updateBookById = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user._id; // normalized string from authMiddleware
  const { price, inStock } = req.body;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(404).json({ message: "Invalid Book ID" });
  }

  try {
    const book = await Books.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    //  Only allow creator to update
    if (!book.createdBy || book.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You are not allowed to update this book" });
    }

    if (price !== undefined) book.price = price;
    if (inStock !== undefined) book.inStock = inStock;

    await book.save();
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (err) {
    res.status(500).json({ message: "Error updating book", error: err.message });
  }
};

// Delete book by ID (only creator)
exports.deleteBookById = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user._id; // normalized string from authMiddleware

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(404).json({ message: "Invalid Book ID" });
  }

  try {
    const book = await Books.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    //  Only allow creator to delete
    if (!book.createdBy || book.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You are not allowed to delete this book" });
    }

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book", error: err.message });
  }
};

// Remove __v from JSON output
mongoose.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});
