const jwt = require("jsonwebtoken");
const tokens = require("./tokens");
const { SECRET_KEY } = require("../config");

describe("Can create valid tokens for users", () => {
  test("Valid tokens are created for non-admin users", () => {
    const token = tokens.createUserJwt({ email: "test", isAdmin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      exp: expect.any(Number),
      email: "test",
      isAdmin: false,
    });
  });

  test("Valid tokens are created for admin users", () => {
    const token = tokens.createUserJwt({ email: "test", isAdmin: true });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      exp: expect.any(Number),
      email: "test",
      isAdmin: true,
    });
  });

  test("Tokens set the isAdmin value to false by default", () => {
    const token = tokens.createUserJwt({ email: "test" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      exp: expect.any(Number),
      email: "test",
      isAdmin: false,
    });
  });
});
