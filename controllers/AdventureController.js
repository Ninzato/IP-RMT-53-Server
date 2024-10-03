const { assignRandomEnemies } = require("../helpers/enemyAssigner");
const { Character, Adventure, Battle } = require("../models");

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

      const battleArray = [];
      for (let i = 0; i < enemies.length; i++) {
        battleArray.push({
          adventureId: adventure.id,
          characterId: character.id,
          enemyId: enemies[i].id,
          turn: enemies[i].type == "mob" ? 0 : 1,
          characterHealth: character.health,
          enemyHealth: enemies[i].health,
          result: "undecided",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      await Battle.bulkCreate(battleArray);

      res.status(201).json({ adventure });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdventureController;
