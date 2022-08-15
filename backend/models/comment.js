const db = require("../db");
const { BadRequestError } = require("../utils/errors");

// title, description, start_date, end_date, address

class Comment {
  static async postComment(comment) {
    const requiredFields = ["user_id", "comment_section_id", "comment_text"];

    requiredFields.forEach((field) => {
      if (!comment.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    //Check for userId
    if (!comment.user_id) {
      throw new BadRequestError("Missing userId in the request body.");
    }

    //Inserting the exercise data into the database.
    const result = await db.query(
      `
        INSERT INTO comment(
            user_id,
            comment_section_id,
            comment_text
        )
        VALUES ($1,$2,$3)
        RETURNING user_id, comment_section_id, comment_text;
        `,
      [comment.user_id, comment.comment_section_id, comment.comment_text]
    );
    //return the exercise
    const commentRow = result.rows[0];
    return commentRow;
  }

  //   static async getComment(userId) {
  //     const result = await db.query(
  //       `
  //       SELECT *
  //       FROM comments
  //       WHERE user_id = $1;
  //       `,
  //       [userId.id]
  //     );
  //     return result.rows;
  //   }

  static async getCommentSection(commentSectionId) {
    const result = await db.query(
      `
      SELECT comment.created_at, first_name, last_name, comment_text, users.id, comment.comment_id, comment.user_id, users.image_url
      FROM comment, users
      WHERE comment_section_id = $1 AND comment.user_id = users.id
      ORDER BY comment.created_at DESC;

      `,
      [commentSectionId]
    );

    console.log(result.rows);

    return result.rows;
  }

  static async getComment(commentId) {
    const result = await db.query(
      `
      SELECT * 
      FROM comment
      WHERE comment_id = $1;
      `,
      [commentId]
    );
    console.log(result.rows);
    return result.rows;
  }

  static async getUserFromComment(comment_id) {
    const result = await db.query(
      `      
      SELECT first_name, last_name, image_url
      FROM comment, users
      WHERE comment.comment_id = $1 AND comment.user_id = users.id;
      `,
      [comment_id]
    );
    return result.rows;
  }
}

module.exports = Comment;
