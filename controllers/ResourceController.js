const { Race, Occupation } = require("../models");

class ResourceController {
  static async getRaces(req, res, next) {
    try {
      const races = await Race.findAll();

      res.status(200).json(races);
    } catch (err) {
      next(err);
    }
  }

  static async getOccupation(req, res, next) {
    try {
      const occupation = await Occupation.findAll();

      res.status(200).json(occupation);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ResourceController;
