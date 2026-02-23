const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware to verify JWT token
 */
const verifyJWT = (req, res, next) => {
  // Check authorization header
  if (!req.headers.authorization?.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Invalid authorization format",
    });
  }

  // Extract token
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Access denied. No token provided",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

/**
 * Function to generate JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports = {
  verifyJWT,
  generateToken,
};
