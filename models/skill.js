"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Skill.init(
    {
      index: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Index is required!",
          },
          notEmpty: {
            msg: "Index is required!",
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
      effect: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Effect is required!",
          },
          notEmpty: {
            msg: "Effect is required!",
          },
        },
      },
      classes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Classes is required!",
          },
          notEmpty: {
            msg: "Classes is required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Skill",
    }
  );
  return Skill;
};
