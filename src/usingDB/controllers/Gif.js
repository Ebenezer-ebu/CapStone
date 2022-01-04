import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Gif = {
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
         const values = [
           uuidv4(),
           req.body.title,
           req.body.image_URL,
           moment(new Date()),
           req.user.id,
         ];

         try {
           const { rows } = await db.query(createQuery, values);
           return res.status(201).send(rows[0]);
         } catch (error) {
           return res.status(400).send(error);
         }
    }
}

    