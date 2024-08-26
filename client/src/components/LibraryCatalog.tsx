import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateCatalog from "./CreateCatalog";
import UpdateCatalog from "./UpdateCatalog";

// Define structure for Catalog object
interface CatalogItem {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
}

// Creating all needed states
const LibraryCatalog: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [filteredCatalog, setFilteredCatalog] = useState<CatalogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"catalog" | "create" | "update">("catalog");
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);

  // Fetch Catalog data from API
  useEffect(() => {
    fetchCatalog();
  }, []);

  // Fetches Catalog data from API
  const fetchCatalog = () => {
    axios
      .get<CatalogItem[]>("http://localhost:8080/api/catalog")
      .then((response) => {
        setCatalog(response.data);
        setFilteredCatalog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching catalog data:", error);
      });
  };

  //Updates the catalog table based off of search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    const filtered = catalog.filter(
      (item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.isbn.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCatalog(filtered);
  };

  // Switch table to create catalog view
  const handleCreateClick = () => {
    setView("create");
  };

  // Switch table to update catalog view
  const handleEditClick = (item: CatalogItem) => {
    setSelectedItem(item);
    setView("update");
  };

  // Using axios to call API functions to frontend (Delete catalog)
  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:8080/api/catalog/${id}`)
        .then(() => {
          fetchCatalog();
        })
        .catch((error) => {
          console.error("Error deleting catalog item:", error);
        });
    }
  };

  // Switch table to go back to catalog view (Used for create and update view to go back to table)
  const handleBackToCatalog = () => {
    setView("catalog");
    setSelectedItem(null);
  };

  // Renders create catalog view
  if (view === "create") {
    return <CreateCatalog onBack={handleBackToCatalog} />;
  }

  // Renders update catalog view
  if (view === "update" && selectedItem) {
    return (
      <UpdateCatalog
        item={selectedItem}
        onBack={handleBackToCatalog}
        onUpdate={fetchCatalog}
      />
    );
  }

  return (
    <div className="library-catalog">
      <h1>Library Catalog</h1>
      <br />
      <form className="d-flex" role="search">
        <input
          type="search"
          placeholder="Search by title, ISBN, or category"
          className="form-control mr-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={handleCreateClick}
        >
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </form>
      <br />
      <table className="table table-light">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCatalog.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.category}</td>
              <td>{item.isbn}</td>
              <td>
                <i
                  className="fa-solid fa-trash"
                  style={{
                    color: "firebrick",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeleteClick(item.id)}
                ></i>
                <i
                  className="fa-solid fa-pen"
                  style={{ color: "royalblue", cursor: "pointer" }}
                  onClick={() => handleEditClick(item)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibraryCatalog;
