const { validationResult } = require('express-validator/check');

const Word = require('../models/word');

exports.addWord = (req, res, next) => {
  const { title, description } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  const word = new Word({
    title: title,
    description: description,
    userId: req.user
  });

  word
    .save()
    .then((result) => {
      console.log('Created Word');
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.editWord = (req, res, next) => {
  const wordId = req.params.wordId;
  const { title, description } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  Word.findById(wordId)
    .then((word) => {
      if (word.userId.toString() !== req.user._id.toString()) {
        return res.status(404).json({ error: 'Word not found' });
      }

      word.title = title;
      word.description = description;

      return word.save();
    })
    .then((result) => {
      console.log('Updated Word!');
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.getWords = (req, res, next) => {
  Word.find({ userId: req.user._id })
    .then((words) => {
      res.json(words);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.deleteWord = (req, res, next) => {
  const wordId = req.params.wordId;

  Word.findById(wordId)
    .then((word) => {
      if (!word) {
        return res.status(404).json({ error: 'Word not found' });
      }
      return Word.deleteOne({ _id: wordId, userId: req.user._id });
    })
    .then(() => {
      console.log('Destroyed Word');
      res.json({ message: 'Word deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
