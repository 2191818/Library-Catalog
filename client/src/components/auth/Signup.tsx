import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Handle successful signup
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1 className="display-1">MoznaPOS</h1>
      <br />
      <h2>Sign up</h2>
      <br />
      <form onSubmit={handleSignup}>
        <div className="mb3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="mb3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div className="d-grid gap-2 col-12 mx-auto">
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </div>
      </form>
      <br />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Signup;
