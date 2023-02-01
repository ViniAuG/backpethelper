const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pethelper",
  })
  .promise();

class queries {
  static findCustomers = async () => {
    let sql = "SELECT * FROM customers";
    let [result] = await pool.query(sql);
    return result;
  };

  static findCustomerByMail = async (mail) => {
    let sql = `SELECT * FROM customers WHERE mail = \'${mail}\'`;
    let [result] = await pool.query(sql);

    if (result.length == 0) {
      return null;
    }

    return result;
  };

  static findCompanyByCpnj = async (cnpj) => {
    let sql = `SELECT * FROM companies WHERE cnpj = \'${cnpj}\'`;
    let [result] = await pool.query(sql);

    if (result.length == 0) {
      return null;
    }

    return result;
  };

  static createCustomer = async (customer) => {
    if (await this.findCustomerByMail(customer.mail)) {
      return null;
    }

    let createCustomer = `INSERT INTO \`pethelper\`.\`customers\` (\`name\`, \`phone\`, \`mail\`) VALUES (\'${customer.name}\', \'${customer.phone}\', \'${customer.mail}\');`;

    let [firstInsert] = await pool.query(createCustomer);
    const createdCustomerID = firstInsert.insertId;

    let qrcodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${createdCustomerID}`;
    let uptdateCustomer = `UPDATE customers SET code = \'${qrcodeURL}\' WHERE id = ${createdCustomerID}`;
    let [updatedCustomer] = await pool.query(uptdateCustomer);
    customer.id = createdCustomerID;
    customer.code = qrcodeURL;
    return customer;
  };

  static createCompany = async (company) => {
    if (await this.findCompanyByCpnj(company.cnpj)) {
      return null;
    }

    let createCompany = `INSERT INTO \`pethelper\`.\`companies\` (\`name\`, \`cnpj\`) VALUES (\'${company.name}\', \'${company.cnpj}\');`;

    let [firstInsert] = await pool.query(createCompany);
    const createdCompanyID = firstInsert.insertId;

    company.id = createdCompanyID;
    return company;
  };

  static findCustomerByID = async (id) => {
    let sql = `SELECT * FROM customers WHERE id = ${id}`;
    let [result] = await pool.query(sql);
    return result;
  };

  static findCompanies = async () => {
    let sql = "SELECT * FROM companies";
    let [result] = await pool.query(sql);
    return result;
  };
}
module.exports = queries;
