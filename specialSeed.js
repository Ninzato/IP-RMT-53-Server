const { Sequelize } = require("sequelize");
const { Skill } = require("./models");
const data = require("./data/skills.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const fillItUp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection success.");

    await Skill.sync();

    await Skill.bulkCreate(data);
    console.log("Skills have been seeded successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
};

fillItUp();
