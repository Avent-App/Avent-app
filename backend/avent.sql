\echo 'Delete and recreate avent db?'
\prompt 'Return for yes or control-c to cancel > ' answer

DROP DATABASE avent;
CREATE DATABASE avent;
\connect avent;

\i avent-schema.sql