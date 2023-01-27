const mysql = require("mysql");

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

let findUsers = () => {
  let sql = "SELECT * FROM users";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    return results;
  });
};

export { findUsers };
