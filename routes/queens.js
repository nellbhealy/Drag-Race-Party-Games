const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const getQueen = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const getAllQueens = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const createQueen = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const updateQueen = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

// GET
router.get('/:id', getQueen);
router.get('/', getAllQueens);

// POST
router.post('/', createQueen);

// PUT
router.put('/:id', updateQueen);

module.exports = router;
