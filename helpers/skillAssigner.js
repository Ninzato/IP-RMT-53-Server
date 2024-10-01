const { instance } = require("../helpers/axios");
const { Skill } = require("../models");
const { Op } = require("sequelize");

// Fetch data from DnD Api to give user random starter skill
async function assignRandomSkills() {
  try {
    // Get all spells
    const skills = await Skill.findAll({
      where: {
        classes: {
          [Op.contains]: ["cleric"],
        },
        level: 1,
      },
    });

    // ? console.log(allSpellsResponse.data.results, "<<<<");

    // Assign 2 random spells from the list
    const randomSkills = [];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * skills.length);
      randomSkills.push(skills[randomIndex]);
      // Remove the selected spell to avoid duplicates
      skills.splice(randomIndex, 1);
    }

    return randomSkills;
  } catch (err) {
    console.error("Error fetching spells:", err);
    throw err;
  }
}

module.exports = { assignRandomSkills };
