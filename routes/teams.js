const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const sendError = () =>
  res.status(400).json({ status: 'error', message: 'An error occured' });

const getTeam = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const getAllTeams = (req, res) => {
  pool.query('SELECT * FROM teams', (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ status: 'error', message: 'Something went wrong' });
    }
    res.status(200).json(results.rows);
  });
};

const addMember = (req, res) => {
  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const createTeam = (req, res) => {
  const { name } = req.body;
  const sendError = () => {
    res.status(400).json({
      status: 'error',
      message: 'An error occurred. Request requires JSON body { name: string }',
    });
  };

  if (!name) {
    sendError();
    return;
  }

  pool.query('INSERT INTO teams(name) VALUES ($1)', [name], (error) => {
    if (error) {
      sendError();
      return;
    }
    res
      .status(201)
      .json({ status: 'success', message: `Team created with name ${name}` });
  });
};

const removeMember = (req, res) => {
  const { teamId, userId } = req.params;

  res
    .status(400)
    .json({ status: 'error', message: 'Route not yet implemented.' });
};

const removeTeam = (req, res) => {
  const { teamId } = req.params;

  let hadError = false;

  pool.query('DELETE FROM team_members WHERE team_id=$1', [teamId], (error) => {
    if (error) {
      hadError = true;
    }
  });

  if (!hadError) {
    console.log(hadError);
    pool.query('DELETE FROM teams WHERE id=$1', [teamId], (error) => {
      if (error) {
        hadError = true;
        return;
      }
      res.status(200).json({ status: 'success', message: 'Team deleted' });
    });
  }

  if (hadError) {
    sendError();
  }
};

// GET
router.get('/:id', getTeam);
router.get('/', getAllTeams);

// POST
router.post('/:id', addMember);
router.post('/', createTeam);

// DELETE
router.delete('/:teamId/:userId', removeMember);
router.delete('/:teamId', removeTeam);

module.exports = router;
