CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    password        TEXT NOT NULL,
    account_type    TEXT NOT NULL,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    location        TEXT NOT NULL,
    company         TEXT NOT NULL,
    bio             TEXT,
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
    start_date      TIMESTAMP NOT NULL,
    end_date        TIMESTAMP NOT NULL,    
    event_category  TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comment_section(
    comment_section_id        SERIAL PRIMARY KEY,
    event_id                   INTEGER NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE 
);

CREATE TABLE comment(
    comment_id      SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL,
    comment_section_id INTEGER NOT NULL,
    comment_text    TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_section_id) REFERENCES comment_section(comment_section_id) ON DELETE CASCADE
);
