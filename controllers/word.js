const { validationResult } = require('express-validator');
const Word = require('../models/word');

exports.getWords = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;

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

  const word_name = req.body.word_name;
  const word_form = req.body.word_form;
  const word_meaning = req.body.word_meaning;
  const word_usage = req.body.word_usage;

  Word.create({
    word_name: word_name,
    word_form: word_form,
    word_meaning: word_meaning,
    word_usage: word_usage,
    creator: req.userId
  })
    .then((result) => {
      res.status(201).json({
        message: 'Word created successfully!',
        word: result,
        creator: req.userId
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

  const word_name = req.body.word_name;
  const word_form = req.body.word_form;
  const word_meaning = req.body.word_meaning;
  const word_usage = req.body.word_usage;

  Word.findByPk(wordId)
    .then((word) => {
      if (!word) {
        const error = new Error('Could not find word.');
        error.statusCode = 404;
        throw error;
      }

      if (word.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }

      word.word_name = word_name;
      word.word_form = word_form;
      word.word_meaning = word_meaning;
      word.word_usage = word_usage;
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

      if (word.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }

      return word.destroy();
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
