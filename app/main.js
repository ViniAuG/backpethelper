const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createConnection({
  host: "host",
  user: "user",
  password: "password",
  database: "database",
});

db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

app.get("/users", (req, res) => {
  let sql = "SELECT * FROM users";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
