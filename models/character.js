"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Character.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "userId is required!",
          },
          notEmpty: {
            msg: "userId is required!",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required!",
          },
          notEmpty: {
            msg: "Name is required!",
          },
        },
      },
      race: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Race is required!",
          },
          notEmpty: {
            msg: "Race is required!",
          },
        },
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Occupation is required!",
          },
          notEmpty: {
            msg: "Occupation is required!",
          },
        },
      },
      backstory: {
        type: DataTypes.TEXT,
      },
      skills: {
        type: DataTypes.JSONB,
      },
    },
    {
      sequelize,
      modelName: "Character",
    }
  );
  return Character;
};
