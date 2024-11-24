const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validateBook = require('../middlewares/validate');


router.get('/books', bookController.getAllBooks);
router.post('/books', validateBook, bookController.addBook);
router.put('/books/:id', validateBook, bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

router.get('/books/recommendations', bookController.getBookRecommendations);
router.post('/books/favorite/:id', bookController.markAsFavorite);

module.exports = router;
