const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
const jwt = require("jsonwebtoken");

class User {
  static async makePublicUser(user) {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      location: user.location
    };
  }
  static async login(credentials) {
    const requiredFields = ["email", "password"];
    console.log(credentials);

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    const user = await User.fetchUserByEmail(credentials.email);

    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);

      if (isValid) {
        return User.makePublicUser(user);
      }
    }

    throw new UnauthorizedError("Invalid email/password");
  }

  static async register(credentials) {
    const requiredFields = [
      "username",
      "first_name",
      "last_name",
      "email",
      "password",
      "location"
    ];

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body...`);
      }
    });

    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError("Duplicate email: ", credentials.email);
    }

    const lowercasedEmail = credentials.email.toLowerCase();

    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    const result = await db.query(
      `
    INSERT INTO users(
        username,
        first_name,
        last_name,
        email,
        password,
        location
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING username,first_name,last_name,email,password,location;
    `,
      [
        credentials.username,
        credentials.first_name,
        credentials.last_name,
        lowercasedEmail,
        hashedPassword,
        credentials.location
      ]
    );
    //return the user
    const user = result.rows[0];

    return User.makePublicUser(user);
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    const query = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;
