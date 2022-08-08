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
    return result.rows;
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
}

module.exports = Reservation;
