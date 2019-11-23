CREATE TABLE users (
    id UUID PRIMARY KEY,
    firstName VARCHAR(80),
    lastName VARCHAR(80),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    gender VARCHAR(80),
    jobRole VARCHAR(255),
    department VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE articles (
    articleid UUID PRIMARY KEY,
    token VARCHAR(),
    title VARCHAR(),
    article VARCHAR()
);

CREATE TABLE comment (
    token VARCHAR(),
    comment VARCHAR
)