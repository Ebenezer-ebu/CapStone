import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Comments = {
    /**
     * Create An Comment
     * @param {object} req 
     * @param {object} res
     * @returns {object} comment object 
     */
    async create(req, res) {
        const createQuery = `ALTER TABLE article ADD (comments, createdON) VALUES= ($1, $2) WHERE articleid = $3 returning *`;
        const values = [req.body.comments, moment(new Date())];
        try {
            const { rows } = await db.query(createQuery);
            return res.status(201).send(rows[0]);
          } catch(error) {
            return res.status(400).send(error);
          }
        },

    }
