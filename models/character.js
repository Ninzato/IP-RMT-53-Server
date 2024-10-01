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
      Character.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      Character.belongsTo(models.Race, {
        foreignKey: "raceId",
        onDelete: "CASCADE",
      });
      Character.belongsTo(models.Occupation, {
        foreignKey: "occupationId",
        onDelete: "CASCADE",
      });
      Character.hasMany(models.Adventure, {
        foreignKey: "characterId",
        onDelete: "CASCADE",
      });
      Character.hasMany(models.Battle, {
        foreignKey: "characterId",
        onDelete: "CASCADE",
      });
      Character.hasMany(models.Inventory, {
        foreignKey: "characterId",
        onDelete: "CASCADE",
      });
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
      raceId: {
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
      occupationId: {
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
