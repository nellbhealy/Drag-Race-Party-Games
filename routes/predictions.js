const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const getPredictions = (req, res) => {
  const seasonId = parseInt(req.params.seasonId);
  const userId = parseInt(req.params.userId);

  if (!isNaN(seasonId) || !isNaN(userId)) {
    pool.query('SELECT * FROM drafts WHERE season_id = $1 AND user_id = $2', [seasonId, userId], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json(results.rows);
      }
    });
  } else {
    res.status(400).send("Error: Parameter id is not a number for user and/or season");
  }
};

const getUserPredictions = (req, res) => {
  const userId = parseInt(req.params.userId);

  if (!isNaN(userId)) {
    pool.query('SELECT * FROM drafts WHERE user_id = $1', [userId], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json(results.rows);
      }
    });
  } else {
    res.status(400).send("Error: Parameter id is not a number");
  }
};

const getSeasonPredictions = (req, res) => {
  const seasonId = parseInt(req.params.seasonId);

  if (!isNaN(seasonId)) {
    pool.query('SELECT * FROM drafts WHERE season_id = $1', [seasonId], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json(results.rows);
      }
    });
  } else {
    res.status(400).send("Error: Parameter id is not a number");
  }
};

const getAllPredictions = (req, res) => {
  pool.query('SELECT * FROM drafts', (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const createPrediction = (req, res) => {
  const seasonId = parseInt(req.params.seasonId);
  const userId = parseInt(req.params.userId);

  if (!(isNaN(seasonId) || isNaN(userId))) {
    for (const entry of req.body.entries) {
      const { contestantId, placement, congeniality } = entry;
  
      if (contestantId != null && placement != null && congeniality != null) {
          if (!(isNaN(contestantId) || isNaN(placement)) && typeof congeniality === "boolean") {
              pool.query(
                'INSERT INTO drafts (season_id, user_id, contestant_id, placement, congeniality) VALUES ($1, $2, $3, $4, $5)',
                [seasonId, userId, contestantId, placement, congeniality],
                (err) => {
                  if (err) {
                      throw err;
                  }
                  else {
                      res.status(201).json({ status: 'success', message: 'Draft added' });
                  }
              });
          }
          else {
              res.status(400).send('Failure. Either contestantId and/or placement is not a number, or congeniality is not a boolean');
          }
      }
      else {
          res.status(400).send("Error: Either contestantId, placement, or congeniality fields do not exist or are named incorrectly or are null");
      }
      
    }
  } else {
    res.status(400).send("Error: Parameter id is not a number");
  }
};

const updatePrediction = (req, res) => {
  const seasonId = parseInt(req.params.seasonId);
  const userId = parseInt(req.params.userId);

  const { contestantId, placement, congeniality } = req.body;
  if (seasonId && userId && placement && contestantId && typeof congeniality === "boolean") {
      pool.query('UPDATE drafts SET placement = $4, congeniality = $5 WHERE season_id = $1 AND user_id = $2 AND contestant_id = $3', [seasonId, userId, contestantId, placement, congeniality], (err) => {
          if (err) {
              throw err;
          }
          else {
              res.status(201).send('Draft updated');
          }
      });
  }
  else {
      res.status(400).send('Failure. Either one of (contestantId, placement, seasonId, userId) is not a number, or completed is not a boolean');
  }
};

// GET
router.get('/user/:userId', getUserPredictions);
router.get('/season/:seasonId', getSeasonPredictions);
router.get('/:userId/:seasonId', getPredictions);
router.get('/', getAllPredictions);

// POST
router.post('/:userId/:seasonId', createPrediction);

// PUT
router.put('/:userId/:seasonId', updatePrediction);

module.exports = router;
