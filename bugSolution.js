const express = require('express');
const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  const { username, password, email } = req.body;

  // Input validation
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Username, password, and email are required' });
  }

  const newUser = { username, password, email };

  db.createUser(newUser, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      if (err.code === 11000) { // Duplicate key error (e.g., username already exists)
        return res.status(409).json({ error: 'Username already exists' });
      }
      return res.status(500).json({ error: 'Failed to create user' });
    }
    res.status(201).json(result);
  });
});

// ... other routes

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});