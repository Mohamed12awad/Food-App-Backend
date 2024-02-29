const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

const createToken = (id, role) => {
  return jwt.sign({ userId: id, userRole: role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

function isAuthorized(user, requiredRole = "normal") {
  if (!user) {
    throw new AuthenticationError("Unauthorized");
  } else if (user.userRole !== requiredRole && user.userRole !== "admin") {
    // console.log(user.userRole);
    throw new AuthenticationError("credentials required");
  }
}
const imageToBase64 = (path) => {
  const image = fs.readFileSync(path);
  return Buffer.from(image).toString("base64");
};

module.exports = {
  createToken,
  isAuthorized,
};
