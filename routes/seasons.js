const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const seasonExists = (number, show) => {
  pool.query('SELECT * FROM seasons WHERE num=$1 AND series=$2', [number, show], (error, results) => {
    return !error && results.rows.length;
  });
};

const getContestant = (req, res) => {
  const seasonId = req.params.seasonId;
  const queenId = req.params.queenId;

  pool.query('SELECT * FROM contestants WHERE season_id=$1 AND queen_id=$2', [seasonId, queenId], (error, results) => {
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

const getSeason = (req, res) => {
  const id = req.params.id;
  let contestants = [];

  pool.query('SELECT * FROM contestants WHERE season_id=$1', [id], (error, results) => {
    if (error) {
      res.status(400).json({ status: 'error', message: ERROR });
      return;
    }
    contestants = results.rows;
  });

  pool.query('SELECT * FROM seasons WHERE id=$1', [id], (error, results) => {
    if (error) {
      res.status(400).json({ status: 'error', message: ERROR });
      return;
    }
    if (!results.rows.length) {
      res.status(400).json({
        status: 'error',
        message: `Season with id ${id} does not exist`,
      });
      return;
    }
    res.status(200).json({ ...results.rows[0], contestants });
  });
};

const getAllSeasons = (req, res) => {
  pool.query('SELECT * FROM seasons', (error, results) => {
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

const createContestant = (req, res) => {
  const seasonId = req.params.seasonId;
  const queenId = req.params.queenId;
  const { placement, congeniality } = res.body ? res.body : { placement: -1, congeniality: false };

  pool.query('INSERT INTO contestants(season_id, queen_id, placement, congeniality) VALUES ($1, $2, $3, $4)', [seasonId, queenId, placement, congeniality], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        status: 'error',
        message: 'Requires (optional) JSON body { "placement": number, "congeniality": boolean }',
      });
      return;
    }

    res.status(201).json({ status: 'success', message: 'Contestant created.' });
  });
};

const createSeason = (req, res) => {
  const { number, show } = req.body;

  if (!seasonExists(number, show)) {
    res.status(400).json({
      status: 'error',
      message: `Show ${show} season ${number} already exists`,
    });
    return;
  }

  pool.query('INSERT INTO seasons(num, series) VALUES ($1, $2)', [number, show], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        status: 'error',
        message: 'Requires JSON body { "number": number, "show": string }',
      });
      return;
    }

    res.status(201).json({ status: 'success', message: 'Season created.' });
  });
};

const updateContestant = (req, res) => {
  const seasonId = req.params.seasonId;
  const queenId = req.params.queenId;
  const { placement, congeniality } = res.body;

  pool.query(
    'UPDATE contestants SET placement=$3, congeniality=$4 WHERE season_id=$1 AND queen_id=$2 RETURNING *',
    [seasonId, queenId, placement, congeniality],
    (error, results) => {
      if (error) {
        res.status(400).json({
          status: 'error',
          message: 'Requires JSON body { "placement": number, "congeniality": boolean }',
        });
        return;
      }
      res.status(200).json(results.rows);
    }
  );
};

// GET
router.get('/:seasonId/:queenId', getContestant);
router.get('/:id', getSeason);
router.get('/', getAllSeasons);

// POST
router.post('/:seasonId/:queenId', createContestant);
router.post('/', createSeason);

// PUT
router.put('/:seasonId/:queenId', updateContestant);

module.exports = router;
