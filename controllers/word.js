const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Word = require('../models/word');
const User = require('../models/user');

// Get a paginated list of words
exports.getWords = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Word.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Word.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((words) => {
      res.status(200).json({
        message: 'Fetched words successfully.',
        words: words,
        totalItems: totalItems
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Create a new word
exports.createWord = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const term = req.body.term;
  const definition = req.body.definition;
  let creator;
  const word = new Word({
    term: term,
    definition: definition,
    imageUrl: imageUrl,
    creator: req.userId
  });
  word
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.words.push(word);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: 'Word created successfully!',
        word: word,
        creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Get details of a specific word
exports.getWord = (req, res, next) => {
  const wordId = req.params.wordId;
  Word.findById(wordId)
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

// Update details of a specific word
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
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Word.findById(wordId)
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
      if (imageUrl !== word.imageUrl) {
        clearImage(word.imageUrl);
      }
      word.term = term;
      word.imageUrl = imageUrl;
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

// Delete a specific word
exports.deleteWord = (req, res, next) => {
  const wordId = req.params.wordId;
  Word.findById(wordId)
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
      clearImage(word.imageUrl);
      return Word.findByIdAndRemove(wordId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.words.pull(wordId);
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Deleted word.' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Function to clear image file on deletion or update
const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
