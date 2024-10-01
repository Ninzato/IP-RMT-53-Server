const { Enemy } = require("../models");

const assignRandomEnemies = async () => {
  try {
    const mobEnemies = await Enemy.findAll({
      where: {
        type: "mob",
      },
    });

    const bossEnemies = await Enemy.findAll({
      where: {
        type: "boss",
      },
    });

    const randomEnemies = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * mobEnemies.length);
      randomEnemies.push(mobEnemies[randomIndex]);
      mobEnemies.splice(randomIndex, 1);
    }

    for (let i = 0; i < 1; i++) {
      const randomIndex = Math.floor(Math.random() * bossEnemies.length);
      randomEnemies.push(bossEnemies[randomIndex]);
    }

    return randomEnemies;
  } catch (err) {
    throw err;
  }
};

module.exports = { assignRandomEnemies };
