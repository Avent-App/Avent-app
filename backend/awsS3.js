const db = require("../db");
const { BadRequestError } = require("../utils/errors");
const { s3 } = require("../config");

class Listing {
  static async getListings() {
    const result = await db.query(`
    SELECT * INTO temptable
    FROM listings
    LEFT JOIN (
         SELECT AVG(rating) AS rating, listing_id
         FROM listings
        LEFT JOIN ratings ON ratings.listing_id = listings.id
         GROUP BY listing_id
    ) AS acc ON acc.listing_id = listings.id;

    ALTER TABLE temptable
    DROP COLUMN listing_id;

    SELECT * FROM temptable;
    DROP TABLE temptable;
        `);

    const res = result[2].rows;

    return res;
  }

  /**
   * return number of listings in database
   * @returns
   */
  static async getListingsCount() {
    const result = await db.query(
      `
      SELECT COUNT(*) FROM listings;
      `
    );

    const res = result.rows[0].count;

    return res;
  }

  static async getListingById(id) {
    const result = await db.query(
      `
      SELECT * INTO temptable
    FROM listings
    LEFT JOIN (
         SELECT AVG(rating) AS rating, listing_id
         FROM listings
        LEFT JOIN ratings ON ratings.listing_id = listings.id
         GROUP BY listing_id
    ) AS acc ON acc.listing_id = listings.id
    WHERE id =` +
        id +
        `;

    ALTER TABLE temptable
    DROP COLUMN listing_id;

    SELECT * FROM temptable;
    DROP TABLE temptable;
      
            `
    );

    const res = result[2].rows;

    return res;
  }

  static async getUserListings(userId) {
    const result = await db.query(
      `
      SELECT * INTO temptable
      FROM listings
      LEFT JOIN (
           SELECT AVG(rating) AS rating, listing_id
           FROM listings
          LEFT JOIN ratings ON ratings.listing_id = listings.id
           GROUP BY listing_id
      ) AS acc ON acc.listing_id = listings.id
      WHERE user_id =` +
        userId +
        `;
  
      ALTER TABLE temptable
      DROP COLUMN listing_id;
  
      SELECT * FROM temptable;
      DROP TABLE temptable;
            
            `
    );

    const res = result[2].rows;
    return res;
  }

  static async getBestListings() {
    const query = `
        SELECT * 
        FROM (
             SELECT AVG(rating) AS rating, listing_id
             FROM listings
             JOIN ratings ON ratings.listing_id = listings.id
             GROUP BY listing_id
        ) AS acc
        JOIN listings ON acc.listing_id = listings.id
        ORDER BY rating DESC
        LIMIT 4
        
        `;

    const result = await db.query(query);

    const res = result.rows;

    return res;
  }

