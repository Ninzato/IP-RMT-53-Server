const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

exports.authentication = async function (req, res, next) {
  try {
    // Assign access token to a variable from headers
    const access_token = req.headers.authorization;

    // No access found, throw error
    if (!access_token) throw { name: "Unauthentication" };

    // Split accepted bearer token
    const [bearer, token] = access_token.split(" ");

    // Check if the bearer token has the correct format, if not, throw error
    if (bearer !== "Bearer") throw { name: "Unauthentication" };

    // Verify token and check if the user is valid, if not, throw error
    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthentication" };

    // Save user role to req
    req.user = { id: user.id };

    next();
  } catch (err) {
    next(err);
  }
};
