const express = require('express');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Sample initial data (In-memory array)
let users = [
  { id: 1, name: "Rahul", email: "rahul@example.com" },
  { id: 2, name: "Priya", email: "priya@example.com" }
];

// 1. GET Request: Sabhi users ki list fetch karne ke liye
app.get('/api/users', (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  });
});

// 2. GET Request (by ID): Ek specific user fetch karne ke liye
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User nahi mila" });
  }

  res.status(200).json({ success: true, data: user });
});

// 3. POST Request: Naya user add karne ke liye
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name aur Email zaroori hain" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// 4. PUT Request: Existing user ka data update karne ke liye
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: "User nahi mila" });
  }

  // Fields update kar rahe hain
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;

  res.status(200).json({ success: true, data: users[userIndex] });
});

// 5. DELETE Request: User ko remove karne ke liye
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: "User nahi mila" });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ success: true, message: "User delete ho gaya" });
});

// Server Start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});