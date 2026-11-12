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

app.post("/api/users", (req, res) => {
  const { name, age } = req.body;

  if (!name || !Number.isInteger(age) || age <= 0) {
    return res.status(400).json({
      success: false,
      message: "Valid name and age are required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    age
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User added successfully",
    data: newUser
  });
});


// PUT - Update user

app.put("/api/users/:id", (req, res) => {

  console.log("PUT API CALLED");

  console.log("ID:", req.params.id);

  console.log("BODY:", req.body);

  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  user.name = req.body.name;
  user.age = req.body.age;

  res.json({
    success: true,
    message: "User updated",
    data: user
  });

});

app.patch("/api/users/:id", (req, res) => {

  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  if (req.body.name !== undefined) {
    user.name = req.body.name;
  }

  if (req.body.age !== undefined) {
    user.age = req.body.age;
  }

  res.json({
    success: true,
    message: "User partially updated",
    data: user
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("MK Backend Started:", PORT);
});