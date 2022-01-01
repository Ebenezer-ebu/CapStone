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
        created_date TIMESTAMP
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
    const queryText = 
    `CREATE TABLE IF NOT EXISTS article (
    articleid UUID PRIMARY KEY,
    token VARCHAR(),
    title VARCHAR(),
    article VARCHAR(),
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
    })
}

/**
 * Create Gif Table
 */

const createGifTable = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS gif (
        gifid UUID PRIMARY KEY,
        title VARCHAR(),
        image_URL VARCHAR(),
        created_date TIMESTAMP,
        FOREIGN KEY (gif_id) REFERENCES users (id) ON DELETE CASCADE
    )`
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
    })
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
    })
}

/**
 * Create All Tables
 */
const createAllTables = () => {
    createUsersTable();
    createArticleTable();
}

/**
 * Drop All Tables
 */
const dropAllTables = () => {
    dropUsersTable();
    dropArticleTable();
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });

  module.export = {
    createUsersTable,
    createArticleTable,
    dropUsersTable,
    dropArticleTable,
  }

  require('make-runnable');