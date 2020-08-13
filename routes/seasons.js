const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const getContestant = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const getSeason = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const getAllSeasons = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const createContestant = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const createSeason = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const updateContestant = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

// GET
router.get('/:seasonID/:queenID', getContestant);
router.get('/:id', getSeason);
router.get('/', getAllSeasons);

// POST
router.post('/:seasonID/:queenID', createContestant);
router.post('/', createSeason);

// PUT
router.put('/:seasonID/:queenID', updateContestant);

module.exports = router;
