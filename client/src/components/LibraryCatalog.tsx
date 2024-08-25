import React, { useEffect, useState } from "react";
import axios from "axios";

interface CatalogItem {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
}

const LibraryCatalog: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [filteredCatalog, setFilteredCatalog] = useState<CatalogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get<CatalogItem[]>("http://localhost:8080/api/catalog")
      .then((response) => {
        setCatalog(response.data);
        setFilteredCatalog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching catalog data:", error);
      });
  }, []);

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
        <button type="button" className="btn btn-success">
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
                  style={{ color: "firebrick", marginRight: "10px" }}
                ></i>
                <i
                  className="fa-solid fa-pen"
                  style={{ color: "royalblue" }}
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
