const jwt = require("jsonwebtoken");
const tokens = require("../utils/tokens");
const security = require("./security");
const { UnauthorizedError } = require("../utils/errors");

const validJwt = tokens.generateToken({ email: "i@sf.com", isAdmin: false });
const invalidJwt = jwt.sign({ email: "i@sf.com", isAdmin: false }, "invalid_key");

describe("Security", () => {
  describe("Test jwtForm", () => {
    test("Correctly parses token from valid authorization header", () => {
      const req = { headers: { authorization: `Bearer ${validJwt}` } };

      const token = security.jwtForm(req);
      expect(token).toEqual(validJwt);
    });

    test("Returns undefined when no auth header present", () => {
      const req = { headers: {} };

      const token = security.jwtForm(req);
      expect(typeof token).toEqual("undefined");
    });

    test("Returns undefined when scheme is invalid", () => {
      const req = { headers: { authorization: `Invalid ${validJwt}` } };

      const token = security.jwtForm(req);
      expect(typeof token).toEqual("undefined");
    });
  });

  describe("Test extractUserFromJwt", () => {
    test("Extracts user from valid jwt", () => {
      expect.assertions(2);

      const req = { headers: { authorization: `Bearer ${validJwt}` } };
      const res = { locals: {} };
      const next = (err) => expect(err).toBeFalsy();
      security.extractUserFromJwt(req, res, next);
      expect(res.locals).toEqual({
        user: {
          iat: expect.any(Number),
          exp: expect.any(Number),
          email: "i@sf.com",
          isAdmin: false,
        },
      });
    });

    test("Does nothing with an invalid jwt", () => {
      expect.assertions(2);

      const req = { headers: { authorization: `Bearer ${invalidJwt}` } };
      const res = { locals: {} };
      const next = (err) => expect(err).toBeFalsy();
      security.extractUserFromJwt(req, res, next);
      expect(res.locals).toEqual({});
    });

    test("Does nothing with no jwt", () => {
      expect.assertions(2);

      const req = { headers: { authorization: `Bearer` } };
      const res = { locals: {} };
      const next = (err) => expect(err).toBeFalsy();
      security.extractUserFromJwt(req, res, next);
      expect(res.locals).toEqual({});
    });

    test("Does nothing with no auth header", () => {
      expect.assertions(2);

      const req = { headers: {} };
      const res = { locals: {} };
      const next = (err) => expect(err).toBeFalsy();
      security.extractUserFromJwt(req, res, next);
      expect(res.locals).toEqual({});
    });
  });

  describe("Test requireAuthenticatedUser", () => {
    test("Doesn't throw errors when user is present", () => {
      expect.assertions(1);
      const req = {};
      const res = { locals: { user: { email: `lebron@james.io`, username: "lebron", isAdmin: false } } };
      const next = (err) => expect(err).toBeFalsy();
      security.requireAuthenticatedUser(req, res, next);
    });

    test("Throws errors when no user is present", () => {
      expect.assertions(1);
      const req = {};
      const res = { locals: {} };
      const next = (err) => expect(err instanceof UnauthorizedError).toBeTruthy();
      security.requireAuthenticatedUser(req, res, next);
    });
  });
});
