"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Battles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      characterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Characters",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      enemyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Enemies",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      turn: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      characterHealth: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      enemyHealth: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      result: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Battles");
  },
};
