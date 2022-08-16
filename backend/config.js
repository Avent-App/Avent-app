require("dotenv").config();
require("colors");
const AWS = require("aws-sdk");


const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const SECRET_KEY = process.env.jwtSecret || "super_dev";

const IS_TESTING = process.env.NODE_ENV === "test";

function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres";
  const dbHost = process.env.DATABASE_HOST || "localhost";
  const dbPort = process.env.DATABASE_PORT || 5432;
  const dbTestName = process.env.DATABASE_TEST_NAME || "avent_test";
  const dbProdName = process.env.DATABASE_NAME || "avent";
  const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName;

  return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13;

console.log("avent config:".red);
console.log("Port:".blue, PORT);
console.log("IS_TESTING:".blue, IS_TESTING);
console.log("Database URI:".blue, getDatabaseUri());
console.log("avent config:".green);
console.log("---");

module.exports = {
  PORT,
  IS_TESTING,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  s3,
};
