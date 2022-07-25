CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    username        TEXT NOT NULL,
    password        TEXT NOT NULL,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    location        TEXT NOT NULL,
    verified        BOOLEAN,
    updated_at      TIMESTAMP DEFAULT NOW()
);

