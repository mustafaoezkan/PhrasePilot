const jwt = require('jsonwebtoken');

// Middleware for checking the JSON Web Token
module.exports = (req, res, next) => {
  // Extract the Authorization header
  const authHeader = req.get('Authorization');

  // Check if the Authorization header is missing
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];
  let decodedToken;

  console.log('token :>> ', token);

  // Verify the token using the secret key
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  // Check if the token is valid
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  // Attach the user ID from the decoded token to the request object
  req.userId = decodedToken.userId;

  // Continue to the next middleware or route handler
  next();
};
