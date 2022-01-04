CREATE TABLE users (
    id UUID NOT NULL PRIMARY KEY,
    firstName VARCHAR(80),
    lastName VARCHAR(80),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(80),
    jobRole VARCHAR(255),
    department VARCHAR(255),
    address VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE articles (
    articleid UUID NOT NULL PRIMARY KEY,
    token VARCHAR(),
    title VARCHAR(),
    article VARCHAR(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE comment (
    commentid UUID PRIMARY KEY,
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (comment_id) REFERENCES users (id) ON DELETE CASCADE
)

CREATE TABLE gif (
    gifid UUID PRIMARY KEY,
    title VARCHAR(),
    image_URL VARCHAR(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (gif_id) REFERENCES users (id) ON DELETE CASCADE
)