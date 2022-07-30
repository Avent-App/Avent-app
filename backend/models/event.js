const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Nutrition {
  static async addNutrition(nutrition, userId) {

    const requiredFields = [
      "nutritionName",
      "nutritionCategory",
      "calories",
      "quantity",
      "imageUrl",
    ];

    requiredFields.forEach((field) => {
      if (!nutrition.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    //Check for userId
    if (!userId) {
      throw new BadRequestError("Missing userId in the request body.");
    }

    //Inserting the exercise data into the database.
    const result = await db.query(
      `
        INSERT INTO nutrition(
            name,
            category,
            quantity,
            calories,
            image_url,
            user_id
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING id,name as nutrition_name,category as nutrition_category,quantity,calories,image_url, user_id;
        `,
      [
        nutrition.nutritionName,
        nutrition.nutritionCategory,
        nutrition.quantity,
        nutrition.calories,
        nutrition.imageUrl,
        userId,
      ]
    );
    //return the exercise
    const nutritionRow = result.rows[0];
    return nutritionRow;
  }

  static async getNutrition(userId) {
    const result = await db.query(
      `
      SELECT * 
      FROM nutrition
      WHERE user_id = $1;
      `,
      [userId]
    );
    return result.rows;
  }
}

module.exports = Nutrition;