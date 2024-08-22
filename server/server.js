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