  static async postListing(listings, user, images) {
    const requiredFields = [
      "price",
      "location",
      "max_accomodation",
      "model",
      "make",
      "year",
    ];

    requiredFields.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(listings, field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (listings.location.length < 1) {
      throw new BadRequestError("No location provided");
    }

    if (listings.price <= 0) {
      throw new BadRequestError("Kindly provide a valid price");
    }

    if (listings.model.length < 1) {
      throw new BadRequestError("No car model provided");
    }

    if (listings.make.length < 1) {
      throw new BadRequestError("No car make provided");
    }

    if (listings.max_accomodation < 1) {
      throw new BadRequestError(
        "Maximum vehicle accomodation cannot be less than 1"
      );
    }

    const imagesArray = Object.values(images);

    if (imagesArray.length === 0 || imagesArray.length > 5) {
      throw new BadRequestError(
        "You must upload at least one image and no more than five images."
      );
    }

    // console.log(imagesArray);

    const result = await db.query(
      `
          INSERT INTO listings(
                price,
                location,
                max_accomodation,
                make,
                model,
                year,
                user_id,
                description
                )
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
           RETURNING id;
          `,
      [
        Number(listings.price),
        listings.location,
        listings.max_accomodation,
        listings.make,
        listings.model,
        Number(listings.year),
        user.id,
        listings.description,
      ]
    );

    const id = result.rows[0].id;

    await this.postPhotostoS3(imagesArray, id);
    const urls = this.getS3Urls(imagesArray.length, id);

    console.log(urls);

    let toUpdateImages = { image_url: urls[0] };

    imagesArray.slice(1).forEach((_, i) => {
      toUpdateImages[`image_url${i + 2}`] = urls[i + 1];
    });

    const res = await this.editListing({
      listingUpdate: toUpdateImages,
      listingId: id,
    });

    return res;
  }

  static async editListing({ listingUpdate, listingId }) {
    let queryString = "";

    let listingUpdateEntries = Object.entries(listingUpdate);
    var params = 1;
    for (let i = 0; i < listingUpdateEntries.length; i++) {
      if (listingUpdateEntries[i][1] === "") {
        continue;
      }

      if (
        listingUpdateEntries[i][1] < 1 &&
        listingUpdateEntries[i][0] === "max_accomodation"
      ) {
        throw new BadRequestError(
          "Vehicle should be able to accomodate at least one person"
        );
      }

      if (
        listingUpdateEntries[i][1] <= 0 &&
        listingUpdateEntries[i][0] === "price"
      ) {
        throw new BadRequestError("Invalid price");
      }

      queryString += `${listingUpdateEntries[i][0]} = $${params}, `;
      params++;
    }

    const query = `UPDATE listings
        SET ${queryString}
        updatedAt = NOW()
        WHERE id = ${listingId}
        RETURNING id,user_id,price, location, max_accomodation, model, description,image_url, image_url2, image_url3, image_url4, image_url5, fees, createdAt, updatedAt;`;

    var entry = [];
    listingUpdateEntries.map((item) => {
      //   console.log(entry[1])
      if (item[1] !== "") {
        entry.push(item[1]);
      }
    });

    const result = await db.query(query, entry);

    const results = result.rows[0];

    return results;
  }

  static async deleteListing(listingId) {
    await db.query(
      `
      DELETE FROM listings
      WHERE id = $1;
     
      
      `,
      [listingId]
    );
  }

  static intersection(first, second) {
    if (!first && !second) {
      return null;
    } else if (!first) {
      return second;
    } else if (!second) {
      return first;
    } else {
      let intersection = first.filter((a) => second.some((b) => a.id === b.id));
      return intersection;
    }
  }
  // Helper functions for S3

  static getS3Urls(imagesLength, id) {
    const urls = [];

    for (let i = 0; i < imagesLength; i++) {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${id}-${i}`,
      };
      const url = s3.getSignedUrl("getObject", params);
      urls.push(url);
    }

    return urls;
  }

  static async postPhotostoS3(photos, id) {
    for (let i = 0; i < photos.length; i++) {
      const photo = Buffer.from(photos[i].data, "base64");
      await s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `${id}-${i}`,
          Body: photo,
          Tagging: `public=yes`,
        })
        .promise();
    }
  }

  static async filterListings(search) {
    if (
      search.minPrice === "" &&
      search.maxPrice === "" &&
      search.minRating === "" &&
      search.model === "" &&
      search.location === "" &&
      search.year === ""
    ) {
      throw new BadRequestError("Must have at least one filter variable");
    }

    const minPrice = search.minPrice;
    const maxPrice = search.maxPrice;

    var price =
      minPrice && maxPrice
        ? await this.filterPrice(minPrice, maxPrice)
        : minPrice && !maxPrice
        ? await this.filterPrice(minPrice, null)
        : !minPrice && maxPrice
        ? await this.filterPrice(null, maxPrice)
        : null;

    var minRating =
      search.minRating === ""
        ? null
        : await this.filterRating(search.minRating);
    var location =
      search.location === ""
        ? null
        : await this.filterLocation(search.location);

    var year = search.year === "" ? null : await this.filterYear(search.year);
    var model =
      search.model === "" ? null : await this.filterMake(search.model);

    var res = this.intersection(price, minRating);
    res = this.intersection(res, location);
    res = this.intersection(res, model);
    res = this.intersection(res, year);

    return res;
  }

  static async filterYear(year) {
    const result = await db.query(
      `
           SELECT *
             FROM listings
             LEFT JOIN (
                  SELECT AVG(rating) AS rating, listing_id
                    FROM listings
                    LEFT JOIN ratings ON ratings.listing_id = listings.id
                    GROUP BY listing_id
                ) AS acc ON acc.listing_id = listings.id
            WHERE year =` +
        year +
        `;

         

   
        `
    );

    const res = result.rows;

    return res;
  }

  static async filterMake(make) {
    const result = await db.query(
      `
           SELECT * 
             FROM listings
             LEFT JOIN (
                  SELECT AVG(rating) AS rating, listing_id
                    FROM listings
                    LEFT JOIN ratings ON ratings.listing_id = listings.id
                    GROUP BY listing_id
                ) AS acc ON acc.listing_id = listings.id
                WHERE LOWER(make) = $1;
            

     

   
        `,
      [make.toLowerCase()]
    );

    const res = result.rows;

    return res;
  }

  static async filterLocation(location) {
    const result = await db.query(
      `
           SELECT * 
             FROM listings
             LEFT JOIN (
                  SELECT AVG(rating) AS rating, listing_id
                    FROM listings
                    LEFT JOIN ratings ON ratings.listing_id = listings.id
                    GROUP BY listing_id
                ) AS acc ON acc.listing_id = listings.id
            WHERE LOWER(location) = $1;

          

   
        `,
      [location.toLowerCase()]
    );

    const res = result.rows;

    return res;
  }

  static async filterPrice(min, max) {
    const result = await db.query(`
           SELECT * 
             FROM listings
             LEFT JOIN (
                  SELECT AVG(rating) AS rating, listing_id
                    FROM listings
                    LEFT JOIN ratings ON ratings.listing_id = listings.id
                    GROUP BY listing_id
                ) AS acc ON acc.listing_id = listings.id
            WHERE price > ${min ? min : 0} AND price < ${
      max ? max : Number.MAX_VALUE
    };

          

   
        `);

    const res = result.rows;

    return res;
  }

  static async filterRating(rating) {
    const result = await db.query(
      `
           SELECT * 
             FROM listings
             LEFT JOIN (
                  SELECT AVG(rating) AS rating, listing_id
                    FROM listings
                    LEFT JOIN ratings ON ratings.listing_id = listings.id
                    GROUP BY listing_id
                ) AS acc ON acc.listing_id = listings.id
            WHERE rating >` +
        rating +
        `;

          

   
        `
    );

    const res = result.rows;

    return res;
  }
}

module.exports = Listing;