const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.log(error);
      response.status(404).json({ status: 'error', message: 'Cannot get' });
      return;
    }
    response.status(200).json(results.rows);
  });
};

const addUser = (request, response) => {
  const { name, email, private } = request.body;

  pool.query(
    'INSERT INTO users (name, email, private) VALUES ($1, $2, $3)',
    [name, email, private],
    (error) => {
      if (error) {
        console.log(error);
        response
          .status(404)
          .json({ status: 'error', message: 'User not added' });
        return;
      }
      response.status(201).json({ status: 'success', message: 'User added.' });
    }
  );
};

const deleteUser = (request, response) => {
  const id = request.params.id;

  pool.query('DELETE FROM users WHERE ID=$1', [id], (error) => {
    if (error) {
      console.log(error);
      response
        .status(400)
        .json({ status: 'error', message: 'User not deleted.' });
      return;
    }
    response.status(201).json({ status: 'success', message: 'User deleted.' });
  });
};

router.get('/', getUsers);
router.post('/', addUser);
router.delete('/:id', deleteUser);

module.exports = router;
