"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Race extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Race.hasMany(models.Character, {
        foreignKey: "raceId",
        onDelete: "CASCADE",
      });
    }
  }
  Race.init(
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
    },
    {
      sequelize,
      modelName: "Race",
    }
  );
  return Race;
};
