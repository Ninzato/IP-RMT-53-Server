const { Character, Race, Occupation } = require("../models");
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
      const character = await Character.findOne({
        where: {
          userId: req.params.id,
        },
      });

      res.status(200).json(character);
    } catch (err) {
      next(err);
    }
  }

  static async createCharacter(req, res, next) {
    const { name, raceId, occupationId } = req.body;
    try {
      const race = await Race.findByPk(raceId);
      const occupation = await Occupation.findByPk(occupationId);
      const backstory = await generateBackstory(
        name,
        race?.name,
        occupation?.name
      );
      const skills = await assignRandomSkills();

      const character = await Character.create({
        userId: req.user.id,
        name,
        raceId,
        occupationId,
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
