const CharacterController = require("../controllers/CharacterController");

const router = require("express").Router();

router.get("/", CharacterController.getCharacters);
router.get("/:id", CharacterController.getCharacterById);
router.post("/", CharacterController.createCharacter);
router.delete("/:id", CharacterController.deleteCharacter);

module.exports = router;
