const router = require("express").Router();
const { authentication } = require("../middlewares/authentication");
const { errorHandler } = require("../middlewares/errorHandler");
const AuthRouters = require("./AuthRouters");
const CharacterRouters = require("./CharacterRouters");

router.use("/auth", AuthRouters);
router.use(authentication);
router.use("/characters", CharacterRouters);

router.use(errorHandler);

module.exports = router;
