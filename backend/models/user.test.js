const { NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors");
const User = require("./user");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("User", () => {
  /**User.login */
  describe("Test login", () => {
    test("User can login successfully with proper credentials", async () => {
      const user = await User.login({ email: "i@sf.com", password: "123" });

      expect(user).toEqual({
        id: expect.any(Number),
        first_name: "Irem",
        last_name: "Komurcu",
        account_type: "Intern",
        email: "i@sf.com",
        password: expect.any(String),
        location: "San Francisco",
        company: "Salesforce",
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    });

    test("Unknown email throw unauthorized error", async () => {
      expect.assertions(1);

      try {
        await User.login({ email: "somebody@else.io", password: "password" });
      } catch (err) {
        expect(err instanceof UnauthorizedError).toBeTruthy();
      }
    });

    test("Invalid credentials throw unauthorized error", async () => {
      expect.assertions(1);

      try {
        await User.login({ email: "i@sf.com", password: "wrong" });
      } catch (err) {
        expect(err instanceof UnauthorizedError).toBeTruthy();
      }
    });
  });

  /**User.register */
  describe("Test register", () => {
    const newUser = {
      first_name: "Test",
      last_name: "Tester",
      email: "test@test.io",
      password: expect.any(String),
      location: "San Francisco",
      company: "Salesforce",
      account_type: expect.any(String),
    };

    test("User can successfully register with proper credentials", async () => {
      const user = await User.register({ ...newUser, password: "123" });
      expect(user).toEqual({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: expect.any(String),
        location: newUser.location,
        company: newUser.company,
        account_type: newUser.account_type,
      });
    });

    test("Registering with duplicate email throws error", async () => {
      expect.assertions(1);

      try {
        await User.register({
          ...newUser,
          password: "pw",
        });
        await User.register({
          ...newUser,
          password: "pw",
        });
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  });

  /**fetchUserByEmail */
  describe("Test fetchUserByEmail", () => {
    test("Can fetch a user by email", async () => {
      const user = await User.fetchUserByEmail("i@sf.com");
      expect(user).toEqual({
        account_type: "Intern",
        company: "Salesforce",
        created_at: expect.any(Date),
        email: "i@sf.com",
        first_name: "Irem",
        id: expect.any(Number),
        last_name: "Komurcu",
        location: "San Francisco",
        password: expect.any(String),
        updated_at: expect.any(Date),
        verified: null,
      });
    });

    test("Unknown email returns nothing", async () => {
      const user = await User.fetchUserByEmail("wrong@nope.nope");
      expect(user).toBeFalsy();
    });
  });
});
