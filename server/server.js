const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();

// Create HTTP server
const server = http.createServer(app);
const io = socketIo(server);

// Define port
const port = process.env.PORT || 8080;

// Basic route
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
