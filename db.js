const snowflake = require("snowflake-sdk");

// Create a Snowflake connection instance
const connection = snowflake.createConnection({
  account: "tjb02970.us-east-1",
  username: "zinniezhang",
  password: "Kian3707!",
  database: "WEBSITE",
  schema: "public",
  warehouse: "COMPUTE_WH",
  role: "ACCOUNTADMIN",
});

// Connect to Snowflake
connection.connect((err, conn) => {
  if (err) {
    console.error("Unable to connect to Snowflake: " + err.message);
  } else {
    console.log("Successfully connected to Snowflake.");
  }
});

module.exports = connection;
