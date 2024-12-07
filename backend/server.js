const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bookDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import Book model
const Book = require('./models/Book');

// Routes

// 1. Get all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// 2. Add a new book
app.post('/books', async (req, res) => {
  const { title, author, year } = req.body;
  const newBook = new Book({ title, author, year });
  await newBook.save();
  res.json(newBook);
});

// 3. Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

// Serve the frontend (optional)
app.use(express.static(path.join(__dirname, '../frontend')));

// Fallback route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
