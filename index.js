const express = require("express");
const cors = require("cors"); // Import cors module
const connection = require("./db.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Use cors as middleware

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Endpoint to get credentials
app.get("/secret", (req, res) => {
  // Assuming you have a specific SQL query to execute
  const sqlQuery = "SELECT * FROM WEBSITE.PUBLIC.CREDENTIALS";

  // Execute a query
  connection.execute({
    sqlText: sqlQuery,
    complete: function (err, stmt, rows) {
      if (err) {
        console.error("Failed to execute query: ", err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
