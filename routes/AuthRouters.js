const AuthController = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/login/google", AuthController.loginGoogle);

module.exports = router;
