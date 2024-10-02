const { verifyPassword } = require("../helpers/bcryptjs");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class AuthController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
      });

      const userWithoutPassword = { ...user.get() };
      delete userWithoutPassword.password;

      res.status(201).json(userWithoutPassword);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email)
        throw { name: "Bad Request", message: "Please input your email" };
      if (!password)
        throw { name: "Bad Request", message: "Please input your password" };

      const user = await User.findOne({ where: { email } });

      if (!user || !verifyPassword(password, user.password))
        throw { name: "Unauthorized" };

      const access_token = generateToken(user);

      res.status(200).json({ access_token, id: user.id });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
