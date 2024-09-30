"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Battle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Battle.init(
    {
      adventureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "adventureId is required!",
          },
          notEmpty: {
            msg: "adventureId is required!",
          },
        },
      },
      characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "characterId is required!",
          },
          notEmpty: {
            msg: "characterId is required!",
          },
        },
      },
      enemyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "enemyId is required!",
          },
          notEmpty: {
            msg: "enemyId is required!",
          },
        },
      },
      turn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Turn is required!",
          },
          notEmpty: {
            msg: "Turn is required!",
          },
        },
      },
      characterHealth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "characterHealth is required!",
          },
          notEmpty: {
            msg: "characterHealth is required!",
          },
        },
      },
      enemyHealth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "enemyHealth is required!",
          },
          notEmpty: {
            msg: "enemyHealth is required!",
          },
        },
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Result is required!",
          },
          notEmpty: {
            msg: "Result is required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Battle",
    }
  );
  return Battle;
};
