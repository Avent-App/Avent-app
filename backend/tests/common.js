const { createUsers, iremToken, marcToken, adminToken } = require("./createUsers");
const { createListings } = require("./createListings");
// const { createRsvps} = require("./createRsvp");
const db = require("../db.js");

const testListingIds = [];
// const testRsvpsIds = [];
const testTokens = { iremToken, marcToken, adminToken };
const testUserIds = [];

async function commonBeforeAll() {
  // delete all current test data

  // await db.query(`DELETE FROM rsvps`);
  await db.query(`DELETE FROM events`);
  await db.query(`DELETE FROM users`);

  // insert fresh test data
  const userIds = await createUsers();
  const listingIds = await createListings(userIds);
  console.log("list", listingIds);

  for (let i = 0; i < listingIds.length; i++) {
    testListingIds.push(listingIds[i]);
  }
  for (let i = 0; i < userIds.length; i++) {
    testUserIds.push(userIds[i]);
  }

  // const bookingIds = await createRsvps(userIds, listingIds);

  // for (let i = 0; i < bookingIds.length; i++) {
  //   testBookingIds.push(bookingIds[i]);
  // }
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testListingIds,
  testUserIds,
  // testRsvpsIds,
  testTokens,
};
