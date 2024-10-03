const { assignMobEnemy } = require("../helpers/mobAssigner");
const { Battle, Adventure } = require("../models");
class BattleController {
  static async generateBattle(req, res, next) {
    let character = req.body;
    try {
      console.log(character);
      const enemy = await assignMobEnemy();

      const battle = await Battle.create({
        characterId: character.characterId,
        enemyId: enemy.id,
        turn: "player",
        characterHealth: character.characterHealth,
        enemyHealth: enemy.health,
        result: "undecided",
      });

      res.status(201).json(battle);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getBattleById(req, res, next) {
    try {
      const battle = await Battle.findByPk(req.params.battleId);

      res.status(200).json(battle);
    } catch (err) {
      next(err);
    }
  }

  static async updateBattleResult(req, res, next) {
    const { result } = req.body;
    try {
      const battle = await Battle.findByPk(req.params.battleId);
      battle.update({
        result: result,
      });

      res.status(200).json(battle);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BattleController;
