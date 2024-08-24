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
  const [user, setUser] = useState<null | {}>(null); // To track the authenticated user
  const [showSignup, setShowSignup] = useState(false); // Toggle between Login and Signup

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
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </nav>
      <br />

      <br />
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
          {catalog.map((item) => (
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
