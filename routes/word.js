const express = require('express');
const { body } = require('express-validator');

const wordController = require('../controllers/word');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/words - Route to fetch all words
router.get('/words', isAuth, wordController.getWords);

// POST /feed/word - Route to create a new word
router.post(
  '/word',
  isAuth,
  [
    body('term').trim().isLength({ min: 1 }), // Validation for term
    body('definition').trim().isLength({ min: 5 }) // Validation for definition
  ],
  wordController.createWord
);

// GET /feed/word/:wordId - Route to fetch a specific word
router.get('/word/:wordId', isAuth, wordController.getWord);

// PUT /feed/word/:wordId - Route to update a specific word
router.put(
  '/word/:wordId',
  isAuth,
  [
    body('term').trim().isLength({ min: 1 }), // Validation for term
    body('definition').trim().isLength({ min: 5 }) // Validation for definition
  ],
  wordController.updateWord
);

// DELETE /feed/word/:wordId - Route to delete a specific word
router.delete('/word/:wordId', isAuth, wordController.deleteWord);

module.exports = router;
