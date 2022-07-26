const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Reservation {
  static async createReservation(reservation) {
    const requiredFields = ["user_id", "event_id"];

    requiredFields.forEach((field) => {
      if (!reservation.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    //Check for userId
    if (!reservation.user_id) {
      throw new BadRequestError("Missing userId in the request body.");
    }

    //Inserting the exercise data into the database.
    const result = await db.query(
      `
          INSERT INTO reservations(
              user_id,
              event_id
          )
          VALUES ($1,$2)
          RETURNING reservation_id, user_id, event_id;
          `,
      [reservation.user_id, reservation.event_id]
    );
    //return the exercise
    const reservationRow = result.rows[0];
    return reservationRow;
  }

  static async getReservationsByUserId(userId) {
    const result = await db.query(
      `
        SELECT * 
        FROM reservations
        WHERE user_id = $1;
        `,
      [userId]
    );
    return result.rows;
  }

  static async deleteReservation(reservationId) {
    const result = await db.query(
      `
        DELETE FROM reservations
        WHERE reservation_id = $1;
        `,
      [reservationId]
    );
  }

  static async getReservation(reservationId) {
    const result = await db.query(
      `
        SELECT *
        FROM reservations
        WHERE reservation_id = $1;
        `,
      [reservationId]
    );
    return result.rows;
  }

  static async getUpcomingReservations(userId) {
    //This function gets upcoming reservations based on a user's id.
    const result = await db.query(
      `
      SELECT events.event_id, host_id, title, description, events.image_url, users.image_url AS user_img, address, start_date, event_category, first_name, last_name, reservation_id
      FROM events, reservations, users
      WHERE reservations.user_id = $1 AND reservations.event_id = events.event_id AND events.host_id = users.id AND events.start_date > NOW();
      `,
      [userId]
    );
    return result.rows;
  }

  static async getPastReservations(userId) {
    //This function gets upcoming reservations based on a user's id.
    const result = await db.query(
      `
      SELECT events.event_id, host_id, title, description, events.image_url, users.image_url AS user_img, address, start_date, event_category, first_name, last_name
      FROM events, reservations, users
      WHERE reservations.user_id = $1 AND reservations.event_id = events.event_id AND events.host_id = users.id AND events.end_date < NOW();
      `,
      [userId]
    );
    return result.rows;
  }

  static async checkIfReserved(eventId, userId) {
    const result = await db.query(
      `
        SELECT *
        FROM reservations
        WHERE event_id = $1 AND user_id = $2;
        `,
      [eventId, userId]
    );
    console.log(result.rows);
    return result.rows;
  }

  static async getReservationsByEventId(eventId) {
    const result = await db.query(
      `
      SELECT first_name, last_name, users.id, reservation_id, users.image_url AS user_img
      FROM reservations, users
      WHERE reservations.event_id = $1 AND reservations.user_id = users.id;
      `,
      [eventId]
    );
    return result.rows;
  }
}

module.exports = Reservation;
