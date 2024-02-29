const jwt = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticationError } = require("apollo-server-express");

exports.authMiddleware = async (req) => {
  try {
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new AuthenticationError("Access denied. No token provided.");
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // req.user = decoded;
      // console.log("from auth", decoded);
      return decoded;
    }
  } catch (err) {
    throw new AuthenticationError(err.message);
  }
};
