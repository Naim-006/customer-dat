const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

let currentId = 1000;  // Example of starting ID. This would come from your database in real scenarios.

// API to get the next available customer ID
app.get('/api/nextId', (req, res) => {
  currentId += 1;  // Increment the ID
  res.json({ nextId: `CUST-${currentId}` });
});

// API to handle form submission
app.post('/api/entry', (req, res) => {
  const customerData = req.body;
  // Save the customer data to your database here
  res.send('Customer data saved successfully!');
});

// API to handle customer search
app.get('/api/enquiry', (req, res) => {
  const search = req.query.search;
  // Mock data for demonstration. Replace with actual database query
  const mockData = [
    { id: 'CUST-1001', name: 'John Doe', phone: '1234567890', eyePower: '2.5', lastSell: '2024-09-01' },
    { id: 'CUST-1002', name: 'Jane Doe', phone: '0987654321', eyePower: '1.0', lastSell: '2024-09-10' }
  ];
  const results = mockData.filter(customer => customer.name.toLowerCase().includes(search.toLowerCase()));
  res.json(results);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
