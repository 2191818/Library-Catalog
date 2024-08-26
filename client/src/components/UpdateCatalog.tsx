import React, { useState } from "react";
import axios from "axios";

interface CatalogItem {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
}

interface UpdateCatalogProps {
  item: CatalogItem;
  onBack: () => void;
  onUpdate: () => void;
}

const UpdateCatalog: React.FC<UpdateCatalogProps> = ({
  item,
  onBack,
  onUpdate,
}) => {
  const [updatedItem, setUpdatedItem] = useState<CatalogItem>(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/catalog/${updatedItem.id}`, updatedItem)
      .then(() => {
        onUpdate(); // Refresh the catalog
        onBack(); // Go back to the catalog view
      })
      .catch((error) => {
        console.error("Error updating catalog item:", error);
      });
  };

  return (
    <div className="update-catalog">
      <h1>Update Catalog Item</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={updatedItem.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            placeholder="Author"
            type="text"
            className="form-control"
            name="author"
            value={updatedItem.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            name="category"
            value={updatedItem.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="ISBN"
            name="isbn"
            value={updatedItem.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button
          type="button"
          onClick={onBack}
          className="btn btn-danger"
          style={{ marginRight: "10px" }}
        >
          <i className="fa-solid fa-backward"></i> Go Back
        </button>
        <button type="submit" className="btn btn-success">
          <i className="fa-solid fa-pen"></i> Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCatalog;
