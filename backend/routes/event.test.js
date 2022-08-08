const request = require("supertest");
const app = require("../app");

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testTokens, testListingIds } = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const iremListing = {
  email: "i@sf.com",
  location: "San Francisco",
  title: "Wine Tasting",
  description: "Join us for a wine tasting event with cheese pairings",
  address: "415 Mission St, San Francisco, CA 94105",
  event_category: "Intern",
  image_url: "https://cdn.pixabay.com/photo/2017/01/04/13/57/wine-1952051_960_720.jpg",
  start_date: "2022-07-28 00:00:01",
  end_date: "2022-07-28 16:00:01",
};

/************************************** POST /events/ */
describe("POST /events/create/", () => {
  test("Authed user can create new event", async () => {
    const newEvent = {
      title: "Test",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus, ligula eu eleifend consequat, sem metus dignissim.",
      image_url: "https://images.unsplash.com/photo-1539437829697-1b4ed5aebd19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
      event_category: "Intern",
      address: "123 Mission St",
      start_date: "2022-07-28 00:00:01",
      end_date: "2022-07-28 16:00:01",
    };

    const res = await request(app).post(`/events/create`).set("authorization", `Bearer ${testTokens.Token}`).send({ newEvent });
    expect(res.statusCode).toEqual(404);

    const { event } = res.body;

    //returning UNDEFINED ??
    console.log("EVEEEENT_______________", event);

    expect(event).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      email: "i@sf.com",
      title: newEvent.title,
      location: newEvent.address,
      description: newEvent.description,
      image_url: newEvent.image_url,
      start_date: newEvent.start_date,
      end_date: newEvent.end_date,
      event_category: newEvent.event_category,
    });
  });

  test("Throws Unauthorized error when user is unauthenticated", async () => {
    const res = await request(app).post(`/events/create`);
    expect(res.statusCode).toEqual(404);
  });
});

// /************************************** GET /listings/ */

// describe("GET /listings", () => {
//   test("Authed user can fetch all listings", async () => {
//     const res = await request(app).get(`/listings/`).set("authorization", `Bearer ${testTokens.jloToken}`);
//     expect(res.statusCode).toEqual(200);

//     const { listings } = res.body;

//     expect(listings.length).toEqual(12);

//     const frenchListingForLebron = listings.find((l) => l.username === "lebron" && l.location === "France");
//     const { username, location, title, description, imageUrl, imageUrl2, imageUrl3, price } = frenchListingForLebron;
//     expect({ username, location, title, description, imageUrl, imageUrl2, imageUrl3, price: Number(price) }).toEqual(lebronFrenchListing);
//   });

//   test("Anonymous user can fetch all listings", async () => {
//     const res = await request(app).get(`/listings/`);
//     expect(res.statusCode).toEqual(200);

//     const { listings } = res.body;

//     expect(listings.length).toEqual(12);

//     const frenchListingForLebron = listings.find((l) => l.username === "lebron" && l.location === "France");
//     const { username, location, title, description, imageUrl, imageUrl2, imageUrl3, price } = frenchListingForLebron;
//     expect({ username, location, title, description, imageUrl, imageUrl2, imageUrl3, price: Number(price) }).toEqual(lebronFrenchListing);
//   });
// });

// /************************************** GET /listings/:listingId */

// describe("GET /listings/:eventId", () => {
//   test("Authenticated user can get listing by id", async () => {
//     const listingId = testListingIds[0];
//     const res = await request(app).get(`/listings/${listingId}/`).set("authorization", `Bearer ${testTokens.jloToken}`);
//     expect(res.statusCode).toEqual(200);

//     const { listing } = res.body;
//     const { username, location, title, description, imageUrl, imageUrl2, imageUrl3, price } = listing;
//     expect({ username, location, title, description, imageUrl, imageUrl2, imageUrl3, price: Number(price) }).toEqual(lebronFrenchListing);
//   });

//   test("Throws Unauthorized error when user is unauthenticated", async () => {
//     const listingId = testListingIds[0];
//     const res = await request(app).get(`/listings/${listingId}/`);
//     expect(res.statusCode).toEqual(401);
//   });
// });
