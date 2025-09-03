const express = require("express");
require("dotenv").config(); // IMPORT DOTENV
require("./config/db");

const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and form data
app.use(express.json());


// Test route
app.get("/", (req, res) => {
  res.send("Hello, Node.js Project!");
});

// User routes
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


