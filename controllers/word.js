const Word = require('../models/word');

exports.getAllWords = (req, res, next) => {
  Word.find()
    .then((words) => {
      res.status(200).json(words);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.getWordById = (req, res, next) => {
  const wordId = req.params.wordId;
  Word.findById(wordId)
    .then((word) => {
      if (!word) {
        return res.status(404).json({ error: 'Word not found' });
      }
      res.status(200).json(word);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.getUserList = (req, res, next) => {
  req.user
    .populate('list.items.wordId')
    .execPopulate()
    .then((user) => {
      const words = user.list.items;
      res.status(200).json(words);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.addWordToList = (req, res, next) => {
  const wordId = req.body.wordId;
  Word.findById(wordId)
    .then((word) => {
      if (!word) {
        return res.status(404).json({ error: 'Word not found' });
      }
      return req.user.addToList(word);
    })
    .then((result) => {
      res.status(201).json({ message: 'Word added to list successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.removeWordFromList = (req, res, next) => {
  const wordId = req.body.wordId;
  req.user
    .removeFromList(wordId)
    .then((result) => {
      res.status(200).json({ message: 'Word removed from list successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
