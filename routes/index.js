const router = require("express").Router();
const { errorHandler } = require("../middlewares/errorHandler");
const AuthRouters = require("./AuthRouters");

router.use("/auth", AuthRouters);

router.use(errorHandler);

module.exports = router;
