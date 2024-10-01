const CharacterController = require("../controllers/CharacterController");

const router = require("express").Router();

router.post("/", CharacterController.createCharacter);
router.delete("/:id", CharacterController.deleteCharacter);

module.exports = router;
