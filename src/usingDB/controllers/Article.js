import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Article = {
    /**
     * Create An Article
     * @param {object} req 
     * @param {object} res
     * @returns {object} article object 
     */
    async create(req, res) {
      const createQuery = `INSERT INTO
        article (articleid, title, article, created_date, owner_id)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
      const values = [
        uuidv4(),
        req.body.title,
        req.body.article,
        moment(new Date()),
        req.user.id,
      ];
  
      try {
        const { rows } = await db.query(createQuery, values);
        return res.status(201).send(rows[0]);
      } catch(error) {
        return res.status(400).send(error);
      }
    },
    /**
     * Get All Articles
     * @param {object} req 
     * @param {object} res 
     * @returns {object} articles array
     */
    async getAll(req, res) {
      const findAllQuery = 'SELECT * FROM article where owner_id = $1';
      try {
        const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
        return res.status(200).send({ rows, rowCount });
      } catch(error) {
        return res.status(400).send(error);
      }
    },
    /**
     * Get An Article
     * @param {object} req 
     * @param {object} res
     * @returns {object} article object
     */
    async getOne(req, res) {
      const text = 'SELECT * FROM article WHERE articleid = $1 AND owner_id = $2';
      try {
        const { rows } = await db.query(text, [req.params.articleid, req.user.id]);
        if (!rows[0]) {
          return res.status(404).send({'message': 'article not found'});
        }
        return res.status(200).send(rows[0]);
      } catch(error) {
        return res.status(400).send(error)
      }
    },
    /**
     * Update A Article
     * @param {object} req 
     * @param {object} res 
     * @returns {object} updated Article
     */
    async update(req, res) {
      const findOneQuery = 'SELECT * FROM article WHERE articleid=$1 AND owner_id = $2';
      const updateOneQuery =`UPDATE article
        SET token=$1,title=$2,article=$3
        WHERE articleid=$4 AND owner_id = $5 returning *`;
      try {
        const { rows } = await db.query(findOneQuery, [req.params.articleid, req.user.id]);
        if(!rows[0]) {
          return res.status(404).send({'message': 'article not found'});
        }
        const values = [
          req.body.token || rows[0].token,
          req.body.title || rows[0].title,
          req.body.article || rows[0].article,
          req.params.articleid,
          req.user.id
        ];
        const response = await db.query(updateOneQuery, values);
        return res.status(200).send(response.rows[0]);
      } catch(err) {
        return res.status(400).send(err);
      }
    },
    /**
     * Delete A Article
     * @param {object} req 
     * @param {object} res 
     * @returns {void} return status code 204 
     */
    async delete(req, res) {
      const deleteQuery = 'DELETE FROM article WHERE articleid=$1 AND owner_id = $2 returning *';
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
  
  export default Article;