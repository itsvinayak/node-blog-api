const sql = require("../utils/vinayaks_sql_wrapper");

class user {
  static create(name, address, email, password, admin) {
    let data = {
      name: name,
      address:address,
      email:email,
      password:password,
      admin:admin
    };
    return sql.create("user", data);
  }

  static getUsers() {
    return sql.retrieve("user");
  }
  static getUserByUserId(id) {
    return sql.retrieveBy("user", ["id", id]);
  }

  static updateUser(id,name, address, email, password) {
    let data = {
      name: name,
      address:address,
      email:email,
      password:password
    };
    return sql.update("user", data, ["id", id]);
  }

  static deleteUser(id) {
    return sql.delete("user", ["id", id]);
  }

  static getUserByUserEmail(email) {
    return sql.retrieveBy("user", ["email", email]);
  }

  static signUp(name, address, email, password, admin) {
    let data = {
      name: name,
      address:address,
      email:email,
      password:password,
      admin:admin
    };

    return sql.create("user", data);
  }
}
module.exports = user;
