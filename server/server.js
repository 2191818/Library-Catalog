const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./library-catalog-fff24-firebase-adminsdk-o41da-6a8cd8dc59.json");
// Yes I know this is security risk to implement security information like this ↑
const catalog = require("./catalog");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://library-catalog-fff24-default-rtdb.firebaseio.com/",
});

//Added cors because of browser saftey issues that were occuring between frontend and backend
app.use(cors());
app.use(express.json());

// Route for checking server
app.get("/", (req, res) => {
  res.send(`Server running on port ${port}`);
});

// Route for getting all catalog items
app.get("/api/catalog", (req, res) => {
  res.json(catalog);
});

// Route for creating catalog items
app.post("/api/catalog", (req, res) => {
  const newItem = req.body;
  newItem.id = catalog.length + 1;
  catalog.push(newItem);
  res.status(201).json(newItem);
});

// Route for updating catalog items
app.put("/api/catalog/:id", (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;

  const index = catalog.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    catalog[index] = { ...catalog[index], ...updatedItem };
    res.status(200).json(catalog[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Route for delete catalog items
app.delete("/api/catalog/:id", (req, res) => {
  const { id } = req.params;
  const index = catalog.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    catalog.splice(index, 1);
    res.status(200).json({ message: "Catalog item deleted successfully" });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Route for getting all from Firebase
app.get("/api/users", async (req, res) => {
  try {
    const listUsers = async (nextPageToken) => {
      const userRecords = await admin.auth().listUsers(1000, nextPageToken);
      const users = userRecords.users.map((user) => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      }));

      res.status(200).json(users);

      if (userRecords.pageToken) {
        listUsers(userRecords.pageToken);
      }
    };

    listUsers();
  } catch (error) {
    res.status(500).json({ error: "Error fetching users: " + error.message });
  }
});

// Current record-keeping system in customer table is done using a counter
// app.put("/api/users/:uid", async (req, res) => {
//   const { uid } = req.params;
//   const updatedData = req.body;

//   try {
//     await admin.auth().updateUser(uid, updatedData);
//     res.status(200).json({ message: "User updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error updating user: " + error.message });
//   }
// });

app.listen(port, () => {
  console.log(`Server running on dort ${port}`);
});
