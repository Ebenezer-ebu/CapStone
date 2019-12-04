import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Feed = {
    /**
     * get feeds
     * @param {object} req 
     * @param {object} res
     * @returns {object} feed object 
*/
async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM article UNION ALL SELECT * FROM gif ORDER BY created_date DESC';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
}

export default Feed; 