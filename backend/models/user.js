const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
const jwt = require("jsonwebtoken");

class User {
  static async makePublicUser(user) {
    return {
      id: user.id,
      password: user.password,
      first_name: user.first_name,
      last_name: user.last_name,
      account_type: user.account_type,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      location: user.location,
      company: user.company,
    };
  }
  static async login(credentials) {
    const requiredFields = ["email", "password"];
    // console.log(credentials);

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
      "first_name",
      "last_name",
      "email",
      "password",
      "location",
      "account_type",
      "company",
    ];

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body...`);
      }
    });

    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError("Duplicate email ", credentials.email);
    }

    const lowercasedEmail = credentials.email.toLowerCase();

    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    const result = await db.query(
      `
    INSERT INTO users(
        first_name,
        last_name,
        email,
        password,
        location,
        account_type,
        company
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING first_name,last_name,email,password,location,account_type, company;
    `,
      [
        credentials.first_name,
        credentials.last_name,
        lowercasedEmail,
        hashedPassword,
        credentials.location,
        credentials.account_type,
        credentials.company,
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

  static async fetchUserByID(id) {
    if (!id) {
      throw new BadRequestError("No user id provided");
    }

    const query = "SELECT * FROM users WHERE id = $1";
    const result = await db.query(query, [id.toString()]);
    const user = result.rows[0];
    return user;
  }

  static async updateUserFields(id, fields) {
    if (!id) {
      throw new BadRequestError("No user id is provided");
    }
    if (!fields) {
      throw new BadRequestError("Nothing was updated!");
    }

    var newHashedPassword = fields.password;

    if (fields.password != "") {
      newHashedPassword = await bcrypt.hash(
        fields.password,
        BCRYPT_WORK_FACTOR
      );
    }

    //Fields will only update if they are filled...
    //Coalesce takes in the first non-null paramater. NULLIF returns null if the two fields inside are equal.
    const result = await db.query(
      `
      UPDATE users
      SET first_name = COALESCE(NULLIF($2,''), first_name),
          last_name = COALESCE(NULLIF($3,''), last_name),
          email = COALESCE(NULLIF($4,''), email),
          location = COALESCE(NULLIF($5,''), location),
          password = COALESCE(NULLIF($6,''), password),
          company = COALESCE(NULLIF($7,''), company),
          biography = COALESCE(NULLIF($8,''), biography)
      WHERE id = $1
      RETURNING *;
      `,
      [
        id,
        fields.firstName,
        fields.lastName,
        fields.email,
        fields.location,
        newHashedPassword,
        fields.company,
        fields.biography,
      ]
    );

    return result.rows[0];
  }
}

module.exports = User;
