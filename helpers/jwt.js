const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

exports.generateToken = function ({ id, email }) {
  return jwt.sign({ id, email }, secretKey);
};

exports.verifyToken = function (token) {
  return jwt.verify(token, secretKey);
};
