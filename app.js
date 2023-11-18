const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const corsMiddleware = require('./middleware/cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config(); // Load environment variables from .env file

const wordRoutes = require('./routes/word');
const authRoutes = require('./routes/auth');

const app = express();

// Multer configuration for file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

// Multer file filter for image types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(morgan('dev')); // Morgan for request logging

app.use(helmet()); // Helmet for securing HTTP headers
app.use(compression()); // Compression middleware for response compression

app.use(corsMiddleware); // CORS middleware for handling Cross-Origin Resource Sharing

app.use(bodyParser.json()); // Body parser for parsing JSON requests
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')); // Multer middleware for file uploads
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve static images

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

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_URI}`
  )
  .then((result) => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
