const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // We'll run the backend on a different port

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json());

// The product data from your expected output
const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 45 }
];

// API endpoint to get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});