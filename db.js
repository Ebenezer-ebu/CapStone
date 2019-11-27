const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
  
  pool.on('connect', () => {
    console.log('connected to the db');
  });

 /**
 * Create Users Table 
 */
const createUsersTable = () => {
    const queryText =
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

    pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
* Create Articles Table 
*/

const createArticleTable = () => {
    var queryText = 
    `CREATE TABLE IF NOT EXISTS article (
      articleid UUID PRIMARY KEY,
      owner_id UUID,
      title VARCHAR(255),
      article VARCHAR(255),
      created_date TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
    )`;

    pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Create Gif Table
 */

const createGifTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS gif (
        gifid UUID PRIMARY KEY,
        title VARCHAR(55),
        gif_id UUID,
        image_URL VARCHAR(255),
        created_date TIMESTAMP,
        FOREIGN KEY (gif_id) REFERENCES users (id) ON DELETE CASCADE
    )`;
    pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Create Comment Table
 */

const createCommentTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS comment (
        commid UUID PRIMARY KEY,
        comment_id UUID,
        commentgif_id UUID,
        commentAD_id UUID,
        FOREIGN KEY (comment_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (commentgif_id) REFERENCES gif (gifid) ON DELETE CASCADE,
        FOREIGN KEY (commentAD_id) REFERENCES article (articleid) ON DELETE CASCADE,
        gifBody VARCHAR(255),
        articleBody VARCHAR(255),
        created_date TIMESTAMP,
        modified_date TIMESTAMP
    )`;
    pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
 /**
 * Drop Users Table
 */
const dropUsersTable = () => {
    const queryText = 'DROP TABLE IF EXISTS users returning *';
    pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}


/**
 * Drop Articles Table
 */
const dropArticleTable = () => {
    const queryText = 'DROP TABLE IF EXISTS article returning *';
    pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Gif Table
 */
const dropGifTable = () => {
    const queryText = 'DROP TABLE IF EXISTS gif returning *';
    pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
/**
 * Drop Articles Table
 */
const dropCommentTable = () => {
    const queryText = 'DROP TABLE IF EXISTS comment returning *';
    pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
/**
 * Create All Tables
 */
const createAllTables = () => {
    createUsersTable();
    createArticleTable();
    createCommentTable();
    createGifTable();
}

/**
 * Drop All Tables
 */
const dropAllTables = () => {
    dropUsersTable();
    dropArticleTable();
    dropCommentTable();
    dropGifTable();
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });

  module.exports = {
    createUsersTable,
    createArticleTable,
    createCommentTable,
    createGifTable,
    createAllTables,
    dropUsersTable,
    dropArticleTable,
    dropCommentTable,
    dropGifTable,
    dropAllTables 
  };

  require('make-runnable');