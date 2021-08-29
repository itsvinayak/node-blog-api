const { verify } = require("jsonwebtoken");

module.exports.admin = (req, res, next) => {
  let token = req.get("authorization");
  console.log(token);
  if (!token) {
    res.status(401).json({
      message: "token not provide, Access denied !",
    });
  } else {
    token = token.split(" ")[1];
    console.log(token, process.env.SECRET);
    verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({
          message: "Invalid token",
        });
      } else if (decoded.rows.admin === 0) {
        res.status(400).json({
          message: "User is not admin",
        });
      } else {
        req.user = decoded.rows;
        next();
      }
    });
  }
};
