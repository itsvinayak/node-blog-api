const mysql = require("mysql2");

// vinayak 

// Connect to the database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Shivangi@1",
  database: "test",
});

module.exports = pool.promise();
// const db = new Promise(pool);
// module.exports = db;
