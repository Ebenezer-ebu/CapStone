import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

/**Create A Gif
 * @param {object} req 
 * @param {object} res
 * @returns {object} gif object 
 */
async create(req, res) {
    const createQuery = `INSERT INTO
    gif (gifid, title, image_URL, created_date, gif_id)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
    