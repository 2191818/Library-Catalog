const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const admin = require("firebase-admin");
const serviceAccount = require("./library-catalog-fff24-firebase-adminsdk-o41da-6a8cd8dc59.json");
// Yes I know this is security risk to implement security information like this ↑

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://library-catalog-fff24-default-rtdb.firebaseio.com/",
});

//Added cors because of browser saftey issues that were occuring between frontend and backend
app.use(cors());

const catalog = require("./catalog");

app.get("/", (req, res) => {
  res.send(`Server running on port ${port}`);
});

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

app.get("/api/catalog", (req, res) => {
  res.json(catalog);
});

app.listen(port, () => {
  console.log(`Server running on dort ${port}`);
});
