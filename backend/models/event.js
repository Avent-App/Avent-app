const db = require("../db");
const { BadRequestError } = require("../utils/errors");

// title, description, start_date, end_date, address

class Event {
  static async createEvent(event) {
    const requiredFields = ["host_id", "title", "description", "start_date", "end_date", "address", "event_category", "image_url"];

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
            address,
            event_category,
            image_url
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING event_id, host_id,title,description,start_date,end_date,address,event_category,image_url;
        `,
      [event.host_id, event.title, event.description, event.start_date, event.end_date, event.address, event.event_category, event.image_url]
    );

    const eventRow = result.rows[0];
    console.log(eventRow);

    const create_section = await db.query(
      `
        INSERT INTO comment_section(
            event_id
        )
        VALUES ($1);
        `,
      [eventRow.event_id]
    );

    //return the exercise
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
      SELECT event_id, host_id, title, description, image_url, address, start_date, event_category, first_name, last_name
      FROM events, users
      WHERE events.host_id = users.id;
      `
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

  static async getUpcomingUserEventListings(userId) {
    const result = await db.query(
      `
      SELECT event_id, host_id, title, description, image_url, address, start_date, first_name, last_name
      FROM events, users
      WHERE events.host_id = $1 AND events.host_id = users.id AND events.start_date > NOW();
      `,
      [userId]
    );
    return result.rows;
  }

  static async getPastUserEventListings(userId) {
    const result = await db.query(
      `
      SELECT event_id, host_id, title, description, image_url, address, start_date, first_name, last_name
      FROM events, users
      WHERE events.host_id = $1 AND events.host_id = users.id AND events.end_date < NOW();
      `,
      [userId]
    );
    return result.rows;
  }

  static async deleteEventListing(eventId) {
    const result = await db.query(
      `
        DELETE FROM events
        WHERE event_id = $1;
        `,
      [eventId]
    );
  }
}

module.exports = Event;
