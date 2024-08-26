import React, { useState } from "react";
import axios from "axios";

const CreateCatalog: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //Check to see if any fields are empty
    if (!title || !author || !category || !isbn) {
      setError("All fields are required");
      return;
    }

    const newItem = {
      title,
      author,
      category,
      isbn,
    };

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
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Author"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Category"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            placeholder="ISBN"
            className="form-control"
          />
        </div>
        <br />
        {error && <p className="error">{error}</p>}
        <br />
        <button
          onClick={onBack}
          className="btn btn-danger"
          style={{ marginRight: "10px" }}
        >
          <i className="fa-solid fa-backward"></i> Go Back
        </button>
        <button className="btn btn-success" type="submit">
          <i className="fa-solid fa-circle-plus"></i> Create Item
        </button>
      </form>
    </div>
  );
};

export default CreateCatalog;
