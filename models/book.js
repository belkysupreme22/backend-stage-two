const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  favoritedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
  },
});



module.exports = mongoose.model('Book', bookSchema);
