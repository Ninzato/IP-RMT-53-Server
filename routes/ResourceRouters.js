const ResourceController = require("../controllers/ResourceController");

const router = require("express").Router();

router.get("/races", ResourceController.getRaces);
router.get("/occupations", ResourceController.getOccupation);

module.exports = router;
