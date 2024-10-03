const { Skill } = require("./models");

const data = require("./data/skills.json").map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});

const fillItUp = async () => {
  await Skill.bulkCreate(data);
};

fillItUp();
