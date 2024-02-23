const { validationResult } = require('express-validator');
const Word = require('../models/word');
const User = require('../models/user');

exports.getWords = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;

  Word.findAndCountAll({
    offset: (currentPage - 1) * perPage,
    limit: perPage
  })
    .then((result) => {
      res.status(200).json({
        message: 'Fetched words successfully.',
        words: result.rows,
        totalItems: result.count
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createWord = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const term = req.body.term;
  const definition = req.body.definition;

  Word.create({
    term: term,
    definition: definition,
    userId: req.userId
  })
    .then((result) => {
      res.status(201).json({
        message: 'Word created successfully!',
        word: result,
        creator: { _id: req.userId, name: 'YourName' } // Adjust with actual user data
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getWord = (req, res, next) => {
  const wordId = req.params.wordId;

  Word.findByPk(wordId)
    .then((word) => {
      if (!word) {
        const error = new Error('Could not find word.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Word fetched.', word: word });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateWord = (req, res, next) => {
  const wordId = req.params.wordId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const term = req.body.term;
  const definition = req.body.definition;

  Word.findByPk(wordId)
    .then((word) => {
      if (!word) {
        const error = new Error('Could not find word.');
        error.statusCode = 404;
        throw error;
      }

      if (word.userId !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }

      word.term = term;
      word.definition = definition;
      return word.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Word updated!', word: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteWord = (req, res, next) => {
  const wordId = req.params.wordId;

  Word.findByPk(wordId)
    .then((word) => {
      if (!word) {
        const error = new Error('Could not find word.');
        error.statusCode = 404;
        throw error;
      }

      if (word.userId !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }

      return word.destroy();
    })
    .then(() => {
      return User.findByPk(req.userId);
    })
    .then((user) => {
      return user.removeWord(wordId);
    })
    .then(() => {
      res.status(200).json({ message: 'Deleted word.' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
