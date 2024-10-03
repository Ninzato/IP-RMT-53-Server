const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { Enemy, User, Character, Race, Occupation } = require("../models");
const { queryInterface } = sequelize;

describe("BattleController", () => {
  let userToken;
  let userId;
  let raceId;
  let occupationId;
  let characterId;
  let battleId;

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

    const character = await Character.create({
      userId,
      name: "Zoro",
      raceId,
      occupationId,
      backstory: "A swordsman from East Blue",
      skills: ["swordsmanship", "observation haki"],
    });

    characterId = character.id;

    const loginResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "luffy@yonkou.com", password: "12345" });

    userToken = loginResponse.body.access_token;

    const enemyData = require("../data/enemies.json").map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    const insertEnemy = async () => {
      await Enemy.bulkCreate(enemyData);
    };

    insertEnemy();
  });

  afterAll(async () => {
    await queryInterface.bulkDelete("Battles", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
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
  });

  describe("POST /battle", () => {
    it("should return 201 and create a new battle", async () => {
      const response = await request(app)
        .post("/api/v1/battle")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          characterId,
          characterHealth: 100,
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("characterId", characterId);
      expect(response.body).toHaveProperty("turn", "player");
      expect(response.body).toHaveProperty("result", "undecided");

      battleId = response.body.id;
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/v1/battle")
        .set("Authorization", `Bearer ${userToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("status", "fail");
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("GET /battle/:battleId", () => {
    it("should return 200 and the battle data by ID", async () => {
      const response = await request(app)
        .get(`/api/v1/battle/${battleId}`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("id", battleId);
      expect(response.body).toHaveProperty("characterId", characterId);
    });

    it("should return 404 if battle is not found", async () => {
      const response = await request(app)
        .get(`/api/v1/battle/999`)
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("status", "fail");
      expect(response.body).toHaveProperty("message", "Battle not found");
    });
  });

  describe("PATCH /battle/:battleId", () => {
    it("should return 200 and update the battle result", async () => {
      const response = await request(app)
        .patch(`/api/v1/battle/${battleId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ result: "win" });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("result", "win");
    });

    it("should return 404 if the battle to update is not found", async () => {
      const response = await request(app)
        .patch(`/api/v1/battle/999`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ result: "win" });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("status", "fail");
      expect(response.body).toHaveProperty("message", "Battle not found");
    });
  });
});
