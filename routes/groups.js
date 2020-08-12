const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const createGroup = (req, res) => {
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

const getGroup = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const getAllGroups = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

router.get('/:id', getGroup);
router.post('/:id', addMember);
router.delete('/:id', removeMember);
router.get('/', getAllGroups);
router.post('/', createGroup);

module.exports = router;
