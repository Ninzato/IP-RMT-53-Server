const { Character } = require("../models");
const { generateBackstory } = require("../helpers/backstoryGenerator");
const { assignRandomSkills } = require("../helpers/skillAssigner");

class CharacterController {
  static async getCharacters(req, res, next) {
    try {
      const characters = await Character.findAll();

      res.status(200).json(characters);
    } catch (err) {
      next(err);
    }
  }

  static async getCharacterById(req, res, next) {
    try {
      const character = await Character.findByPk(req.params.id);

      res.status(200).json(character);
    } catch (err) {
      next(err);
    }
  }

  static async createCharacter(req, res, next) {
    const { name, race, occupation } = req.body;
    try {
      const backstory = await generateBackstory(name, race, occupation);
      const skills = await assignRandomSkills();

      const character = await Character.create({
        userId: req.user.id,
        name,
        race,
        occupation,
        backstory,
        skills,
      });

      res.status(201).json(character);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCharacter(req, res, next) {
    try {
      const character = await Character.findByPk(req.params.id);
      if (!character)
        throw {
          name: "notFound",
          message: `The character that you want to delete does not exist!`,
        };

      await character.destroy();

      res.status(200).json({
        message: "Successfully delete a character",
        deletedCharacter: character,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CharacterController;
