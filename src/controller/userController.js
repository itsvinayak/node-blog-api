const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports.createUser = (req, res, next) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt); // This technique is used for encrypting password
  userModel
    .create(body)
    .then(([rows, metadata]) => {
      res.status(200).json(JSON.stringify(rows));
    })
    .catch((err) => {
      console.log(err),
        res.status(400).send({
          success: 0,
          message: "Database Connection Error",
        });
    });
};
module.exports.getUserByUserId = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  userModel
    .getUserByUserId(id)
    .then(([rows, metadata]) => {
      res.status(200).json(JSON.stringify(rows));
    })
    .catch((err) => {
      res.status(400).send({
        message: err,
      });
    });
};
module.exports.getUsers = (req, res, next) => {
  userModel
    .getUsers()
    .then(([rows, metadata]) => {
      res.status(200).json(JSON.stringify(rows));
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.updateUser = (req, res, next) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  userModel
    .updateUser()
    .then(([rows, metadata]) => {
      res.status(200).send({
        success: 1,
        message: "Updated successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: 0,
        message: "Database Connection Error",
      });
    });
};
module.exports.deleteUser = (req, res, next) => {
  userModel
    .deleteUser(req.params.id)
    .then(([rows, metadata]) => {
      res.status(200).send({
        success: 1,
        message: "Record deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
};
module.exports.login = (req, res, next) => {
  const body = req.body;
  let jsontoken;
  userModel
    .getUserByUserEmail(body.email)
    .then(([rows, metadata]) => {
      rows = rows[0];
      console.log(rows);
      result = compareSync(body.password, rows.password);
      if (result) {
        rows.password = undefined;
        jsontoken = sign({ result, rows }, process.env.SECRET, {
          expiresIn: "1h",
        });
        // The second parameter is the key using which we encrypt and decrypt the token,
        // the last parameter describes the validity of the token
        res.status(200).send({
          success: 1,
          message: "Login Successfully",
          token: jsontoken,
        });
      } else {
        res.status(401).json({ message: "wrong password provided" });
      }
    })
    .catch((err) => {
      res.status(400).send({
        success: 0,
        message: ` Invalid email or Token | ${err} `,
      });
    });
};
module.exports.SignUp = (req, res, next) => {
  const salt = genSaltSync(2);
  req.body.password = hashSync(req.body.password, salt); // This technique is used for encrypting password
  userModel
    .signUp(
      req.body.name,
      req.body.address,
      req.body.email,
      req.body.password,
      req.body.admin
    )
    .then(([rows, metadata]) => {
      res.status(200).json({ message: "user created successfully" });
    })
    .catch((err) => {
      res.status(400).send({
        success: 0,
        message: `Database Connection Error/${err}`,
      });
    });
};
