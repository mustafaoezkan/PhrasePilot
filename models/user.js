const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'I am new!'
  },
  words: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Word'
    }
  ]
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
