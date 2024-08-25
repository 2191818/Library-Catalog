import React, { useState } from "react";
import axios from "axios";

const CreateCatalog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title || !author || !category || !isbn) {
      setError("All fields are required");
      return;
    }

    const newItem = { title, author, category, isbn };

    axios
      .post("http://localhost:8080/api/catalog", newItem)
      .then((response) => {
        console.log("Catalog item created:", response.data);
        // Clear form
        setTitle("");
        setAuthor("");
        setCategory("");
        setIsbn("");
        setError("");
      })
      .catch((error) => {
        console.error("Error creating catalog item:", error);
        setError("Failed to create catalog item");
      });
  };

  return (
    <div className="form-container">
      <h2>Create New Catalog Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default CreateCatalog;
