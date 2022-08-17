-- First I need users in a seed
-- 2nd, I need to make these conform to the new data form I need

INSERT INTO users (password, account_type, first_name, last_name, email, location, company, biography, image_url)
VALUES
('$2b$13$vZRTXDLeSWqBM4MuBAusjOLOdYnJ66pbW23bQGTVSPLW1XcnvTMiq','intern','Irem','Komurcu','i@sf.com','San Francisco', 'Salesforce', 'I love problems and solving puzzles, its how I derive my meaning in life!','https://iremkomurcu.com/img/profile.jpg'),
('$2b$13$vZRTXDLeSWqBM4MuBAusjOLOdYnJ66pbW23bQGTVSPLW1XcnvTMiq','business','Bret','Taylor','Bret@salesforce.com','San Francisco', 'Salesforce', 'I love empowering others through creative solutions and creating value and social change through my buisness.', 'https://techcrunch.com/wp-content/uploads/2021/11/bret-taylor-salesforce.jpg'),
('$2b$13$vZRTXDLeSWqBM4MuBAusjOLOdYnJ66pbW23bQGTVSPLW1XcnvTMiq','intern','Enrique','Rico','e@sf.com','New York', 'Microsoft', 'Hit me up if you are in New York! I love meeting new people and getting to know brilliant minds. Life is beautiful.', 'https://cdns-images.dzcdn.net/images/artist/7c0f867fb50b6c9302f991521e42e764/500x500.jpg'),
('$2b$13$vZRTXDLeSWqBM4MuBAusjOLOdYnJ66pbW23bQGTVSPLW1XcnvTMiq','business','David','Drummond','david@google.com','San Francisco', 'Google', 'I love meeting new people and getting to know brilliant minds. Life is beautiful.', 'https://techcrunch.com/wp-content/uploads/2020/01/Screen-Shot-2020-01-10-at-12.43.57-PM.png'),
('$2b$13$vZRTXDLeSWqBM4MuBAusjOLOdYnJ66pbW23bQGTVSPLW1XcnvTMiq','business','Greg','Joswiak','Greg@apple.com','New York', 'Apple', 'Always happy to expand my network, sell my product, and grow as an individual. ', 'https://www.apple.com/leadership/images/bio/greg-joswiak.png.og.jpg?1656572924894');


INSERT INTO events (host_id, title, description, start_date, end_date, address, event_category, image_url)
VALUES
(1, 'Spark Social Meetup', 'Join us for a fun time with food trucks, giant chess, giant jenga... giant stuff!', '2022-08-28 00:00:01', '2022-08-29 16:00:01', '415 Mission St, San Francisco, CA 94105', 'Intern Event', 'https://images.squarespace-cdn.com/content/v1/56b2d8fd2fe1319a9451a807/1503020991449-CTTTY5SRQGHSQ6ECLQ9B/DSC_1546.jpg'),
(2, 'Skyhigh Networking', 'A fun time, in El Techo, the premier San Francisco rooftop dining experience, expected interns from Salesforce, Microsoft, Google and more!', '2022-08-29 00:00:01', '2022-08-29 16:00:01', '1 Market St, San Francisco, CA 94105', 'Intern Networking', 'https://images.otstatic.com/prod/24063323/1/huge.jpg'),
(3, 'Tech Getty', 'Getty at Sergeys house for the weekend! This is an intern only event so proof will be asked at the door!', '2022-08-30 00:00:01', '2022-09-01 16:00:01', '333 Post St, San Francisco, CA 94108', 'Intern Networking', 'http://cdn.home-designing.com/wp-content/uploads/2016/03/amazing-cantilever-architecture-inspiration.jpg'),
(1, 'Product Launch', 'Interns welcome to the product launch of our newest dating app!', '2022-09-12 00:00:01', '2022-09-12 16:00:01', 'Brooklyn Bridge, New York, NY 10038','Intern-Welcome Product Launch', 'https://wp.salesforce.com/en-us/wp-content/uploads/sites/4/2022/08/homepage-cost-savings-fg.png?w=1024'),
(2, 'Speed Networking', 'Speed Network with FANG level interns and meet what the valleys youngest and brightest!', '2022-08-25 00:00:01', '2022-08-01 16:00:01', '180 Montgomery St, San Francisco, CA 94104', 'Intern Speed Networking', 'https://shusharya.com/wp-content/uploads/2015/06/AdobeStock_322044038.jpg'),
(3, 'Intern Alumni Panel', 'A superstar cast of interns from Salesforce, Amazon, Google and Meta will be giving advice in this unique intern event!', '2022-08-26 00:00:01', '2022-08-02 16:00:01', ' 730 5th Ave, New York, NY 10019', 'Guest Speakers', 'https://tophat.com/wp-content/uploads/Making-the-Most-of-Guest-Speakers-in-the-Classroom-2400x1200.jpg'),
(3, 'Intern TED Talk - Marc Benioff', 'Get your chance to hear advice from the CEO of the greatest CRM on the planet, and one of the largest cloud platforms ever built!', '2022-08-30 00:00:01', '2022-08-30 16:00:01', '789 Broad St, New York, NY 10002', 'Guest Speaker', 'https://www.crn.com/resources/026c-131671c280bb-fc5ed9bcab1e-1000/benioff-marc-dreamforce.jpg');


INSERT INTO reservations(user_id, event_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(1,3),
(2,3),
(3,1),
(1,4),
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

