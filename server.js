console.log("MK BACKEND NEW VERSION STARTED");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("MK Backend Server is Running");
});

// Home API
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to MK Backend API"
  });
});

// Temporary database
let users = [
  { id: 1, name: "Manish", age: 23 },
  { id: 2, name: "Rahul", age: 22 },
  { id: 3, name: "Aman", age: 24 }
];

// GET - All users
app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    total: users.length,
    data: users
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("MK Backend Started:", PORT);
});