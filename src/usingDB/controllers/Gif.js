import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import cloudinary from '../../cloudinaryConfig'
import { constants } from 'crypto';

const Gif = {
/**Create A Gif
 * @param {object} req 
 * @param {object} res
 * @returns {object} gif object 
 */
  async create(req, res) {
    const file = result.url;
    const name = result.public_id
    const createQuery = `INSERT INTO
    gif (gifid, title, image_URL, created_date, gif_id)
    VALUES($1, $2, $3, $4, $5)
    returning *`;
    const values = [
        uuidv4(),
        name,
        file,
        moment(new Date()),
        req.users.id,
      ];

      try {
        const { rows } = await db.query(createQuery, values);
        return res.status(201).send(rows[0]);
      } catch(error) {
        return res.status(400).send(error);
      }
    },
  /**
     * Get A Gif
     * @param {object} req 
     * @param {object} res 
     * @returns {object} gif object 
     */
    async getOne(req, res) {
      const text = 'SELECT * FROM gif WHERE gifid = $1 AND gif_id = $2';
      try {
        const { rows } = await db.query(text, [req.params.gifid, req.user.id]);
        if (!rows[0]) {
          return res.status(404).send({'message': 'image not found'});
        }
        return res.status(200).send(rows[0]);
      } catch(error) {
        return res.status(400).send(error)
      }
    },
  /**
     * Delete A Gif
     * @param {object} req 
     * @param {object} res 
     * @returns {void} return status code 204 
     */
    async delete(req, res) {
      const deleteQuery = 'DELETE FROM gif WHERE gifid=$1 AND gif_id = $2 returning *';
      try {
        const { rows } = await db.query(deleteQuery, [req.params.articleid, req.user.id]);
        if(!rows[0]) {
          return res.status(404).send({'message': 'article not found'});
        }
        return res.status(204).send({ 'message': 'deleted' });
      } catch(error) {
        return res.status(400).send(error);
      }
    }
  }
  export default Gif;