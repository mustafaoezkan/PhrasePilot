const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  list: {
    items: [
      {
        wordId: {
          type: Schema.Types.ObjectId,
          ref: 'Word',
          required: true
        }
      }
    ]
  }
});

userSchema.methods.addToList = function (word) {
  const updatedListItems = [...this.list.items];

  updatedListItems.push({
    wordId: word._id
  });
  const updatedList = {
    items: updatedListItems
  };
  this.list = updatedList;
  return this.save();
};

userSchema.methods.removeFromList = function (wordId) {
  const updatedListItems = this.list.items.filter((item) => {
    return item.wordId.toString() !== wordId.toString();
  });
  this.list.items = updatedListItems;
  return this.save();
};

userSchema.methods.clearList = function () {
  this.list = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
