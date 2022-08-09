const bcrypt = require("bcrypt");
const db = require("../db");
const tokens = require("../utils/tokens");
const { BCRYPT_WORK_FACTOR } = require("../config");

const createUsers = async () => {
  await db.query(`
    INSERT INTO users (password, account_type, first_name, last_name, email, location, company)
    VALUES (
      '${await bcrypt.hash("123", BCRYPT_WORK_FACTOR)}',
      'Intern',
      'Irem',
      'Komurcu',
      'i@sf.com',
      'San Francisco', 
      'Salesforce'
    ), (
      '${await bcrypt.hash("123", BCRYPT_WORK_FACTOR)}',
      'business',
      'Sales',
      'Force',
      'marc@sf.com',
      'San Francisco', 
      'Apple'
    ), (
      '${await bcrypt.hash("123", BCRYPT_WORK_FACTOR)}',
      'Intern',
      'Enrique',
      'Rico',
      'e@sf.com',
      'New York', 
      'Google'
    );  
  `);

  const results = await db.query(`SELECT id FROM users ORDER BY id ASC`);

  const ids = results.rows.map((row) => row.id);
  return ids;
};

const iremToken = tokens.createUserJwt({ email: "i@sf.com", isAdmin: false });
const marcToken = tokens.createUserJwt({ email: "marc@sf.com", isAdmin: false });
const adminToken = tokens.createUserJwt({ email: "e@sf.com", isAdmin: true });

module.exports = {
  createUsers,
  iremToken,
  marcToken,
  adminToken,
};
