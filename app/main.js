const express = require("express");
const queries = require("./infraestructure/database");
const app = express();
const db = require("./infraestructure/database");

app.use(express.json());

app.get("/customers/find", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(404);

  let clientes = await queries.findCustomers();
  console.log(clientes);

  if (clientes) {
    res.status(200);
  }

  res.end(JSON.stringify(clientes));
});

app.post("/customers/create", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(201);

  let body = req.body;
  const customer = {
    name: body.name,
    phone: body.phone,
    mail: body.mail,
  };

  let createdCustomer = await queries.createCustomer(customer);

  if (!createdCustomer) {
    res.status(400);
    res.write(JSON.stringify({ error: "customer already exists" }));
  } else {
    res.write(JSON.stringify(createdCustomer));
  }

  res.end();
});

app.post("/companies/create", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(201);

  let body = req.body;
  const company = {
    name: body.name,
    cnpj: body.cnpj,
  };

  let createdCompany = await queries.createCompany(company);

  if (!createdCompany) {
    res.status(400);
    res.write(JSON.stringify({ error: "company already exists" }));
  } else {
    res.write(JSON.stringify(createdCompany));
  }

  res.end();
});

app.post("/bookings/create", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let body = req.body;
  const booking = {
    date: body.date,
    mail: body.mail,
    cnpj: body.cnpj,
  };

  try {
    let createdBooking = await queries.createBooking(booking);
    res.status(201);
    res.write(JSON.stringify(createdBooking));
  } catch (error) {
    res.status(400);
    res.write(JSON.stringify({ error: error.message }));
  } finally {
    res.end();
  }
});

app.get("/companies/find", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(404);

  let clientes = await findClients();
  console.log(clientes);

  if (clientes) {
    res.status(200);
  }

  res.end(JSON.stringify(clientes));
});

app.get("/bookings/find", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(404);

  let bookings = await queries.findBookings();

  if (bookings) {
    res.status(200);
  } else {
    res.status(404);
  }

  res.end(JSON.stringify(bookings));
});

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
