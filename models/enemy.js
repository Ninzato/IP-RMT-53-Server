"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enemy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enemy.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Name is required!",
          },
          notEmpty: {
            msg: "Name is required!",
          },
        },
      },
      health: {
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "Health is required!",
          },
          notEmpty: {
            msg: "Health is required!",
          },
        },
      },
      damage: {
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "Damage is required!",
          },
          notEmpty: {
            msg: "Damage is required!",
          },
        },
      },
      skills: {
        type: DataTypes.JSONB,
      },
      type: {
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Type is required!",
          },
          notEmpty: {
            msg: "Type is required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Enemy",
    }
  );
  return Enemy;
};
