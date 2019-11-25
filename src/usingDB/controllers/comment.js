import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Comments = {
    /**
     * Create An Comment on an article and Gif
     * @param {object} req 
     * @param {object} res
     * @returns {object} comment object 
     */
    async createGif(req, res) {
        const createQuery = `INSERT INTO TABLE comment (commid, comment_id, commentgif_id, 
          gifBody, created_date, modified_date)VALUES= ($1, $2, $3, $4, $5, $6) WHERE gifid = $7 returning *`;
        const values =
         [uuidv4, 
          req.users.id, 
          req.gif.gifid, 
          req.body.comments,  
          moment(new Date()), 
          moment(new Date())];
        try {
            const { rows } = await db.query(createQuery);
            return res.status(201).send(rows[0]);
          } catch(error) {
            return res.status(400).send(error);
          }
        },

    async createArt(req, res) {
        const createQuery = `INSERT INTO TABLE comment (commid, comment_id, commentAD_id, 
         articleBody, created_date, modified_date)VALUES= ($1, $2, $3, $4, $5, $6) WHERE articleid = $7 returning *`;
        const values =
          [uuidv4, 
           req.users.id, 
           req.gif.articleid, 
           req.body.comments,  
           moment(new Date()), 
           moment(new Date())];
        try {
            const { rows } = await db.query(createQuery);
            return res.status(201).send(rows[0]);
          } catch(error) {
            return res.status(400).send(error);
          }
        },    

  }
export default Comments;