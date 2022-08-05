const request = require("supertest");
const app = require("../app");

const { commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/common");

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /auth/token */

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
          password: "password",
          first_name: "LeBron",
          last_name: "James",
          account_type: "intern",
          email: "lebron@james.io",
          created_at: expect.any(String),
          updated_at: expect.any(String),
          location: "123 Mission St",
          company: "Salesforce",
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
        email: "lebron@james.io",
        password: "nope",
      });
      expect(res.statusCode).toEqual(401);
    });

    test("Throws Bad Request error when user doesn't provide password", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "lebron@james.io",
      });
      expect(res.statusCode).toEqual(400);
    });

    test("Throws Bad Request error when user doesn't provide email", async () => {
      const res = await request(app).post("/auth/login/").send({
        password: "password1",
      });
      expect(res.statusCode).toEqual(400);
    });
  });

  // /************************************** POST /auth/register */
  // describe("POST /auth/register/", () => {
  //   test("Allows user to register with valid credentials", async () => {
  //     const res = await request(app).post("/auth/register/").send({
  //       username: "new",
  //       firstName: "first",
  //       lastName: "last",
  //       password: "pw",
  //       email: "new@email.com",
  //     });
  //     expect(res.statusCode).toEqual(201);
  //     expect(res.body).toEqual({
  //       token: expect.any(String),
  //       user: {
  //         id: expect.any(Number),
  //         username: "new",
  //         firstName: "first",
  //         lastName: "last",
  //         email: "new@email.com",
  //         createdAt: expect.any(String),
  //         isAdmin: false,
  //       },
  //     });
  //   });

  //   test("Throws Bad Request error when user doesn't provide all fields", async () => {
  //     const res = await request(app).post("/auth/register/").send({
  //       username: "new",
  //     });
  //     expect(res.statusCode).toEqual(400);
  //   });
  // });
});
