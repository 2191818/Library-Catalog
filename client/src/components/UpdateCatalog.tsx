import React, { useState, useEffect } from "react";
import axios from "axios";

interface UpdateCatalogProps {
  itemId: number;
}

const UpdateCatalog: React.FC<UpdateCatalogProps> = ({ itemId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the item to update
    axios
      .get(`http://localhost:8080/api/catalog/${itemId}`)
      .then((response) => {
        const item = response.data;
        setTitle(item.title);
        setAuthor(item.author);
        setCategory(item.category);
        setIsbn(item.isbn);
      })
      .catch((error) => {
        console.error("Error fetching catalog item:", error);
        setError("Failed to fetch catalog item");
      });
  }, [itemId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title || !author || !category || !isbn) {
      setError("All fields are required");
      return;
    }

    const updatedItem = { title, author, category, isbn };

    axios
      .put(`http://localhost:8080/api/catalog/${itemId}`, updatedItem)
      .then((response) => {
        console.log("Catalog item updated:", response.data);
        // Clear form or redirect
        setError("");
      })
      .catch((error) => {
        console.error("Error updating catalog item:", error);
        setError("Failed to update catalog item");
      });
  };

  return (
    <div className="form-container">
      <h2>Update Catalog Item</h2>
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
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateCatalog;
