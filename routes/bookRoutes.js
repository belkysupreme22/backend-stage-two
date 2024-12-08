const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validateBook = require('../middlewares/validate');
const authorizeRole = require('../middlewares/authorizeRole');
const authenticateToken = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /books:
 * /api/books/all:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     description: Retrieve a list of all books (Admin Only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of books
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/books/all', authenticateToken, authorizeRole('admin'), bookController.getAllBooks);

/**
 * @swagger
 * /books:
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     description: Adds a new book to the collection
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
router.post('/books', authenticateToken,authorizeRole("user"), bookController.addBook);

/**
 * @swagger
 * /books:
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     description: Update the details of an existing book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Updated book
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 */
router.put('/books/:id', authenticateToken, bookController.updateBook);

/**
 * @swagger
 * /books:
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     description: Deletes a book by its ID (Admin Only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/books/:id', authenticateToken, bookController.deleteBook);

/**
 * @swagger
 * /books:
 * /api/books/recommendations:
 *   get:
 *     summary: Get book recommendations
 *     tags: [Books]
 *     description: Retrieve recommended books based on the user's favorites
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of recommended books
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/books/recommendations',authenticateToken, bookController.getBookRecommendations);

/**
 * @swagger
 * /books:
 * /api/books/favorite/{id}:
 *   post:
 *     summary: Mark a book as favorite
 *     tags: [Books]
 *     description: Toggle the favorite status of a book for the logged-in user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to mark as favorite
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book marked as favorite
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 */
router.post('/books/favorite/:id', bookController.markAsFavorite);


/**
 * @swagger
 * /books:
 * /api/books:
 *   get:
 *     summary: Fetch books based on user-specific criteria
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of books
 *       401:
 *         description: Access denied. No token provided.
 *       500:
 *         description: Internal server error
 */


router.get('/books', authenticateToken, bookController.getBooks);


module.exports = router;
