const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const createTeam = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const addMember = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const removeMember = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const getTeam = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const getAllTeams = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

// GET
router.get('/:id', getTeam);
router.get('/', getAllTeams);

// POST
router.post('/:id', addMember);
router.post('/', createTeam);

// DELETE
router.delete('/:id', removeMember);

module.exports = router;
