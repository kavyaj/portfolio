const express = require("express");
const path = require("path");
const app = express();

// Serve Hugo static files only
app.use(express.static(path.join(__dirname, 'hugo-portfolio/public'), {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Serve quotes page from root directory  
app.get('/quotes.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'quotes.html'));
});

// Removed all blog API endpoints - now using Hugo's content system

const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Hugo server running on http://0.0.0.0:${port}`);
  console.log(`Preview available at: http://localhost:${port}`);
});