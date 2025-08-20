const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("."));

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Static server running on http://0.0.0.0:${port}`);
});
