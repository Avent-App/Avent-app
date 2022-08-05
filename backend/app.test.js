const request = require("supertest");
const app = require("./app");
const db = require("./db");

describe("Test Aplicattion", () => {
  test("Not found for page 404", async () => {
    const res = await request(app).get("/wrong-endpoint");
    expect(res.statusCode).toEqual(404);
  });
});

describe("Test application", () => {
  test("Not Found for site 404", async () => {
    const res = await request(app).get("/wrong-endpoint");
    expect(res.statusCode).toEqual(404);
  });
  test("Health check route returns valid response", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ ping: "pong" });
  });
});

afterAll(async () => {
  await db.end();
}, 100000);
