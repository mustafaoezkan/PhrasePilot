const express = require('express');

const wordController = require('../controllers/word');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/words', wordController.getAllWords);

router.get('/words/:wordId', wordController.getWordById);

router.get('/list', isAuth, wordController.getUserList);

router.post('/list', isAuth, wordController.addWordToList);

router.post('/list/:wordId', isAuth, wordController.removeWordFromList);

module.exports = router;
