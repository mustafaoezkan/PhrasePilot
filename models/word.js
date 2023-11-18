const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Word schema
const wordSchema = new Schema(
  {
    term: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    definition: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Create and export the Word model
module.exports = mongoose.model('Word', wordSchema);
