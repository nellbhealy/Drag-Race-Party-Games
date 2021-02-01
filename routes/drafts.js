const express = require('express');
const router = express.Router();
const { pool } = require('../config');

const getDraft = (req, res) => {
  const seasonId = parseInt(req.params.seasonId);
  const userId = parseInt(req.params.userId);

  if (!isNaN(seasonId) || !isNaN(userId)) {
    pool.query('SELECT * FROM drafts WHERE season_id = $1 AND user_id = $2', [seasonId, userId], (err) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json(res.rows);
      }
    });
  } else {
    res.status(400).send("Error: Parameter id is not a number for user and/or season");
  }
};

const getUserDrafts = (req, res) => {
  const userId = parseInt(req.params.userId);

  if (!isNaN(userId)) {
    pool.query('SELECT * FROM drafts WHERE user_id = $1', [userId], (err) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json(res.rows);
      }
    });
  } else {
    res.status(400).send("Error: Parameter id is not a number");
  }
};

const getSeasonDrafts = (req, res) => {
  const seasonId = parseInt(req.params.seasonId);

  if (!isNaN(seasonId)) {
    pool.query('SELECT * FROM drafts WHERE season_id = $1', [seasonId], (err) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json(res.rows);
      }
    });
  } else {
    res.status(400).send("Error: Parameter id is not a number");
  }
};

const getAllDrafts = (req, res) => {
  pool.query('SELECT * FROM drafts', (err) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json(res.rows);
    }
  });
};

const createEntry = (req, res) => {
  const seasonId = parseInt(req.params.seasonId);
  const userId = parseInt(req.params.userId);

  if (!(isNaN(seasonId) || isNaN(userId))) {
    for (const entry of res.body.entries) {
      const { contestantId, placement, congeniality } = entry;
  
      if (contestantId != null && placement != null && congeniality != null) {
          if (!(isNaN(contestantId) || isNaN(placement)) && typeof congeniality === "boolean") {
              pool.query('INSERT INTO drafts (season_id, user_id, contestant_id, placement, congeniality) VALUES ($1, $2, $3, $4, $5)', [seasonId, userId, contestantId, placement, congeniality], (err) => {
                  if (err) {
                      throw err;
                  }
                  else {
                      res.status(201).json({ status: 'success', message: 'Draft added' });
                  }
              })
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

const updateEntry = (req, res) => {
  const seasonId = parseInt(req.params.seasonId);
  const userId = parseInt(req.params.userId);

  const { contestantId, placement, congeniality } = req.body;
  if (!(isNaN(seasonId) || isNaN(userId) || isNaN(placement) || isNaN(contestantId)) && typeof congeniality === "boolean") {
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
      res.status(400).send('Failure. Either the id provided is not a number, or completed is not a boolean');
  }
};

// GET
router.get('/:seasonId/:userId', getDraft);
router.get('/:userId', getUserDrafts);
router.get('/:seasonId', getSeasonDrafts);
router.get('/', getAllDrafts);

// POST
router.post('/:userId/:seasonId', createEntry);

// PUT
router.put('/:userId/:seasonId', updateEntry);

module.exports = router;
