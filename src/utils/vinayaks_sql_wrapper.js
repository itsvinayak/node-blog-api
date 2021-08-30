// CRUD
const db = require("../../db");

module.exports.create = (table, data) => {
  // data = { name: 'vinayak', age: '23' }
  console.log(data);
  let sql = `INSERT INTO ${table} SET ?`;
  return db.query(sql, data);
};

module.exports.update = (table, data, by) => {
  // data = { name: 'vinayak', age: '23' }
  let sql = `UPDATE ${table} SET ? WHERE ${by[0]} = ?`;
  let id = by[1];
  console.log(by[1]);
  return db.query(sql, [data, id]);
};

module.exports.delete = (table, by) => {
  let sql = `DELETE FROM ${table} WHERE ${by[0]} = ?`;
  let id = by[1];
  return db.query(sql, id);
};

module.exports.retrieveBy = (table, by) => {
  let sql = `SELECT * FROM ${table} WHERE ${by[0]} = ?`;
  let id = by[1];
  return db.query(sql, id);
};

module.exports.retrieve = (table) => {
  let sql = `SELECT * FROM ${table}`;
  return db.query(sql);
};

// singleton pattern for db connections

module.exports.start = () => {
  return db.query(`START TRANSACTION`);
};

module.exports.commit = () => {
  return db.query(`COMMIT`);
};

module.exports.rollback = () => {
  return db.query(`ROLLBACK`);
};
