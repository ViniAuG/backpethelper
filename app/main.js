const express = require("express");
const app = express();
const db = require("./infraestructure/database");

app.get("/users", (req, res) => {
  res.send(
    JSON.stringify({ status: 200, error: null, response: db.findUsers() })
  );
});

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
