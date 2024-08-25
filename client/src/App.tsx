import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import LibraryCatalog from "./components/LibraryCatalog";
import CustomerTable from "./components/CustomerTable";
import "./App.css";

const App: React.FC = () => {
  const [user, setUser] = useState<null | {}>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [view, setView] = useState<"catalog" | "customers">("catalog");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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

  const handleViewChange = (view: "catalog" | "customers") => {
    setView(view);
  };

  if (!user) {
    return showSignup ? (
      <div>
        <Signup />
        Already have an account?
        <br />
        <button onClick={toggleAuthMode} className="no-bg-button">
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            MoznaPOS
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <a
              href="#"
              className="nav-link active me-2"
              onClick={() => handleViewChange("catalog")}
              style={{ cursor: "pointer" }}
            >
              Library Catalog
            </a>
            <a
              href="#"
              className="nav-link active"
              onClick={() => handleViewChange("customers")}
              style={{ cursor: "pointer" }}
            >
              Customer Table
            </a>
          </ul>
          <button onClick={handleLogout} className="btn btn-danger ml-2">
            Logout
          </button>
        </div>
      </nav>
      <br />
      {view === "catalog" && <LibraryCatalog />}
      {view === "customers" && <CustomerTable />}
    </div>
  );
};

export default App;
