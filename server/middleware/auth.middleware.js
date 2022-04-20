const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const data = tokenService.validateAccess(token);

    req.user = data;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};