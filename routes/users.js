const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const getUser = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM users WHERE ID=$1', [id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).json({
        status: 'error',
        message: `User with id ${id} does not exist`,
      });
      return;
    }
    res.status(200).json(results.rows);
  });
};

const getUserByEmail = (req, res) => {
  const email = req.params.email;
  pool.query('SELECT * FROM users WHERE email=$1', [email], (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).json({
        status: 'error',
        message: `User with email ${email} does not exist`,
      });
      return;
    }
    res.status(200).json(results.rows);
  });
};

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).json({ status: 'error', message: 'Cannot get' });
      return;
    }
    res.status(200).json(results.rows);
  });
};

const createUser = async (req, res) => {
  const { token, private } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  const { name, email } = ticket.getPayload();

  pool.query(
    'INSERT INTO users (name, email, private) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
    [name, email, private],
    (error) => {
      if (error) {
        console.log(error);
        res.status(404).json({ status: 'error', message: 'User not added.' });
        return;
      }
      res.status(201).json({ status: 'success', message: 'User added.' });
    }
  );
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  pool.query('DELETE FROM users WHERE ID=$1', [id], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ status: 'error', message: 'User not deleted.' });
      return;
    }
    res.status(201).json({ status: 'success', message: 'User deleted.' });
  });
};

// GET
// router.get('/:id', getUser);
router.get('/:email', getUserByEmail);
router.get('/', getUsers);

// POST
router.post('/', createUser);

// DELETE
router.delete('/:id', deleteUser);

module.exports = router;
