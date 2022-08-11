const db = require("../db");

const createListings = async (userIds) => {
  const secondUserId = userIds[1];
  const thirdUserId = userIds[2];

  if (!secondUserId || !thirdUserId) {
    throw new Error(`No second or third id found in ${userIds.join(", ")}`);
  }

  await db.query(`
    INSERT INTO events (host_id, title, description, start_date, end_date, address, event_category, image_url)
    VALUES (
      ${secondUserId},
      'Wine Tasting', 'Join us for a wine tasting event with cheese pairings', '2022-07-28 00:00:01', '2022-07-28 16:00:01', '415 Mission St, San Francisco, CA 94105', 'Intern', 'https://cdn.pixabay.com/photo/2017/01/04/13/57/wine-1952051_960_720.jpg'
    ), (
      ${secondUserId},
      'Cocktail Making Class', 'Learn how to make 3 different cocktails', '2022-07-29 00:00:01', '2022-07-29 16:00:01', '1 Market St, San Francisco, CA 94105', 'Class', 'https://cdn.pixabay.com/photo/2019/06/13/11/28/cocktail-4271392_960_720.jpg'
    ), (
      ${secondUserId},
      'Wine and Painting Class', 'Paint and drink wine with us', '2022-07-30 00:00:01', '2022-07-30 16:00:01', '333 Post St, San Francisco, CA 94108', 'Class', 'https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_960_720.jpg'
    ), (
      ${thirdUserId},
      'Chocolate Tasting', 'Taste different kinds of chocolate from around the world', '2022-12-31 00:00:01', '2022-07-31 16:00:01', 'Brooklyn Bridge, New York, NY 10038','Party', 'https://cdn.pixabay.com/photo/2016/03/24/15/53/chocolate-1277002_960_720.jpg'
    ), (
      ${thirdUserId},
      'Cooking Class', 'Learn how to cook a 3-course meal', '2022-08-01 00:00:01', '2022-08-01 16:00:01', '180 Montgomery St, San Francisco, CA 94104', 'Class', 'https://cdn.pixabay.com/photo/2018/01/16/20/07/roulades-3086743_960_720.jpg'
    ), (
      ${thirdUserId},
      'Gardening Class', 'Learn how to grow your own herbs and vegetables', '2022-08-02 00:00:01', '2022-08-02 16:00:01', ' 730 5th Ave, New York, NY 10019', 'Class', 'https://cdn.pixabay.com/photo/2017/05/09/13/31/spring-2298279_960_720.jpg'
    ), (
      ${thirdUserId},
      'Ice Cream Social', 'Make your own ice cream sundaes', '2022-07-30 00:00:01', '2022-07-30 16:00:01', '789 Broad St, New York, NY 10002', 'Intern', 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894_960_720.jpg'
    )
  `);

  const results = await db.query(`SELECT host_id FROM events ORDER BY host_id ASC`);

  const ids = results.rows.map((row) => row.id);
  return ids;
};

module.exports = {
  createListings,
};
