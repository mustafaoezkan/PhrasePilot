const express = require('express');
const { body } = require('express-validator');
const wordController = require('../controllers/word');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/words', isAuth, wordController.getWords);

router.post(
  '/word',
  isAuth,
  [
    body('term').trim().isLength({ min: 1 }),
    body('definition').trim().isLength({ min: 5 })
  ],
  wordController.createWord
);

router.get('/word/:wordId', isAuth, wordController.getWord);

router.put(
  '/word/:wordId',
  isAuth,
  [
    body('term').trim().isLength({ min: 1 }),
    body('definition').trim().isLength({ min: 5 })
  ],
  wordController.updateWord
);

router.delete('/word/:wordId', isAuth, wordController.deleteWord);

module.exports = router;
