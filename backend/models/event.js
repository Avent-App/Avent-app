const db = require("../db");
const { BadRequestError } = require("../utils/errors");

// title, description, start_date, end_date, address

class Event {
  static async createEvent({ newEvent }) {
    const requiredFields = ["host_id", "title", "description", "start_date", "end_date", "address", "event_category", "image_url"];

    requiredFields.forEach((field) => {
      if (!newEvent.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    //Check for userId
    if (!newEvent.host_id) {
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
            address,
            event_category,
            image_url
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING host_id,title,description,start_date,end_date,address,event_category,image_url;
        `,
      [
        newEvent.host_id,
        newEvent.title,
        newEvent.description,
        newEvent.start_date,
        newEvent.end_date,
        newEvent.address,
        newEvent.event_category,
        newEvent.image_url,
      ]
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

  static async getEvents() {
    const result = await db.query(
      `
      SELECT *
      FROM events;`
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
