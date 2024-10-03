const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { Character, User, Race, Occupation } = require("../models");
const { queryInterface } = sequelize;

describe("CharacterController", () => {
  let userToken;
  let userId;
  let raceId;
  let occupationId;
  let characterId;

  beforeAll(async () => {
    const user = await User.create({
      username: "Luffy",
      email: "luffy@yonkou.com",
      password: "12345",
    });

    userId = user.id;

    const race = await Race.create({ index: "human", name: "Human" });
    const occupation = await Occupation.create({ index: "bard", name: "Bard" });

    raceId = race.id;
    occupationId = occupation.id;

    const loginResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "luffy@yonkou.com", password: "12345" });

    userToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await queryInterface.bulkDelete("Characters", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Races", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Occupations", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  });

  describe("GET /characters", () => {
    it("should return 200 and a list of characters", async () => {
      const response = await request(app)
        .get("/api/v1/characters")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /characters/:id", () => {
    beforeAll(async () => {
      const character = await Character.create({
        userId,
        name: "Zoro",
        raceId,
        occupationId,
        backstory: "A swordsman from East Blue.",
        skills: ["swordsmanship", "observation haki"],
      });

      characterId = character.id;
    });

    it("should return 200 and the character data by ID", async () => {
      const response = await request(app)
        .get(`/api/v1/characters/${characterId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("name", "Zoro");
    });
  });

  describe("POST /characters", () => {
    it("should return 201 and create a new character", async () => {
      const response = await request(app)
        .post("/api/v1/characters")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          name: "Sanji",
          raceId,
          occupationId,
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("name", "Sanji");
      expect(response.body).toHaveProperty("skills");
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/v1/characters")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ name: "Nami" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("status", "fail");
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("DELETE /characters/:id", () => {
    beforeAll(async () => {
      const character = await Character.create({
        userId,
        name: "Chopper",
        raceId,
        occupationId,
        backstory: "A doctor from Drum Island.",
        skills: ["medicine", "combat"],
      });

      characterId = character.id;
    });

    it("should return 200 and delete the character", async () => {
      const response = await request(app)
        .delete(`/api/v1/characters/${characterId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Successfully delete a character"
      );
      expect(response.body).toHaveProperty("deletedCharacter");
      expect(response.body.deletedCharacter).toHaveProperty("name", "Chopper");
    });

    it("should return 404 if character is not found", async () => {
      const response = await request(app)
        .delete(`/api/v1/characters/999`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("status", "fail");
      expect(response.body).toHaveProperty(
        "message",
        "The character that you want to delete does not exist!"
      );
    });
  });
});
