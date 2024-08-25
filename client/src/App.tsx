import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import axios from "axios";
import "./App.css";

interface CatalogItem {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
}

const App: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [filteredCatalog, setFilteredCatalog] = useState<CatalogItem[]>([]); // State for filtered catalog
  const [user, setUser] = useState<null | {}>(null); // To track the authenticated user
  const [showSignup, setShowSignup] = useState(false); // Toggle between Login and Signup
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get<CatalogItem[]>("http://localhost:8080/api/catalog")
        .then((response) => {
          setCatalog(response.data);
          setFilteredCatalog(response.data); // Initialize filtered catalog with all data
        })
        .catch((error) => {
          console.error("Error fetching catalog data:", error);
        });
    }
  }, [user]);

  const toggleAuthMode = () => {
    setShowSignup((prev) => !prev);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    // Filter catalog based on search query
    const filtered = catalog.filter(
      (item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.isbn.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCatalog(filtered);
  };

  if (!user) {
    return showSignup ? (
      <div>
        <Signup />
        Already have an account?
        <br />
        <button onClick={toggleAuthMode} className="no-bg-button">
          {" "}
          Login
        </button>
      </div>
    ) : (
      <div>
        <Login />
        Don't have an account?
        <br />
        <button onClick={toggleAuthMode} className="no-bg-button">
          Sign up
        </button>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            MoznaPOS
          </a>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="http://localhost:5173/customer"
              >
                Customer Table
              </a>
            </li>
          </ul>
          <button onClick={handleLogout} className="btn btn-danger ml-2">
            Logout
          </button>
        </div>
      </nav>
      <br />
      <br />
      <br />
      <h1>Libray Catalog</h1>
      <br />
      <form className="d-flex" role="search">
        <input
          type="search"
          placeholder="Search by title, ISBN, or category"
          className="form-control mr-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>
      <br />
      <table className="table">
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
                  style={{ color: "firebrick" }}
                ></i>
                <i
                  className="fa-solid fa-pen"
                  style={{ color: "lightseagreen" }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
