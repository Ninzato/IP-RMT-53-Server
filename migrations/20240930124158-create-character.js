"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Characters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      raceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Races",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      occupationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Occupations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      health: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
      },
      armor: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      backstory: {
        type: Sequelize.TEXT,
      },
      skills: {
        type: Sequelize.JSONB,
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
    await queryInterface.dropTable("Characters");
  },
};
