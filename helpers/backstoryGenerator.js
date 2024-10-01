const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateBackstory(name, race, occupation) {
  // Generate backstory for character using Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Create a simple backstory for a character named ${name} that lives in a fantasy DnD inspired games. The world he lives in has been in turmoil due to the descend of the Dragon King that wreck havocs all over the continents. He is from ${race} race with ${occupation} occupation. Be creative when making the backstory, take into account the character's name, race and occupation. And be mindfull of DnD setting as well. For example when race is human, then he can either be of noble birth, humble birth, etc. If the character is from dwarf race, then he sure is proficient in smithing. Be mindful about this small detail. Make sure the backstory is not more than 2 paragraphs. And adjust the backstory to fit the theme of zero to hero. By zero to hero, it does not always mean that the character has to come from a humble background. If the character is a noble, then you can use setting like a spoiled noble that is forced to face the reality or maybe a fallen noble after the advent of the dragon king. Be creative.`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

module.exports = { generateBackstory };
