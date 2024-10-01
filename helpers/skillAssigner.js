const { instance } = require("../helpers/axios");

// Fetch data from DnD Api to give user random starter skill
async function assignRandomSkills() {
  try {
    // Get all spells
    const { data } = await instance({
      method: "GET",
      url: "/api/spells",
    });

    // ? console.log(allSpellsResponse.data.results, "<<<<");

    // Assign 2 random spells from the list
    const randomSpells = [];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      randomSpells.push(data.results[randomIndex]);
      // Remove the selected spell to avoid duplicates
      data.results.splice(randomIndex, 1);
    }

    return randomSpells;
  } catch (err) {
    console.error("Error fetching spells:", err);
    throw err;
  }
}

module.exports = { assignRandomSkills };
