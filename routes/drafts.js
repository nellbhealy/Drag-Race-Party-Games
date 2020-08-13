const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const getDraft = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const getSeasonDrafts = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const getAllDrafts = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const createEntry = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const updateEntry = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

// GET
router.get('/:seasonId/:userId', getDraft);
router.get('/:seasonId', getSeasonDrafts);
router.get('/', getAllDrafts);

// POST
router.post('/:userId/:seasonId/:contestantId', createEntry);

// PUT
router.put('/:userId/:seasonId/contestantId', updateEntry);

module.exports = router;
