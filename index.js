const express = require("express");
const cors = require("cors"); // Import cors module
const connection = require("./db.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Documentation for www.zinniezhang.com");
});

const executeQuery = (sqlQuery, res) => {
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
};

// Get credentials
app.get("/secret", (req, res) => {
  const sqlQuery = "SELECT * FROM WEBSITE.PUBLIC.SECRET";
  executeQuery(sqlQuery, res);
});

// Insert credentials
app.post("/secret", (req, res) => {
  const { Website, Username, Password } = req.body;
  const sqlQuery = `INSERT INTO WEBSITE.PUBLIC.SECRET (website, username, password) VALUES ('${Website}', '${Username}', '${Password}')`;
  executeQuery(sqlQuery, res);
});

// Delete credentials based on website name
app.delete("/secret", (req, res) => {
  const { Website } = req.body;
  const sqlQuery = `DELETE FROM WEBSITE.PUBLIC.SECRET WHERE website = '${Website}'`;
  executeQuery(sqlQuery, res);
});

// Read and write to the vision page

// Get all reflections
app.get("/reflection", (req, res) => {
  const sqlQuery = "SELECT * FROM WEBSITE.PUBLIC.REFLECTION";
  executeQuery(sqlQuery, res);
});

// Post one reflection
app.post("/reflection", (req, res) => {
  const { Date, Type, Text } = req.body;
  const sqlQuery = `INSERT INTO WEBSITE.PUBLIC.REFLECTION (Date, Type, Text) VALUES ('${Date}', '${Type}', '${Text}')`;
  executeQuery(sqlQuery, res);
});

// Delete one reflection by date
app.delete("/reflection", (req, res) => {
  const { Date } = req.body;
  const sqlQuery = `DELETE FROM WEBSITE.PUBLIC.REFLECTION WHERE Date = '${Date}'`;
  executeQuery(sqlQuery, res);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
