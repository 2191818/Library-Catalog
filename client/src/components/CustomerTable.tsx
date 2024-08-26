import React, { useEffect, useState } from "react";
import axios from "axios";

// Define structure for User object
interface User {
  uid: string;
  email: string | null;
  itemsTakenOut: number;
  totalItemsRented: number;
}

const CustomerTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Using axios to call API functions to frontend (Getting users)
  useEffect(() => {
    axios
      .get<User[]>("http://localhost:8080/api/users")
      .then((response) => {
        const usersWithInitializedValues = response.data.map((user) => ({
          ...user,
          itemsTakenOut: user.itemsTakenOut ?? 0,
          totalItemsRented: user.totalItemsRented ?? 0,
        }));
        setUsers(usersWithInitializedValues);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Creating ciounter for increaseing books that are currently checked out and increasing the total amount of books checked out to that user
  const handleReceiptClick = (user: User) => {
    const updatedUsers = users.map((u) =>
      u.uid === user.uid
        ? {
            ...u,
            itemsTakenOut: (u.itemsTakenOut || 0) + 1,
            totalItemsRented: (u.totalItemsRented || 0) + 1,
          }
        : u
    );
    setUsers(updatedUsers);
  };

  // Creating counter function for decreasing books that are currently checked out
  const handleBookClick = (user: User) => {
    const updatedUsers = users.map((u) =>
      u.uid === user.uid
        ? {
            ...u,
            itemsTakenOut: Math.max((u.itemsTakenOut || 0) - 1, 0),
          }
        : u
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="customer-table">
      <h1>Customer Table</h1>
      <br />
      <table className="table table-light">
        <thead>
          <tr>
            <th>Email</th>
            <th>Items Taken Out</th>
            <th>Total Items Rented</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{user.email}</td>
              <td>{user.itemsTakenOut || 0}</td>
              <td>{user.totalItemsRented || 0}</td>
              <td>
                <i
                  className="fa-solid fa-receipt"
                  style={{
                    color: "green",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleReceiptClick(user)}
                ></i>
                <i
                  className="fa-solid fa-book"
                  style={{ color: "royalblue", cursor: "pointer" }}
                  onClick={() => handleBookClick(user)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
