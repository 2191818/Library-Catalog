import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

const CustomerTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("http://localhost:8080/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="customer-table">
      <h1>Customer Table</h1>
      <br />
      <table className="table table-light">
        <thead>
          <tr>
            <th>Email</th>
            <th>Items Renting</th>
            <th>Total Items Rented</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{user.email}</td>
              <td>4</td>
              <td>4</td>
              <td>
                <i className="fa-solid fa-receipt"></i>
                <br />
                <i className="fa-solid fa-book"></i>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
