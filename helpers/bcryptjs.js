const bcryptjs = require("bcryptjs");

exports.getHashed = function (password) {
  return bcryptjs.hashSync(password, 8);
};

exports.verifyPassword = function (password, hashed) {
  return bcryptjs.compareSync(password, hashed);
};
