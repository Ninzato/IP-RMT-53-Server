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
}

module.exports = AuthController;
