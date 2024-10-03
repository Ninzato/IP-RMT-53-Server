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
      Adventure.belongsTo(models.Character, {
        foreignKey: "characterId",
        onDelete: "CASCADE",
      });
      // Adventure.hasMany(models.Battle, {
      //   foreignKey: "adventureId",
      //   onDelete: "CASCADE",
      // });
    }
  }
  Adventure.init(
    {
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
      enemies: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Enemies is required!",
          },
          notEmpty: {
            msg: "Enemies is required!",
          },
        },
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: false,
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
