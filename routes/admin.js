const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/words => GET
router.get('/words', isAuth, adminController.getWords);

// /admin/add-word => POST
router.post(
  '/add-word',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('description').isLength({ min: 5, max: 400 }).trim()
  ],
  isAuth,
  adminController.addWord
);

// /admin/edit-word/:wordId => PUT
router.put(
  '/edit-word/:wordId',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('description').isLength({ min: 5, max: 400 }).trim()
  ],
  isAuth,
  adminController.editWord
);

// /admin/delete-word/:wordId => DELETE
router.post('/delete-word/:wordId', isAuth, adminController.deleteWord);

module.exports = router;
