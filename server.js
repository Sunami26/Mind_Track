// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register User
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: 'User registered successfully!' });
  });
});

// Login User
// backend/server.js
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const user = results[0];
      res.status(200).json({ message: 'Logged in successfully!', userId: user.id });
    });
  });
  

// Add Mood
app.post('/moods', (req, res) => {
  const { userId, mood } = req.body;
  db.query('INSERT INTO moods (userId, mood) VALUES (?, ?)', [userId, mood], (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: 'Mood tracked successfully!' });
  });
});

// Get Moods for a User
app.get('/moods/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM moods WHERE userId = ?', [userId], (err, results) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Add Expense
app.post('/expenses', (req, res) => {
  const { userId, expense } = req.body;
  db.query('INSERT INTO expenses (userId, expense) VALUES (?, ?)', [userId, expense], (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: 'Expense logged successfully!' });
  });
});

// Get Expenses for a User
app.get('/expenses/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM expenses WHERE userId = ?', [userId], (err, results) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Get mood history for a user
app.get('/moods/:userId', (req, res) => {
    const userId = req.params.userId;
    db.query('SELECT * FROM moods WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve moods' });
      }
      res.json(results);
    });
  });
  
// Get expense history for a user
app.get('/expenses/:userId', (req, res) => {
    const userId = req.params.userId;
    db.query('SELECT * FROM expenses WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve expenses' });
      }
      res.json(results);
    });
  });  

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${5000}`);
});

