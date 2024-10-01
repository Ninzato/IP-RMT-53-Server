const { assignRandomEnemies } = require("../helpers/enemyAssigner");
const { Character, Adventure } = require("../models");

class AdventureController {
  static async startAdventure(req, res, next) {
    const { difficulty } = req.body;
    try {
      const character = await Character.findOne({
        where: {
          userId: req.user.id,
        },
      });
      const enemies = await assignRandomEnemies();

      const adventure = await Adventure.create({
        characterId: character.id,
        enemies,
        difficulty,
        status: "started",
        startTime: new Date(),
      });

      res.status(201).json({ adventure });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdventureController;
