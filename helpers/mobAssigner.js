const { Enemy } = require("../models");

const assignMobEnemy = async () => {
  try {
    const mobEnemies = await Enemy.findAll({
      where: {
        type: "mob",
      },
    });

    const randomEnemy = [];
    for (let i = 0; i < 1; i++) {
      const randomIndex = Math.floor(Math.random() * mobEnemies.length);
      randomEnemy.push(mobEnemies[randomIndex]);
    }

    return randomEnemy[0];
  } catch (err) {
    throw err;
  }
};

module.exports = { assignMobEnemy };
