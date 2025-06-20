import express from "express";
import Book from "../models/Book.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json("Unauthorized");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Invalid token");
    req.user = user;
    next();
  });
};

// Get all books
router.get("/", verifyToken, async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.id });
    res.json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add book
router.post("/", verifyToken, async (req, res) => {
  try {
    const newBook = new Book({
      ...req.body,
      userId: req.user.id,
    });
    await newBook.save();
    res.status(201).json("Book added");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit book
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!book) return res.status(404).json("Book not found");

    await Book.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json("Book updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete book
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!book) return res.status(404).json("Book not found");

    await Book.deleteOne({ _id: req.params.id });
    res.json("Book deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
