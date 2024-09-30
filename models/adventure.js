"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Adventure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Adventure.init(
    {
      characterId: {
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "characterId is required!",
          },
          notEmpty: {
            msg: "characterId is required!",
          },
        },
      },
      difficulty: {
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Difficulty is required!",
          },
          notEmpty: {
            msg: "Difficulty is required!",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Status is required!",
          },
          notEmpty: {
            msg: "Status is required!",
          },
        },
      },
      startTime: {
        type: DataTypes.DATE,
      },
      endTime: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Adventure",
    }
  );
  return Adventure;
};
