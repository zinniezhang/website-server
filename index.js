const express = require("express");
const cors = require("cors"); // Import cors module
const connection = require("./db.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Use cors as middleware
app.use(express.json()); // Use express.json() middleware to parse JSON request bodies

app.get("/", (req, res) => {
  res.send("API Documentation for www.zinniezhang.com");
});

// Get credentials
app.get("/secret", (req, res) => {
  const sqlQuery = "SELECT * FROM WEBSITE.PUBLIC.SECRET";

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

// Insert credentials
app.post("/secret", (req, res) => {
  const { Website, Username, Password } = req.body;
  const sqlQuery = `INSERT INTO WEBSITE.PUBLIC.SECRET (website, username, password) VALUES ('${Website}', '${Username}', '${Password}')`;

  connection.execute({
    sqlText: sqlQuery,
    complete: function (err, stmt, rows) {
      if (err) {
        console.error("Failed to execute query: ", err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Data inserted successfully" });
    },
  });
});

// Delete credentials
app.delete("/secret", (req, res) => {
  const { Website } = req.body;
  const sqlQuery = `DELETE FROM WEBSITE.PUBLIC.SECRET WHERE website = '${Website}'`;

  connection.execute({
    sqlText: sqlQuery,
    complete: function (err, stmt, rows) {
      if (err) {
        console.error("Failed to execute query: ", err);
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "Data deleted successfully" });
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
