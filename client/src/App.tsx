import React, { useEffect, useState } from "react";
import axios from "axios";

interface CatalogItem {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
}

const App: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);

  useEffect(() => {
    axios
      .get<CatalogItem[]>("http://localhost:8080/api/catalog")
      .then((response) => {
        setCatalog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching catalog data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Library Catalog</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {catalog.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.category}</td>
              <td>{item.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
