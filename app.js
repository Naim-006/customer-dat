const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ibnsina980', // Replace with your MySQL password
  database: 'customer_db' // Replace with your database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

// Handle POST request for customer entry
app.post('/api/entry', (req, res) => {
  const { name, phone, eyePower, lastSell } = req.body;
  const query = 'INSERT INTO customers (name, phone, eyePower, lastSell) VALUES (?, ?, ?, ?)';
  db.query(query, [name, phone, eyePower, lastSell], (error) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Database error');
    }
    res.send('Customer data saved successfully!');
  });
});

// Handle GET request for customer enquiry
app.get('/api/enquiry', (req, res) => {
  const searchValue = req.query.search || '';
  const query = 'SELECT * FROM customers WHERE name LIKE ? OR phone LIKE ?';
  db.query(query, [`%${searchValue}%`, `%${searchValue}%`], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
