const request = require("supertest");
const app = require("../app");

const { commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/common");

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** POST /auth/token */

describe("Auth Routes", () => {
  describe("POST /auth/login/", () => {
    test("User can login successfully with valid credentials", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "i@sf.com",
        password: "123",
      });
      expect(res.body).toEqual({
        token: expect.any(String),
        user: {
          id: expect.any(Number),
          password: expect.any(String),
          first_name: "Irem",
          last_name: "Komurcu",
          account_type: "intern",
          email: "i@sf.com",
          location: "San Francisco",
          company: "Salesforce",
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      });
    });

    test("Throws Unauthenticated error when user doesn't exist in db", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "somebody_else@users.io",
        password: "password",
      });
      expect(res.statusCode).toEqual(401);
    });

    test("Throws Unauthenticated error when user provides wrong password", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "i@sf.com",
        password: "wrong",
      });
      expect(res.statusCode).toEqual(401);
    });

    test("Throws Bad Request error when user doesn't provide password", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "i@sf.com",
      });
      expect(res.statusCode).toEqual(400);
    });

    test("Throws Bad Request error when user doesn't provide email", async () => {
      const res = await request(app).post("/auth/login/").send({
        password: "123",
      });
      expect(res.statusCode).toEqual(400);
    });
  });

  // /**POST /auth/register */
  describe("POST /auth/register/", () => {
    test("Allows user to register with valid credentials", async () => {
      const res = await request(app)
        .post("/auth/register/")
        .send({
          first_name: "first",
          last_name: "last",
          password: "pw",
          email: "new@email.com",
          location: "San Francisco",
          company: "Salesforce",
          account_type: expect.any(String),
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({
        token: expect.any(String),
        user: {
          first_name: "first",
          last_name: "last",
          email: "new@email.com",
          password: expect.any(String),
          location: "San Francisco",
          company: "Salesforce",
          account_type: expect.any(String),
        },
      });
    });

    test("Throws Bad Request error when user doesn't provide all fields", async () => {
      const res = await request(app).post("/auth/register/").send({
        email: "new",
      });
      expect(res.statusCode).toEqual(400);
    });
  });
});
