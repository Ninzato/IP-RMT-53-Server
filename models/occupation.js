"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Occupation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Occupation.hasMany(models.Character, {
        foreignKey: "occupationId",
        onDelete: "CASCADE",
      });
    }
  }
  Occupation.init(
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
      modelName: "Occupation",
    }
  );
  return Occupation;
};
