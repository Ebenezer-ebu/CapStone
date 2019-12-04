import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './Helpers';

const User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   */
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const istName = req.body.firstName;
    const endName = req.body.lastName;
    const sex = req.body.gender;
    const work = req.body.jobRole;
    const dp = req.body.department
    const add = req.body.address

    const createQuery = `INSERT INTO
      users(id, firstName, lastName, email, password, gender, jobRole, department, address, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      returning *`;
    const values = [uuidv4(), istName, endName, req.body.email, hashPassword, sex, work,dp, add, moment(new Date()), moment(new Date())
    ];

    try {
        const { rows } = await db.query(createQuery, values);
        const userId = rows[0].id;
        const token = Helper.generateToken(rows[0].id);
        
        return res.status(201).send({ 'message': 'User account successfully created', token, userId });
      } catch(error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
        }
        return res.status(400).send(error);
      }
    },

    /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      const userId = rows[0].id
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({ token, userId });
    } catch(error) {
      return res.status(400).send(error)
    }
  },

  /**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}
export default User;