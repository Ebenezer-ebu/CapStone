 `CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        firstName VARCHAR(80),
        lastName VARCHAR(80),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        gender VARCHAR(80),
        jobRole VARCHAR(255),
        department VARCHAR(255),
        address VARCHAR(255),
        created_date TIMESTAMP,
        isAdmin BOOLEAN NOT NULL
    )`;

`CREATE TABLE IF NOT EXISTS article (
      articleid UUID PRIMARY KEY,
      title VARCHAR(255),
      article VARCHAR(255),
      created_date TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
    )`;
`CREATE TABLE IF NOT EXISTS gif (
        gifid UUID PRIMARY KEY,
        title VARCHAR(55),
        image_URL VARCHAR(255),
        created_date TIMESTAMP,
        FOREIGN KEY (gif_id) REFERENCES users (id) ON DELETE CASCADE
    )`;
`CREATE TABLE IF NOT EXISTS comment (
        commid UUID PRIMARY KEY,
        FOREIGN KEY (comment_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (commentgif_id) REFERENCES gif (gifid) ON DELETE CASCADE,
        FOREIGN KEY (commentAD_id) REFERENCES article (articleid) ON DELETE CASCADE,
        gifBody TEXT(255),
        articleBody TEXT(255),
        created_date TIMESTAMP,
        modified_date TIMESTAMP
    )`;