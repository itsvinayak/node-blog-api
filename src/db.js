const mysql = require("mysql2");

// Connect to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "vinayak@123",
  database: "test",
});

module.exports = pool.promise();
