-- First I need users in a seed
-- 2nd, I need to make these conform to the new data form I need

INSERT INTO users (password, account_type, first_name, last_name, email, location)
VALUES
('123','intern','Irem','Komurcu','i@sf.com','San Francisco'),
('123','business','Sales','Force','marc@sf.com','San Francisco'),
('123','intern','Enrique','Rico','e@sf.com','New York');

INSERT INTO events (host_id, title, description, start_date, end_date, address, event_category)
VALUES
(1, 'Wine Tasting', 'Join us for a wine tasting event with cheese pairings', '2022-07-28 00:00:01', '2022-07-28 16:00:01', '415 Mission St, San Francisco, CA 94105', 'Intern'),
(2, 'Cocktail Making Class', 'Learn how to make 3 different cocktails', '2022-07-29 00:00:01', '2022-07-29 16:00:01', '1 Market St, San Francisco, CA 94105', 'Class'),
(3, 'Wine and Painting Class', 'Paint and drink wine with us', '2022-07-30 00:00:01', '2022-07-30 16:00:01', '333 Post St, San Francisco, CA 94108', 'Class'),
(1, 'Chocolate Tasting', 'Taste different kinds of chocolate from around the world', '2022-12-31 00:00:01', '2022-07-31 16:00:01', 'Brooklyn Bridge, New York, NY 10038','Party'),
(2, 'Cooking Class', 'Learn how to cook a 3-course meal', '2022-08-01 00:00:01', '2022-08-01 16:00:01', '180 Montgomery St, San Francisco, CA 94104', 'Class'),
(3, 'Gardening Class', 'Learn how to grow your own herbs and vegetables', '2022-08-02 00:00:01', '2022-08-02 16:00:01', ' 730 5th Ave, New York, NY 10019', 'Class'),
(3, 'Ice Cream Social', 'Make your own ice cream sundaes', '2022-07-30 00:00:01', '2022-07-30 16:00:01', '789 Broad St, New York, NY 10002', 'Intern');