const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /signUp:
 * /api/auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [SignUp]
 *     description: Allows a new user to sign up by providing email, password, username and role(default to user).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *              
 *               
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request, missing or invalid fields
 *       500:
 *         description: Server error
 */
router.post('/auth/signup', authController.signup);

/**
 * @swagger
 * /Login:
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Login]
 *     description: Allows a registered user to log in using username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
router.post('/auth/login', authController.login);

module.exports = router;
