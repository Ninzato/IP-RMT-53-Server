const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { User, Race, Occupation } = require("../models");
const { queryInterface } = sequelize;

describe("ResourceController", () => {
  let userToken;

  beforeAll(async () => {
    await User.create({
      username: "Luffy",
      email: "luffy@yonkou.com",
      password: "12345",
    });

    await Race.create({ index: "human", name: "Human" });
    await Occupation.create({ index: "bard", name: "Bard" });

    const loginResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "luffy@yonkou.com", password: "12345" });

    userToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
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
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  });

  describe("GET /resource/races", () => {
    it("should return 200 and a list of races", async () => {
      const response = await request(app)
        .get("/api/v1/resource/races")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty("index", "human");
      expect(response.body[0]).toHaveProperty("name", "Human");
    });
    it("should return an empty array if no races exist", async () => {
      await queryInterface.bulkDelete("Races", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      });
      const response = await request(app)
        .get("/api/v1/resource/races")
        .set("Authorization", `Bearer ${userToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(0);

      await Race.create({ index: "human", name: "Human" });
    });
  });

  describe("GET /resource/occupations", () => {
    it("should return 200 and a list of occupations", async () => {
      const response = await request(app)
        .get("/api/v1/resource/occupations")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty("index", "bard");
      expect(response.body[0]).toHaveProperty("name", "Bard");
    });

    it("should return an empty array if no occupations exist", async () => {
      await queryInterface.bulkDelete("Occupations", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      });

      const response = await request(app)
        .get("/api/v1/resource/occupations")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(0);
    });
  });
});
