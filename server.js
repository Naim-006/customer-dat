const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); 
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ibnsina980',
  database: 'customer_db',
  connectionLimit: 10
});

// API to get the next available customer ID
app.get('/api/nextId', (req, res) => {
  pool.query('SELECT MAX(id) AS maxId FROM customers', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    const maxId = results[0].maxId || 'CUST-1000';
    const nextId = `CUST-${parseInt(maxId.split('-')[1]) + 1}`;
    res.json({ nextId });
  });
});

// API to handle form submission
app.post('/api/entry', (req, res) => {
  const { id, name, phone, eyePower, lastSell } = req.body;
  pool.query('INSERT INTO customers (id, name, phone, eyePower, lastSell) VALUES (?, ?, ?, ?, ?)', [id, name, phone, eyePower, lastSell], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.send('Customer data saved successfully!');
  });
});

// API to handle customer search
app.get('/api/enquiry', (req, res) => {
  const search = req.query.search;
  pool.query('SELECT * FROM customers WHERE name LIKE ?', [`%${search}%`], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
