const cors = require('cors');

// Define your whitelist
const whitelist = ['http://mustafaozkan.dev', 'http://localhost:3000'];

// CORS options with custom origin validation
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the whitelist or if it's not defined (for non-browser requests)
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      // Reject requests from origins not in the whitelist
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Create CORS middleware with custom options
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
