const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
// the idea is only to create very token middleware
// because you will only create jwt with login , and then with this you will verify for every route you want
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No token provided");
  }
  try {
    const token = authHeader.split(" ")[1];
    const { username, id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, id };
    next();
  } catch (error) {
    throw new UnauthenticatedError("No token provided");
  }
};

module.exports = authMiddleware;
