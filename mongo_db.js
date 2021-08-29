const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./models/mongoDB/role");
db.role = require("./models/mongoDB/user");

db.ROLES = ["user", "admin"];

module.exports = db;
