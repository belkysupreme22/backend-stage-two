const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());


connectDB();

app.use('/api', bookRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

