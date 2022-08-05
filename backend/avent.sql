\echo 'Delete and recreate avent db?'
\prompt 'Return for yes or control-c to cancel > ' answer

DROP DATABASE avent;
CREATE DATABASE avent;
\connect avent;

\i avent-schema.sql
\i avent-seed.sql

\echo 'Delete and recreate avent_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE avent_test;
CREATE DATABASE avent_test;
\connect avent_test

\i avent-schema.sql
\i avent-seed.sql