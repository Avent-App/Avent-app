-- First I need users in a seed
-- 2nd, I need to make these conform to the new data form I need

INSERT INTO users (password, account_type, first_name, last_name, email, location, company, biography)
VALUES
('$2b$13$vZRTXDLeSWqBM4MuBAusjOLOdYnJ66pbW23bQGTVSPLW1XcnvTMiq','intern','Irem','Komurcu','i@sf.com','San Francisco, CA', 'Salesforce', 'I love problems and solving puzzles, its how I derive my meaning in life!'),
('$2b$13$vZRTXDLeSWqBM4MuBAusjOLOdYnJ66pbW23bQGTVSPLW1XcnvTMiq','business','David','Barcenas','marc@sf.com','San Francisco, CA', 'Apple', 'I love empowering others through creative solutions and creating value and social change through my buisness.'),
('$2b$13$vZRTXDLeSWqBM4MuBAusjOLOdYnJ66pbW23bQGTVSPLW1XcnvTMiq','intern','Enrique','Rico','e@sf.com','New York, NY', 'Google', 'Hit me up if you are in New York! I love meeting new people and getting to know brilliant minds. Life is beautiful.');

INSERT INTO events (host_id, title, description, start_date, end_date, address, event_category, image_url)
VALUES
(1, 'Wine Tasting', 'Join us for a wine tasting event with cheese pairings', '2022-08-28 00:00:01', '2022-08-29 16:00:01', '415 Mission St, San Francisco, CA 94105', 'Intern', 'https://cdn.pixabay.com/photo/2017/01/04/13/57/wine-1952051_960_720.jpg'),
(2, 'Cocktail Making Class', 'Learn how to make 3 different cocktails', '2022-08-29 00:00:01', '2022-08-29 16:00:01', '1 Market St, San Francisco, CA 94105', 'Class', 'https://cdn.pixabay.com/photo/2019/06/13/11/28/cocktail-4271392_960_720.jpg'),
(3, 'Wine and Painting Class', 'Paint and drink wine with us', '2022-08-30 00:00:01', '2022-09-01 16:00:01', '333 Post St, San Francisco, CA 94108', 'Class', 'https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_960_720.jpg'),
(1, 'Chocolate Tasting', 'Taste different kinds of chocolate from around the world', '2022-09-12 00:00:01', '2022-09-12 16:00:01', 'Brooklyn Bridge, New York, NY 10038','Party', 'https://cdn.pixabay.com/photo/2016/03/24/15/53/chocolate-1277002_960_720.jpg'),
(2, 'Cooking Class', 'Learn how to cook a 3-course meal', '2022-08-01 00:00:01', '2022-08-01 16:00:01', '180 Montgomery St, San Francisco, CA 94104', 'Class', 'https://cdn.pixabay.com/photo/2018/01/16/20/07/roulades-3086743_960_720.jpg'),
(3, 'Gardening Class', 'Learn how to grow your own herbs and vegetables', '2022-08-02 00:00:01', '2022-08-02 16:00:01', ' 730 5th Ave, New York, NY 10019', 'Class', 'https://cdn.pixabay.com/photo/2017/05/09/13/31/spring-2298279_960_720.jpg'),
(3, 'Ice Cream Social', 'Make your own ice cream sundaes', '2022-08-30 00:00:01', '2022-08-30 16:00:01', '789 Broad St, New York, NY 10002', 'Intern', 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894_960_720.jpg');


INSERT INTO reservations(user_id, event_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(1,3),
(2,3),
(3,1),
(1,4),
(1,5),
(2,6),
(3,1),
(3,5),
(1,5),
(2,1);

INSERT INTO comment_section (event_id)
VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7);

INSERT INTO comment (user_id, comment_section_id, comment_text)
VALUES
(1, 1, 'Excited to have you all come by!'),
(2, 1, 'Will there be some cheese and bread as well? Asking for a friend!'),
(3, 1, 'OMG I am so excited, its going to be AMAZING!!!!!!'),
(1, 2, 'Excited to have you all come by!'),
(2, 3, 'Will there be some cheese and bread as well? Asking for a friend!'),
(3, 4, 'OMG I am so excited, its going to be AMAZING!!!!!!'),
(1, 5, 'Excited to have you all come by!'),
(2, 6, 'Will there be some cheese and bread as well? Asking for a friend!'),
(3, 7, 'OMG I am so excited, its going to be AMAZING!!!!!!');

