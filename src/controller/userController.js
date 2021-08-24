// const userModel = require("../models/user");
// const { compareSync } = require("bcryptjs");
// const { sign } = require("jsonwebtoken"); // This function is used to generate the token

// module.exports.login = (req, res, next) => {
//   userModel
//     .getUserByEmail(req.body.email)
//     .then(([rows, metadata]) => {
//       const user = rows[0];
//       console.log(user);
//       // const result = compareSync(req.body.password, user.password);
//       const result = req.body.password === user.password;
//       console.log(result);
//       if (result) {
//         user.password = undefined;
//         const jsonToken = sign({ result, user }, process.env.SECRET, {
//           expiresIn: "1h",
//         });
//         res.status(201).json({
//           success: 1,
//           message: "Login Successfully",
//           token: jsonToken,
//         });
//       } else {
//         console.log("Invalid Password");
//         res.status(401).json({
//           success: 0,
//           message: "Invalid Password",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: 0,
//         message: `Internal Server Error: ${err}`,
//       });
//     });
// };
// --------------------------Rudransh-Changes----------------------//

// const { create, getUserByUserId, deleteUser, updateUser, getUsers, getUserByUserEmail, signUp } = require("../models/user");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken"); // This function is used to generate the token 
const userModel = require("../models/user");
// const user = require("../models/user");
module.exports.createUser = (req, res, next) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt); //This technique is used for encrypting password
    userModel
        .create(req.body.name,req.body.address,req.body.email,req.body.password,req.body.admin).then(([rows, metadata]) => {
            res.status(200).json(JSON.stringify(rows))
        }).catch((err) => {
            console.log(err),
                res.status(400).send({
                    success: 0,
                    message: "Database Connection Error"
                })
        }
        );
};
module.exports.getUserByUserId = (req, res, next) => {
    const id1 = req.params.id
    console.log(id1);
    userModel
        .getUserByUserId(id1).then(([rows, metadata]) => {
            res.status(200).json(JSON.stringify(rows))
        }
        ).catch((err) => {
            res.json(400).send({
                message: err,
            })
        }
        );
};
module.exports.getUsers = (req, res) => {
    userModel
        .getUsers().then(([rows, metadata]) => {
            res.status(200).json(JSON.stringify(rows))
        }).catch((err) => { console.log(err) });
};
module.exports.updateUser = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt); 
    userModel
    .updateUser(req.params.id,req.body.name,req.body.address,req.body.email,req.body.password).then(([rows,metadata]) => {
        res.status(200).send({
            success: 1,
            message: "Updation successful"
        })}
    ).catch((err) => {
        res.status(400).send({
            success: 0,
            message: "Database Connection Error"
        })
    });
};
module.exports.deleteUser = (req, res) => {
        const id1 = req.params.id;
        userModel
        .deleteUser(id1).then(([rows,metadata]) => {
            res.status(200).send({
                success: 1,
                message: "Record deleted successfully"
            })}
        ).catch((err) => { res.status(400).send({message : err })});
    };
module.exports.login = (req, res) => {
            const body = req.body;
            let jsontoken;
            userModel
            .getUserByUserEmail(body.email).then(([rows,metadata]) => {
                // console.log(rows[0].password);
                rows = rows[0];
                result = compareSync(body.password, rows.password);
                // console.log(rows.password);
                if (result) {
                    rows.password = undefined,
                        jsontoken = sign({ result, rows }, "qwe1234", { expiresIn: "1h" }),
                        //The second parameter is the key using which we encrypt and decrypt the token, 
                        // the last parameter describes the validity of the token
                        res.status(200).send({
                            success: 1,
                            message: "Login Successfully",
                            token: jsontoken
                        })
                }
            })
                .catch((err) => {
                    res.status(400).send({
                        success: 0,
                        message: "Invalid email or Token"
                    })
                });
        };
module.exports.SignUp = (req, res) => {
                const salt = genSaltSync(2);
                req.body.password = hashSync(req.body.password, salt); //This technique is used for encrypting password
                userModel
                .signUp(req.body.name,req.body.address,req.body.email,req.body.password,req.body.admin).then(([rows,metadata]) => {
                    res.status(200).json(JSON.stringify(rows[0]))
                }).catch((err) => {
                    res.status(400).send({
                        success: 0, 
                        message: `Database Connection Error/${err}`
                    })
                });
            }