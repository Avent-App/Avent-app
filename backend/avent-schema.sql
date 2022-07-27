CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    password        TEXT NOT NULL,
    account_type    TEXT NOT NULL,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    location        TEXT NOT NULL,
    verified        BOOLEAN,
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE events(
    event_id        SERIAL PRIMARY KEY,
    host_id         INTEGER NOT NULL,
    title           TEXT NOT NULL,
    description     TEXT NOT NULL,
    image_url       TEXT,
    address         TEXT NOT NULL,
    start_date      TIMESTAMP NOT NULL DEFAULT NOW(),
    end_date        TIMESTAMP NOT NULL,    
    created_at      TIMESTAMP NOT NULL,
    FOREIGN KEY (host_id) REFERENCES users (id) ON DELETE CASCADE
);
