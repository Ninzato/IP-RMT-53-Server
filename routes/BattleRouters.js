const BattleController = require("../controllers/BattleController");

const router = require("express").Router();

router.post("/", BattleController.generateBattle);
router.get("/:battleId", BattleController.getBattleById);
router.patch("/:battleId", BattleController.updateBattleResult);

module.exports = router;
