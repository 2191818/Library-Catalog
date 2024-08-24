const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

//Added cors because of browser saftey issues that were occuring between frontend and backend
app.use(cors());

const catalog = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Book",
    isbn: "123456789",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "Book",
    isbn: "987654321",
  },
  {
    id: 3,
    title: "The Science of Climate Change",
    author: "John Doe",
    category: "Paper",
    isbn: "555555555",
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Book",
    isbn: "111222333",
  },
  {
    id: 5,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Book",
    isbn: "444555666",
  },
  {
    id: 6,
    title: "The Art of War",
    author: "Sun Tzu",
    category: "Book",
    isbn: "777888999",
  },
  {
    id: 7,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Book",
    isbn: "666777888",
  },
  {
    id: 8,
    title: "The Quantum Theory of Fields",
    author: "Steven Weinberg",
    category: "Paper",
    isbn: "999000111",
  },
  {
    id: 9,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Book",
    isbn: "222333444",
  },
  {
    id: 10,
    title: "The Origin of Species",
    author: "Charles Darwin",
    category: "Book",
    isbn: "888999000",
  },
  {
    id: 11,
    title: "Advanced Machine Learning",
    author: "Andrew Ng",
    category: "Paper",
    isbn: "112233445",
  },
  {
    id: 12,
    title: "The History of Art",
    author: "E.H. Gombrich",
    category: "Book",
    isbn: "223344556",
  },
  {
    id: 13,
    title: "The Theory of Relativity",
    author: "Albert Einstein",
    category: "Paper",
    isbn: "334455667",
  },
  {
    id: 14,
    title: "War and Peace",
    author: "Leo Tolstoy",
    category: "Book",
    isbn: "556677889",
  },
  {
    id: 15,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    category: "Book",
    isbn: "667788990",
  },
  {
    id: 15,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    category: "Book",
    isbn: "667788990",
  },
  {
    id: 15,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    category: "Book",
    isbn: "667788990",
  },
  {
    id: 15,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    category: "Book",
    isbn: "667788990",
  },
  {
    id: 15,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    category: "Book",
    isbn: "667788990",
  },
  {
    id: 15,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    category: "Book",
    isbn: "667788990",
  },
  {
    id: 15,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    category: "Book",
    isbn: "667788990",
  },
  {
    id: 15,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    category: "Book",
    isbn: "667788990",
  },
];

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.get("/api/catalog", (req, res) => {
  res.json(catalog);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
