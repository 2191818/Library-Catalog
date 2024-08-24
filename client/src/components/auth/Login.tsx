import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Handle successful login
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1 className="display-1">MoznaPOS</h1>
      <br />
      <h2>Login</h2>
      <br />
      <form onSubmit={handleLogin}>
        <div className="mb3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
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
            Login
          </button>
        </div>
      </form>
      <br />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
