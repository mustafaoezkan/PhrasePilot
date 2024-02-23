const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const sequelize = require('./config/database'); // Import Sequelize configuration
const wordRoutes = require('./routes/word');
const authRoutes = require('./routes/auth');

const app = express();

app.use(morgan('dev')); // Morgan for request logging
app.use(helmet()); // Helmet for securing HTTP headers
app.use(compression()); // Compression middleware for response compression
app.use(corsMiddleware); // CORS middleware for handling Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Body parser for parsing JSON requests

app.use(wordRoutes); // Word routes
app.use('/auth', authRoutes); // Authentication routes

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

sequelize
  .sync() // Synchronize models with the database
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
