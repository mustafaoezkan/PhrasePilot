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
    body('word_name').trim().isLength({ min: 1 }),
    body('word_form').trim().isLength({ min: 1 }),
    body('word_meaning').trim().isLength({ min: 3 }),
    body('word_usage').trim().isLength({ min: 3 })
  ],
  wordController.createWord
);

router.get('/word/:wordId', isAuth, wordController.getWord);

router.put(
  '/word/:wordId',
  isAuth,
  [
    body('word_name').trim().isLength({ min: 1 }),
    body('word_form').trim().isLength({ min: 1 }),
    body('word_meaning').trim().isLength({ min: 3 }),
    body('word_usage').trim().isLength({ min: 3 })
  ],
  wordController.updateWord
);

router.delete('/word/:wordId', isAuth, wordController.deleteWord);

module.exports = router;
