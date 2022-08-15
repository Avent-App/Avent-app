const { BadRequestError } = require("../utils/errors");
const Reservation = require("./reservation");

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testListingIds } = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Reservations", () => {
  describe("Test createReservation", () => {
    test("Can create a new reservation with valid params", async () => {
      const user = { email: "i@sf.com" };
      const userId = testListingIds[0];
      console.log("user", testListingIds);
      const reservation = await Reservation.getReservationsByUserId(userId);
      console.log("_______________S", reservation);
      expect(reservation.length).toEqual(0);

      const reservations = await Reservation.listReservationsFromUser(user);
      const firstBooking = reservations[reservations.length - 1];

      expect(firstBooking).toEqual({
        user_id: expect.any(Number),
        user_id: expect.any(Number),
        email: "i@sf.com",
        hostUsername: "i@sf.com",
        createdAt: expect.any(Date),
      });
    });

    // test("Returns empty array when user hasn't rsvped anything", async () => {
    //   const user = { email: "i@sf.com" };

    //   const reservations = await Reservation.getReservationsByUserId(user);
    //   expect(reservations).toHaveLength(0);
    // });
  });

  //===================================================================================
  // describe("Test listBookingsFromUser", () => {
  //   test("Fetches all of the authenticated users' bookings", async () => {
  //     const user = { username: "jlo" };
  //     const listingId = testListingIds[0];
  //     const listing = await Listing.fetchListingById(listingId);

  //     const bookings = await Booking.listBookingsFromUser(user);
  //     expect(bookings.length).toEqual(2);

  //     const firstBooking = bookings[bookings.length - 1];

  //     firstBooking.totalCost = Number(firstBooking.totalCost);

  //     expect(firstBooking).toEqual({
  //       id: expect.any(Number),
  //       startDate: new Date("03-05-2021"),
  //       endDate: new Date("03-07-2021"),
  //       paymentMethod: "card",
  //       guests: 1,
  //       username: "jlo",
  //       hostUsername: "lebron",
  //       totalCost: Math.ceil(3 * (Number(listing.price) + Number(listing.price) * 0.1)),
  //       listingId: listingId,
  //       userId: expect.any(Number),
  //       createdAt: expect.any(Date),
  //     });
  //   });

  //   test("Returns empty array when user hasn't booked anything", async () => {
  //     const user = { username: "lebron" };

  //     const bookings = await Booking.listBookingsFromUser(user);
  //     expect(bookings).toHaveLength(0);
  //   });
  // });

  // describe("Test listBookingsForUserListings", () => {
  //   test("Fetches all of the bookings for any listing the user owns", async () => {
  //     const user = { username: "lebron" };
  //     const listingId = testListingIds[0];
  //     const listing = await Listing.fetchListingById(listingId);

  //     const bookings = await Booking.listBookingsForUserListings(user);
  //     expect(bookings.length).toEqual(2);

  //     const firstBooking = bookings[bookings.length - 1];

  //     firstBooking.totalCost = Number(firstBooking.totalCost);

  //     expect(firstBooking).toEqual({
  //       id: expect.any(Number),
  //       startDate: new Date("03-05-2021"),
  //       endDate: new Date("03-07-2021"),
  //       paymentMethod: "card",
  //       guests: 1,
  //       username: "jlo",
  //       hostUsername: "lebron",
  //       totalCost: Math.ceil(3 * (Number(listing.price) + Number(listing.price) * 0.1)),
  //       listingId: listingId,
  //       userId: expect.any(Number),
  //       createdAt: expect.any(Date),
  //     });
  //   });

  //   test("Returns empty array when users listing have no bookings", async () => {
  //     const user = { username: "serena" };

  //     const bookings = await Booking.listBookingsForUserListings(user);
  //     expect(bookings).toHaveLength(0);
  //   });
  // });
});
