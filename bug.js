const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
  const user = req.body;
  // Missing error handling for missing fields or invalid data
  db.createUser(user, (err, result) => {
    if (err) {
      console.error(err);
      // Sending a generic 500 error is bad practice
      res.status(500).send('Error creating user');
    } else {
      res.status(201).send(result);
    }
  });
});

// ... other routes

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});