// index.js

const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const { swaggerSpec, swaggerUi } = require('./config/swagger'); // Import Swagger setup
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Swagger UI Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Database Connection
connectDB();

// Routes
app.use('/api', bookRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
