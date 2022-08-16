/* Creates SQL queries for updating and inserting 
to the database on the “users” table upon endpoint 
call from the user.js route. */

const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
const { s3 } = require("../config");

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
      image_url: user.image_url,
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

  static async register(credentials, image = null) {
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
      if (!Object.prototype.hasOwnProperty.call(credentials, field)) {
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
    RETURNING first_name,last_name,email,password,location,account_type, company, id;
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
    const id = result.rows[0].id;

    let img_result = null;

    const image_value = image ? Object(image) : null;



    if (image_value) {
      await this.postPhototoS3(image_value, id);
      const url = this.getS3Url(id);

      console.log(url);

      const query = `UPDATE users
        SET image_url = $1
        WHERE id = ${id}
        RETURNING id, first_name, last_name, email, password, location, account_type, company, image_url;`;

      img_result = await db.query(query, [url]);
    }
    console.log(img_result);
    let final_result = img_result ? img_result.rows[0] : user;

    return User.makePublicUser(final_result);
  }

  /*S3 Functions for AWS image upload functionality*/

  static getS3Url(id) {
    let url = null;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${id}`,
      Expires: 9999
    };
    url = s3.getSignedUrl("getObject", params);

    console.log(url);
    return url;
  }

  static async postPhototoS3(photo, id) {
    const photoToBase64 = Buffer.from(photo.data, "base64");
    await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${id}`,
        Body: photoToBase64,
      })
      .promise();
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
