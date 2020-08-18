const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const sendError = (res) =>
  res.status(400).json({ status: 'error', message: 'An error occured' });

const sendSuccess = (res, code, message) =>
  res.status(code).json({ status: 'success', message });

const getTeam = (req, res) => {
  const { teamId } = req.params;

  pool.query(
    'SELECT U.id, U.name FROM users AS U, team_members AS M WHERE U.id=M.user_id AND M.team_id=$1',
    [teamId],
    (error, results) => {
      if (error) {
        sendError(res);
        return;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getAllTeams = (req, res) => {
  pool.query('SELECT * FROM teams', (error, results) => {
    if (error) {
      sendError(res);
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
  const sendCreateTeamError = () => {
    res.status(400).json({
      status: 'error',
      message: 'An error occurred. Request requires JSON body { name: string }',
    });
  };

  if (!name) {
    sendCreateTeamError();
    return;
  }

  pool.query('INSERT INTO teams(name) VALUES ($1)', [name], (error) => {
    if (error) {
      sendCreateTeamError();
      return;
    }

    sendSuccess(res, 201, `Team created with name ${name}`);
  });
};

const removeMember = (req, res) => {
  const { teamId, userId } = req.params;

  pool.query(
    'DELETE FROM team_members WHERE team_id=$1 AND user_id=$2',
    [teamId, userId],
    (error) => {
      if (error) {
        sendError(res);
        return;
      }
      sendSuccess(
        res,
        200,
        `Member with id ${userId} delete from team with id ${teamId}`
      );
    }
  );
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
      sendSuccess(res, 200, `Team deleted with id ${teamId}`);
    });
  }

  if (hadError) {
    sendError(res);
  }
};

// GET
router.get('/:teamId', getTeam);
router.get('/', getAllTeams);

// POST
router.post('/:id', addMember);
router.post('/', createTeam);

// DELETE
router.delete('/:teamId/:userId', removeMember);
router.delete('/:teamId', removeTeam);

module.exports = router;
