"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Character, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email has already been used!",
        },
        validate: {
          notNull: {
            msg: "Email is required!",
          },
          notEmpty: {
            msg: "Email is required!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Password is required!",
          },
          notEmpty: {
            msg: "Password is required!",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: "Username has already been taken!",
        },
        validate: {
          notNull: {
            msg: "Username is required!",
          },
          notEmpty: {
            msg: "Username is required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
