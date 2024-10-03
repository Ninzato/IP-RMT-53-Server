const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { User } = require("../models");
const { queryInterface } = sequelize;

describe("AuthController", () => {
  beforeAll(async () => {
    await User.create({
      username: "Luffy",
      email: "luffy@yonkou.com",
      password: "12345",
    });
  });

  afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  });

  describe("POST /register", () => {
    it("should return 201 and the created user without password", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        username: "Zoro",
        email: "zoro@strawhat.com",
        password: "12345",
      });

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("email", "zoro@strawhat.com");
      expect(response.body).toHaveProperty("username", "Zoro");
      expect(response.body).not.toHaveProperty("password");
    });

    it("should throw a validation error if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({ username: "Sanji" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("status", "fail");
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("POST /login", () => {
    it("should return 200 and access_token when login is successful", async () => {
      const response = await request(app)
        .post("/api/v1/auth//login")
        .send({ email: "luffy@yonkou.com", password: "12345" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token");
      expect(response.body).toHaveProperty("id");
    });

    it("should return 400 if email is missing", async () => {
      const response = await request(app)
        .post("/api/v1/auth//login")
        .send({ password: "12345" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("status", "fail");
      expect(response.body).toHaveProperty(
        "message",
        "Please input your email"
      );
    });

    it("should return 400 if password is missing", async () => {
      const response = await request(app)
        .post("/api/v1/auth//login")
        .send({ email: "luffy@yonkou.com" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("status", "fail");
      expect(response.body).toHaveProperty(
        "message",
        "Please input your password"
      );
    });

    it("should return 401 if user is not found or password is incorrect", async () => {
      const response = await request(app)
        .post("/api/v1/auth//login")
        .send({ email: "luffy@yonkou.com", password: "syalala" });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("status", "fail");
      expect(response.body).toHaveProperty(
        "message",
        "Invalid email / password"
      );
    });
  });
});
