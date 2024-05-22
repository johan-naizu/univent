//JWT authentication middleware

const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      if (req.url === "/organiser/login") {
        return next();
      }

      return res.status(401).json({ error: "unauthorized" });
    }
    if (req.headers.authorization.split(" ")[0] !== "Bearer") {
      return res.status(401).json({ error: "unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "unauthorized" });
  }
};

module.exports = authentication;
