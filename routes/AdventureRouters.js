const AdventureController = require("../controllers/AdventureController");

const router = require("express").Router();

router.post("/start", AdventureController.startAdventure);

module.exports = router;
