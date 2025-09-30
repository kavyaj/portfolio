const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

// Test route
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// Check if file exists and serve it
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  console.log('Trying to serve:', indexPath);
  console.log('File exists:', fs.existsSync(indexPath));
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Index file not found');
  }
});

// Serve other static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve quotes page with clean URL
app.get('/quotes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quotes', 'index.html'));
});

// Redirect old .html URL to clean URL  
app.get('/quotes.html', (req, res) => {
  res.redirect(301, '/quotes');
});

const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
  console.log(`Test: http://localhost:${port}/test`);
});