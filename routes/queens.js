const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const ERROR = 'Something went wrong, sorry bout it!';

const getQueen = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM queens WHERE id=$1', [id], (error, results) => {
    if (error) {
      res.status(400).json({ status: 'error', message: ERROR });
      return;
    }
    if (!results.rows.length) {
      res.status(400).json({
        status: 'error',
        message: `Queen with id ${id} does not exist`,
      });
      return;
    }
    res.status(200).json(results.rows);
  });
};

const getAllQueens = (req, res) => {
  pool.query('SELECT * FROM queens', (error, results) => {
    if (error) {
      res.status(400).json({
        status: 'error',
        message: ERROR,
      });
      return;
    }
    res.status(200).json(results.rows);
  });
};

const createQueen = (req, res) => {
  const { name } = req.body;
  pool.query('INSERT INTO queens(name) VALUES ($1)', [name], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        status: 'error',
        message: 'Requires JSON body { "name": string }',
      });
      return;
    }
    res.status(201).json({ status: 'success', message: 'Queen created.' });
  });
};

const updateQueen = (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  pool.query(
    'UPDATE queens SET name=$1 WHERE id=$2 RETURNING *',
    [name, id],
    (error, results) => {
      if (error) {
        res.status(400).json({
          status: 'error',
          message: 'Requires JSON body { "name": string }',
        });
        return;
      }
      res.status(200).json(results.rows);
    }
  );
};

// GET
router.get('/:id', getQueen);
router.get('/', getAllQueens);

// POST
router.post('/', createQueen);

// PUT
router.put('/:id', updateQueen);

module.exports = router;
