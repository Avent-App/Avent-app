require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const SECRET_KEY =
  process.env.jwtSecret || "78023nfsidh792u34bn90f2n934f01nfasopiadfd;'p[21j9302iesnj";

function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbPass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const dbHost = process.env.DATABASE_HOST || "localhost";
  const dbPort = process.env.DATABASE_PORT || 5432;
  const dbName = process.env.DATABASE_NAME || "avent";

  return (
    process.env.DATABASE_URL ||
    `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  );
}

const BCRYPT_WORK_FACTOR = 13;

console.log("avent config:".red);
console.log("Port:".blue, PORT);
console.log("Database URI:".blue, getDatabaseUri());
console.log("avent config:".green);
console.log("---");

module.exports = {
  PORT,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
};