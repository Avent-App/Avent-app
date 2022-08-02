const db = require("../db");
const { BadRequestError } = require("../utils/errors");

// title, description, start_date, end_date, address

class Event {
  static async createEvent(event) {
    const requiredFields = ["host_id", "title", "description", "start_date", "end_date", "address", "event_category"];

    requiredFields.forEach((field) => {
      if (!event.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    //Check for userId
    if (!event.host_id) {
      throw new BadRequestError("Missing userId in the request body.");
    }

    //Inserting the exercise data into the database.
    const result = await db.query(
      `
        INSERT INTO events(
            host_id,
            title,
            description,
            start_date,
            end_date,
            address,event_category
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING host_id,title,description,start_date,end_date,address,event_category;
        `,
      [event.host_id, event.title, event.description, event.start_date, event.end_date, event.address, event.event_category]
    );
    //return the exercise
    const eventRow = result.rows[0];
    return eventRow;
  }

  static async getEvent(userId) {
    const result = await db.query(
      `
      SELECT * 
      FROM events
      WHERE host_id = $1;
      `,
      [userId.id]
    );
    return result.rows;
  }

  static async getEventById(eventId) {
    const result = await db.query(
      `
      SELECT * 
      FROM events
      WHERE event_id = $1;
      `,
      [eventId]
    );
    return result.rows;
  }
}

module.exports = Event;
