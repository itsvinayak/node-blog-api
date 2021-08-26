const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken"); // This function is used to generate the token
const userModel = require("../models/user");

module.exports.createUser = (req, res, next) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt); //This technique is used for encrypting password
  userModel
    .create(body)
    .then(([rows, metadata]) => {
      res.status(200).json({success: 0000,
data:rows});
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
  userModel
    .getUserByUserId(id)
    .then(([rows, metadata]) => {
      res.status(200).json({success: 0000,
data:rows});
    })
    .catch((err) => {
      res.json(400).send({
        message: err,
      });
    });
};
module.exports.getUsers = (req, res, next) => {
  userModel
    .getUsers()
    .then(([rows, metadata]) => {
      res.status(200).json({success: 0000,
data:rows});
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.updateUser = (req, res) => {
  const body = req.body;
  if(body.password!==undefined){
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt); 
  }
  userModel.getUserByUserId(req.user.id).then(([rows,metadata])=>{
    const updateduser = {...rows[0],...body}
    console.log(updateduser);
    userModel
  .updateUser(updateduser.id,updateduser.name,updateduser.address,updateduser.email,updateduser.password).then(([rows,metadata]) => {
      res.status(200).send({
          success: 0000,
          message: "Updation successful"
      })}
  ).catch((err) => {
      res.status(400).send({
          success: 0,
          message: "Database Connection Error"
      })
  });
  }).catch((err)=>{
    res.status(400).send({
      message:err
    })
  })
};
module.exports.deleteUser = (req, res) => {
  const id1 = req.params.id;
  userModel
  .deleteUser(id1).then(([rows,metadata]) => {
      res.status(200).send({
          success: 0000,
          message: "Record deleted successfully"
      })}
  ).catch((err) => { res.status(400).send({message : err })});
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
        //The second parameter is the key using which we encrypt and decrypt the token,
        // the last parameter describes the validity of the token
        res.status(200).send({
          success: 0000,
          message: "Login Successfully",
          token: jsontoken,
        });
      } else {
        res.status(401).json({ 
          success:0000,
          message: "wrong password provided" });
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
  req.body.password = hashSync(req.body.password, salt); //This technique is used for encrypting password
  userModel
    .signUp(
      req.body.name,
      req.body.address,
      req.body.email,
      req.body.password,
      req.body.admin
    )
    .then(([rows, metadata]) => {
      res.status(200).json({
        success: 0000,
        message: "user created successfully" });
    })
    .catch((err) => {
      res.status(400).send({
        success: 0,
        message: `Database Connection Error/${err}`,
      });
    });
};