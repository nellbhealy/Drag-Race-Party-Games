const express = require('express');
const router = express.Router();
const { pool } = require('../config');

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

const addUser = (req, res) => {
  const { name, email, private } = req.body;

  pool.query(
    'INSERT INTO users (name, email, private) VALUES ($1, $2, $3)',
    [name, email, private],
    (error) => {
      if (error) {
        console.log(error);
        res.status(404).json({ status: 'error', message: 'User not added' });
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
router.get('/:id', getUser);
router.get('/', getUsers);

// POST
router.post('/', addUser);

// DELETE
router.delete('/:id', deleteUser);

module.exports = router;
