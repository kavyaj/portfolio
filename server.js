const express = require("express");
const path = require("path");
const { buildHugo } = require("./hugo-auto-build");
const app = express();

// Add CORS headers for Replit preview
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Serve static files from Hugo's public directory
app.use(express.static(path.join(__dirname, 'hugo-portfolio/public'), {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

const port = process.env.PORT || 5000;

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Hugo static server running on http://0.0.0.0:${port}`);
  console.log(`Preview available at: http://localhost:${port}`);
  console.log("✅ Hugo site with clean URLs ready!");
});