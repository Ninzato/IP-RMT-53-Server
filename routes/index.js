const router = require("express").Router();
const { authentication } = require("../middlewares/authentication");
const { errorHandler } = require("../middlewares/errorHandler");
const AuthRouters = require("./AuthRouters");
const CharacterRouters = require("./CharacterRouters");
const AdventureRouters = require("./AdventureRouters");

router.use("/auth", AuthRouters);
router.use(authentication);
router.use("/characters", CharacterRouters);
router.use("/adventure", AdventureRouters);

router.use(errorHandler);

module.exports = router;
