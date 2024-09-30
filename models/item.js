"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Type is required!",
          },
          notEmpty: {
            msg: "Type is required!",
          },
        },
      },
      effect: {
        type: DataTypes.JSONB,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required!",
          },
          notEmpty: {
            msg: "Price is required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
